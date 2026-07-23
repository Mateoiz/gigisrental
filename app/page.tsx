'use client'

import { useState, useRef, KeyboardEvent } from 'react'
import Link from 'next/link'
import Navbar from '@/app/components/Navbar'
import Footer from '@/app/components/Footer'

interface StepItem {
  num: string
  title: string
  desc: string
}

const HERO_IMAGE = 'https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?auto=format&fit=crop&w=2200&q=80'

// --- CURATED RULES & GUIDELINES DATA ---
const HOW_TO_RENT_STEPS: StepItem[] = [
  { num: '01', title: 'Choose Your Dress', desc: 'Browse our online collection and send us a screenshot of your chosen dress, along with your size and event date.' },
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
  { text: 'Custom Fitted', style: 'serif-reg' },
  { text: 'Studio Guidelines', style: 'serif-ital' },
  { text: 'Bespoke Rules', style: 'serif-reg' },
  { text: 'Chantilly Lace', style: 'serif-ital' },
  { text: 'Modern Vietnamese', style: 'serif-reg' },
  { text: 'Care & Maintenance', style: 'serif-ital' },
  { text: 'Blush & Ivory', style: 'serif-reg' },
  { text: 'Rental Policy', style: 'serif-ital' },
] as const

const ROW_TWO = [
  { text: 'Booked Appointments', style: 'serif-ital' },
  { text: 'Hand-Pleated Tulle', style: 'serif-reg' },
  { text: 'Verification Required', style: 'serif-ital' },
  { text: 'Satin & Pearl', style: 'serif-reg' },
  { text: 'The Studio Rules', style: 'serif-ital' },
  { text: 'Strictly By Appointment', style: 'serif-reg' },
  { text: 'Wear with Grace', style: 'serif-ital' },
  { text: 'Reserved for You', style: 'serif-reg' },
] as const

const doubled = <T,>(arr: readonly T[]) => [...arr, ...arr]

const TABS = [
  { key: 'appointment', label: 'Appointment', num: '01', icon: 'calendar' as const },
  { key: 'how', label: 'How to Rent', num: '02', icon: 'mirror' as const },
  { key: 'terms', label: 'Terms', num: '03', icon: 'scroll' as const },
  { key: 'reminder', label: 'Reminder', num: '04', icon: 'swan' as const },
] as const

type TabKey = typeof TABS[number]['key']

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

// --- TAB ICON SET — matches CoquetteBow's line-art language ---
function TabIcon({ name, size = 16 }: { name: 'calendar' | 'mirror' | 'scroll' | 'swan'; size?: number }) {
  const common = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none' as const,
    stroke: 'currentColor',
    strokeWidth: 1.6,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
  }
  switch (name) {
    case 'calendar':
      return (
        <svg {...common}>
          <rect x="3.5" y="5" width="17" height="15" rx="3" />
          <path d="M3.5 9.5h17M8 3v3.5M16 3v3.5" />
          <circle cx="12" cy="14" r="1.4" fill="currentColor" stroke="none" />
        </svg>
      )
    case 'mirror':
      return (
        <svg {...common}>
          <path d="M12 3c4 0 6.5 3.4 6.5 7.5S16 20 12 20s-6.5-5.4-6.5-9.5S8 3 12 3Z" />
          <path d="M12 20v1.6M9 21.6h6" />
        </svg>
      )
    case 'scroll':
      return (
        <svg {...common}>
          <path d="M6 4h9a2.5 2.5 0 0 1 2.5 2.5V19a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V4Z" />
          <path d="M6 4a2 2 0 0 0-2 2v1a2 2 0 0 0 2 2M9 9h6M9 13h6" />
        </svg>
      )
    case 'swan':
      return (
        <svg {...common}>
          <path d="M4 18c2-.5 3.5-1.6 4.4-3.2C5.8 13 5 10.6 6.4 8.6 7.8 6.6 10.6 6 12.6 7.2c1 .6 1.6 1.6 1.7 2.7.9-.3 1.9-.1 2.6.6.9.9.9 2.3 0 3.2l-2.4 2.4c-1.4 1.4-3.4 2-5.3 1.6L4 18Z" />
          <circle cx="9.6" cy="9.6" r="0.7" fill="currentColor" stroke="none" />
        </svg>
      )
  }
}

