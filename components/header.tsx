"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"
import { useLanguage } from "@/app/language-provider"
import { translations } from "@/lib/translations"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { language, setLanguage } = useLanguage()
  const t = translations[language]

  const navItems = [
    { label: t.nav.about, href: "#about" },
    { label: t.nav.therapeutic, href: "#therapeutic" },
    { label: t.nav.support, href: "#support" },
    { label: t.nav.coaching, href: "#coaching" },
    { label: t.nav.contact, href: "#contact" },
  ]

  return (
    <nav className="border-b border-gray-200 sticky top-0 z-50 bg-white/95 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-4 md:py-6">
          <div className="flex items-center justify-between">
            <div className="flex-1 flex justify-center md:flex-none md:justify-start">
              <div className="flex items-center justify-center w-20 h-20 md:w-24 md:h-24 rounded-full bg-black shadow-2xl">
                <img
                  src="/images/unrise-20in-20my-20life.png"
                  alt="Sunrise in my life"
                  className="h-16 md:h-20 w-auto filter sepia-[0.3] brightness-125 saturate-150"
                />
              </div>
            </div>

            {/* Language Toggle - Hidden on mobile */}
            <div className="hidden md:flex items-center bg-gradient-to-r from-purple-100 to-teal-100 rounded-md p-1 border border-purple-300 shadow-sm ml-auto mr-8">
              <button
                onClick={() => setLanguage("fr")}
                className={`px-4 py-1.5 rounded text-sm font-semibold transition-all duration-300 ${
                  language === "fr"
                    ? "bg-gradient-to-r from-purple-600 to-purple-500 text-white shadow-md"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                FR
              </button>
              <button
                onClick={() => setLanguage("en")}
                className={`px-4 py-1.5 rounded text-sm font-semibold transition-all duration-300 ${
                  language === "en"
                    ? "bg-gradient-to-r from-teal-600 to-teal-500 text-white shadow-md"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                EN
              </button>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex gap-8">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-gray-700 hover:text-purple-600 text-sm font-semibold transition-colors duration-300 relative group"
                >
                  {item.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-teal-500 group-hover:w-full transition-all duration-300"></span>
                </a>
              ))}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 hover:bg-purple-100 rounded-lg transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-4 space-y-3 border-t border-gray-200 pt-4 animate-slide-in-left">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="block text-gray-700 hover:text-purple-600 text-sm font-semibold transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => {
                    setLanguage("fr")
                    setIsMenuOpen(false)
                  }}
                  className={`px-3 py-1 rounded text-sm font-semibold transition-all ${
                    language === "fr" ? "bg-purple-600 text-white" : "bg-gray-100 text-gray-700"
                  }`}
                >
                  FR
                </button>
                <button
                  onClick={() => {
                    setLanguage("en")
                    setIsMenuOpen(false)
                  }}
                  className={`px-3 py-1 rounded text-sm font-semibold transition-all ${
                    language === "en" ? "bg-teal-600 text-white" : "bg-gray-100 text-gray-700"
                  }`}
                >
                  EN
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}
