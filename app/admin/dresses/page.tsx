'use client'

import { useEffect, useState, useCallback, useMemo } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { useRequireAuth } from '../useRequireAuth'

interface Dress {
  id: string
  slug: string
  name: string
  category: string | null
  image_base: string | null
  is_available: boolean
  base_price: number
}

type FilterKey = 'all' | 'long' | 'mini' | 'hidden'

type ConfirmState = {
  open: boolean
  title: string
  message: string
  confirmLabel: string
  tone: 'default' | 'danger'
  onConfirm: () => void
}

type ToastState = { id: number; message: string; tone: 'success' | 'error' }

const BUCKET = 'collections'

export default function AdminDressesListPage() {
  const { checked } = useRequireAuth()
  const [dresses, setDresses] = useState<Dress[]>([])
  const [loading, setLoading] = useState(true)
  const [activeFilter, setActiveFilter] = useState<FilterKey>('all')
  const [searchQuery, setSearchQuery] = useState('')

  const [confirmState, setConfirmState] = useState<ConfirmState | null>(null)
  const [toasts, setToasts] = useState<ToastState[]>([])

  const showToast = useCallback((message: string, tone: 'success' | 'error' = 'success') => {
    const id = Date.now() + Math.random()
    setToasts((t) => [...t, { id, message, tone }])
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3800)
  }, [])

  const askConfirm = useCallback((opts: Omit<ConfirmState, 'open'>) => {
    setConfirmState({ ...opts, open: true })
  }, [])
  const closeConfirm = () => setConfirmState(null)

  const fetchDresses = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('dresses')
      .select('id, slug, name, category, image_base, is_available, base_price')
      .order('name')
    if (data && !error) setDresses(data)
    setLoading(false)
  }

  useEffect(() => {
    if (checked) fetchDresses()
  }, [checked])

  const filteredDresses = useMemo(() => {
    let result = dresses
    if (activeFilter === 'long') result = result.filter((d) => d.category?.toLowerCase() === 'long')
    if (activeFilter === 'mini') result = result.filter((d) => d.category?.toLowerCase() === 'mini')
    if (activeFilter === 'hidden') result = result.filter((d) => !d.is_available)

    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase()
      result = result.filter((d) => d.name.toLowerCase().includes(q) || d.slug.toLowerCase().includes(q))
    }
    return result
  }, [dresses, activeFilter, searchQuery])

  const stats = {
    total: dresses.length,
    hidden: dresses.filter((d) => !d.is_available).length,
    long: dresses.filter((d) => d.category?.toLowerCase() === 'long').length,
    mini: dresses.filter((d) => d.category?.toLowerCase() === 'mini').length,
  }

  if (!checked) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FFFDF9]">
        <div className="w-8 h-8 border-4 border-[#F2E6E8] border-t-[#A9647C] rounded-full animate-spin" />
      </div>
    )
  }

  const toggleAvailability = async (dress: Dress) => {
    const { error } = await supabase
      .from('dresses')
      .update({ is_available: !dress.is_available })
      .eq('id', dress.id)

    if (error) {
      showToast('Failed to update availability.', 'error')
      return
    }
    showToast(dress.is_available ? `"${dress.name}" hidden from the site.` : `"${dress.name}" is now visible.`)
    fetchDresses()
  }

  const deleteDress = (dress: Dress) => {
    askConfirm({
      title: 'Delete this piece?',
      message: `"${dress.name}" and all its photos will be permanently removed. This cannot be undone.`,
      confirmLabel: 'Delete',
      tone: 'danger',
      onConfirm: async () => {
        closeConfirm()
        const { data: files } = await supabase.storage.from(BUCKET).list(dress.slug)
        if (files && files.length > 0) {
          const paths = files.map((f) => `${dress.slug}/${f.name}`)
          await supabase.storage.from(BUCKET).remove(paths)
        }

        const { error } = await supabase.from('dresses').delete().eq('id', dress.id)
        if (error) {
          showToast('Failed to delete dress.', 'error')
          return
        }
        showToast(`"${dress.name}" was deleted.`)
        fetchDresses()
      },
    })
  }

  return (
    <div className="min-h-screen bg-[#FFFDF9] p-6 md:p-12 font-['Jost',_sans-serif] text-[#3D2C2E]">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <p className="text-xs uppercase tracking-widest text-[#8C666B] font-semibold mb-1">
              <Link href="/admin" className="hover:text-[#A9647C] transition-colors">Dashboard</Link> / Dresses
            </p>
            <h1 className="text-4xl font-['Cormorant_Garamond',_serif] font-medium italic text-[#3D2C2E]">
              The Collection
            </h1>
          </div>
          <Link
            href="/admin/dresses/new"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#3D2C2E] text-white hover:bg-[#A9647C] transition-colors text-sm font-medium uppercase tracking-widest shadow-sm whitespace-nowrap"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Add Dress
          </Link>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatCard label="Total pieces" value={stats.total} color="text-[#3D2C2E]" />
          <StatCard label="Long" value={stats.long} color="text-[#A9647C]" />
          <StatCard label="Mini" value={stats.mini} color="text-[#A9647C]" />
          <StatCard label="Hidden" value={stats.hidden} color="text-yellow-600" />
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-4 top-1/2 -translate-y-1/2 text-[#B58A94] pointer-events-none">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name or slug"
            className="w-full pl-11 pr-4 py-3 rounded-full border border-[#F7E8EC] bg-white text-sm text-[#3D2C2E] placeholder-[#B58A94] focus:outline-none focus:border-[#A9647C] transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              aria-label="Clear search"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#B58A94] hover:text-[#A9647C]"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          )}
        </div>

        {/* Filters */}
        <div className="flex overflow-x-auto gap-2 mb-6 pb-2">
          {(['all', 'long', 'mini', 'hidden'] as FilterKey[]).map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-widest whitespace-nowrap transition-all ${
                activeFilter === filter
                  ? 'bg-[#3D2C2E] text-white shadow-md'
                  : 'bg-white border border-[#F7E8EC] text-[#8C666B] hover:bg-[#FDF2F5]'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Grid */}
        {loading ? (
          <div className="flex justify-center py-24">
            <div className="w-8 h-8 border-4 border-[#F2E6E8] border-t-[#A9647C] rounded-full animate-spin" />
          </div>
        ) : filteredDresses.length === 0 ? (
          <div className="bg-white border border-[#F7E8EC] rounded-2xl p-12 text-center">
            <p className="text-[#3D2C2E] font-['Cormorant_Garamond',_serif] italic text-xl">No pieces found</p>
            <p className="text-[#8C666B] text-sm mt-1">Try adjusting your filters or search.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {filteredDresses.map((dress) => (
              <div
                key={dress.id}
                className="bg-white border border-[#F7E8EC] rounded-2xl overflow-hidden shadow-[0_4px_20px_-10px_rgba(169,100,124,0.1)] hover:shadow-[0_8px_30px_-12px_rgba(169,100,124,0.25)] transition-shadow group"
              >
                <div className="relative aspect-[3/4] bg-[#FBF9F6]">
                  {dress.image_base ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={dress.image_base}
                      alt={dress.name}
                      className="absolute inset-0 w-full h-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[#D8BFC6] text-xs">
                      No image
                    </div>
                  )}
                  {!dress.is_available && (
                    <span className="absolute top-2 left-2 px-2.5 py-1 rounded-full bg-black/60 text-white text-[10px] font-bold uppercase tracking-widest">
                      Hidden
                    </span>
                  )}
                </div>

                <div className="p-3 flex flex-col gap-2">
                  <div>
                    <div className="font-['Cormorant_Garamond',_serif] italic font-semibold text-[#3D2C2E] text-base truncate">
                      {dress.name}
                    </div>
                    <div className="text-xs text-[#8C666B]">
                      {dress.category ?? '—'} · ₱{dress.base_price?.toLocaleString()}
                    </div>
                  </div>

                  <div className="flex gap-1.5">
                    <button
                      onClick={() => toggleAvailability(dress)}
                      className={`flex-1 px-2 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-colors ${
                        dress.is_available
                          ? 'bg-green-50 text-green-700 border border-green-200 hover:bg-green-100'
                          : 'bg-yellow-50 text-yellow-700 border border-yellow-200 hover:bg-yellow-100'
                      }`}
                    >
                      {dress.is_available ? 'Visible' : 'Show it'}
                    </button>
                    <Link
                      href={`/admin/dresses/${dress.slug}/edit`}
                      className="px-2.5 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest bg-white border border-[#E5D7D3] text-[#8C666B] hover:bg-[#FDF2F5] hover:text-[#A9647C] hover:border-[#A9647C] transition-colors flex items-center justify-center"
                      aria-label={`Edit ${dress.name}`}
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 20h9" />
                        <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
                      </svg>
                    </Link>
                    <button
                      onClick={() => deleteDress(dress)}
                      aria-label={`Delete ${dress.name}`}
                      className="px-2.5 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest bg-white border border-[#E5D7D3] text-[#8C666B] hover:bg-red-50 hover:text-red-700 hover:border-red-200 transition-colors"
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="3 6 5 6 21 6" />
                        <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                        <path d="M10 11v6" />
                        <path d="M14 11v6" />
                        <path d="M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Confirm Modal */}
      {confirmState?.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" onClick={closeConfirm}>
          <div
            className="bg-white rounded-2xl shadow-xl max-w-sm w-full p-6 border border-[#F7E8EC]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className={`w-11 h-11 rounded-full flex items-center justify-center mb-4 ${
              confirmState.tone === 'danger' ? 'bg-red-50 text-red-600' : 'bg-[#FDF2F5] text-[#A9647C]'
            }`}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                <line x1="12" y1="9" x2="12" y2="13" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
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

      {/* Toasts */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 items-end">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`flex items-center gap-2.5 px-4 py-3 rounded-xl shadow-lg text-sm font-medium max-w-sm border ${
              t.tone === 'error' ? 'bg-red-50 text-red-700 border-red-200' : 'bg-white text-[#3D2C2E] border-[#F7E8EC]'
            }`}
          >
            {t.tone === 'error' ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600 shrink-0">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            )}
            {t.message}
          </div>
        ))}
      </div>
    </div>
  )
}

function StatCard({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="bg-white p-4 rounded-2xl border border-[#F7E8EC] shadow-[0_4px_20px_-10px_rgba(169,100,124,0.1)]">
      <p className="text-[10px] uppercase tracking-widest text-[#8C666B] font-semibold mb-1">{label}</p>
      <h3 className={`text-2xl font-['Cormorant_Garamond',_serif] font-medium ${color}`}>{value}</h3>
    </div>
  )
}