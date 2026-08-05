'use client'

import Navbar from '@/app/components/Navbar'
import Footer from '@/app/components/Footer'
import CoquetteBow from '@/app/components/CoquetteBow'
import Link from 'next/link'

export default function ContactPage() {
  return (
    <div className="page-wrapper">
      <style dangerouslySetInnerHTML={{ __html: CONTACT_STYLES }} />
      <Navbar />

      <section className="contact-section">
        <div className="wrap">
          <header className="contact-header">
            <span className="eyebrow-pill">
              <CoquetteBow width={18} height={12} style={{ color: 'var(--rose-deep)' }} />
              Visit Us
            </span>
            <h1 className="contact-heading">Studio Location</h1>
            <p className="contact-lead">
              Our private showroom is ready to welcome you. Please ensure you have a confirmed appointment before visiting.
            </p>
          </header>

          <div className="contact-grid">
            {/* Left Side: Visuals */}
{/* Left Side: Visuals (Google Maps Embed) */}
            <div className="contact-visuals">
<div className="visual-card">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3865.1505809490595!2d120.92926087573852!3d14.36069618290398!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397d50917ac212f%3A0x836d3ac3d9a0610f!2sGigi&#39;s%20Closet!5e0!3m2!1sen!2sph!4v1785931100490!5m2!1sen!2sph" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen={false} 
                  loading="lazy" 
                  referrerPolicy="strict-origin-when-cross-origin"
                  className="google-map-iframe"
                  title="Gigi's Closet Location"
                />
              </div>
            </div>

            {/* Right Side: Information Blocks */}
            <div className="contact-info-list">
              <div className="info-card">
                <h4>
                  <span className="glyph">♡</span> Pin Location
                </h4>
                <p className="highlight-text">Gigi&apos;s Closet</p>
                <p>Golden City, B39 L5 P3 Antimony,<br />Anabu II-F, Imus, 4103 Cavite</p>
              </div>

              <div className="info-card">
                <h4>
                  <span className="glyph">♡</span> Get in Touch
                </h4>
                <div className="contact-details">
                  <span><strong>Contact Person:</strong> AE</span>
                  <span><strong>Number:</strong> 09393217582</span>
                </div>
              </div>

              <div className="info-card">
                <h4>
                  <span className="glyph">♡</span> Courier Pick-up
                </h4>
                <p>
                  Please message us before booking any courier service (Lalamove/ Grab) 
                  so we can prepare your order for pick-up.
                </p>
              </div>

              <div className="info-card appointment-card">
                <h4>
                  <span className="glyph">♡</span> Studio Fitting
                </h4>
                <p>
                  Studio fittings are by appointment only. Kindly book your appointment 
                  before visiting our studio.
                </p>
                <Link href="/booking" className="btn btn-primary">
                  Book an Appointment
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

const CONTACT_STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Jost:wght@300;400;500;600&display=swap');

:root {
  --porcelain: #FFFBF7;
  --card: #FFFFFF;
  --rose: #D48B9D;
  --rose-deep: #A9647C;
  --mocha: #3D2C2E;
  --mocha-soft: #8C666B;
  --blush-ribbon: #FDF2F5;
  --tulle-dot: rgba(169, 100, 124, 0.12);
  
  --shadow-xs: 0 1px 2px rgba(61, 44, 46, .06), 0 2px 6px -2px rgba(169, 100, 124, .15);
  --shadow-sm: 0 4px 12px -2px rgba(169, 100, 124, .18);
  --ease-pop: cubic-bezier(0.34, 1.56, 0.64, 1);

.page-wrapper {
  background-color: var(--porcelain);
  background-image: var(--grid-pattern);
  background-size: 40px 40px;
  background-position: center top;
  color: var(--mocha);
  font-family: 'Jost', sans-serif;
  font-weight: 300;
  line-height: 1.65;
  min-height: 100vh;
}

/* Paper Grain Overlay */
.page-wrapper::after {
  content: ''; position: fixed; inset: 0; z-index: 99999; pointer-events: none;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.045'/%3E%3C/svg%3E");
  mix-blend-mode: multiply;
}

.wrap { width: 100%; max-width: 1080px; margin: 0 auto; padding: 0 clamp(20px, 5vw, 48px); }

/* --- Header --- */
.contact-section { padding: 140px 0 clamp(80px, 10vw, 120px); position: relative; }
.contact-header { display: flex; flex-direction: column; align-items: center; text-align: center; gap: 14px; margin-bottom: clamp(40px, 6vw, 70px); }

.eyebrow-pill {
  display: inline-flex; align-items: center; gap: 10px;
  padding: 6px 16px;
  background: #E6EDD3;
  border-radius: 2px 12px 4px 8px;
  font-size: .75rem; font-weight: 600; letter-spacing: .12em; text-transform: uppercase;
  color: var(--mocha);
  transform: rotate(-2deg);
  box-shadow: 2px 2px 0 rgba(61, 44, 46, 0.08);
}
.contact-heading { 
  font-family: 'Cormorant Garamond', serif; 
  font-weight: 500; 
  font-size: clamp(3rem, 6vw, 4.5rem); 
  color: var(--rose-deep);
  position: relative;
  z-index: 1;
}
.contact-lead { color: var(--mocha-soft); font-size: clamp(1.05rem, 1.5vw, 1.2rem); max-width: 540px; }

/* --- Layout Grid --- */
.contact-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: clamp(40px, 5vw, 60px);
  align-items: start;
}

/* --- Visuals --- */
.contact-visuals {
  position: sticky;
  top: 120px;
  display: flex;
  flex-direction: column;
}
.visual-card {
  background: var(--card);
  padding: 8px;
  border-radius: 12px;
  border: 1px solid rgba(169, 100, 124, 0.25);
  box-shadow: var(--shadow-sm);
  transform: rotate(-1.5deg);
  transition: transform 0.4s var(--ease-pop), box-shadow 0.4s ease;
  width: 100%;
  aspect-ratio: 4 / 4; /* Keeps the map perfectly square and prominent */
}
.visual-card:hover {
  transform: translateY(-5px) rotate(0deg);
  box-shadow: 0 12px 24px -8px rgba(169, 100, 124, 0.25);
  z-index: 10;
}
.google-map-iframe {
  width: 100%;
  height: 100%;
  border-radius: 6px;
  background-color: #FBF9F6;
  display: block; /* Removes the tiny gap under the iframe */
}


/* --- Info Cards --- */
.contact-info-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.info-card {
  background: var(--card);
  border: 1px solid rgba(169,100,124,.3);
  border-radius: 16px;
  padding: clamp(24px, 3vw, 32px);
  box-shadow: var(--shadow-xs);
  transition: transform 0.3s var(--ease-pop), border-color 0.3s ease, box-shadow 0.3s ease;
  position: relative;
  overflow: hidden;
}
.info-card::before {
  content: ''; position: absolute; inset: 0; pointer-events: none;
  background-image: var(--tulle-pattern); background-size: 20px 20px; opacity: 0.3; z-index: 0;
}
.info-card:hover {
  transform: translateY(-4px);
  border-color: var(--rose-deep);
  box-shadow: var(--shadow-sm);
}
.info-card > * { position: relative; z-index: 1; }

.info-card h4 {
  font-family: 'Jost', sans-serif;
  font-size: 0.85rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase;
  color: var(--rose-deep);
  margin-bottom: 12px;
  display: flex; align-items: center; gap: 8px;
}
.info-card p { color: var(--mocha); font-size: 1rem; line-height: 1.6; margin-bottom: 4px; }
.highlight-text { 
  font-family: 'Cormorant Garamond', serif; 
  font-size: 1.8rem !important; 
  font-weight: 600; 
  font-style: italic; 
  color: var(--mocha); 
}
.contact-details { display: flex; flex-direction: column; gap: 6px; color: var(--mocha); }
.contact-details strong { font-weight: 500; color: var(--rose-deep); margin-right: 4px; }

.appointment-card {
  background: var(--blush-ribbon);
  border-color: var(--rose);
}
.appointment-card p { color: var(--mocha-soft); margin-bottom: 24px; }

/* Buttons */
.btn {
  font-family: 'Jost', sans-serif;
  display: inline-flex; align-items: center; justify-content: center; gap: 10px;
  padding: 14px 32px; border-radius: 999px; border: none;
  font-size: .8rem; font-weight: 500; letter-spacing: .12em; text-transform: uppercase;
  cursor: pointer; transition: all .25s ease;
  text-decoration: none;
}
.btn-primary { background: var(--mocha); color: #fff; box-shadow: 0 4px 12px rgba(61,44,46,.15); }
.btn-primary:hover { background: var(--rose-deep); transform: translateY(-2px); box-shadow: 0 6px 16px rgba(169,100,124,.3); }

/* --- Responsive --- */
@media (max-width: 900px) {
  .contact-grid { grid-template-columns: 1fr; gap: 48px; }
  .contact-visuals { position: relative; top: 0; }
}
@media (max-width: 600px) {
  .contact-section { padding-top: 110px; }
  .visual-card { aspect-ratio: 4 / 3; transform: rotate(-1deg); }
}
`