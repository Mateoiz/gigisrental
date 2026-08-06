'use client'

import React from 'react'
import Link from 'next/link'
import Footer from '@/app/components/Footer'
import page from '../page'

interface CoquetteBowProps {
  className?: string
  width?: number
  height?: number
  style?: React.CSSProperties
}

// --- INLINE COQUETTE BOW SVG COMPONENT ---
function CoquetteBow({ className = '', width = 36, height = 24, style }: CoquetteBowProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 48 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
      aria-hidden="true"
    >
      <path
        d="M24 16C18 8 6 6 4 14C2 22 14 24 24 16ZM24 16C30 8 42 6 44 14C46 22 34 24 24 16Z"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="rgba(253, 242, 245, 0.6)"
      />
      <path
        d="M24 16C21 22 15 28 10 30M24 16C27 22 33 28 38 30"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="24" cy="16" r="3.5" fill="currentColor" />
    </svg>
  )
}

const PILLARS = [
  {
    icon: '♡',
    title: 'Bespoke & Custom Fitted',
    desc: 'We believe a dress should conform to you, not the other way around. Every piece is carefully fitted to accentuate your natural silhouette with effortless grace.'
  },
  {
    icon: '❀',
    title: 'Private Showroom Styling',
    desc: 'No rushed fitting rooms or crowded racks. Enjoy an intimate, one-on-one styling appointment where you can explore our collection in complete comfort and privacy.'
  },
  {
    icon: '✦',
    title: 'Curated Modern Heritage',
    desc: 'From modern Vietnamese traditional silhouettes to delicate Chantilly lace gowns, our collection blends cultural elegance with contemporary runway aesthetics.'
  }
]

