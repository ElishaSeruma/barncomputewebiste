import type { MarketingPage, Section } from "./types";

const cta = (title: string, subtitle: string): Section => ({
  t: "cta",
  title,
  subtitle,
  text: "Barn is in active development. Follow along as the foundation takes shape.",
  primary: { label: "Read the docs", href: "/docs" },
  secondary: { label: "Talk to us", href: "/contact" },
  badges: ["Private by design", "macOS + Windows"],
});

export const about: MarketingPage = {
  path: "/about",
  title: "About",
  description: "Why Barn Computing exists, what we believe, and how we plan to build it.",
  hero: {
    eyebrow: "About",
    title: "A different way to think about personal computing {infrastructure.}",
    description:
      "People increasingly own several capable computers, and those computers rarely behave like one coherent resource. Barn is our attempt to change that, starting with the parts that have to be right.",
    primary: { label: "Read the announcement", href: "/blog/introducing-barn" },
    secondary: { label: "See the roadmap", href: "/roadmap" },
    visual: "network",
  },
  sections: [
    {
      t: "split",
      eyebrow: "The observation",
      title: "Useful hardware, working as islands.",
      text: "Barn began with a simple observation. Many everyday computing workflows assume that data and computation should travel through centralised infrastructure before they can be useful somewhere else. Yet the machines on your desk and in your drawer are powerful, and mostly idle. We wanted to see what happens when they are treated as a system.",
      bullets: [
        "Start from hardware you already own.",
        "Make membership and sharing deliberate.",
        "Let devices talk directly where they can.",
      ],
      visual: "network",
    },
    {
      t: "tabs",
      eyebrow: "What we believe",
      title: "Five principles behind every decision.",
      tabs: [
        { label: "Ownership first", icon: "home", title: "Begin with hardware you control", text: "Barn starts with devices that belong to you, your household, your team or your organisation, or that you have permission to use.", bullets: ["No strangers using your machines.", "No requirement to rent someone else's computers.", "Infrastructure grows out of what you already have."], visual: "homelab" },
        { label: "Explicit trust", icon: "shield", title: "Nothing joins or shares silently", text: "A device does not become part of a Barn because it is nearby. A file is not shared because two devices belong to the same Barn. Every step is a decision.", bullets: ["Approval before membership.", "Sharing named to one recipient.", "Revocation at any time."], visual: "nodes" },
        { label: "Local when possible", icon: "transfer", title: "Prefer the direct path", text: "When two of your devices can reach each other, Barn lets them, rather than sending everything through a central middleman.", bullets: ["Files travel directly between devices.", "The coordinator authorises but does not carry data.", "Restricted networks are on the roadmap."], visual: "transfer" },
        { label: "Simple on top", icon: "sparkles", title: "Complexity underneath, clarity above", text: "Distributed systems are hard. Using them should not be. We aim for a small vocabulary and clear states, so the interface is understandable.", bullets: ["Barn, Node, managed file, share, transfer.", "Three states with three colours.", "Errors that tell you what to do."], visual: "availability" },
        { label: "Foundation first", icon: "layers", title: "Separate what exists from what is planned", text: "We are careful to keep today's capabilities apart from the long term vision. If it is not built and tested, we say so.", bullets: ["Labels like Planned and Future.", "Acceptance tests before claims.", "No absolute promises about security."], visual: "storage" },
      ],
    },
    {
      t: "isnot",
      eyebrow: "Being clear",
      title: "What Barn is, and is not.",
      is: [
        "A private distributed computing platform being built from trusted, user controlled devices.",
        "A coordinated network of approved devices called a Barn.",
        "Focused first on membership, connectivity, availability and file exchange.",
        "Headed toward distributed storage and compute.",
      ],
      isnot: [
        "A traditional cloud drive.",
        "A public peer-to-peer file sharing network.",
        "A cryptocurrency or blockchain project.",
        "A finished distributed AI platform.",
      ],
    },
    {
      t: "features",
      eyebrow: "How we work",
      title: "Building in layers, and saying so.",
      variant: "spotlight",
      items: [
        { icon: "filecheck", title: "Tested before claimed", text: "Real machines, real files, an interruption in the middle and a matching checksum at the end. That is the bar for the foundation." },
        { icon: "book", title: "Documented as we go", text: "Concepts, commands, limits and errors are written down alongside the code, and marked as draft until they are final." },
        { icon: "message", title: "Open to conversation", text: "We would like to hear how you would use Barn, and where the model does not fit." },
      ],
    },
    {
      t: "cards",
      eyebrow: "Go deeper",
      title: "Where to read more.",
      cols: 3,
      items: [
        { icon: "map", title: "Roadmap", text: "The layers we are building, in order.", href: "/roadmap" },
        { icon: "news", title: "Blog", text: "Notes on design decisions and progress.", href: "/blog" },
        { icon: "message", title: "Contact", text: "Tell us about your setup.", href: "/contact" },
      ],
    },
    cta("Turn hardware you control", "into infrastructure you can use."),
  ],
};

