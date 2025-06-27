"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { Dashboard } from "@/components/dashboard"

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState({ name: "Maria González" })

  const handleLogin = () => {
    setIsLoggedIn(true)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
  }

  return (
    <div className="min-h-screen bg-dark text-light">
      <Header isLoggedIn={isLoggedIn} onLogin={handleLogin} onLogout={handleLogout} />

      {!isLoggedIn ? <HeroSection onGetStarted={handleLogin} /> : <Dashboard user={user} />}
    </div>
  )
}
