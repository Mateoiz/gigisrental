'use client'

import React from 'react'

const SPLASH_KEY = 'gigis-splash-last-shown'
const SPLASH_WINDOW_MS = 5 * 60 * 1000

export default function SplashScreen() {
  const [visible, setVisible] = React.useState(false)
  const [exiting, setExiting] = React.useState(false)
  const [checked, setChecked] = React.useState(false)

  React.useEffect(() => {
    try {
      const last = localStorage.getItem(SPLASH_KEY)
      const now = Date.now()
      if (!last || now - parseInt(last, 10) > SPLASH_WINDOW_MS) {
        setVisible(true)
        localStorage.setItem(SPLASH_KEY, String(now))
        document.body.style.overflow = 'hidden'
      }
    } catch {
    } finally {
      setChecked(true)
    }
  }, [])

  React.useEffect(() => {
    if (!visible) return
    const exitTimer = setTimeout(() => setExiting(true), 1900)
    const removeTimer = setTimeout(() => {
      setVisible(false)
      document.body.style.overflow = ''
    }, 2500)
    return () => {
      clearTimeout(exitTimer)
      clearTimeout(removeTimer)
    }
  }, [visible])

  if (!checked || !visible) return null

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Parisienne&family=Cormorant+Garamond:ital,wght@1,500&display=swap');

        .gg-splash {
          position: fixed;
          inset: 0;
          z-index: 999999;
          background: #FFFBF7;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: opacity .6s ease, visibility .6s ease;
        }
        .gg-splash.exiting {
          opacity: 0;
          pointer-events: none;
        }
        .gg-splash-mark {
          width: min(280px, 60vw);
          animation: gg-splash-pop 1.1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .gg-splash-tagline {
          position: absolute;
          bottom: 14%;
          left: 50%;
          transform: translateX(-50%);
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-size: clamp(1rem, 2vw, 1.3rem);
          color: #B86B7D;
          opacity: 0;
          white-space: nowrap;
          animation: gg-splash-fade-in .8s ease forwards;
          animation-delay: 1s;
        }
        @keyframes gg-splash-pop {
          0% { opacity: 0; transform: scale(0.75) rotate(-4deg); }
          55% { opacity: 1; transform: scale(1.05) rotate(1deg); }
          100% { opacity: 1; transform: scale(1) rotate(0deg); }
        }
        @keyframes gg-splash-fade-in {
          from { opacity: 0; transform: translate(-50%, 8px); }
          to { opacity: 1; transform: translate(-50%, 0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .gg-splash-mark, .gg-splash-tagline { animation: none !important; opacity: 1 !important; }
        }
      `}</style>

      <div className={`gg-splash ${exiting ? 'exiting' : ''}`} role="presentation" aria-hidden="true">
        <img src="/logo/1.png" alt="" className="gg-splash-mark" />
        <span className="gg-splash-tagline">reimagined with grace.</span>
      </div>
    </>
  )
}