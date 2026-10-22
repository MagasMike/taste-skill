"use client"

import * as React from "react"

import { WorksWheel, type WorksWheelItem } from "@/components/ui/works-wheel"

// WorksWheel takes over the mouse wheel as soon as the pointer is over it. On a long
// page that happens while the wheel is still half off screen, so the page stops
// scrolling with the wheel cut in two. This gate lets wheel events through to the
// stage only once the whole wheel is on screen (give or take SLACK); until then
// they never reach it and the page scrolls on.
const SLACK = 0.12

export function DishWheel({ items, label, action }: { items: WorksWheelItem[]; label: string; action: string }) {
  const ref = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const el = ref.current
    if (!el) return
    const gate = (event: WheelEvent) => {
      const { top, bottom } = el.getBoundingClientRect()
      const slack = window.innerHeight * SLACK
      if (top < -slack || bottom > window.innerHeight + slack) event.stopPropagation()
    }
    el.addEventListener("wheel", gate, { capture: true, passive: true })
    return () => el.removeEventListener("wheel", gate, { capture: true })
  }, [])

  return (
    <div ref={ref} className="dish-wheel mx-auto h-[72svh] min-h-[26rem] max-w-6xl px-5 md:h-[min(86svh,70vw)] md:px-12">
      <WorksWheel items={items} label={label} action={action} className="bg-card" />
    </div>
  )
}
