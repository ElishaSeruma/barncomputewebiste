import { about, contact, faq, press, roadmap } from "./company";
import { developers, openSource } from "./developers";
import { privacy, terms } from "./legal";
import { productIndex, products } from "./products";
import { solutions, solutionsIndex } from "./solutions";
import type { MarketingPage } from "./types";

export { getPost, getRelatedPosts, posts } from "./blog";

export const blogIndex: MarketingPage = {
  path: "/blog",
  title: "Blog",
  description: "Notes on Barn's design decisions, progress and the ideas behind them.",
  hero: {
    eyebrow: "Blog",
    title: "Notes from the {barn.}",
    description: "Design decisions, progress and the reasoning behind them. Posts are drafts for now and will be replaced with the real ones before launch.",
    primary: { label: "Read the announcement", href: "/blog/introducing-barn" },
    secondary: { label: "See the roadmap", href: "/roadmap" },
  },
  sections: [{ t: "blog" }],
};

export { about, contact, developers, faq, openSource, press, privacy, productIndex, roadmap, solutionsIndex, terms };
export { products, solutions };
