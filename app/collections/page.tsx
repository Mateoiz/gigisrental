'use client'
import { useMemo, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Navbar from '@/app/components/Navbar'
import Footer from '@/app/components/Footer'
import CoquetteBow from '@/app/components/CoquetteBow'
import { DRESSES } from '@/data/dresses'

type CategoryFilter = 'all' | 'long' | 'mini'

export default function CollectionsGalleryPage() {
  const [filter, setFilter] = useState<CategoryFilter>('all')

  const filteredDresses = useMemo(() => {
    if (filter === 'all') return DRESSES
    return DRESSES.filter((dress) => dress.category?.toLowerCase() === filter)
  }, [filter])

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

          <div className="gallery-filters-sticky">
            <div className="gallery-filters" role="group" aria-label="Filter by dress length">
              {(['all', 'long', 'mini'] as const).map((f) => (
                <button
                  key={f}
                  type="button"
                  className={`gallery-filter-pill ${filter === f ? 'active' : ''}`}
                  onClick={() => setFilter(f)}
                  aria-pressed={filter === f}
                >
                  {f === 'all' ? 'All' : f[0].toUpperCase() + f.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {filteredDresses.length === 0 && (
            <p className="gallery-empty">
              No {filter} dresses just yet — check back soon, or browse all pieces.
            </p>
          )}

          <div className="gallery-grid">
            {filteredDresses.map((dress, i) => (
              <Link key={dress.slug} href={`/collections/${dress.slug}`} className="gallery-card">
                <div className="gallery-card-photo-wrap">
                  <Image
                    src={dress.image}
                    alt={dress.name}
                    fill
                    sizes="(max-width: 760px) 50vw, 25vw"
                    className="gallery-card-photo gallery-card-photo-base"
                    style={{ objectFit: 'cover' }}
                    priority={i < 4}
                  />
                  <Image
                    src={dress.hoverImage}
                    alt=""
                    aria-hidden="true"
                    fill
                    sizes="(max-width: 760px) 50vw, 25vw"
                    className="gallery-card-photo gallery-card-photo-hover"
                    style={{ objectFit: 'cover' }}
                  />
                  <span className="gallery-card-view">
                    <CoquetteBow width={14} height={9} style={{ color: 'var(--rose-deep)' }} />
                    View the piece
                  </span>
                </div>
                <div className="gallery-card-info">
                  <span className="gallery-card-name">{dress.name}</span>
                  <span className="gallery-card-rule" aria-hidden="true" />
                  {dress.category && <span className="gallery-card-category">{dress.category}</span>}
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
.gallery-card:focus-visible { outline: 2px solid var(--rose-deep); outline-offset: 4px; border-radius: 22px; }
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

/* Sticky filter bar so filters stay reachable while scrolling a long grid on mobile */
.gallery-filters-sticky {
  position: sticky;
  top: 0;
  z-index: 20;
  background: var(--porcelain);
  padding: 12px 4px clamp(20px, 3vw, 32px);
  margin-bottom: 4px;
}
.gallery-filters {
  display: flex; align-items: center; justify-content: center; gap: 10px;
  flex-wrap: wrap;
}
.gallery-filter-pill {
  font-family: 'Jost', sans-serif;
  background: var(--card);
  border: 1px dashed var(--rose);
  border-radius: 999px;
  padding: 9px 24px;
  font-size: .75rem; font-weight: 500; letter-spacing: .1em; text-transform: uppercase;
  color: var(--mocha-soft);
  cursor: pointer;
  transition: background .2s ease, color .2s ease, border-color .2s ease, box-shadow .2s ease;
  /* Comfortable touch target */
  min-height: 40px;
}
.gallery-filter-pill:hover { background: var(--blush-ribbon); color: var(--rose-deep); border-color: var(--rose-deep); }
.gallery-filter-pill:active { transform: scale(0.96); }
.gallery-filter-pill:focus-visible { outline: 2px solid var(--rose-deep); outline-offset: 3px; }
.gallery-filter-pill.active {
  background: var(--rose-deep);
  border-color: var(--rose-deep);
  border-style: solid;
  color: #fff;
  box-shadow: var(--shadow-xs);
}
.gallery-empty { text-align: center; color: var(--mocha-soft); font-style: italic; font-family: 'Cormorant Garamond', serif; font-size: 1.2rem; padding: 60px 20px; }
.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: clamp(18px, 2.5vw, 26px);
  padding-top: 8px;
}.gallery-card {
  display: flex; flex-direction: column;
  border-radius: 22px; overflow: hidden;
  background: var(--card);
  border: 1px solid rgba(169,100,124,.35);
  box-shadow: var(--shadow-xs);
  transition: transform .3s var(--ease-pop), box-shadow .3s ease, border-color .3s ease;
  /* Removes the grey flash on tap for a more native-app feel */
  -webkit-tap-highlight-color: transparent;
}
.gallery-card:hover { transform: translateY(-6px) rotate(-.5deg); box-shadow: var(--shadow-md); border-color: var(--rose-deep); }
.gallery-card:active { transform: scale(0.98); }
.gallery-card-photo-wrap {
  position: relative;
  aspect-ratio: 3 / 4;
  overflow: hidden;
  background: #ffffff;
  margin: 10px 10px 0;
  border-radius: 16px;
  border: 1px solid var(--tulle-dot);
  transition: border-color .3s ease;
}
.gallery-card:hover .gallery-card-photo-wrap {
  border: 1px dashed var(--rose-deep);
}
.gallery-card-photo { position: absolute; inset: 0; background-color: #FBF9F6; background-size: cover; background-position: center; transition: opacity .45s ease, transform .45s var(--ease-pop); }
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
.gallery-card-info { display: flex; flex-direction: column; align-items: center; gap: 6px; padding: 16px 14px 20px; text-align: center; }
.gallery-card-name { font-family: 'Cormorant Garamond', serif; font-style: italic; font-weight: 600; font-size: 1.15rem; color: var(--mocha); transition: color .3s ease; }
.gallery-card:hover .gallery-card-name { color: var(--rose-deep); }
.gallery-card-category { font-size: .75rem; letter-spacing: .06em; text-transform: uppercase; color: var(--mocha-soft); }
.gallery-card-rule { width: 24px; height: 1px; background: linear-gradient(90deg, transparent, var(--rose), transparent); transition: width .3s ease; }
.gallery-card:hover .gallery-card-rule { width: 42px; }

@media (max-width: 760px) {
  .gallery-section { padding-top: 120px; }
  .wrap { padding: 0 16px; }

  .gallery-header { margin-bottom: 24px; gap: 10px; }
  .gallery-heading { font-size: 2.1rem; }
  .gallery-lead { font-size: 0.9rem; }

  /* Filter pills: horizontally scrollable single row instead of wrapping,
     matches the filter-chip pattern used on Uniqlo/Zara mobile category pages */
  .gallery-filters {
    flex-wrap: nowrap;
    justify-content: flex-start;
    overflow-x: auto;
    scrollbar-width: none;
    padding: 2px 4px 6px;
    margin: 0 -16px;
    padding-left: 16px;
    padding-right: 16px;
  }
  .gallery-filters::-webkit-scrollbar { display: none; }
  .gallery-filter-pill { flex: 0 0 auto; }

  /* Two-column grid so mobile reads as a shopping grid, not a single-file list */
  .gallery-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }
  .gallery-card { border-radius: 14px; }
  .gallery-card-photo-wrap { margin: 6px 6px 0; border-radius: 10px; }
  .gallery-card-info { padding: 10px 8px 14px; gap: 4px; }
  .gallery-card-name { font-size: 0.95rem; }
  .gallery-card-category { font-size: 0.65rem; }
  .gallery-card-rule { width: 18px; }

  /* Hover never fires on touch, so the "View the piece" badge and hover-image
     swap are made permanently visible on mobile instead of hidden forever */
  .gallery-card-view {
    opacity: 1;
    transform: translate(-50%, 0);
    bottom: 8px;
    padding: 4px 10px;
    font-size: 0.6rem;
  }
  .gallery-card:hover .gallery-card-photo-wrap { border: 1px solid var(--tulle-dot); }
}
`