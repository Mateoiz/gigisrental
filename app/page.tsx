'use client'

import { useState } from 'react'
import Link from 'next/link'
import Navbar from '@/app/components/Navbar'
import Footer from '@/app/components/Footer'

interface StepItem {
  num: string
  title: string
  desc: string
}

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

export default function RulesPage() {
  const [activeTab, setActiveTab] = useState<'appointment' | 'how' | 'terms' | 'reminder'>('appointment')

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
          min-height: calc(75vh - 84px);
          display: flex;
          align-items: center; 
          position: relative; 
          padding: 40px 0 60px;
          text-align: center;
        }
        .hero .full-wrap { 
          max-width: 900px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .hero h1 { 
          font-size: clamp(3.2rem, 6.5vw, 5.8rem); 
          font-style: italic; 
          letter-spacing: -0.01em; 
          margin-bottom: 20px; 
          font-weight: 500; 
        }
        .hero h1 em { color: var(--rose-deep); font-style: italic; font-weight: 600; }
        .hero p.lead { 
          font-size: clamp(1.1rem, 1.5vw, 1.35rem); 
          color: var(--mocha-soft); 
          max-width: 640px; 
          margin-bottom: 36px; 
          font-weight: 300; 
          line-height: 1.7; 
        }

        /* --- DUAL-ROW DRIFTING MARQUEE --- */
        .dual-marquee {
          width: 100%;
          background: var(--mocha);
          overflow: hidden;
          position: relative;
          padding: 0;
          margin-bottom: 80px;
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
        .dual-word.serif-reg { font-style: normal; color: var(--blush-ribbon); }
        .dual-word.serif-ital { font-style: italic; color: var(--rose); font-size: clamp(0.9rem, 1.2vw, 1.1rem); font-weight: 400; }
        .dual-sep {
          display: inline-block; width: 3px; height: 3px; border-radius: 50%;
          background: rgba(212, 139, 157, 0.5); flex-shrink: 0;
        }

        /* --- STATIONERY FOLDER (COQUETTE FOLDER STYLE) --- */
        .stationery-section {
          padding: 0 0 120px;
          background: var(--porcelain);
        }
        .stationery-container {
          max-width: 1080px;
          margin: 0 auto;
          position: relative;
        }
        
        .folder-tabs {
          display: flex;
          justify-content: flex-start;
          gap: 6px;
          padding: 0 16px;
          position: relative;
          z-index: 2;
          flex-wrap: wrap;
        }
        @media (min-width: 768px) {
          .folder-tabs { justify-content: flex-end; }
        }

        .folder-tab {
          background: #EFE4E6;
          border: 1px solid rgba(212, 139, 157, 0.3);
          border-bottom: none;
          padding: 12px 24px;
          border-radius: 14px 14px 0 0;
          font-family: 'Jost', sans-serif;
          font-size: .8rem;
          font-weight: 500;
          letter-spacing: .12em;
          text-transform: uppercase;
          color: var(--mocha-soft);
          cursor: pointer;
          transition: all 0.25s ease;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .folder-tab:hover { background: #F7EDE8; color: var(--mocha); }
        .folder-tab.active {
          background: #F7C8D8;
          color: var(--mocha);
          font-weight: 600;
          padding-bottom: 14px;
          margin-bottom: -2px;
          border-color: var(--rose);
          box-shadow: 0 -4px 12px rgba(169, 100, 124, 0.08);
        }
        .folder-tab span.num {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-size: 1.1rem;
          color: var(--rose-deep);
          font-weight: 600;
        }

        .folder-body {
          background: #FDF4F6;
          border: 1px solid var(--rose);
          border-radius: 0 24px 24px 24px;
          padding: clamp(32px, 5vw, 64px);
          box-shadow: 0 20px 50px -10px rgba(61, 44, 46, 0.08);
          position: relative;
          z-index: 1;
          overflow: hidden;
        }
        @media (min-width: 768px) {
          .folder-body { border-radius: 24px 0 24px 24px; }
        }

        .folder-watermark {
          position: absolute;
          bottom: 20px;
          right: 20px;
          width: 180px;
          height: 180px;
          border-radius: 50%;
          background: rgba(212, 139, 157, 0.12);
          border: 2px solid rgba(212, 139, 157, 0.25);
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: none;
          user-select: none;
          z-index: 0;
        }
        .folder-watermark span {
          font-family: 'Parisienne', cursive;
          font-size: 4.5rem;
          color: rgba(169, 100, 124, 0.18);
        }

        .stationery-header {
          text-align: center;
          margin-bottom: 48px;
          position: relative;
          z-index: 2;
        }
        .stationery-header h3 {
          font-family: 'Parisienne', cursive;
          font-size: clamp(2.6rem, 4.5vw, 3.8rem);
          color: var(--rose-deep);
          margin-bottom: 4px;
        }
        .stationery-header p {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-size: 1.25rem;
          color: var(--mocha-soft);
          letter-spacing: .04em;
        }

        .stationery-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 28px;
          position: relative;
          z-index: 2;
        }
        .stationery-item {
          background: rgba(255, 253, 249, 0.75);
          border: 1px solid rgba(242, 230, 232, 0.8);
          padding: 24px;
          border-radius: 18px;
          transition: transform 0.2s ease, border-color 0.2s ease;
        }
        .stationery-item:hover {
          transform: translateY(-3px);
          border-color: var(--rose);
        }
        .stationery-item .step-num {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-size: 1.8rem;
          font-weight: 600;
          color: var(--rose-deep);
          display: block;
          margin-bottom: 6px;
        }
        .stationery-item h4 {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.3rem;
          font-weight: 600;
          margin-bottom: 8px;
          color: var(--mocha);
        }
        .stationery-item p {
          font-size: .9rem;
          color: var(--mocha-soft);
          line-height: 1.6;
        }

        .stationery-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 20px;
          position: relative;
          z-index: 2;
        }
        .stationery-list li {
          background: rgba(255, 253, 249, 0.75);
          border: 1px solid rgba(242, 230, 232, 0.8);
          padding: 20px 24px;
          border-radius: 16px;
        }
        .stationery-list h4 {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--rose-deep);
          margin-bottom: 6px;
        }
        .stationery-list p {
          font-size: .92rem;
          color: var(--mocha-soft);
          line-height: 1.6;
        }

        .stationery-prose {
          max-width: 800px;
          margin: 0 auto;
          text-align: center;
          position: relative;
          z-index: 2;
        }
        .stationery-prose p.intro {
          font-size: 1.05rem;
          color: var(--mocha);
          line-height: 1.8;
          margin-bottom: 32px;
          font-weight: 400;
        }
        .stationery-prose ul {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 16px;
          text-align: left;
          margin-bottom: 40px;
        }
        .stationery-prose li {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          font-size: .95rem;
          color: var(--mocha-soft);
          line-height: 1.6;
          background: rgba(255, 253, 249, 0.75);
          padding: 16px 20px;
          border-radius: 12px;
          border: 1px solid rgba(242, 230, 232, 0.8);
        }
        .stationery-prose li::before {
          content: '✦';
          color: var(--rose-deep);
          font-size: 0.8rem;
          margin-top: 3px;
        }
        .stationery-prose .outro {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-size: 1.4rem;
          color: var(--mocha);
          margin-bottom: 8px;
        }
        .stationery-prose .sign-off {
          font-family: 'Parisienne', cursive;
          font-size: 2.2rem;
          color: var(--rose-deep);
        }

        @media (max-width: 1024px) {
          .hero .full-wrap { padding-top: 10px; }
          .hero p.lead { margin-left: auto; margin-right: auto; }
        }
      `}</style>

      <Navbar />

      {/* --- HERO SECTION (RULES FOCUS) --- */}
      <section className="hero">
        <div className="full-wrap">
          <span className="eyebrow">studio policies</span>
          <h1>
            Rules &amp; <em>Guidelines</em>
          </h1>
          <p className="lead">
            Everything you need to know about our fitting appointments, rental policies, and garment care instructions. Please review our studio standards prior to your visit.
          </p>
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

      {/* --- INTERACTIVE STATIONERY FOLDER SECTION --- */}
      <section className="stationery-section">
        <div className="full-wrap">
          <div className="stationery-container">
            
            {/* Folder Tabs matching reference graphic */}
            <div className="folder-tabs" role="tablist" aria-label="Studio Rules and Guidelines">
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === 'appointment'}
                onClick={() => setActiveTab('appointment')}
                className={`folder-tab ${activeTab === 'appointment' ? 'active' : ''}`}
              >
                <span className="num">01</span> Appointment
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === 'how'}
                onClick={() => setActiveTab('how')}
                className={`folder-tab ${activeTab === 'how' ? 'active' : ''}`}
              >
                <span className="num">02</span> How to Rent
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === 'terms'}
                onClick={() => setActiveTab('terms')}
                className={`folder-tab ${activeTab === 'terms' ? 'active' : ''}`}
              >
                <span className="num">03</span> Terms
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === 'reminder'}
                onClick={() => setActiveTab('reminder')}
                className={`folder-tab ${activeTab === 'reminder' ? 'active' : ''}`}
              >
                <span className="num">04</span> Reminder
              </button>
            </div>

            {/* Folder Body Card */}
            <div className="folder-body">
              <div className="folder-watermark">
                <span>GR</span>
              </div>

              {/* TAB 01: FITTING APPOINTMENT */}
              {activeTab === 'appointment' && (
                <div role="tabpanel">
                  <div className="stationery-header">
                    <h3>Fitting Appointment</h3>
                    <p>Everything You Need to Know</p>
                  </div>
                  <div className="stationery-grid">
                    {FITTING_STEPS.map((step) => (
                      <div key={step.num} className="stationery-item">
                        <span className="step-num">{step.num}</span>
                        <h4>{step.title}</h4>
                        <p>{step.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 02: HOW TO RENT */}
              {activeTab === 'how' && (
                <div role="tabpanel">
                  <div className="stationery-header">
                    <h3>How to Rent</h3>
                    <p>Everything You Need to Know</p>
                  </div>
                  <div className="stationery-grid">
                    {HOW_TO_RENT_STEPS.map((step) => (
                      <div key={step.num} className="stationery-item">
                        <span className="step-num">{step.num}</span>
                        <h4>{step.title}</h4>
                        <p>{step.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 03: TERMS & CONDITIONS */}
              {activeTab === 'terms' && (
                <div role="tabpanel">
                  <div className="stationery-header">
                    <h3>Terms &amp; Conditions</h3>
                    <p>Please take a moment to read our rental guidelines.</p>
                  </div>
                  <ul className="stationery-list">
                    {TERMS_CONDITIONS.map((term, idx) => (
                      <li key={idx}>
                        <h4>{term.title}</h4>
                        <p>{term.desc}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* TAB 04: FRIENDLY REMINDER */}
              {activeTab === 'reminder' && (
                <div role="tabpanel">
                  <div className="stationery-header">
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
                      Thank you for treating our dresses with love and care. We hope you feel beautiful and confident in your chosen dress. Until your next special occasion!
                    </p>
                    <div className="sign-off">With love, Gigi&apos;s Rentals</div>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      </section>

      {/* --- EXTRACTED FOOTER COMPONENT --- */}
      <Footer />
    </>
  )
}