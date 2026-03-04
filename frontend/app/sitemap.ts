import type { MetadataRoute } from 'next'

const BASE_URL = 'https://dunant-institute.org'

export default function sitemap(): MetadataRoute.Sitemap {
  const sections = [
    { id: 'hero',         changeFrequency: 'monthly',  priority: 1.0 },
    { id: 'about',        changeFrequency: 'monthly',  priority: 0.9 },
    { id: 'vision',       changeFrequency: 'monthly',  priority: 0.8 },
    { id: 'goals',        changeFrequency: 'monthly',  priority: 0.8 },
    { id: 'services',     changeFrequency: 'weekly',   priority: 0.9 },
    { id: 'activities',   changeFrequency: 'weekly',   priority: 0.8 },
    { id: 'library',      changeFrequency: 'weekly',   priority: 0.8 },
    { id: 'ihl-sources',  changeFrequency: 'monthly',  priority: 0.7 },
    { id: 'media',        changeFrequency: 'weekly',   priority: 0.7 },
    { id: 'contact',      changeFrequency: 'yearly',   priority: 0.6 },
  ] as const

  return sections.map(({ id, changeFrequency, priority }) => ({
    url: `${BASE_URL}/#${id}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }))
}
