import type { Metadata } from "next";

import { SITE_NAME, SOCIAL_IMAGE } from "./site-config";

/** Full per-page metadata: title, description, canonical URL, Open Graph and Twitter, all with the social image. */
export function buildMetadata({
  title,
  description,
  path,
  type = "website",
  socialTitle,
}: {
  title: string;
  /** Title for social cards. Defaults to the page title plus the site name. */
  socialTitle?: string;
  description: string;
  path: string;
  type?: "website" | "article";
}): Metadata {
  const og = socialTitle ?? `${title} | ${SITE_NAME}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      siteName: SITE_NAME,
      title: og,
      description,
      url: path,
      locale: "en_US",
      images: [SOCIAL_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: og,
      description,
      images: [{ url: SOCIAL_IMAGE.url, alt: SOCIAL_IMAGE.alt }],
    },
  };
}
