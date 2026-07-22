'use client'

import { useState } from 'react'
import Link from 'next/link'
import Navbar from '@/app/components/Navbar'
import Footer from '@/app/components/Footer'

// --- TYPES ---
export interface GalleryPiece {
  id: string
  slug: string
  title: string
  subtitle: string
  material: string
  gradient: [string, string]
  image: string
  category: 'gowns' | 'cocktail'
  archiveCode?: string
}

interface RentalStep {
  num: string
  title: string
  desc: string
}

// --- CURATED WARDROBE CATALOG (Strictly Custom-Fitted · Booked Appointments Only) ---
export const GALLERY_PIECES: GalleryPiece[] = [
  { id: '1', slug: 'rosalind-gown', title: 'The Rosalind Gown', subtitle: 'Blush Silk Corset Silhouette', material: '100% Raw Mulberry Silk · Custom Fitted · By Appointment Only', gradient: ['#F3D9E0', '#E4B7C4'], image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=800&q=80', category: 'gowns', archiveCode: 'Look 01 · Bespoke Drape' },
  { id: '2', slug: 'ao-dai-imperial', title: 'The Áo Dài Imperial', subtitle: 'Traditional Silk Embroidery', material: 'Hand-Stitched Silk · Custom Fitted · By Appointment Only', gradient: ['#EFE1D6', '#D9BFA9'], image: 'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?auto=format&fit=crop&w=800&q=80', category: 'gowns', archiveCode: 'Look 02 · Heritage Cut' },
  { id: '3', slug: 'marguerite-set', title: 'The Marguerite Set', subtitle: 'Lilac Layered Tulle & Ribbon', material: 'Hand-Pleated Tulle · Custom Fitted · By Appointment Only', gradient: ['#E9DCE8', '#CBAFC7'], image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=800&q=80', category: 'cocktail', archiveCode: 'Look 03 · New Addition' },
  { id: '4', slug: 'seraphina-corset-dress', title: 'The Seraphina Corset Dress', subtitle: 'Structured Ivory Tulle & Silk', material: 'Boned Bodice Cut · Custom Fitted · By Appointment Only', gradient: ['#F4E3D3', '#E0B48F'], image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=800&q=80', category: 'cocktail', archiveCode: 'Look 04 · Studio Edit' },
  { id: '5', slug: 'colette-slip-dress', title: 'The Colette Slip Dress', subtitle: 'Rose Satin Babydoll Cut', material: 'Fluid Satin Drape · Custom Fitted · By Appointment Only', gradient: ['#F0DDE1', '#D9A9B6'], image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=800&q=80', category: 'cocktail', archiveCode: 'Look 05 · Dainty Edit' },
  { id: '6', slug: 'minh-emerald-gown', title: 'The Minh Emerald Gown', subtitle: 'Jewel-Toned Velvet & Silk', material: 'Bias Cut Drape · Custom Fitted · By Appointment Only', gradient: ['#E6DED2', '#C6B79E'], image: 'https://images.unsplash.com/photo-1568252542512-9fe8fe9c87bb?auto=format&fit=crop&w=800&q=80', category: 'gowns', archiveCode: 'Look 06 · Evening Wear' },
  { id: '7', slug: 'angelic-lace-dress', title: 'Angelic Lace Tiered Dress', subtitle: 'Ivory Chantilly Lace & Silk', material: 'Scalloped Hem · Custom Fitted · By Appointment Only', gradient: ['#EAE5E1', '#D4C7BD'], image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=80', category: 'cocktail', archiveCode: 'Look 07 · Studio Favorite' },
  { id: '8', slug: 'vintage-pearl-gown', title: 'Vintage Pearl Evening Gown', subtitle: 'Champagne Satin & Pearl Trim', material: 'Bias Cut Silhouette · Custom Fitted · By Appointment Only', gradient: ['#EFECE6', '#D8CEBE'], image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80', category: 'gowns', archiveCode: 'Look 08 · Classic Elegance' },
]

const RENTAL_STEPS: RentalStep[] = [
  { num: '01', title: 'Explore the Archive', desc: 'Browse our exhibition of modern Vietnamese gowns and cocktail silhouettes to curate your desired aesthetic.' },
  { num: '02', title: 'Book a Private Appointment', desc: 'All fittings and consultations are conducted strictly through set booked appointments at our studio showroom.' },
  { num: '03', title: 'Bespoke Measurement & Drape', desc: 'Every garment in our archive is custom-fitted. Our styling team takes precise measurements during your visit to tailor the drape to your exact silhouette.' },
  { num: '04', title: 'Wear with Grace', desc: 'Collect your freshly steamed, custom-tailored look for your event, then return it by the agreed studio timeline while we handle delicate dry cleaning.' },
]

const TERMS_LIST = [
  'Every silhouette in our collection is strictly custom-fitted; we do not offer off-the-rack sizing without a booked preliminary fitting.',
  'Studio consultations, measurements, and wardrobe reservations are arranged exclusively through set booked appointments.',
  'One valid government-issued ID is required for identity verification prior to releasing any custom-fitted archive piece.',
  'Standard custom reservation timelines run for 3 days by default; extended editorial or event periods may be arranged during your consultation.',
  'Fitting appointment slots are held for 24 hours from the time of scheduling without a deposit to allow graceful flexibility for our clientele.',
]

export default function GracefulCoquetteGallery() {
  const [selectedPiece, setSelectedPiece] = useState<string | null>(null)
  const [filter, setFilter] = useState<'all' | 'gowns' | 'cocktail'>('all')

  const filteredPieces = GALLERY_PIECES.filter(
    (piece) => filter === 'all' || piece.category === filter
  )

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
          --gold: #B8916A;
          --line: #F2E6E8;
          --blush-ribbon: #FDF2F5;
        }

        * { margin: 0; padding: 0; box-sizing: border-box; }
        
        body {
          background: var(--porcelain);
          color: var(--mocha);
          font-family: 'Jost', sans-serif;
          font-weight: 300;
          line-height: 1.6;
          -webkit-font-smoothing: antialiased;
          overflow-x: hidden;
        }

        .eyebrow {
          font-family: 'Parisienne', cursive;
          font-size: clamp(1.4rem, 2.2vw, 1.9rem);
          color: var(--rose-deep);
          display: inline-block;
          margin-bottom: .25rem;
        }

        h1, h2, h3 {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 500;
          color: var(--mocha);
          line-height: 1.08;
        }

        a { color: inherit; text-decoration: none; }
        
        .full-wrap { 
          width: 100%; 
          max-width: 1920px; 
          margin: 0 auto; 
          padding: 0 clamp(24px, 5vw, 80px); 
        }

        /* --- HERO SECTION --- */
        .hero { 
          min-height: calc(85vh - 84px);
          display: flex;
          align-items: center; 
          position: relative; 
          padding: 20px 0 60px;
        }
        .hero .full-wrap { 
          display: grid; 
          grid-template-columns: 1.1fr 0.9fr; 
          gap: clamp(40px, 6vw, 100px); 
          align-items: start;
          width: 100%;
          padding-top: clamp(20px, 4vh, 60px);
        }
        .hero-content {
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
        }
        .hero h1 { 
          font-size: clamp(3.4rem, 6.8vw, 6.2rem); 
          font-style: italic; 
          letter-spacing: -0.01em; 
          margin-bottom: 24px; 
          font-weight: 500; 
        }
        .hero h1 em { color: var(--rose-deep); font-style: italic; font-weight: 600; }
        .hero p.lead { 
          font-size: clamp(1.1rem, 1.5vw, 1.35rem); 
          color: var(--mocha-soft); 
          max-width: 580px; 
          margin-bottom: 40px; 
          font-weight: 300; 
          line-height: 1.7; 
        }
        
        .btn-row { display: flex; gap: 20px; flex-wrap: wrap; }
        .btn {
          display: inline-flex; align-items: center; justify-content: center; gap: 10px;
          padding: 16px 36px; border-radius: 999px; font-size: .85rem; font-weight: 500; letter-spacing: .1em;
          transition: all .3s cubic-bezier(0.34, 1.56, 0.64, 1); cursor: pointer; text-transform: uppercase;
        }
        .btn-primary { background: var(--mocha); color: #fff; border: none; box-shadow: 0 12px 28px -10px rgba(61, 44, 46, .4); }
        .btn-primary:hover { background: var(--rose-deep); transform: translateY(-3px); box-shadow: 0 18px 34px -10px rgba(169, 100, 124, .6); }
        .btn-ghost { border: 1px solid var(--rose); color: var(--mocha); background: #fff; }
        .btn-ghost:hover { background: var(--blush-ribbon); border-color: var(--rose-deep); transform: translateY(-2px); }

        .hero-card {
          align-self: center;
          background: var(--card); border: 1px solid var(--line); border-radius: 28px;
          padding: 24px; box-shadow: 0 30px 70px -20px rgba(61, 44, 46, .08); position: relative;
          max-width: 460px;
          margin-left: auto;
          width: 100%;
        }
        .hero-card .tag {
          position: absolute; top: -16px; right: 36px;
          background: var(--card); color: var(--rose-deep); border: 1px solid var(--line);
          font-family: 'Cormorant Garamond', serif; font-style: italic;
          font-size: 1.1rem; padding: 6px 22px; border-radius: 999px; font-weight: 500;
          box-shadow: 0 8px 20px -6px rgba(0, 0, 0, .06);
          z-index: 5;
        }
        .hero-card .hero-img {
          width: 100%; border-radius: 20px; display: block; aspect-ratio: 4/5;
          background: linear-gradient(160deg, #F3D9E0, #E8C4CE);
          position: relative; overflow: hidden;
        }
        .hero-card .hero-img img {
          width: 100%; height: 100%; object-fit: cover; display: block;
        }
        .hero-card .hero-img::after {
          content: ''; position: absolute; inset: 12px;
          border: 1px solid rgba(255, 255, 255, 0.6); border-radius: 14px; pointer-events: none;
          z-index: 2;
        }
        .hero-card .caption { margin-top: 20px; font-size: .9rem; font-weight: 400; color: var(--mocha-soft); display: flex; justify-content: space-between; letter-spacing: .03em; }

        /* --- DUAL-ROW DRIFTING MARQUEE --- */
        .dual-marquee {
          width: 100%;
          background: var(--mocha);
          overflow: hidden;
          position: relative;
          padding: 0;
          margin-top: 80px;
        }
        .dual-marquee-row {
          display: flex;
          align-items: center;
          white-space: nowrap;
          padding: 14px 0;
          position: relative;
        }
        .dual-marquee-row:first-child {
          border-bottom: 1px solid rgba(212, 139, 157, 0.2);
        }
        .dual-marquee-row:first-child .dual-track { animation: drift-left 28s linear infinite; }
        .dual-marquee-row:last-child  .dual-track { animation: drift-right 34s linear infinite; }
        .dual-track {
          display: inline-flex;
          align-items: center;
          white-space: nowrap;
          will-change: transform;
        }
        .dual-marquee:hover .dual-track { animation-play-state: paused; }
        @keyframes drift-left {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes drift-right {
          from { transform: translateX(-50%); }
          to   { transform: translateX(0); }
        }
        .dual-word {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(0.8rem, 1.1vw, 1rem);
          font-weight: 500;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          padding: 0 32px;
        }
        .dual-word.serif-reg { 
          font-style: normal; 
          color: var(--blush-ribbon); 
        }
        .dual-word.serif-ital { 
          font-style: italic; 
          color: var(--rose); 
          font-size: clamp(0.9rem, 1.2vw, 1.1rem);
          font-weight: 400;
        }
        .dual-sep {
          display: inline-block;
          width: 3px;
          height: 3px;
          border-radius: 50%;
          background: rgba(212, 139, 157, 0.5);
          flex-shrink: 0;
        }

        /* SECTION HEADS */
        .section-head { text-align: center; max-width: 800px; margin: 0 auto 60px; }
        .section-head h2 { font-size: clamp(2.6rem, 4.8vw, 4.2rem); font-style: italic; font-weight: 500; }

        /* EDITORIAL GALLERY */
        .gallery { padding: 80px 0 120px; }
        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          grid-auto-rows: 320px;
          gap: 20px;
        }
        @media (max-width: 1100px) { .gallery-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 680px)  { .gallery-grid { grid-template-columns: 1fr; } }

        .piece:nth-child(1) { grid-row: span 2; }
        .piece:nth-child(4) { grid-row: span 2; }
        .piece:nth-child(6) { grid-column: span 2; grid-row: span 1; }

        .piece {
          position: relative;
          border-radius: 20px;
          overflow: hidden;
          cursor: pointer;
          border: none;
          padding: 0;
          background: transparent;
          display: block;
        }

        .piece .thumb {
          position: absolute;
          inset: 0;
          border-radius: 20px;
          overflow: hidden;
          transition: transform .7s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .piece:hover .thumb { transform: scale(1.04); }
        .piece .thumb img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .piece .thumb::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.06'/%3E%3C/svg%3E");
          opacity: 0.18;
          z-index: 1;
          pointer-events: none;
        }

        .piece .thumb::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to top,
            rgba(30, 18, 20, 0.85) 0%,
            rgba(30, 18, 20, 0.22) 52%,
            transparent 100%
          );
          z-index: 2;
          transition: opacity .4s ease;
        }
        .piece:hover .thumb::after {
          opacity: 0.94;
        }

        .piece .archive-badge {
          position: absolute; top: 20px; left: 20px; z-index: 10;
          background: rgba(255, 253, 249, 0.15);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          color: rgba(255,253,249,0.95);
          font-family: 'Jost', sans-serif;
          padding: 5px 14px; border-radius: 999px; font-size: 0.68rem;
          font-weight: 500; letter-spacing: 0.1em; text-transform: uppercase;
          border: 1px solid rgba(255,255,255,0.25);
          transition: opacity .3s;
        }
        .piece:hover .archive-badge { opacity: 0; }

        .piece .info {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          z-index: 5;
          padding: 28px 28px 24px;
          text-align: left;
          transform: translateY(0);
          transition: transform .5s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .piece h3 {
          font-size: clamp(1.5rem, 2.2vw, 2rem);
          font-style: italic;
          font-weight: 500;
          color: #fff;
          line-height: 1.1;
          margin-bottom: 6px;
          text-shadow: 0 2px 12px rgba(0,0,0,0.3);
        }
        .piece .subtitle {
          font-size: .78rem;
          color: rgba(255,253,249,0.8);
          font-weight: 400;
          letter-spacing: .08em;
          text-transform: uppercase;
          margin-bottom: 0;
        }
        .piece .material {
          font-size: .75rem;
          color: rgba(255,253,249,0.6);
          font-style: italic;
          font-weight: 300;
          margin-top: 4px;
          max-height: 0;
          overflow: hidden;
          opacity: 0;
          transition: max-height .4s ease, opacity .4s ease .1s;
        }
        .piece:hover .material {
          max-height: 40px;
          opacity: 1;
        }

        .piece .meta-action {
          margin-top: 0;
          padding-top: 0;
          border-top: none;
          max-height: 0;
          overflow: hidden;
          opacity: 0;
          transition: max-height .4s ease, opacity .35s ease .1s;
        }
        .piece:hover .meta-action {
          max-height: 60px;
          opacity: 1;
          margin-top: 16px;
        }
        .piece .inquire-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-size: .72rem;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: .14em;
          border: 1px solid rgba(255,255,255,0.45);
          background: rgba(255,255,255,0.12);
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
          color: #fff;
          cursor: pointer;
          padding: 9px 20px;
          border-radius: 999px;
          transition: background .25s, border-color .25s;
        }
        .piece .inquire-btn:hover {
          background: rgba(255,255,255,0.25);
          border-color: rgba(255,255,255,0.8);
        }

        /* HOW TO RENT */
        .how { background: #fff; border-top: 1px solid var(--line); border-bottom: 1px solid var(--line); padding: 100px 0; }
        .how-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 40px; }
        .step { padding: 36px; background: var(--porcelain); border: 1px solid var(--line); border-radius: 24px; transition: border-color .3s; }
        .step:hover { border-color: var(--rose); }
        .step .num {
          font-family: 'Cormorant Garamond', serif; font-style: italic; font-weight: 500; font-size: 3.5rem; color: var(--rose-deep);
          display: block; margin-bottom: 12px; line-height: 1;
        }
        .step h3 { font-size: 1.5rem; margin-bottom: 12px; font-style: italic; }
        .step p { font-size: .92rem; color: var(--mocha-soft); line-height: 1.7; }

        /* TERMS + APPOINTMENT SPLIT */
        .split { padding: 100px 0; }
        .split .full-wrap { display: grid; grid-template-columns: 1fr 1fr; gap: clamp(32px, 5vw, 80px); align-items: start; }
        .panel { background: var(--card); border: 1px solid var(--line); border-radius: 32px; padding: clamp(32px, 4vw, 56px); box-shadow: 0 20px 50px rgba(0,0,0,0.02); }
        .panel h2 { font-size: clamp(2.2rem, 3.2vw, 3rem); font-style: italic; margin-bottom: 24px; }
        .terms-list { list-style: none; }
        .terms-list li {
          display: flex; gap: 16px; padding: 16px 0; border-bottom: 1px dashed var(--line); font-size: .95rem; color: var(--mocha-soft); line-height: 1.6;
        }
        .terms-list li:last-child { border-bottom: none; }
        .terms-list svg { flex-shrink: 0; margin-top: 4px; }

        .appt-panel { background: linear-gradient(160deg, #fff, var(--blush-ribbon)); border: 1px solid var(--rose); }
        .appt-row { display: flex; gap: 20px; align-items: flex-start; margin-bottom: 28px; }
        .appt-row .ico {
          width: 44px; height: 44px; border-radius: 50%; background: var(--card); border: 1px solid var(--rose); flex-shrink: 0;
          display: flex; align-items: center; justify-content: center; color: var(--rose-deep); font-family: 'Cormorant Garamond', serif; font-size: 1.3rem; font-style: italic;
        }
        .appt-row h3 { font-size: 1.4rem; font-style: italic; margin-bottom: 4px; }
        .appt-row p { font-size: .92rem; color: var(--mocha-soft); }
        .reminder {
          margin-top: 32px; background: var(--card); border: 1px solid var(--line); border-radius: 20px;
          padding: 20px 24px; font-size: .9rem; color: var(--mocha-soft); font-style: italic; text-align: center;
        }

        @media (max-width: 1024px) {
          .hero .full-wrap { grid-template-columns: 1fr; text-align: center; padding-top: 20px; }
          .hero p.lead { margin-left: auto; margin-right: auto; }
          .btn-row { justify-content: center; }
          .split .full-wrap { grid-template-columns: 1fr; }
          .hero-card { margin: 0 auto; }
        }
      `}</style>

      <Navbar />

      {/* --- FULL-BLEED HERO SECTION --- */}
      <section className="hero">
        <div className="full-wrap">
          <div className="hero-content">
            <span className="eyebrow">the bespoke archive</span>
            <h1>
              Delicate pieces,<br />
              <em>custom</em> for you
            </h1>
            <p className="lead">
              Explore our rotating editorial archive of modern Vietnamese silhouettes and evening wear. All garments are custom-fitted and available exclusively through set booked studio appointments.
            </p>
            <div className="btn-row">
              <a href="#gallery" className="btn btn-primary">
                Explore Wardrobe
              </a>
              <a href="#book" className="btn btn-ghost">
                Request a Fitting
              </a>
            </div>
          </div>
          
          <div className="hero-card">
            <span className="tag">Archive Look 01</span>
            <div className="hero-img" aria-label="featured rental silhouette">
              <img src="https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=800&q=80" alt="The Rosalind Silhouette" />
            </div>
            <div className="caption">
              <span>The Rosalind Silhouette</span>
              <span>By Appointment Only</span>
            </div>
          </div>
        </div>
      </section>

      {/* --- DUAL-ROW DRIFTING MARQUEE --- */}
      {(() => {
        const ROW_ONE = [
          { text: 'Mulberry Silk', style: 'serif-reg' },
          { text: 'Studio Archive', style: 'serif-ital' },
          { text: 'Curated Silhouettes', style: 'serif-reg' },
          { text: 'Chantilly Lace', style: 'serif-ital' },
          { text: 'Modern Vietnamese', style: 'serif-reg' },
          { text: 'Bespoke Craftsmanship', style: 'serif-ital' },
          { text: 'Blush & Ivory', style: 'serif-reg' },
          { text: 'Editorial Wardrobe', style: 'serif-ital' },
        ]
        const ROW_TWO = [
          { text: 'Booked Appointments', style: 'serif-ital' },
          { text: 'Hand-Pleated Tulle', style: 'serif-reg' },
          { text: 'Custom Fitted', style: 'serif-ital' },
          { text: 'Satin & Pearl', style: 'serif-reg' },
          { text: 'The Studio Closet', style: 'serif-ital' },
          { text: 'Rosalind · Marguerite · Seraphina', style: 'serif-reg' },
          { text: 'Wear with Grace', style: 'serif-ital' },
          { text: 'Reserved for You', style: 'serif-reg' },
        ]
        const doubled = (arr: typeof ROW_ONE) => [...arr, ...arr]
        return (
          <div className="dual-marquee" aria-hidden="true">
            <div className="dual-marquee-row">
              <div className="dual-track">
                {doubled(ROW_ONE).map((item, i) => (
                  <span key={i} style={{ display: 'inline-flex', alignItems: 'center' }}>
                    <span className={`dual-word ${item.style}`}>{item.text}</span>
                    <span className="dual-sep" />
                  </span>
                ))}
              </div>
            </div>
            <div className="dual-marquee-row">
              <div className="dual-track">
                {doubled(ROW_TWO).map((item, i) => (
                  <span key={i} style={{ display: 'inline-flex', alignItems: 'center' }}>
                    <span className={`dual-word ${item.style}`}>{item.text}</span>
                    <span className="dual-sep" />
                  </span>
                ))}
              </div>
            </div>
          </div>
        )
      })()}

      {/* --- EXPANSIVE EDITORIAL SHOWROOM --- */}
      <section className="gallery" id="gallery">
        <div className="full-wrap">
          <div className="section-head">
            <span className="eyebrow">the wardrobe catalog</span>
            <h2>Curated silhouettes &amp; styling</h2>
            <p style={{ color: 'var(--mocha-soft)', fontSize: '1.05rem', marginTop: '12px', fontWeight: 300 }}>
              A full-width exhibition of evening gowns, babydoll cuts, and structured silhouettes available exclusively by appointment.
            </p>
            
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginTop: '32px', flexWrap: 'wrap' }}>
              {(['all', 'gowns', 'cocktail'] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  style={{
                    padding: '10px 28px',
                    borderRadius: '999px',
                    border: '1px solid var(--rose)',
                    background: filter === cat ? 'var(--mocha)' : 'transparent',
                    color: filter === cat ? '#fff' : 'var(--mocha)',
                    fontSize: '0.8rem',
                    fontWeight: '500',
                    cursor: 'pointer',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    transition: 'all 0.3s ease',
                    boxShadow: filter === cat ? '0 8px 20px -6px rgba(61, 44, 46, 0.3)' : 'none'
                  }}
                >
                  {cat === 'all' ? 'Complete Wardrobe' : cat === 'gowns' ? 'Evening Gowns' : 'Cocktail & Slips'}
                </button>
              ))}
            </div>
          </div>

          <div className="gallery-grid">
            {filteredPieces.map((piece) => (
              <Link key={piece.id} href={`/products/${piece.slug}`} className="piece">
                <div
                  className="thumb"
                  style={{
                    background: `linear-gradient(150deg, ${piece.gradient[0]} 0%, ${piece.gradient[1]} 60%, ${piece.gradient[1]}cc 100%)`,
                  }}
                >
                  <img src={piece.image} alt={piece.title} />
                </div>

                {piece.archiveCode && (
                  <span className="archive-badge">{piece.archiveCode}</span>
                )}

                <div className="info">
                  <h3>{piece.title}</h3>
                  <p className="subtitle">{piece.subtitle}</p>
                  <p className="material">{piece.material}</p>
                  <div className="meta-action">
                    <span className="inquire-btn">
                      View Details
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* --- HOW TO RENT --- */}
      <section className="how" id="how">
        <div className="full-wrap">
          <div className="section-head">
            <span className="eyebrow">the rental experience</span>
            <h2>Graceful reserve &amp; return</h2>
          </div>
          <div className="how-grid">
            {RENTAL_STEPS.map((step) => (
              <div key={step.num} className="step">
                <span className="num">{step.num}</span>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- EXPANDED SPLIT SECTION --- */}
      <section className="split" id="terms">
        <div className="full-wrap">
          <div className="panel">
            <h2>Wardrobe Guidelines</h2>
            <ul className="terms-list">
              {TERMS_LIST.map((term, i) => (
                <li key={i}>
                  <svg width="18" height="18" viewBox="0 0 16 16">
                    <path
                      d="M3 8l3 3 7-7"
                      stroke="#A9647C"
                      strokeWidth="1.5"
                      fill="none"
                    />
                  </svg>
                  {term}
                </li>
              ))}
            </ul>
          </div>

          <div className="panel appt-panel" id="book">
            <h2>Request a Studio Fitting</h2>
            
            {selectedPiece && (
              <div
                style={{
                  background: 'var(--mocha)',
                  color: '#fff',
                  padding: '14px 20px',
                  borderRadius: '16px',
                  fontSize: '0.85rem',
                  marginBottom: '24px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  letterSpacing: '0.04em'
                }}
              >
                <span>Selected look: <strong style={{ fontStyle: 'italic', fontWeight: 600 }}>{selectedPiece}</strong></span>
                <button
                  onClick={() => setSelectedPiece(null)}
                  style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', fontWeight: 300, fontSize: '1.2rem' }}
                  aria-label="Remove selection"
                >
                  ✕
                </button>
              </div>
            )}

            <div className="appt-row">
              <div className="ico">I</div>
              <div>
                <h3>Select your schedule</h3>
                <p>Choose an available appointment slot from our private showroom calendar.</p>
              </div>
            </div>
            <div className="appt-row">
              <div className="ico">II</div>
              <div>
                <h3>Share event details</h3>
                <p>Provide your occasion date and sizing preferences so we can prepare your bespoke drape.</p>
              </div>
            </div>
            <div className="appt-row">
              <div className="ico">III</div>
              <div>
                <h3>Studio confirmation</h3>
                <p>Our styling team will verify wardrobe availability and confirm your private appointment directly.</p>
              </div>
            </div>

            <button
              className="btn btn-primary"
              style={{ width: '100%', justifyContent: 'center', marginTop: '16px', padding: '18px' }}
              onClick={() => alert(`Opening appointment schedule for: ${selectedPiece || 'General Showroom Fitting'}...`)}
            >
              {selectedPiece ? `Book Appointment for ${selectedPiece}` : 'Book a Studio Appointment'}
            </button>

            <div className="reminder">
              Please note: All silhouettes are custom-fitted. We do not offer off-the-rack rentals without a preliminary booked fitting appointment.
            </div>
          </div>
        </div>
      </section>

      {/* --- EXTRACTED FOOTER COMPONENT --- */}
      <Footer />
    </>
  )
}