'use client'

import { useState, useRef, useEffect } from 'react'
import ChatInterface from '@/components/ChatInterface'
import Header from '@/components/Header'

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <ChatInterface />
    </main>
  )
}