export default function RulesPage() {
  const [activeTab, setActiveTab] = useState<TabKey>('appointment')
  const tabRefs = useRef<Record<TabKey, HTMLButtonElement | null>>({
    appointment: null,
    how: null,
    terms: null,
    reminder: null,
  })

  const focusTab = (key: TabKey) => {
    setActiveTab(key)
    tabRefs.current[key]?.focus()
  }

  const handleTabKeyDown = (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (!['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(e.key)) return
    e.preventDefault()
    let nextIndex = index
    if (e.key === 'ArrowRight') nextIndex = (index + 1) % TABS.length
    if (e.key === 'ArrowLeft') nextIndex = (index - 1 + TABS.length) % TABS.length
    if (e.key === 'Home') nextIndex = 0
    if (e.key === 'End') nextIndex = TABS.length - 1
    focusTab(TABS[nextIndex].key)
  }

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
          --shadow-lg: 0 6px 14px rgba(74, 51, 55, 0.1), 0 28px 60px -16px rgba(184, 107, 125, 0.32);

          --accent-appointment: #C77B8E;
          --accent-how: #B86B7D;
          --accent-terms: #9C5C6E;
          --accent-reminder: #D391A6;
        }
        *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

        body {
          background: var(--porcelain);
          color: var(--mocha);
          font-family: 'Jost', sans-serif;
          font-weight: 300;
          line-height: 1.65;
          -webkit-font-smoothing: antialiased;
          overflow-x: hidden;
        }
        .eyebrow {
          font-family: 'Parisienne', cursive;
          font-size: clamp(1.6rem, 2.5vw, 2.2rem);
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
          padding: 0 clamp(20px, 5vw, 80px);
        }

        /* --- ROMANTIC TULLE HERO SECTION --- */
        .gg-hero {
          position: relative;
          min-height: calc(85vh - 84px);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          background: var(--porcelain);
        }
        .gg-hero-photo {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(180deg, rgba(255,251,247,.95) 0%, rgba(255,251,247,.82) 50%, rgba(255,251,247,.98) 100%),
            url('${HERO_IMAGE}');
          background-size: cover;
          background-position: center 30%;
          filter: saturate(0.8) brightness(1.03);
          z-index: 0;
        }
        .gg-tulle-overlay {
          position: absolute;
          inset: 0;
          background-image: radial-gradient(var(--tulle-dot) 1.5px, transparent 1.5px);
          background-size: 16px 16px;
          z-index: 1;
          pointer-events: none;
        }
        .gg-blush-glow {
          position: absolute;
          width: 60vw;
          height: 60vw;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(253, 242, 245, 0.8) 0%, rgba(253, 242, 245, 0) 70%);
          top: -10vw;
          left: 20vw;
          z-index: 1;
          pointer-events: none;
        }

        .gg-hero-main {
          position: relative;
          z-index: 3;
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: clamp(40px, 8vh, 80px) clamp(24px, 5vw, 64px) clamp(30px, 5vh, 50px);
        }
        .gg-hero-content { max-width: 780px; display: flex; flex-direction: column; align-items: center; }

        .gg-eyebrow-pill {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 8px 22px;
          border-radius: 999px;
          border: 1px dashed var(--rose);
          background: rgba(255,255,255,.75);
          backdrop-filter: blur(8px);
          font-size: .75rem;
          font-weight: 500;
          letter-spacing: .16em;
          text-transform: uppercase;
          color: var(--rose-deep);
          margin-bottom: 24px;
          box-shadow: var(--shadow-xs);
        }

        .gg-hero-content h1 {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 500;
          font-style: italic;
          font-size: clamp(3rem, 6.8vw, 5.6rem);
          line-height: 1.05;
          color: var(--mocha);
          margin-bottom: 22px;
          letter-spacing: -.01em;
        }
        .gg-hero-content h1 .accent {
          display: block;
          color: var(--rose-deep);
          font-weight: 600;
        }
        .gg-hero-content p.lead {
          font-family: 'Jost', sans-serif;
          font-weight: 300;
          font-size: clamp(1.05rem, 1.6vw, 1.25rem);
          color: var(--mocha-soft);
          line-height: 1.8;
          max-width: 580px;
          margin: 0 auto 40px;
        }
        
        .gg-hero-cta-row {
          display: flex;
          gap: 18px;
          justify-content: center;
          flex-wrap: wrap;
          margin-bottom: 52px;
        }
        .gg-btn {
          font-family: 'Jost', sans-serif;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 16px 36px;
          border-radius: 999px;
          font-size: .82rem;
          font-weight: 500;
          letter-spacing: .12em;
          text-transform: uppercase;
          text-decoration: none;
          cursor: pointer;
          transition: all .3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .gg-btn-primary {
          background: var(--mocha);
          color: #fff;
          box-shadow: 0 3px 6px rgba(74, 51, 55, 0.25), 0 14px 28px -8px rgba(74, 51, 55, 0.35);
        }
        .gg-btn-primary:hover {
          background: var(--rose-deep);
          transform: translateY(-3px);
          box-shadow: 0 4px 10px rgba(74, 51, 55, 0.2), 0 20px 38px -8px rgba(184, 107, 125, 0.55);
        }
        .gg-btn-ghost {
          border: 1px dashed var(--rose-deep);
          color: var(--mocha);
          background: rgba(255,255,255,.7);
          backdrop-filter: blur(6px);
          box-shadow: var(--shadow-xs);
        }
        .gg-btn-ghost:hover {
          background: var(--blush-ribbon);
          border-style: solid;
          color: var(--rose-deep);
          transform: translateY(-2px);
          box-shadow: var(--shadow-sm);
        }
        .gg-btn:focus-visible {
          outline: 2px solid var(--rose-deep);
          outline-offset: 3px;
        }

        .gg-trust-row {
          display: flex;
          gap: clamp(18px, 3.5vw, 40px);
          justify-content: center;
          flex-wrap: wrap;
          font-size: .8rem;
          color: var(--mocha-soft);
          letter-spacing: .05em;
          font-weight: 400;
        }
        .gg-trust-row span {
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }
        .gg-trust-row span.heart { color: var(--rose-deep); font-size: 0.9rem; }

        .gg-scroll-hint {
          position: relative;
          z-index: 3;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          padding-bottom: clamp(24px, 4vh, 40px);
          color: var(--mocha-soft);
          font-size: .7rem;
          letter-spacing: .18em;
          text-transform: uppercase;
        }

        /* --- DUAL-ROW DRIFTING MARQUEE --- */
        .dual-marquee {
          width: 100%;
          background: var(--mocha);
          overflow: hidden;
          position: relative;
          padding: 0;
          margin-bottom: clamp(48px, 8vw, 80px);
          border-top: 2px solid var(--rose);
          border-bottom: 2px solid var(--rose);
        }
        .dual-marquee-row {
          display: flex;
          align-items: center;
          white-space: nowrap;
          padding: 14px 0;
          position: relative;
        }
        .dual-marquee-row:first-child {
          border-bottom: 1px dashed rgba(226, 166, 180, 0.25);
        }
        .dual-marquee-row:first-child .dual-track { animation: drift-left 34s linear infinite; }
        .dual-marquee-row:last-child  .dual-track { animation: drift-right 40s linear infinite; }
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
          font-size: clamp(0.78rem, 1.1vw, 1.05rem);
          font-weight: 500;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          padding: 0 clamp(16px, 2.5vw, 32px);
        }
        .dual-word.serif-reg { font-style: normal; color: var(--blush-ribbon); }
        .dual-word.serif-ital { font-style: italic; color: var(--rose); font-size: clamp(0.85rem, 1.2vw, 1.15rem); font-weight: 400; }
        .dual-sep {
          display: inline-block; color: var(--rose); font-size: 0.75rem; flex-shrink: 0; opacity: 0.7;
        }
        @media (prefers-reduced-motion: reduce) {
          .dual-track { animation: none !important; }
        }

        /* --- ATELIER SCRAPBOOK FOLDER --- */
        .stationery-section {
          padding: 0 0 clamp(70px, 10vw, 120px);
          background: var(--porcelain);
          position: relative;
        }
        .stationery-container {
          max-width: 1080px;
          margin: 0 auto;
          position: relative;
        }

        .folder-tabs-scroll {
          position: relative;
          z-index: 2;
        }
        .folder-tabs {
          display: flex;
          justify-content: flex-start;
          align-items: flex-end;
          gap: 0;
          padding: 0 8px;
          overflow-x: auto;
          overflow-y: visible;
          scroll-snap-type: x proximity;
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .folder-tabs::-webkit-scrollbar { display: none; }
        @media (min-width: 700px) {
          .folder-tabs {
            justify-content: flex-end;
            overflow-x: visible;
            padding: 0 20px;
          }
        }
        
        /* Rounded folder tabs with gentle slope (16px 22px 0 0), overlapped by -12px */
        .folder-tab {
          background: #F5EAEC;
          border: 1px solid rgba(184, 107, 125, 0.35);
          border-bottom: none;
          padding: 12px 22px;
          min-height: 48px;
          border-radius: 16px 22px 0 0;
          font-family: 'Jost', sans-serif;
          font-size: .78rem;
          font-weight: 500;
          letter-spacing: .1em;
          text-transform: uppercase;
          color: var(--mocha-soft);
          cursor: pointer;
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
          display: flex;
          align-items: center;
          gap: 8px;
          white-space: nowrap;
          flex-shrink: 0;
          scroll-snap-align: start;
          position: relative;
          margin-left: -12px;
          box-shadow: 0 -2px 6px rgba(184, 107, 125, 0.06);
        }
        .folder-tab:first-child { margin-left: 0; }
        @media (min-width: 480px) {
          .folder-tab { padding: 14px 26px 12px; font-size: .82rem; letter-spacing: .12em; margin-left: -14px; }
        }
        .folder-tab:hover {
          background: #FCEEF1;
          color: var(--mocha);
        }
        .folder-tab:focus-visible {
          outline: 2px solid var(--rose-deep);
          outline-offset: 2px;
          z-index: 12 !important;
        }
        
        /* Active tab sits over folder border (border-bottom: 3px solid #FFF7F8) */
        .folder-tab.active {
          background: #FFF7F8;
          color: var(--mocha);
          font-weight: 600;
          border: 1px solid var(--rose-deep);
          border-bottom: 3px solid #FFF7F8;
          padding-bottom: 16px;
          margin-bottom: -2px;
          border-radius: 16px 22px 0 0;
          box-shadow: 0 -8px 20px -6px rgba(184, 107, 125, 0.18);
          z-index: 10 !important;
        }
        .folder-tab .tab-icon {
          display: flex;
          color: var(--rose-deep);
          opacity: 0.75;
          transition: opacity .25s ease;
        }
        .folder-tab.active .tab-icon,
        .folder-tab:hover .tab-icon {
          opacity: 1;
        }
        .folder-tab span.num {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-size: 1.05rem;
          color: var(--mocha-soft);
          font-weight: 600;
          display: none;
        }
        .folder-tab.active span.num { color: var(--tab-accent, var(--rose-deep)); }
        @media (min-width: 480px) {
          .folder-tab span.num { display: inline; }
        }
        .folder-tabs-scroll::after {
          content: '';
          position: absolute;
          top: 0; right: 0; bottom: 0;
          width: 32px;
          background: linear-gradient(to left, var(--porcelain), transparent);
          pointer-events: none;
        }
        @media (min-width: 700px) {
          .folder-tabs-scroll::after { display: none; }
        }

        .stationery-paper-stack {
          position: relative;
          z-index: 1;
        }
        .stationery-paper-stack::before,
        .stationery-paper-stack::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 18px;
          border: 1px solid rgba(226, 166, 180, 0.5);
          pointer-events: none;
        }
        .stationery-paper-stack::before {
          background: #F8E4E9;
          transform: rotate(-1.1deg) translateY(3px);
          z-index: -1;
        }
        .stationery-paper-stack::after {
          background: #FCF1F3;
          transform: rotate(0.8deg) translateY(2px);
          z-index: -2;
        }

        /* Folder body sits at z-index: 5, above inactive tabs (z-index 1..4), below active tab (z-index 10) */
        .folder-body {
          background: #FFF7F8;
          border: 1px solid var(--rose-deep);
          border-radius: 24px;
          padding: clamp(32px, 5vw, 64px);
          box-shadow: 0 24px 60px -12px rgba(184, 107, 125, 0.2);
          position: relative;
          z-index: 5;
          overflow: hidden;
        }
        @media (min-width: 700px) {
          .folder-body { border-radius: 28px 0 28px 28px; }
        }
        .folder-body::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background-image: linear-gradient(90deg, var(--stitch) 50%, transparent 50%);
          background-size: 10px 2px;
          z-index: 2;
        }

        .folder-inner-lace {
          position: absolute;
          inset: 12px;
          border: 1px dashed rgba(226, 166, 180, 0.35);
          border-radius: 16px;
          pointer-events: none;
          z-index: 1;
        }
        @media (min-width: 700px) {
          .folder-inner-lace { border-radius: 16px 0 16px 16px; }
        }

        .folder-watermark {
          position: absolute;
          bottom: 16px; right: 24px;
          width: 140px; height: 140px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(226, 166, 180, 0.15) 0%, transparent 70%);
          border: 1px dashed rgba(184, 107, 125, 0.25);
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: none;
          user-select: none;
          z-index: 0;
        }
        .folder-watermark span {
          font-family: 'Parisienne', cursive;
          font-size: 3.2rem;
          color: rgba(184, 107, 125, 0.18);
        }
        @media (min-width: 700px) {
          .folder-watermark { width: 200px; height: 200px; bottom: 24px; right: 32px; }
          .folder-watermark span { font-size: 5rem; }
        }

        .stationery-header {
          text-align: center;
          margin-bottom: clamp(36px, 5vw, 56px);
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .stationery-header h3 {
          font-family: 'Parisienne', cursive;
          font-size: clamp(2.4rem, 6vw, 4.2rem);
          color: var(--rose-deep);
          margin-bottom: 2px;
        }
        .stationery-header p {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-size: clamp(1.1rem, 2vw, 1.35rem);
          color: var(--mocha-soft);
          letter-spacing: .04em;
        }

        .stationery-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: clamp(18px, 2.5vw, 32px);
          position: relative;
          z-index: 2;
        }
        .stationery-item {
          background: #FFFFFF;
          border: 1px solid rgba(226, 166, 180, 0.5);
          padding: clamp(20px, 3vw, 28px);
          border-radius: 20px;
          transition: transform 0.25s ease, box-shadow 0.25s ease, border-color .25s ease;
          position: relative;
          box-shadow: var(--shadow-xs);
        }
        .stationery-item:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-sm);
          border-color: var(--tab-accent, var(--rose-deep));
        }
        .stationery-item .step-num {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-size: 1.7rem;
          font-weight: 600;
          color: var(--tab-accent, var(--rose-deep));
          display: flex;
          align-items: center;
          gap: 6px;
          margin-bottom: 10px;
        }
        .stationery-item h4 {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.3rem;
          font-weight: 600;
          margin-bottom: 8px;
          color: var(--mocha);
          line-height: 1.25;
        }
        .stationery-item p {
          font-size: .93rem;
          color: var(--ink-body);
          line-height: 1.7;
        }

        .stationery-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: clamp(16px, 2vw, 22px);
          position: relative;
          z-index: 2;
        }
        .stationery-list li {
          background: #FFFFFF;
          border: 1px solid rgba(226, 166, 180, 0.5);
          padding: clamp(18px, 2.5vw, 24px) clamp(20px, 3vw, 28px);
          border-radius: 18px;
          box-shadow: var(--shadow-xs);
          transition: border-color .2s ease, box-shadow .2s ease;
        }
        .stationery-list li:hover {
          border-color: var(--tab-accent, var(--rose-deep));
          box-shadow: var(--shadow-sm);
        }
        .stationery-list h4 {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--tab-accent, var(--rose-deep));
          margin-bottom: 7px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .stationery-list p {
          font-size: .95rem;
          color: var(--ink-body);
          line-height: 1.7;
        }

        .stationery-prose {
          max-width: 800px;
          margin: 0 auto;
          text-align: center;
          position: relative;
          z-index: 2;
        }
        .stationery-prose p.intro {
          font-size: clamp(1rem, 1.5vw, 1.1rem);
          color: var(--mocha);
          line-height: 1.85;
          margin-bottom: clamp(28px, 4vw, 36px);
        }
        .stationery-prose ul {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 16px;
          text-align: left;
          margin-bottom: clamp(32px, 4vw, 44px);
        }
        .stationery-prose li {
          display: flex;
          align-items: flex-start;
          gap: 14px;
          font-size: .96rem;
          color: var(--ink-body);
          line-height: 1.7;
          background: #FFFFFF;
          padding: 16px 22px;
          border-radius: 16px;
          border: 1px solid rgba(226, 166, 180, 0.5);
          box-shadow: var(--shadow-xs);
        }
        .stationery-prose li::before {
          content: '♡';
          color: var(--tab-accent, var(--rose-deep));
          font-size: 1rem;
          margin-top: 1px;
          flex-shrink: 0;
        }
        .stationery-prose .outro {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-size: clamp(1.2rem, 2vw, 1.45rem);
          color: var(--mocha);
          margin-bottom: 12px;
        }
        .stationery-prose .sign-off {
          font-family: 'Parisienne', cursive;
          font-size: clamp(2rem, 3.5vw, 2.6rem);
          color: var(--tab-accent, var(--rose-deep));
        }

        @media (max-width: 640px) {
          .gg-hero { min-height: 100vh; }
          .gg-trust-row { gap: 12px 20px; }
          .gg-hero-cta-row { flex-direction: column; width: 100%; }
          .gg-hero-cta-row .gg-btn { width: 100%; justify-content: center; }
        }
      `}</style>

      <Navbar />

      {/* --- ROMANTIC TULLE HERO SECTION --- */}
      <section className="gg-hero">
        <div className="gg-hero-photo" aria-hidden="true" />
        <div className="gg-tulle-overlay" aria-hidden="true" />
        <div className="gg-blush-glow" aria-hidden="true" />

        <div className="gg-hero-main">
          <div className="gg-hero-content">
            <span className="gg-eyebrow-pill">
              <CoquetteBow width={22} height={14} style={{ color: 'var(--rose-deep)' }} />
              modern vietnamese rental atelier
            </span>

            <h1>
              Dress rentals,
              <span className="accent">reimagined with grace.</span>
            </h1>

            <p className="lead">
              Gigi&apos;s Rentals is an intimate atelier for custom-fitted gowns and cocktail
              silhouettes — every piece tailored just for you through private appointments. Explore our studio etiquette and care standards below.
            </p>

            <div className="gg-hero-cta-row">
              <Link href="#guidelines" className="gg-btn gg-btn-primary" onClick={() => setActiveTab('appointment')}>
                Explore Studio Rules
              </Link>
              <Link href="#guidelines" className="gg-btn gg-btn-ghost" onClick={() => setActiveTab('how')}>
                Rental Etiquette
              </Link>
            </div>

            <div className="gg-trust-row">
              <span><span className="heart">♡</span> Bespoke Fitted Only</span>
              <span><span className="heart">♡</span> Private Showroom</span>
              <span><span className="heart">♡</span> Steamed &amp; Dry Cleaned</span>
            </div>
          </div>
        </div>

        <div className="gg-scroll-hint" aria-hidden="true">
          <span>Scroll to Etiquette</span>
          <CoquetteBow width={24} height={16} style={{ opacity: 0.7, marginTop: -4 }} />
        </div>
      </section>

      {/* --- DUAL-ROW DRIFTING MARQUEE (COQUETTE SYMBOLS) --- */}
      <div className="dual-marquee" aria-hidden="true">
        <div className="dual-marquee-row">
          <div className="dual-track">
            {doubled(ROW_ONE).map((item, i) => (
              <span key={i} style={{ display: 'inline-flex', alignItems: 'center' }}>
                <span className={`dual-word ${item.style}`}>{item.text}</span>
                <span className="dual-sep">❀</span>
              </span>
            ))}
          </div>
        </div>
        <div className="dual-marquee-row">
          <div className="dual-track">
            {doubled(ROW_TWO).map((item, i) => (
              <span key={i} style={{ display: 'inline-flex', alignItems: 'center' }}>
                <span className={`dual-word ${item.style}`}>{item.text}</span>
                <span className="dual-sep">♡</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* --- ATELIER SCRAPBOOK FOLDER SECTION --- */}
      <section className="stationery-section" id="guidelines">
        <div className="full-wrap">
          <div className="stationery-container">

            <div className="folder-tabs-scroll">
              <div className="folder-tabs" role="tablist" aria-label="Studio Rules and Guidelines">
                {TABS.map((tab, index) => (
                  <button
                    key={tab.key}
                    ref={(el) => {
                      tabRefs.current[tab.key] = el
                    }}
                    type="button"
                    role="tab"
                    id={`tab-${tab.key}`}
                    aria-selected={activeTab === tab.key}
                    aria-controls={`panel-${tab.key}`}
                    tabIndex={activeTab === tab.key ? 0 : -1}
                    onClick={() => setActiveTab(tab.key)}
                    onKeyDown={(e) => handleTabKeyDown(e, index)}
                    className={`folder-tab ${activeTab === tab.key ? 'active' : ''}`}
                    style={{
                      '--tab-accent': `var(--accent-${tab.key})`,
                      zIndex: activeTab === tab.key ? 10 : TABS.length - index,
                    } as React.CSSProperties}
                  >
                    <span className="tab-icon"><TabIcon name={tab.icon} size={15} /></span>
                    <span className="num">{tab.num}</span> {tab.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="stationery-paper-stack">
              <div className="folder-body">
                <div className="folder-inner-lace" aria-hidden="true" />
                <div className="folder-watermark" aria-hidden="true">
                  <span>GR</span>
                </div>

                {activeTab === 'appointment' && (
                  <div role="tabpanel" id="panel-appointment" aria-labelledby="tab-appointment" tabIndex={0} style={{ '--tab-accent': 'var(--accent-appointment)' } as React.CSSProperties}>
                    <div className="stationery-header">
                      <CoquetteBow width={48} height={32} style={{ color: 'var(--rose-deep)', marginBottom: 8 }} />
                      <h3>Fitting Appointment</h3>
                      <p>Everything You Need to Know</p>
                    </div>
                    <div className="stationery-grid">
                      {FITTING_STEPS.map((step) => (
                        <div key={step.num} className="stationery-item">
                          <span className="step-num">{step.num} <span style={{ fontSize: '1rem', fontStyle: 'normal', color: 'var(--rose)' }}>♡</span></span>
                          <h4>{step.title}</h4>
                          <p>{step.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'how' && (
                  <div role="tabpanel" id="panel-how" aria-labelledby="tab-how" tabIndex={0} style={{ '--tab-accent': 'var(--accent-how)' } as React.CSSProperties}>
                    <div className="stationery-header">
                      <CoquetteBow width={48} height={32} style={{ color: 'var(--rose-deep)', marginBottom: 8 }} />
                      <h3>How to Rent</h3>
                      <p>Everything You Need to Know</p>
                    </div>
                    <div className="stationery-grid">
                      {HOW_TO_RENT_STEPS.map((step) => (
                        <div key={step.num} className="stationery-item">
                          <span className="step-num">{step.num} <span style={{ fontSize: '1rem', fontStyle: 'normal', color: 'var(--rose)' }}>♡</span></span>
                          <h4>{step.title}</h4>
                          <p>{step.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'terms' && (
                  <div role="tabpanel" id="panel-terms" aria-labelledby="tab-terms" tabIndex={0} style={{ '--tab-accent': 'var(--accent-terms)' } as React.CSSProperties}>
                    <div className="stationery-header">
                      <CoquetteBow width={48} height={32} style={{ color: 'var(--rose-deep)', marginBottom: 8 }} />
                      <h3>Terms &amp; Conditions</h3>
                      <p>Please take a moment to read our rental etiquette.</p>
                    </div>
                    <ul className="stationery-list">
                      {TERMS_CONDITIONS.map((term, idx) => (
                        <li key={idx}>
                          <h4><span style={{ color: 'var(--rose)' }}>❀</span> {term.title}</h4>
                          <p>{term.desc}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {activeTab === 'reminder' && (
                  <div role="tabpanel" id="panel-reminder" aria-labelledby="tab-reminder" tabIndex={0} style={{ '--tab-accent': 'var(--accent-reminder)' } as React.CSSProperties}>
                    <div className="stationery-header">
                      <CoquetteBow width={48} height={32} style={{ color: 'var(--rose-deep)', marginBottom: 8 }} />
                      <h3>Friendly Reminder</h3>
                      <p>To Our Valued Client</p>
                    </div>
                    <div className="stationery-prose">
                      <p className="intro">
                        Thank you for choosing Gigi&apos;s Rentals. We truly appreciate your trust in us and hope you enjoy wearing one of our dresses. To help us maintain the quality and beauty of every rental, we kindly ask that you handle your dress with care throughout the rental period.
                      </p>
                      <ul>
                        {REMINDER_BULLETS.map((bullet, idx) => (
                          <li key={idx}>{bullet}</li>
                        ))}
                      </ul>
                      <p className="outro">
                        Thank you for treating our dresses with love and care. We hope you feel beautiful and confident in your chosen silhouette. Until your next special occasion!
                      </p>
                      <div className="sign-off">With love, Gigi&apos;s Rentals</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}