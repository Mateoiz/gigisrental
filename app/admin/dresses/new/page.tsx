'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { compressImage, compressImages, slugify } from '@/lib/imageCompress'
import { useRequireAuth } from '../../useRequireAuth'

const BUCKET = 'collections'

type ToastState = { id: number; message: string; tone: 'success' | 'error' }

export default function NewDressPage() {
  const { checked } = useRequireAuth()
  const router = useRouter()

  const [name, setName] = useState('')
  const [category, setCategory] = useState('long')
  const [description, setDescription] = useState('')
  const [basePrice, setBasePrice] = useState('')
  const [extraDayRate, setExtraDayRate] = useState('')
  const [bust, setBust] = useState('')
  const [waist, setWaist] = useState('')
  const [length, setLength] = useState('')
  const [imageBase, setImageBase] = useState<File | null>(null)
  const [imageHover, setImageHover] = useState<File | null>(null)
  const [galleryFiles, setGalleryFiles] = useState<File[]>([])

  const [basePreview, setBasePreview] = useState<string | null>(null)
  const [hoverPreview, setHoverPreview] = useState<string | null>(null)
  const [galleryPreviews, setGalleryPreviews] = useState<string[]>([])

  const [statusStep, setStatusStep] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [toasts, setToasts] = useState<ToastState[]>([])

  const showToast = useCallback((message: string, tone: 'success' | 'error' = 'success') => {
    const id = Date.now() + Math.random()
    setToasts((t) => [...t, { id, message, tone }])
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3800)
  }, [])

  // Build/clean up object URL previews
  useEffect(() => {
    if (!imageBase) return setBasePreview(null)
    const url = URL.createObjectURL(imageBase)
    setBasePreview(url)
    return () => URL.revokeObjectURL(url)
  }, [imageBase])

  useEffect(() => {
    if (!imageHover) return setHoverPreview(null)
    const url = URL.createObjectURL(imageHover)
    setHoverPreview(url)
    return () => URL.revokeObjectURL(url)
  }, [imageHover])

  useEffect(() => {
    const urls = galleryFiles.map((f) => URL.createObjectURL(f))
    setGalleryPreviews(urls)
    return () => urls.forEach((u) => URL.revokeObjectURL(u))
  }, [galleryFiles])

  if (!checked) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FFFDF9]">
        <div className="w-8 h-8 border-4 border-[#F2E6E8] border-t-[#A9647C] rounded-full animate-spin" />
      </div>
    )
  }

  const removeGalleryFile = (index: number) => {
    setGalleryFiles((files) => files.filter((_, i) => i !== index))
  }

  const uploadOne = async (file: File, slug: string, label: string): Promise<string> => {
    const path = `${slug}/${label}-${Date.now()}.jpg`
    const { error: uploadError } = await supabase.storage.from(BUCKET).upload(path, file, {
      contentType: 'image/jpeg',
      upsert: false,
    })
    if (uploadError) throw new Error(`Upload failed (${label}): ${uploadError.message}`)
    const { data } = supabase.storage.from(BUCKET).getPublicUrl(path)
    return data.publicUrl
  }

  const resetForm = () => {
    setName('')
    setCategory('long')
    setDescription('')
    setBasePrice('')
    setExtraDayRate('')
    setBust('')
    setWaist('')
    setLength('')
    setImageBase(null)
    setImageHover(null)
    setGalleryFiles([])
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!name.trim() || !imageBase) {
      showToast('Name and a main image are required.', 'error')
      return
    }

    setSubmitting(true)
    try {
      const slug = slugify(name)

      setStatusStep('Compressing images')
      const [compressedBase, compressedHover, compressedGallery] = await Promise.all([
        compressImage(imageBase),
        imageHover ? compressImage(imageHover) : Promise.resolve(null),
        compressImages(galleryFiles),
      ])

      setStatusStep('Uploading main image')
      const imageBaseUrl = await uploadOne(compressedBase, slug, 'base')

      let imageHoverUrl: string | null = null
      if (compressedHover) {
        setStatusStep('Uploading hover image')
        imageHoverUrl = await uploadOne(compressedHover, slug, 'hover')
      }

      const galleryUrls: string[] = []
      for (let i = 0; i < compressedGallery.length; i++) {
        setStatusStep(`Uploading gallery image ${i + 1} of ${compressedGallery.length}`)
        galleryUrls.push(await uploadOne(compressedGallery[i], slug, `gallery-${i + 1}`))
      }

      setStatusStep('Saving dress')
      const { error: insertError } = await supabase.from('dresses').insert({
        slug,
        name: name.trim(),
        category,
        description: description.trim() || null,
        base_price: Number(basePrice) || 0,
        extra_day_rate: Number(extraDayRate) || 0,
        bust: bust.trim() || null,
        waist: waist.trim() || null,
        length: length.trim() || null,
        image_base: imageBaseUrl,
        image_hover: imageHoverUrl,
        gallery: galleryUrls,
        is_available: true,
      })

      if (insertError) throw new Error(insertError.message)

      showToast(`"${name.trim()}" was added to the collection.`)
      resetForm()
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
              <Link href="/admin/dresses" className="hover:text-[#A9647C] transition-colors">
                Dresses
              </Link>{' '}
              / New
            </p>
            <h1 className="text-4xl font-['Cormorant_Garamond',_serif] font-medium italic text-[#3D2C2E]">
              Add a New Piece
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
          {/* --- Details section --- */}
          <section className="flex flex-col gap-5">
            <h2 className="text-xs uppercase tracking-widest text-[#8C666B] font-bold border-b border-[#F7E8EC] pb-3">
              Details
            </h2>

            <Field label="Name">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Marina"
                required
                className={inputClass}
              />
            </Field>

            <div className="grid grid-cols-2 gap-4">
              <Field label="Category">
                <select value={category} onChange={(e) => setCategory(e.target.value)} className={inputClass}>
                  <option value="long">Long</option>
                  <option value="mini">Mini</option>
                </select>
              </Field>
              <Field label="Slug preview">
                <div className="px-3 py-2.5 rounded-xl bg-[#FFFBF7] border border-[#F7E8EC] text-sm text-[#8C666B] italic truncate">
                  {name.trim() ? slugify(name) : '—'}
                </div>
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

          {/* --- Pricing section --- */}
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
                  placeholder="0"
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
                  placeholder="0"
                  required
                  className={inputClass}
                />
              </Field>
            </div>
            {basePrice && (
              <p className="text-xs text-[#A9647C] bg-[#FDF2F5] border border-[#F7E8EC] rounded-lg px-3 py-2 inline-block w-fit">
                ₱{Number(basePrice).toLocaleString()} for 3 days
                {extraDayRate ? ` · +₱${Number(extraDayRate).toLocaleString()}/day after` : ''}
              </p>
            )}
          </section>

          {/* --- Measurements section --- */}
          <section className="flex flex-col gap-5">
            <h2 className="text-xs uppercase tracking-widest text-[#8C666B] font-bold border-b border-[#F7E8EC] pb-3">
              Measurements
            </h2>
            <div className="grid grid-cols-3 gap-4">
              <Field label="Bust">
                <input
                  value={bust}
                  onChange={(e) => setBust(e.target.value)}
                  placeholder='FS or e.g. 34 in'
                  className={inputClass}
                />
              </Field>
              <Field label="Waist">
                <input
                  value={waist}
                  onChange={(e) => setWaist(e.target.value)}
                  placeholder="e.g. 28 in"
                  className={inputClass}
                />
              </Field>
              <Field label="Length">
                <input
                  value={length}
                  onChange={(e) => setLength(e.target.value)}
                  placeholder="e.g. 51 in"
                  className={inputClass}
                />
              </Field>
            </div>
            <p className="text-xs text-[#B58A94]">
              Optional — leave blank if not applicable. Use &quot;FS&quot; for free size.
            </p>
          </section>

          {/* --- Photos section --- */}
          <section className="flex flex-col gap-5">
            <h2 className="text-xs uppercase tracking-widest text-[#8C666B] font-bold border-b border-[#F7E8EC] pb-3">
              Photos
            </h2>

            <div className="grid grid-cols-2 gap-4">
              <ImagePicker
                label="Main Image"
                required
                preview={basePreview}
                onChange={(f) => setImageBase(f)}
                onClear={() => setImageBase(null)}
              />
              <ImagePicker
                label="Hover Image"
                preview={hoverPreview}
                onChange={(f) => setImageHover(f)}
                onClear={() => setImageHover(null)}
              />
            </div>

            <Field label="Extra Gallery Images">
              <label className="flex items-center justify-center gap-2 border-2 border-dashed border-[#E5D7D3] rounded-xl py-4 text-sm text-[#8C666B] cursor-pointer hover:border-[#A9647C] hover:bg-[#FFFBF7] transition-colors">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
                Click to add gallery images
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => setGalleryFiles((prev) => [...prev, ...Array.from(e.target.files ?? [])])}
                  className="hidden"
                />
              </label>

              {galleryPreviews.length > 0 && (
                <div className="grid grid-cols-4 gap-3 mt-3">
                  {galleryPreviews.map((src, i) => (
                    <div key={i} className="relative aspect-[3/4] rounded-lg overflow-hidden border border-[#F7E8EC] group">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={src} alt="" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => removeGalleryFile(i)}
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
              {submitting ? 'Saving...' : 'Add Dress to Collection'}
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
              t.tone === 'error'
                ? 'bg-red-50 text-red-700 border-red-200'
                : 'bg-white text-[#3D2C2E] border-[#F7E8EC]'
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

// --- Small building blocks ---

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs uppercase tracking-widest font-semibold text-[#8C666B]">{label}</span>
      {children}
    </label>
  )
}

function ImagePicker({
  label,
  required,
  preview,
  onChange,
  onClear,
}: {
  label: string
  required?: boolean
  preview: string | null
  onChange: (file: File | null) => void
  onClear: () => void
}) {
  return (
    <Field label={required ? `${label} *` : label}>
      {preview ? (
        <div className="relative aspect-[3/4] rounded-xl overflow-hidden border border-[#F7E8EC] group">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={preview} alt="" className="w-full h-full object-cover" />
          <button
            type="button"
            onClick={onClear}
            className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            aria-label="Remove image"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
      ) : (
        <label className="flex flex-col items-center justify-center gap-2 aspect-[3/4] border-2 border-dashed border-[#E5D7D3] rounded-xl text-[#8C666B] cursor-pointer hover:border-[#A9647C] hover:bg-[#FFFBF7] transition-colors">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <polyline points="21 15 16 10 5 21" />
          </svg>
          <span className="text-xs text-center px-2">Click to upload</span>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => onChange(e.target.files?.[0] ?? null)}
            required={required}
            className="hidden"
          />
        </label>
      )}
    </Field>
  )
}

const inputClass =
  'w-full border border-[#E5D7D3] rounded-xl p-3 outline-none focus:border-[#A9647C] transition-colors bg-[#FFFBF7] text-sm'