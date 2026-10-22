"use client"

import { useEffect } from "react"

// Marks [data-reveal] elements as shown when they scroll into view. The hidden
// starting state only applies under html.js-reveal, which this sets, so the
// page reads in full if the script never runs.
export function Reveal() {
  useEffect(() => {
    const root = document.documentElement
    root.classList.add("js-reveal")
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          // Also reveal anything already scrolled past, so a jump (an anchor link,
          // a restored scroll position) never leaves a section hidden above.
          if (!entry.isIntersecting && entry.boundingClientRect.top > 0) continue
          entry.target.setAttribute("data-shown", "")
          io.unobserve(entry.target)
        }
      },
      { rootMargin: "0px 0px -12% 0px" },
    )
    document.querySelectorAll("[data-reveal]").forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  return null
}
