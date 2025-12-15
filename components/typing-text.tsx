"use client"

import { useEffect, useState } from "react"

interface TypingTextProps {
  text: string
  speed?: number
  className?: string
}

export function TypingText({
  text,
  speed = 100,
  className = "",
}: TypingTextProps) {
  const [displayed, setDisplayed] = useState("")
  const [direction, setDirection] = useState<"typing" | "deleting">("typing")

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (direction === "typing") {
        if (displayed.length < text.length) {
          setDisplayed(text.slice(0, displayed.length + 1))
        } else {
          setDirection("deleting")
        }
      } else {
        if (displayed.length > 0) {
          setDisplayed(text.slice(0, displayed.length - 1))
        } else {
          setDirection("typing")
        }
      }
    }, speed)

    return () => clearTimeout(timeout)
  }, [displayed, direction, text, speed])

  return (
    <span className={className}>
      {displayed}
      <span className="animate-pulse">|</span>
    </span>
  )
}
