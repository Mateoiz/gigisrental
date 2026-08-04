'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'

// --- TYPES ---
interface BookingState {
  category: string | null
  date: string | null
  time: string | null
  rentalDays: number | null
  name: string
  email: string
  phone: string
  notes: string
}

const CATEGORIES = [
  'Modern Vietnamese (Áo Dài)',
  'Chantilly Lace Gown',
  'Satin & Pearl Evening Wear',
  'Custom Fitted Ball Gown',
  'Not sure yet — help me choose',
]

const TIME_SLOTS = [
  '9:00 AM', '10:00 AM', '11:00 AM',
  '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM',
]

const RENTAL_DURATIONS = [1, 2, 3, 4, 5]

const STEPS = ['Style', 'Date', 'Time', 'Duration', 'Details', 'Confirm'] as const

function generateDates(days = 21) {
  const out: { iso: string; weekday: string; day: string; month: string }[] = []
  const today = new Date()
  for (let i = 1; i <= days; i++) {
    const d = new Date(today)
    d.setDate(today.getDate() + i)
    if (d.getDay() === 0) continue // skip Sundays (closed, adjust as needed)
    out.push({
      iso: d.toISOString().slice(0, 10),
      weekday: d.toLocaleDateString('en-US', { weekday: 'short' }),
      day: d.getDate().toString(),
      month: d.toLocaleDateString('en-US', { month: 'short' }),
    })
  }
  return out
}

