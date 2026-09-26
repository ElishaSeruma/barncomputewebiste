// Central place for site identity. Set NEXT_PUBLIC_SITE_URL when a real domain is attached.
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://barn-computing-website.vercel.app").replace(/\/$/, "");

export const SITE_NAME = "Barn Computing";
export const SITE_TAGLINE = "Your Devices. One Barn.";

export const SITE_TITLE = `${SITE_NAME} | ${SITE_TAGLINE}`;

export const SITE_DESCRIPTION =
  "Barn Computing is building a private computing network that lets trusted devices communicate, share data, and grow into distributed storage and compute infrastructure.";

// Canonical public description, reused by llms.txt and the press kit.
export const SITE_SUMMARY =
  "Barn Computing is a private distributed computing platform that connects trusted, user-controlled devices into a coordinated network called a Barn. Each approved device becomes a Node. The first Barn foundation focuses on trusted device membership, connectivity, availability, and authorised file exchange between supported computers. Over time, Barn is intended to build on that foundation with distributed storage and compute capabilities, allowing the hardware users already control to operate more like shared private infrastructure.";

export const SOCIAL_IMAGE = {
  url: "/social.png",
  width: 2940,
  height: 1602,
  alt: "Barn Computing: BARN in large yellow letters with the tagline Your devices. One Barn.",
};

export function absoluteUrl(path: string) {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
