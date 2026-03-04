import Link from "next/link"
import { Home, Info, Target, BookOpen, Radio, Mail, ChevronLeft, Globe } from "lucide-react"

const tree = [
  {
    label: "الرئيسية",
    href: "/#hero",
    icon: Home,
    children: [],
  },
  {
    label: "عن المعهد",
    href: "/#about",
    icon: Info,
    children: [
      { label: "كلمة المدير العام", href: "/#director" },
      { label: "الرؤية والرسالة", href: "/#vision" },
      { label: "الأهداف", href: "/#goals" },
      { label: "الهيكل التنظيمي", href: "/#structure" },
      { label: "هيئة التدريب", href: "/#trainers" },
    ],
  },
  {
    label: "خدماتنا",
    href: "/#services",
    icon: Target,
    children: [
      { label: "المحاضرات", href: "/#lectures" },
      { label: "الدورات التدريبية", href: "/#courses" },
      { label: "المحاضرون والمدربون", href: "/#trainers-list" },
    ],
  },
  {
    label: "الأنشطة والفعاليات",
    href: "/#activities",
    icon: Globe,
    children: [],
  },
  {
    label: "المكتبة الرقمية",
    href: "/#library",
    icon: BookOpen,
    children: [
      { label: "الفيديوهات", href: "/#videos" },
      { label: "الصور", href: "/#gallery" },
      { label: "الكتب والمنشورات", href: "/#books" },
      { label: "البحوث والدراسات", href: "/#research" },
    ],
  },
  {
    label: "مصادر القانون الدولي الإنساني",
    href: "/#ihl-sources",
    icon: BookOpen,
    children: [
      { label: "الاتفاقيات المكتوبة", href: "/#conventions" },
      { label: "القانون العرفي", href: "/#customary-law" },
      { label: "السوابق القضائية", href: "/#case-law" },
    ],
  },
  {
    label: "الوسائط المتعددة",
    href: "/#media",
    icon: Radio,
    children: [],
  },
  {
    label: "تواصل معنا",
    href: "/#contact",
    icon: Mail,
    children: [],
  },
]

export default function SitemapPage() {
  return (
    <main className="min-h-screen bg-background" dir="rtl">
      {/* Header */}
      <div className="border-b border-border/30 bg-background/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <ChevronLeft className="h-4 w-4 rotate-180" />
            العودة إلى الرئيسية
          </Link>
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-md bg-primary/10 border border-primary/20 flex items-center justify-center">
              <Globe className="h-3.5 w-3.5 text-primary" />
            </div>
            <span className="text-sm font-bold text-foreground">خريطة الموقع</span>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16">
        {/* Page title */}
        <div className="text-center mb-16">
          <span className="inline-block text-xs font-bold text-primary mb-4 tracking-[0.2em] uppercase">
            معهد دونان للاستشارات والتدريب
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground mb-4">
            خريطة <span className="text-primary">الموقع</span>
          </h1>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            دليل شامل لجميع صفحات وأقسام موقع معهد دونان
          </p>
          <div className="mt-6 h-px w-24 mx-auto bg-gradient-to-l from-transparent via-primary to-transparent" />
        </div>

        {/* Root node */}
        <div className="flex flex-col items-center">
          {/* Root */}
          <div className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-primary text-primary-foreground font-bold text-base shadow-lg mb-0">
            <Home className="h-5 w-5" />
            <span>معهد دونان</span>
          </div>

          {/* Vertical connector from root */}
          <div className="w-px h-8 bg-border" />

          {/* Horizontal bar spanning all top-level nodes */}
          <div className="relative w-full">
            {/* Top horizontal line */}
            <div className="absolute top-0 right-[calc(100%/16)] left-[calc(100%/16)] h-px bg-border" />

            {/* Top-level nodes */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-0">
              {tree.map((node, i) => {
                const Icon = node.icon
                return (
                  <div key={i} className="flex flex-col items-center">
                    {/* Connector down from horizontal bar */}
                    <div className="w-px h-6 bg-border" />

                    {/* Parent node */}
                    <Link
                      href={node.href}
                      className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl border border-border bg-card hover:border-primary/40 hover:bg-primary/5 transition-all text-sm font-semibold text-foreground text-center group"
                    >
                      <Icon className="h-4 w-4 text-primary shrink-0" />
                      <span className="leading-tight">{node.label}</span>
                    </Link>

                    {/* Children */}
                    {node.children.length > 0 && (
                      <div className="flex flex-col items-center w-full mt-0">
                        <div className="w-px h-4 bg-border" />
                        <div className="w-full flex flex-col gap-1.5 border border-border/50 rounded-xl p-2 bg-secondary/20">
                          {node.children.map((child, j) => (
                            <Link
                              key={j}
                              href={child.href}
                              className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-muted-foreground hover:text-primary hover:bg-primary/5 transition-all"
                            >
                              <span className="inline-block w-1 h-1 rounded-full bg-primary/50 shrink-0" />
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Footer note */}
        <p className="text-center text-xs text-muted-foreground mt-16">
          جميع الحقوق محفوظة &copy; {new Date().getFullYear()} معهد دونان للاستشارات والتدريب
        </p>
      </div>
    </main>
  )
}
