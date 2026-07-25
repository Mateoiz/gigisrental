'use client'

import React from 'react'
import Link from 'next/link'

const FB_URL = 'https://www.facebook.com/profile.php?id=61592240190387'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = React.useState(false)
  const [isHidden, setIsHidden] = React.useState(false)
  const [menuOpen, setMenuOpen] = React.useState(false)
  
  // Ref to keep track of the last scroll position without re-triggering renders
  const lastScrollY = React.useRef(0)

  React.useEffect(() => {
    const onScroll = () => {
      const currentScrollY = window.scrollY

      // 1. Handle transparency state (are we at the very top / y-0?)
      setIsScrolled(currentScrollY > 20)

      // 2. Handle disappear/reappear behavior based on scroll direction
      if (currentScrollY > lastScrollY.current && currentScrollY > 120) {
        // Scrolling DOWN & past the 120px threshold -> Hide Navbar
        setIsHidden(true)
      } else if (currentScrollY < lastScrollY.current) {
        // Scrolling UP -> Reveal Navbar
        setIsHidden(false)
      }

      lastScrollY.current = currentScrollY
    }

    // Set initial scroll state
    onScroll()
    
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  React.useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  return (
    <>
      <style>{`
        .site-header {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 99999;
          /* Smoothly animate both the vertical slide (disappear) and background transparency */
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), 
                      background 0.3s ease, 
                      box-shadow 0.3s ease, 
                      backdrop-filter 0.3s ease, 
                      border-color 0.3s ease;
        }
        .top-lace-border {
          width: 100%;
          height: 4px;
          background: linear-gradient(90deg, var(--rose, #D48B9D) 0%, #E8C4CE 50%, var(--rose, #D48B9D) 100%);
          transition: opacity .3s ease;
        }
        nav .full-wrap {
          width: 100%;
          max-width: 1600px;
          margin: 0 auto;
          padding: 0 clamp(24px, 5vw, 64px);
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 84px;
        }
        .logo {
          display: flex;
          align-items: center;
          text-decoration: none;
          transition: transform .3s cubic-bezier(0.34, 1.56, 0.64, 1);
          z-index: 10;
        }
        .logo:hover, .logo:active { transform: scale(1.04); }
        .logo img {
          height: 56px;
          width: auto;
          object-fit: contain;
        }
        
        /* --- GROUPED RIGHT NAVIGATION --- */
        .nav-right {
          display: flex;
          align-items: center;
          gap: clamp(28px, 3.5vw, 48px);
        }
        .nav-links {
          display: flex;
          align-items: center;
          gap: clamp(24px, 2.8vw, 38px);
          font-size: .92rem;
          font-weight: 400;
          letter-spacing: .08em;
          text-transform: uppercase;
        }
        .nav-links a {
          text-decoration: none;
          color: var(--mocha, #3D2C2E);
          transition: color .2s ease;
          position: relative;
        }
        .nav-links a:hover {
          color: var(--rose-deep, #A9647C);
        }
        
        /* Subtle underline hover effect */
        .nav-links a::after {
          content: '';
          position: absolute;
          width: 0;
          height: 1px;
          bottom: -4px;
          left: 0;
          background-color: var(--rose-deep, #A9647C);
          transition: width .25s ease;
        }
        .nav-links a:hover::after {
          width: 100%;
        }

        .nav-cta {
          background: rgba(255, 255, 255, 0.65);
          backdrop-filter: blur(4px);
          color: var(--rose-deep, #A9647C);
          border: 1.5px solid var(--rose, #D48B9D);
          padding: 12px 32px;
          border-radius: 999px;
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-size: 1.15rem;
          font-weight: 600;
          letter-spacing: .02em;
          text-transform: none;
          text-decoration: none;
          transition: all .25s cubic-bezier(0.34, 1.56, 0.64, 1);
          white-space: nowrap;
        }
        .nav-cta:hover {
          background: var(--rose-deep, #A9647C);
          color: #fff;
          border-color: var(--rose-deep, #A9647C);
          transform: translateY(-2px);
          box-shadow: 0 8px 20px -6px rgba(184, 107, 125, 0.45);
        }
        
        .nav-burger {
          display: none;
          background: none;
          border: none;
          padding: 10px;
          margin: -10px;
          cursor: pointer;
          color: var(--mocha, #3D2C2E);
          z-index: 10;
        }
        .nav-burger svg { display: block; width: 26px; height: 26px; }

        /* --- MOBILE MENU --- */
        .mobile-menu {
          position: fixed;
          inset: 0;
          background: #FFFDF9;
          z-index: 99998;
          display: flex;
          flex-direction: column;
          padding: 110px clamp(28px, 6vw, 56px) 40px;
          gap: 6px;
          transform: translateY(-16px);
          opacity: 0;
          pointer-events: none;
          transition: opacity .3s ease, transform .3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .mobile-menu.open {
          opacity: 1;
          transform: translateY(0);
          pointer-events: auto;
        }
        .mobile-menu a {
          text-decoration: none;
          color: var(--mocha, #3D2C2E);
          font-family: 'Cormorant Garamond', serif;
          font-size: 2rem;
          font-style: italic;
          padding: 16px 4px;
          border-bottom: 1px solid var(--line, #F2E6E8);
          min-height: 48px;
          display: flex;
          align-items: center;
          transition: color .2s ease;
        }
        .mobile-menu a:active, .mobile-menu a:hover { color: var(--rose-deep, #A9647C); }
        .mobile-menu .nav-cta {
          margin-top: 32px;
          justify-content: center;
          display: flex;
          text-align: center;
          font-size: 1.4rem;
          padding: 16px 32px;
        }

        @media (max-width: 960px) {
          .nav-right { display: none; }
          .nav-burger { display: flex; align-items: center; justify-content: center; }
          .logo img { height: 46px; }
          nav .full-wrap { height: 72px; }
        }
      `}</style>

      <header
        className="site-header"
        style={{
          /* 1. DISAPPEAR EFFECT: Slides up (-100%) when scrolling down, unless mobile menu is open */
          transform: isHidden && !menuOpen ? 'translateY(-100%)' : 'translateY(0)',
          
          /* 2. BACKGROUND: Transparent glassmorphism (0.70 opacity) when scrolled, solid background (#FFFDF9) at y-0! */
          background: isScrolled ? 'rgba(255, 253, 249, 0.70)' : '#FFFDF9',
          backdropFilter: isScrolled ? 'blur(16px)' : 'none',
          WebkitBackdropFilter: isScrolled ? 'blur(16px)' : 'none',
          
          boxShadow: isScrolled ? '0 4px 24px -8px rgba(61, 44, 46, 0.08)' : 'none',
          borderBottom: isScrolled ? '1px solid rgba(242, 230, 232, 0.6)' : '1px solid transparent',
        }}
      >
        <div className="top-lace-border" style={{ opacity: isScrolled ? 1 : 0 }} />
        <nav>
          <div className="full-wrap">
            <Link href="/" className="logo" onClick={() => setMenuOpen(false)}>
              <img src="/logo/5.png" alt="Gigi's Rentals" />
            </Link>

            <div className="nav-right">
              <div className="nav-links">
                <Link href="/about">About Us</Link>
                <Link href="/#terms">Guidelines</Link>
                <Link href="/size-guide">Size Guide</Link>
              </div>

              <Link
                href={FB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="nav-cta"
              >
                Rent a Dress
              </Link>
            </div>

            <button
              className="nav-burger"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
            >
              {menuOpen ? (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                  <path d="M5 5l14 14M19 5L5 19" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                  <path d="M3.5 6.5h17M3.5 12h17M3.5 17.5h17" />
                </svg>
              )}
            </button>
          </div>
        </nav>
      </header>

      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        <Link href="/about" onClick={() => setMenuOpen(false)}>About Us</Link>
        <Link href="/#terms" onClick={() => setMenuOpen(false)}>Guidelines</Link>
        <Link href="/size-guide" onClick={() => setMenuOpen(false)}>Size Guide</Link>
        <Link
          href={FB_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="nav-cta"
          onClick={() => setMenuOpen(false)}
        >
          Rent a Dress
        </Link>
      </div>
    </>
  )
}