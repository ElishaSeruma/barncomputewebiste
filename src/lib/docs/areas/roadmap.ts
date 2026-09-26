import { type AreaDef, cards, future, h2, note, p, page, section, table, ul } from "../types";

export const roadmap: AreaDef = {
  id: "roadmap",
  title: "Roadmap",
  tagline: "What is built, what is planned, and what is exploratory.",
  icon: "milestone",
  sections: [
    section("", "Roadmap", [
      page("overview", "Roadmap overview", "Barn is being built in layers.", [
        p("The foundation comes first: identity, trust, connectivity, availability and file exchange. Storage and compute build on it."),
        table(
          ["Stage", "Theme", "Status"],
          ["M1 Foundation", "Connect the Barn.", "In development"],
          ["M2 Distributed storage", "Make storage collaborative.", "Planned"],
          ["Compute", "Put the Barn to work.", "Future"],
          ["AI infrastructure", "Private hardware, coordinated intelligence.", "Future"]
        ),
        note("No dates are promised. Anything beyond the current milestone is planned or exploratory."),
        cards(
          { title: "M1 foundation", text: "What the first milestone delivers.", href: "/docs/roadmap/m1-foundation" },
          { title: "Distributed storage", text: "The next milestone.", href: "/docs/roadmap/m2-distributed-storage" }
        ),
      ], { badge: "Draft" }),
      page("m1-foundation", "M1: Foundation", "Barn creation, trusted membership and file exchange.", [
        ul(
          "Barn creation",
          "Node enrolment and explicit approval",
          "Persistent device identities",
          "Availability monitoring",
          "Communication between approved Nodes",
          "Managed files and explicit shares",
          "Verified, resumable transfers",
          "macOS and Windows support"
        ),
        note("These capabilities are in development and will be described as available only after they pass acceptance testing."),
      ], { badge: "Alpha" }),
      page("m2-distributed-storage", "M2: Distributed storage", "Storage that spreads across trusted Nodes.", [
        future("This is a planned direction, not a current feature.", "Planned"),
        p("The goal is for you to interact with the Barn while it decides where data lives, so you do not manage every physical location by hand."),
        h2("Ideas under consideration"),
        ul("Placing data on more than one Node.", "Recovering data when a Node is lost.", "Storage rules you control."),
      ], { badge: "Planned" }),
      page("compute", "Compute", "Using processing power across a Barn.", [
        future("Exploratory. Nothing here is built.", "Future"),
        p("Devices have processors, memory and GPUs that often sit idle. A Barn could coordinate suitable workloads across them, such as rendering or data processing."),
      ], { badge: "Future" }),
      page("ai", "AI infrastructure", "Private AI workloads on hardware you trust.", [
        future("Exploratory. Nothing here is built.", "Future"),
        p("Compatible Nodes could contribute to private AI workloads, for people who want more control over the machines doing the computation."),
      ], { badge: "Future" }),
      page("principles", "Design principles", "The ideas that guide what gets built.", [
        ul(
          "**Ownership first.** Start from hardware you control.",
          "**Explicit trust.** Membership and sharing are deliberate.",
          "**Local when possible.** Prefer direct connections.",
          "**Simple on top.** Complexity stays underneath.",
          "**Foundation before vision.** Separate what exists from what is planned."
        ),
      ], { badge: "Draft" }),
    ]),
  ],
};
