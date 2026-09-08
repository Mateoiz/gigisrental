'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Navbar from '@/app/components/Navbar'
import Footer from '@/app/components/Footer'
import CoquetteBow from '@/app/components/CoquetteBow'
import { supabase } from '@/lib/supabase'

interface Dress {
  slug: string
  name: string
  image_base: string | null
  image_hover: string | null
}

export default function WeddingGalleryPage() {
  const [dresses, setDresses] = useState<Dress[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchWeddingDresses = async () => {
      const { data, error } = await supabase
        .from('dresses')
        .select('slug, name, image_base, image_hover')
        .eq('category', 'wedding')
        .eq('is_available', true)
        .order('name')

      if (data && !error) setDresses(data)
      setLoading(false)
    }

    fetchWeddingDresses()
  }, [])

  return (
    <>
      <Navbar />
      <style>{WEDDING_STYLES}</style>

      <section className="wedding-section">
        <div className="wrap">
          <header className="wedding-header">
            <span className="eyebrow-pill">
              <CoquetteBow width={18} height={12} style={{ color: 'var(--rose-deep)' }} />
              Wedding Collection
            </span>
            <h1 className="wedding-heading">For Your Walk Down the Aisle</h1>
            <p className="wedding-lead">
              A curated selection of wedding gowns, reserved exclusively for
              brides-to-be — each piece ready for its own special day.
            </p>
          </header>

          {loading ? (
            <div className="wedding-loading">Curating the gowns...</div>
          ) : dresses.length === 0 ? (
            <p className="wedding-empty">
              Our wedding gowns are being prepared — check back soon, or
              browse the <Link href="/collections">full collection</Link> in
              the meantime.
            </p>
          ) : (
            <div className="wedding-grid">
              {dresses.map((dress, i) => (
                <Link key={dress.slug} href={`/collections/${dress.slug}`} className="wedding-card">
                  <div className="wedding-card-photo-wrap">
                    {dress.image_base && (
                      <Image
                        src={dress.image_base}
                        alt={dress.name}
                        fill
                        sizes="(max-width: 760px) 50vw, 25vw"
                        className="wedding-card-photo wedding-card-photo-base"
                        style={{ objectFit: 'cover' }}
                        quality={60}
                        priority={i < 4}
                        loading={i < 4 ? undefined : 'lazy'}
                      />
                    )}
                    {dress.image_hover && (
                      <Image
                        src={dress.image_hover}
                        alt=""
                        aria-hidden="true"
                        fill
                        sizes="(max-width: 760px) 50vw, 25vw"
                        className="wedding-card-photo wedding-card-photo-hover"
                        style={{ objectFit: 'cover' }}
                        quality={55}
                        loading="lazy"
                      />
                    )}
                    <span className="wedding-card-view">
                      <CoquetteBow width={14} height={9} style={{ color: 'var(--rose-deep)' }} />
                      View the piece
                    </span>
                  </div>
                  <div className="wedding-card-info">
                    <span className="wedding-card-name">{dress.name}</span>
                    <span className="wedding-card-rule" aria-hidden="true" />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </>
  )
}

const WEDDING_STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Jost:wght@300;400;500;600&display=swap');

.wedding-section {
  --porcelain: #FFFDF9;
  --card: #FFFFFF;
  --rose: #D48B9D;
  --rose-deep: #A9647C;
  --gold: #C9A876;
  --mocha: #3D2C2E;
  --mocha-soft: #8C666B;
  --tulle-dot: rgba(169, 100, 124, 0.12);
  --shadow-xs: 0 1px 2px rgba(61, 44, 46, .06), 0 2px 6px -2px rgba(169, 100, 124, .15);
  --shadow-md: 0 4px 8px rgba(61, 44, 46, .08), 0 16px 36px -12px rgba(169, 100, 124, .28);
  --ease-pop: cubic-bezier(0.34, 1.56, 0.64, 1);
  background: var(--porcelain);
  padding: 148px 0 clamp(80px, 10vw, 120px);
  font-family: 'Jost', sans-serif;
  color: var(--mocha);
  min-height: 100vh;
}
.wedding-section * { box-sizing: border-box; margin: 0; padding: 0; }
.wedding-section a { color: inherit; text-decoration: none; }
.wedding-card:focus-visible { outline: 2px solid var(--rose-deep); outline-offset: 4px; border-radius: 22px; }
.wrap { width: 100%; max-width: 1080px; margin: 0 auto; padding: 0 clamp(20px, 5vw, 48px); }

.wedding-header { display: flex; flex-direction: column; align-items: center; text-align: center; gap: 14px; margin-bottom: clamp(48px, 6vw, 72px); }
.eyebrow-pill {
  display: inline-flex; align-items: center; gap: 10px;
  padding: 8px 22px; border-radius: 999px;
  border: 1px dashed var(--gold);
  background: rgba(255,255,255,.9);
  font-size: .72rem; font-weight: 500; letter-spacing: .14em; text-transform: uppercase;
  color: var(--rose-deep);
}
.wedding-heading { font-family: 'Cormorant Garamond', serif; font-weight: 500; font-style: italic; font-size: clamp(2.4rem, 5vw, 3.6rem); }
.wedding-lead { color: var(--mocha-soft); font-size: clamp(1rem, 1.5vw, 1.1rem); line-height: 1.75; max-width: 560px; }
.wedding-lead a { text-decoration: underline; text-underline-offset: 3px; color: var(--rose-deep); }

.wedding-loading, .wedding-empty { text-align: center; color: var(--mocha-soft); font-style: italic; font-family: 'Cormorant Garamond', serif; font-size: 1.2rem; padding: 60px 20px; }

.wedding-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 260px));
  justify-content: center;
  gap: clamp(18px, 2.5vw, 26px);
}
.wedding-card {
  display: flex; flex-direction: column;
  border-radius: 22px; overflow: hidden;
  background: var(--card);
  border: 1px solid rgba(201,168,118,.4);
  box-shadow: var(--shadow-xs);
  transition: transform .3s var(--ease-pop), box-shadow .3s ease, border-color .3s ease;
  -webkit-tap-highlight-color: transparent;
}
.wedding-card:hover { transform: translateY(-6px) rotate(-.5deg); box-shadow: var(--shadow-md); border-color: var(--gold); }
.wedding-card:active { transform: scale(0.98); }

.wedding-card-photo-wrap {
  position: relative;
  aspect-ratio: 3 / 4;
  overflow: hidden;
  background: #ffffff;
  margin: 10px 10px 0;
  border-radius: 16px;
  border: 1px solid var(--tulle-dot);
  transition: border-color .3s ease;
}
.wedding-card:hover .wedding-card-photo-wrap { border: 1px dashed var(--gold); }
.wedding-card-photo { position: absolute; inset: 0; background-color: #FBF9F6; transition: opacity .45s ease, transform .45s var(--ease-pop); }
.wedding-card-photo-base { opacity: 1; z-index: 1; }
.wedding-card-photo-hover { opacity: 0; z-index: 2; transform: scale(1.04); }
.wedding-card:hover .wedding-card-photo-base { opacity: 0; }
.wedding-card:hover .wedding-card-photo-hover { opacity: 1; transform: scale(1); }

  .wedding-tag { top: 8px; left: 8px; padding: 4px 10px; font-size: .55rem; }

.wedding-card-view {
  position: absolute; left: 50%; bottom: 14px; z-index: 3;
  transform: translate(-50%, 10px);
  display: inline-flex; align-items: center; gap: 6px;
  background: rgba(255,255,255,.92); backdrop-filter: blur(4px);
  border: 1px solid var(--rose-deep); border-radius: 999px;
  padding: 6px 16px;
  font-size: .7rem; font-weight: 500; letter-spacing: .08em; text-transform: uppercase;
  color: var(--rose-deep);
  opacity: 0;
  transition: opacity .3s ease, transform .3s var(--ease-pop);
  white-space: nowrap;
}
.wedding-card:hover .wedding-card-view { opacity: 1; transform: translate(-50%, 0); }

.wedding-card-info { display: flex; flex-direction: column; align-items: center; gap: 6px; padding: 16px 14px 20px; text-align: center; }
.wedding-card-name { font-family: 'Cormorant Garamond', serif; font-style: italic; font-weight: 600; font-size: 1.15rem; color: var(--mocha); transition: color .3s ease; }
.wedding-card:hover .wedding-card-name { color: var(--rose-deep); }
.wedding-card-rule { width: 24px; height: 1px; background: linear-gradient(90deg, transparent, var(--gold), transparent); transition: width .3s ease; }
.wedding-card:hover .wedding-card-rule { width: 42px; }

@media (max-width: 760px) {
  .wedding-section { padding-top: 120px; }
  .wrap { padding: 0 16px; }
  .wedding-header { margin-bottom: 28px; gap: 10px; }
  .wedding-heading { font-size: 2rem; }
  .wedding-lead { font-size: 0.9rem; }
  .wedding-grid { grid-template-columns: repeat(2, 1fr); gap: 12px; }
  .wedding-card { border-radius: 14px; }
  .wedding-card-photo-wrap { margin: 6px 6px 0; border-radius: 10px; }
  .wedding-card-info { padding: 10px 8px 14px; gap: 4px; }
  .wedding-card-name { font-size: 0.95rem; }
  .wedding-tag { top: 8px; left: 8px; padding: 4px 10px; font-size: .55rem; }
  .wedding-card-view { opacity: 1; transform: translate(-50%, 0); bottom: 8px; padding: 4px 10px; font-size: 0.6rem; }
  .wedding-card:hover .wedding-card-photo-wrap { border: 1px solid var(--tulle-dot); }
}
`