import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/dev/", "/dashboard"],
    },
    sitemap: `${process.env.NEXT_PUBLIC_SITE_URL ?? "https://soujunior.tech"}/sitemap.xml`,
  }
}