export const roadmap: MarketingPage = {
  path: "/roadmap",
  title: "Roadmap",
  description: "The layers Barn is being built in, from the 0.1.0a1 M1 foundation toward M2 storage, compute and AI. No dates are promised.",
  hero: {
    eyebrow: "Roadmap",
    badge: "No dates promised",
    title: "Built in {layers,} in the open.",
    description:
      "Barn starts with the parts every later capability depends on. The current public artifact is `barnCompute==0.1.0a1` on TestPyPI; later layers are labelled as planned or future until they are built and verified.",
    primary: { label: "Read the docs", href: "/docs/roadmap/overview" },
    secondary: { label: "Follow the blog", href: "/blog" },
    visual: "storage",
  },
  sections: [
    {
      t: "timeline",
      eyebrow: "The layers",
      title: "From foundation to infrastructure.",
      text: "Each layer builds on the one before it. We will not describe a later layer as available until it has been built and verified.",
      items: [
        {
          when: "Now",
          title: "M1: Foundation",
          text: "Connect the Barn. Create a private network, admit trusted devices, watch availability, import managed files, create explicit shares and exchange files with verified resumable transfers.",
          status: "now",
          bullets: ["TestPyPI 0.1.0a1", "Node enrolment and approval", "Persistent device identities", "Availability monitoring", "Managed files and explicit shares", "Verified, resumable transfers", "macOS and Windows evidence"],
        },
        {
          when: "Next",
          title: "M2: Distributed storage",
          text: "Make storage collaborative. Add BRG observations, NBO decision ledgers, Bays, encrypted fragments, placement, location-independent retrieval and repair.",
          status: "next",
          bullets: ["Bays and logical files", "Encrypted fragments", "Placement NBO", "DT-NBO", "Resilience NBO and repair"],
        },
        {
          when: "Later",
          title: "Compute",
          text: "Put the Barn to work. Explore scheduling suitable workloads across the resources a Barn has available.",
          status: "later",
          bullets: ["Task splitting and scheduling", "Rendering and data processing", "Private services"],
        },
        {
          when: "Later",
          title: "AI infrastructure",
          text: "Private hardware, coordinated intelligence. Explore how compatible Nodes could contribute to private AI workloads.",
          status: "later",
          bullets: ["Open model workloads", "Private inference", "Verified movement of model files"],
        },
      ],
    },
    {
      t: "features",
      eyebrow: "Alongside the layers",
      title: "Things we are also exploring.",
      variant: "spotlight",
      items: [
        { icon: "wifi", title: "Restricted networks", text: "Relay data transport exists in the M1 work, but complete public-Wi-Fi operation still needs an outbound-only coordinator control path that keeps the relay non-authoritative.", tag: "Closure gate" },
        { icon: "rocket", title: "Running as a service", text: "Start the coordinator and agent at login without keeping a terminal open.", tag: "Planned" },
        { icon: "lock", title: "Encryption at rest", text: "Protecting managed files on disk, built alongside the storage milestone.", tag: "Planned" },
        { icon: "monitor", title: "More platforms", text: "Beyond macOS and Windows. No commitments yet.", tag: "Exploring" },
        { icon: "list", title: "A friendlier interface", text: "A visual way to see and manage a Barn.", tag: "Exploring" },
        { icon: "book", title: "Public developer material", text: "More of the engineering documentation, once it is ready.", tag: "Exploring" },
      ],
    },
    {
      t: "faq",
      title: "About the roadmap",
      items: [
        { q: "When will distributed storage arrive?", a: "We do not give dates. The M2 specification is written around Bays, encrypted fragments, placement, retrieval and repair, and it depends on the M1 closure gates." },
        { q: "Will everything on this page be built?", a: "Not necessarily. Planned items are intentions, and exploratory items are ideas. Priorities change as we learn." },
        { q: "How will I know what is available?", a: "Pages name the current TestPyPI pre-alpha separately from M1 closure evidence, M2 planned work and future directions." },
        { q: "Can I influence it?", a: "Yes. Tell us about your setup through the contact page." },
      ],
    },
    cta("Watch it take shape", "one layer at a time."),
  ],
};

