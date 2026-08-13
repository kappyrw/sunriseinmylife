"use client"

import { useState } from "react"
import { Menu, X, Moon, Sun } from "lucide-react"
import { useLanguage } from "@/app/language-provider"
import { translations } from "@/lib/translations"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const { language, setLanguage } = useLanguage()
  const t = translations[language]

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle('dark')
  }

  const navItems = [
    { label: t.nav.about, href: "#about" },
    { label: t.nav.therapeutic, href: "#therapeutic" },
    { label: t.nav.support, href: "#support" },
    { label: t.nav.coaching, href: "#coaching" },
    { label: t.nav.contact, href: "#contact" },
  ]

  return (
    <nav className="border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-4 md:py-6">
          <div className="flex items-center justify-between">
            <div className="flex-1 flex justify-center md:flex-none md:justify-start">
              <div className="flex items-center justify-center w-24 h-24 md:w-28 md:h-28 rounded-full bg-black dark:bg-black shadow-2xl transition-colors duration-300 overflow-hidden">
                <img
                  src="/images/unrise-20in-20my-20life.png"
                  alt="Sunrise in my life"
                  className="h-[110px] md:h-[130px] w-auto filter sepia-[0.3] brightness-125 saturate-150 scale-125"
                />
              </div>
            </div>

            {/* Language Toggle & Theme Toggle - Hidden on mobile */}
            <div className="hidden md:flex items-center gap-4 ml-auto mr-8">
              {/* Language Toggle */}
              <div className="flex items-center bg-gradient-to-r from-purple-100 to-teal-100 dark:from-purple-900 dark:to-teal-900 rounded-md p-1 border border-purple-300 dark:border-purple-600 shadow-sm transition-colors duration-300">
                <button
                  onClick={() => setLanguage("fr")}
                  className={`px-4 py-1.5 rounded text-sm font-semibold transition-all duration-300 ${
                    language === "fr"
                      ? "bg-gradient-to-r from-purple-600 to-purple-500 text-white shadow-md"
                      : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                  }`}
                >
                  FRANÇAIS
                </button>
                <button
                  onClick={() => setLanguage("en")}
                  className={`px-4 py-1.5 rounded text-sm font-semibold transition-all duration-300 ${
                    language === "en"
                      ? "bg-gradient-to-r from-teal-600 to-teal-500 text-white shadow-md"
                      : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                  }`}
                >
                  ENGLISH
                </button>
              </div>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 border border-gray-300 dark:border-gray-600"
                aria-label="Toggle theme"
              >
                {isDarkMode ? (
                  <Sun className="w-5 h-5 text-yellow-500" />
                ) : (
                  <Moon className="w-5 h-5 text-gray-700" />
                )}
              </button>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex gap-8">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 text-sm font-semibold transition-colors duration-300 relative group"
                >
                  {item.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-teal-500 group-hover:w-full transition-all duration-300"></span>
                </a>
              ))}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 hover:bg-purple-100 dark:hover:bg-purple-900 rounded-lg transition-colors"
            >
              {isMenuOpen ? <X size={24} className="text-gray-900 dark:text-white" /> : <Menu size={24} className="text-gray-900 dark:text-white" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-4 space-y-3 border-t border-gray-200 dark:border-gray-700 pt-4 animate-slide-in-left">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="block text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 text-sm font-semibold transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              
              {/* Mobile Language & Theme Toggle */}
              <div className="flex gap-2 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => {
                    setLanguage("fr")
                    setIsMenuOpen(false)
                  }}
                  className={`px-3 py-1 rounded text-sm font-semibold transition-all ${
                    language === "fr" ? "bg-purple-600 text-white" : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
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
                    language === "en" ? "bg-teal-600 text-white" : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                  }`}
                >
                  EN
                </button>
                <button
                  onClick={() => {
                    toggleTheme()
                    setIsMenuOpen(false)
                  }}
                  className="px-3 py-1 rounded text-sm font-semibold bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 flex items-center gap-2"
                >
                  {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                  {isDarkMode ? 'Light' : 'Dark'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}