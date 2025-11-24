"use client"

import { Facebook, Youtube, Instagram, Music } from "lucide-react"
import { useState } from "react"
import { translations } from "@/lib/translations"
import { LanguageProvider, useLanguage } from "./language-provider"
import { TypingText } from "@/components/typing-text"
import { Header } from "@/components/header"

function HomeContent() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showContactModal, setShowContactModal] = useState(false)
  const [contactForm, setContactForm] = useState({ name: "", phone: "", email: "", message: "", country: "", city: "" })
  const { language, setLanguage } = useLanguage()
  const t = translations[language]

  const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({
    therapeutic: false,
    support: false,
    coaching: false,
  })

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  const handleContactSubmit = (type: "whatsapp" | "email") => {
    const { name, phone, email, message, country, city } = contactForm

    if (!name || !phone || !email || !message || !country || !city) {
      alert(language === "fr" ? "Veuillez remplir tous les champs" : "Please fill all fields")
      return
    }

    const appointmentText =
      language === "fr"
        ? `Bonjour,\n\nJe m'appelle ${name}.\nMon numéro de téléphone: ${phone}\nMon email: ${email}\n\nVille: ${city}\nPays: ${country}\n\nMessage:\n${message}`
        : `Hello,\n\nMy name is ${name}.\nMy phone number: ${phone}\nMy email: ${email}\n\nCity: ${city}\nCountry: ${country}\n\nMessage:\n${message}`

    if (type === "whatsapp") {
      const encodedMessage = encodeURIComponent(appointmentText)
      window.open(`https://wa.me/250781718040?text=${encodedMessage}`, "_blank")
    } else {
      const subject = language === "fr" ? "Demande de rendez-vous" : "Appointment Request"
      window.location.href = `mailto:sunriseinmylife@sun.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(appointmentText)}`
    }

    setShowContactModal(false)
    setContactForm({ name: "", phone: "", email: "", message: "", country: "", city: "" })
  }

  const navItems = [
    { label: t.nav.about, href: "#about" },
    { label: t.nav.therapeutic, href: "#therapeutic" },
    { label: t.nav.support, href: "#support" },
    { label: t.nav.coaching, href: "#coaching" },
    { label: t.nav.contact, href: "#contact" },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <Header />

      {/* Hero Section with Image and Creative Title */}
      <section className="relative h-screen md:h-screen overflow-hidden bg-gray-100 flex items-center justify-center">
        <img
          src="/images/hero-wellness.jpg"
          alt="Wellness and healing journey"
          className="w-full h-full object-cover object-top animate-subtle-zoom image-hover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-black/20 to-transparent flex items-center justify-center">
          <div className="text-center">
            <h1
              className="text-5xl md:text-7xl font-light tracking-wide animate-hero-glow"
              style={{ color: "#F5E6D3" }}
            >
              <TypingText text="SUNRISE IN MY LIFE" speed={80} />
            </h1>
          </div>
        </div>
      </section>

      {/* Section Title - Minimal & Clean */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-5xl font-light text-gray-800 mb-6 tracking-tight animate-fade-in">
            {t.hero.title}
          </h2>
          <p className="text-base md:text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto animate-slide-up-text">
            {t.hero.subtitle}
          </p>
        </div>
      </section>

      {/* About Section with Side Image */}
      <section id="about" className="py-0 md:py-0 bg-white section-spacing">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-0">
            <div className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
              <h3 className="text-3xl md:text-4xl font-light text-gray-800 mb-8 animate-slide-up-text">
                {t.about.title}
              </h3>
              <div className="space-y-4">
                {t.about.content.map((paragraph, index) => (
                  <p
                    key={index}
                    className="text-gray-700 leading-relaxed text-sm md:text-base animate-slide-up-text"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
            <div className="relative h-96 md:h-auto md:min-h-[700px] overflow-hidden bg-gray-100">
              <img
                src="/images/coaching-visualization.jpg"
                alt="Professional woman"
                className="w-full h-full object-cover animate-image-pan image-hover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Therapeutic Section - Full Width Image */}
      <section id="therapeutic" className="relative section-spacing">
        <div className="relative h-screen md:h-[700px] bg-cover bg-center flex items-center overflow-hidden group">
          <img
            src="/images/therapeutic-session.jpg"
            alt="Therapeutic approach"
            className="absolute inset-0 w-full h-full object-cover object-center animate-image-parallax image-hover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/25 to-transparent"></div>
          <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <h3 className="text-3xl md:text-5xl font-light text-white mb-6 animate-slide-up-text">
              {t.therapeutic.title}
            </h3>
            <button
              onClick={() => {
                toggleSection("therapeutic")
              }}
              className="inline-block text-white border-2 border-white px-8 py-3 rounded-full hover:bg-white hover:text-gray-900 transition-all duration-300 font-semibold"
            >
              {expandedSections.therapeutic ? "✕ CLOSE" : "→ GO"}
            </button>
          </div>
        </div>

        {expandedSections.therapeutic && (
          <section className="py-16 md:py-24 bg-white border-b border-gray-100 section-reveal">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="mb-12">
                <h4 className="text-2xl md:text-3xl font-light text-gray-800 mb-8">{t.therapeutic.approach}</h4>
                <div className="space-y-6">
                  <div>
                    <h5 className="text-xl font-semibold text-gray-800 mb-4">{t.therapeutic.gestaltTitle}</h5>
                    <div className="space-y-4 text-gray-700">
                      {t.therapeutic.gestaltContent.map((paragraph, index) => (
                        <p key={index} className="leading-relaxed">
                          {paragraph}
                        </p>
                      ))}
                      <ul className="list-disc list-inside space-y-2 text-gray-700 mt-4">
                        {t.therapeutic.gestaltPoints.map((point, index) => (
                          <li key={index} className="leading-relaxed">
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-2xl md:text-3xl font-light text-gray-800 mb-8">{t.therapeutic.themesTitle}</h4>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {t.therapeutic.themes.map((theme, index) => (
                    <div
                      key={index}
                      className="p-4 bg-gray-50 border border-gray-200 hover:shadow-lg hover:scale-105 transition-all duration-300"
                    >
                      <p className="text-gray-800 font-medium">{theme}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-center mt-12 pt-8 border-t border-gray-200">
                <button
                  onClick={() => setShowContactModal(true)}
                  className="inline-block text-white bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 px-8 py-3 rounded-full transition-all duration-300 font-semibold shadow-lg hover:shadow-2xl hover:scale-105 transform hover:-translate-y-1"
                >
                  {language === "fr" ? "Demander un rendez-vous" : "Request an Appointment"}
                </button>
              </div>
            </div>
          </section>
        )}
      </section>

      {/* Support Section - Full Width Image */}
      <section id="support" className="relative section-spacing mt-8 md:mt-12">
        <div className="relative h-80 md:h-[550px] bg-cover bg-center flex items-center overflow-hidden group">
          <img
            src="/images/support-group.jpg"
            alt="Support and community"
            className="absolute inset-0 w-full h-full object-cover animate-image-parallax image-hover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/25 to-transparent"></div>
          <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <h3 className="text-3xl md:text-5xl font-light text-white mb-6 animate-slide-up-text">{t.support.title}</h3>
            <button
              onClick={() => toggleSection("support")}
              className="inline-block text-white border-2 border-white px-8 py-3 rounded-full hover:bg-white hover:text-gray-900 transition-all duration-300 font-semibold"
            >
              {expandedSections.support ? "✕ CLOSE" : "→ GO"}
            </button>
          </div>
        </div>

        {expandedSections.support && (
          <section className="py-16 md:py-24 bg-white border-b border-gray-100 section-reveal">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="mb-12 max-w-3xl">
                <p className="text-gray-700 leading-relaxed text-base mb-6">{t.support.intro}</p>
                <p className="text-gray-700 leading-relaxed text-base">{t.support.description}</p>
              </div>

              <div className="grid md:grid-cols-2 gap-12">
                <div className="bg-gray-50 p-6 border border-gray-200">
                  <h4 className="text-xl font-semibold text-gray-800 mb-6">{t.support.formats}</h4>
                  <ul className="space-y-3 text-gray-700">
                    {t.support.formatsList.map((item, index) => (
                      <li key={index} className="flex items-start gap-3 leading-relaxed">
                        <span className="text-gray-800 font-bold">◆</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-gray-50 p-6 border border-gray-200">
                  <h4 className="text-xl font-semibold text-gray-800 mb-6">{t.support.themesTitle}</h4>
                  <ul className="space-y-2 text-gray-700 text-sm">
                    {t.support.themesList.map((item, index) => (
                      <li key={index} className="leading-relaxed">
                        ◆ {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-12 pt-12 border-t border-gray-200 bg-gray-50 p-6">
                <h4 className="text-xl font-semibold text-gray-800 mb-6">{t.support.groupTitle}</h4>
                <ul className="space-y-2 text-gray-700">
                  {t.support.groupList.map((item, index) => (
                    <li key={index} className="leading-relaxed">
                      ◆ {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex justify-center mt-12 pt-8 border-t border-gray-200">
                <button
                  onClick={() => setShowContactModal(true)}
                  className="inline-block text-white bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 px-8 py-3 rounded-full transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-2xl hover:scale-105 transform hover:-translate-y-1"
                >
                  {language === "fr" ? "Demander un rendez-vous" : "Request an Appointment"}
                </button>
              </div>
            </div>
          </section>
        )}
      </section>

      {/* Coaching Section - Full Width Image */}
      <section id="coaching" className="relative section-spacing mt-8 md:mt-12">
        <div className="relative h-screen md:h-screen bg-cover bg-center flex items-center overflow-hidden group">
          <img
            src="/images/coaching-visualization.jpg"
            alt="Coaching and visualization"
            className="absolute inset-0 w-full h-full object-cover object-top animate-image-parallax image-hover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/25 to-transparent"></div>
          <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <h3 className="text-3xl md:text-4xl font-light text-white mb-6 animate-slide-up-text">
              {t.coaching.title}
            </h3>
            <button
              onClick={() => toggleSection("coaching")}
              className="inline-block text-white border-2 border-white px-8 py-3 rounded-full hover:bg-white hover:text-gray-900 transition-all duration-300 font-semibold"
            >
              {expandedSections.coaching ? "✕ CLOSE" : "→ GO"}
            </button>
          </div>
        </div>

        {expandedSections.coaching && (
          <section className="py-16 md:py-24 bg-white border-b border-gray-100 section-reveal">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid md:grid-cols-3 gap-8">
                {t.coaching.items.map((item, index) => (
                  <div
                    key={index}
                    className="p-6 bg-gray-50 border border-gray-200 hover:shadow-lg hover:scale-105 transition-all duration-300"
                  >
                    <h4 className="text-lg font-semibold text-gray-800 mb-3">{item.title}</h4>
                    <p className="text-gray-700 leading-relaxed">{item.description}</p>
                  </div>
                ))}
              </div>

              <div className="flex justify-center mt-12 pt-8 border-t border-gray-200">
                <button
                  onClick={() => setShowContactModal(true)}
                  className="inline-block text-white bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 px-8 py-3 rounded-full transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-2xl hover:scale-105 transform hover:-translate-y-1"
                >
                  {language === "fr" ? "Demander un rendez-vous" : "Request an Appointment"}
                </button>
              </div>
            </div>
          </section>
        )}
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 md:py-24 bg-white border-b border-gray-100">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-3xl md:text-4xl font-light text-gray-800 mb-12">{t.contact.title}</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <button
              onClick={() => setShowContactModal(true)}
              className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-2xl hover:scale-105 transform hover:-translate-y-1"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371 0-.57 0-.198 0-.52.075-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-4.255.949c-1.283.542-2.432 1.309-3.405 2.202-.973.892-1.679 1.9-2.133 3.012C1.75 10.751 1.521 11.925 1.521 13.129c0 1.201.23 2.375.682 3.51.452 1.134 1.157 2.14 2.133 3.032.973.891 2.122 1.898 2.133 3.032.451 1.135.682 2.309.682 3.51 0-1.205-.23-2.379-.682-3.513-.455-1.113-1.16-2.12-2.133-3.012-.973-.893-2.122-1.66-3.405-2.202-1.282-.542-2.655-.949-4.255-.949z" />
              </svg>
              {t.contact.whatsapp}
            </button>
            <button
              onClick={() => setShowContactModal(true)}
              className="bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-800 hover:to-gray-900 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-2xl hover:scale-105 transform hover:-translate-y-1"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              {t.contact.email}
            </button>
          </div>
        </div>
      </section>

      {/* Contact Modal */}
      {showContactModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 animate-fade-in">
            <h2 className="text-2xl font-light text-gray-800 mb-6">
              {language === "fr" ? "Demande de rendez-vous" : "Appointment Request"}
            </h2>

            <div className="space-y-4 mb-6">
              <input
                type="text"
                placeholder={language === "fr" ? "Votre nom" : "Your name"}
                value={contactForm.name}
                onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <input
                type="tel"
                placeholder={language === "fr" ? "Votre téléphone" : "Your phone"}
                value={contactForm.phone}
                onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <input
                type="email"
                placeholder={language === "fr" ? "Votre email" : "Your email"}
                value={contactForm.email}
                onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <textarea
                placeholder={
                  language === "fr"
                    ? "Votre message (ex: Je souhaite un rendez-vous le...)"
                    : "Your message (e.g., I would like an appointment...)"
                }
                value={contactForm.message}
                onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 resize-none h-24"
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder={language === "fr" ? "Ville" : "City"}
                  value={contactForm.city}
                  onChange={(e) => setContactForm({ ...contactForm, city: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <input
                  type="text"
                  placeholder={language === "fr" ? "Pays" : "Country"}
                  value={contactForm.country}
                  onChange={(e) => setContactForm({ ...contactForm, country: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => handleContactSubmit("whatsapp")}
                className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371 0-.57 0-.198 0-.52.075-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-4.255.949c-1.283.542-2.432 1.309-3.405 2.202-.973.892-1.679 1.9-2.133 3.012C1.75 10.751 1.521 11.925 1.521 13.129c0 1.201.23 2.375.682 3.51.452 1.134 1.157 2.14 2.133 3.032.973.891 2.122 1.898 2.133 3.032.451 1.135.682 2.309.682 3.51 0-1.205-.23-2.379-.682-3.513-.455-1.113-1.16-2.12-2.133-3.012-.973-.893-2.122-1.66-3.405-2.202-1.282-.542-2.655-.949-4.255-.949z" />
                </svg>
                WhatsApp
              </button>
              <button
                onClick={() => handleContactSubmit("email")}
                className="flex-1 bg-gray-700 hover:bg-gray-800 text-white py-2 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                {language === "fr" ? "Email" : "Email"}
              </button>
            </div>

            <button
              onClick={() => setShowContactModal(false)}
              className="w-full mt-4 text-gray-600 hover:text-gray-800 font-semibold transition-colors"
            >
              {language === "fr" ? "Fermer" : "Close"}
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <p className="font-semibold text-lg">{t.footer.name}</p>
            <p className="text-sm mt-2 text-gray-400">{t.footer.location}</p>
            <p className="text-xs mt-4 text-gray-500">{t.footer.ethics}</p>
          </div>

          <div className="flex justify-center gap-6 mt-8 pt-8 border-t border-gray-700">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-600 transition-colors duration-300"
              aria-label="Facebook"
            >
              <Facebook size={24} />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-red-600 transition-colors duration-300"
              aria-label="YouTube"
            >
              <Youtube size={24} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-pink-600 transition-colors duration-300"
              aria-label="Instagram"
            >
              <Instagram size={24} />
            </a>
            <a
              href="https://tiktok.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-black transition-colors duration-300"
              aria-label="TikTok"
            >
              <Music size={24} />
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default function Home() {
  return (
    <LanguageProvider>
      <HomeContent />
    </LanguageProvider>
  )
}
