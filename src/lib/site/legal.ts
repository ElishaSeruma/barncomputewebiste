import { h2, note, p, ul, warn } from "@/lib/docs/types";
import type { MarketingPage } from "./types";

// Plain-language product notices for the pre-alpha website. Counsel-reviewed
// legal documents should replace these before any production commercial launch.
export const privacy: MarketingPage = {
  path: "/legal/privacy",
  title: "Privacy",
  description: "Privacy notes for the Barn Computing pre-alpha website and local-first software model.",
  hero: {
    eyebrow: "Legal",
    badge: "Pre-alpha notice",
    title: "Privacy, in {plain terms.}",
    description: "How the website and current barnCompute design treat contact details, device metadata and file contents during the pre-alpha period.",
  },
  sections: [
    {
      t: "prose",
      blocks: [
        warn("This is a product notice for a pre-alpha project, not a counsel-reviewed privacy policy.", "Pre-alpha"),
        h2("What this page covers"),
        ul(
          "What the website is intended to collect during the pre-alpha period.",
          "How the contact form should be treated until backend processing is connected.",
          "What the current barnCompute CLI does and does not send off your devices.",
          "Which metadata exists inside a Barn you operate yourself.",
          "How to ask questions while formal support channels are still being prepared."
        ),
        h2("How Barn is designed"),
        p("Barn is built around devices you own or are permitted to use. In the M1 design, file bytes move between approved Nodes rather than through a hosted Barn service. The coordinator you run keeps metadata such as Barn identity, Node identities, shares, grants, transfer records and audit events on your own machine."),
        note("A separately deployed relay may be used for restricted-network transport, but it is not a Barn authority and must not receive node private keys, coordinator admin tokens or plaintext file bytes."),
        h2("The website"),
        p("The website describes the pre-alpha project. Contact form handling depends on the deployment configuration; do not include secrets, private keys, invite codes, local admin tokens or sensitive file contents in a message."),
        h2("The package"),
        p("The current package is `barnCompute==0.1.0a1` on TestPyPI. It is a command-line alpha for people comfortable testing local infrastructure. It is not a hosted account service."),
        h2("Questions"),
        p("Use the [contact page](/contact) for non-sensitive questions about the project, setup and roadmap."),
      ],
    },
  ],
};

export const terms: MarketingPage = {
  path: "/legal/terms",
  title: "Terms",
  description: "Pre-alpha use notes for the Barn Computing website and barnCompute package.",
  hero: {
    eyebrow: "Legal",
    badge: "Pre-alpha notice",
    title: "Terms of {use.}",
    description: "Important use notes for the website and the `barnCompute` pre-alpha package.",
  },
  sections: [
    {
      t: "prose",
      blocks: [
        warn("This is a practical pre-alpha notice, not a counsel-reviewed terms document.", "Pre-alpha"),
        h2("What this page covers"),
        ul(
          "How to think about the website and alpha package while formal terms are prepared.",
          "The limits of TestPyPI pre-alpha releases.",
          "Why roadmap pages are not commitments.",
          "What not to put into issue reports, contact forms or public logs.",
          "Where to ask project questions."
        ),
        h2("Alpha software"),
        p("`barnCompute==0.1.0a1` is a TestPyPI pre-alpha. Interfaces, commands, storage layout, protocol details and behavior may change. Do not rely on it for files you cannot afford to lose, and keep independent backups."),
        h2("Security-sensitive material"),
        p("Never share Barn private keys, local admin tokens, invite codes, relay credentials, state directories, unredacted logs or sensitive file contents through the website, public issues or chat channels."),
        h2("No promises about the roadmap"),
        p("Features described as Planned, Future or Exploring are design direction. M2 distributed storage, compute and AI infrastructure are not current shipped capabilities, and no dates are promised."),
        h2("Questions"),
        p("Use the [contact page](/contact) for non-sensitive questions about the project."),
      ],
    },
  ],
};
