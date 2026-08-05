'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
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
                        aria-label={`Scroll to image ${index + 1}`}
                      >
                        <Image
                          src={img}
                          alt=""
                          fill
                          sizes="64px"
                          className="dress-thumbnail-img"
                        />
                      </button>
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
                        e.currentTarget.style.setProperty('--zoom-x', `${x}%`)
                        e.currentTarget.style.setProperty('--zoom-y', `${y}%`)
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.setProperty('--zoom-x', '50%')
                        e.currentTarget.style.setProperty('--zoom-y', '50%')
                      }}
                      className="dress-gallery-item"
                      aria-label="View zoomed image"
                      style={{ animationDelay: `${index * 0.15}s` }}
                    >
                      <Image
                        src={img}
                        alt=""
                        fill
                        sizes="(max-width: 760px) 88vw, 55vw"
                        priority={index === 0}
                        className="dress-gallery-img"
                      />
                    </button>
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
            <Image
              src={zoomedImage}
              alt="Zoomed dress detail"
              fill
              sizes="100vw"
              className="lightbox-image"
            />
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
  position: relative;
  width: 100%;
  aspect-ratio: 3 / 4;
  background-color: #FBF9F6;
  border: 1px solid transparent;
  border-radius: 2px;
  cursor: pointer;
  padding: 0;
  opacity: 0.5;
  overflow: hidden;
  transition: all 0.3s ease;
}
.dress-thumbnail-img { object-fit: cover; }

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
  background-color: #FBF9F6;
  border: none;
  border-radius: 2px;
  cursor: zoom-in;
  opacity: 0;
  animation: fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  overflow: hidden;
  padding: 0;
  outline: none;
  --zoom-x: 50%;
  --zoom-y: 50%;
}
.dress-gallery-img {
  object-fit: cover;
  transition: transform 0.3s ease-out;
  transform-origin: var(--zoom-x) var(--zoom-y);
}

/* The hover scanning zoom (Desktop only) */
@media (hover: hover) {
  .dress-gallery-item:hover .dress-gallery-img {
    transform: scale(2.5);
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
  position: relative;
  width: 100%;
  height: 100%;
  padding: 40px;
}
.lightbox-image {
  object-fit: contain;
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
  /* Remove global wrapper padding to allow true full-bleed for images */
  .wrap { padding: 0; } 
  .dress-status { padding: 60px 24px; }
  
  .dress-detail { 
    grid-template-columns: 1fr; 
    gap: 20px;
  }
  
  /* 1. Full-Bleed Editorial Images */
  .dress-visuals { 
    width: 100%; 
    position: relative; /* Critical: anchors the overlay pagination */
    flex-direction: column; 
    min-width: 0; 
  }
  .dress-thumbnails { display: none; }
  
  .dress-gallery.scroll-display {
    width: 100%;
    flex-direction: row;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    margin: 0; 
    padding: 0;
    scrollbar-width: none; 
  }
  .dress-gallery.scroll-display::-webkit-scrollbar {
    display: none; 
  }
  .dress-gallery-item {
    flex: 0 0 100vw; /* One single, highly focused image at a time */
    scroll-snap-align: center;
    border-radius: 0; /* Sharp, high-fashion edges */
  }
  
  /* 2. Floating Image Overlay Pagination */
  .mobile-pagination { 
    display: flex; 
    position: absolute;
    bottom: 24px;
    left: 0;
    right: 0;
    z-index: 10;
    padding: 0;
    pointer-events: none; /* Let swipes pass through */
  }
  .mobile-dot {
    background: rgba(255, 255, 255, 0.45); /* Elegant translucent white */
    width: 6px;
    height: 6px;
    box-shadow: 0 1px 4px rgba(0,0,0,0.15); /* Ensures visibility over light dresses */
  }
  .mobile-dot.is-active {
    background: #ffffff;
    transform: scale(1.35);
  }

  /* 3. Streamlined Text & Sticky CTA Hierarchy */
  .dress-detail-info {
    padding: 0 24px 120px 24px; /* Add the padding safely back to the text area */
  }
  
  .dress-detail-cta {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100vw;
    margin: 0;
    padding: 16px 24px calc(12px + env(safe-area-inset-bottom));
    background: rgba(255, 253, 249, 0.92);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border-top: 1px solid rgba(169, 100, 124, 0.15);
    z-index: 99999; 
    display: flex;
    flex-direction: row;
    gap: 12px;
  }
  
  /* Make the primary button dominate, secondary becomes a sleek outline */
  .dress-detail-cta .btn-primary {
    flex: 2;
    justify-content: center;
    padding: 16px;
  }
  .dress-detail-cta .btn-ghost {
    flex: 1;
    justify-content: center;
    padding: 16px 12px;
    font-size: 0.75rem;
    border: 1px solid rgba(169, 100, 124, 0.3);
    background: transparent;
  }
  
  .lightbox-content { padding: 0; }
  .lightbox-image { border-radius: 0; }
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