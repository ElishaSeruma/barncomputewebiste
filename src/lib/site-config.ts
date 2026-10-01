// Central place for site identity. Set NEXT_PUBLIC_SITE_URL when a real domain is attached.
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://barn-computing-website.vercel.app").replace(/\/$/, "");

export const SITE_NAME = "Barn Computing";
export const SITE_TAGLINE = "Your Devices. One Barn.";

export const SITE_TITLE = `${SITE_NAME} | ${SITE_TAGLINE}`;

export const SITE_DESCRIPTION =
  "Barn Computing is a pre-alpha private device network for trusted macOS and Windows machines, starting with explicit membership and verified file exchange.";

// Canonical public description, reused by llms.txt and the press kit.
export const SITE_SUMMARY =
  "Barn Computing connects trusted, user-controlled devices into a private coordinated network called a Barn. Each approved device becomes a Node. The current barnCompute 0.1.0a1 TestPyPI pre-alpha focuses on trusted device membership, availability, managed files, explicit recipient-scoped shares, and verified resumable file exchange between supported macOS and Windows computers. M1 acceptance remains under closure review, while M2 is planned as a storage fabric with Bays, encrypted fragments, placement, retrieval, and repair.";

export const SOCIAL_IMAGE = {
  url: "/social.png",
  width: 2940,
  height: 1602,
  alt: "Barn Computing: BARN in large yellow letters with the tagline Your devices. One Barn.",
};

export function absoluteUrl(path: string) {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
