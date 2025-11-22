"use client"

import { useEffect, useState } from "react"

interface TypingTextProps {
  text: string
  speed?: number
  className?: string
}

export function TypingText({ text, speed = 100, className = "" }: TypingTextProps) {
  const [displayedText, setDisplayedText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isDeleting) {
        // Typing phase
        if (currentIndex < text.length) {
          setDisplayedText((prev) => prev + text[currentIndex])
          setCurrentIndex((prev) => prev + 1)
        } else {
          // After typing completes, start deleting
          setIsDeleting(true)
        }
      } else {
        // Deleting phase
        if (currentIndex > 0) {
          setDisplayedText((prev) => prev.slice(0, -1))
          setCurrentIndex((prev) => prev - 1)
        } else {
          // After deleting completes, start typing again
          setIsDeleting(false)
        }
      }
    }, speed)

    return () => clearTimeout(timer)
  }, [currentIndex, text, speed, isDeleting])

  return (
    <span className={className}>
      {displayedText}
      <span className="animate-pulse">|</span>
    </span>
  )
}
