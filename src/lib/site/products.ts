import type { FeatureItem, MarketingPage, Section } from "./types";

// Shared link cards so every product page can point at its neighbours.
const LINKS = {
  barns: { icon: "network", title: "Barns", text: "A private network of trusted devices.", href: "/product/barns" },
  nodes: { icon: "laptop", title: "Nodes", text: "Approved devices with their own identity.", href: "/product/nodes" },
  availability: { icon: "activity", title: "Availability", text: "See which devices are online, right now.", href: "/product/availability" },
  files: { icon: "drive", title: "Managed files", text: "Bring files into your Barn on purpose.", href: "/product/managed-files" },
  sharing: { icon: "share", title: "Sharing", text: "Explicit, per device, time limited access.", href: "/product/sharing" },
  transfers: { icon: "transfer", title: "Transfers", text: "Verified, resumable file exchange.", href: "/product/transfers" },
  storage: { icon: "database", title: "Distributed storage", text: "Data spread across trusted devices.", href: "/product/distributed-storage", tag: "Future" },
  compute: { icon: "cpu", title: "Compute", text: "Put idle processing power to work.", href: "/product/compute", tag: "Future" },
  ai: { icon: "sparkles", title: "AI infrastructure", text: "Private AI on hardware you trust.", href: "/product/ai", tag: "Future" },
} satisfies Record<string, FeatureItem & { href: string }>;

type LinkKey = keyof typeof LINKS;

const related = (...keys: LinkKey[]): Section => ({
  t: "cards",
  eyebrow: "Keep exploring",
  title: "More from the platform",
  cols: 3,
  items: keys.map((k) => LINKS[k]),
});

const cta = (title: string, subtitle: string): Section => ({
  t: "cta",
  title,
  subtitle,
  text: "Barn is in active development. Read the docs, follow the roadmap and watch the foundation take shape.",
  primary: { label: "Read the docs", href: "/docs" },
  secondary: { label: "See the roadmap", href: "/roadmap" },
  badges: ["Private by design", "macOS + Windows"],
});

const DEVICES: Section = {
  t: "marquee",
  label: "Built for the hardware you already own",
  items: [
    { label: "MacBook", icon: "laptop" },
    { label: "Windows desktop", icon: "monitor" },
    { label: "Home server", icon: "server" },
    { label: "Workstation", icon: "cpu" },
    { label: "Spare laptop", icon: "laptop" },
    { label: "Mini PC", icon: "server" },
    { label: "Gaming rig", icon: "monitor" },
    { label: "Office desktop", icon: "monitor" },
  ],
};

export const productIndex: MarketingPage = {
  path: "/product",
  title: "Product",
  description: "Barn turns the devices you trust into a private network that can communicate, share data, and grow into storage and compute.",
  hero: {
    eyebrow: "Product",
    badge: "0.1.0a1 pre-alpha",
    title: "Everything your devices need to {work as one.}",
    description:
      "Barn is a foundation for turning separate computers into one private, coordinated environment. Start with trusted membership, live availability and verified file exchange. Grow toward storage and compute.",
    primary: { label: "Read the quickstart", href: "/docs/start/quickstart" },
    secondary: { label: "See the roadmap", href: "/roadmap" },
    visual: "network",
  },
  sections: [
    DEVICES,
    {
      t: "features",
      eyebrow: "The foundation",
      title: "Six building blocks, one trusted network.",
      text: "The first milestone is about making devices identify, trust, reach and coordinate with each other reliably. Each block below has its own page.",
      variant: "bento",
      items: [
        { ...LINKS.barns },
        { ...LINKS.nodes },
        { ...LINKS.availability },
        { ...LINKS.files },
        { ...LINKS.sharing },
        { ...LINKS.transfers },
      ],
    },
    {
      t: "stats",
      eyebrow: "Alpha defaults",
      title: "The numbers that shape everyday use.",
      items: [
        { value: 1, suffix: " MiB", label: "Chunk size", note: "Every chunk is verified on its own." },
        { value: 5, suffix: " s", label: "Heartbeat", note: "How often a Node reports in." },
        { value: 30, suffix: " min", label: "Transfer permission", note: "A short lived, renewable window." },
        { value: 512, suffix: " MiB", label: "File size limit", note: "The default. It is configurable." },
      ],
    },
    {
      t: "split",
      eyebrow: "How it fits together",
      title: "A coordinator for trust. Direct paths for data.",
      text: "One computer runs the coordinator, which keeps the Barn's identity, registry and share records. Files never pass through it. When you fetch a file, your device connects straight to the device that owns it, with permission the coordinator issued.",
      bullets: [
        "Membership and authorisation live in one place you control.",
        "File bytes travel directly between your devices.",
        "Every connection is verified against your Barn's own certificate.",
      ],
      visual: "network",
      cta: { label: "Read the architecture overview", href: "/docs/start/concepts/barns" },
    },
    {
      t: "cards",
      eyebrow: "The direction",
      title: "Where the same foundation leads.",
      text: "These are directions, not features. Each one builds on the trusted network the first milestone creates, and each is labelled until it exists.",
      cols: 3,
      items: [LINKS.storage, LINKS.compute, LINKS.ai],
    },
    {
      t: "isnot",
      eyebrow: "Setting expectations",
      title: "A private platform, not another cloud drive.",
      is: [
        "A private network built from devices you own or are permitted to use.",
        "Explicit about who joins and who can reach which file.",
        "A foundation that grows from file exchange toward storage and compute.",
        "Built for macOS and Windows first.",
      ],
      isnot: [
        "A public peer-to-peer file sharing network.",
        "A cryptocurrency or blockchain project.",
        "A finished distributed storage, compute or AI platform today.",
        "A way for strangers to use your hardware.",
      ],
    },
    cta("Build the foundation", "then build on it."),
  ],
};

