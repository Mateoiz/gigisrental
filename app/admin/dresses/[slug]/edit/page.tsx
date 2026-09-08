'use client'

import { useState, useEffect, useCallback } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { compressImage, compressImages } from '@/lib/imageCompress'
import { useRequireAuth } from '../../../useRequireAuth'

const BUCKET = 'collections'

type ToastState = { id: number; message: string; tone: 'success' | 'error' }

interface DressRow {
  id: string
  slug: string
  name: string
  category: string | null
  description: string | null
  base_price: number
  extra_day_rate: number
  bust: string | null
  waist: string | null
  length: string | null
  image_base: string | null
  image_hover: string | null
  gallery: string[] | null
  is_available: boolean
}

export default function EditDressPage() {
  const { checked } = useRequireAuth()
  const router = useRouter()
  const params = useParams()
  const slug = params?.slug as string

  const [dressId, setDressId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  const [name, setName] = useState('')
  const [category, setCategory] = useState('long')
  const [description, setDescription] = useState('')
  const [basePrice, setBasePrice] = useState('')
  const [extraDayRate, setExtraDayRate] = useState('')
  const [bust, setBust] = useState('')
  const [waist, setWaist] = useState('')
  const [length, setLength] = useState('')
  const [isAvailable, setIsAvailable] = useState(true)

  // Existing (already uploaded) images — as URLs
  const [existingBase, setExistingBase] = useState<string | null>(null)
  const [existingHover, setExistingHover] = useState<string | null>(null)
  const [existingGallery, setExistingGallery] = useState<string[]>([])

  // New replacements / additions — as local Files, with previews
  const [newImageBase, setNewImageBase] = useState<File | null>(null)
  const [newImageHover, setNewImageHover] = useState<File | null>(null)
  const [newGalleryFiles, setNewGalleryFiles] = useState<File[]>([])

  const [basePreview, setBasePreview] = useState<string | null>(null)
  const [hoverPreview, setHoverPreview] = useState<string | null>(null)
  const [newGalleryPreviews, setNewGalleryPreviews] = useState<string[]>([])

  const [statusStep, setStatusStep] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [toasts, setToasts] = useState<ToastState[]>([])

  const showToast = useCallback((message: string, tone: 'success' | 'error' = 'success') => {
    const id = Date.now() + Math.random()
    setToasts((t) => [...t, { id, message, tone }])
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3800)
  }, [])

  // Fetch existing dress
  useEffect(() => {
    if (!checked || !slug) return
    const fetchDress = async () => {
      const { data, error } = await supabase.from('dresses').select('*').eq('slug', slug).single()
      if (error || !data) {
        setNotFound(true)
        setLoading(false)
        return
      }
      const dress = data as DressRow
      setDressId(dress.id)
      setName(dress.name)
      setCategory(dress.category ?? 'long')
      setDescription(dress.description ?? '')
      setBasePrice(String(dress.base_price ?? ''))
      setExtraDayRate(String(dress.extra_day_rate ?? ''))
      setBust(dress.bust ?? '')
      setWaist(dress.waist ?? '')
      setLength(dress.length ?? '')
      setIsAvailable(dress.is_available)
      setExistingBase(dress.image_base)
      setExistingHover(dress.image_hover)
      setExistingGallery(dress.gallery ?? [])
      setLoading(false)
    }
    fetchDress()
  }, [checked, slug])

  // Local preview URLs for newly picked files
  useEffect(() => {
    if (!newImageBase) return setBasePreview(null)
    const url = URL.createObjectURL(newImageBase)
    setBasePreview(url)
    return () => URL.revokeObjectURL(url)
  }, [newImageBase])

  useEffect(() => {
    if (!newImageHover) return setHoverPreview(null)
    const url = URL.createObjectURL(newImageHover)
    setHoverPreview(url)
    return () => URL.revokeObjectURL(url)
  }, [newImageHover])

  useEffect(() => {
    const urls = newGalleryFiles.map((f) => URL.createObjectURL(f))
    setNewGalleryPreviews(urls)
    return () => urls.forEach((u) => URL.revokeObjectURL(u))
  }, [newGalleryFiles])

  if (!checked || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FFFDF9]">
        <div className="w-8 h-8 border-4 border-[#F2E6E8] border-t-[#A9647C] rounded-full animate-spin" />
      </div>
    )
  }

  if (notFound) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#FFFDF9] gap-4 font-['Jost',_sans-serif]">
        <p className="text-[#3D2C2E] font-['Cormorant_Garamond',_serif] italic text-xl">Dress not found</p>
        <Link href="/admin/dresses" className="text-sm text-[#A9647C] underline">
          Back to Dresses
        </Link>
      </div>
    )
  }

  const uploadOne = async (file: File, label: string): Promise<string> => {
    const path = `${slug}/${label}-${Date.now()}.jpg`
    const { error: uploadError } = await supabase.storage.from(BUCKET).upload(path, file, {
      contentType: 'image/jpeg',
      upsert: false,
    })
    if (uploadError) throw new Error(`Upload failed (${label}): ${uploadError.message}`)
    const { data } = supabase.storage.from(BUCKET).getPublicUrl(path)
    return data.publicUrl
  }

  const removeExistingGalleryImage = (url: string) => {
    setExistingGallery((prev) => prev.filter((u) => u !== url))
  }

  const removeNewGalleryFile = (index: number) => {
    setNewGalleryFiles((files) => files.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!dressId) return
    if (!name.trim()) {
      showToast('Name is required.', 'error')
      return
    }

    setSubmitting(true)
    try {
      let imageBaseUrl = existingBase
      let imageHoverUrl = existingHover

      if (newImageBase) {
        setStatusStep('Compressing & uploading main image')
        const compressed = await compressImage(newImageBase)
        imageBaseUrl = await uploadOne(compressed, 'base')
      }

      if (newImageHover) {
        setStatusStep('Compressing & uploading hover image')
        const compressed = await compressImage(newImageHover)
        imageHoverUrl = await uploadOne(compressed, 'hover')
      }

      const newGalleryUrls: string[] = []
      if (newGalleryFiles.length > 0) {
        setStatusStep('Compressing new gallery images')
        const compressedGallery = await compressImages(newGalleryFiles)
        for (let i = 0; i < compressedGallery.length; i++) {
          setStatusStep(`Uploading new gallery image ${i + 1} of ${compressedGallery.length}`)
          newGalleryUrls.push(await uploadOne(compressedGallery[i], `gallery-${Date.now()}-${i}`))
        }
      }

      const finalGallery = [...existingGallery, ...newGalleryUrls]

      setStatusStep('Saving changes')
      const { error: updateError } = await supabase
        .from('dresses')
        .update({
          name: name.trim(),
          category,
          description: description.trim() || null,
          base_price: Number(basePrice) || 0,
          extra_day_rate: Number(extraDayRate) || 0,
          bust: bust.trim() || null,
          waist: waist.trim() || null,
          length: length.trim() || null,
          is_available: isAvailable,
          image_base: imageBaseUrl,
          image_hover: imageHoverUrl,
          gallery: finalGallery,
        })
        .eq('id', dressId)

      if (updateError) throw new Error(updateError.message)

      showToast(`"${name.trim()}" was updated.`)
      setTimeout(() => router.push('/admin/dresses'), 900)
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Something went wrong.', 'error')
    } finally {
      setSubmitting(false)
      setStatusStep(null)
    }
  }

  return (
    <div className="min-h-screen bg-[#FFFDF9] p-6 md:p-12 font-['Jost',_sans-serif] text-[#3D2C2E]">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between gap-4 mb-8">
          <div>
            <p className="text-xs uppercase tracking-widest text-[#8C666B] font-semibold mb-1">
              <Link href="/admin/dresses" className="hover:text-[#A9647C] transition-colors">Dresses</Link> / Edit
            </p>
            <h1 className="text-4xl font-['Cormorant_Garamond',_serif] font-medium italic text-[#3D2C2E]">
              Edit &quot;{name}&quot;
            </h1>
          </div>
          <Link
            href="/admin/dresses"
            className="px-5 py-2 rounded-full border border-[#E5D7D3] text-[#8C666B] hover:bg-white transition-colors text-xs font-semibold uppercase tracking-widest whitespace-nowrap"
          >
            Cancel
          </Link>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white border border-[#F7E8EC] rounded-2xl shadow-[0_8px_30px_-12px_rgba(169,100,124,0.15)] p-6 md:p-8 flex flex-col gap-8"
        >
          {/* --- Details --- */}
          <section className="flex flex-col gap-5">
            <h2 className="text-xs uppercase tracking-widest text-[#8C666B] font-bold border-b border-[#F7E8EC] pb-3">
              Details
            </h2>

            <Field label="Name">
              <input value={name} onChange={(e) => setName(e.target.value)} required className={inputClass} />
            </Field>

            <div className="grid grid-cols-2 gap-4">
              <Field label="Category">
                <select value={category} onChange={(e) => setCategory(e.target.value)} className={inputClass}>
                  <option value="long">Long</option>
                  <option value="mini">Mini</option>
                </select>
              </Field>
              <Field label="Visibility">
                <button
                  type="button"
                  onClick={() => setIsAvailable((v) => !v)}
                  className={`w-full text-left px-3 py-2.5 rounded-xl border text-sm font-medium transition-colors ${
                    isAvailable
                      ? 'bg-green-50 border-green-200 text-green-700'
                      : 'bg-yellow-50 border-yellow-200 text-yellow-700'
                  }`}
                >
                  {isAvailable ? 'Visible on site' : 'Hidden from site'}
                </button>
              </Field>
            </div>

            <Field label="Description">
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                placeholder="A short, lovely description of the piece..."
                className={`${inputClass} resize-none`}
              />
            </Field>
          </section>

          {/* --- Pricing --- */}
          <section className="flex flex-col gap-5">
            <h2 className="text-xs uppercase tracking-widest text-[#8C666B] font-bold border-b border-[#F7E8EC] pb-3">
              Pricing
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Base Price (3 days, ₱)">
                <input
                  type="number"
                  min="0"
                  value={basePrice}
                  onChange={(e) => setBasePrice(e.target.value)}
                  required
                  className={inputClass}
                />
              </Field>
              <Field label="Extra Day Rate (₱)">
                <input
                  type="number"
                  min="0"
                  value={extraDayRate}
                  onChange={(e) => setExtraDayRate(e.target.value)}
                  required
                  className={inputClass}
                />
              </Field>
            </div>
          </section>

          {/* --- Measurements --- */}
          <section className="flex flex-col gap-5">
            <h2 className="text-xs uppercase tracking-widest text-[#8C666B] font-bold border-b border-[#F7E8EC] pb-3">
              Measurements
            </h2>
            <div className="grid grid-cols-3 gap-4">
              <Field label="Bust">
                <input value={bust} onChange={(e) => setBust(e.target.value)} placeholder="FS or e.g. 34 in" className={inputClass} />
              </Field>
              <Field label="Waist">
                <input value={waist} onChange={(e) => setWaist(e.target.value)} placeholder="e.g. 28 in" className={inputClass} />
              </Field>
              <Field label="Length">
                <input value={length} onChange={(e) => setLength(e.target.value)} placeholder="e.g. 51 in" className={inputClass} />
              </Field>
            </div>
          </section>

          {/* --- Photos --- */}
          <section className="flex flex-col gap-5">
            <h2 className="text-xs uppercase tracking-widest text-[#8C666B] font-bold border-b border-[#F7E8EC] pb-3">
              Photos
            </h2>

            <div className="grid grid-cols-2 gap-4">
              <ImageSlot
                label="Main Image"
                currentUrl={existingBase}
                newPreview={basePreview}
                onPick={(f) => setNewImageBase(f)}
                onUndo={() => setNewImageBase(null)}
              />
              <ImageSlot
                label="Hover Image"
                currentUrl={existingHover}
                newPreview={hoverPreview}
                onPick={(f) => setNewImageHover(f)}
                onUndo={() => setNewImageHover(null)}
              />
            </div>

            <Field label="Gallery Images">
              {existingGallery.length > 0 && (
                <div className="grid grid-cols-4 gap-3 mb-3">
                  {existingGallery.map((url) => (
                    <div key={url} className="relative aspect-[3/4] rounded-lg overflow-hidden border border-[#F7E8EC] group">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={url} alt="" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => removeExistingGalleryImage(url)}
                        className="absolute top-1 right-1 w-6 h-6 rounded-full bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        aria-label="Remove image"
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="18" y1="6" x2="6" y2="18" />
                          <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <label className="flex items-center justify-center gap-2 border-2 border-dashed border-[#E5D7D3] rounded-xl py-4 text-sm text-[#8C666B] cursor-pointer hover:border-[#A9647C] hover:bg-[#FFFBF7] transition-colors">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
                Add more gallery images
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => setNewGalleryFiles((prev) => [...prev, ...Array.from(e.target.files ?? [])])}
                  className="hidden"
                />
              </label>

              {newGalleryPreviews.length > 0 && (
                <div className="grid grid-cols-4 gap-3 mt-3">
                  {newGalleryPreviews.map((src, i) => (
                    <div key={i} className="relative aspect-[3/4] rounded-lg overflow-hidden border-2 border-[#A9647C] group">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={src} alt="" className="w-full h-full object-cover" />
                      <span className="absolute bottom-1 left-1 text-[9px] bg-[#A9647C] text-white px-1.5 py-0.5 rounded uppercase tracking-widest font-bold">
                        New
                      </span>
                      <button
                        type="button"
                        onClick={() => removeNewGalleryFile(i)}
                        className="absolute top-1 right-1 w-6 h-6 rounded-full bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        aria-label="Remove image"
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="18" y1="6" x2="6" y2="18" />
                          <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </Field>
          </section>

          {/* --- Submit --- */}
          <div className="flex flex-col gap-3 pt-2 border-t border-[#F7E8EC]">
            {statusStep && (
              <div className="flex items-center gap-2 text-sm text-[#8C666B]">
                <div className="w-3.5 h-3.5 border-2 border-[#F2E6E8] border-t-[#A9647C] rounded-full animate-spin" />
                {statusStep}...
              </div>
            )}
            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-[#3D2C2E] text-white py-3.5 rounded-full font-medium uppercase tracking-widest text-sm hover:bg-[#A9647C] transition-colors shadow-sm hover:shadow-md disabled:opacity-50"
            >
              {submitting ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>

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

// --- Building blocks ---

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs uppercase tracking-widest font-semibold text-[#8C666B]">{label}</span>
      {children}
    </label>
  )
}

function ImageSlot({
  label,
  currentUrl,
  newPreview,
  onPick,
  onUndo,
}: {
  label: string
  currentUrl: string | null
  newPreview: string | null
  onPick: (file: File | null) => void
  onUndo: () => void
}) {
  const displaySrc = newPreview ?? currentUrl

  return (
    <Field label={label}>
      {displaySrc ? (
        <div className="relative aspect-[3/4] rounded-xl overflow-hidden border border-[#F7E8EC] group">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={displaySrc} alt="" className="w-full h-full object-cover" />
          {newPreview && (
            <span className="absolute bottom-2 left-2 text-[9px] bg-[#A9647C] text-white px-1.5 py-0.5 rounded uppercase tracking-widest font-bold">
              New — not saved yet
            </span>
          )}
          <div className="absolute top-2 right-2 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
            {newPreview ? (
              <button
                type="button"
                onClick={onUndo}
                className="w-7 h-7 rounded-full bg-black/50 text-white flex items-center justify-center"
                aria-label="Undo new image"
                title="Revert to original"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="1 4 1 10 7 10" />
                  <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
                </svg>
              </button>
            ) : (
              <label className="w-7 h-7 rounded-full bg-black/50 text-white flex items-center justify-center cursor-pointer" title="Replace image">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 20h9" />
                  <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
                </svg>
                <input type="file" accept="image/*" onChange={(e) => onPick(e.target.files?.[0] ?? null)} className="hidden" />
              </label>
            )}
          </div>
        </div>
      ) : (
        <label className="flex flex-col items-center justify-center gap-2 aspect-[3/4] border-2 border-dashed border-[#E5D7D3] rounded-xl text-[#8C666B] cursor-pointer hover:border-[#A9647C] hover:bg-[#FFFBF7] transition-colors">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <polyline points="21 15 16 10 5 21" />
          </svg>
          <span className="text-xs text-center px-2">Click to upload</span>
          <input type="file" accept="image/*" onChange={(e) => onPick(e.target.files?.[0] ?? null)} className="hidden" />
        </label>
      )}
    </Field>
  )
}

const inputClass =
  'w-full border border-[#E5D7D3] rounded-xl p-3 outline-none focus:border-[#A9647C] transition-colors bg-[#FFFBF7] text-sm'