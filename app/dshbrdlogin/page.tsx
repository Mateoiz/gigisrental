'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    
    const { data, error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (signInError) {
      setError('Invalid login credentials.')
      setLoading(false)
      return
    }

    // Check if the logged-in user matches your environment variable admin email
    if (data.user?.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL) {
      router.push('/admin') // Redirect to dashboard
    } else {
      setError('Unauthorized account.')
      await supabase.auth.signOut()
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#FFFDF9] p-6 font-['Jost',_sans-serif]">
      <Link href="/" className="mb-8 font-['Parisienne',_cursive] text-5xl text-[#A9647C] drop-shadow-sm transition-transform hover:scale-105">
        Gigi&apos;s Rentals
      </Link>
      
      <form onSubmit={handleLogin} className="bg-white p-8 md:p-10 rounded-3xl shadow-[0_8px_30px_-12px_rgba(169,100,124,0.15)] border border-[#F7E8EC] max-w-sm w-full flex flex-col gap-5 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#D48B9D] via-[#E8C4CE] to-[#D48B9D]" />
        
        <div className="text-center mb-2">
          <h2 className="font-['Cormorant_Garamond',_serif] text-3xl italic font-semibold text-[#3D2C2E]">Studio Login</h2>
          <p className="text-[#8C666B] text-sm mt-1">Authorized personnel only</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg border border-red-100 text-center">
            {error}
          </div>
        )}

        <div className="flex flex-col gap-1.5">
          <label className="text-xs uppercase tracking-widest font-semibold text-[#8C666B]">Email</label>
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-[#E5D7D3] rounded-xl p-3 outline-none focus:border-[#A9647C] transition-colors bg-[#FFFBF7]"
            required
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs uppercase tracking-widest font-semibold text-[#8C666B]">Password</label>
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-[#E5D7D3] rounded-xl p-3 outline-none focus:border-[#A9647C] transition-colors bg-[#FFFBF7]"
            required
          />
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className="mt-4 w-full bg-[#3D2C2E] text-white py-3.5 rounded-full font-medium uppercase tracking-widest text-sm hover:bg-[#A9647C] transition-colors shadow-sm hover:shadow-md disabled:opacity-50"
        >
          {loading ? 'Authenticating...' : 'Enter Dashboard'}
        </button>
      </form>
    </div>
  )
}