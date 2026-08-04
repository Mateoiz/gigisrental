'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import Footer from '@/app/components/Footer'
import CoquetteBow from '@/app/components/CoquetteBow'

interface Dress {
  id: string
  slug: string
  name: string
  category: string | null
  description: string | null
  image_base: string | null
  image_hover: string | null
  gallery: string[] | null // Added to support extra shots
  is_available: boolean
}

export default function DressDetailPage() {
  const params = useParams()
  const slug = params?.slug as string

const [dress, setDress] = useState<Dress | null>(null)
const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)
  const [allImages, setAllImages] = useState<string[]>([])
  const [zoomedImage, setZoomedImage] = useState<string | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  // Prevent background scrolling and allow Escape key to close lightbox

// Prevent background scrolling and allow Escape key to close lightbox
  useEffect(() => {
    if (zoomedImage) {
      document.body.style.overflow = 'hidden'
      
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setZoomedImage(null)
      }
      window.addEventListener('keydown', handleKeyDown)
      return () => {
        document.body.style.overflow = 'unset'
        window.removeEventListener('keydown', handleKeyDown)
      }
    } else {
document.body.style.overflow = 'unset'
    }
  }, [zoomedImage])

  // Scroll-Spy: Track which image is currently in view
// Scroll-Spy: Track which image is currently in view
  useEffect(() => {
    if (allImages.length === 0) return
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id.split('-').pop()
            if (id) setActiveIndex(Number(id))
          }
        })
      },
      { threshold: 0.6 } // Works for both desktop vertical scroll and mobile horizontal swipe
    )

    allImages.forEach((_, index) => {
      const el = document.getElementById(`gallery-img-${index}`)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [allImages])

  useEffect(() => {
    if (!slug) return
    const fetchDress = async () => {
      const { data, error } = await supabase
        .from('dresses')
        .select('*')
        .eq('slug', slug)
        .single()

      if (error || !data) {
        setNotFound(true)
      } else {
        setDress(data)
        
// Compile all unique images into a single array for the gallery
        const images: string[] = []
        if (data.image_base) images.push(data.image_base)
        if (data.image_hover) images.push(data.image_hover)
        if (data.gallery && Array.isArray(data.gallery)) {
          data.gallery.forEach((img: string) => {
            if (!images.includes(img)) images.push(img)
          })
        }
        setAllImages(images)
      }
      setLoading(false)
    }
    fetchDress()
  }, [slug])

return (
    <>
<style dangerouslySetInnerHTML={{ __html: DRESS_STYLES }} />

      <section className="dress-detail-section">
        <div className="wrap">
          
          {loading && (
            <div className="dress-detail">
              <div className="dress-visuals">
                <div className="dress-thumbnails hidden-mobile">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="skeleton-box" style={{ aspectRatio: '3/4', width: '100%' }} />
                  ))}
                </div>
                <div className="dress-gallery scroll-display">
                  <div className="skeleton-box" style={{ aspectRatio: '3/4', width: '100%' }} />
                </div>
              </div>
              <div className="dress-detail-info">
                <div className="skeleton-box" style={{ width: '120px', height: '24px', borderRadius: '999px' }} />
                <div className="skeleton-box" style={{ width: '80%', height: '48px', marginTop: '16px' }} />
                <div className="skeleton-box" style={{ width: '100%', height: '100px', marginTop: '16px' }} />
                <div className="skeleton-box" style={{ width: '200px', height: '48px', borderRadius: '999px', marginTop: '24px' }} />
              </div>
            </div>
          )}

          {notFound && (
            <div className="dress-status">
              <p>We couldn&apos;t find that piece.</p>
              <Link href="/collections" className="btn btn-ghost">
                Back to Collection
              </Link>
            </div>
          )}

