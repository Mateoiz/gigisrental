'use client'

import React from 'react'
import Link from 'next/link'

export default function Navbar() {
  return (
    <>
      <style>{`
        /* Master Sticky Header — Immovable ceiling that prevents all overflow */
        .site-header {
          position: sticky;
          top: 0;
          z-index: 99999;
          background: #FFFDF9; /* Solid cream base prevents scrolling text from bleeding through */
          width: 100%;
          box-shadow: 0 4px 20px -8px rgba(61, 44, 46, 0.06);
        }
        .top-lace-border {
          width: 100%;
          height: 6px;
          background: linear-gradient(90deg, var(--rose, #D48B9D) 0%, #E8C4CE 50%, var(--rose, #D48B9D) 100%);
        }
        nav {
          background: rgba(255, 253, 249, 0.94);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border-bottom: 1px solid var(--line, #F2E6E8);
        }
        /* Self-contained so it never breaks on product pages! */
        nav .full-wrap {
          width: 100%;
          max-width: 1920px;
          margin: 0 auto;
          padding: 0 clamp(24px, 5vw, 80px);
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 84px;
        }
        .logo {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-size: 2.1rem;
          font-weight: 600;
          letter-spacing: .02em;
          text-decoration: none;
          color: var(--mocha, #3D2C2E);
        }
        .logo span {
          color: var(--rose-deep, #A9647C);
          font-weight: 400;
        }
        .nav-links {
          display: flex;
          gap: 40px;
          font-size: .95rem;
          font-weight: 400;
          letter-spacing: .06em;
          text-transform: uppercase;
        }
        .nav-links a {
          position: relative;
          padding-bottom: 4px;
          text-decoration: none;
          color: var(--mocha, #3D2C2E);
          transition: color .2s;
        }
        .nav-links a:hover {
          color: var(--rose-deep, #A9647C);
        }
        .nav-cta {
          background: transparent;
          color: var(--rose-deep, #A9647C);
          border: 1px solid var(--rose, #D48B9D);
          padding: 10px 26px;
          border-radius: 999px;
          font-size: .8rem;
          font-weight: 500;
          letter-spacing: .08em;
          text-transform: uppercase;
          text-decoration: none;
          transition: all .25s ease;
        }
        .nav-cta:hover {
          background: var(--rose-deep, #A9647C);
          color: #fff;
          border-color: var(--rose-deep, #A9647C);
          transform: translateY(-1px);
        }
        @media (max-width: 1024px) {
          .nav-links { display: none; }
        }
      `}</style>

      <header className="site-header">
        <div className="top-lace-border" />
        <nav>
          <div className="full-wrap">
            <Link href="/" className="logo">
              gigi&apos;s <span>rentals</span>
            </Link>
            <div className="nav-links">
              <Link href="/#gallery">Wardrobe Edit</Link>
              <Link href="/#how">How to Rent</Link>
              <Link href="/#terms">Studio Guidelines</Link>
            </div>
            <Link href="/#book" className="nav-cta">
              Book an Appointment
            </Link>
          </div>
        </nav>
      </header>
    </>
  )
}