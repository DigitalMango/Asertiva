"use client"

import { Button } from "@/components/ui/button"

interface HeaderProps {
  isLoggedIn: boolean
  onLogin: () => void
  onLogout: () => void
}

export function Header({ isLoggedIn, onLogin, onLogout }: HeaderProps) {
  return (
    <header className="border-b border-gray-800 bg-dark/95 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-accent-blue to-accent-gray rounded-lg flex items-center justify-center">
              <span className="text-dark font-bold text-sm">A</span>
            </div>
            <span className="text-xl font-semibold text-light">Asertiva</span>
          </div>

          <div>
            {!isLoggedIn ? (
              <Button
                onClick={onLogin}
                className="bg-accent-blue hover:bg-accent-blue/90 text-dark font-medium transition-all duration-200 hover:scale-105"
              >
                Login
              </Button>
            ) : (
              <Button
                onClick={onLogout}
                variant="outline"
                className="border-accent-gray text-accent-gray hover:bg-accent-gray hover:text-dark transition-all duration-200"
              >
                Logout
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
