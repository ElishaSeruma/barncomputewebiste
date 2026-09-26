import type { MarketingPage } from "./types";

export const developers: MarketingPage = {
  path: "/developers",
  title: "Developers",
  description: "Build on Barn: a command line first platform with stable identifiers, JSON output and documented limits.",
  hero: {
    eyebrow: "Developers",
    badge: "Alpha",
    title: "Build on a foundation you can {inspect.}",
    description:
      "Barn is command line first, documented as it grows, and designed to be tested in isolation. Everything you can do by hand, you can do in a script.",
    primary: { label: "Quickstart", href: "/docs/start/quickstart" },
    secondary: { label: "CLI reference", href: "/docs/cli/overview" },
    visual: "terminal",
      code: {
        "file": "install-and-share.sh",
        "lines": [
          "# 1. Install into a clean environment",
          "python3.12 -m venv .venv-barn",
          "source .venv-barn/bin/activate",
          "",
          "# 2. Create a Barn and start it",
          "barn coordinator init --name TestBarn --advertise 192.168.1.10",
          "barn coordinator start --bind 0.0.0.0 --port 8443",
          "",
          "# 3. Share a file with one Node",
          "barn file add ./build.tar --json",
          "barn share create <FILE_ID> --to <NODE_ID> --ttl 10m"
        ],
        "steps": [
          {
            "line": 2,
            "text": "An isolated virtual environment keeps your system Python clean."
          },
          {
            "line": 6,
            "text": "Generates the Barn's identity and prints a fingerprint to verify."
          },
          {
            "line": 10,
            "text": "Import the file. JSON output is easy to parse."
          },
          {
            "line": 11,
            "text": "Share it with exactly one Node, for a limited time."
          }
        ]
      },
  },
  sections: [
    {
      t: "features",
      eyebrow: "Why developers like it",
      title: "The boring parts done carefully.",
      variant: "bento",
      items: [
        { icon: "terminal", title: "One tool", text: "The barn command covers the coordinator, Nodes, files, shares, transfers and diagnostics, with help text on every command." },
        { icon: "code", title: "Machine readable", text: "JSON output and stable identifiers mean scripts do not have to parse prose." },
        { icon: "list", title: "Errors you can switch on", text: "Distinct categories for offline, unauthorised, expired, corrupt, disk full and version mismatch." },
        { icon: "layers", title: "Isolated by design", text: "State directories, ports and secrets are separate per instance, so you can run a whole Barn on one machine for tests." },
        { icon: "wrench", title: "A diagnostic that is safe to share", text: "barn doctor --json redacts secrets, so it can go straight into an issue or a build log." },
        { icon: "book", title: "Docs that track the code", text: "Concepts, commands, limits and error codes are documented, and marked draft until final." },
      ],
    },
    {
      t: "steps",
      eyebrow: "Zero to scripted",
      title: "From install to a repeatable setup.",
      steps: [
        { title: "Install into a clean environment", text: "Barn is an alpha package. Use a virtual environment so nothing leaks into your system Python.", code: "python3.12 -m venv .venv-barn\nsource .venv-barn/bin/activate" },
        { title: "Create a Barn and a Node", text: "Use separate state directories to run more than one on the same machine.", code: "barn coordinator init --name TestBarn --advertise 127.0.0.1 --state-dir ./coord\nbarn node init --name TestNode --advertise 127.0.0.1 --state-dir ./node" },
        { title: "Script the exchange", text: "Import, share and fetch, with JSON output where you want to parse the result.", code: "barn file add ./build.tar --json\nbarn share create <FILE_ID> --to <NODE_ID> --ttl 10m --json" },
        { title: "Gate on the doctor", text: "Run diagnostics in CI and fail on anything unexpected.", code: "barn doctor --json" },
      ],
    },
    {
      t: "cards",
      eyebrow: "Docs and reference",
      title: "Everything is written down.",
      cols: 3,
      items: [
        { icon: "rocket", title: "Quickstart", text: "Connect two devices and share a file.", href: "/docs/start/quickstart" },
        { icon: "terminal", title: "CLI reference", text: "Every command, flag and exit code.", href: "/docs/cli/overview" },
        { icon: "book", title: "Core concepts", text: "Barns, Nodes, managed files, shares and transfers.", href: "/docs/start/concepts/barns" },
        { icon: "list", title: "Error codes", text: "What each error means and what to do.", href: "/docs/reference/errors" },
        { icon: "file", title: "Changelog", text: "What changed in each release.", href: "/docs/reference/changelog" },
        { icon: "git", title: "Open source", text: "Source, issues and contributing.", href: "/developers/open-source" },
      ],
    },
    {
      t: "isnot",
      eyebrow: "What is public today",
      title: "Be clear about the surface area.",
      isTitle: "Stable enough to build on",
      isNotTitle: "Not offered yet",
      is: ["The command line and its JSON output.", "Documented limits and error categories.", "Opaque, stable identifiers."],
      isnot: ["A public HTTP API.", "SDKs or client libraries.", "Plugins, webhooks or event streams."],
    },
    {
      t: "faq",
      title: "Developer questions",
      items: [
        { q: "Which languages and platforms are supported?", a: "Barn is a Python package for Python 3.11 and 3.12 on macOS and Windows. You drive it from the command line, so your own tooling can be in any language." },
        { q: "Will command names and flags change?", a: "It is an alpha. Flags and output may change between releases, and the changelog will say when." },
        { q: "Can I contribute?", a: "Contribution details will be published with the source. See the open source page for what we plan to share." },
        { q: "How do I report a bug?", a: "Attach the output of barn doctor --json. It contains no secrets." },
      ],
    },
    {
      t: "cta",
      title: "Build something",
      subtitle: "on private infrastructure.",
      text: "Start with the quickstart, then read the CLI reference. Tell us what you would want to script.",
      primary: { label: "Open the quickstart", href: "/docs/start/quickstart" },
      secondary: { label: "Tell us your use case", href: "/contact" },
      badges: ["CLI first", "JSON output"],
    },
  ],
};

