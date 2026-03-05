"use client"

import { useEffect, useState, useCallback } from "react"
import { Calendar, MapPin, ArrowLeft, X } from "lucide-react"

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

interface Activity {
  id: number
  title: string
  date: string
  location: string
  description: string
  tag: string
  tag_color: string
  image_url: string | null
}

const DEFAULT_ACTIVITIES: Activity[] = [
  {
    id: 1,
    title: "ورشة عمل القانون الدولي الإنساني",
    date: "2026-03-15",
    location: "مسقط، سلطنة عُمان",
    description: "ورشة عمل متخصصة حول تطبيقات القانون الدولي الإنساني في النزاعات المعاصرة",
    tag: "ورشة عمل",
    tag_color: "primary",
    image_url: null,
  },
  {
    id: 2,
    title: "مؤتمر حماية المدنيين",
    date: "2026-04-22",
    location: "الدوحة، قطر",
    description: "مؤتمر إقليمي يجمع خبراء القانون الدولي لمناقشة آليات حماية المدنيين",
    tag: "مؤتمر",
    tag_color: "teal",
    image_url: null,
  },
  {
    id: 3,
    title: "دورة تدريبية للقوات المسلحة",
    date: "2026-05-10",
    location: "أبوظبي، الإمارات",
    description: "برنامج تدريبي مكثف لتأهيل أفراد القوات المسلحة على مبادئ القانون الإنساني",
    tag: "دورة تدريبية",
    tag_color: "primary",
    image_url: null,
  },
  {
    id: 4,
    title: "ندوة مصادر القانون الدولي",
    date: "2026-06-05",
    location: "الكويت",
    description: "ندوة أكاديمية حول مصادر القانون الدولي الإنساني: الاتفاقيات المكتوبة والعرف الدولي",
    tag: "ندوة",
    tag_color: "teal",
    image_url: null,
  },
]

function formatDate(dateStr: string) {
  try {
    return new Date(dateStr).toLocaleDateString("ar-OM", { day: "numeric", month: "long", year: "numeric" })
  } catch {
    return dateStr
  }
}

export default function ActivitiesSection() {
  const [activities, setActivities] = useState<Activity[]>(DEFAULT_ACTIVITIES)
  const [selected, setSelected] = useState<Activity | null>(null)

  useEffect(() => {
    fetch(`${API}/api/activities/`)
      .then(r => r.json())
      .then((data: Activity[]) => { if (data.length) setActivities(data) })
      .catch(() => {})
  }, [])

  const close = useCallback(() => setSelected(null), [])

  useEffect(() => {
    if (!selected) return
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") close() }
    window.addEventListener("keydown", handler)
    document.body.style.overflow = "hidden"
    return () => {
      window.removeEventListener("keydown", handler)
      document.body.style.overflow = ""
    }
  }, [selected, close])

  return (
    <section id="activities" className="relative py-24 lg:py-32 overflow-hidden animated-bg">
      <div className="absolute inset-0 geometric-pattern opacity-10" />
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-primary/6 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <span className="inline-block text-xs font-bold text-primary mb-4 tracking-[0.2em] uppercase">فعالياتنا</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground mb-6 text-balance">
            الأنشطة <span className="text-primary">والفعاليات</span>
          </h2>
          <div className="section-divider mx-auto max-w-sm mb-6" />
          <p className="mx-auto max-w-2xl text-muted-foreground leading-relaxed">
            نقدّم مجموعة متنوعة من الأنشطة والفعاليات التي تهدف إلى تعزيز المعرفة بالقانون الدولي الإنساني
          </p>
        </div>

        {/* Activities Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {activities.map((act, i) => (
            <div
              key={act.id ?? i}
              className="glass-card rounded-3xl group hover:scale-[1.02] hover:border-primary/25 transition-all duration-500 relative overflow-hidden"
            >
              {/* Activity Image */}
              {act.image_url ? (
                <div className="relative h-44 w-full overflow-hidden">
                  <img
                    src={act.image_url}
                    alt={act.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-card/80 to-transparent" />
                </div>
              ) : (
                <div className={`h-1 w-full ${
                  act.tag_color === "teal" ? "bg-linear-to-l from-transparent via-(--teal)/50 to-transparent" : "bg-linear-to-l from-transparent via-primary/50 to-transparent"
                }`} />
              )}

              <div className="p-7 lg:p-8">

              {/* Tag */}
              <div className="mb-5">
                <span className={`inline-block px-4 py-1.5 rounded-full text-xs font-semibold border ${
                  act.tag_color === "teal"
                    ? "bg-(--teal)/10 text-(--teal) border-(--teal)/20"
                    : "bg-primary/10 text-primary border-primary/20"
                }`}>
                  {act.tag}
                </span>
              </div>

              <h4 className="text-lg font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                {act.title}
              </h4>

              <p className="text-sm text-muted-foreground leading-[1.8] mb-6">{act.description}</p>

              <div className="flex flex-wrap items-center gap-5 text-xs text-muted-foreground mb-6">
                <span className="flex items-center gap-2">
                  <Calendar className="h-3.5 w-3.5 text-primary" />
                  {formatDate(act.date)}
                </span>
                <span className="flex items-center gap-2">
                  <MapPin className="h-3.5 w-3.5 text-primary" />
                  {act.location}
                </span>
              </div>

              <button
                onClick={() => setSelected(act)}
                className="flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all group/btn"
              >
                التفاصيل
                <ArrowLeft className="h-4 w-4 transition-transform group-hover/btn:-translate-x-1" />
              </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Activity Details Modal ── */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={close}
            aria-hidden="true"
          />

          {/* Modal Card */}
          <div className="relative w-full max-w-lg sm:max-w-xl bg-card border border-border/40 rounded-3xl shadow-2xl z-10 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Image or accent line */}
            {selected.image_url ? (
              <div className="relative h-52 w-full overflow-hidden">
                <img
                  src={selected.image_url}
                  alt={selected.title}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-card/70 to-transparent" />
              </div>
            ) : (
              <div className={`h-1 w-full ${
                selected.tag_color === "teal"
                  ? "bg-linear-to-l from-transparent via-(--teal)/60 to-transparent"
                  : "bg-linear-to-l from-transparent via-primary/60 to-transparent"
              }`} />
            )}

            <div className="p-6 sm:p-8">
              {/* Close button */}
              <button
                onClick={close}
                className="absolute top-5 left-5 flex h-8 w-8 items-center justify-center rounded-full bg-secondary/60 hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
                aria-label="إغلاق"
              >
                <X className="h-4 w-4" />
              </button>

              {/* Tag */}
              <div className="mb-4">
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border ${
                  selected.tag_color === "teal"
                    ? "bg-(--teal)/10 text-(--teal) border-(--teal)/20"
                    : "bg-primary/10 text-primary border-primary/20"
                }`}>
                  {selected.tag}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-xl sm:text-2xl font-extrabold text-foreground mb-4 leading-snug">
                {selected.title}
              </h3>

              {/* Meta */}
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-6">
                <span className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-primary shrink-0" />
                  {formatDate(selected.date)}
                </span>
                <span className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary shrink-0" />
                  {selected.location}
                </span>
              </div>

              {/* Divider */}
              <div className="h-px bg-border/40 mb-6" />

              {/* Description */}
              <p className="text-sm text-muted-foreground leading-loose">
                {selected.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