export default function BookingForm() {
  const searchParams = useSearchParams()
  const dressSlug = searchParams.get('dress')

  const [step, setStep] = useState(0)
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [preselectedDress, setPreselectedDress] = useState<{ id: string; name: string; category: string | null } | null>(null)
  const [dressLoading, setDressLoading] = useState(!!dressSlug)

  const [booking, setBooking] = useState<BookingState>({
    category: null,
    date: null,
    time: null,
    rentalDays: null,
    name: '',
    email: '',
    phone: '',
    notes: '',
  })

  useEffect(() => {
    if (!dressSlug) return
    const fetchDress = async () => {
      const { data } = await supabase
        .from('dresses')
        .select('id, name, category')
        .eq('slug', dressSlug)
        .single()

      if (data) {
        setPreselectedDress(data)
        setBooking((b) => ({ ...b, category: data.name }))
        setStep(1) // skip Style step, jump to Date
      }
      setDressLoading(false)
    }
    fetchDress()
  }, [dressSlug])

  const dates = generateDates()

const canProceed = () => {
    switch (step) {
      case 0: return !!booking.category
      case 1: return !!booking.date
      case 2: return !!booking.time
      case 3: return !!booking.rentalDays
      case 4: return booking.name.trim() !== '' && booking.email.trim() !== '' && booking.phone.trim() !== ''
      default: return true
    }
  }
const next = async () => {
    if (!canProceed()) return
    if (step === STEPS.length - 1) {
      setSubmitting(true)
      setSubmitError(null)

      const { error } = await supabase.from('bookings').insert({
        dress_id: preselectedDress?.id ?? null,
        category: booking.category,
        booking_date: booking.date,
        booking_time: booking.time,
        rental_days: booking.rentalDays,
        full_name: booking.name,
        email: booking.email,
        phone: booking.phone,
        notes: booking.notes || null,
      })

      setSubmitting(false)

      if (error) {
        setSubmitError('Something went wrong submitting your request. Please try again.')
        return
      }

      setSubmitted(true)
      return
    }
    setStep((s) => Math.min(s + 1, STEPS.length - 1))
  }
  const back = () => setStep((s) => Math.max(s - 1, 0))

  const goToStep = (i: number) => {
    // only allow jumping to a step you've already reached or the immediate next valid one
    if (i <= step) setStep(i)
  }

  const update = <K extends keyof BookingState>(key: K, value: BookingState[K]) => {
    setBooking((b) => ({ ...b, [key]: value }))
  }

  const formattedDate = booking.date
    ? new Date(booking.date + 'T00:00:00').toLocaleDateString('en-US', {
        weekday: 'long', month: 'long', day: 'numeric',
      })
    : ''

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Jost:wght@300;400;500;600&family=Parisienne&display=swap');

        .bk-root {
          --porcelain: #FFFBF7;
          --card: #FFFFFF;
          --rose: #E2A6B4;
          --rose-deep: #B86B7D;
          --mocha: #4A3337;
          --mocha-soft: #8C666B;
          --ink-body: #6B484D;
          --line: #F7E8EC;
          --blush-ribbon: #FDF2F5;
          --shadow-xs: 0 1px 2px rgba(74, 51, 55, 0.06), 0 2px 6px -2px rgba(184, 107, 125, 0.15);
          --shadow-sm: 0 2px 4px rgba(74, 51, 55, 0.07), 0 8px 20px -8px rgba(184, 107, 125, 0.22);
          --shadow-md: 0 4px 8px rgba(74, 51, 55, 0.08), 0 16px 36px -12px rgba(184, 107, 125, 0.28);
          font-family: 'Jost', sans-serif;
          color: var(--mocha);
          max-width: 760px;
          margin: 0 auto;
          padding: clamp(20px, 4vw, 40px);
        }
        .bk-root * { box-sizing: border-box; }
        .bk-root h1, .bk-root h2, .bk-root h3 {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 500;
          color: var(--mocha);
        }

        /* --- STEP TRACKER (passport-style) --- */
        .bk-tracker {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: clamp(28px, 5vw, 44px);
          overflow-x: auto;
          padding-bottom: 4px;
        }
        .bk-tracker-step {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          flex: 1;
          min-width: 0;
          position: relative;
          cursor: pointer;
          background: none;
          border: none;
          font-family: 'Jost', sans-serif;
        }
        .bk-tracker-step::before {
          content: '';
          position: absolute;
          top: 15px;
          left: -50%;
          width: 100%;
          height: 2px;
          background: var(--line);
          z-index: 0;
        }
        .bk-tracker-step:first-child::before { display: none; }
        .bk-tracker-step.done::before,
        .bk-tracker-step.active::before {
          background: var(--rose-deep);
        }
        .bk-dot {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-weight: 600;
          font-size: .95rem;
          background: var(--card);
          border: 2px solid var(--line);
          color: var(--mocha-soft);
          position: relative;
          z-index: 1;
          transition: all .25s ease;
        }
        .bk-tracker-step.active .bk-dot {
          border-color: var(--rose-deep);
          background: var(--rose-deep);
          color: #fff;
          box-shadow: var(--shadow-sm);
        }
        .bk-tracker-step.done .bk-dot {
          border-color: var(--rose-deep);
          background: var(--blush-ribbon);
          color: var(--rose-deep);
        }
        .bk-tracker-label {
          font-size: .68rem;
          letter-spacing: .06em;
          text-transform: uppercase;
          color: var(--mocha-soft);
          white-space: nowrap;
        }
        .bk-tracker-step.active .bk-tracker-label { color: var(--rose-deep); font-weight: 600; }

        /* --- CARD SHELL --- */
        .bk-card {
          background: #FFF7F8;
          border: 1px solid var(--rose-deep);
          border-radius: 24px;
          padding: clamp(24px, 5vw, 44px);
          box-shadow: 0 20px 50px -14px rgba(184, 107, 125, 0.2);
          position: relative;
          min-height: 320px;
        }
        .bk-card-header {
          text-align: center;
          margin-bottom: clamp(24px, 4vw, 36px);
        }
        .bk-card-header h2 {
          font-size: clamp(1.6rem, 3vw, 2.2rem);
          font-style: italic;
          margin-bottom: 6px;
        }
        .bk-card-header p {
          color: var(--mocha-soft);
          font-size: .95rem;
        }

        /* --- SERVICE / CATEGORY OPTION CARDS --- */
        .bk-options {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 14px;
        }
        .bk-option {
          background: var(--card);
          border: 1.5px solid rgba(226, 166, 180, 0.5);
          border-radius: 16px;
          padding: 20px 18px;
          text-align: left;
          cursor: pointer;
          transition: all .2s ease;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .bk-option-icon { font-size: 1.4rem; margin-bottom: 4px; }
        .bk-option h4 {
          font-family: 'Jost', sans-serif;
          font-size: .92rem;
          font-weight: 600;
          color: var(--mocha);
        }
        .bk-option p {
          font-size: .82rem;
          color: var(--ink-body);
          line-height: 1.5;
        }
        .bk-option:hover {
          border-color: var(--rose-deep);
          box-shadow: var(--shadow-xs);
          transform: translateY(-2px);
        }
        .bk-option.selected {
          border-color: var(--rose-deep);
          background: var(--blush-ribbon);
          box-shadow: var(--shadow-sm);
        }
        .bk-option.selected h4 { color: var(--rose-deep); }

        /* single-column list style (used for category) */
        .bk-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .bk-list .bk-option {
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          padding: 16px 20px;
        }
        .bk-list .bk-option h4 { font-size: .95rem; }
        .bk-check {
          width: 20px; height: 20px;
          border-radius: 50%;
          border: 1.5px solid var(--rose);
          flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
        }
        .bk-option.selected .bk-check {
          background: var(--rose-deep);
          border-color: var(--rose-deep);
        }
        .bk-option.selected .bk-check::after {
          content: '✓';
          color: #fff;
          font-size: .7rem;
        }

        /* --- DATE GRID --- */
        .bk-date-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(64px, 1fr));
          gap: 10px;
          max-height: 320px;
          overflow-y: auto;
          padding-right: 4px;
        }
        .bk-date-cell {
          background: var(--card);
          border: 1.5px solid rgba(226, 166, 180, 0.5);
          border-radius: 14px;
          padding: 12px 6px;
          text-align: center;
          cursor: pointer;
          transition: all .2s ease;
        }
        .bk-date-cell .wk {
          font-size: .65rem;
          letter-spacing: .06em;
          text-transform: uppercase;
          color: var(--mocha-soft);
          display: block;
          margin-bottom: 4px;
        }
        .bk-date-cell .num {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 600;
          font-size: 1.3rem;
          display: block;
          line-height: 1;
        }
        .bk-date-cell .mo {
          font-size: .65rem;
          color: var(--mocha-soft);
          display: block;
          margin-top: 3px;
        }
        .bk-date-cell:hover { border-color: var(--rose-deep); }
        .bk-date-cell.selected {
          background: var(--rose-deep);
          border-color: var(--rose-deep);
        }
        .bk-date-cell.selected .wk,
        .bk-date-cell.selected .num,
        .bk-date-cell.selected .mo { color: #fff; }

        /* --- TIME SLOTS --- */
        .bk-time-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(110px, 1fr));
          gap: 12px;
        }
        .bk-time-cell {
          background: var(--card);
          border: 1.5px solid rgba(226, 166, 180, 0.5);
          border-radius: 999px;
          padding: 12px;
          text-align: center;
          font-size: .88rem;
          cursor: pointer;
          transition: all .2s ease;
        }
        .bk-time-cell:hover { border-color: var(--rose-deep); }
        .bk-time-cell.selected {
          background: var(--rose-deep);
          border-color: var(--rose-deep);
          color: #fff;
          font-weight: 600;
        }

        /* --- FORM FIELDS --- */
        .bk-field { margin-bottom: 18px; }
        .bk-field label {
          display: block;
          font-size: .78rem;
          letter-spacing: .05em;
          text-transform: uppercase;
          color: var(--mocha-soft);
          margin-bottom: 6px;
          font-weight: 500;
        }
        .bk-field input,
        .bk-field textarea {
          width: 100%;
          border: 1.5px solid rgba(226, 166, 180, 0.6);
          border-radius: 12px;
          padding: 12px 16px;
          font-family: 'Jost', sans-serif;
          font-size: .95rem;
          color: var(--mocha);
          background: var(--card);
          transition: border-color .2s ease;
        }
        .bk-field input:focus,
        .bk-field textarea:focus {
          outline: none;
          border-color: var(--rose-deep);
        }
        .bk-field textarea { resize: vertical; min-height: 80px; }

        /* --- SUMMARY (confirm step) --- */
        .bk-summary {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .bk-summary-row {
          display: flex;
          justify-content: space-between;
          gap: 12px;
          padding: 14px 18px;
          background: var(--card);
          border: 1px solid rgba(226, 166, 180, 0.5);
          border-radius: 14px;
          font-size: .92rem;
        }
        .bk-summary-row .k {
          color: var(--mocha-soft);
          font-size: .78rem;
          letter-spacing: .05em;
          text-transform: uppercase;
        }
        .bk-summary-row .v { color: var(--mocha); font-weight: 500; text-align: right; }

        /* --- NAV BUTTONS --- */
        .bk-nav {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: clamp(24px, 4vw, 36px);
        }
        .bk-btn {
          font-family: 'Jost', sans-serif;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 13px 30px;
          border-radius: 999px;
          font-size: .82rem;
          font-weight: 500;
          letter-spacing: .1em;
          text-transform: uppercase;
          cursor: pointer;
          border: none;
          transition: all .25s ease;
        }
        .bk-btn-primary {
          background: var(--mocha);
          color: #fff;
          box-shadow: 0 3px 6px rgba(74, 51, 55, 0.25);
        }
        .bk-btn-primary:hover:not(:disabled) { background: var(--rose-deep); }
        .bk-btn-primary:disabled {
          opacity: .4;
          cursor: not-allowed;
        }
        .bk-btn-ghost {
          background: transparent;
          border: 1.5px solid var(--rose);
          color: var(--mocha-soft);
        }
        .bk-btn-ghost:hover { background: var(--blush-ribbon); border-color: var(--rose-deep); color: var(--rose-deep); }

        /* --- SUCCESS STATE --- */
        .bk-success {
          text-align: center;
          padding: clamp(30px, 6vw, 50px) clamp(10px, 4vw, 20px);
        }
        .bk-success .stamp {
          width: 72px; height: 72px;
          border-radius: 50%;
          border: 2px solid var(--rose-deep);
          display: flex; align-items: center; justify-content: center;
          margin: 0 auto 20px;
          font-size: 1.8rem;
          color: var(--rose-deep);
        }
        .bk-success h2 {
          font-style: italic;
          font-size: clamp(1.8rem, 4vw, 2.6rem);
          margin-bottom: 10px;
        }
        .bk-success p { color: var(--ink-body); max-width: 420px; margin: 0 auto; }
        .bk-signoff {
          font-family: 'Parisienne', cursive;
          font-size: 1.8rem;
          color: var(--rose-deep);
          margin-top: 22px;
        }
      `}</style>

<div className="bk-root">
        {dressLoading && <p style={{ textAlign: 'center', color: 'var(--mocha-soft)' }}>Loading...</p>}

        {!dressLoading && preselectedDress && !submitted && (
          <p style={{ textAlign: 'center', color: 'var(--rose-deep)', fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: '1.1rem', marginBottom: '20px' }}>
            Booking a fitting for <strong>{preselectedDress.name}</strong>
          </p>
        )}

        {!dressLoading && !submitted && (
          <div className="bk-tracker">
            {STEPS.map((label, i) => (
              <button
                key={label}
                type="button"
                className={`bk-tracker-step ${i === step ? 'active' : ''} ${i < step ? 'done' : ''}`}
                onClick={() => goToStep(i)}
              >
<span className="bk-dot">{i < step ? '✓' : i + 1}</span>
                <span className="bk-tracker-label">{label}</span>
              </button>
            ))}
          </div>
        )}

        {!dressLoading && submitted ? (
          <div className="bk-card">
            <div className="bk-success">
              <div className="stamp">♡</div>
              <h2>Fitting Appointment Requested</h2>
              <p>
                Thank you, {booking.name.split(' ')[0] || 'lovely'}! We've received your fitting request for{' '}
                <strong>{formattedDate}</strong> at <strong>{booking.time}</strong>. We'll confirm via email
                or phone within 24 hours.
              </p>
              <div className="bk-signoff">With love, Gigi&apos;s Rentals</div>
            </div>
          </div>
        ) : (
          <div className="bk-card">
            {step === 0 && (
              <>
                <div className="bk-card-header">
                  <h2>Pick a style</h2>
                  <p>Which category are you most drawn to for your fitting?</p>
                </div>
                <div className="bk-list">
                  {CATEGORIES.map((c) => (
                    <button
                      key={c}
                      type="button"
                      className={`bk-option ${booking.category === c ? 'selected' : ''}`}
                      onClick={() => update('category', c)}
                    >
                      <h4>{c}</h4>
                      <span className="bk-check" />
                    </button>
                  ))}
                </div>
              </>
            )}

            {step === 1 && (
              <>
                <div className="bk-card-header">
                  <h2>Choose your date</h2>
                  <p>Select a day that works for you (closed Sundays).</p>
                </div>
                <div className="bk-date-grid">
                  {dates.map((d) => (
                    <button
                      key={d.iso}
                      type="button"
                      className={`bk-date-cell ${booking.date === d.iso ? 'selected' : ''}`}
                      onClick={() => update('date', d.iso)}
                    >
                      <span className="wk">{d.weekday}</span>
                      <span className="num">{d.day}</span>
                      <span className="mo">{d.month}</span>
                    </button>
                  ))}
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <div className="bk-card-header">
                  <h2>Pick a time</h2>
                  <p>{formattedDate}</p>
                </div>
                <div className="bk-time-grid">
                  {TIME_SLOTS.map((t) => (
                    <button
                      key={t}
                      type="button"
                      className={`bk-time-cell ${booking.time === t ? 'selected' : ''}`}
                      onClick={() => update('time', t)}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </>
            )}

{step === 3 && (
              <>
                <div className="bk-card-header">
                  <h2>How many days?</h2>
                  <p>Select your rental duration.</p>
                </div>
                <div className="bk-time-grid">
                  {RENTAL_DURATIONS.map((d) => (
                    <button
                      key={d}
                      type="button"
                      className={`bk-time-cell ${booking.rentalDays === d ? 'selected' : ''}`}
                      onClick={() => update('rentalDays', d)}
                    >
                      {d} {d === 1 ? 'day' : 'days'}
                    </button>
                  ))}
                </div>
              </>
            )}

            {step === 4 && (
              <>
                <div className="bk-card-header">
                  <h2>Your details</h2>
                  <p>So we can confirm your appointment.</p>
                </div>
                <div className="bk-field">
                  <label>Full Name</label>
                  <input
                    type="text"
                    value={booking.name}
                    onChange={(e) => update('name', e.target.value)}
                    placeholder="Juana Dela Cruz"
                  />
                </div>
                <div className="bk-field">
                  <label>Email</label>
                  <input
                    type="email"
                    value={booking.email}
                    onChange={(e) => update('email', e.target.value)}
                    placeholder="you@example.com"
                  />
                </div>
                <div className="bk-field">
                  <label>Phone Number</label>
                  <input
                    type="tel"
                    value={booking.phone}
                    onChange={(e) => update('phone', e.target.value)}
                    placeholder="09XX XXX XXXX"
                  />
                </div>
                <div className="bk-field">
                  <label>Notes (optional)</label>
                  <textarea
                    value={booking.notes}
                    onChange={(e) => update('notes', e.target.value)}
                    placeholder="Event date, size range, color preferences..."
                  />
                </div>
              </>
            )}

{step === 5 && (
              <>
                <div className="bk-card-header">
                  <h2>Confirm your booking</h2>
                  <p>Please review before submitting.</p>
                </div>
                <div className="bk-summary">
                  <div className="bk-summary-row">
                    <span className="k">Style</span>
                    <span className="v">{booking.category}</span>
                  </div>
                  <div className="bk-summary-row">
                    <span className="k">Date</span>
                    <span className="v">{formattedDate}</span>
                  </div>
                  <div className="bk-summary-row">
                    <span className="k">Time</span>
                    <span className="v">{booking.time}</span>
                  </div>
                  <div className="bk-summary-row">
                    <span className="k">Duration</span>
                    <span className="v">{booking.rentalDays} {booking.rentalDays === 1 ? 'day' : 'days'}</span>
                  </div>
                  <div className="bk-summary-row">
                    <span className="k">Name</span>
                    <span className="v">{booking.name}</span>
                  </div>
                  <div className="bk-summary-row">
                    <span className="k">Contact</span>
                    <span className="v">{booking.email} · {booking.phone}</span>
                  </div>
                  {booking.notes && (
                    <div className="bk-summary-row">
                      <span className="k">Notes</span>
                      <span className="v">{booking.notes}</span>
                    </div>
                  )}
                </div>
              </>
            )}

            <div className="bk-nav">
              <button
                type="button"
                className="bk-btn bk-btn-ghost"
                onClick={back}
                style={{ visibility: step === 0 ? 'hidden' : 'visible' }}
              >
                Back
              </button>
<button
                type="button"
                className="bk-btn bk-btn-primary"
                onClick={next}
                disabled={!canProceed() || submitting}
              >
                {submitting ? 'Submitting...' : step === STEPS.length - 1 ? 'Confirm Booking' : 'Continue'}
              </button>
            </div>
            {submitError && (
              <p style={{ color: 'var(--rose-deep)', textAlign: 'center', marginTop: '14px', fontSize: '.85rem' }}>
                {submitError}
              </p>
            )}
          </div>
        )}
      </div>
    </>
  )
}