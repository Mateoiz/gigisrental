'use client'

import { Suspense } from 'react'
import Navbar from '@/app/components/Navbar'
import Footer from '@/app/components/Footer'
import BookingForm from '@/app/components/BookingForm'

export default function BookingPage() {
  return (
    <>
      <Navbar />
      <div style={{ paddingTop: '88px', minHeight: '70vh' }}>
        <Suspense fallback={null}>
          <BookingForm />
        </Suspense>
      </div>
      <Footer />
    </>
  )
}