export const products: Record<string, MarketingPage> = {
  barns: {
    path: "/product/barns",
    title: "Barns",
    description: "A Barn is a private group of approved devices. Create one, admit the devices you trust, and keep the trust boundary in your hands.",
    hero: {
      eyebrow: "Product",
      badge: "0.1.0a1 pre-alpha",
      title: "A private network for the devices you {trust.}",
      description:
        "A Barn is the trust boundary around your devices. Nothing joins because it is nearby, and nothing is shared because it belongs. Membership is deliberate, and you hold the keys.",
      primary: { label: "Create a Barn", href: "/docs/build/barns/create-a-barn" },
      secondary: { label: "Core concepts", href: "/docs/start/concepts/barns" },
      visual: "network",
      code: {
        "file": "create-a-barn.sh",
        "lines": [
          "# Create the Barn",
          "barn coordinator init --name LabBarn --advertise 192.168.1.10",
          "",
          "# Share the public certificate, then compare fingerprints",
          "barn coordinator ca export --output ./barn-ca.pem",
          "",
          "# Start listening",
          "barn coordinator start --bind 0.0.0.0 --port 8443",
          "",
          "# Let a new device ask to join",
          "barn coordinator invite --ttl 10m"
        ],
        "steps": [
          {
            "line": 2,
            "text": "Creates the trust root, the coordinator certificate and the Barn's identity, then prints a fingerprint."
          },
          {
            "line": 5,
            "text": "The public certificate is not a secret. Verify its fingerprint on every device you add."
          },
          {
            "line": 8,
            "text": "Runs in the foreground and answers only over verified HTTPS."
          },
          {
            "line": 11,
            "text": "Single use and short lived. A valid code still needs your approval."
          }
        ]
      },
    },
    sections: [
      {
        t: "split",
        eyebrow: "What a Barn is",
        title: "One trust domain, made of your own machines.",
        text: "A Barn is a private group of approved devices. Each device is a Node. The Barn gives them a shared, trusted environment to recognise one another, report availability and exchange files, with you deciding every step.",
        bullets: [
          "Each Barn has its own certificate authority. Two Barns never trust each other by accident.",
          "A single coordinator keeps the registry of Nodes, shares and audit events.",
          "You verify the Barn's fingerprint when you add a device. Nothing is trusted on faith.",
        ],
        visual: "network",
      },
      {
        t: "features",
        eyebrow: "Why it works",
        title: "Trust that you can see and check.",
        items: [
          { icon: "key", title: "Your own certificate authority", text: "Every Barn generates its own trust root. Devices verify the coordinator against it, so there is no third party to rely on." },
          { icon: "fingerprint", title: "Fingerprints, not faith", text: "When you add a device you compare a fingerprint. If it does not match, you stop. There is no option to skip the check." },
          { icon: "shield", title: "Membership is a decision", text: "Invites are single use and expire quickly. Even a valid code only creates a request that waits for your approval." },
          { icon: "eye", title: "A registry you can read", text: "The coordinator keeps a record of every Node, share and administrative action, so you can always answer who is in and who can reach what." },
          { icon: "refresh", title: "Survives restarts", text: "Identities, shares and the registry persist. After a restart, Nodes come back online as their heartbeats resume." },
          { icon: "layers", title: "Separate concerns", text: "The coordinator and a Node on the same computer use separate state, ports and secrets, so one never depends on the other by accident." },
        ],
      },
      {
        t: "steps",
        eyebrow: "Getting started",
        title: "From nothing to a Barn in four steps.",
        steps: [
          { title: "Create the Barn", text: "Initialise the coordinator on the machine that will host it. Barn generates the Barn's identity and prints its fingerprint.", code: "barn coordinator init --name LabBarn --advertise 192.168.1.10" },
          { title: "Export the public certificate", text: "The public certificate is not secret. You copy it to each device you want to add and check the fingerprint on arrival.", code: "barn coordinator ca export --output ./barn-ca.pem" },
          { title: "Start the coordinator", text: "It runs in the foreground and answers only over verified HTTPS.", code: "barn coordinator start --bind 0.0.0.0 --port 8443" },
          { title: "Invite and approve devices", text: "Create a short lived invite, let the new device request to join, and approve it once you recognise it.", code: "barn coordinator invite --ttl 10m" },
        ],
      },
      {
        t: "faq",
        title: "Questions about Barns",
        items: [
          { q: "Do I need a server to run a Barn?", a: "No. The coordinator is a normal process you can run on any computer that is usually on. It can share a machine with a Node, using separate state and ports." },
          { q: "Can two Barns talk to each other?", a: "Not in the first milestone. Each Barn is its own trust domain. Combining Barns is not part of M1." },
          { q: "What happens if the coordinator's address changes?", a: "You renew its certificate for the new address and update the address on each Node. You do not need to recreate the Barn." },
          { q: "Does the coordinator hold my files?", a: "No. It keeps metadata: identities, shares and audit records. File bytes stay on the Nodes that own them." },
        ],
      },
      related("nodes", "sharing", "availability"),
      cta("Start your first Barn", "in ten minutes."),
    ],
  },

  nodes: {
    path: "/product/nodes",
    title: "Nodes",
    description: "A Node is an approved device with its own persistent identity, reachable by other Nodes and visible to you.",
    hero: {
      eyebrow: "Product",
      badge: "0.1.0a1 pre-alpha",
      title: "Every device gets an identity of its {own.}",
      description:
        "A Node is a device you approved. It keeps the same identity across restarts, upgrades and address changes, so the Barn always knows who is who, regardless of where it is on the network.",
      primary: { label: "Enrol a Node", href: "/docs/build/nodes/enrol-a-node" },
      secondary: { label: "Node identity", href: "/docs/build/nodes/identity" },
      visual: "nodes",
      code: {
        "file": "enrol-a-node.sh",
        "lines": [
          "# On the new device",
          "barn node init --name StudyPC --advertise 192.168.1.20 --peer-port 8445",
          "barn node enroll --coordinator https://192.168.1.10:8443 --ca-cert ./barn-ca.pem --code <CODE>",
          "",
          "# On the coordinator",
          "barn coordinator enrolments",
          "barn coordinator approve <REQUEST_ID>",
          "",
          "# Then check the board",
          "barn nodes"
        ],
        "steps": [
          {
            "line": 2,
            "text": "Creates the Node's private identity on this device. It never leaves it."
          },
          {
            "line": 3,
            "text": "Sends the public part with proof that you hold the key, then waits."
          },
          {
            "line": 6,
            "text": "See who is waiting, with name and fingerprint."
          },
          {
            "line": 7,
            "text": "Nothing joins until you approve it."
          }
        ]
      },
    },
    sections: [
      {
        t: "features",
        eyebrow: "What makes a Node",
        title: "A device, promoted to a member.",
        variant: "bento",
        items: [
          { icon: "fingerprint", title: "A persistent identity", text: "Each Node has its own private key, created on the device and never sent anywhere. Its Node ID is a random identifier, not an IP address, so it survives address changes." },
          { icon: "shield", title: "Approved before it joins", text: "A request to join waits for you. You see the name and fingerprint, then approve or reject." },
          { icon: "refresh", title: "Comes back on its own", text: "After a reboot the agent resumes with the same identity. No new enrolment." },
          { icon: "list", title: "A clear life cycle", text: "Pending, online, suspect, offline and revoked. Each state has one meaning, and offline is never confused with revoked." },
          { icon: "drive", title: "Owns its own files", text: "A Node keeps its managed files in its own storage and serves them directly to authorised peers." },
          { icon: "ban", title: "Revocable in one command", text: "If a device is lost or retired, revoke it. It can no longer send heartbeats or start transfers." },
        ],
      },
      {
        t: "tabs",
        eyebrow: "The life of a Node",
        title: "Five states, each with one meaning.",
        text: "Barn keeps the vocabulary small so the answer to what is going on with this device is never ambiguous.",
        tabs: [
          { label: "Pending", icon: "clock", title: "Waiting for your approval", text: "A device has asked to join and proved it holds its own key. It is not a member yet.", bullets: ["Created with a single use invite.", "Visible in the enrolment list with its name and fingerprint.", "Cannot send heartbeats or receive anything."], visual: "nodes" },
          { label: "Online", icon: "check", title: "Approved and reporting in", text: "The Node sends signed heartbeats and its peer endpoint is reachable.", bullets: ["Appears green in the node list.", "Can receive shares and serve its files.", "Heartbeats arrive every few seconds."], visual: "availability" },
          { label: "Suspect", icon: "activity", title: "Quiet for a moment", text: "No valid heartbeat has arrived for a short while. It could be a blip, sleep or a network change.", bullets: ["Appears yellow.", "New transfers may still be attempted.", "Often resolves without any action."], visual: "availability" },
          { label: "Offline", icon: "wifi", title: "Not heard from", text: "No heartbeat for longer than the offline threshold. The device might be switched off or disconnected.", bullets: ["Appears red.", "Existing transfers pause and resume when it returns.", "It can come back with the same identity."], visual: "transfer" },
          { label: "Revoked", icon: "ban", title: "Removed by an administrator", text: "A deliberate decision. A revoked Node stays revoked until an administrator acts.", bullets: ["Cannot send heartbeats or start transfers.", "Cannot receive new shares.", "Bytes already delivered cannot be recalled."], visual: "share" },
        ],
      },
      {
        t: "terminal",
        eyebrow: "In practice",
        title: "See every Node at a glance.",
        text: "The command line shows the Nodes in your Barn and their current states. Add JSON output when you want to script against it.",
        bullets: ["Green, yellow and red mirror the three availability states.", "Node IDs are stable, so scripts can rely on them."],
        tabs: [
          { label: "nodes", command: "barn nodes", lines: [{ text: "", delay: 60 }, { text: "  NODE ID   NAME          STATE", tone: "muted", delay: 180 }, { text: "  4f91     MacNode       ONLINE", tone: "green", delay: 260 }, { text: "  7a3d     WindowsNode   ONLINE", tone: "green", delay: 260 }, { text: "  b812     StudyPC       SUSPECT", tone: "yellow", delay: 260 }, { text: "", delay: 60 }, { text: "  barnCompute 0.1.0a1 pre-alpha", tone: "note", delay: 100 }] },
          { label: "enrol", command: "barn coordinator enrolments", lines: [{ text: "", delay: 60 }, { text: "  request_id  2f6b1c8e", tone: "muted", delay: 200 }, { text: "  name        StudyPC", tone: "muted", delay: 200 }, { text: "  status      awaiting approval", tone: "yellow", delay: 260 }, { text: "", delay: 60 }, { text: "  approve with: barn coordinator approve 2f6b1c8e", tone: "note", delay: 100 }] },
        ],
      },
      {
        t: "faq",
        title: "Questions about Nodes",
        items: [
          { q: "What is the difference between offline and revoked?", a: "Offline means the coordinator has not heard from a Node for a while, so it might return. Revoked means an administrator removed it. A revoked Node cannot come back without new administrative action." },
          { q: "Does a Node need a fixed IP address?", a: "Barn needs a stable address or hostname for reaching a Node, because it is placed in that Node's certificate. The Node's identity does not depend on the address, but its endpoint does." },
          { q: "Can one computer run several Nodes?", a: "Yes, with separate state directories and ports. It is mainly useful for testing." },
          { q: "What if I reinstall the operating system?", a: "Back up the Node's state directory before you do. Restoring it keeps the same identity. Without it, the device enrols again as a new Node." },
        ],
      },
      related("barns", "availability", "sharing"),
      cta("Give every device", "a place in your Barn."),
    ],
  },

  availability: {
    path: "/product/availability",
    title: "Availability",
    description: "Know which of your devices are online, which have gone quiet and which are offline, with a heartbeat that means something.",
    hero: {
      eyebrow: "Product",
      badge: "0.1.0a1 pre-alpha",
      title: "Know what is {online.} Not what is assumed.",
      description:
        "Each Node reports in every few seconds. Barn turns that into three honest states, and separates a device the coordinator can hear from a device other Nodes can actually reach.",
      primary: { label: "Node availability docs", href: "/docs/build/nodes/availability" },
      secondary: { label: "Run barn doctor", href: "/docs/build/networking/diagnostics" },
      visual: "availability",
      code: {
        "file": "check-status.sh",
        "lines": [
          "# See every Node and its state",
          "barn nodes",
          "",
          "# Ask what is wrong, with no secrets in the output",
          "barn doctor",
          "",
          "# Machine readable, for dashboards and CI",
          "barn doctor --json"
        ],
        "steps": [
          {
            "line": 2,
            "text": "Green, yellow and red for online, suspect and offline."
          },
          {
            "line": 5,
            "text": "Checks certificates, ports, clock skew, approval, heartbeat and peer reachability."
          },
          {
            "line": 8,
            "text": "The same report as JSON. It contains no secrets, so it is safe to share."
          }
        ]
      },
    },
    sections: [
      {
        t: "stats",
        eyebrow: "Alpha defaults",
        title: "The clock behind the states.",
        items: [
          { value: 5, suffix: " s", label: "Heartbeat interval", note: "Signed and sequenced." },
          { value: 15, suffix: " s", label: "Suspect after", note: "No valid heartbeat yet." },
          { value: 30, suffix: " s", label: "Offline after", note: "Still no heartbeat." },
          { value: 2, suffix: " min", label: "Clock tolerance", note: "For signed requests." },
        ],
      },
      {
        t: "features",
        eyebrow: "What you get",
        title: "Signals you can act on.",
        items: [
          { icon: "activity", title: "Three clear states", text: "Online, suspect and offline, coloured green, yellow and red, so a glance tells you what is happening." },
          { icon: "wifi", title: "Reachability, not just chatter", text: "A heartbeat proves the coordinator can hear a Node. Barn also checks whether its peer endpoint is reachable, because that is what other Nodes need." },
          { icon: "refresh", title: "Self healing connections", text: "Agents reconnect after interruptions with exponential backoff and jitter, and stop cleanly when you shut them down." },
          { icon: "clock", title: "Never trusts old news", text: "After a coordinator restart, previous heartbeats are not treated as current. Nodes are non-online until they report in again." },
          { icon: "wrench", title: "A built in doctor", text: "barn doctor checks versions, certificates, ports, clock skew, approval, heartbeat and peer reachability, without printing secrets." },
          { icon: "eye", title: "Readable by scripts", text: "Every status command supports JSON output, so dashboards and automations can build on it." },
        ],
      },
      {
        t: "split",
        eyebrow: "Heartbeat versus reachability",
        title: "Two different questions, answered separately.",
        text: "Being heard by the coordinator and being reachable by a peer are not the same thing. A laptop behind a strict firewall can report in happily while nobody can fetch a file from it. Barn keeps the two apart so a green light does not mislead you.",
        bullets: [
          "The coordinator sees signed heartbeats with a sequence number, so replays and stale reports are rejected.",
          "Peer reachability is checked at the Node's own endpoint.",
          "If either fails, the diagnostics tell you which one.",
        ],
        visual: "availability",
        reverse: true,
      },
      {
        t: "terminal",
        eyebrow: "In practice",
        title: "Diagnose without guessing.",
        text: "When something looks wrong, ask the tool. It checks the things that usually cause trouble and explains the result in plain language.",
        tabs: [
          { label: "nodes", command: "barn nodes", lines: [{ text: "", delay: 60 }, { text: "  NODE ID   NAME        STATE", tone: "muted", delay: 180 }, { text: "  4f91     MacNode     ONLINE", tone: "green", delay: 260 }, { text: "  b812     StudyPC     SUSPECT", tone: "yellow", delay: 260 }, { text: "  a044     OldLaptop   OFFLINE", tone: "red", delay: 260 }, { text: "", delay: 60 }, { text: "  states are based on signed heartbeats", tone: "note", delay: 100 }] },
          { label: "doctor", command: "barn doctor", lines: [{ text: "", delay: 60 }, { text: "  PASS  coordinator certificate matches address", tone: "green", delay: 260 }, { text: "  PASS  coordinator reachable", tone: "green", delay: 260 }, { text: "  PASS  clock skew within tolerance", tone: "green", delay: 260 }, { text: "  WARN  peer port 8445 not reachable", tone: "yellow", delay: 320 }, { text: "        check the private-network firewall rule", tone: "muted", delay: 200 }, { text: "", delay: 60 }, { text: "  add --json for a redacted diagnostic report", tone: "note", delay: 100 }] },
        ],
      },
      {
        t: "faq",
        title: "Questions about availability",
        items: [
          { q: "Can I change the thresholds?", a: "Yes. The heartbeat interval and the suspect and offline thresholds are configurable within documented bounds. The defaults are five, fifteen and thirty seconds." },
          { q: "Why does my sleeping laptop show as offline?", a: "A sleeping device cannot send heartbeats, so it moves to suspect and then offline. It returns to online shortly after it wakes." },
          { q: "Does Barn notify me when a Node drops?", a: "Notifications are not part of the first milestone. Status is available from the command line and in JSON for your own tooling." },
          { q: "Why do requests get rejected when clocks are off?", a: "Signed requests carry a timestamp. If a device's clock differs by more than a couple of minutes, its requests are rejected and barn doctor reports clock skew." },
        ],
      },
      related("nodes", "transfers", "barns"),
      cta("See your Barn", "at a glance."),
    ],
  },

  "managed-files": {
    path: "/product/managed-files",
    title: "Managed files",
    description: "Import a file into Barn on purpose. Barn keeps an immutable copy, and records checksums so it can be shared and verified later.",
    hero: {
      eyebrow: "Product",
      badge: "0.1.0a1 pre-alpha",
      title: "Only files you {choose} ever leave the room.",
      description:
        "Barn never exposes your filesystem. To share something you import it, deliberately, into managed storage. From that moment it has a fixed identity, a size and a set of checksums.",
      primary: { label: "Import a file", href: "/docs/build/files/managed-files" },
      secondary: { label: "Limits and quotas", href: "/docs/build/files/limits-and-quotas" },
      visual: "files",
      code: {
        "file": "import.sh",
        "lines": [
          "# Import a file into managed storage",
          "barn file add ./sample.bin --name sample.bin",
          "",
          "# See what you own, with IDs and sizes",
          "barn file list",
          "",
          "# Sharing is a separate, explicit step",
          "barn share create <FILE_ID> --to <NODE_ID> --ttl 30m"
        ],
        "steps": [
          {
            "line": 2,
            "text": "Copies the file into private storage while hashing it. The copy is immutable."
          },
          {
            "line": 5,
            "text": "Every file has an ID. That ID, not a path, is what you share."
          },
          {
            "line": 8,
            "text": "Nothing is shared by default. This is a second decision."
          }
        ]
      },
    },
    sections: [
      {
        t: "split",
        eyebrow: "What import does",
        title: "A file becomes a set of verifiable chunks.",
        text: "When you import a file, Barn hashes it in one megabyte chunks and records an overall checksum. Those hashes are the reference every later transfer is checked against, so a copy that arrives damaged is caught, not shipped.",
        bullets: ["Each chunk has its own SHA-256.", "The whole file has one too.", "The last chunk can be shorter, and an empty file is valid."],
        visual: "files",
      },
      {
        t: "features",
        eyebrow: "How import works",
        title: "A copy you can rely on.",
        variant: "bento",
        items: [
          { icon: "file", title: "An immutable managed copy", text: "Barn copies the file into private storage while hashing it. Editing the original afterwards does not change what you share. Import again to publish a new version." },
          { icon: "filecheck", title: "Checksums per chunk", text: "The file is described as one megabyte chunks, each with its own SHA-256, plus an overall checksum. That is what makes verification and resume possible." },
          { icon: "lock", title: "Nothing else is reachable", text: "Only managed files can be served. Original paths are never exposed and remote requests cannot point at arbitrary locations." },
          { icon: "ban", title: "Unsafe inputs refused", text: "Symlinks and special files are rejected, and oversized files are turned away before anything is copied." },
          { icon: "drive", title: "Bounded by quotas", text: "A per Node storage quota and free disk checks stop imports from filling a machine." },
          { icon: "check", title: "Empty files work too", text: "A zero byte file gets a valid manifest and transfers like any other." },
        ],
      },
      {
        t: "stats",
        eyebrow: "Alpha defaults",
        title: "Sized for real files.",
        items: [
          { value: 1, suffix: " MiB", label: "Chunk size", note: "The last chunk may be smaller." },
          { value: 512, suffix: " MiB", label: "Default size limit", note: "Configurable within bounds." },
          { value: 2, suffix: " GiB", label: "Suggested Node quota", note: "Managed storage per Node." },
          { value: 256, suffix: " bit", label: "SHA-256", note: "Chunk and file checksums." },
        ],
      },
      {
        t: "steps",
        eyebrow: "Getting started",
        title: "Import in one command.",
        steps: [
          { title: "Add the file", text: "Barn streams it into managed storage and hashes it as it goes, so memory use stays small even for large files.", code: "barn file add ./sample.bin --name sample.bin" },
          { title: "List what you own", text: "See each file with its ID, size and status. The ID is what you use when you share.", code: "barn file list" },
          { title: "Share it when you are ready", text: "Nothing is shared by default. Creating a share is a separate, explicit step.", code: "barn share create <FILE_ID> --to <NODE_ID> --ttl 30m" },
        ],
      },
      {
        t: "isnot",
        eyebrow: "What this is not",
        title: "Not a synced folder.",
        text: "Managed files are deliberately narrower than a sync client. That is a feature.",
        is: ["A copy you import on purpose.", "Immutable once imported.", "Described by verifiable checksums.", "The only thing other Nodes can ever be given."],
        isnot: ["A watched folder that syncs automatically.", "Access to your whole disk.", "A live view of a file that keeps changing.", "Shared with anyone by default."],
      },
      {
        t: "faq",
        title: "Questions about managed files",
        items: [
          { q: "What happens if I change the original after importing?", a: "Nothing changes for recipients. They always receive the version you imported. To share the new version, import it again." },
          { q: "Why copy instead of pointing at the file?", a: "A stable copy means the bytes cannot change under a transfer, checksums have a fixed reference, and no path outside managed storage is reachable from the network." },
          { q: "Is there a size limit?", a: "The default maximum is 512 MiB per file. It can be adjusted within documented bounds." },
          { q: "Are managed files encrypted at rest?", a: "Not yet. Encryption at rest is planned for the storage milestone. Until then, use full disk encryption from your operating system." },
        ],
      },
      related("sharing", "transfers", "storage"),
      cta("Bring files in", "on your terms."),
    ],
  },

  sharing: {
    path: "/product/sharing",
    title: "Sharing",
    description: "Share one file with one Node, read only, for a limited time, and revoke it whenever you like.",
    hero: {
      eyebrow: "Product",
      badge: "0.1.0a1 pre-alpha",
      title: "Share one file with one device, for a {while.}",
      description:
        "Belonging to a Barn does not expose your files. Sharing is a second, separate decision that names a file, a recipient and a lifetime. Nothing more, nothing by default.",
      primary: { label: "Create a share", href: "/docs/build/files/create-a-share" },
      secondary: { label: "Share lifecycle", href: "/docs/build/files/share-lifecycle" },
      visual: "share",
      code: {
        "file": "share-a-file.sh",
        "lines": [
          "# Import the file once",
          "barn file add ./report.pdf",
          "",
          "# Share it with one Node for 30 minutes",
          "barn share create <FILE_ID> --to <NODE_ID> --ttl 30m",
          "",
          "# On the recipient",
          "barn share inbox",
          "barn share fetch <SHARE_ID> --output ./report.pdf",
          "",
          "# Changed your mind",
          "barn share revoke <SHARE_ID>"
        ],
        "steps": [
          {
            "line": 5,
            "text": "One file, one recipient, one lifetime. Read only."
          },
          {
            "line": 8,
            "text": "The recipient sees only what was shared with them."
          },
          {
            "line": 9,
            "text": "Fetching writes to a new local path and never overwrites."
          },
          {
            "line": 12,
            "text": "Revoking stops new transfers immediately."
          }
        ]
      },
    },
    sections: [
      {
        t: "features",
        eyebrow: "The rules",
        title: "Small, strict permissions.",
        items: [
          { icon: "share", title: "One file, one Node", text: "A share names exactly one managed file and one approved recipient. There are no wildcards, no public links and no shares to everyone." },
          { icon: "lock", title: "Read only", text: "A recipient can fetch the file. They cannot change it, delete it or pass it on through Barn." },
          { icon: "timer", title: "Time limited", text: "Every share has a lifetime. Once it ends, no new transfer can start." },
          { icon: "ban", title: "Revocable", text: "Revoke a share at any moment. New transfers stop immediately. Bytes already delivered cannot be recalled, and Barn is honest about that." },
          { icon: "eye", title: "Auditable", text: "Creating, using and revoking a share are recorded, so you can see what was shared, with whom and when." },
          { icon: "shield", title: "Invisible to everyone else", text: "Another Node cannot learn that a file exists unless it was shared with them." },
        ],
      },
      {
        t: "split",
        eyebrow: "Two decisions, not one",
        title: "Membership and sharing are separate on purpose.",
        text: "It is tempting to treat a Barn as one big shared folder. Barn does not. Joining a Barn only makes a device a member. It gains no access to your files until you create a share for it. That gap is where your control lives.",
        bullets: [
          "A new Node sees nothing of yours on arrival.",
          "Each share can be sized to the task: this file, this device, this afternoon.",
          "A compromised or lost device can only reach what was explicitly shared with it, and only while the share lasts.",
        ],
        visual: "share",
        reverse: true,
      },
      {
        t: "terminal",
        eyebrow: "In practice",
        title: "Create, check and revoke.",
        text: "The whole lifecycle is a handful of commands.",
        tabs: [
          { label: "create", command: "barn share create 91c4 --to 7a3d --ttl 30m", lines: [{ text: "", delay: 60 }, { text: "  share_id    c0de", tone: "green", delay: 300 }, { text: "  recipient   7a3d", tone: "muted", delay: 160 }, { text: "  access      read-only, expires in 30m", tone: "yellow", delay: 260 }, { text: "", delay: 60 }, { text: "  grant is file-, recipient- and expiry-bound", tone: "note", delay: 100 }] },
          { label: "inbox", command: "barn share inbox", lines: [{ text: "", delay: 60 }, { text: "  c0de  file 91c4  from 4f91", tone: "muted", delay: 260 }, { text: "        expires in 27m", tone: "yellow", delay: 240 }, { text: "", delay: 60 }, { text: "  fetch with: barn share fetch c0de --output ./sample.bin", tone: "note", delay: 100 }] },
          { label: "revoke", command: "barn share revoke c0de", lines: [{ text: "", delay: 60 }, { text: "  share c0de revoked", tone: "green", delay: 300 }, { text: "  new transfer grants will be denied", tone: "muted", delay: 180 }, { text: "", delay: 60 }, { text: "  bytes already delivered cannot be recalled", tone: "note", delay: 100 }] },
        ],
      },
      {
        t: "faq",
        title: "Questions about sharing",
        items: [
          { q: "Can I share a file with everyone in my Barn?", a: "Not in a single step. Each share names one recipient. To reach several Nodes, create one share per Node." },
          { q: "What happens to a transfer already in progress when I revoke?", a: "Chunks already delivered stay delivered. Barn stops issuing new permission, so requests for further chunks are denied." },
          { q: "Can a recipient share the file onward?", a: "Not through Barn. A share gives that Node access to fetch the file, and no permission to grant access to others." },
          { q: "How long can a share last?", a: "You choose the lifetime when you create it. A transfer that has started has its own short permission window, which is renewed only while the share stays active." },
        ],
      },
      related("files", "transfers", "nodes"),
      cta("Share carefully", "and only what you mean to."),
    ],
  },

  transfers: {
    path: "/product/transfers",
    title: "Transfers",
    description: "Verified, resumable file exchange directly between your devices, with clear errors when something goes wrong.",
    hero: {
      eyebrow: "Product",
      badge: "0.1.0a1 pre-alpha",
      title: "Move files directly. Verify every {chunk.}",
      description:
        "Files travel straight between your devices in one megabyte chunks. Each chunk is checked as it arrives, interruptions resume from what was already verified, and the finished file is compared against the original checksum.",
      primary: { label: "Fetch a share", href: "/docs/build/files/fetch-a-share" },
      secondary: { label: "Resume and recovery", href: "/docs/build/files/resume-and-recovery" },
      visual: "transfer",
      code: {
        "file": "resume.sh",
        "lines": [
          "# Check progress at any time",
          "barn transfer status <TRANSFER_ID>",
          "",
          "# Sender went offline? Bring it back, then continue",
          "barn transfer resume <TRANSFER_ID>",
          "",
          "# Or stop, keeping verified chunks for a while",
          "barn transfer cancel <TRANSFER_ID>"
        ],
        "steps": [
          {
            "line": 2,
            "text": "Shows verified chunks, bytes and retries."
          },
          {
            "line": 5,
            "text": "Continues from the chunks already verified. It does not start again."
          },
          {
            "line": 8,
            "text": "Verified chunks are kept for about a day unless you purge them."
          }
        ]
      },
    },
    sections: [
      {
        t: "split",
        eyebrow: "How it moves",
        title: "Chunks flow, get checked, and resume.",
        text: "The receiving device asks for one chunk at a time, straight from the device that owns the file. If the link drops, the chunks already verified stay put and the rest are fetched when it returns, ending in a final checksum.",
        bullets: ["Two chunks in flight at once, by default.", "Interruptions resume, they do not restart.", "The finished file is verified before it is exported."],
        visual: "transfer",
        reverse: true,
      },
      {
        t: "features",
        eyebrow: "What makes it reliable",
        title: "Built for the network you actually have.",
        variant: "bento",
        items: [
          { icon: "transfer", title: "Direct between devices", text: "Bytes go from the device that owns the file to the device that wants it. The coordinator issues permission but never carries the data." },
          { icon: "filecheck", title: "Verified chunk by chunk", text: "Each chunk is hashed and compared to the recorded value before it is kept, so corruption is caught early and only that chunk is fetched again." },
          { icon: "refresh", title: "Resumes, does not restart", text: "If a transfer is interrupted, Barn continues from the chunks it already verified. It does not throw away progress." },
          { icon: "check", title: "Final verification", text: "When every chunk is in, the assembled file is checked for size and overall checksum before it is exported." },
          { icon: "ban", title: "Never overwrites", text: "The output path must not exist. Partial output is cleaned up if anything fails." },
          { icon: "eye", title: "Errors with meaning", text: "Offline, not authorised, expired, corrupt, disk full and version mismatch are all distinct, so you know what to do next." },
        ],
      },
      {
        t: "stats",
        eyebrow: "Alpha defaults",
        title: "Bounded on purpose.",
        items: [
          { value: 1, suffix: " MiB", label: "Chunk size", note: "Verified individually." },
          { value: 2, label: "Parallel chunks", note: "Keeps memory and bandwidth predictable." },
          { value: 30, suffix: " min", label: "Permission window", note: "Renewed only while the share is active." },
          { value: 24, suffix: " h", label: "Verified chunks kept", note: "After a cancelled transfer." },
        ],
      },
      {
        t: "expandable",
        eyebrow: "When things go wrong",
        title: "Every interruption has a plan.",
        text: "Transfers are not always tidy. Here is what Barn does in the situations that usually break file copies.",
        items: [
          { icon: "wifi", title: "The sender goes offline", summary: "A transfer cannot finish without its source.", details: ["Barn reports a clear source offline error.", "Verified chunks are kept.", "Bring the sender back and run barn transfer resume."] },
          { icon: "refresh", title: "Your agent restarts", summary: "Progress survives a restart.", details: ["Every verified chunk is journaled durably.", "On startup the journal is read and chunks are re-validated.", "The same transfer continues with the same manifest."] },
          { icon: "activity", title: "The network drops", summary: "Short interruptions heal themselves.", details: ["Requests retry with exponential backoff and jitter.", "Only the chunk in flight is refetched.", "You do not need to do anything."] },
          { icon: "ban", title: "A chunk fails its check", summary: "Corruption never gets committed.", details: ["The chunk is discarded and requested again.", "A file with a bad checksum is never exported.", "Repeated failures surface a checksum mismatch error."] },
          { icon: "timer", title: "The share expires", summary: "Permission has a limit.", details: ["If the share is still active, permission renews.", "If it expired or was revoked, the transfer stops with a clear error.", "Ask the owner for a new share."] },
          { icon: "drive", title: "The disk fills up", summary: "Barn checks before it commits.", details: ["Free space is checked against the file size up front.", "A disk full error names the problem.", "Partial data is cleaned up."] },
        ],
      },
      {
        t: "terminal",
        eyebrow: "In practice",
        title: "Watch it recover.",
        text: "Check progress at any point, and resume with a single command.",
        tabs: [
          { label: "status", command: "barn transfer status 5e1a", lines: [{ text: "", delay: 60 }, { text: "  transfer_id  5e1a", tone: "muted", delay: 220 }, { text: "  source       4f91 MacNode", tone: "muted", delay: 220 }, { text: "  chunks       17/24 verified", tone: "yellow", delay: 360 }, { text: "  last_error   source offline", tone: "red", delay: 300 }, { text: "", delay: 60 }, { text: "  verified chunks remain journaled", tone: "note", delay: 100 }] },
          { label: "resume", command: "barn transfer resume 5e1a", lines: [{ text: "", delay: 60 }, { text: "  resuming from 17 verified chunks", tone: "muted", delay: 300 }, { text: "  chunks       24/24 verified", tone: "green", delay: 420 }, { text: "  sha256       matched final manifest", tone: "green", delay: 240 }, { text: "", delay: 60 }, { text: "  exported with no-clobber destination checks", tone: "note", delay: 100 }] },
        ],
      },
      {
        t: "faq",
        title: "Questions about transfers",
        items: [
          { q: "Does the file pass through the coordinator?", a: "No. The coordinator authorises a transfer, but the bytes go directly between the two devices." },
          { q: "What if the two devices cannot reach each other?", a: "The transfer fails with a clear error and never falls back to an insecure path. Relay data transport exists in the M1 work, but complete public-Wi-Fi operation still needs the outbound-only coordinator control path described in the closure gate." },
          { q: "Is this the same as distributed storage?", a: "No. The sender keeps its copy and the receiver gets its own. Spreading data across several Nodes is a separate, planned milestone." },
          { q: "Can two transfers run at once?", a: "Yes, within bounded limits, and cancelling one does not affect the other." },
        ],
      },
      related("sharing", "files", "availability"),
      cta("Move files", "without wondering."),
    ],
  },

  "distributed-storage": {
    path: "/product/distributed-storage",
    title: "Distributed storage",
    description: "A planned direction: letting a Barn place and recover data across the trusted devices you own.",
    hero: {
      eyebrow: "Product",
      badge: "Planned for M2",
      title: "Storage that belongs to the whole {Barn.}",
      description:
        "The longer term idea is that you interact with your Barn while it decides where data lives, placing it on more than one trusted device and recovering it when one is lost. This page describes a direction, not a current feature.",
      primary: { label: "See the roadmap", href: "/roadmap" },
      secondary: { label: "Read the M2 notes", href: "/docs/roadmap/m2-distributed-storage" },
      visual: "storage",
    },
    sections: [
      {
        t: "isnot",
        eyebrow: "Read this first",
        title: "What exists today, and what does not.",
        isTitle: "Available in M1",
        isNotTitle: "Not available yet",
        is: ["Whole file transfers between two approved Nodes.", "Verified, resumable chunks.", "The sender keeps its copy and the receiver gets its own."],
        isnot: ["Placing one file across several Nodes.", "Recovering data after a Node is lost.", "Storage rules you define once and Barn maintains.", "Encryption of stored data at rest."],
      },
      {
        t: "split",
        eyebrow: "The idea",
        title: "Capacity you already own, used together.",
        text: "Your devices hold spare disk space that no one else can use. Barn's aim is to make that space count as one pool, governed by rules you set, without handing your data to a third party.",
        bullets: ["Data placed on more than one trusted Node.", "Recovery when a device is lost or retired.", "A view of the Barn, not of every physical location."],
        visual: "storage",
      },
      {
        t: "features",
        eyebrow: "Under exploration",
        title: "Questions we are working through.",
        text: "Each of these is an open design question, not a promise.",
        items: [
          { icon: "database", title: "Placement", text: "How many copies, on which Nodes, and how a Barn should choose.", tag: "Exploring" },
          { icon: "refresh", title: "Recovery", text: "What replaces a lost device's data, and how quickly.", tag: "Exploring" },
          { icon: "lock", title: "Encryption at rest", text: "Who holds the keys for stored data, and how they are protected.", tag: "Exploring" },
          { icon: "list", title: "Rules", text: "How you describe what should be kept where, in plain terms.", tag: "Exploring" },
          { icon: "wifi", title: "Availability", text: "How placement should react when devices come and go.", tag: "Exploring" },
          { icon: "eye", title: "Visibility", text: "How you can always see where your data actually is.", tag: "Exploring" },
        ],
      },
      {
        t: "timeline",
        eyebrow: "Where it sits",
        title: "Built on the foundation, not instead of it.",
        items: [
          { when: "Now", title: "M1: Foundation", text: "Membership, availability and verified file exchange.", status: "now" },
          { when: "Next", title: "M2: Distributed storage", text: "Placement and recovery across trusted Nodes, once the foundation has been proven.", status: "next" },
          { when: "Later", title: "Compute and AI", text: "Workloads on the same private resource layer.", status: "later" },
        ],
      },
      related("files", "transfers", "compute"),
      cta("Follow the road", "to storage."),
    ],
  },

  compute: {
    path: "/product/compute",
    title: "Compute",
    description: "A future direction: using processing power across the devices in a Barn for suitable workloads.",
    hero: {
      eyebrow: "Product",
      badge: "Future direction",
      title: "Idle processors, put to {work.}",
      description:
        "Every computer you own has processors, memory and often a GPU that spend most of their time waiting. A longer term goal for Barn is to let suitable workloads run across the devices you have approved. Nothing on this page is built yet.",
      primary: { label: "See the roadmap", href: "/roadmap" },
      secondary: { label: "Compute notes", href: "/docs/roadmap/compute" },
      visual: "compute",
    },
    sections: [
      {
        t: "isnot",
        eyebrow: "Read this first",
        title: "A direction, clearly labelled.",
        isTitle: "The aim",
        isNotTitle: "Not today",
        is: ["A private pool of processing power across trusted devices.", "Workloads that split naturally into tasks.", "You decide which devices contribute and when."],
        isnot: ["A shipped compute scheduler.", "Something that uses a device without its owner's permission.", "A public marketplace of borrowed hardware."],
      },
      {
        t: "features",
        eyebrow: "Categories we are looking at",
        title: "The kinds of work that could benefit.",
        variant: "spotlight",
        items: [
          { icon: "film", title: "Rendering", text: "Frames and scenes are natural to split across machines.", tag: "Exploring" },
          { icon: "database", title: "Data processing", text: "Batch jobs over files that already live on your devices.", tag: "Exploring" },
          { icon: "code", title: "Development workloads", text: "Builds and test runs that finish faster with more hands.", tag: "Exploring" },
          { icon: "server", title: "Private services", text: "Small services you want to run close to your own data.", tag: "Exploring" },
          { icon: "cpu", title: "Idle hardware", text: "Spare machines that currently do nothing.", tag: "Exploring" },
          { icon: "shield", title: "Explicit participation", text: "Every device contributes only because its owner said so.", tag: "Principle" },
        ],
      },
      {
        t: "split",
        eyebrow: "The building blocks",
        title: "Trust and reachability come first.",
        text: "Scheduling work across machines only makes sense once devices can identify each other, be reached reliably and be told apart from strangers. That is exactly what the first milestone establishes, which is why compute comes later.",
        bullets: ["Approved membership decides who can take part.", "Availability tells the scheduler what can run now.", "Verified transfers move inputs and results safely."],
        visual: "compute",
        reverse: true,
      },
      related("availability", "storage", "ai"),
      cta("Start with the foundation", "compute comes later."),
    ],
  },

  ai: {
    path: "/product/ai",
    title: "AI infrastructure",
    description: "A future direction: letting compatible hardware in a Barn contribute to private AI workloads.",
    hero: {
      eyebrow: "Product",
      badge: "Future direction",
      title: "Private hardware, coordinated {intelligence.}",
      description:
        "Some people want more control over the machines that run their AI workloads. A distant goal for Barn is to let compatible devices you trust contribute to them. This is exploratory, and none of it is built.",
      primary: { label: "See the roadmap", href: "/roadmap" },
      secondary: { label: "AI notes", href: "/docs/roadmap/ai" },
      visual: "ai",
    },
    sections: [
      {
        t: "isnot",
        eyebrow: "Read this first",
        title: "Broader than AI, and not there yet.",
        isTitle: "The direction",
        isNotTitle: "Not the current product",
        is: ["Private infrastructure first, with AI as one workload category.", "Compatible hardware you own or are permitted to use.", "Control over where computation happens."],
        isnot: ["A finished AI platform.", "A model hosting service.", "A claim that any workload will run well across ordinary devices."],
      },
      {
        t: "features",
        eyebrow: "What we care about",
        title: "The principles that would guide it.",
        items: [
          { icon: "shield", title: "Control over where work runs", text: "You should be able to say which machines take part, and know that nothing else does.", tag: "Principle" },
          { icon: "lock", title: "Data stays yours", text: "Inputs and outputs move under the same explicit authorisation as everything else in Barn.", tag: "Principle" },
          { icon: "eye", title: "Honest expectations", text: "Distributing AI work across ordinary machines is hard. We will describe results conservatively.", tag: "Principle" },
        ],
      },
      {
        t: "split",
        eyebrow: "Why it depends on the foundation",
        title: "Everything above needs a trusted layer underneath.",
        text: "Coordinating intelligence across devices is only as good as the layer beneath it. Identity, approval, availability and verified data movement come first, because every later capability leans on them.",
        bullets: ["A private, approved set of devices.", "Live knowledge of what is available.", "Verified movement of model files and results."],
        visual: "ai",
      },
      related("compute", "storage", "barns"),
      cta("Build the base", "then reach higher."),
    ],
  },
};

export const productSlugs = Object.keys(products);
