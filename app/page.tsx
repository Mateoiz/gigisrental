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

interface StepItem {
  num: string
  title: string
  desc: string
}

// --- CURATED WARDROBE CATALOG (Strictly Custom-Fitted · Booked Appointments Only) ---
export const GALLERY_PIECES: GalleryPiece[] = [
  { id: '1', slug: 'rosalind-gown', title: 'The Rosalind Gown', subtitle: 'Blush Silk Corset Silhouette', material: '100% Raw Mulberry Silk · Custom Fitted', gradient: ['#F3D9E0', '#E4B7C4'], image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=800&q=80', category: 'gowns', archiveCode: 'Look 01 · Bespoke Drape' },
  { id: '2', slug: 'ao-dai-imperial', title: 'The Áo Dài Imperial', subtitle: 'Traditional Silk Embroidery', material: 'Hand-Stitched Silk · Custom Fitted', gradient: ['#EFE1D6', '#D9BFA9'], image: 'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?auto=format&fit=crop&w=800&q=80', category: 'gowns', archiveCode: 'Look 02 · Heritage Cut' },
  { id: '3', slug: 'marguerite-set', title: 'The Marguerite Set', subtitle: 'Lilac Layered Tulle & Ribbon', material: 'Hand-Pleated Tulle · Custom Fitted', gradient: ['#E9DCE8', '#CBAFC7'], image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=800&q=80', category: 'cocktail', archiveCode: 'Look 03 · New Addition' },
  { id: '4', slug: 'seraphina-corset-dress', title: 'The Seraphina Corset Dress', subtitle: 'Structured Ivory Tulle & Silk', material: 'Boned Bodice Cut · Custom Fitted', gradient: ['#F4E3D3', '#E0B48F'], image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=800&q=80', category: 'cocktail', archiveCode: 'Look 04 · Studio Edit' },
  { id: '5', slug: 'colette-slip-dress', title: 'The Colette Slip Dress', subtitle: 'Rose Satin Babydoll Cut', material: 'Fluid Satin Drape · Custom Fitted', gradient: ['#F0DDE1', '#D9A9B6'], image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=800&q=80', category: 'cocktail', archiveCode: 'Look 05 · Dainty Edit' },
  { id: '6', slug: 'minh-emerald-gown', title: 'The Minh Emerald Gown', subtitle: 'Jewel-Toned Velvet & Silk', material: 'Bias Cut Drape · Custom Fitted', gradient: ['#E6DED2', '#C6B79E'], image: 'https://images.unsplash.com/photo-1568252542512-9fe8fe9c87bb?auto=format&fit=crop&w=800&q=80', category: 'gowns', archiveCode: 'Look 06 · Evening Wear' },
  { id: '7', slug: 'angelic-lace-dress', title: 'Angelic Lace Tiered Dress', subtitle: 'Ivory Chantilly Lace & Silk', material: 'Scalloped Hem · Custom Fitted', gradient: ['#EAE5E1', '#D4C7BD'], image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=80', category: 'cocktail', archiveCode: 'Look 07 · Studio Favorite' },
  { id: '8', slug: 'vintage-pearl-gown', title: 'Vintage Pearl Evening Gown', subtitle: 'Champagne Satin & Pearl Trim', material: 'Bias Cut Silhouette · Custom Fitted', gradient: ['#EFECE6', '#D8CEBE'], image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80', category: 'gowns', archiveCode: 'Look 08 · Classic Elegance' },
]

// --- FLOWING EDITORIAL CONTENT GUIDELINES ---
const HOW_TO_RENT_STEPS: StepItem[] = [
  { num: '01', title: 'Choose Your Dress', desc: 'Browse our collection and send us a screenshot of your chosen dress, along with your size and event date.' },
  { num: '02', title: 'Check Availability', desc: "We'll confirm if your selected dress is available on your preferred date." },
  { num: '03', title: 'Send Your Details', desc: 'Provide one valid government-issued ID and a selfie holding your ID for verification.' },
  { num: '04', title: 'Complete Agreement', desc: 'Fill out our Rental Form and sign the Rental Agreement before your booking can be confirmed.' },
  { num: '05', title: 'Read Our Policy', desc: 'Please review our rental terms and guidelines carefully prior to your fitting.' },
  { num: '06', title: 'Secure Reservation', desc: 'Settle the required reservation fee to officially reserve your dress.' },
  { num: '07', title: 'Pick Up Your Dress', desc: "Claim your dress on your scheduled pickup date. We'll have it ready for your special occasion." },
  { num: '08', title: 'Return Your Dress', desc: 'Return the dress on the agreed date in its original condition to avoid additional charges.' },
]

const FITTING_STEPS: StepItem[] = [
  { num: '01', title: 'Book Your Appointment', desc: 'Send us a message with your preferred date and time for your fitting appointment.' },
  { num: '02', title: 'Wait for Confirmation', desc: "We'll confirm your schedule based on our private studio availability." },
  { num: '03', title: 'Visit Our Studio', desc: 'Come to our studio at your confirmed appointment time. Please arrive on time so we can assist you comfortably.' },
  { num: '04', title: 'Browse & Try On', desc: 'Explore our collection and try on your favorite modern Vietnamese dresses to find the perfect fit.' },
  { num: '05', title: 'Reserve Your Dress', desc: "Once you've found your favorite, we'll check its availability and reserve it for your event." },
  { num: '06', title: 'Complete Your Booking', desc: 'Submit the required details and settle the down payment to confirm your reservation.' },
  { num: '07', title: 'See You on Pickup Day', desc: 'Your dress will be prepared and ready for pickup on your scheduled rental date.' },
]

const TERMS_CONDITIONS = [
  { num: '01', title: 'Booking Confirmation', desc: 'Your booking is confirmed once all required information has been submitted and the reservation fee has been received.' },
  { num: '02', title: 'Verification', desc: 'One valid government-issued ID and a selfie holding your ID are required for verification before your booking can be confirmed.' },
  { num: '03', title: 'Reservation Fee', desc: 'A reservation fee is required to secure your chosen dress. This fee is non-refundable and non-transferable once your booking is confirmed.' },
  { num: '04', title: 'Rental Period', desc: 'Please return the dress on the agreed return date and time to ensure availability for our next client.' },
  { num: '05', title: 'Late Returns', desc: "Late returns may be subject to additional charges. If you're running late, kindly let us know as soon as possible." },
  { num: '06', title: 'Handle with Care', desc: 'Please take extra care of the dress throughout your rental. Avoid stains, tears, burns, broken zippers, missing accessories, or any damage.' },
  { num: '07', title: 'No Alterations', desc: 'Do not cut, sew, pin, dye, iron, wash, or make any permanent alterations to the dress.' },
  { num: '08', title: 'Damage & Loss', desc: 'Clients are responsible for any permanent stains, excessive damage, missing accessories, or loss of the rented dress. Corresponding charges may apply.' },
  { num: '09', title: 'Cancellations & Changes', desc: 'Reservation fees are non-refundable. Any changes to your booking are subject to dress availability.' },
  { num: '10', title: 'A Friendly Reminder', desc: 'We kindly ask that you return the dress clean, complete, and in the same condition you received it.' },
]

const REMINDER_BULLETS = [
  'Keep the dress in a clean, dry, and secure place when not in use.',
  'Please avoid contact with food, drinks, makeup, ink, perfumes, and other substances that may cause stains or damage.',
  'Handle all accessories with care and return them together with the dress.',
  'Any permanent stains, tears, missing accessories, or other damages may be subject to corresponding charges.',
  'Please return the dress on or before the agreed return date to avoid late fees.',
]

const ROW_ONE = [
  { text: 'Mulberry Silk', style: 'serif-reg' },
  { text: 'Studio Archive', style: 'serif-ital' },
  { text: 'Curated Silhouettes', style: 'serif-reg' },
  { text: 'Chantilly Lace', style: 'serif-ital' },
  { text: 'Modern Vietnamese', style: 'serif-reg' },
  { text: 'Bespoke Craftsmanship', style: 'serif-ital' },
  { text: 'Blush & Ivory', style: 'serif-reg' },
  { text: 'Editorial Wardrobe', style: 'serif-ital' },
] as const

const ROW_TWO = [
  { text: 'Booked Appointments', style: 'serif-ital' },
  { text: 'Hand-Pleated Tulle', style: 'serif-reg' },
  { text: 'Custom Fitted', style: 'serif-ital' },
  { text: 'Satin & Pearl', style: 'serif-reg' },
  { text: 'The Studio Closet', style: 'serif-ital' },
  { text: 'Rosalind · Marguerite · Seraphina', style: 'serif-reg' },
  { text: 'Wear with Grace', style: 'serif-ital' },
  { text: 'Reserved for You', style: 'serif-reg' },
] as const

const doubled = <T,>(arr: readonly T[]) => [...arr, ...arr]

const FILTERS = [
  { key: 'all', label: 'Complete Wardrobe' },
  { key: 'gowns', label: 'Evening Gowns' },
  { key: 'cocktail', label: 'Cocktail & Slips' },
] as const

export default function GracefulCoquetteGallery() {
  const [selectedPiece, setSelectedPiece] = useState<string | null>(null)
  const [filter, setFilter] = useState<'all' | 'gowns' | 'cocktail'>('all')
  const [bookingConfirmed, setBookingConfirmed] = useState(false)

  const filteredPieces = GALLERY_PIECES.filter(
    (piece) => filter === 'all' || piece.category === filter
  )

  const handleSelectPiece = (e: React.MouseEvent, title: string) => {
    e.preventDefault()
    e.stopPropagation()
    setSelectedPiece(title)
    setBookingConfirmed(false)
    document.getElementById('book')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const handleClearSelection = () => {
    setSelectedPiece(null)
    setBookingConfirmed(false)
  }

  const handleBookAppointment = () => {
    setBookingConfirmed(true)
  }

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
          --success: #5A7A68;
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
        .btn-primary:disabled { background: var(--success); opacity: 1; cursor: default; transform: none; box-shadow: none; }
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
        .dual-marquee:hover .dual-track,
        .dual-marquee:focus-within .dual-track { animation-play-state: paused; }
        @media (prefers-reduced-motion: reduce) {
          .dual-track { animation: none !important; }
        }
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

        /* FILTER PILLS */
        .filter-row { display: flex; gap: 12px; justify-content: center; margin-top: 32px; flex-wrap: wrap; }
        .filter-pill {
          padding: 10px 28px;
          border-radius: 999px;
          border: 1px solid var(--rose);
          background: transparent;
          color: var(--mocha);
          font-size: .8rem;
          font-weight: 500;
          cursor: pointer;
          text-transform: uppercase;
          letter-spacing: .1em;
          transition: all .3s ease;
        }
        .filter-pill:hover { background: var(--blush-ribbon); }
        .filter-pill.active {
          background: var(--mocha);
          color: #fff;
          box-shadow: 0 8px 20px -6px rgba(61, 44, 46, 0.3);
        }

        .no-results {
          text-align: center;
          padding: 60px 24px;
          color: var(--mocha-soft);
          font-style: italic;
          font-size: 1.1rem;
        }

        /* --- UPGRADED RUNWAY GALLERY GRID --- */
        .gallery { padding: 90px 0 120px; }
        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 40px 28px;
          align-items: start;
        }

        .piece {
          position: relative;
          display: flex;
          flex-direction: column;
          text-decoration: none;
          color: var(--mocha);
          group: relative;
        }

        /* 3:4 Runway Photo Frame without dark text overlays */
        .piece .thumb {
          position: relative;
          width: 100%;
          aspect-ratio: 3/4;
          border-radius: 20px;
          overflow: hidden;
          background: var(--blush-ribbon);
          margin-bottom: 18px;
          box-shadow: 0 16px 36px -12px rgba(61, 44, 46, 0.08);
          border: 1px solid var(--line);
          transition: box-shadow 0.35s ease, border-color 0.35s ease;
        }
        .piece:hover .thumb {
          box-shadow: 0 24px 48px -12px rgba(61, 44, 46, 0.16);
          border-color: var(--rose);
        }
        .piece .thumb img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform .7s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .piece:hover .thumb img { transform: scale(1.04); }

        /* Subtle film grain overlay */
        .piece .thumb::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E");
          opacity: 0.2;
          z-index: 1;
          pointer-events: none;
        }

        .piece .archive-badge {
          position: absolute; top: 16px; left: 16px; z-index: 5;
          background: rgba(255, 253, 249, 0.92);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          color: var(--rose-deep);
          font-family: 'Jost', sans-serif;
          padding: 5px 14px; border-radius: 999px; font-size: 0.68rem;
          font-weight: 500; letter-spacing: 0.1em; text-transform: uppercase;
          border: 1px solid rgba(242, 230, 232, 0.8);
          box-shadow: 0 4px 12px rgba(0,0,0,0.04);
        }

        /* Clean Information Panel Below Image */
        .piece .info {
          display: flex;
          flex-direction: column;
          padding: 0 4px;
        }

        .piece h3 {
          font-size: 1.7rem;
          font-style: italic;
          font-weight: 500;
          color: var(--mocha);
          line-height: 1.15;
          margin-bottom: 4px;
          transition: color 0.2s ease;
        }
        .piece:hover h3 { color: var(--rose-deep); }

        .piece .subtitle {
          font-size: .8rem;
          color: var(--mocha);
          font-weight: 400;
          letter-spacing: .08em;
          text-transform: uppercase;
          margin-bottom: 6px;
        }

        .piece .material {
          font-size: .8rem;
          color: var(--mocha-soft);
          font-style: italic;
          font-weight: 300;
          margin-bottom: 16px;
        }

        /* Streamlined Side-by-Side Action Row */
        .piece .meta-action {
          padding-top: 14px;
          border-top: 1px dashed var(--line);
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
        }

        .piece .view-link {
          font-size: .75rem;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: .12em;
          color: var(--mocha-soft);
          transition: color 0.2s ease;
        }
        .piece:hover .view-link { color: var(--mocha); }

        .piece .select-btn {
          font-size: .72rem;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: .12em;
          border: 1px solid var(--rose);
          background: #fff;
          color: var(--rose-deep);
          cursor: pointer;
          padding: 8px 18px;
          border-radius: 999px;
          transition: all .25s ease;
        }
        .piece .select-btn:hover {
          background: var(--rose-deep);
          color: #fff;
          border-color: var(--rose-deep);
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(169, 100, 124, 0.2);
        }

        /* --- FREE FLOWING EDITORIAL SECTIONS --- */
        .editorial-section {
          padding: 100px 0;
          border-top: 1px solid var(--line);
        }

        .journey-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(40px, 6vw, 80px);
        }
        @media (max-width: 900px) {
          .journey-grid { grid-template-columns: 1fr; }
        }
        .journey-col h3 {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-size: 2.2rem;
          color: var(--mocha);
          margin-bottom: 32px;
          padding-bottom: 16px;
          border-bottom: 1px solid var(--rose);
        }
        .step-list {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        .step-card {
          background: var(--card);
          border: 1px solid var(--line);
          padding: 24px 28px;
          border-radius: 20px;
          transition: transform 0.25s ease, border-color 0.25s ease;
          display: flex;
          gap: 20px;
          align-items: flex-start;
        }
        .step-card:hover {
          transform: translateY(-3px);
          border-color: var(--rose);
          box-shadow: 0 12px 24px -10px rgba(61, 44, 46, 0.08);
        }
        .step-card .step-num {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-size: 1.8rem;
          font-weight: 600;
          color: var(--rose-deep);
          line-height: 1;
          flex-shrink: 0;
        }
        .step-card h4 {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.3rem;
          font-weight: 600;
          margin-bottom: 6px;
          color: var(--mocha);
        }
        .step-card p {
          font-size: .9rem;
          color: var(--mocha-soft);
          line-height: 1.6;
        }

        .terms-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 24px;
        }
        .term-card {
          background: var(--porcelain);
          border: 1px solid var(--line);
          padding: 24px;
          border-radius: 18px;
          transition: border-color 0.2s ease;
        }
        .term-card:hover {
          border-color: var(--rose);
        }
        .term-card h4 {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--rose-deep);
          margin-bottom: 8px;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .term-card h4 span {
          font-style: italic;
          font-weight: 400;
          color: var(--mocha);
        }
        .term-card p {
          font-size: .92rem;
          color: var(--mocha-soft);
          line-height: 1.6;
        }

        .letter-container {
          max-width: 860px;
          margin: 0 auto;
          background: #FDF4F6;
          border: 1px solid var(--rose);
          border-radius: 28px;
          padding: clamp(36px, 6vw, 64px);
          position: relative;
          overflow: hidden;
          box-shadow: 0 20px 50px -10px rgba(61, 44, 46, 0.06);
        }
        .letter-watermark {
          position: absolute;
          bottom: 20px;
          right: 20px;
          width: 200px;
          height: 200px;
          border-radius: 50%;
          background: rgba(212, 139, 157, 0.12);
          border: 2px solid rgba(212, 139, 157, 0.25);
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: none;
          user-select: none;
        }
        .letter-watermark span {
          font-family: 'Parisienne', cursive;
          font-size: 5rem;
          color: rgba(169, 100, 124, 0.15);
        }
        .letter-body {
          position: relative;
          z-index: 2;
        }
        .letter-body h3 {
          font-family: 'Parisienne', cursive;
          font-size: clamp(2.4rem, 4vw, 3.2rem);
          color: var(--rose-deep);
          text-align: center;
          margin-bottom: 6px;
        }
        .letter-body p.subtitle {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-size: 1.25rem;
          color: var(--mocha-soft);
          text-align: center;
          margin-bottom: 32px;
        }
        .letter-body p.prose {
          font-size: 1.05rem;
          color: var(--mocha);
          line-height: 1.8;
          margin-bottom: 28px;
        }
        .letter-bullets {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 14px;
          margin-bottom: 36px;
        }
        .letter-bullets li {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          font-size: .95rem;
          color: var(--mocha-soft);
          line-height: 1.6;
          background: rgba(255, 253, 249, 0.8);
          padding: 14px 20px;
          border-radius: 12px;
          border: 1px solid rgba(242, 230, 232, 0.8);
        }
        .letter-bullets li::before {
          content: '✦';
          color: var(--rose-deep);
          font-size: 0.8rem;
          margin-top: 3px;
        }
        .letter-signoff {
          text-align: center;
          margin-top: 40px;
        }
        .letter-signoff .closing {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-size: 1.3rem;
          color: var(--mocha);
        }
        .letter-signoff .name {
          font-family: 'Parisienne', cursive;
          font-size: 2.4rem;
          color: var(--rose-deep);
          margin-top: 4px;
        }

        /* --- BOOKING CONSOLE --- */
        .booking-section {
          padding: 80px 0 120px;
          background: var(--card);
          border-top: 1px solid var(--line);
        }
        .booking-box {
          max-width: 680px;
          margin: 0 auto;
          text-align: center;
        }
        .booking-box h2 {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-size: clamp(2.2rem, 4vw, 3.2rem);
          margin-bottom: 12px;
        }
        .booking-box p {
          color: var(--mocha-soft);
          font-size: 1rem;
          margin-bottom: 36px;
        }
        .selection-banner {
          background: var(--mocha);
          color: #fff;
          padding: 16px 24px;
          border-radius: 16px;
          font-size: 0.95rem;
          margin-bottom: 24px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          letter-spacing: 0.04em;
          box-shadow: 0 10px 25px -8px rgba(61, 44, 46, 0.3);
          text-align: left;
        }
        .selection-banner button {
          background: none;
          border: none;
          color: #fff;
          cursor: pointer;
          font-weight: 300;
          font-size: 1.3rem;
          line-height: 1;
        }
        .confirmation-banner {
          background: var(--success);
          color: #fff;
          padding: 16px 24px;
          border-radius: 16px;
          font-size: 0.95rem;
          margin-top: 20px;
          text-align: center;
          letter-spacing: 0.02em;
          box-shadow: 0 10px 25px -8px rgba(90, 122, 104, 0.3);
        }

        @media (max-width: 1024px) {
          .hero .full-wrap { grid-template-columns: 1fr; text-align: center; padding-top: 20px; }
          .hero p.lead { margin-left: auto; margin-right: auto; }
          .btn-row { justify-content: center; }
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

      {/* --- EXPANSIVE EDITORIAL SHOWROOM --- */}
      <section className="gallery" id="gallery">
        <div className="full-wrap">
          <div className="section-head">
            <span className="eyebrow">the wardrobe catalog</span>
            <h2>Curated silhouettes &amp; styling</h2>
            <p style={{ color: 'var(--mocha-soft)', fontSize: '1.05rem', marginTop: '12px', fontWeight: 300 }}>
              A full-width exhibition of evening gowns, babydoll cuts, and structured silhouettes available exclusively by appointment.
            </p>

            <div className="filter-row" role="group" aria-label="Filter wardrobe by category">
              {FILTERS.map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => setFilter(key)}
                  className={`filter-pill ${filter === key ? 'active' : ''}`}
                  aria-pressed={filter === key}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {filteredPieces.length === 0 ? (
            <p className="no-results">
              No pieces currently match this category. Please check back soon.
            </p>
          ) : (
            <div className="gallery-grid">
              {filteredPieces.map((piece) => (
                <Link
                  key={piece.id}
                  href={`/products/${piece.slug}`}
                  className="piece"
                >
                  <div
                    className="thumb"
                    style={{
                      background: `linear-gradient(150deg, ${piece.gradient[0]} 0%, ${piece.gradient[1]} 60%, ${piece.gradient[1]}cc 100%)`,
                    }}
                  >
                    <img src={piece.image} alt={piece.title} />
                    {piece.archiveCode && (
                      <span className="archive-badge">{piece.archiveCode}</span>
                    )}
                  </div>

                  <div className="info">
                    <h3>{piece.title}</h3>
                    <p className="subtitle">{piece.subtitle}</p>
                    <p className="material">{piece.material}</p>
                    
                    <div className="meta-action">
                      <span className="view-link">
                        View Look →
                      </span>
                      <button
                        type="button"
                        className="select-btn"
                        onClick={(e) => handleSelectPiece(e, piece.title)}
                      >
                        Select for Fitting +
                      </button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* --- FLOWING EDITORIAL SECTION 1: THE RENTAL & FITTING JOURNEY --- */}
      <section className="editorial-section" id="how">
        <div className="full-wrap">
          <div className="section-head">
            <span className="eyebrow">studio process</span>
            <h2>The Rental &amp; Fitting Experience</h2>
            <p style={{ color: 'var(--mocha-soft)', fontSize: '1.05rem', marginTop: '12px', fontWeight: 300 }}>
              From preliminary consultation to your event day, every step is curated for graceful ease.
            </p>
          </div>

          <div className="journey-grid">
            <div className="journey-col">
              <h3>How to Rent</h3>
              <div className="step-list">
                {HOW_TO_RENT_STEPS.map((step) => (
                  <div key={step.num} className="step-card">
                    <span className="step-num">{step.num}</span>
                    <div>
                      <h4>{step.title}</h4>
                      <p>{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="journey-col">
              <h3>Fitting Appointment</h3>
              <div className="step-list">
                {FITTING_STEPS.map((step) => (
                  <div key={step.num} className="step-card">
                    <span className="step-num">{step.num}</span>
                    <div>
                      <h4>{step.title}</h4>
                      <p>{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- FLOWING EDITORIAL SECTION 2: WARDROBE GUIDELINES & TERMS --- */}
      <section className="editorial-section" id="terms" style={{ background: '#FFFDF9' }}>
        <div className="full-wrap">
          <div className="section-head">
            <span className="eyebrow">rental guidelines</span>
            <h2>Terms &amp; Conditions</h2>
            <p style={{ color: 'var(--mocha-soft)', fontSize: '1.05rem', marginTop: '12px', fontWeight: 300 }}>
              Please review our studio care policies prior to confirming your bespoke wardrobe reservation.
            </p>
          </div>

          <div className="terms-grid">
            {TERMS_CONDITIONS.map((term) => (
              <div key={term.num} className="term-card">
                <h4>
                  {term.num} <span>— {term.title}</span>
                </h4>
                <p>{term.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FLOWING EDITORIAL SECTION 3: LETTER FROM THE SHOWROOM --- */}
      <section className="editorial-section">
        <div className="full-wrap">
          <div className="letter-container">
            <div className="letter-watermark">
              <span>GR</span>
            </div>
            <div className="letter-body">
              <h3>A Friendly Reminder</h3>
              <p className="subtitle">To Our Valued Client</p>
              
              <p className="prose">
                Thank you for choosing Gigi&apos;s Rentals. We truly appreciate your trust in us and hope you enjoy wearing one of our custom-fitted silhouettes. To help us maintain the quality and beauty of every rental, we kindly ask that you handle your dress with care throughout the rental period.
              </p>

              <ul className="letter-bullets">
                {REMINDER_BULLETS.map((bullet, idx) => (
                  <li key={idx}>{bullet}</li>
                ))}
              </ul>

              <p className="prose" style={{ marginBottom: 0 }}>
                Thank you for treating our dresses with love and care. We hope you feel beautiful and confident in your chosen dress. Until your next special occasion!
              </p>

              <div className="letter-signoff">
                <div className="closing">With love,</div>
                <div className="name">Gigi&apos;s Rentals</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- BOOKING CONSOLE --- */}
      <section className="booking-section" id="book">
        <div className="full-wrap">
          <div className="booking-box">
            <span className="eyebrow" style={{ marginBottom: '8px' }}>private showroom</span>
            <h2>Book Your Studio Appointment</h2>
            <p>
              All silhouettes are strictly custom-fitted. Select your favorite look above or book a preliminary fitting consultation directly with our styling team.
            </p>

            {selectedPiece && (
              <div className="selection-banner">
                <span>
                  Selected look: <strong style={{ fontStyle: 'italic', fontWeight: 600 }}>{selectedPiece}</strong>
                </span>
                <button
                  onClick={handleClearSelection}
                  aria-label="Remove selection"
                >
                  ✕
                </button>
              </div>
            )}

            <button
              className="btn btn-primary"
              style={{ width: '100%', justifyContent: 'center', padding: '18px', fontSize: '.9rem' }}
              onClick={handleBookAppointment}
              disabled={bookingConfirmed}
            >
              {bookingConfirmed
                ? 'Appointment Request Sent ✓'
                : selectedPiece
                  ? `Book Fitting Appointment for ${selectedPiece}`
                  : 'Book a Studio Fitting Appointment'}
            </button>

            {bookingConfirmed && (
              <div className="confirmation-banner" role="status">
                Thank you — our studio team will reach out shortly to confirm your private schedule
                {selectedPiece ? ` for ${selectedPiece}` : ''}.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* --- EXTRACTED FOOTER COMPONENT --- */}
      <Footer />
    </>
  )
}