export const openSource: MarketingPage = {
  path: "/developers/open-source",
  title: "Open source",
  description: "What we plan to share publicly, how to contribute, and how to report issues. Details will be published before launch.",
  hero: {
    eyebrow: "Developers",
    badge: "Details coming",
    title: "Source and contributing, as we get {there.}",
    description:
      "We plan to share more of Barn as it matures. This page sets out what we intend to publish and in what order. Repository links, a licence and contribution guidelines will appear here before launch.",
    primary: { label: "Read the docs", href: "/docs" },
    secondary: { label: "Contact us", href: "/contact" },
  },
  sections: [
    {
      t: "timeline",
      eyebrow: "Openness, in order",
      title: "What we plan to share, and when.",
      text: "We prefer to say what is true today over promising what is not.",
      items: [
        { when: "Today", title: "Documentation", text: "Concepts, commands, limits and error codes are published in the docs, marked as draft until final.", status: "now", bullets: ["Quickstart", "CLI reference", "Error codes"] },
        { when: "Before launch", title: "Repository and licence", text: "A public repository, an issue tracker and a chosen licence. The licence has not been selected yet.", status: "next", bullets: ["Source code", "Issue tracker", "Licence"] },
        { when: "After", title: "Contribution guidelines", text: "How to propose changes, run the tests and follow the project's conventions.", status: "later", bullets: ["Contributing guide", "Code of conduct", "Release process"] },
      ],
    },
    {
      t: "features",
      eyebrow: "In the meantime",
      title: "How you can help today.",
      variant: "spotlight",
      items: [
        { icon: "wrench", title: "Try the alpha", text: "Follow the quickstart on two machines and tell us where it was confusing." },
        { icon: "message", title: "Share your setup", text: "Tell us about the devices and networks you would like to use Barn with." },
        { icon: "shield", title: "Report security concerns responsibly", text: "A disclosure address will be published. Please do not post suspected vulnerabilities publicly." },
      ],
    },
    {
      t: "faq",
      title: "About the source",
      items: [
        { q: "What licence will Barn use?", a: "It has not been chosen. It will be announced with the repository." },
        { q: "Is the code available now?", a: "Not publicly yet. Repository details will be published before launch." },
        { q: "Can I build a plugin?", a: "There is no plugin system in the first milestone." },
      ],
    },
    {
      t: "cta",
      title: "Watch this space",
      subtitle: "for the repository.",
      text: "We will announce the repository and licence on the blog first.",
      primary: { label: "Read the blog", href: "/blog" },
      secondary: { label: "Back to developers", href: "/developers" },
      badges: ["Coming soon"],
    },
  ],
};
