import type { Metadata } from "next"
import VideosClient from "./videos-client"

export const metadata: Metadata = {
  title: "الفيديوهات التعليمية | مكتبة معهد دونان",
  description: "مقاطع فيديو تعليمية في القانون الدولي الإنساني — معهد دونان للاستشارات والتدريب",
}

export default function VideosPage() {
  return <VideosClient />
}
