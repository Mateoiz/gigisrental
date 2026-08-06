'use client'

import { useState, useEffect, useCallback } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

// --- TYPES ---
type Booking = {
  id: string
  created_at: string
  full_name: string
  email: string
  phone: string
  fb_link: string | null
  category: string | null
  booking_date: string
  booking_time: string
  rental_days: number
  status: 'pending' | 'approved' | 'completed' | 'cancelled'
  notes: string | null
  dress_id: string | null
  dresses?: {
    name: string
  } | null
}

type FilterStatus = 'all' | 'pending' | 'approved' | 'completed' | 'cancelled'

type ConfirmState = {
  open: boolean
  title: string
  message: string
  confirmLabel: string
  tone: 'default' | 'danger'
  onConfirm: () => void
}

type ToastState = {
  id: number
  message: string
  tone: 'success' | 'error'
}

export default function AdminDashboard() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [filteredBookings, setFilteredBookings] = useState<Booking[]>([])
  const [activeFilter, setActiveFilter] = useState<FilterStatus>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isAuthorized, setIsAuthorized] = useState(false)
  const router = useRouter()

  // --- Custom UI state (replaces window.confirm / alert) ---
  const [confirmState, setConfirmState] = useState<ConfirmState | null>(null)
  const [toasts, setToasts] = useState<ToastState[]>([])

  const showToast = useCallback((message: string, tone: 'success' | 'error' = 'success') => {
    const id = Date.now() + Math.random()
    setToasts((t) => [...t, { id, message, tone }])
    setTimeout(() => {
      setToasts((t) => t.filter((x) => x.id !== id))
    }, 3800)
  }, [])

  const askConfirm = useCallback((opts: Omit<ConfirmState, 'open'>) => {
    setConfirmState({ ...opts, open: true })
  }, [])

  const closeConfirm = () => setConfirmState(null)

  // 1. Protection Lock
  useEffect(() => {
    const verifyAccess = async () => {
      const { data: { session } } = await supabase.auth.getSession()

      if (!session || session.user?.email !== process.env.NEXT_PUBLIC_ADMIN_EMAIL) {
        router.replace('/dshbrdlogin')
        return
      }

      setIsAuthorized(true)
      fetchBookings()
    }

    verifyAccess()
  }, [router])

  // 2. Fetch Data
  const fetchBookings = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('bookings')
      .select(`*, dresses ( name )`)
      .order('created_at', { ascending: false })

    if (error) {
      setError(error.message)
    } else {
      setBookings(data as Booking[])
      setFilteredBookings(data as Booking[])
    }
    setLoading(false)
  }

  // 3. Handle Filtering + Search
  useEffect(() => {
    let result = activeFilter === 'all'
      ? bookings
      : bookings.filter((b) => b.status === activeFilter)

    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase()
      result = result.filter((b) =>
        b.full_name.toLowerCase().includes(q) ||
        b.email.toLowerCase().includes(q) ||
        (b.dresses?.name ?? b.category ?? '').toLowerCase().includes(q)
      )
    }

    setFilteredBookings(result)
  }, [activeFilter, bookings, searchQuery])

  // 4. Update Status Logic
  const performStatusUpdate = async (bookingId: string, newStatus: string, dressId: string | null) => {
    const { error: updateError } = await supabase
      .from('bookings')
      .update({ status: newStatus })
      .eq('id', bookingId)

    if (updateError) {
      showToast('Failed to update booking status.', 'error')
      return
    }

    if ((newStatus === 'cancelled' || newStatus === 'completed') && dressId) {
      await supabase
        .from('dresses')
        .update({ is_available: true })
        .eq('id', dressId)
    }

    showToast(
      newStatus === 'approved' ? 'Booking approved.' :
      newStatus === 'cancelled' ? 'Booking rejected.' :
      newStatus === 'completed' ? 'Booking marked completed.' :
      'Booking updated.'
    )
    fetchBookings()
  }

  const updateStatus = async (bookingId: string, newStatus: string, dressId: string | null) => {
    if (newStatus === 'approved' && dressId) {
      const target = bookings.find((b) => b.id === bookingId)
      if (target) {
        const targetStart = new Date(target.booking_date).getTime()
        const targetEnd = targetStart + (target.rental_days - 1) * 86400000

        const { data: liveApproved, error: liveError } = await supabase
          .from('bookings')
          .select('id, booking_date, rental_days, dresses ( name )')
          .eq('dress_id', dressId)
          .eq('status', 'approved')
          .neq('id', bookingId)

        if (liveError) {
          showToast('Could not verify availability. Try again.', 'error')
          return
        }

        const conflict = (liveApproved ?? []).find((b: any) => {
          const bStart = new Date(b.booking_date).getTime()
          const bEnd = bStart + (b.rental_days - 1) * 86400000
          return targetStart <= bEnd && bStart <= targetEnd
        })

        if (conflict) {
          showToast(
            `Cannot approve — "${target.dresses?.name ?? 'this dress'}" is already booked for an overlapping date.`,
            'error'
          )
          fetchBookings()
          return
        }
      }
    }

    const target = bookings.find((b) => b.id === bookingId)
    const label =
      newStatus === 'approved' ? 'approve' :
      newStatus === 'cancelled' ? 'reject' :
      newStatus === 'completed' ? 'mark as completed' :
      'update'

    askConfirm({
      title: `${label.charAt(0).toUpperCase() + label.slice(1)} booking?`,
      message: `${target?.full_name ?? 'This client'}'s request for ${target?.dresses?.name ?? target?.category ?? 'a dress'} will be marked ${newStatus}.`,
      confirmLabel: label.charAt(0).toUpperCase() + label.slice(1),
      tone: newStatus === 'cancelled' ? 'danger' : 'default',
      onConfirm: () => {
        closeConfirm()
        performStatusUpdate(bookingId, newStatus, dressId)
      },
    })
  }

  // 4b. Delete Booking (permanent — for cancelled/completed cleanup)
  const deleteBooking = (bookingId: string, clientName: string) => {
    askConfirm({
      title: 'Delete booking permanently?',
      message: `${clientName}'s booking will be permanently removed. This cannot be undone.`,
      confirmLabel: 'Delete',
      tone: 'danger',
      onConfirm: async () => {
        closeConfirm()
        const { error: deleteError, data: deletedRows } = await supabase
          .from('bookings')
          .delete()
          .eq('id', bookingId)
          .select()

        console.log('Delete result:', { deletedRows, deleteError })

        if (deleteError) {
          showToast('Failed to delete booking.', 'error')
          return
        }

        if (!deletedRows || deletedRows.length === 0) {
          showToast('Delete blocked — no rows removed (likely a permissions/RLS issue).', 'error')
          return
        }

        showToast('Booking deleted.')
        fetchBookings()
      },
    })
  }

  // 5. Logout Logic
  const handleLogout = async () => {
    askConfirm({
      title: 'Sign out?',
      message: "You'll need to sign back in to access the dashboard.",
      confirmLabel: 'Sign out',
      tone: 'default',
      onConfirm: async () => {
        closeConfirm()
        await supabase.auth.signOut()
        router.push('/dshbrdlogin')
      },
    })
  }

  // Helpers
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  const formatRelativeTime = (dateString: string) => {
    const bookingDate = new Date(dateString)
    const today = new Date()
    const diffTime = bookingDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 0) return 'Today'
    if (diffDays === 1) return 'Tomorrow'
    if (diffDays > 1) return `In ${diffDays} days`
    return `${Math.abs(diffDays)} days ago`
  }

  // Dashboard Metrics
  const stats = {
    pending: bookings.filter((b) => b.status === 'pending').length,
    upcoming: bookings.filter((b) => b.status === 'approved').length,
    completed: bookings.filter((b) => b.status === 'completed').length,
  }

  if (!isAuthorized || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FFFDF9] font-['Jost',_sans-serif]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-[#F2E6E8] border-t-[#A9647C] rounded-full animate-spin"></div>
          <p className="text-[#8C666B] uppercase tracking-widest text-xs font-semibold">Loading dashboard</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#FFFDF9] p-6 md:p-12 font-['Jost',_sans-serif] text-[#3D2C2E]">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-['Cormorant_Garamond',_serif] font-medium text-[#3D2C2E] italic">
              Studio command center
            </h1>
            <p className="text-[#8C666B] mt-1">Manage fittings, inventory, and client requests.</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleLogout}
              className="px-6 py-2 rounded-full border border-[#E5D7D3] text-[#8C666B] hover:bg-white transition-colors text-sm font-medium uppercase tracking-widest"
            >
              Sign out
            </button>
            <Link
              href="/"
              className="px-6 py-2 rounded-full bg-[#3D2C2E] text-white hover:bg-[#A9647C] transition-colors text-sm font-medium uppercase tracking-widest text-center shadow-sm"
            >
              View live site
            </Link>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 border border-red-100">
            Couldn't load bookings: {error}
          </div>
        )}

        {/* Metrics Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl border border-[#F7E8EC] shadow-[0_4px_20px_-10px_rgba(169,100,124,0.1)] flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-widest text-[#8C666B] font-semibold mb-1">Action required</p>
              <h3 className="text-3xl font-['Cormorant_Garamond',_serif] font-medium text-yellow-600">{stats.pending}</h3>
            </div>
            <div className="w-12 h-12 rounded-full bg-yellow-50 flex items-center justify-center text-yellow-600">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#F7E8EC] shadow-[0_4px_20px_-10px_rgba(169,100,124,0.1)] flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-widest text-[#8C666B] font-semibold mb-1">Upcoming fittings</p>
              <h3 className="text-3xl font-['Cormorant_Garamond',_serif] font-medium text-[#A9647C]">{stats.upcoming}</h3>
            </div>
            <div className="w-12 h-12 rounded-full bg-[#FDF2F5] flex items-center justify-center text-[#A9647C]">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#F7E8EC] shadow-[0_4px_20px_-10px_rgba(169,100,124,0.1)] flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-widest text-[#8C666B] font-semibold mb-1">Completed rentals</p>
              <h3 className="text-3xl font-['Cormorant_Garamond',_serif] font-medium text-green-600">{stats.completed}</h3>
            </div>
            <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center text-green-600">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-4 top-1/2 -translate-y-1/2 text-[#B58A94] pointer-events-none"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by client name, email, or dress"
            className="w-full pl-11 pr-4 py-3 rounded-full border border-[#F7E8EC] bg-white text-sm text-[#3D2C2E] placeholder-[#B58A94] focus:outline-none focus:border-[#A9647C] transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              aria-label="Clear search"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#B58A94] hover:text-[#A9647C]"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          )}
        </div>

        {/* Filters */}
        <div className="flex overflow-x-auto gap-2 mb-6 pb-2 scrollbar-hide">
          {(['all', 'pending', 'approved', 'completed', 'cancelled'] as FilterStatus[]).map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-widest whitespace-nowrap transition-all ${
                activeFilter === filter
                  ? 'bg-[#3D2C2E] text-white shadow-md'
                  : 'bg-white border border-[#F7E8EC] text-[#8C666B] hover:bg-[#FDF2F5]'
              }`}
            >
              {filter === 'approved' ? 'Upcoming (approved)' : filter}
            </button>
          ))}
        </div>

        {/* Table Container */}
        <div className="bg-white border border-[#F7E8EC] rounded-2xl shadow-[0_8px_30px_-12px_rgba(169,100,124,0.15)] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[900px]">
              <thead>
                <tr className="bg-[#FFFBF7] border-b border-[#F7E8EC]">
                  <th className="p-5 text-[11px] font-semibold text-[#8C666B] uppercase tracking-widest">Client details</th>
                  <th className="p-5 text-[11px] font-semibold text-[#8C666B] uppercase tracking-widest">Requested dress</th>
                  <th className="p-5 text-[11px] font-semibold text-[#8C666B] uppercase tracking-widest">Fitting schedule</th>
                  <th className="p-5 text-[11px] font-semibold text-[#8C666B] uppercase tracking-widest">Status & action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F7E8EC]">
                {filteredBookings.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="p-12 text-center">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#FFFBF7] mb-4">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#D48B9D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
                      </div>
                      <p className="text-[#3D2C2E] font-serif italic text-xl">No requests found</p>
                      <p className="text-[#8C666B] text-sm mt-1">Try adjusting your filters or search.</p>
                    </td>
                  </tr>
                ) : (
                  filteredBookings.map((booking) => (
                    <tr key={booking.id} className="hover:bg-[#FFFDF9] transition-colors group">

                      {/* Client Details */}
                      <td className="p-5 align-top">
                        <div className="font-semibold text-[#3D2C2E] text-base mb-1">{booking.full_name}</div>
                        <div className="flex flex-col gap-1 text-sm text-[#8C666B]">
                          <div className="flex items-center gap-2">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                            <a href={`mailto:${booking.email}`} className="hover:text-[#A9647C] transition-colors">{booking.email}</a>
                          </div>
                          <div className="flex items-center gap-2">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                            <a href={`tel:${booking.phone}`} className="hover:text-[#A9647C] transition-colors">{booking.phone}</a>
                          </div>
                          {booking.fb_link && (
                            <div className="flex items-center gap-2">
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.5-3.89 3.78-3.89 1.1 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12z"/></svg>
                              <a href={booking.fb_link} target="_blank" rel="noopener noreferrer" className="hover:text-[#A9647C] transition-colors truncate max-w-[180px]">{booking.fb_link}</a>
                            </div>
                          )}
                        </div>
                        {booking.notes && (
                          <div className="mt-3 text-xs bg-[#FFFBF7] border border-[#F7E8EC] p-2.5 rounded-lg text-[#6B484D] leading-relaxed">
                            <span className="font-semibold block mb-0.5 text-[#3D2C2E]">Client note</span>
                            {booking.notes}
                          </div>
                        )}
                      </td>

                      {/* Requested Dress */}
                      <td className="p-5 align-top">
                        {booking.dresses?.name ? (
                          <div className="font-['Cormorant_Garamond',_serif] italic font-semibold text-[#A9647C] text-xl">
                            {booking.dresses.name}
                          </div>
                        ) : (
                          <div className="font-medium text-[#3D2C2E] text-base">{booking.category}</div>
                        )}
                        <div className="text-xs text-[#8C666B] mt-2 flex items-center gap-1.5">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                          Rental duration: <strong className="text-[#3D2C2E]">{booking.rental_days} {booking.rental_days === 1 ? 'day' : 'days'}</strong>
                        </div>
                      </td>

                      {/* Fitting Schedule */}
                      <td className="p-5 align-top">
                        <div className="font-semibold text-[#3D2C2E] text-base mb-1">{formatDate(booking.booking_date)}</div>
                        <div className="text-sm text-[#A9647C] font-medium bg-[#FDF2F5] inline-block px-2 py-0.5 rounded mb-2 border border-[#F7E8EC]">
                          @ {booking.booking_time}
                        </div>
                        <div className="text-[11px] text-[#8C666B] flex flex-col gap-1">
                          <span>{formatRelativeTime(booking.booking_date)}</span>
                          <span className="opacity-60 border-t border-[#F7E8EC] pt-1 mt-1 block">
                            Requested {new Date(booking.created_at).toLocaleDateString()}
                          </span>
                        </div>
                      </td>

                      {/* Status & Action */}
                      <td className="p-5 align-top">
                        <div className="mb-3">
                          <span className={`px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest rounded-full inline-flex items-center gap-1.5 ${
                            booking.status === 'pending' ? 'bg-yellow-50 text-yellow-700 border border-yellow-200' :
                            booking.status === 'approved' ? 'bg-indigo-50 text-indigo-700 border border-indigo-200' :
                            booking.status === 'completed' ? 'bg-green-50 text-green-700 border border-green-200' :
                            'bg-red-50 text-red-700 border border-red-200'
                          }`}>
                            {booking.status === 'pending' && <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 animate-pulse"></span>}
                            {booking.status === 'approved' && <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>}
                            {booking.status}
                          </span>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {booking.status === 'pending' && (
                            <>
                              <button
                                onClick={() => updateStatus(booking.id, 'approved', booking.dress_id)}
                                className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#3D2C2E] text-white text-[10px] uppercase tracking-widest font-bold rounded-lg hover:bg-[#A9647C] transition-colors shadow-sm"
                              >
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                                Approve
                              </button>
                              <button
                                onClick={() => updateStatus(booking.id, 'cancelled', booking.dress_id)}
                                className="inline-flex items-center gap-1.5 px-4 py-2 bg-white border border-[#E5D7D3] text-[#8C666B] text-[10px] uppercase tracking-widest font-bold rounded-lg hover:bg-red-50 hover:text-red-700 hover:border-red-200 transition-colors"
                              >
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                                Reject
                              </button>
                            </>
                          )}
                          {booking.status === 'approved' && (
                            <button
                              onClick={() => updateStatus(booking.id, 'completed', booking.dress_id)}
                              className="inline-flex items-center gap-1.5 px-4 py-2 bg-green-50 border border-green-200 text-green-700 text-[10px] uppercase tracking-widest font-bold rounded-lg hover:bg-green-100 transition-colors shadow-sm"
                            >
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                              Mark completed
                            </button>
                          )}
                          {booking.status === 'completed' && (
                            <span className="text-xs text-[#8C666B] italic font-serif self-center">Rental fulfilled</span>
                          )}
                          {(booking.status === 'cancelled' || booking.status === 'completed') && (
                            <button
                              onClick={() => deleteBooking(booking.id, booking.full_name)}
                              title="Permanently delete this booking"
                              className="inline-flex items-center gap-1.5 px-4 py-2 bg-white border border-[#E5D7D3] text-[#8C666B] text-[10px] uppercase tracking-widest font-bold rounded-lg hover:bg-red-50 hover:text-red-700 hover:border-red-200 transition-colors"
                            >
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"/></svg>
                              Delete
                            </button>
                          )}
                        </div>
                      </td>

                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* --- Custom Confirm Modal (replaces window.confirm) --- */}
      {confirmState?.open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          onClick={closeConfirm}
        >
          <div
            className="bg-white rounded-2xl shadow-xl max-w-sm w-full p-6 border border-[#F7E8EC]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className={`w-11 h-11 rounded-full flex items-center justify-center mb-4 ${
              confirmState.tone === 'danger' ? 'bg-red-50 text-red-600' : 'bg-[#FDF2F5] text-[#A9647C]'
            }`}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
            </div>
            <h3 className="font-['Cormorant_Garamond',_serif] italic text-2xl text-[#3D2C2E] mb-2">
              {confirmState.title}
            </h3>
            <p className="text-sm text-[#8C666B] mb-6 leading-relaxed">{confirmState.message}</p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={closeConfirm}
                className="px-5 py-2.5 rounded-lg border border-[#E5D7D3] text-[#8C666B] text-xs font-bold uppercase tracking-widest hover:bg-[#FFFBF7] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmState.onConfirm}
                className={`px-5 py-2.5 rounded-lg text-white text-xs font-bold uppercase tracking-widest transition-colors shadow-sm ${
                  confirmState.tone === 'danger' ? 'bg-red-600 hover:bg-red-700' : 'bg-[#3D2C2E] hover:bg-[#A9647C]'
                }`}
              >
                {confirmState.confirmLabel}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- Toast Stack (replaces alert) --- */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 items-end">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`flex items-center gap-2.5 px-4 py-3 rounded-xl shadow-lg text-sm font-medium max-w-sm border ${
              t.tone === 'error'
                ? 'bg-red-50 text-red-700 border-red-200'
                : 'bg-white text-[#3D2C2E] border-[#F7E8EC]'
            }`}
          >
            {t.tone === 'error' ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600 shrink-0"><polyline points="20 6 9 17 4 12"/></svg>
            )}
            {t.message}
          </div>
        ))}
      </div>
    </div>
  )
}