{dress && (
            <div className="dress-detail">
              
              {/* Left Side: Thumbnails & Main Images */}
              <div className="dress-visuals">
                
                {/* Mini Thumbnail Scroll (Desktop Only) */}
                {allImages.length > 1 && (
                  <div className="dress-thumbnails">
                    {allImages.map((img, index) => (
<button
                        key={`thumb-${index}`}
                        type="button"
                        onClick={() => {
                          document.getElementById(`gallery-img-${index}`)?.scrollIntoView({ 
                            behavior: 'smooth', 
                            block: 'center' 
                          })
                        }}
                        className={`dress-thumbnail-item ${activeIndex === index ? 'is-active' : ''}`}
                        style={{ backgroundImage: `url('${img}')` }}
                        aria-label={`Scroll to image ${index + 1}`}
                      />
                    ))}
                  </div>
                )}

                {/* Editorial Scroll Display */}
{/* Editorial Scroll Display */}
                <div className="dress-gallery scroll-display">
                  {allImages.map((img, index) => (
                    <button
                      key={index}
                      id={`gallery-img-${index}`}
                      type="button"
                      onClick={() => setZoomedImage(img)}
                      onMouseMove={(e) => {
                        const { left, top, width, height } = e.currentTarget.getBoundingClientRect()
                        const x = ((e.clientX - left) / width) * 100
                        const y = ((e.clientY - top) / height) * 100
                        e.currentTarget.style.backgroundPosition = `${x}% ${y}%`
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundPosition = 'center'
                      }}
                      className="dress-gallery-item"
                      aria-label="View zoomed image"
                      style={{ 
                        backgroundImage: `url('${img}')`,
                        animationDelay: `${index * 0.15}s` 
                      }}
                    />
))}
                </div>
                
                {/* Mobile Pagination Dots */}
                <div className="mobile-pagination">
                  {allImages.map((_, index) => (
                    <div 
                      key={`dot-${index}`} 
                      className={`mobile-dot ${activeIndex === index ? 'is-active' : ''}`} 
                    />
                  ))}
                </div>

              </div>

              <div className="dress-detail-info">
                <span className="eyebrow-pill">
                  <CoquetteBow width={18} height={12} style={{ color: 'var(--rose-deep)' }} />
                  {dress.category || 'Featured Piece'}
                </span>
                <h1 className="dress-detail-name">{dress.name}</h1>
                {dress.description && (
                  <p className="dress-detail-desc">{dress.description}</p>
                )}

                {!dress.is_available && (
                  <p className="dress-detail-unavailable">Currently unavailable for booking.</p>
                )}

<div className="dress-detail-cta">
                  <Link
                    href={dress.is_available ? `/booking?dress=${dress.slug}` : '#'}
                    className={`btn btn-primary ${!dress.is_available ? 'btn-disabled' : ''}`}
                  >
                    Rent This Dress
                  </Link>
<Link href="/collections" className="btn btn-ghost">
                    Back to Collection
                  </Link>
                </div>
              </div>
            </div>
          )}
</div>
      </section>

      {/* Full-Screen Zoom Lightbox */}
      {zoomedImage && (
        <div className="lightbox-overlay" onClick={() => setZoomedImage(null)}>
          <button className="lightbox-close" onClick={() => setZoomedImage(null)} aria-label="Close zoom">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
          <div className="lightbox-content">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={zoomedImage} alt="Zoomed dress detail" className="lightbox-image" />
          </div>
        </div>
      )}

      <Footer />
    </>
  )
}

const DRESS_STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Jost:wght@300;400;500;600&display=swap');

.dress-detail-section {
  --porcelain: #FFFDF9;
  --rose: #D48B9D;
  --rose-deep: #A9647C;
  --mocha: #3D2C2E;
  --mocha-soft: #8C666B;
  --blush-ribbon: #FDF2F5;
  background: var(--porcelain);
  padding: clamp(48px, 8vw, 96px) 0;
  min-height: 70vh;
  font-family: 'Jost', sans-serif;
  color: var(--mocha);
}
.dress-detail-section * { box-sizing: border-box; }
.wrap { width: 100%; max-width: 1080px; margin: 0 auto; padding: 0 clamp(20px, 5vw, 48px); }

.dress-status { text-align: center; display: flex; flex-direction: column; align-items: center; gap: 20px; padding: 60px 0; }

.dress-detail {
  display: grid;
  grid-template-columns: 1.4fr 1fr; /* Images dominate the layout */
  gap: clamp(40px, 6vw, 80px);
  align-items: start;
}
@media (max-width: 760px) { .dress-detail { grid-template-columns: 1fr; } }

/* --- Lookbook Gallery Grid --- */
/* --- Visuals Container & Thumbnails --- */
.dress-visuals {
  display: flex;
  gap: 16px;
  align-items: flex-start;
}

.dress-thumbnails {
  display: flex;
  flex-direction: column;
  gap: 12px;
  position: sticky;
  top: 120px; /* Aligns with the sticky info panel */
  width: 64px;
  flex-shrink: 0;
}

.dress-thumbnail-item {
  width: 100%;
  aspect-ratio: 3 / 4;
  background-size: cover;
  background-position: center;
  background-color: #FBF9F6;
  border: 1px solid transparent;
  border-radius: 2px;
  cursor: pointer;
  padding: 0;
  opacity: 0.5;
  transition: all 0.3s ease;
}

.dress-thumbnail-item:hover,
.dress-thumbnail-item.is-active {
  opacity: 1;
  border-color: var(--rose-deep);
}

