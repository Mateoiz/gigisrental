'use client'

import { useRef, useState, useEffect, type KeyboardEvent } from 'react'
import Footer from '@/app/components/Footer'
import CoquetteBow from '@/app/components/CoquetteBow'
import { TABS, TAB_DATA, TabKey, TabContentData, StepItem } from '@/data/rulesData'

/* --- Panel layouts (copied from homepage) --- */

function PanelHeader({ data }: { data: TabContentData }) {
  return (
    <header className="panel-header">
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
          <span className="panel-card-num">{step.num} <span className="glyph">♡</span></span>
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
          <h4><span className="glyph">❀</span> {term.title}</h4>
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
      <ul>{data.items.map((line) => <li key={line}>{line}</li>)}</ul>
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

/* --- Guidelines folder (copied verbatim from homepage) --- */

function GuidelinesFolder({
  activeTab, isOpen, onSelectTab, onOpen, onClose,
}: {
  activeTab: TabKey; isOpen: boolean
  onSelectTab: (key: TabKey) => void; onOpen: () => void; onClose: () => void
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
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen) panelRef.current?.focus()
  }, [isOpen, activeTab])

  return (
    <>
      <div className="folder desktop-folder">
        <div className="folder-tabs" role="tablist" aria-label="Studio rules and guidelines">
          {TABS.map((tab, index) => (
            <button
              key={tab.key}
              ref={(el) => { tabRefs.current[tab.key] = el }}
              type="button" role="tab" id={`tab-${tab.key}`}
              aria-selected={activeTab === tab.key} aria-controls={`panel-${tab.key}`}
              tabIndex={activeTab === tab.key ? 0 : -1}
              onClick={() => { onSelectTab(tab.key); onOpen() }}
              onKeyDown={(e) => handleTabKeyDown(e, index)}
              className={`folder-tab ${activeTab === tab.key ? 'active' : ''}`}
              style={{ '--tab-accent': `var(--accent-${tab.key})`, zIndex: activeTab === tab.key ? 10 : TABS.length - index } as React.CSSProperties}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className={`folder-stack ${isOpen ? 'is-open' : 'is-closed'}`}>
          {!isOpen && (
            <button type="button" className="folder-closed" onClick={onOpen}
              style={{ '--tab-accent': `var(--accent-${activeTab})` } as React.CSSProperties}>
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
            <div ref={panelRef} role="tabpanel" id={`panel-${activeTab}`} aria-labelledby={`tab-${activeTab}`} tabIndex={-1}>
              <TabPanel data={currentData} />
            </div>
          </div>
        </div>
      </div>

      <div className="mobile-accordion">
        {TABS.map((tab) => {
          const isActive = activeTab === tab.key
          const isExpanded = isActive && isOpen
          const data = TAB_DATA[tab.key]
          return (
            <div key={tab.key} className={`accordion-card ${isExpanded ? 'is-active' : ''}`}
              style={{ '--tab-accent': `var(--accent-${tab.key})` } as React.CSSProperties}>
              <button type="button" className="accordion-header" onClick={() => {
                if (isActive && isOpen) onClose()
                else { onSelectTab(tab.key); onOpen() }
              }}>
                <div className="accordion-header-left">
                  <CoquetteBow width={20} height={13} style={{ color: 'var(--tab-accent)' }} />
                  <span className="accordion-title">{tab.label}</span>
                </div>
                <svg className="accordion-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>
              <div className="accordion-body-wrapper">
                <div className="accordion-body"><TabPanel data={data} /></div>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}

/* --- Page --- */

export default function GuidelinesContent() {
  const [activeTab, setActiveTab] = useState<TabKey>('terms')
  const [isFolderOpen, setIsFolderOpen] = useState(true)

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: GUIDELINES_STYLES }} />
      <main className="guidelines-page-wrap">
        <header className="guidelines-page-header">
          <span className="eyebrow-pill">
            <CoquetteBow width={18} height={12} style={{ color: 'var(--rose-deep)' }} />
            Please Read Before Booking
          </span>
          <h1 className="wordmark">Guidelines</h1>
        </header>
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
      </main>
      <Footer />
    </>
  )
}

/* --- Styles: only what GuidelinesFolder + panels need, pulled from homepage --- */

const GUIDELINES_STYLES = `
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
  --shadow-xs: 0 1px 2px rgba(61, 44, 46, .06), 0 2px 6px -2px rgba(169, 100, 124, .15);
  --shadow-sm: 0 2px 4px rgba(61, 44, 46, .07), 0 8px 20px -8px rgba(169, 100, 124, .22);
  --accent-appointment: #C77B8E;
  --accent-how: #A9647C;
  --accent-terms: #8E4F63;
  --accent-reminder: #D391A6;
  --radius-lg: 24px;
  --ease-pop: cubic-bezier(0.34, 1.56, 0.64, 1);
}

*, *::before, *::after { box-sizing: border-box; }
.guidelines-page-wrap * , .guidelines-section * { margin: 0; padding: 0; }
body { background-color: var(--porcelain); color: var(--mocha); font-family: 'Jost', sans-serif; font-weight: 300; line-height: 1.65; }
h1, h2, h3 { font-family: 'Cormorant Garamond', serif; font-weight: 500; line-height: 1.08; color: var(--mocha); }
.glyph { color: var(--tab-accent, var(--rose-deep)); }
.wrap { width: 100%; max-width: 1080px; margin: 0 auto; padding: 0 clamp(20px, 5vw, 48px); }

.guidelines-page-wrap { padding-top: clamp(60px, 8vw, 100px); }
.guidelines-page-header { display: flex; flex-direction: column; align-items: center; text-align: center; gap: 16px; margin-bottom: clamp(20px, 4vw, 40px); }
.eyebrow-pill { display: inline-flex; align-items: center; gap: 10px; padding: 8px 22px; border-radius: 999px; border: 1px dashed var(--rose); background: rgba(255,255,255,.9); font-size: .72rem; font-weight: 500; letter-spacing: .14em; text-transform: uppercase; color: var(--rose-deep); }
.wordmark { font-family: 'Parisienne', cursive; font-size: clamp(3rem, 7vw, 5rem); color: var(--rose-deep); }

.guidelines-section { padding: clamp(40px, 6vw, 80px) 0 clamp(80px, 10vw, 130px); position: relative; background: var(--porcelain); }
.folder-tabs { display: flex; align-items: flex-end; gap: 0; padding: 0 8px; overflow-x: auto; scroll-snap-type: x proximity; scrollbar-width: none; }
.folder-tabs::-webkit-scrollbar { display: none; }
@media (min-width: 700px) { .folder-tabs { justify-content: flex-end; overflow-x: visible; padding: 0 20px; } }
.folder-tab { background: transparent; border: none; padding: 14px 26px 12px; min-height: 48px; font-family: 'Cormorant Garamond', serif; font-style: italic; font-weight: 600; font-size: .95rem; letter-spacing: .04em; text-transform: uppercase; color: var(--mocha-soft); cursor: pointer; display: flex; align-items: center; white-space: nowrap; flex-shrink: 0; scroll-snap-align: start; position: relative; margin-left: -14px; transition: color .2s ease; }
.folder-tab::before { content: ''; position: absolute; inset: 0; z-index: -1; background: #F5EAEC; border: 1px solid rgba(169, 100, 124, .35); border-bottom: none; transform: perspective(40px) rotateX(6deg); transform-origin: bottom; border-radius: 12px 12px 0 0; transition: background .2s ease; }
.folder-tab:first-child { margin-left: 0; }
.folder-tab:hover { color: var(--mocha); }
.folder-tab:hover::before { background: #FCEEF1; }
.folder-tab:focus-visible { outline: 2px solid var(--rose-deep); outline-offset: 2px; z-index: 12 !important; }
.folder-tab.active { color: var(--mocha); font-weight: 600; padding-bottom: 18px; margin-bottom: -1px; }
.folder-tab.active::before { background: #FFF7F8; border-color: var(--rose-deep); box-shadow: 0 -8px 20px -6px rgba(169,100,124,.18); }
.folder-stack { position: relative; }
.folder-stack::before, .folder-stack::after { content: ''; position: absolute; inset: 0; border-radius: var(--radius-lg); border: 1px solid rgba(169, 100, 124, .5); pointer-events: none; }
.folder-stack::before { background: #F8E4E9; transform: rotate(-1.1deg) translateY(3px); z-index: -1; }
.folder-stack::after { background: #FCF1F3; transform: rotate(.8deg) translateY(2px); z-index: -2; }
.folder-closed { width: 100%; display: flex; align-items: center; gap: 16px; background: #FFF7F8; border: 1px solid var(--tab-accent, var(--rose-deep)); border-radius: 0 28px 28px 28px; padding: clamp(20px, 3vw, 28px) clamp(24px, 4vw, 36px); cursor: pointer; text-align: left; box-shadow: 0 16px 40px -14px rgba(169, 100, 124, .25); transition: background .2s ease, box-shadow .2s ease, transform .2s var(--ease-pop); }
.folder-closed:hover { background: var(--blush-ribbon); box-shadow: 0 20px 48px -12px rgba(169,100,124,.35); transform: translateY(-2px); }
.folder-closed-text { display: flex; flex-direction: column; gap: 2px; flex: 1; }
.folder-closed-text strong { font-family: 'Cormorant Garamond', serif; font-weight: 600; font-size: clamp(1.15rem, 2vw, 1.4rem); color: var(--mocha); }
.folder-closed-text em { font-family: 'Cormorant Garamond', serif; font-style: italic; font-size: .88rem; color: var(--mocha-soft); }
.folder-closed-arrow { color: var(--tab-accent, var(--rose-deep)); flex-shrink: 0; transition: transform .2s ease; }
.folder-closed:hover .folder-closed-arrow { transform: translateY(2px); }
.folder-body { background: #FFF7F8; border: 1px solid var(--rose-deep); border-radius: var(--radius-lg); padding: clamp(32px, 5vw, 64px); box-shadow: 0 24px 60px -12px rgba(169, 100, 124, .2); position: relative; overflow: hidden; transition: max-height .4s ease, opacity .3s ease, padding .4s ease, transform .4s var(--ease-pop); transform-origin: top center; }
.folder-stack.is-closed .folder-body { max-height: 0; padding-top: 0; padding-bottom: 0; opacity: 0; transform: scaleY(.9); pointer-events: none; }
.folder-stack.is-open .folder-body { max-height: 3000px; opacity: 1; transform: scaleY(1); }
@media (min-width: 700px) { .folder-body { border-radius: 28px 0 28px 28px; } }
.folder-watermark { position: absolute; bottom: 16px; right: 24px; width: 140px; height: 140px; border-radius: 50%; background: radial-gradient(circle, rgba(169,100,124,.15) 0%, transparent 70%); border: 1px dashed rgba(169,100,124,.25); display: flex; align-items: center; justify-content: center; pointer-events: none; user-select: none; }
.folder-watermark span { font-family: 'Parisienne', cursive; font-size: 3.4rem; color: rgba(169,100,124,.18); }
@media (min-width: 700px) { .folder-watermark { width: 200px; height: 200px; bottom: 24px; right: 32px; } .folder-watermark span { font-size: 5.2rem; } }
.folder-close { position: absolute; top: clamp(16px, 3vw, 28px); right: clamp(16px, 3vw, 28px); display: inline-flex; align-items: center; gap: 6px; background: var(--card); border: 1px solid var(--rose); border-radius: 999px; padding: 7px 16px; cursor: pointer; font-size: .72rem; font-weight: 500; letter-spacing: .1em; text-transform: uppercase; color: var(--mocha-soft); box-shadow: var(--shadow-xs); transition: background .2s ease, color .2s ease, border-color .2s ease; }
.folder-close:hover { background: var(--blush-ribbon); color: var(--rose-deep); border-color: var(--rose-deep); }
.panel-header { text-align: center; margin-bottom: clamp(32px, 5vw, 64px); display: flex; flex-direction: column; align-items: center; gap: 6px; }
.panel-header h3 { font-family: 'Kapakana', 'Parisienne', cursive; font-weight: 500; font-size: clamp(3rem, 6vw, 5rem); color: var(--tab-accent, var(--rose-deep)); line-height: 1.1; }
.panel-header p { font-family: 'Cormorant Garamond', serif; font-style: italic; font-size: clamp(1.2rem, 2.2vw, 1.6rem); color: var(--mocha-soft); margin-top: -8px; }
.panel-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: clamp(18px, 2.5vw, 28px); }
.panel-card { background: #fff; border: 1px solid rgba(169,100,124,.5); border-radius: 20px; padding: clamp(20px, 2.5vw, 24px); box-shadow: var(--shadow-xs); transition: transform .25s var(--ease-pop), box-shadow .25s ease, border-color .25s ease; }
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

.mobile-accordion { display: none; }
@media (max-width: 900px) {
  html, body { overflow-x: hidden; max-width: 100%; }
  .desktop-folder { display: none !important; }
  .mobile-accordion { display: flex; flex-direction: column; gap: 16px; width: 100%; max-width: 100%; }
  .accordion-card { background: #fff; border: 1px solid rgba(169, 100, 124, 0.2); border-radius: 20px; overflow: hidden; box-shadow: var(--shadow-xs); transition: border-color 0.3s ease, box-shadow 0.3s ease; width: 100%; }
  .accordion-card.is-active { border-color: var(--tab-accent); box-shadow: 0 8px 24px -8px rgba(169, 100, 124, 0.25); }
  .accordion-header { width: 100%; display: flex; align-items: center; justify-content: space-between; padding: 20px 24px; background: transparent; border: none; cursor: pointer; text-align: left; }
  .accordion-header-left { display: flex; align-items: center; gap: 12px; }
  .accordion-title { font-family: 'Cormorant Garamond', serif; font-size: 1.25rem; font-weight: 600; color: var(--mocha); white-space: normal; }
  .accordion-icon { color: var(--mocha-soft); transition: transform 0.4s var(--ease-pop); flex-shrink: 0; }
  .accordion-card.is-active .accordion-icon { transform: rotate(180deg); color: var(--tab-accent); }
  .accordion-body-wrapper { display: grid; grid-template-rows: 0fr; transition: grid-template-rows 0.4s var(--ease-pop); min-width: 0; }
  .accordion-card.is-active .accordion-body-wrapper { grid-template-rows: 1fr; }
  .accordion-body { overflow: hidden; padding: 0 20px; min-height: 0; min-width: 0; }
  .accordion-card.is-active .accordion-body { padding: 0 20px 24px; }
  .panel-header h3 { font-size: clamp(2.2rem, 8vw, 3rem); word-break: break-word; }
  .panel-list li, .panel-card { padding: 16px; }
}
@media (prefers-reduced-motion: reduce) { * { animation-duration: .01ms !important; transition-duration: .01ms !important; } }
`