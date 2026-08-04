'use client'

import { useRef, useState, useEffect, type KeyboardEvent } from 'react'
import Footer from '@/app/components/Footer'
import CoquetteBow from '@/app/components/CoquetteBow'
import Link from 'next/link'
import { TABS, TAB_DATA, TabKey, TabContentData, StepItem } from '@/data/rulesData'
import { DRESSES } from '@/data/dresses'

/* -------------------------------------------------------------------------- */
/*  Panel layouts — one component per content shape in TAB_DATA               */
/* -------------------------------------------------------------------------- */

function PanelHeader({ data }: { data: TabContentData }) {
  return (
    <header className="panel-header">
      {/* Increased bow size to balance the larger text */}
      <CoquetteBow width={64} height={42} style={{ color: data.bowColor }} />
      <h3>{data.title}</h3>
      <p>{data.subtitle}</p>
    </header>
  )
}

function GridPanel({ items }: { items: StepItem[] }) {
  return (
    <div className="panel-grid">
      {items.map((step) => (
        <div key={step.num} className="panel-card">
          <span className="panel-card-num">
            {step.num} <span className="glyph">♡</span>
          </span>
          <h4>{step.title}</h4>
          <p>{step.desc}</p>
        </div>
      ))}
    </div>
  )
}

function ListPanel({ items }: { items: StepItem[] }) {
  return (
    <ul className="panel-list">
      {items.map((term) => (
        <li key={term.title}>
          <h4>
            <span className="glyph">❀</span> {term.title}
          </h4>
          <p>{term.desc}</p>
        </li>
      ))}
    </ul>
  )
}

function ProsePanel({ data }: { data: Extract<TabContentData, { type: 'prose' }> }) {
  return (
    <div className="panel-prose">
      <p className="prose-intro">{data.intro}</p>
      <ul>
        {data.items.map((line) => (
          <li key={line}>{line}</li>
        ))}
      </ul>
      <p className="prose-outro">{data.outro}</p>
      <p className="prose-signoff">{data.signOff}</p>
    </div>
  )
}

function TabPanel({ data }: { data: TabContentData }) {
  return (
    <>
      <PanelHeader data={data} />
      {data.type === 'grid' && <GridPanel items={data.items} />}
      {data.type === 'list' && <ListPanel items={data.items} />}
      {data.type === 'prose' && <ProsePanel data={data} />}
    </>
  )
}

/* -------------------------------------------------------------------------- */
/*  Hero - Split into Splash Image & Scroll-Revealed Content                  */
/* -------------------------------------------------------------------------- */