export default function AboutPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Jost:wght@300;400;500;600&family=Parisienne&display=swap');

        :root {
          --porcelain: #FFFBF7;
          --card: #FFFFFF;
          --rose: #E2A6B4;
          --rose-deep: #B86B7D;
          --mocha: #4A3337;
          --mocha-soft: #8C666B;
          --ink-body: #6B484D;
          --line: #F7E8EC;
          --blush-ribbon: #FDF2F5;
          --tulle-dot: rgba(184, 107, 125, 0.12);
          --stitch: rgba(184, 107, 125, 0.35);

          --shadow-xs: 0 1px 2px rgba(74, 51, 55, 0.06), 0 2px 6px -2px rgba(184, 107, 125, 0.15);
          --shadow-sm: 0 2px 4px rgba(74, 51, 55, 0.07), 0 8px 20px -8px rgba(184, 107, 125, 0.22);
          --shadow-md: 0 4px 8px rgba(74, 51, 55, 0.08), 0 16px 36px -12px rgba(184, 107, 125, 0.28);
        }
        *, *::before, *::after { box-sizing: border-box; }
        .hero *, .guidelines-section *, .folder * { margin: 0; padding: 0; }

        @keyframes coquette-wiggle {
          0%, 100% { transform: translateY(-3px) rotate(0deg) scale(1.02); }
          25% { transform: translateY(-3px) rotate(-2deg) scale(1.02); }
          75% { transform: translateY(-3px) rotate(2deg) scale(1.02); }
        }
        @keyframes coquette-sparkle {
          0% { opacity: 0; transform: scale(0.4) rotate(0deg); }
          40% { opacity: 1; transform: scale(1) rotate(15deg); }
          100% { opacity: 0; transform: scale(0.5) rotate(30deg); }
        }
        .coquette-hover {
          position: relative;
          overflow: visible;
          transition: transform .25s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .coquette-hover::after {
          content: '✦';
          position: absolute;
          top: -14px;
          right: -8px;
          font-size: 1.4rem;
          color: var(--rose-deep);
          opacity: 0;
          pointer-events: none;
          transition: opacity .2s ease;
          z-index: 20;
        }
        .coquette-hover:hover::after {
          opacity: 1;
          animation: coquette-sparkle 1.1s ease-in-out infinite;
        }
        .coquette-hover:hover {
          transition: none;
          animation: coquette-wiggle 1.6s ease-in-out infinite;
        }

        body {
          background: var(--porcelain);
          color: var(--mocha);
          font-family: 'Jost', sans-serif;
          font-weight: 300;
          line-height: 1.7;
          -webkit-font-smoothing: antialiased;
          overflow-x: hidden;
        }
        h1, h2, h3, h4 {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 500;
          color: var(--mocha);
          line-height: 1.15;
        }
        a { color: inherit; text-decoration: none; }

        .full-wrap {
          width: 100%;
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 clamp(24px, 5vw, 80px);
        }

        /* --- HERO HEADER --- */
        .about-hero {
          position: relative;
          padding: clamp(120px, 16vh, 180px) 0 clamp(60px, 8vh, 90px);
          text-align: center;
          background: radial-gradient(circle at 50% 20%, rgba(253, 242, 245, 0.8) 0%, rgba(255, 251, 247, 0) 70%);
          overflow: hidden;
        }
        .about-hero::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: radial-gradient(var(--tulle-dot) 1.5px, transparent 1.5px);
          background-size: 16px 16px;
          pointer-events: none;
          z-index: 0;
        }
        .about-hero-content {
          position: relative;
          z-index: 2;
          max-width: 760px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .eyebrow-pill {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 8px 22px;
          border-radius: 999px;
          border: 1px dashed var(--rose);
          background: rgba(255,255,255,.85);
          backdrop-filter: blur(8px);
          font-size: .75rem;
          font-weight: 500;
          letter-spacing: .16em;
          text-transform: uppercase;
          color: var(--rose-deep);
          margin-bottom: 20px;
          box-shadow: var(--shadow-xs);
        }
        .about-hero h1 {
          font-size: clamp(2.6rem, 6vw, 4.8rem);
          font-style: italic;
          margin-bottom: 20px;
          letter-spacing: -.01em;
        }
        .about-hero p.subtitle {
          font-size: clamp(1.1rem, 1.8vw, 1.3rem);
          color: var(--mocha-soft);
          max-width: 620px;
          line-height: 1.8;
        }

        /* --- STORY SECTION --- */
        .story-section {
          padding: clamp(60px, 8vw, 100px) 0;
          position: relative;
        }
        .story-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: clamp(40px, 6vw, 80px);
          align-items: center;
        }
        @media (min-width: 900px) {
          .story-grid { grid-template-columns: 1.1fr 0.9fr; }
        }
        .story-text h2 {
          font-size: clamp(2rem, 4vw, 3.2rem);
          margin-bottom: 24px;
        }
        .story-text p {
          font-size: 1.05rem;
          color: var(--ink-body);
          margin-bottom: 20px;
          line-height: 1.85;
        }
        .story-text .quote {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-size: 1.4rem;
          color: var(--rose-deep);
          border-left: 2px solid var(--rose);
          padding-left: 20px;
          margin: 32px 0;
        }
        
        /* Decorative Photo Frame */
        .story-frame {
          position: relative;
          padding: 20px;
          background: #FFFDF9;
          border: 1px solid var(--rose);
          border-radius: 28px;
          box-shadow: var(--shadow-md);
          transform: rotate(1.5deg);
          transition: transform .4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .story-frame:hover {
          transform: rotate(0deg) scale(1.01);
        }
        .story-frame-inner {
          position: relative;
          border-radius: 18px;
          overflow: hidden;
          aspect-ratio: 4/5;
          background-color: #FCEEF1;
          border: 1px dashed rgba(184, 107, 125, 0.4);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .story-frame-inner img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
.frame-badge {
          position: absolute;
          bottom: -16px;
          left: 30px;
          background: var(--mocha);
          color: #fff;
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-size: 1.1rem;
          padding: 10px 24px;
          border-radius: 999px;
          box-shadow: var(--shadow-sm);
          border: 1px solid var(--rose);
          z-index: 5;
        }

/* Overlapping Stamp Logo */
        .stamp-logo {
          position: absolute;
          top: -30px;
          right: -45px;
          width: 140px;
          height: auto;
          z-index: 10;
          transform: rotate(12deg);
          pointer-events: none;
          filter: drop-shadow(2px 6px 12px rgba(184, 107, 125, 0.15));
        }
        @media (max-width: 768px) {
          .stamp-logo {
            top: -20px;
            width: 100px;
            right: -20px;
          }
        }

        /* --- PILLARS SECTION --- */
        .pillars-section {
          padding: clamp(70px, 10vw, 120px) 0 clamp(40px, 6vw, 70px);
          background: linear-gradient(180deg, var(--porcelain) 0%, #FFF8F3 50%, var(--porcelain) 100%);
          border-top: 1px dashed var(--line);
          border-bottom: 1px dashed var(--line);
        }
        .section-header {
          text-align: center;
          max-width: 600px;
          margin: 0 auto clamp(40px, 6vw, 70px);
        }
        .section-header h2 {
          font-size: clamp(2.2rem, 4vw, 3.4rem);
          margin-bottom: 12px;
        }
        .section-header p {
          color: var(--mocha-soft);
          font-size: 1.1rem;
        }
        .pillars-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: clamp(24px, 3vw, 40px);
        }
        .pillar-card {
          background: #FFFFFF;
          border: 1px solid rgba(226, 166, 180, 0.5);
          border-radius: 24px;
          padding: clamp(32px, 4vw, 44px) clamp(24px, 3vw, 32px);
          text-align: center;
          box-shadow: var(--shadow-xs);
          transition: all .3s cubic-bezier(0.34, 1.56, 0.64, 1);
          position: relative;
        }
        .pillar-card:hover {
          transform: translateY(-8px);
          box-shadow: var(--shadow-md);
          border-color: var(--rose-deep);
        }
        .pillar-icon {
          font-size: 2rem;
          color: var(--rose-deep);
          margin-bottom: 16px;
          display: inline-block;
        }
        .pillar-card h3 {
          font-size: 1.6rem;
          margin-bottom: 14px;
        }
        .pillar-card p {
          color: var(--ink-body);
          font-size: .95rem;
          line-height: 1.8;
        }

        /* --- NOTE / PROMISE SECTION --- */
        .promise-section {
          padding: clamp(50px, 7vw, 90px) 0;
          text-align: center;
        }
        .promise-box {
          max-width: 840px;
          margin: 0 auto;
          background: #FFF7F8;
          border: 1px solid var(--rose-deep);
          border-radius: 32px;
          padding: clamp(40px, 6vw, 70px) clamp(28px, 6vw, 60px);
          position: relative;
          box-shadow: 0 20px 50px -10px rgba(184, 107, 125, 0.15);
          transition: box-shadow .3s ease;
        }
        .promise-box:hover {
          box-shadow: 0 24px 60px -10px rgba(184, 107, 125, 0.22);
        }
        .promise-box::before {
          content: '';
          position: absolute;
          inset: 12px;
          border: 1px dashed rgba(226, 166, 180, 0.4);
          border-radius: 22px;
          pointer-events: none;
        }
        .promise-box h2 {
          font-size: clamp(2rem, 4vw, 3.2rem);
          margin-bottom: 20px;
        }
        .promise-box p {
          font-size: clamp(1rem, 1.5vw, 1.15rem);
          color: var(--ink-body);
          max-width: 640px;
          margin: 0 auto 32px;
          line-height: 1.9;
        }
        
        /* THE NEW LOGO CREST */
        .signature-crest {
          width: 140px;
          height: auto;
          margin: 0 auto 36px;
          display: block;
        }
        
        .gg-btn-primary {
          font-family: 'Jost', sans-serif;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: var(--mocha);
          color: #fff;
          padding: 16px 40px;
          border-radius: 999px;
          font-size: .85rem;
          font-weight: 500;
          letter-spacing: .12em;
          text-transform: uppercase;
          transition: all .3s cubic-bezier(0.34, 1.56, 0.64, 1);
          box-shadow: 0 4px 12px rgba(74, 51, 55, 0.25);
        }
        .gg-btn-primary:hover {
          background: var(--rose-deep);
          transform: translateY(-2px);
          box-shadow: 0 8px 24px -6px rgba(184, 107, 125, 0.55);
        }
      `}</style>

      {/* --- HERO SECTION --- */}
      <section className="about-hero">
        <div className="full-wrap">
          <div className="about-hero-content">
            <span className="eyebrow-pill">
              <CoquetteBow width={20} height={14} style={{ color: 'var(--rose-deep)' }} />
              The Heart Behind The Atelier
            </span>
            <h1>Designed for Moments You&apos;ll Never Forget</h1>
            <p className="subtitle">
              Gigi&apos;s Rentals is a premium dress rental boutique offering carefully curated gowns
              that celebrate femininity, confidence, and timeless elegance.
            </p>
          </div>
        </div>
      </section>

      {/* --- OUR STORY SECTION --- */}
      <section className="story-section">
        <div className="full-wrap">
          <div className="story-grid">
            <div className="story-text">
              <h2>Luxury Isn&apos;t About Owning More</h2>
              <p>
                We believe luxury isn&apos;t about owning more — it&apos;s about wearing the perfect
                piece for life&apos;s most meaningful occasions. From intimate celebrations to grand
                events, our collection is thoughtfully selected to help every woman look and feel
                her absolute best.
              </p>
              <div className="quote">
                &ldquo;Because every special occasion deserves a dress as unforgettable as the memory itself.&rdquo;
              </div>
              <p>
                With exceptional service and attention to detail, we&apos;re committed to making
                every fitting, every dress, and every moment effortlessly beautiful.
              </p>
            </div>

<div className="story-frame">
              {/* THE OVERLAPPING STAMP LOGO */}
              <img src="/gr-crest.png" alt="Gigi's Crest Stamp" className="stamp-logo" />
              
              <div className="story-frame-inner">
                {/* Swap this image out for a real photo of your studio or favorite dress! */}
                <img src="/about/GGRNTL.png" alt="Inside Gigi's Rentals Atelier" />
              </div>
              <div className="frame-badge">
                <span style={{ color: 'var(--rose)' }}>♡</span> Private Studio Showroom
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- THE GIGI'S EXPERIENCE (PILLARS) --- */}
      <section className="pillars-section">
        <div className="full-wrap">
          <div className="section-header">
            <CoquetteBow width={40} height={26} style={{ color: 'var(--rose-deep)', margin: '0 auto 12px' }} />
            <h2>The Gigi&apos;s Experience</h2>
            <p>Here is what makes renting with us an intimate and effortless journey.</p>
          </div>

          <div className="pillars-grid">
            {PILLARS.map((pillar, idx) => (
              <div key={idx} className="pillar-card">
                <span className="pillar-icon">{pillar.icon}</span>
                <h3>{pillar.title}</h3>
                <p>{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FOUNDER'S NOTE & CTA --- */}
      <section className="promise-section">
        <div className="full-wrap">
          <div className="promise-box">
            <h2>Our Promise to You</h2>
            <p>
              When you step into our studio, you are our sole focus. We promise to handle your fittings with care, keep our collection in pristine, dry-cleaned condition, and help you find a silhouette that makes your heart flutter.
            </p>
            
            {/* The Logo Crest! */}
            <img src="/gr-crest.png" alt="Gigi's Rentals Crest" className="signature-crest" />
            
            <Link
              href="/collections"
              className="gg-btn-primary"
            >
              Browse Our Collection ♡
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}