export const faq: MarketingPage = {
  path: "/faq",
  title: "FAQ",
  description: "Answers to common questions about Barn, trust, files, networking and the roadmap.",
  hero: {
    eyebrow: "FAQ",
    title: "Questions, {answered.}",
    description: "Short, honest answers about what Barn is, how it treats your devices and files, and where it is going. Cannot find yours? Ask us.",
    primary: { label: "Contact us", href: "/contact" },
    secondary: { label: "Read the docs", href: "/docs" },
  },
  sections: [
    {
      t: "faqgroups",
      groups: [
        {
          title: "About Barn",
          items: [
            { q: "What is Barn Computing?", a: "Barn Computing is a private distributed computing platform that connects trusted, user controlled devices into a coordinated network called a Barn. The first foundation focuses on trusted membership, connectivity, availability and authorised file exchange between supported computers." },
            { q: "What is a Barn, and what is a Node?", a: "A Barn is a private group of approved devices. A Node is one approved device inside it." },
            { q: "Is Barn cloud storage?", a: "Not in the traditional sense. Barn is a private distributed computing layer for trusted devices. Storage is one part of the larger direction, alongside communication and compute." },
            { q: "Is Barn a blockchain or cryptocurrency project?", a: "No. Barn does not need blockchain or cryptocurrency to explain its core model." },
            { q: "Is Barn an AI product?", a: "Barn is broader than AI. Its core is private distributed infrastructure. AI is one future workload category." },
          ],
        },
        {
          title: "Trust and security",
          items: [
            { q: "Do all my devices join automatically?", a: "No. Each device must be deliberately added and approved before it becomes a Node." },
            { q: "Does joining a Barn share every file on my computer?", a: "No. Files must be imported into Barn's managed environment and then explicitly shared with one Node at a time." },
            { q: "Can strangers use my computer through Barn?", a: "No. Barn is built around explicitly trusted and approved devices rather than an open public network." },
            { q: "Is Barn perfectly secure?", a: "No system is. Barn is designed around explicit trust and verified transfers, and we avoid absolute claims. The coordinator is an administrative authority, and other processes running as your own user are outside Barn's isolation boundary." },
            { q: "Are my files encrypted on disk?", a: "Not yet. Encryption at rest is planned. Use full disk encryption from your operating system in the meantime." },
          ],
        },
        {
          title: "Files and sharing",
          items: [
            { q: "How do I share a file?", a: "Import it into managed storage, then create a share that names one recipient Node and a lifetime. The recipient fetches it." },
            { q: "Is there a file size limit?", a: "The default maximum is 512 MiB per file, configurable within documented bounds." },
            { q: "What happens if a transfer is interrupted?", a: "Barn resumes from the chunks it already verified. It does not start again." },
            { q: "How do I know the file arrived intact?", a: "Every chunk and the final file are checked against recorded checksums before the file is exported." },
          ],
        },
        {
          title: "Platforms and networking",
          items: [
            { q: "Which platforms does Barn support?", a: "macOS and Windows are the first desktop targets." },
            { q: "Do my devices need to be on the same Wi-Fi?", a: "Today they need trusted network reachability for coordinator control and direct peer transfer. The relay work is real, but full public-Wi-Fi operation remains a closure gate until coordinator control can also use an outbound-only path." },
            { q: "Do I need to open ports on my router?", a: "No. Barn is built for your local network and does not open router ports." },
            { q: "Does Barn run on Linux or phones?", a: "Not in the first milestone." },
          ],
        },
        {
          title: "Roadmap and availability",
          items: [
            { q: "Is distributed storage available now?", a: "No. The first milestone focuses on the networking and file exchange foundation. Distributed storage is planned and described as such." },
            { q: "Can Barn combine the computing power of my devices?", a: "That is a longer term direction. It is not a current capability." },
            { q: "How much does it cost?", a: "Pricing has not been announced. The first releases are alpha." },
            { q: "How can I try it?", a: "Read the quickstart in the docs. The first release is an alpha for people comfortable with a command line." },
          ],
        },
      ],
    },
    cta("Still curious?", "Ask us anything."),
  ],
};

