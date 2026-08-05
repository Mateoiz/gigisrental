'use client'

import React, { useState } from 'react'
import Link from 'next/link'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (!res.ok) throw new Error('Subscription failed')
      setSubscribed(true)
      setEmail('')
    } catch {
      setError('Something went wrong — please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400..700;1,400..700&family=Jost:wght@300;400;500;600&family=Parisienne&display=swap');

        :root {
          --espresso: #2A1D1F;
          --espresso-light: #3D2C2E;
          --cream: #FFFDF9;
          --rose: #D48B9D;
          --rose-soft: #F7C8D8;
          --line-dark: rgba(247, 200, 216, 0.15);
        }

        .footer-wrapper {
          background-color: var(--espresso);
          color: var(--cream);
          font-family: 'Jost', sans-serif;
          padding: 80px 0 60px 0;
          position: relative;
          overflow: hidden;
          border-top: 1px solid var(--line-dark);
        }

        .footer-content {
          width: 100%;
          max-width: 1920px;
          margin: 0 auto;
          padding: 0 clamp(24px, 5vw, 80px);
        }

        /* --- TOP GRID: 3 Navigation Columns + 1 Newsletter Placard --- */
        .footer-grid {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr 1.6fr;
          gap: clamp(24px, 4vw, 60px);
          margin-bottom: 60px;
          align-items: start;
        }

        .nav-col h4 {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.3rem;
          font-style: italic;
          color: var(--rose-soft);
          margin-bottom: 20px;
          font-weight: 500;
          letter-spacing: 0.02em;
        }

        .nav-col ul {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .nav-col a {
          color: var(--cream);
          text-decoration: none;
          font-size: 0.88rem;
          font-weight: 300;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          transition: color 0.2s ease, transform 0.2s ease;
          display: inline-block;
        }

        .nav-col a:hover {
          color: var(--rose);
          transform: translateX(4px);
        }

        /* --- THE STUDIO DISPATCH (Museum Placard Newsletter Box) --- */
        .dispatch-card {
          background: rgba(255, 253, 249, 0.03);
          border: 1px solid var(--line-dark);
          padding: 32px;
          border-radius: 16px;
          position: relative;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
        }

        .dispatch-card::after {
          content: '';
          position: absolute;
          inset: 8px;
          border: 1px solid rgba(247, 200, 216, 0.08);
          border-radius: 10px;
          pointer-events: none;
        }

        .dispatch-card h3 {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.8rem;
          font-style: italic;
          color: var(--cream);
          margin-bottom: 8px;
          font-weight: 500;
        }

        .dispatch-card p {
          font-size: 0.85rem;
          color: rgba(255, 253, 249, 0.7);
          line-height: 1.6;
          margin-bottom: 24px;
          font-weight: 300;
        }

        .dispatch-form {
          display: flex;
          flex-direction: column;
          gap: 12px;
          position: relative;
          z-index: 2;
        }

        .dispatch-input {
          background: rgba(0, 0, 0, 0.25);
          border: 1px solid var(--line-dark);
          padding: 14px 18px;
          border-radius: 8px;
          color: var(--cream);
          font-family: 'Jost', sans-serif;
          font-size: 0.85rem;
          outline: none;
          transition: border-color 0.2s;
        }

        .dispatch-input::placeholder {
          color: rgba(255, 253, 249, 0.35);
        }

        .dispatch-input:focus {
          border-color: var(--rose);
        }

        .dispatch-btn {
          background: var(--cream);
          color: var(--espresso);
          border: none;
          padding: 14px;
          border-radius: 8px;
          font-family: 'Jost', sans-serif;
          font-size: 0.8rem;
          font-weight: 600;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.25s ease;
        }

        .dispatch-btn:hover {
          background: var(--rose-soft);
          color: var(--espresso);
          transform: translateY(-2px);
        }

        {/* --- PROMINENT SOCIAL EMPHASIS SECTION --- */}
        .social-emphasis-section {
          margin: 60px 0 40px 0;
          padding: 32px;
          background: rgba(255, 253, 249, 0.02);
          border: 1px solid var(--line-dark);
          border-radius: 14px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 20px;
        }

        .social-emphasis-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.4rem;
          font-style: italic;
          font-weight: 500;
          color: var(--rose-soft);
          letter-spacing: 0.04em;
        }

        .social-emphasis-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          flex-wrap: wrap;
        }

        .social-pill {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 12px 24px;
          background: rgba(255, 253, 249, 0.05);
          border: 1px solid var(--line-dark);
          border-radius: 999px;
          color: var(--cream);
          text-decoration: none;
          font-size: 0.8rem;
          font-weight: 400;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          transition: all 0.3s ease;
        }

        .social-pill:hover {
          background: var(--rose);
          border-color: var(--rose);
          color: var(--espresso);
          transform: translateY(-3px);
          box-shadow: 0 8px 20px rgba(212, 139, 157, 0.25);
        }

        /* --- MIDDLE META BAR --- */
        .meta-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 30px;
          padding-bottom: 40px;
          border-top: 1px solid var(--line-dark);
          font-size: 0.8rem;
          color: rgba(255, 253, 249, 0.5);
          letter-spacing: 0.05em;
          flex-wrap: wrap;
          gap: 16px;
        }

        /* --- OVERSIZED BOTTOM WORDMARK --- */
        .giant-wordmark-container {
          width: 100%;
          padding: 30px 0 clamp(40px, 5vw, 90px) 0; 
          user-select: none;
          display: flex;
          justify-content: center;
          align-items: baseline;
          line-height: 1;
        }

        .giant-wordmark {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(3.5rem, 14.5vw, 18rem);
          font-weight: 600;
          font-style: italic;
          letter-spacing: -0.02em;
          white-space: nowrap;
          text-transform: lowercase;
        }

        .giant-wordmark .solid-text {
          color: var(--cream);
        }

        .giant-wordmark .hollow-text {
          color: transparent;
          -webkit-text-stroke: clamp(1px, 0.2vw, 2.5px) var(--rose);
          margin-left: 1vw;
        }

        @media (max-width: 1024px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr;
          }
          .dispatch-card {
            grid-column: span 2;
            margin-top: 20px;
          }
        }

        @media (max-width: 600px) {
          .footer-grid {
            grid-template-columns: 1fr;
            gap: 32px;
          }
          .dispatch-card {
            grid-column: span 1;
          }
          .meta-bar {
            flex-direction: column;
            text-align: center;
          }
          .giant-wordmark {
            font-size: 14.5vw;
          }
          .footer-wrapper {
            padding: 60px 0 40px 0;
          }
          .social-emphasis-row {
            flex-direction: column;
            width: 100%;
          }
          .social-pill {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>

      <footer className="footer-wrapper">
        <div className="footer-content">
          
          {/* --- TOP SECTION: Navigation Columns + Studio Dispatch Card --- */}
          <div className="footer-grid">
            
            {/* Column 1 */}
            <div className="nav-col">
              <h4>The Showroom</h4>
              <ul>
                <li><Link href="/collections">Full Collection</Link></li>
                <li><Link href="/#collection">Featured Pieces</Link></li>
                <li><Link href="/about">Our Story</Link></li>
              </ul>
            </div>

            {/* Column 2 */}
            <div className="nav-col">
              <h4>Client Care</h4>
              <ul>
                <li><Link href="/contact">Book a Fitting</Link></li>
                <li><Link href="/guidelines#how">How to Rent</Link></li>
                <li><Link href="/guidelines#terms">Studio Guidelines</Link></li>
                <li><Link href="/guidelines#reminder">Garment Care</Link></li>
              </ul>
            </div>

            {/* Column 3 */}
            <div className="nav-col">
              <h4>The Studio</h4>
              <ul>
                <li><Link href="/about">Our Philosophy</Link></li>
                <li><Link href="/contact">Location &amp; Hours</Link></li>
                <li><Link href="/guidelines#appointment">Booking Etiquette</Link></li>
                <li><Link href="/contact">Inquiries</Link></li>
              </ul>
            </div>

            {/* Column 4: Museum Placard Newsletter Box */}
            <div className="dispatch-card">
              <h3>The Studio Dispatch</h3>
              <p>
                Receive private invitations to seasonal wardrobe previews, archive releases, and studio styling notes.
              </p>
              
              {subscribed ? (
                <div style={{ 
                  padding: '16px', 
                  background: 'rgba(212, 139, 157, 0.15)', 
                  border: '1px solid var(--rose)', 
                  borderRadius: '8px',
                  color: 'var(--cream)',
                  fontSize: '0.85rem',
                  textAlign: 'center',
                  fontStyle: 'italic'
                }}>
                  Thank you. You have been added to our private dispatch list.
                </div>
              ) : (
                <form className="dispatch-form" onSubmit={handleSubscribe}>
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address..."
                    className="dispatch-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <button type="submit" className="dispatch-btn">
                    Join the Archive —
                  </button>
                </form>
              )}
            </div>

          </div>

          {/* --- PROMINENT SOCIAL EMPHASIS SECTION --- */}
          <div className="social-emphasis-section">
            <p className="social-emphasis-title">Follow the Atelier &amp; Archive</p>
            <div className="social-emphasis-row">
              <a 
                href="https://www.facebook.com/profile.php?id=61592240190387"
                target="_blank"
                rel="noopener noreferrer"
                className="social-pill"
                aria-label="Gigi's Rentals on Facebook"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.51 1.49-3.9 3.77-3.9 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.78-1.63 1.57v1.88h2.78l-.44 2.91h-2.34V22c4.78-.76 8.44-4.92 8.44-9.94z"/></svg>
                <span>Facebook</span>
              </a>
              <a 
                href="https://www.instagram.com/gigisrental/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-pill"
                aria-label="Gigi's Rentals on Instagram"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2c2.72 0 3.06.01 4.12.06 1.06.05 1.79.22 2.43.47.66.26 1.21.6 1.76 1.15.55.55.89 1.1 1.15 1.76.25.64.42 1.37.47 2.43.05 1.06.06 1.4.06 4.12s-.01 3.06-.06 4.12c-.05 1.06-.22 1.79-.47 2.43a4.9 4.9 0 0 1-1.15 1.76 4.9 4.9 0 0 1-1.76 1.15c-.64.25-1.37.42-2.43.47-1.06.05-1.4.06-4.12.06s-3.06-.01-4.12-.06c-1.06-.05-1.79-.22-2.43-.47a4.9 4.9 0 0 1-1.76-1.15 4.9 4.9 0 0 1-1.15-1.76c-.25-.64-.42-1.37-.47-2.43C2.01 15.06 2 14.72 2 12s.01-3.06.06-4.12c.05-1.06.22-1.79.47-2.43.26-.66.6-1.21 1.15-1.76A4.9 4.9 0 0 1 5.45.54C6.09.29 6.82.12 7.88.07 8.94.02 9.28.01 12 .01zm0 1.8c-2.67 0-2.99.01-4.04.06-.97.04-1.5.21-1.85.34-.46.18-.79.4-1.14.75-.35.35-.57.68-.75 1.14-.13.35-.3.88-.34 1.85-.05 1.05-.06 1.37-.06 4.04s.01 2.99.06 4.04c.04.97.21 1.5.34 1.85.18.46.4.79.75 1.14.35.35.68.57 1.14.75.35.13.88.3 1.85.34 1.05.05 1.37.06 4.04.06s2.99-.01 4.04-.06c.97-.04 1.5-.21 1.85-.34.46-.18.79-.4 1.14-.75.35-.35.57-.68.75-1.14.13-.35.3-.88.34-1.85.05-1.05.06-1.37.06-4.04s-.01-2.99-.06-4.04c-.04-.97-.21-1.5-.34-1.85a3.1 3.1 0 0 0-.75-1.14 3.1 3.1 0 0 0-1.14-.75c-.35-.13-.88-.3-1.85-.34-1.05-.05-1.37-.06-4.04-.06zM12 6.87A5.13 5.13 0 1 1 12 17.13 5.13 5.13 0 0 1 12 6.87zm0 1.8a3.33 3.33 0 1 0 0 6.66 3.33 3.33 0 0 0 0-6.66zm5.34-1.98a1.2 1.2 0 1 1-2.4 0 1.2 1.2 0 0 1 2.4 0z"/></svg>
                <span>Instagram</span>
              </a>
              <a 
                href="https://www.tiktok.com/@gigisrental"
                target="_blank"
                rel="noopener noreferrer"
                className="social-pill"
                aria-label="Gigi's Rentals on TikTok"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M16.6 5.82c-.7-.76-1.09-1.75-1.09-2.82h-3.15v13.4a2.6 2.6 0 1 1-1.87-2.5V10.7a5.75 5.75 0 1 0 5.02 5.7V9.4a7.13 7.13 0 0 0 4.15 1.33V7.6a4.7 4.7 0 0 1-3.06-1.78z"/></svg>
                <span>TikTok</span>
              </a>
            </div>
          </div>

          {/* --- MIDDLE META BAR --- */}
          <div className="meta-bar">
            <div>© 2026 Gigi&apos;s Rentals LLC. All wardrobe rights reserved.</div>
            <div>Privacy Policy · Terms of Service</div>
          </div>

        </div>

        {/* --- OVERSIZED BOTTOM WORDMARK --- */}
        <div className="giant-wordmark-container" aria-hidden="true">
          <div className="giant-wordmark">
            <span className="solid-text">gigi&apos;s</span>
            <span className="hollow-text">rentals</span>
          </div>
        </div>
      </footer>
    </>
  )
}