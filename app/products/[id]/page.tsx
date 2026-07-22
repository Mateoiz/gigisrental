'use client'

import { useState, use } from 'react'
import Link from 'next/link'
import Navbar from '@/app/components/Navbar'
import Footer from '@/app/components/Footer'
import { GALLERY_PIECES, GalleryPiece } from '@/app/page'

type ParamsShape = { slug?: string; id?: string } | Promise<{ slug?: string; id?: string }>

export default function ProductPage({ params }: { params: ParamsShape }) {
  const resolvedParams = params instanceof Promise ? use(params) : params

  const rawIdentifier = decodeURIComponent(
    resolvedParams.slug ?? resolvedParams.id ?? ''
  ).trim().toLowerCase()

  const piece = GALLERY_PIECES.find(
    (p) => p.slug.toLowerCase() === rawIdentifier || p.id.toLowerCase() === rawIdentifier
  )

  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [selectedSize, setSelectedSize] = useState<string>('S')
  const [requested, setRequested] = useState(false)

  if (!piece) {
    return (
      <>
        <style>{`
          body { background: #FFFDF9 !important; color: #3D2C2E; font-family: 'Jost', sans-serif; }
        `}</style>
        <Navbar />
        <div
          data-testid="product-not-found"
          style={{ padding: '140px 24px', textAlign: 'center', background: '#FFFDF9', minHeight: '60vh' }}
        >
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: '3rem', color: '#3D2C2E' }}>
            Garment Not Found
          </h1>
          <p style={{ margin: '16px 0 36px', color: '#7A5B51', fontWeight: 300 }}>
            We couldn&apos;t locate that specific silhouette in our current studio rotation.
          </p>
          <Link
            href="/#gallery"
            data-testid="return-to-showroom-link"
            style={{
              display: 'inline-block',
              padding: '16px 36px',
              borderRadius: '999px',
              background: '#3D2C2E',
              color: '#fff',
              fontSize: '.85rem',
              letterSpacing: '.12em',
              textTransform: 'uppercase',
              textDecoration: 'none'
            }}
          >
            Return to Showroom
          </Link>
        </div>
        <Footer />
      </>
    )
  }

  // Strictly high-fashion garment lookbook imagery
  const lookbookImages = [
    piece.image,
    piece.category === 'gowns'
      ? 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=1000&q=80'
      : 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1000&q=80',
    piece.category === 'gowns'
      ? 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=80'
      : 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=1000&q=80',
    piece.category === 'gowns'
      ? 'https://images.unsplash.com/photo-1568252542512-9fe8fe9c87bb?auto=format&fit=crop&w=1000&q=80'
      : 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=1000&q=80',
  ]

  // Standard clothing sizing run across all items
  const sizeOptions = ['XS', 'S', 'M', 'L', 'Custom Drape']

  // Cross-merchandising: pair evening gowns with cocktail silhouettes and vice versa
  const completeTheLook = GALLERY_PIECES.filter(
    (p) => p.id !== piece.id && p.category !== piece.category
  ).slice(0, 3)

  const fallbackRelated = GALLERY_PIECES.filter((p) => p.id !== piece.id).slice(0, 3)
  const styledWithList = completeTheLook.length > 0 ? completeTheLook : fallbackRelated

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Jost:wght@300;400;500;600&family=Parisienne&display=swap');

        :root {
          --porcelain: #FFFDF9;
          --card: #FFFFFF;
          --rose: #D48B9D;
          --rose-deep: #A9647C;
          --mocha: #3D2C2E;
          --mocha-soft: #7A5B51;
          --line: #F2E6E8;
          --blush-ribbon: #FDF2F5;
        }

        body {
          background-color: var(--porcelain) !important;
          color: var(--mocha) !important;
          font-family: 'Jost', sans-serif;
          margin: 0;
          padding: 0;
          -webkit-font-smoothing: antialiased;
        }

        .pp-page-container {
          background-color: var(--porcelain);
          min-height: 100vh;
          width: 100%;
          position: relative;
          z-index: 1;
        }

        .pp-wrap {
          max-width: 1440px;
          margin: 0 auto;
          padding: clamp(24px, 4vh, 48px) clamp(24px, 5vw, 80px) 120px;
          color: var(--mocha);
        }

        .pp-breadcrumb {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: .8rem;
          letter-spacing: .08em;
          text-transform: uppercase;
          color: var(--mocha-soft);
          margin-bottom: 36px;
          position: relative;
          z-index: 2;
        }
        .pp-breadcrumb a { color: var(--mocha-soft); text-decoration: none; transition: color .2s; }
        .pp-breadcrumb a:hover { color: var(--rose-deep); }
        .pp-breadcrumb span.sep { color: var(--line); }
        .pp-breadcrumb span.current { color: var(--mocha); font-weight: 500; }

        .pp-grid {
          display: grid;
          grid-template-columns: 1.3fr 0.9fr;
          gap: clamp(40px, 6vw, 90px);
          align-items: start;
        }
        @media (max-width: 1024px) {
          .pp-grid { grid-template-columns: 1fr; }
        }

        .pp-gallery-container {
          display: grid;
          grid-template-columns: 100px 1fr;
          gap: 20px;
          position: relative;
          z-index: 2;
        }
        @media (max-width: 640px) {
          .pp-gallery-container {
            grid-template-columns: 1fr;
          }
        }

        .pp-thumb-rail {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        @media (max-width: 640px) {
          .pp-thumb-rail {
            flex-direction: row;
            overflow-x: auto;
            padding-bottom: 8px;
            order: 2;
          }
        }

        .pp-thumb {
          aspect-ratio: 3/4;
          border-radius: 12px;
          overflow: hidden;
          cursor: pointer;
          border: 2px solid transparent;
          opacity: 0.55;
          transition: all .25s ease;
          background: var(--blush-ribbon);
          flex-shrink: 0;
          padding: 0;
        }
        @media (max-width: 640px) {
          .pp-thumb { width: 80px; }
        }
        .pp-thumb:hover { opacity: 0.85; }
        .pp-thumb.active {
          border-color: var(--rose-deep);
          opacity: 1;
          box-shadow: 0 8px 20px rgba(169, 100, 124, 0.2);
        }
        .pp-thumb img {
          width: 100%; height: 100%; object-fit: cover; display: block;
        }

        .pp-main-img {
          position: relative;
          border-radius: 24px;
          overflow: hidden;
          aspect-ratio: 3/4;
          box-shadow: 0 30px 70px -20px rgba(61,44,46,.15);
          background: linear-gradient(160deg, #F3D9E0, #E8C4CE);
        }
        .pp-main-img img {
          width: 100%; height: 100%; object-fit: cover; display: block;
          transition: transform .7s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .pp-main-img:hover img { transform: scale(1.03); }
        .pp-badge {
          position: absolute; top: 24px; left: 24px; z-index: 5;
          background: rgba(255,253,249,.92);
          backdrop-filter: blur(8px);
          color: var(--rose-deep);
          padding: 6px 18px;
          border-radius: 999px;
          font-size: .72rem;
          font-weight: 500;
          letter-spacing: .1em;
          text-transform: uppercase;
          border: 1px solid rgba(242, 230, 232, 0.8);
        }

        .pp-sticky-panel {
          position: sticky;
          top: 120px;
          z-index: 3;
          padding-bottom: 40px;
        }
        @media (max-width: 1024px) {
          .pp-sticky-panel { position: relative; top: 0; }
        }

        .pp-eyebrow {
          font-family: 'Parisienne', cursive;
          font-size: 1.6rem;
          color: var(--rose-deep);
          display: block;
          margin-bottom: 6px;
        }
        .pp-title {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-weight: 500;
          font-size: clamp(2.6rem, 4.2vw, 3.6rem);
          margin-bottom: 10px;
          line-height: 1.05;
          color: var(--mocha);
        }
        .pp-subtitle {
          font-size: 1.05rem;
          color: var(--mocha-soft);
          margin-bottom: 28px;
          font-weight: 300;
        }
        .pp-divider { border-top: 1px dashed var(--line); margin: 28px 0; }

        .pp-selector-label {
          display: flex;
          justify-content: space-between;
          font-size: .82rem;
          text-transform: uppercase;
          letter-spacing: .08em;
          margin-bottom: 12px;
          color: var(--mocha);
        }
        .pp-size-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-bottom: 32px;
        }
        .pp-size-pill {
          padding: 12px 22px;
          border-radius: 10px;
          border: 1px solid var(--line);
          background: var(--card);
          color: var(--mocha);
          font-family: 'Jost', sans-serif;
          font-size: .85rem;
          font-weight: 400;
          cursor: pointer;
          transition: all .2s ease;
          letter-spacing: .04em;
        }
        .pp-size-pill:hover { border-color: var(--rose); }
        .pp-size-pill.active {
          background: var(--mocha);
          color: #fff;
          border-color: var(--mocha);
          box-shadow: 0 8px 20px -6px rgba(61, 44, 46, 0.3);
        }

        .pp-detail-row {
          display: flex;
          justify-content: space-between;
          padding: 14px 0;
          font-size: .92rem;
          border-bottom: 1px solid var(--line);
        }
        .pp-detail-row span:first-child { color: var(--mocha-soft); font-weight: 300; }
        .pp-detail-row span:last-child { font-weight: 500; text-align: right; color: var(--mocha); }

        .pp-cta {
          margin-top: 36px;
          padding: 20px 36px;
          border-radius: 999px;
          background: var(--mocha);
          color: #fff;
          border: none;
          font-size: .88rem;
          font-weight: 500;
          letter-spacing: .12em;
          text-transform: uppercase;
          cursor: pointer;
          width: 100%;
          transition: all .3s cubic-bezier(0.34, 1.56, 0.64, 1);
          box-shadow: 0 14px 30px -10px rgba(61, 44, 46, 0.4);
        }
        .pp-cta:hover {
          background: var(--rose-deep);
          transform: translateY(-2px);
          box-shadow: 0 18px 36px -10px rgba(169, 100, 124, 0.6);
        }
        .pp-cta:disabled {
          background: #5A7A68;
          opacity: 1;
          cursor: default;
          transform: none;
          box-shadow: none;
        }

        .pp-note {
          margin-top: 16px;
          font-size: .82rem;
          color: var(--mocha-soft);
          font-style: italic;
          text-align: center;
        }

        .pp-style-section {
          margin-top: 120px;
          padding-top: 80px;
          border-top: 1px solid var(--line);
          position: relative;
          z-index: 2;
        }
        .pp-style-header {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          margin-bottom: 40px;
          flex-wrap: wrap;
          gap: 16px;
        }
        .pp-style-header h2 {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-size: clamp(2rem, 3.5vw, 2.8rem);
          font-weight: 500;
          color: var(--mocha);
        }
        .pp-style-header p {
          font-size: .9rem;
          color: var(--mocha-soft);
          letter-spacing: .06em;
          text-transform: uppercase;
        }

        .pp-look-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 28px;
        }
        @media (max-width: 900px) {
          .pp-look-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 600px) {
          .pp-look-grid { grid-template-columns: 1fr; }
        }

        .look-card {
          display: flex;
          flex-direction: column;
          background: var(--card);
          border: 1px solid var(--line);
          border-radius: 20px;
          padding: 16px;
          transition: all .35s cubic-bezier(0.16, 1, 0.3, 1);
          text-decoration: none;
          color: var(--mocha);
        }
        .look-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 40px -16px rgba(61, 44, 46, 0.12);
          border-color: var(--rose);
        }
        .look-thumb {
          aspect-ratio: 3/4;
          border-radius: 14px;
          overflow: hidden;
          position: relative;
          margin-bottom: 16px;
          background: var(--blush-ribbon);
        }
        .look-thumb img {
          width: 100%; height: 100%; object-fit: cover; display: block;
          transition: transform .6s ease;
        }
        .look-card:hover .look-thumb img { transform: scale(1.05); }
        .look-info h4 {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-size: 1.4rem;
          font-weight: 500;
          margin-bottom: 4px;
        }
        .look-info p {
          font-size: .8rem;
          color: var(--mocha-soft);
          text-transform: uppercase;
          letter-spacing: .06em;
          margin: 0;
        }
        .look-action {
          margin-top: 16px;
          padding-top: 12px;
          border-top: 1px dashed var(--line);
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: .78rem;
          font-weight: 500;
          color: var(--rose-deep);
          text-transform: uppercase;
          letter-spacing: .1em;
        }
      `}</style>

      <div className="pp-page-container" data-testid="product-page">
        <Navbar />

        <div className="pp-wrap">
          <nav className="pp-breadcrumb" aria-label="Breadcrumb" data-testid="breadcrumb">
            <Link href="/#gallery">Showroom</Link>
            <span className="sep">/</span>
            <Link href="/#gallery">
              {piece.category === 'gowns' ? 'Evening Gowns' : 'Cocktail & Slips'}
            </Link>
            <span className="sep">/</span>
            <span className="current" data-testid="breadcrumb-current">{piece.title}</span>
          </nav>

          <div className="pp-grid">
            <div className="pp-gallery-container">
              <div className="pp-thumb-rail" data-testid="thumb-rail">
                {lookbookImages.map((imgUrl, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setActiveImageIndex(index)}
                    className={`pp-thumb ${activeImageIndex === index ? 'active' : ''}`}
                    aria-label={`View lookbook angle ${index + 1}`}
                    data-testid={`thumb-${index}`}
                    data-active={activeImageIndex === index}
                  >
                    <img src={imgUrl} alt={`${piece.title} angle ${index + 1}`} />
                  </button>
                ))}
              </div>

              <div className="pp-main-img" data-testid="main-image-container">
                <span className="pp-badge" data-testid="product-badge">{piece.archiveCode ?? piece.category}</span>
                <img
                  src={lookbookImages[activeImageIndex]}
                  alt={piece.title}
                  data-testid="main-image"
                />
              </div>
            </div>

            <div className="pp-sticky-panel">
              <span className="pp-eyebrow">
                {piece.category === 'gowns' ? 'the evening archive' : 'the cocktail silhouette'}
              </span>
              <h1 className="pp-title" data-testid="product-title">{piece.title}</h1>
              <p className="pp-subtitle" data-testid="product-subtitle">{piece.subtitle}</p>

              <div className="pp-divider" />

              <div className="pp-selector-label">
                <span>Fitting Size Preference</span>
                <span>In-Studio Sizing Prep</span>
              </div>
              <div
                className="pp-size-grid"
                role="radiogroup"
                aria-label="Available studio fitting sizes"
                data-testid="size-grid"
              >
                {sizeOptions.map((size) => (
                  <button
                    key={size}
                    type="button"
                    role="radio"
                    aria-checked={selectedSize === size}
                    onClick={() => setSelectedSize(size)}
                    className={`pp-size-pill ${selectedSize === size ? 'active' : ''}`}
                    data-testid={`size-option-${size.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    {size}
                  </button>
                ))}
              </div>

              <div className="pp-detail-row">
                <span>Selected Prep Size</span>
                <span data-testid="selected-size">{selectedSize}</span>
              </div>
              <div className="pp-detail-row">
                <span>Material &amp; Craft</span>
                <span data-testid="product-material">{piece.material}</span>
              </div>
              <div className="pp-detail-row">
                <span>Wardrobe Category</span>
                <span data-testid="product-category">
                  {piece.category === 'gowns' ? 'Evening Gowns' : 'Cocktail & Slips'}
                </span>
              </div>
              <div className="pp-detail-row">
                <span>Standard Reservation</span>
                <span>3-Day Studio Timeline</span>
              </div>

              <button
                type="button"
                className="pp-cta"
                disabled={requested}
                onClick={() => setRequested(true)}
                data-testid="request-fitting-button"
                aria-live="polite"
              >
                {requested
                  ? `Fitting Request Sent (${selectedSize}) ✓`
                  : `Request a Studio Fitting`}
              </button>

              <p className="pp-note">
                No online checkout required. Fitting appointments and piece holds are arranged directly with our styling team.
              </p>
            </div>
          </div>

          <section className="pp-style-section" data-testid="styled-with-section">
            <div className="pp-style-header">
              <div>
                <h2>Styled With</h2>
                <p>Curated pairings to complete this look</p>
              </div>
              <Link
                href="/#gallery"
                style={{ fontSize: '.85rem', color: 'var(--rose-deep)', fontWeight: 500, letterSpacing: '.08em', textTransform: 'uppercase', textDecoration: 'none' }}
              >
                Explore Full Archive →
              </Link>
            </div>

            <div className="pp-look-grid" data-testid="styled-with-grid">
              {styledWithList.map((item) => (
                <Link
                  key={item.id}
                  href={`/products/${item.slug}`}
                  className="look-card"
                  data-testid={`styled-with-card-${item.slug}`}
                >
                  <div className="look-thumb">
                    <img src={item.image} alt={item.title} />
                  </div>
                  <div className="look-info">
                    <h4>{item.title}</h4>
                    <p>{item.subtitle}</p>
                  </div>
                  <div className="look-action">
                    <span>{item.category === 'gowns' ? 'Evening Gown' : 'Cocktail Silhouette'}</span>
                    <span>View Look +</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </div>

        <Footer />
      </div>
    </>
  )
}