export const press: MarketingPage = {
  path: "/press",
  title: "Press",
  description: "Press kit for Barn Computing: logo, colours, key facts and a boilerplate description.",
  hero: {
    eyebrow: "Press",
    title: "Everything you need to write about {Barn.}",
    description: "A boilerplate you can copy, the logo, the colour palette and the key facts, in one place. Announcements will appear here and on the blog.",
    primary: { label: "Contact the team", href: "/contact" },
    secondary: { label: "Read the blog", href: "/blog" },
  },
  sections: [
    { t: "press" },
    {
      t: "features",
      eyebrow: "Story angles",
      title: "What makes Barn worth a conversation.",
      variant: "spotlight",
      items: [
        { icon: "home", title: "Infrastructure from what you own", text: "Turning the machines people already have into a private coordinated network, without renting anything." },
        { icon: "shield", title: "Trust that is explicit", text: "No silent joining and no default sharing. Every step is a deliberate decision." },
        { icon: "layers", title: "Foundation before vision", text: "A candid, layered roadmap that separates what is built from what is planned." },
      ],
    },
    cta("Have a question", "for the team?"),
  ],
};

export const contact: MarketingPage = {
  path: "/contact",
  title: "Contact",
  description: "Get in touch with the Barn Computing team about early access, partnerships, press or security.",
  hero: {
    eyebrow: "Contact",
    title: "Let us {talk.}",
    description: "Tell us about your setup, ask a question, or say how you would like to use Barn. We read everything, and it shapes what gets built.",
    primary: { label: "Read the FAQ", href: "/faq" },
    secondary: { label: "See the roadmap", href: "/roadmap" },
  },
  sections: [
    { t: "contact" },
    {
      t: "faq",
      title: "Before you write",
      items: [
        { q: "Can I try Barn today?", a: "The first release is an alpha for people comfortable with a command line. Start with the quickstart in the docs." },
        { q: "Do you offer support?", a: "Support channels have not been set up yet. The docs include troubleshooting and a built in diagnostic tool." },
        { q: "Where do I report a security issue?", a: "A dedicated disclosure address will be published before launch. Please do not post details of a suspected vulnerability publicly." },
        { q: "Are you hiring?", a: "Nothing to announce yet." },
      ],
    },
  ],
};
