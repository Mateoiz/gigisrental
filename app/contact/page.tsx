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
            {/* Left Side: Visuals (Google Maps & Street View) */}
            <div className="contact-visuals">
              
              {/* Standard Map View */}
              <div className="visual-card map-card">
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

              {/* Street View of the Building */}
{/* Photo of the Building */}
              <div className="visual-card street-card">
                <img 
                  src="/studio.jpg" 
                  alt="Gigi's Closet Building Front" 
                  className="building-photo"
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

              {/* Socials Card */}
              <div className="info-card">
                <h4>
                  <span className="glyph">♡</span> Follow Us
                </h4>
                <div className="contact-socials">
                  <a href="https://www.facebook.com/profile.php?id=61592240190387" target="_blank" rel="noopener noreferrer" className="social-link">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.51 1.49-3.9 3.77-3.9 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.78-1.63 1.57v1.88h2.78l-.44 2.91h-2.34V22c4.78-.76 8.44-4.92 8.44-9.94z"/></svg>
                    Facebook
                  </a>
                  <a href="https://www.instagram.com/gigisrental/" target="_blank" rel="noopener noreferrer" className="social-link">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2c2.72 0 3.06.01 4.12.06 1.06.05 1.79.22 2.43.47.66.26 1.21.6 1.76 1.15.55.55.89 1.1 1.15 1.76.25.64.42 1.37.47 2.43.05 1.06.06 1.4.06 4.12s-.01 3.06-.06 4.12c-.05 1.06-.22 1.79-.47 2.43a4.9 4.9 0 0 1-1.15 1.76 4.9 4.9 0 0 1-1.76 1.15c-.64.25-1.37.42-2.43.47-1.06.05-1.4.06-4.12.06s-3.06-.01-4.12-.06c-1.06-.05-1.79-.22-2.43-.47a4.9 4.9 0 0 1-1.76-1.15 4.9 4.9 0 0 1-1.15-1.76c-.25-.64-.42-1.37-.47-2.43C2.01 15.06 2 14.72 2 12s.01-3.06.06-4.12c.05-1.06.22-1.79.47-2.43.26-.66.6-1.21 1.15-1.76A4.9 4.9 0 0 1 5.45.54C6.09.29 6.82.12 7.88.07 8.94.02 9.28.01 12 .01zm0 1.8c-2.67 0-2.99.01-4.04.06-.97.04-1.5.21-1.85.34-.46.18-.79.4-1.14.75-.35.35-.57.68-.75 1.14-.13.35-.3.88-.34 1.85-.05 1.05-.06 1.37-.06 4.04s.01 2.99.06 4.04c.04.97.21 1.5.34 1.85.18.46.4.79.75 1.14.35.35.68.57 1.14.75.35.13.88.3 1.85.34 1.05.05 1.37.06 4.04.06s2.99-.01 4.04-.06c.97-.04 1.5-.21 1.85-.34.46-.18.79-.4 1.14-.75.35-.35.57-.68.75-1.14.13-.35.3-.88.34-1.85.05-1.05.06-1.37.06-4.04s-.01-2.99-.06-4.04c-.04-.97-.21-1.5-.34-1.85a3.1 3.1 0 0 0-.75-1.14 3.1 3.1 0 0 0-1.14-.75c-.35-.13-.88-.3-1.85-.34-1.05-.05-1.37-.06-4.04-.06zM12 6.87A5.13 5.13 0 1 1 12 17.13 5.13 5.13 0 0 1 12 6.87zm0 1.8a3.33 3.33 0 1 0 0 6.66 3.33 3.33 0 0 0 0-6.66zm5.34-1.98a1.2 1.2 0 1 1-2.4 0 1.2 1.2 0 0 1 2.4 0z"/></svg>
                    Instagram
                  </a>
                  <a href="https://www.tiktok.com/@gigisrental" target="_blank" rel="noopener noreferrer" className="social-link">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M16.6 5.82c-.7-.76-1.09-1.75-1.09-2.82h-3.15v13.4a2.6 2.6 0 1 1-1.87-2.5V10.7a5.75 5.75 0 1 0 5.02 5.7V9.4a7.13 7.13 0 0 0 4.15 1.33V7.6a4.7 4.7 0 0 1-3.06-1.78z"/></svg>
                    TikTok
                  </a>
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
}

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
  gap: 28px;
}
.visual-card {
  background: var(--card);
  padding: 8px;
  border-radius: 12px;
  border: 1px solid rgba(169, 100, 124, 0.25);
  box-shadow: var(--shadow-sm);
  transition: transform 0.4s var(--ease-pop), box-shadow 0.4s ease;
  width: 100%;
  aspect-ratio: 16 / 11; /* Wider so both fit cleanly on screen */
}

/* Polaroids layout */
.map-card {
  transform: rotate(-1.5deg);
}
.street-card {
  transform: rotate(1.5deg);
}
.visual-card:hover {
  transform: translateY(-5px) rotate(0deg);
  box-shadow: 0 12px 24px -8px rgba(169, 100, 124, 0.25);
  z-index: 10;
}
.google-map-iframe,
.building-photo {
  width: 100%;
  height: 100%;
  border-radius: 6px;
  background-color: #FBF9F6;
  display: block;
  object-fit: cover;
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

/* Social Links */
.contact-socials {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 4px;
}
.social-link {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  color: var(--mocha);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s ease, transform 0.2s ease;
}
.social-link:hover {
  color: var(--rose-deep);
  transform: translateX(4px);
}

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
  .street-card { transform: rotate(1deg); }
}
`