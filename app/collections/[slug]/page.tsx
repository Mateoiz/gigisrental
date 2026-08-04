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
  is_available: boolean
}

export default function DressDetailPage() {
  const params = useParams()
  const slug = params?.slug as string

  const [dress, setDress] = useState<Dress | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

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
      }
      setLoading(false)
    }
    fetchDress()
  }, [slug])

  return (
    <>
      <style>{DRESS_STYLES}</style>

      <section className="dress-detail-section">
        <div className="wrap">
          {loading && <p className="dress-status">Loading...</p>}

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
              <div className="dress-detail-photo-wrap">
                <div
                  className="dress-detail-photo dress-detail-photo-base"
                  style={{ backgroundImage: `url('${dress.image_base}')` }}
                />
                {dress.image_hover && (
                  <div
                    className="dress-detail-photo dress-detail-photo-hover"
                    style={{ backgroundImage: `url('${dress.image_hover}')` }}
                  />
                )}
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
  grid-template-columns: 1fr 1fr;
  gap: clamp(32px, 5vw, 64px);
  align-items: start;
}
@media (max-width: 760px) { .dress-detail { grid-template-columns: 1fr; } }

.dress-detail-photo-wrap {
  position: relative;
  aspect-ratio: 3 / 4;
  background: #fff;
  border-radius: 20px;
  border: 1px solid rgba(169,100,124,.3);
  overflow: hidden;
}
.dress-detail-photo { position: absolute; inset: 0; background-size: cover; background-position: center; transition: opacity .5s ease; }
.dress-detail-photo-base { opacity: 1; z-index: 1; }
.dress-detail-photo-hover { opacity: 0; z-index: 2; }
.dress-detail-photo-wrap:hover .dress-detail-photo-hover { opacity: 1; }

.dress-detail-info { display: flex; flex-direction: column; align-items: flex-start; gap: 16px; padding-top: 8px; }
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