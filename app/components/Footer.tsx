'use client'

import React, { useState } from 'react'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail('')
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
          padding: 80px 0 60px 0; /* Added generous 60px bottom cushion */
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
          margin-bottom: 80px;
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

        /* --- MIDDLE META BAR --- */
        .meta-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-bottom: 40px;
          border-bottom: 1px solid var(--line-dark);
          font-size: 0.8rem;
          color: rgba(255, 253, 249, 0.5);
          letter-spacing: 0.05em;
          flex-wrap: wrap;
          gap: 16px;
        }

/* --- OVERSIZED BOTTOM WORDMARK --- */
        .giant-wordmark-container {
          width: 100%;
          /* Use scalable padding (5vw) so the cushion grows as the font grows */
          padding: 30px 0 clamp(40px, 5vw, 90px) 0; 
          user-select: none;
          display: flex;
          justify-content: center;
          align-items: baseline;
          line-height: 1; /* Restored to natural height to protect descenders */
          /* REMOVED: overflow: hidden; (This was slicing the loops off!) */
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
                <li><a href="#gallery">Wardrobe Edit</a></li>
                <li><a href="#gallery">New Arrivals</a></li>
                <li><a href="#gallery">Silk Gowns</a></li>
                <li><a href="#gallery">Studio Décor</a></li>
              </ul>
            </div>

            {/* Column 2 */}
            <div className="nav-col">
              <h4>Client Care</h4>
              <ul>
                <li><a href="#book">Private Fittings</a></li>
                <li><a href="#how">How to Rent</a></li>
                <li><a href="#terms">Studio Guidelines</a></li>
                <li><a href="#terms">Garment Care</a></li>
              </ul>
            </div>

            {/* Column 3 */}
            <div className="nav-col">
              <h4>The Studio</h4>
              <ul>
                <li><a href="#">Our Philosophy</a></li>
                <li><a href="#">Location &amp; Hours</a></li>
                <li><a href="#">Styling Advisory</a></li>
                <li><a href="#">Inquiries</a></li>
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

          {/* --- MIDDLE META BAR --- */}
          <div className="meta-bar">
            <div>© 2026 Gigi&apos;s Rentals LLC. All wardrobe rights reserved.</div>
            <div></div>
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