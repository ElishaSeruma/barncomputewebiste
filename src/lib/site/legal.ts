import { h2, note, p, ul, warn } from "@/lib/docs/types";
import type { MarketingPage } from "./types";

// Placeholders. Final legal text must be written and reviewed before launch.
export const privacy: MarketingPage = {
  path: "/legal/privacy",
  title: "Privacy",
  description: "Placeholder privacy notice for the Barn Computing website. Final text will be published before launch.",
  hero: {
    eyebrow: "Legal",
    badge: "Placeholder",
    title: "Privacy, in {plain terms.}",
    description: "This page will hold the privacy notice for the website and, later, the product. The text below is a placeholder and is not a legal document.",
  },
  sections: [
    {
      t: "prose",
      blocks: [
        warn("Placeholder content. This page has not been reviewed by counsel and must be replaced before launch.", "Not final"),
        h2("What this page will cover"),
        ul(
          "What information the website collects, if any, and why.",
          "How the contact form is handled once it is connected.",
          "What the software does and does not send off your devices.",
          "How long anything is kept, and how to ask for it to be removed.",
          "Who to contact with privacy questions."
        ),
        h2("How Barn is designed"),
        p("Barn is built around devices you own. Files move directly between your devices and are not sent through a central service. The coordinator you run keeps metadata such as device identities and share records on your own machine."),
        note("This describes design intent for the alpha and is not a commitment about future services."),
        h2("The website"),
        p("The website is a preview. The contact form does not send or store anything yet."),
        h2("Questions"),
        p("A contact address will be added here. In the meantime, use the [contact page](/contact)."),
      ],
    },
  ],
};

export const terms: MarketingPage = {
  path: "/legal/terms",
  title: "Terms",
  description: "Placeholder terms for the Barn Computing website and alpha software. Final text will be published before launch.",
  hero: {
    eyebrow: "Legal",
    badge: "Placeholder",
    title: "Terms of {use.}",
    description: "This page will hold the terms for the website and the software. The text below is a placeholder and is not a legal document.",
  },
  sections: [
    {
      t: "prose",
      blocks: [
        warn("Placeholder content. This page has not been reviewed by counsel and must be replaced before launch.", "Not final"),
        h2("What this page will cover"),
        ul(
          "The licence under which the software is offered. It has not been chosen yet.",
          "Acceptable use of the website and software.",
          "Warranties and limits of liability, particularly for alpha releases.",
          "How the terms can change.",
          "Governing law and how to contact us."
        ),
        h2("Alpha software"),
        p("The first releases of Barn are alpha. They may change, contain defects and lose data. Do not rely on them for anything you cannot afford to lose, and keep your own backups."),
        h2("No promises about the roadmap"),
        p("Features described as Planned, Future or Exploring are intentions and ideas. They are not commitments, and no dates are promised."),
        h2("Questions"),
        p("Use the [contact page](/contact) until a dedicated address is published."),
      ],
    },
  ],
};
