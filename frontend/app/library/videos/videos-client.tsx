"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { ArrowRight, Film, X, Play } from "lucide-react"

const videos = [
  {
    id: "h800ZRlmEWY",
    title: "الجزء الأول — القانون الدولي الإنساني",
    part: "الجزء الأول",
    num: "01",
  },
  {
    id: "EP0peIzFPpo",
    title: "الجزء الثاني — القانون الدولي الإنساني",
    part: "الجزء الثاني",
    num: "02",
  },
  {
    id: "sAyNyBQtq_s",
    title: "الجزء الثالث — القانون الدولي الإنساني",
    part: "الجزء الثالث",
    num: "03",
  },
]

export default function VideosClient() {
  const [activeId, setActiveId] = useState<string | null>(null)

  const close = useCallback(() => setActiveId(null), [])

  // Close on Escape key
  useEffect(() => {
    if (!activeId) return
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") close() }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [activeId, close])

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = activeId ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [activeId])

  return (
    <main className="min-h-screen bg-background text-foreground">

      {/* ── Sticky Top Bar ── */}
      <div className="border-b border-border/40 bg-card/70 backdrop-blur-md sticky top-0 z-40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between gap-4">
          <Link
            href="/#library"
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors shrink-0"
          >
            <ArrowRight className="h-4 w-4" />
            <span className="hidden xs:inline">العودة إلى المكتبة</span>
            <span className="xs:hidden">رجوع</span>
          </Link>
          <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <Film className="h-4 w-4 text-primary shrink-0" />
            <span>المكتبة الرقمية — معهد دونان</span>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">

        {/* ── Page Header ── */}
        <div className="text-center mb-12 sm:mb-16">
          <span className="inline-block text-xs font-bold text-primary mb-3 tracking-[0.2em] uppercase">
            المكتبة الرقمية
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground mb-5">
            الفيديوهات <span className="text-primary">التعليمية</span>
          </h1>
          <div className="mx-auto w-24 h-0.5 bg-linear-to-r from-transparent via-primary to-transparent mb-5" />
          <p className="mx-auto max-w-xl text-sm sm:text-base text-muted-foreground leading-relaxed px-4">
            سلسلة فيديوهات تعليمية متخصصة في مبادئ وقواعد القانون الدولي الإنساني
          </p>
        </div>

        {/* ── Video Thumbnail Grid ── */}
        <div className="grid gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {videos.map((video) => (
            <button
              key={video.id}
              onClick={() => setActiveId(video.id)}
              className="group text-right rounded-2xl overflow-hidden border border-border/40 bg-card hover:border-primary/40 transition-all duration-400 hover:shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 w-full"
              aria-label={`تشغيل ${video.title}`}
            >
              {/* Thumbnail */}
              <div className="relative aspect-video bg-black overflow-hidden">
                {/* YouTube maxres thumbnail */}
                <img
                  src={`https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`}
                  alt={video.title}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    // Fallback to hqdefault if maxres not available
                    const t = e.currentTarget
                    if (!t.src.includes("hqdefault")) {
                      t.src = `https://img.youtube.com/vi/${video.id}/hqdefault.jpg`
                    }
                  }}
                />
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-300" />

                {/* Play button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-primary/90 group-hover:bg-primary group-hover:scale-110 transition-all duration-300 shadow-[0_0_24px_rgba(0,0,0,0.6)]">
                    <Play className="h-6 w-6 sm:h-7 sm:w-7 text-white fill-white translate-x-0.5" />
                  </div>
                </div>

                {/* Part badge */}
                <div className="absolute top-3 right-3">
                  <span className="text-[11px] font-bold text-white bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded-full border border-white/20">
                    {video.part}
                  </span>
                </div>

                {/* Number watermark */}
                <div className="absolute bottom-3 left-3 text-4xl font-extrabold text-white/10 leading-none select-none">
                  {video.num}
                </div>
              </div>

              {/* Card Info */}
              <div className="p-4 sm:p-5 flex items-center gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 border border-primary/20 group-hover:bg-primary/20 transition-colors">
                  <Film className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                    {video.title}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">القانون الدولي الإنساني</p>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* ── Back Link ── */}
        <div className="mt-12 sm:mt-16 text-center">
          <Link
            href="/#library"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowRight className="h-4 w-4" />
            <span>العودة إلى المكتبة الرقمية</span>
          </Link>
        </div>
      </div>

      {/* ── Video Lightbox Modal ── */}
      {activeId && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-10"
          role="dialog"
          aria-modal="true"
          aria-label="مشغّل الفيديو"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/85 backdrop-blur-sm"
            onClick={close}
            aria-hidden="true"
          />

          {/* Modal Content */}
          <div className="relative w-full max-w-xs sm:max-w-2xl md:max-w-4xl lg:max-w-5xl xl:max-w-6xl z-10 animate-in fade-in zoom-in-95 duration-200">
            {/* Close Button */}
            <button
              onClick={close}
              className="absolute -top-10 sm:-top-12 left-0 flex items-center gap-1.5 text-white/70 hover:text-white transition-colors text-sm"
              aria-label="إغلاق"
            >
              <X className="h-5 w-5" />
              <span>إغلاق</span>
            </button>

            {/* Video Title */}
            <p className="absolute -top-10 sm:-top-12 right-0 text-sm font-semibold text-white/80 truncate max-w-[60%]">
              {videos.find(v => v.id === activeId)?.title}
            </p>

            {/* iframe container */}
            <div className="relative aspect-video w-full rounded-xl sm:rounded-2xl overflow-hidden shadow-[0_24px_80px_rgba(0,0,0,0.8)] border border-white/10">
              <iframe
                key={activeId}
                src={`https://www.youtube.com/embed/${activeId}?autoplay=1&rel=0`}
                title={videos.find(v => v.id === activeId)?.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                allowFullScreen
                className="absolute inset-0 h-full w-full"
              />
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