/* --- Skeleton Loading States --- */
.skeleton-box {
  background: linear-gradient(90deg, #FDF2F5 25%, #FFFDF9 50%, #FDF2F5 75%);
  background-size: 200% 100%;
  animation: skeletonShimmer 1.5s infinite linear;
  border-radius: 4px;
}
@keyframes skeletonShimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
@media (max-width: 760px) {
  .hidden-mobile { display: none !important; }
}

/* --- Editorial Scroll Display --- */
.dress-gallery.scroll-display {
  display: flex;
  flex-direction: column;
  gap: 8px; /* Tighter editorial spacing */
  flex-grow: 1;
}
.dress-gallery-item {
  position: relative;
  width: 100%;
  aspect-ratio: 3 / 4;
  background-size: cover;
  background-position: center;
  background-color: #FBF9F6;
  border: none;
  border-radius: 2px;
  cursor: zoom-in;
  opacity: 0;
  animation: fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  overflow: hidden;
  padding: 0;
  outline: none;
  transition: background-size 0.3s ease-out; /* Smoothly zooms in */
}

/* The hover scanning zoom (Desktop only) */
@media (hover: hover) {
  .dress-gallery-item:hover {
    background-size: 250%; /* Adjust this number to increase/decrease the magnification level */
  }
}

@keyframes fadeUp {
  0% { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
}

/* Lightbox Zoom Overlay */
.lightbox-overlay {
  position: fixed;
  inset: 0;
  z-index: 1000;
  background: rgba(255, 253, 249, 0.95);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: zoom-out;
  animation: fadeIn 0.3s ease forwards;
}
.lightbox-close {
  position: absolute;
  top: 24px;
  right: 24px;
  background: none;
  border: none;
  color: var(--mocha);
  cursor: pointer;
  z-index: 1001;
  padding: 8px;
  transition: transform 0.2s ease;
}
.lightbox-close:hover {
  transform: scale(1.1);
  color: var(--rose-deep);
}
.lightbox-content {
  width: 100%;
  height: 100%;
  padding: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.lightbox-image {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  box-shadow: 0 20px 40px -10px rgba(0,0,0,0.1);
  border-radius: 4px;
  animation: scaleUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes fadeIn {
  0% { opacity: 0; }
  100% { opacity: 1; }
}
@keyframes scaleUp {
  0% { opacity: 0; transform: scale(0.95); }
  100% { opacity: 1; transform: scale(1); }
}

/* --- Mobile Pagination Dots --- */
.mobile-pagination {
  display: none;
  justify-content: center;
  align-items: center;
  gap: 8px;
  padding-top: 16px;
  width: 100%;
}
.mobile-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: rgba(169, 100, 124, 0.2);
  transition: all 0.3s ease;
}
.mobile-dot.is-active {
  background: var(--rose-deep);
  transform: scale(1.3);
}

@media (max-width: 760px) {
  .dress-thumbnails { display: none; }
  .mobile-pagination { display: flex; }
  
  /* App-like Swipeable Gallery */
  .dress-gallery.scroll-display {
    flex-direction: row;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    margin: 0 -20px; /* Bleed to edges */
    padding: 0 20px;
    scrollbar-width: none; /* Firefox */
  }
  .dress-gallery.scroll-display::-webkit-scrollbar {
    display: none; /* Chrome/Safari: Hide scrollbar completely */
  }
  .dress-gallery-item {
    flex: 0 0 88%; /* Peek of next image */
    scroll-snap-align: center;
    border-radius: 8px; /* Slightly softer corners on mobile */
  }
  
  /* Sticky Action Bar for Mobile */
  .dress-detail-info {
    padding-bottom: 120px; /* Prevent text from hiding under the fixed bar */
  }
  .dress-detail-cta {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    margin: 0;
    padding: 16px 20px 24px;
    background: rgba(255, 253, 249, 0.85);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border-top: 1px solid rgba(169, 100, 124, 0.15);
    z-index: 100;
    display: flex;
    flex-direction: row;
    justify-content: stretch;
  }
  .dress-detail-cta .btn {
    flex: 1;
    justify-content: center;
    padding: 16px 20px;
  }
  .lightbox-content { padding: 16px; }
}

/* --- Sticky Detail Info --- */
.dress-detail-info { 
  display: flex; 
  flex-direction: column; 
  align-items: flex-start; 
  gap: 16px; 
  padding-top: 8px;
  position: sticky;
  top: 120px; /* Adjust this value if it sits too close to your Navbar */
}
.eyebrow-pill {
  display: inline-flex; align-items: center; gap: 10px;
  padding: 8px 22px; border-radius: 999px;
  border: 1px dashed var(--rose);
  background: rgba(255,255,255,.9);
  font-size: .72rem; font-weight: 500; letter-spacing: .14em; text-transform: uppercase;
  color: var(--rose-deep);
}
.dress-detail-name { font-family: 'Cormorant Garamond', serif; font-size: clamp(2.4rem, 5vw, 3.4rem); font-weight: 500; }
.dress-detail-desc { color: var(--mocha-soft); line-height: 1.75; font-size: 1rem; }
.dress-detail-unavailable { color: var(--rose-deep); font-style: italic; }

.dress-detail-cta { display: flex; gap: 14px; flex-wrap: wrap; margin-top: 12px; }
.btn {
  font-family: 'Jost', sans-serif;
  display: inline-flex; align-items: center; gap: 10px;
  padding: 14px 32px; border-radius: 999px; border: none;
  font-size: .8rem; font-weight: 500; letter-spacing: .12em; text-transform: uppercase;
  cursor: pointer; transition: all .25s ease;
}
.btn-primary { background: var(--mocha); color: #fff; }
.btn-primary:hover { background: var(--rose-deep); }
.btn-disabled { opacity: .4; pointer-events: none; }
.btn-ghost { border: 1px dashed var(--rose-deep); color: var(--mocha); background: rgba(255,255,255,.75); }
.btn-ghost:hover { background: var(--blush-ribbon); border-style: solid; color: var(--rose-deep); }
`