function Hero({ onExploreRules, onExploreEtiquette }: { onExploreRules: () => void; onExploreEtiquette: () => void }) {
  const [isVisible, setIsVisible] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.15 } 
    )

    if (contentRef.current) {
      observer.observe(contentRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <>
      <section className="hero-splash">
        <div className="hero-photo" aria-hidden="true" />
        
        {/* Floating Coquette Sparkles */}
        <div className="sparkle-container" aria-hidden="true">
          <span className="sparkle s1">✦</span>
          <span className="sparkle s2">✧</span>
          <span className="sparkle s3">✦</span>
          <span className="sparkle s4">✧</span>
        </div>

{/* High-End Dropping Line Scroll Indicator */}
        <button 
          type="button" 
          className="scroll-indicator" 
          onClick={() => document.getElementById('discover')?.scrollIntoView({ behavior: 'smooth' })}
          aria-label="Scroll down to discover"
        >
          <span className="scroll-text">Scroll to Discover</span>
          <div className="scroll-line"></div>
        </button>
      </section>

      <section className="hero-info-wrapper" id="discover">
        <div 
          ref={contentRef} 
          className={`hero-content ${isVisible ? 'pop-up-visible' : 'pop-up-hidden'}`}
        >
          <span className="eyebrow-pill">
            <CoquetteBow width={20} height={13} style={{ color: 'var(--rose-deep)' }} />
            Because every girl deserves her dream dress
          </span>

          <span className="wordmark">Gigi&apos;s Rentals</span>
          <span className="wordmark-rule" aria-hidden="true" />

          <p className="hero-lead">
            Every celebration deserves a dress that leaves a lasting impression. At Gigi&apos;s
            Rentals, we combine timeless style with exceptional service, ensuring you find a
            piece that makes every occasion feel truly extraordinary.
          </p>

          <div className="hero-cta-row">
            <button type="button" className="btn btn-primary" onClick={onExploreRules}>
              Explore studio rules
            </button>
            <button type="button" className="btn btn-ghost" onClick={onExploreEtiquette}>
              Rental etiquette
            </button>
          </div>

          <div className="trust-row">
            <span><span className="glyph">♡</span> Bespoke fitted only</span>
            <span><span className="glyph">♡</span> Private showroom</span>
            <span><span className="glyph">♡</span> Steamed &amp; dry cleaned</span>
          </div>
        </div>
      </section>
    </>
  )
}
function AboutSection() {
  return (
    <section className="about-section" id="about">
      <div className="wrap about-wrap">
        <span className="eyebrow-pill">
          <CoquetteBow width={18} height={12} style={{ color: 'var(--rose-deep)' }} />
          Our Story
        </span>
        <h2 className="about-heading">Made For Your Moment</h2>
        <p className="about-lead">
          Gigi&apos;s Rentals began with a simple belief: every woman deserves to feel
          beautiful without the burden of owning a dress she&apos;ll wear once. What
          started as a small personal collection has grown into a curated studio of
          modern Vietnamese-inspired silhouettes, chosen and cared for with the same
          love you&apos;d give your own closet.
        </p>
        <div className="about-values">
          <div className="about-value">
            <span className="glyph">♡</span>
            <h4>Crafted with Care</h4>
            <p>Every piece is steamed, inspected, and prepared as if it were for our own family.</p>
          </div>
          <div className="about-value">
            <span className="glyph">♡</span>
            <h4>Fit For You</h4>
            <p>Private fittings mean you leave confident, not just booked.</p>
          </div>
          <div className="about-value">
            <span className="glyph">♡</span>
            <h4>Built on Trust</h4>
            <p>Clear terms, honest pricing, and a studio that treats every client like a friend.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

/* -------------------------------------------------------------------------- */
/*  Featured collection preview                                               */
/* -------------------------------------------------------------------------- */


function CollectionPreview() {
  return (
    <section className="collection-section" id="collection">
      <div className="wrap">
        <header className="collection-header">
          <span className="eyebrow-pill">
            <CoquetteBow width={18} height={12} style={{ color: 'var(--rose-deep)' }} />
            The Collection
          </span>
          <h2 className="about-heading">A Few of Our Favorites</h2>
          <p className="about-lead collection-lead">
            A small peek at what&apos;s waiting for you in studio — every piece
            available to try on by appointment.
          </p>
        </header>

<div className="collection-grid">
          {DRESSES.slice(0, 4).map((dress) => (
            <Link key={dress.name} href={`/collections/${dress.slug}`} className="collection-card">
              <div className="collection-card-photo-wrap">
                <div
                  className="collection-card-photo collection-card-photo-base"
                  style={{ backgroundImage: `url('${dress.image}')` }}
                />
                <div
                  className="collection-card-photo collection-card-photo-hover"
                  style={{ backgroundImage: `url('${dress.hoverImage}')` }}
                />
                <span className="collection-card-view">
                  <CoquetteBow width={14} height={9} style={{ color: 'var(--rose-deep)' }} />
                  View the piece
                </span>
              </div>
<div className="collection-card-info">
                <span className="collection-card-name">{dress.name}</span>
                <span className="collection-card-rule" aria-hidden="true" />
              </div>
            </Link>
          ))}
        </div>

        <div className="collection-cta">
          <Link href="/collections" className="btn btn-ghost">
            View Full Collection
          </Link>
        </div>
      </div>
    </section>
  )
}
/* -------------------------------------------------------------------------- */
/*  Guidelines folder (tabs + expandable panel)                               */
/* -------------------------------------------------------------------------- */

function GuidelinesFolder({
  activeTab,
  isOpen,
  onSelectTab,
  onOpen,
  onClose,
}: {
  activeTab: TabKey
  isOpen: boolean
  onSelectTab: (key: TabKey) => void
  onOpen: () => void
  onClose: () => void
}) {
  const tabRefs = useRef<Partial<Record<TabKey, HTMLButtonElement | null>>>({})

  const handleTabKeyDown = (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (!['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(e.key)) return
    e.preventDefault()
    const nextIndex =
      e.key === 'ArrowRight' ? (index + 1) % TABS.length
      : e.key === 'ArrowLeft' ? (index - 1 + TABS.length) % TABS.length
      : e.key === 'Home' ? 0
      : TABS.length - 1
    const nextKey = TABS[nextIndex].key
    onSelectTab(nextKey)
    tabRefs.current[nextKey]?.focus()
  }

  const currentData = TAB_DATA[activeTab]

  return (
    <div className="folder">
      <div className="folder-tabs" role="tablist" aria-label="Studio rules and guidelines">
        {TABS.map((tab, index) => (
          <button
            key={tab.key}
            ref={(el) => { tabRefs.current[tab.key] = el }}
            type="button"
            role="tab"
            id={`tab-${tab.key}`}
            aria-selected={activeTab === tab.key}
            aria-controls={`panel-${tab.key}`}
            tabIndex={activeTab === tab.key ? 0 : -1}
            onClick={() => { onSelectTab(tab.key); onOpen() }}
            onKeyDown={(e) => handleTabKeyDown(e, index)}
            className={`folder-tab ${activeTab === tab.key ? 'active' : ''}`}
            style={{
              '--tab-accent': `var(--accent-${tab.key})`,
              zIndex: activeTab === tab.key ? 10 : TABS.length - index,
            } as React.CSSProperties}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className={`folder-stack ${isOpen ? 'is-open' : 'is-closed'}`}>
{!isOpen && (
          <button
            type="button"
            className="folder-closed"
            onClick={onOpen}
            style={{ '--tab-accent': `var(--accent-${activeTab})` } as React.CSSProperties}
          >
            <CoquetteBow width={26} height={17} style={{ color: 'var(--tab-accent)' }} />
            <span className="folder-closed-text">
              <strong>{currentData.title}</strong>
              <em>Tap to view {currentData.subtitle.toLowerCase()}</em>
            </span>
            <svg className="folder-closed-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>
        )}

        <div className="folder-body" style={{ '--tab-accent': `var(--accent-${activeTab})` } as React.CSSProperties}>
          <div className="folder-watermark" aria-hidden="true"><span>GR</span></div>

          {isOpen && (
            <button type="button" className="folder-close" onClick={onClose} aria-label="Close guidelines">
              Close
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          )}

          <div
            role="tabpanel"
            id={`panel-${activeTab}`}
            aria-labelledby={`tab-${activeTab}`}
            tabIndex={0}
          >
            <TabPanel data={currentData} />
          </div>
        </div>
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*  Page                                                                      */
/* -------------------------------------------------------------------------- */

export default function RulesPage() {
  const [activeTab, setActiveTab] = useState<TabKey>('terms')
  const [isFolderOpen, setIsFolderOpen] = useState(false)

  const goToGuidelines = (tab: TabKey) => {
    setActiveTab(tab)
    setIsFolderOpen(true)
    document.getElementById('guidelines')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <>
      <style>{PAGE_STYLES}</style>

<Hero
        onExploreRules={() => goToGuidelines('terms')}
        onExploreEtiquette={() => goToGuidelines('how')}
      />

<AboutSection />

      <div className="section-divider" aria-hidden="true">
        <span className="section-divider-line" />
        <CoquetteBow width={20} height={13} style={{ color: 'var(--rose-deep)' }} />
        <span className="section-divider-line" />
      </div>

      <CollectionPreview />

      <div className="section-divider" aria-hidden="true">
        <span className="section-divider-line" />
        <CoquetteBow width={20} height={13} style={{ color: 'var(--rose-deep)' }} />
        <span className="section-divider-line" />
      </div>

      <section className="guidelines-section" id="guidelines">
        <div className="wrap">
          <GuidelinesFolder
            activeTab={activeTab}
            isOpen={isFolderOpen}
            onSelectTab={setActiveTab}
            onOpen={() => setIsFolderOpen(true)}
            onClose={() => setIsFolderOpen(false)}
          />
        </div>
      </section>

      <Footer />
    </>
  )
}

/* -------------------------------------------------------------------------- */
/*  Styles                                                                    */
/* -------------------------------------------------------------------------- */

const PAGE_STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&family=Jost:wght@300;400;500;600&family=Parisienne&display=swap');

@font-face {
  font-family: 'Kapakana';
  src: url('/fonts/Kapakana-VariableFont_wght.ttf') format('truetype-variations');
  font-weight: 100 900;
  font-style: normal;
  font-display: swap;
}

:root {
  --porcelain: #FFFDF9;
  --card: #FFFFFF;
  --rose: #D48B9D;
  --rose-deep: #A9647C;
  --mocha: #3D2C2E;
  --mocha-soft: #8C666B;
  --ink-body: #6B484D;
  --blush-ribbon: #FDF2F5;
  --tulle-dot: rgba(169, 100, 124, 0.12);
  --stitch: rgba(169, 100, 124, 0.35);

  --shadow-xs: 0 1px 2px rgba(61, 44, 46, .06), 0 2px 6px -2px rgba(169, 100, 124, .15);
  --shadow-sm: 0 2px 4px rgba(61, 44, 46, .07), 0 8px 20px -8px rgba(169, 100, 124, .22);
  --shadow-md: 0 4px 8px rgba(61, 44, 46, .08), 0 16px 36px -12px rgba(169, 100, 124, .28);

  --accent-appointment: #C77B8E;
  --accent-how: #A9647C;
  --accent-terms: #8E4F63;
  --accent-reminder: #D391A6;

  --radius-lg: 24px;
  --ease-pop: cubic-bezier(0.34, 1.56, 0.64, 1);
  --nav-h: 92px;
}

*, *::before, *::after { box-sizing: border-box; }
.hero-splash *, .hero-info-wrapper *, .guidelines-section *, .folder *, .about-section *, .collection-section * { margin: 0; padding: 0; }

/* --- QoL Enhancements: Smooth scroll, Custom scrollbar, Custom selection --- */
html { scroll-behavior: smooth; }
::selection { background: var(--rose-deep); color: #FFFDF9; }
::-webkit-scrollbar { width: 10px; }
::-webkit-scrollbar-track { background: var(--porcelain); }
::-webkit-scrollbar-thumb { background: var(--rose); border-radius: 10px; border: 2px solid var(--porcelain); }
::-webkit-scrollbar-thumb:hover { background: var(--rose-deep); }

body {
  background-color: var(--porcelain);
  color: var(--mocha);
  font-family: 'Jost', sans-serif;
  font-weight: 300;
  line-height: 1.65;
  -webkit-font-smoothing: antialiased;
  overflow-x: hidden;
}

/* --- QoL Enhancements: Editorial Paper Grain/Texture across the entire site --- */
body::after {
  content: '';
  position: fixed;
  inset: 0;
  z-index: 99999;
  pointer-events: none; /* Ensures you can still click things underneath it */
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E");
}
h1, h2, h3 { font-family: 'Cormorant Garamond', serif; font-weight: 500; line-height: 1.08; color: var(--mocha); }
a { color: inherit; text-decoration: none; }
.glyph { color: var(--tab-accent, var(--rose-deep)); }

.wrap { width: 100%; max-width: 1080px; margin: 0 auto; padding: 0 clamp(20px, 5vw, 48px); }

/* ---- buttons ---- */
.btn {
  font-family: 'Jost', sans-serif;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 14px 32px;
  border-radius: 999px;
  border: none;
  font-size: .8rem;
  font-weight: 500;
  letter-spacing: .12em;
  text-transform: uppercase;
  cursor: pointer;
  transition: background .25s ease, box-shadow .25s ease, color .25s ease, transform .25s var(--ease-pop);
}
.btn:hover { transform: translateY(-1px); }
.btn:focus-visible { outline: 2px solid var(--rose-deep); outline-offset: 3px; }
.btn-primary { background: var(--mocha); color: #fff; box-shadow: 0 3px 6px rgba(61,44,46,.25), 0 14px 28px -8px rgba(61,44,46,.35); }
.btn-primary:hover { background: var(--rose-deep); box-shadow: 0 4px 10px rgba(61,44,46,.2), 0 20px 38px -8px rgba(169,100,124,.55); }
.btn-ghost { border: 1px dashed var(--rose-deep); color: var(--mocha); background: rgba(255,255,255,.75); backdrop-filter: blur(6px); box-shadow: var(--shadow-xs); }
.btn-ghost:hover { background: var(--blush-ribbon); border-style: solid; color: var(--rose-deep); box-shadow: var(--shadow-sm); }

/* ---- hero: splash & info ---- */
.hero-splash {
  position: relative;
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding-bottom: 60px;
  overflow: hidden;
}
.hero-photo {
  position: absolute; 
  inset: 0;
  /* Added a rich, warm mocha gradient shade so text and sparkles pop beautifully */
  background-image: linear-gradient(180deg, rgba(61, 44, 46, 0.15) 0%, rgba(61, 44, 46, 0.75) 100%), url('/logo/6.jpg');
  background-size: cover;
  background-position: center;
  z-index: -1;
  background-attachment: fixed; 
}
/* Floating Sparkle Animations */
.sparkle-container {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
}
.sparkle {
  position: absolute;
  color: #FFF;
  text-shadow: 0 0 12px rgba(255, 255, 255, 0.8);
  animation: float 6s ease-in-out infinite alternate;
}
.s1 { top: 25%; left: 15%; font-size: 1.8rem; animation-delay: 0s; opacity: 0.6; }
.s2 { top: 60%; left: 85%; font-size: 1.2rem; animation-delay: -2s; opacity: 0.5; }
.s3 { top: 35%; left: 75%; font-size: 2.2rem; animation-delay: -4s; opacity: 0.7; }
.s4 { top: 70%; left: 20%; font-size: 1.5rem; animation-delay: -1s; opacity: 0.4; }

@keyframes float {
  0% { transform: translateY(0) scale(1) rotate(0deg); opacity: 0.2; }
  100% { transform: translateY(-25px) scale(1.15) rotate(10deg); opacity: 0.9; }
}

/* Luxury Drop-Line Indicator */
.scroll-indicator {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  z-index: 2;
  opacity: 0;
  animation: fadeIn 2s ease-out 1s forwards;
  background: transparent;
  border: none;
  cursor: pointer;
  outline: none;
}
.scroll-indicator:focus-visible .scroll-text {
  outline: 2px solid var(--rose);
  outline-offset: 4px;
  border-radius: 4px;
}
.scroll-text {
  color: #fff;
  text-shadow: 0 2px 4px rgba(0,0,0,0.4);
  font-size: 0.75rem;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  font-weight: 500;
}
.scroll-line {
  width: 1px;
  height: 60px;
  background: rgba(255, 255, 255, 0.2);
  position: relative;
  overflow: hidden;
}
.scroll-line::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 50%;
  background: #fff;
  animation: scrollDrop 2s cubic-bezier(0.77, 0, 0.175, 1) infinite;
}

@keyframes scrollDrop {
  0% { transform: translateY(-100%); }
  100% { transform: translateY(200%); }
}
@keyframes fadeIn {
  to { opacity: 1; }
}

.hero-info-wrapper {
  background: var(--porcelain);
  padding: clamp(64px, 8vw, 100px) 20px;
  display: flex;
  justify-content: center;
  position: relative;
  z-index: 5;
  box-shadow: 0 -20px 40px rgba(61,44,46,0.05); 
}

.hero-content { 
  max-width: 720px; 
  display: flex; 
  flex-direction: column; 
  align-items: center; 
  text-align: center;
  gap: 22px; 
}

/* Pop-Up Animation Classes */
.pop-up-hidden {
  opacity: 0;
  transform: translateY(40px);
}
.pop-up-visible {
  opacity: 1;
  transform: translateY(0);
  transition: opacity 0.8s ease-out, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}

.eyebrow-pill {
  display: inline-flex; align-items: center; gap: 10px;
  padding: 8px 22px; border-radius: 999px;
  border: 1px dashed var(--rose);
  background: rgba(255,255,255,.9);
  font-size: .72rem; font-weight: 500; letter-spacing: .14em; text-transform: uppercase;
  color: var(--rose-deep);
}

.hero-lead {
  font-size: clamp(1rem, 1.5vw, 1.15rem);
  color: var(--mocha-soft);
  line-height: 1.75;
  max-width: 560px;
}
.hero-cta-row { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; margin-top: 8px; }
.trust-row { display: flex; gap: clamp(16px, 3vw, 32px); justify-content: center; flex-wrap: wrap; font-size: .8rem; color: var(--mocha-soft); margin-top: 12px; }
.trust-row span { display: inline-flex; align-items: center; gap: 6px; }

/* ---- wordmark ---- */
.wordmark {
  font-family: 'Parisienne', cursive;
  font-size: clamp(4rem, 10vw, 7rem);
  line-height: 1;
  color: var(--rose-deep);
  text-shadow: 0 2px 10px rgba(169, 100, 124, .15);
}
.wordmark-rule {
  margin-top: 4px;
  width: 120px;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--rose), transparent);
}
/* ---- section dividers ---- */
.section-divider {
  display: flex; align-items: center; justify-content: center; gap: 18px;
  max-width: 400px; margin: 0 auto; padding: 0 20px;
}
.section-divider-line {
  flex: 1; height: 1px;
  background: linear-gradient(90deg, transparent, var(--rose), transparent);
}

/* ---- about section ---- */
.about-section { padding: clamp(60px, 8vw, 110px) 0; background: linear-gradient(180deg, var(--porcelain) 0%, #FFF8F3 100%); }
.about-wrap { display: flex; flex-direction: column; align-items: center; text-align: center; gap: 18px; max-width: 760px; }
.about-heading { font-size: clamp(2.2rem, 4.5vw, 3.2rem); color: var(--mocha); }
.about-lead { font-size: clamp(1rem, 1.5vw, 1.1rem); color: var(--mocha-soft); line-height: 1.8; max-width: 620px; }
.about-values { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: clamp(20px, 3vw, 32px); width: 100%; margin-top: clamp(24px, 3vw, 36px); }
.about-value { display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 20px; }
.about-value .glyph { font-size: 1.3rem; }
.about-value h4 { font-family: 'Cormorant Garamond', serif; font-size: 1.15rem; font-weight: 600; color: var(--mocha); }
.about-value p { font-size: .88rem; color: var(--mocha-soft); line-height: 1.6; }

/* ---- collection preview ---- */
.collection-section { padding: clamp(60px, 8vw, 110px) 0; background: #FFF8F3; }
.collection-cta { display: flex; justify-content: center; margin-top: clamp(36px, 4vw, 52px); }
.collection-header { display: flex; flex-direction: column; align-items: center; text-align: center; gap: 14px; margin-bottom: clamp(32px, 4vw, 48px); }
.collection-lead { max-width: 520px; }
.collection-grid { 
  display: grid; 
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); 
  gap: clamp(18px, 2.5vw, 26px); 
}
.collection-card {
  display: flex; flex-direction: column;
  border-radius: 4px; /* Sharper editorial edges */
  overflow: hidden;
  background: transparent;
  transition: transform .3s var(--ease-pop);
}
.collection-card:hover { transform: translateY(-6px); }
.collection-card-photo-wrap {
  position: relative;
  aspect-ratio: 3 / 4;
  overflow: hidden;
  background-color: #FBF9F6;
  border-radius: 2px;
  border: 1px solid transparent;
  transition: border-color .3s ease;
}
.collection-card:hover .collection-card-photo-wrap {
  border-color: var(--rose-deep);
}
.collection-card-photo {
  position: absolute; inset: 0;
  background-size: cover;
  background-position: center;
  transition: opacity .45s ease, transform .45s var(--ease-pop);
}
.collection-card-photo-base { opacity: 1; z-index: 1; }
.collection-card-photo-hover { opacity: 0; z-index: 2; transform: scale(1.04); }
.collection-card:hover .collection-card-photo-base { opacity: 0; }
.collection-card:hover .collection-card-photo-hover { opacity: 1; transform: scale(1); }
.collection-card-view {
  position: absolute; left: 50%; bottom: 14px; z-index: 3;
  transform: translate(-50%, 10px);
  display: inline-flex; align-items: center; gap: 6px;
  background: rgba(255,255,255,.92); backdrop-filter: blur(4px);
  border: 1px solid var(--rose-deep); border-radius: 999px;
  padding: 6px 16px;
  font-size: .7rem; font-weight: 500; letter-spacing: .08em; text-transform: uppercase;
  color: var(--rose-deep);
  opacity: 0;
  transition: opacity .3s ease, transform .3s var(--ease-pop);
  white-space: nowrap;
}
.collection-card:hover .collection-card-view { opacity: 1; transform: translate(-50%, 0); }
.collection-card-info { display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 16px 14px 20px; }
.collection-card-name {
  font-family: 'Cormorant Garamond', serif; font-style: italic; font-weight: 600;
  font-size: 1.25rem; color: var(--mocha);
  text-align: center;
}
.collection-card-rule {
  width: 28px; height: 1px;
  background: linear-gradient(90deg, transparent, var(--rose), transparent);
  transition: width .3s ease;
}
.collection-card:hover .collection-card-rule { width: 48px; }

@media (max-width: 760px) {
  /* Mobile swipeable carousel for collection */
  .collection-grid {
    display: flex;
    flex-direction: row;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    margin: 0 -20px;
    padding: 0 20px 24px;
    scrollbar-width: none;
  }
  .collection-grid::-webkit-scrollbar { display: none; }
  .collection-card {
    flex: 0 0 75%; /* Shows a peek of the next dress */
    scroll-snap-align: center;
  }
}

/* ---- guidelines section / folder tabs ---- */

/* ---- guidelines section / folder tabs ---- */
.guidelines-section { padding: clamp(40px, 6vw, 80px) 0 clamp(80px, 10vw, 130px); position: relative; background: var(--porcelain); }

.folder-tabs {
  display: flex; align-items: flex-end;
  gap: 0; padding: 0 8px;
  overflow-x: auto; scroll-snap-type: x proximity;
  scrollbar-width: none;
}
.folder-tabs::-webkit-scrollbar { display: none; }
@media (min-width: 700px) { .folder-tabs { justify-content: flex-end; overflow-x: visible; padding: 0 20px; } }

.folder-tab {
  background: transparent; border: none;
  padding: 14px 26px 12px; min-height: 48px;
  font-family: 'Cormorant Garamond', serif; font-style: italic; font-weight: 600;
  font-size: .95rem; letter-spacing: .04em; text-transform: uppercase;
  color: var(--mocha-soft);
  cursor: pointer;
  display: flex; align-items: center; white-space: nowrap; flex-shrink: 0;
  scroll-snap-align: start;
  position: relative;
  margin-left: -14px;
  transition: color .2s ease;
}
.folder-tab::before {
  content: ''; position: absolute; inset: 0; z-index: -1;
  background: #F5EAEC;
  border: 1px solid rgba(169, 100, 124, .35); border-bottom: none;
  transform: perspective(40px) rotateX(6deg);
  transform-origin: bottom;
  border-radius: 12px 12px 0 0;
  transition: background .2s ease;
}
.folder-tab:first-child { margin-left: 0; }
.folder-tab:hover { color: var(--mocha); }
.folder-tab:hover::before { background: #FCEEF1; }
.folder-tab:focus-visible { outline: 2px solid var(--rose-deep); outline-offset: 2px; z-index: 12 !important; }
.folder-tab.active { color: var(--mocha); font-weight: 600; padding-bottom: 18px; margin-bottom: -1px; }
.folder-tab.active::before { background: #FFF7F8; border-color: var(--rose-deep); box-shadow: 0 -8px 20px -6px rgba(169,100,124,.18); }

.folder-stack { position: relative; }
.folder-stack::before, .folder-stack::after {
  content: ''; position: absolute; inset: 0; border-radius: var(--radius-lg);
  border: 1px solid rgba(169, 100, 124, .5); pointer-events: none;
}
.folder-stack::before { background: #F8E4E9; transform: rotate(-1.1deg) translateY(3px); z-index: -1; }
.folder-stack::after { background: #FCF1F3; transform: rotate(.8deg) translateY(2px); z-index: -2; }

.folder-closed {
  width: 100%;
  display: flex; align-items: center; gap: 16px;
  background: #FFF7F8;
  border: 1px solid var(--tab-accent, var(--rose-deep));
  border-radius: 0 28px 28px 28px;
  padding: clamp(20px, 3vw, 28px) clamp(24px, 4vw, 36px);
  cursor: pointer;
  text-align: left;
  box-shadow: 0 16px 40px -14px rgba(169, 100, 124, .25);
  transition: background .2s ease, box-shadow .2s ease, transform .2s var(--ease-pop);
}
.folder-closed:hover { background: var(--blush-ribbon); box-shadow: 0 20px 48px -12px rgba(169,100,124,.35); transform: translateY(-2px); }
.folder-closed:focus-visible { outline: 2px solid var(--rose-deep); outline-offset: 3px; }
.folder-closed-text { display: flex; flex-direction: column; gap: 2px; flex: 1; }
.folder-closed-text strong { font-family: 'Cormorant Garamond', serif; font-weight: 600; font-size: clamp(1.15rem, 2vw, 1.4rem); color: var(--mocha); }
.folder-closed-text em { font-family: 'Cormorant Garamond', serif; font-style: italic; font-size: .88rem; color: var(--mocha-soft); }
.folder-closed-arrow { color: var(--tab-accent, var(--rose-deep)); flex-shrink: 0; transition: transform .2s ease; }
.folder-closed:hover .folder-closed-arrow { transform: translateY(2px); }

.folder-body {
  background: #FFF7F8;
  border: 1px solid var(--rose-deep);
  border-radius: var(--radius-lg);
  padding: clamp(32px, 5vw, 64px);
  box-shadow: 0 24px 60px -12px rgba(169, 100, 124, .2);
  position: relative;
  overflow: hidden;
  transition: max-height .4s ease, opacity .3s ease, padding .4s ease, transform .4s var(--ease-pop);
  transform-origin: top center;
}
.folder-stack.is-closed .folder-body { max-height: 0; padding-top: 0; padding-bottom: 0; opacity: 0; transform: scaleY(.9); pointer-events: none; }
.folder-stack.is-open .folder-body { max-height: 3000px; opacity: 1; transform: scaleY(1); }
@media (min-width: 700px) { .folder-body { border-radius: 28px 0 28px 28px; } }

.folder-watermark {
  position: absolute; bottom: 16px; right: 24px; width: 140px; height: 140px; border-radius: 50%;
  background: radial-gradient(circle, rgba(169,100,124,.15) 0%, transparent 70%);
  border: 1px dashed rgba(169,100,124,.25);
  display: flex; align-items: center; justify-content: center;
  pointer-events: none; user-select: none;
}
.folder-watermark span { font-family: 'Parisienne', cursive; font-size: 3.4rem; color: rgba(169,100,124,.18); }
@media (min-width: 700px) { .folder-watermark { width: 200px; height: 200px; bottom: 24px; right: 32px; } .folder-watermark span { font-size: 5.2rem; } }

.folder-close {
  position: absolute; top: clamp(16px, 3vw, 28px); right: clamp(16px, 3vw, 28px);
  display: inline-flex; align-items: center; gap: 6px;
  background: var(--card); border: 1px solid var(--rose); border-radius: 999px;
  padding: 7px 16px; cursor: pointer;
  font-size: .72rem; font-weight: 500; letter-spacing: .1em; text-transform: uppercase;
  color: var(--mocha-soft);
  box-shadow: var(--shadow-xs);
  transition: background .2s ease, color .2s ease, border-color .2s ease;
}
.folder-close:hover { background: var(--blush-ribbon); color: var(--rose-deep); border-color: var(--rose-deep); }

/* ---- panel content ---- */
/* ---- panel content ---- */
.panel-header { 
  text-align: center; 
  margin-bottom: clamp(32px, 5vw, 64px); 
  display: flex; 
  flex-direction: column; 
  align-items: center; 
  gap: 6px; 
}
.panel-header h3 { 
  font-family: 'Kapakana', 'Parisienne', cursive; 
  font-weight: 500; 
  font-size: clamp(3rem, 6vw, 5rem); 
  color: var(--tab-accent, var(--rose-deep)); 
  line-height: 1.1;
}
.panel-header p { 
  font-family: 'Cormorant Garamond', serif; 
  font-style: italic; 
  font-size: clamp(1.2rem, 2.2vw, 1.6rem); 
  color: var(--mocha-soft); 
  margin-top: -8px; 
}
.panel-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: clamp(18px, 2.5vw, 28px); }
.panel-card {
  background: #fff; border: 1px solid rgba(169,100,124,.5); border-radius: 20px;
  padding: clamp(20px, 2.5vw, 24px);
  box-shadow: var(--shadow-xs);
  transition: transform .25s var(--ease-pop), box-shadow .25s ease, border-color .25s ease;
}
.panel-card:hover { transform: translateY(-4px) rotate(-.5deg); box-shadow: var(--shadow-sm); border-color: var(--tab-accent, var(--rose-deep)); }
.panel-card-num { font-family: 'Cormorant Garamond', serif; font-style: italic; font-size: 1.5rem; font-weight: 600; color: var(--tab-accent, var(--rose-deep)); display: flex; align-items: center; gap: 6px; margin-bottom: 8px; }
.panel-card h4 { font-size: .9rem; font-weight: 600; letter-spacing: .06em; text-transform: uppercase; margin-bottom: 6px; }
.panel-card p, .panel-list p, .panel-prose li { font-size: .9rem; color: var(--ink-body); }

.panel-list { list-style: none; display: flex; flex-direction: column; gap: clamp(14px, 1.8vw, 18px); }
.panel-list li { background: #fff; border: 1px solid rgba(169,100,124,.5); border-radius: 16px; padding: clamp(16px, 2vw, 20px) clamp(20px, 2.5vw, 24px); box-shadow: var(--shadow-xs); transition: border-color .2s ease, box-shadow .2s ease; }
.panel-list li:hover { border-color: var(--tab-accent, var(--rose-deep)); box-shadow: var(--shadow-sm); }
.panel-list h4 { font-size: .92rem; font-weight: 600; letter-spacing: .06em; text-transform: uppercase; color: var(--tab-accent, var(--rose-deep)); margin-bottom: 6px; display: flex; align-items: center; gap: 8px; }

.panel-prose { max-width: 780px; margin: 0 auto; text-align: center; }
.prose-intro { font-size: clamp(.98rem, 1.4vw, 1.08rem); color: var(--mocha); line-height: 1.8; margin-bottom: clamp(24px, 3.5vw, 32px); }
.panel-prose ul { list-style: none; display: flex; flex-direction: column; gap: 14px; text-align: left; margin-bottom: clamp(28px, 3.5vw, 38px); }
.panel-prose li { display: flex; align-items: flex-start; gap: 12px; line-height: 1.65; background: #fff; padding: 14px 20px; border-radius: 14px; border: 1px solid rgba(169,100,124,.5); box-shadow: var(--shadow-xs); }
.panel-prose li::before { content: '♡'; color: var(--tab-accent, var(--rose-deep)); margin-top: 1px; }
.prose-outro { font-family: 'Cormorant Garamond', serif; font-style: italic; font-size: clamp(1.15rem, 1.8vw, 1.35rem); color: var(--mocha); margin-bottom: 10px; }
.prose-signoff { font-family: 'Parisienne', cursive; font-size: clamp(2rem, 3.4vw, 2.8rem); color: var(--tab-accent, var(--rose-deep)); }

/* ---- responsive ---- */
@media (max-width: 640px) {
  .hero-cta-row { flex-direction: column; width: 100%; }
  .hero-cta-row .btn { width: 100%; justify-content: center; }
}
@media (max-width: 479px) {
  .folder-tab { min-height: 52px; padding: 14px 18px; }
  .panel-card, .panel-list li { padding: 18px; }
}
@media (prefers-reduced-motion: reduce) {
  * { animation-duration: .01ms !important; transition-duration: .01ms !important; }
}
`