"use client"

import { useState, useEffect } from "react"
import { Send, MessageCircle } from "lucide-react"
import { useLanguage } from "@/app/language-provider"

interface Comment {
  id: string
  name: string
  message: string
  timestamp: number
  language: string
}

const STORAGE_KEY = "sunrise_comments"
const MAX_COMMENT_LENGTH = 500
const MAX_NAME_LENGTH = 50

export function CommentSection() {
  const { language } = useLanguage()
  const [comments, setComments] = useState<Comment[]>([])
  const [name, setName] = useState("")
  const [message, setMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        setComments(parsed)
      } catch {
        setComments([])
      }
    }
  }, [])

  const saveComments = (updated: Comment[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
    setComments(updated)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !message.trim()) return

    setIsSubmitting(true)

    const newComment: Comment = {
      id: Date.now().toString(),
      name: name.trim().substring(0, MAX_NAME_LENGTH),
      message: message.trim().substring(0, MAX_COMMENT_LENGTH),
      timestamp: Date.now(),
      language,
    }

    const updated = [newComment, ...comments]
    saveComments(updated)
    setName("")
    setMessage("")
    setIsSubmitting(false)
  }

  const formatTime = (ts: number) => {
    const date = new Date(ts)
    if (language === "fr") {
      return date.toLocaleDateString("fr-FR", {
        day: "numeric",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
      })
    }
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const t = {
    title: language === "fr" ? "Espace Commentaires" : "Comments",
    subtitle:
      language === "fr"
        ? "Partagez vos pensées et vos expériences. Vos commentaires restent confidentiels."
        : "Share your thoughts and experiences. Your comments remain confidential.",
    namePlaceholder: language === "fr" ? "Votre nom" : "Your name",
    messagePlaceholder: language === "fr" ? "Votre message..." : "Your message...",
    submit: language === "fr" ? "Envoyer" : "Send",
    noComments:
      language === "fr" ? "Aucun commentaire pour le moment." : "No comments yet.",
    writeFirst:
      language === "fr" ? "Soyez le premier à commenter!" : "Be the first to comment!",
  }

  return (
    <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-8">
          <MessageCircle className="w-6 h-6 text-gray-800 dark:text-gray-200" />
          <h3 className="text-3xl md:text-4xl font-light text-gray-800 dark:text-gray-100">
            {t.title}
          </h3>
        </div>

        <p className="text-gray-600 dark:text-gray-400 mb-8">{t.subtitle}</p>

        <form onSubmit={handleSubmit} className="space-y-4 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder={t.namePlaceholder}
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={MAX_NAME_LENGTH}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              required
            />
            <input
              type="text"
              placeholder={t.messagePlaceholder}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              maxLength={MAX_COMMENT_LENGTH}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting || !name.trim() || !message.trim()}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-2.5 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 transform disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            <Send className="w-4 h-4" />
            {t.submit}
          </button>
        </form>

        <div className="space-y-4">
          {comments.length === 0 ? (
            <div className="text-center py-12">
              <MessageCircle className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
              <p className="text-gray-500 dark:text-gray-400">{t.noComments}</p>
              <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">
                {t.writeFirst}
              </p>
            </div>
          ) : (
            comments.map((comment) => (
              <div
                key={comment.id}
                className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4 transition-colors duration-300"
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex-shrink-0 flex items-center justify-center text-white font-semibold text-sm">
                    {comment.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-baseline gap-2">
                      <span className="font-semibold text-gray-800 dark:text-gray-200">
                        {comment.name}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {formatTime(comment.timestamp)}
                      </span>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 mt-1 leading-relaxed">
                      {comment.message}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  )
}
