import { MetadataRoute } from "next";
import { i18n } from "../i18n-config";

const SITE_URL = "https://joao-guimaraes.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return i18n.locales.map((locale) => ({
    url: `${SITE_URL}/${locale}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 1,
  }));
}
