'use client'

import Link from 'next/link'
import Navbar from '@/app/components/Navbar'
import Footer from '@/app/components/Footer'
import CoquetteBow from '@/app/components/CoquetteBow'
import { DRESSES } from '@/data/dresses'

export default function CollectionsGalleryPage() {
  return (
    <>
      <Navbar />
      <style>{GALLERY_STYLES}</style>

      <section className="gallery-section">
        <div className="wrap">
          <header className="gallery-header">
            <span className="eyebrow-pill">
              <CoquetteBow width={18} height={12} style={{ color: 'var(--rose-deep)' }} />
              The Full Collection
            </span>
            <h1 className="gallery-heading">Every Piece, One Place</h1>
            <p className="gallery-lead">
              Browse the whole studio collection — tap any piece to see it up close
              and book your fitting.
            </p>
          </header>

          <div className="gallery-grid">
            {DRESSES.map((dress) => (
              <Link key={dress.slug} href={`/collections/${dress.slug}`} className="gallery-card">
                <div className="gallery-card-photo-wrap">
                  <div
                    className="gallery-card-photo gallery-card-photo-base"
                    style={{ backgroundImage: `url('${dress.image}')` }}
                  />
                  <div
                    className="gallery-card-photo gallery-card-photo-hover"
                    style={{ backgroundImage: `url('${dress.hoverImage}')` }}
                  />
                  <span className="gallery-card-view">
                    <CoquetteBow width={14} height={9} style={{ color: 'var(--rose-deep)' }} />
                    View the piece
                  </span>
                </div>
                <div className="gallery-card-info">
                  <span className="gallery-card-name">{dress.name}</span>
                  <span className="gallery-card-category">{dress.category}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}

const GALLERY_STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Jost:wght@300;400;500;600&display=swap');

.gallery-section {
  --porcelain: #FFFDF9;
  --card: #FFFFFF;
  --rose: #D48B9D;
  --rose-deep: #A9647C;
  --mocha: #3D2C2E;
  --mocha-soft: #8C666B;
  --blush-ribbon: #FDF2F5;
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
.gallery-section * { box-sizing: border-box; margin: 0; padding: 0; }
.gallery-section a { color: inherit; text-decoration: none; }
.wrap { width: 100%; max-width: 1080px; margin: 0 auto; padding: 0 clamp(20px, 5vw, 48px); }

.gallery-header { display: flex; flex-direction: column; align-items: center; text-align: center; gap: 14px; margin-bottom: clamp(40px, 5vw, 64px); }
.eyebrow-pill {
  display: inline-flex; align-items: center; gap: 10px;
  padding: 8px 22px; border-radius: 999px;
  border: 1px dashed var(--rose);
  background: rgba(255,255,255,.9);
  font-size: .72rem; font-weight: 500; letter-spacing: .14em; text-transform: uppercase;
  color: var(--rose-deep);
}
.gallery-heading { font-family: 'Cormorant Garamond', serif; font-weight: 500; font-size: clamp(2.4rem, 5vw, 3.6rem); }
.gallery-lead { color: var(--mocha-soft); font-size: clamp(1rem, 1.5vw, 1.1rem); line-height: 1.75; max-width: 560px; }

.gallery-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: clamp(18px, 2.5vw, 26px); }
.gallery-card {
  display: flex; flex-direction: column;
  border-radius: 22px; overflow: hidden;
  background: var(--card);
  border: 1px solid rgba(169,100,124,.35);
  box-shadow: var(--shadow-xs);
  transition: transform .3s var(--ease-pop), box-shadow .3s ease, border-color .3s ease;
}
.gallery-card:hover { transform: translateY(-6px); box-shadow: var(--shadow-md); border-color: var(--rose-deep); }
.gallery-card-photo-wrap {
  position: relative;
  aspect-ratio: 3 / 4;
  overflow: hidden;
  background: #ffffff;
  margin: 10px 10px 0;
  border-radius: 16px;
  border: 1px solid var(--tulle-dot);
}
.gallery-card-photo { position: absolute; inset: 0; background-size: cover; background-position: center; transition: opacity .45s ease, transform .45s var(--ease-pop); }
.gallery-card-photo-base { opacity: 1; z-index: 1; }
.gallery-card-photo-hover { opacity: 0; z-index: 2; transform: scale(1.04); }
.gallery-card:hover .gallery-card-photo-base { opacity: 0; }
.gallery-card:hover .gallery-card-photo-hover { opacity: 1; transform: scale(1); }
.gallery-card-view {
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
.gallery-card:hover .gallery-card-view { opacity: 1; transform: translate(-50%, 0); }
.gallery-card-info { display: flex; flex-direction: column; align-items: center; gap: 4px; padding: 16px 14px 20px; text-align: center; }
.gallery-card-name { font-family: 'Cormorant Garamond', serif; font-style: italic; font-weight: 600; font-size: 1.15rem; color: var(--mocha); }
.gallery-card-category { font-size: .75rem; letter-spacing: .04em; color: var(--mocha-soft); }
`