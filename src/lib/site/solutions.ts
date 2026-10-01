import type { FeatureItem, MarketingPage, Section } from "./types";

const LINKS = {
  homelabs: { icon: "home", title: "Home labs", text: "Make a shelf of spare machines useful together.", href: "/solutions/home-labs" },
  studios: { icon: "palette", title: "Creative studios", text: "Move big project files between workstations.", href: "/solutions/creative-studios" },
  teams: { icon: "users", title: "Small teams", text: "One private network for the team's own devices.", href: "/solutions/small-teams" },
  individuals: { icon: "user", title: "Individuals", text: "A laptop, a desktop and a spare, working as one.", href: "/solutions/individuals" },
  developers: { icon: "terminal", title: "Developers", text: "Private infrastructure you can script.", href: "/solutions/developers" },
} satisfies Record<string, FeatureItem & { href: string }>;

type LinkKey = keyof typeof LINKS;

const others = (...keys: LinkKey[]): Section => ({
  t: "cards",
  eyebrow: "Other ways to use Barn",
  title: "Find the setup closest to yours.",
  cols: 3,
  items: keys.map((k) => LINKS[k]),
});

const cta = (title: string, subtitle: string): Section => ({
  t: "cta",
  title,
  subtitle,
  text: "Barn is in active development, starting with macOS and Windows. Read the quickstart to see how a first Barn comes together.",
  primary: { label: "Read the quickstart", href: "/docs/start/quickstart" },
  secondary: { label: "Talk to us", href: "/contact" },
  badges: ["Private by design", "macOS + Windows"],
});

const FIT = (fits: string[], notyet: string[]): Section => ({
  t: "isnot",
  eyebrow: "Honest fit",
  title: "Where Barn helps today, and where it does not yet.",
  isTitle: "A good fit",
  isNotTitle: "Not yet",
  is: fits,
  isnot: notyet,
});

export const solutionsIndex: MarketingPage = {
  path: "/solutions",
  title: "Solutions",
  description: "See how Barn fits home labs, creative studios, small teams, individuals and developers.",
  hero: {
    eyebrow: "Solutions",
    badge: "0.1.0a1 pre-alpha",
    title: "One foundation. Many {setups.}",
    description:
      "Barn is not built for one kind of user. It is built for anyone with more than one capable computer and a reason to keep their data close. Here is how it fits the setups we hear about most.",
    primary: { label: "Read the quickstart", href: "/docs/start/quickstart" },
    secondary: { label: "See the product", href: "/product" },
    visual: "network",
  },
  sections: [
    {
      t: "cards",
      eyebrow: "By audience",
      title: "Pick the picture that looks like yours.",
      cols: 3,
      items: [LINKS.homelabs, LINKS.studios, LINKS.teams, LINKS.individuals, LINKS.developers],
    },
    {
      t: "features",
      eyebrow: "What they share",
      title: "Different rooms, the same four needs.",
      variant: "spotlight",
      cols: 2,
      items: [
        { icon: "shield", title: "Knowing who is in", text: "Every setup wants a clear, deliberate answer to which devices belong, and a way to remove one." },
        { icon: "activity", title: "Knowing what is up", text: "Live availability tells you which machines can take part right now." },
        { icon: "share", title: "Sharing on purpose", text: "Access is per file, per device and time limited, never a whole disk." },
        { icon: "filecheck", title: "Trusting what arrives", text: "Verified transfers mean the file you receive is the file that was sent." },
      ],
    },
    {
      t: "stats",
      eyebrow: "Alpha defaults",
      title: "Numbers that apply to every setup.",
      items: [
        { value: 5, suffix: " s", label: "Heartbeat", note: "Availability signal." },
        { value: 1, suffix: " MiB", label: "Chunk size", note: "Verified individually." },
        { value: 30, suffix: " min", label: "Permission window", note: "For a running transfer." },
        { value: 512, suffix: " MiB", label: "Default file limit", note: "Configurable." },
      ],
    },
    cta("Find your setup", "and start small."),
  ],
};

export const solutions: Record<string, MarketingPage> = {
  "home-labs": {
    path: "/solutions/home-labs",
    title: "Home labs",
    description: "Turn spare machines into a private network you control, with clear status, explicit sharing and no cloud middleman.",
    hero: {
      eyebrow: "Solutions",
      badge: "For home labs",
      title: "Turn a shelf of spare machines into one {home lab.}",
      description:
        "Home labs grow one machine at a time, and every machine ends up its own island. Barn gives them a shared identity and a shared status board, so the pile of hardware starts behaving like a system.",
      primary: { label: "Set up a home lab", href: "/docs/guides/setup/home-lab" },
      secondary: { label: "See how it works", href: "/product/barns" },
      visual: "rack",
      code: {
        "file": "home-lab.sh",
        "lines": [
          "# On the always-on machine",
          "barn coordinator init --name HomeBarn --advertise 192.168.1.5",
          "barn coordinator start --bind 0.0.0.0 --port 8443",
          "",
          "# For each device you want to add",
          "barn coordinator invite --ttl 10m",
          "",
          "# Check the status board",
          "barn nodes"
        ],
        "steps": [
          {
            "line": 2,
            "text": "Use a reserved address so the certificate always matches."
          },
          {
            "line": 6,
            "text": "One short lived invite per device, approved by you."
          },
          {
            "line": 9,
            "text": "Every machine in the lab at a glance."
          }
        ]
      },
    },
    sections: [
      {
        t: "split",
        eyebrow: "The problem",
        title: "Hardware everywhere, coordination nowhere.",
        text: "A desktop for the heavy jobs, a mini PC that is always on, a laptop that comes and goes, maybe an old machine with a big disk. Moving anything between them means USB sticks, ad hoc shares or an upload to somebody else's server and a download again.",
        bullets: [
          "No single view of which machines are up.",
          "Copying files relies on whichever tool happens to work.",
          "Adding or retiring a machine means reconfiguring everything else.",
        ],
        visual: "rack",
      },
      {
        t: "features",
        eyebrow: "How Barn helps",
        title: "A control plane for your own hardware.",
        variant: "bento",
        items: [
          { icon: "network", title: "One private network", text: "Create a Barn on your always-on machine and admit each device by hand. You see exactly what is in the lab." },
          { icon: "activity", title: "A live status board", text: "Green, yellow and red for every Node, so a machine that went to sleep or lost its cable stands out immediately." },
          { icon: "share", title: "Files where they are needed", text: "Import a file and share it with the one machine that needs it. It goes directly, with no detour through the internet." },
          { icon: "filecheck", title: "Copies you can trust", text: "Every chunk and the final file are verified, and interrupted transfers resume from where they stopped." },
          { icon: "ban", title: "Easy to retire a machine", text: "Revoke a device and it is out. There is nothing to unpick on the others." },
          { icon: "wifi", title: "Stays on your network", text: "The coordinator and Nodes talk over verified HTTPS inside your own network for the direct M1 path. No hosted account is required." },
        ],
      },
      {
        t: "tabs",
        eyebrow: "Typical roles",
        title: "Give each machine a job.",
        text: "A Barn does not force a topology. Here are the roles home labs usually settle into.",
        tabs: [
          { label: "The coordinator", icon: "server", title: "The always-on mini PC", text: "Run the coordinator on the machine that is usually powered. It also works as a Node, with separate state and ports.", bullets: ["Keeps the registry of devices and shares.", "Needs a stable address, ideally a DHCP reservation.", "Holds no files of its own unless you also run a Node on it."], visual: "rack" },
          { label: "The workhorse", icon: "monitor", title: "The big desktop", text: "Your most capable machine is usually where large files live and where you fetch the ones you need.", bullets: ["Import large project files once.", "Share to whichever machine needs them.", "Keep it as a Node so it can serve files whenever it is on."], visual: "transfer" },
          { label: "The wanderer", icon: "laptop", title: "The laptop that comes and goes", text: "A device that sleeps and travels still belongs. It simply moves through suspect and offline states and returns.", bullets: ["No re-enrolment after a reboot.", "Transfers resume when it wakes.", "Revoke it if it is ever lost."], visual: "availability" },
        ],
      },
      {
        t: "steps",
        eyebrow: "A weekend project",
        title: "From a pile of boxes to a Barn.",
        steps: [
          { title: "Reserve addresses", text: "Give every machine a fixed address on your router, so certificates and endpoints stay valid." },
          { title: "Create the Barn on the always-on machine", text: "It generates the trust root and prints a fingerprint to compare on each device.", code: "barn coordinator init --name HomeBarn --advertise 192.168.1.5" },
          { title: "Enrol and approve each device", text: "Create one invite per device, enrol it, and approve the request once you recognise it.", code: "barn coordinator invite --ttl 10m" },
          { title: "Check the board", text: "Every Node should be green. If one is not, barn doctor will say why.", code: "barn nodes" },
        ],
      },
      FIT(
        ["A handful of machines on one trusted network.", "People who want status and file exchange without a cloud account.", "Tinkerers happy to run a command line tool."],
        ["Running services across machines, which is a future direction.", "Very large media files above the default limit.", "Linux nodes, which are not a first target."]
      ),
      {
        t: "faq",
        title: "Home lab questions",
        items: [
          { q: "Can I run the coordinator and a Node on the same machine?", a: "Yes. They use separate state directories, databases and ports, so one never depends on the other." },
          { q: "Do I need to open ports on my router?", a: "No. Barn is built for your local network and never opens router ports or relies on UPnP." },
          { q: "What about Linux boxes?", a: "macOS and Windows are the first targets. Other platforms are not part of the first milestone." },
          { q: "Can it run as a service at boot?", a: "Not yet. Background services are planned. For now the agent runs in a terminal or through your operating system's scheduler." },
        ],
      },
      others("studios", "teams", "individuals"),
      cta("Wake up the hardware", "you already own."),
    ],
  },

  "creative-studios": {
    path: "/solutions/creative-studios",
    title: "Creative studios",
    description: "Move project files between workstations directly, with verified copies and explicit, time limited sharing.",
    hero: {
      eyebrow: "Solutions",
      badge: "For creative studios",
      title: "Move project files between workstations, {directly.}",
      description:
        "Studios juggle heavy files between edit bays, render machines and laptops. Barn moves them straight between your own devices, checks every chunk, and shares per project, for as long as you say.",
      primary: { label: "Share a large file", href: "/docs/guides/files/share-a-large-file" },
      secondary: { label: "See transfers", href: "/product/transfers" },
      visual: "studio",
      code: {
        "file": "send-to-render.sh",
        "lines": [
          "# Import a project file",
          "barn file add ./edit_session.zip",
          "",
          "# Give the render machine an hour",
          "barn share create <FILE_ID> --to <NODE_ID> --ttl 1h",
          "",
          "# On the render machine",
          "barn share fetch <SHARE_ID> --output ./edit_session.zip",
          "barn transfer status <TRANSFER_ID>"
        ],
        "steps": [
          {
            "line": 2,
            "text": "Files up to the size limit, 512 MiB by default, are imported and hashed."
          },
          {
            "line": 5,
            "text": "Access for one machine, for as long as the session lasts."
          },
          {
            "line": 8,
            "text": "The file arrives straight from the source machine."
          },
          {
            "line": 9,
            "text": "Check progress, and resume if the network hiccups."
          }
        ]
      },
    },
    sections: [
      {
        t: "features",
        eyebrow: "What matters to a studio",
        title: "Fewer copies lost, fewer questions asked.",
        variant: "bento",
        items: [
          { icon: "transfer", title: "Straight between machines", text: "A file goes from the workstation that has it to the one that needs it. No upload, no download, no third party holding your work." },
          { icon: "filecheck", title: "Verified on arrival", text: "Every chunk and the final file are checked, so a corrupted copy of a client deliverable cannot slip through unnoticed." },
          { icon: "refresh", title: "Survives a flaky network", text: "Interrupted transfers resume from verified chunks instead of restarting a long copy from zero." },
          { icon: "timer", title: "Sharing with a clock", text: "Share a file with one machine for an hour or an afternoon. When the time is up, no new transfer can start." },
          { icon: "eye", title: "See who has what", text: "The registry records shares, so you can answer which machine was given which file and when." },
          { icon: "ban", title: "Contractors come and go", text: "Add a freelancer's device for a project, then revoke it when the work is delivered." },
        ],
      },
      {
        t: "expandable",
        eyebrow: "A day in the studio",
        title: "Where Barn fits in the workflow.",
        text: "Barn does not replace your creative tools. It sits underneath them, moving the files they produce.",
        items: [
          { icon: "camera", title: "Ingest", summary: "Bring footage or assets onto the network.", details: ["Import the files on the machine that holds them.", "Barn records a size and checksums for each.", "Nothing is visible to other machines yet."] },
          { icon: "pen", title: "Edit", summary: "Give the editor what they need, and only that.", details: ["Create a share for the edit bay machine.", "Set a lifetime that matches the session.", "The share is read only."] },
          { icon: "cpu", title: "Render", summary: "Send inputs to a render machine and collect results.", details: ["Share project assets with the render box.", "Fetch the finished output back the same way.", "Verification confirms nothing was damaged in transit."] },
          { icon: "check", title: "Deliver", summary: "Hand over a verified final.", details: ["Import the final file.", "Share it with the machine that will publish it.", "Revoke the share afterwards."] },
        ],
      },
      {
        t: "split",
        eyebrow: "An honest note on size",
        title: "The default limit is 512 MiB per file.",
        text: "Today Barn is tuned for files up to a configurable limit, which defaults to 512 MiB. That suits many project files, stills, audio and proxies, but raw footage often exceeds it. Larger files are not part of the first milestone, and we would rather say so than let you find out mid-project.",
        bullets: ["The limit is configurable within documented bounds.", "Files above it are refused before anything is copied.", "Handling very large media is something we want to revisit."],
        visual: "studio",
        reverse: true,
      },
      FIT(
        ["Project files, proxies, stills and audio within the size limit.", "Studios with a few workstations on one network.", "Teams who care where their client work lives."],
        ["Multi terabyte raw footage.", "Sharing outside your own network.", "Collaborative editing of a live project file."]
      ),
      {
        t: "faq",
        title: "Studio questions",
        items: [
          { q: "Can two people work on the same file?", a: "No. Barn moves files. It does not do live collaboration or merging." },
          { q: "Can a freelancer join from outside our network?", a: "Not as a completed M1 claim. Data relay work exists, but full public-Wi-Fi operation still depends on the coordinator control-plane closure gate." },
          { q: "Does Barn keep old versions?", a: "Managed files are immutable, so each import is its own version. Barn does not manage version history for you." },
          { q: "Is there a per person permission system?", a: "Barn manages devices, not user accounts. Access is granted to a device for a file." },
        ],
      },
      others("homelabs", "teams", "developers"),
      cta("Send the work", "not the worry."),
    ],
  },

  "small-teams": {
    path: "/solutions/small-teams",
    title: "Small teams",
    description: "A private network for a team's own devices, with deliberate membership, clear status and no middleman.",
    hero: {
      eyebrow: "Solutions",
      badge: "For small teams",
      title: "One private network for the team's own {devices.}",
      description:
        "Small teams end up with files spread across personal laptops and one shared machine, held together by chat attachments and cloud folders. Barn gives the team's devices a trusted way to reach each other.",
      primary: { label: "Add a device", href: "/docs/guides/operate/add-a-device-later" },
      secondary: { label: "Trust and security", href: "/docs/build/security/overview" },
      visual: "team",
      code: {
        "file": "team-devices.sh",
        "lines": [
          "# Add a teammate's device",
          "barn coordinator invite --ttl 10m",
          "barn coordinator approve <REQUEST_ID>",
          "",
          "# Review who is in",
          "barn nodes",
          "",
          "# When a device leaves the team",
          "barn coordinator revoke <NODE_ID>"
        ],
        "steps": [
          {
            "line": 3,
            "text": "Approve only devices you recognise."
          },
          {
            "line": 6,
            "text": "The registry is the answer to who belongs."
          },
          {
            "line": 9,
            "text": "A revoked device can no longer take part in the Barn."
          }
        ]
      },
    },
    sections: [
      {
        t: "features",
        eyebrow: "What changes",
        title: "From a scatter of laptops to a network with edges.",
        items: [
          { icon: "network", title: "A defined circle", text: "Only devices you approved are in. Anyone can see, from the registry, exactly which devices belong to the team." },
          { icon: "share", title: "Share what is needed", text: "Give one machine access to one file for a fixed time, rather than opening a folder to everybody." },
          { icon: "ban", title: "Clean offboarding", text: "When someone leaves, revoke their device. It can no longer take part in the Barn." },
          { icon: "activity", title: "See who is reachable", text: "Live availability shows which team devices are on right now, before you need a file from one." },
          { icon: "eye", title: "An audit trail", text: "Shares and administrative actions are recorded, so questions about what happened have an answer." },
          { icon: "lock", title: "No third party in the path", text: "Files move directly between devices you own. There is no external service holding a copy." },
        ],
      },
      {
        t: "split",
        eyebrow: "A distinction that matters",
        title: "Barn manages devices, not people.",
        text: "Barn's unit of trust is the device. There are no user accounts, roles or per person permissions in the first milestone. That keeps the model small and predictable, and it means you should think in terms of which machines belong, rather than which people.",
        bullets: ["Approve the devices your team uses for work.", "Revoke a device when it changes hands or leaves.", "Combine with your own device policies for the rest."],
        visual: "team",
        reverse: true,
      },
      {
        t: "steps",
        eyebrow: "Rolling it out",
        title: "Start with two devices and grow.",
        steps: [
          { title: "Pick a stable host", text: "Choose a machine that is usually on for the coordinator and give it a fixed address." },
          { title: "Admit devices one at a time", text: "Create a short lived invite for each teammate's device and approve each request yourself." },
          { title: "Share deliberately", text: "Teach the team to share a file with a named device, for a fixed time, rather than by default." },
          { title: "Review the registry", text: "Check the list of Nodes from time to time and revoke anything you do not recognise.", code: "barn nodes" },
        ],
      },
      FIT(
        ["A handful of trusted devices on one office or home network.", "Teams that want direct, private exchange of working files.", "People comfortable with a command line for administration."],
        ["Person level accounts and roles.", "Chat, comments or live collaboration.", "Members working from separate networks with no route to each other."]
      ),
      {
        t: "faq",
        title: "Team questions",
        items: [
          { q: "Who administers the Barn?", a: "Whoever runs the coordinator. They create invites, approve devices and can revoke them. It is an administrative authority, so choose that person and machine with care." },
          { q: "Can it replace our cloud drive?", a: "Not today. Barn is a private exchange and coordination layer, not a replacement for every cloud service." },
          { q: "What if the coordinator machine is off?", a: "Existing Nodes keep their identities, but new shares and transfers need the coordinator to authorise them. Keep it on a machine that is usually available." },
          { q: "Is there single sign on?", a: "No. There are no user accounts in the first milestone." },
        ],
      },
      others("homelabs", "studios", "individuals"),
      cta("Bring the team's devices", "into one Barn."),
    ],
  },

  individuals: {
    path: "/solutions/individuals",
    title: "Individuals",
    description: "A laptop, a desktop and a spare machine, working together as one private network.",
    hero: {
      eyebrow: "Solutions",
      badge: "For individuals",
      title: "Your laptop, your desktop, your spare. One {network.}",
      description:
        "You own more computing than you use, and none of it talks to the rest. Barn is the simplest way to make your own machines aware of each other and able to hand files across, with nobody in between.",
      primary: { label: "Connect two laptops", href: "/docs/guides/setup/two-laptops" },
      secondary: { label: "Read the quickstart", href: "/docs/start/quickstart" },
      visual: "individual",
      code: {
        "file": "two-machines.sh",
        "lines": [
          "# Machine one: create the Barn",
          "barn coordinator init --name MyBarn --advertise 192.168.1.10",
          "",
          "# Machine two: join it",
          "barn node enroll --coordinator https://192.168.1.10:8443 --ca-cert ./barn-ca.pem --code <CODE>",
          "",
          "# Send a file across",
          "barn share create <FILE_ID> --to <NODE_ID> --ttl 30m"
        ],
        "steps": [
          {
            "line": 2,
            "text": "Your first machine becomes the coordinator."
          },
          {
            "line": 5,
            "text": "Copy the certificate over and compare its fingerprint first."
          },
          {
            "line": 8,
            "text": "Share to your other machine for half an hour."
          }
        ]
      },
    },
    sections: [
      {
        t: "features",
        eyebrow: "Why bother",
        title: "Small setup, real difference.",
        items: [
          { icon: "transfer", title: "Skip the detour", text: "Move a big file from one of your machines to another without emailing it to yourself or uploading it to a service." },
          { icon: "activity", title: "Know what is on", text: "See at a glance which of your machines are awake and reachable." },
          { icon: "lock", title: "Nothing exposed by default", text: "Barn never shares your disk. A file has to be imported and shared to a named device first." },
          { icon: "filecheck", title: "Checked copies", text: "The file that arrives is compared against the original, so you know it is intact." },
          { icon: "laptop", title: "Works across platforms", text: "A Mac and a Windows PC can be in the same Barn." },
          { icon: "rocket", title: "Ten minute start", text: "Two computers, a couple of commands, and you have a working Barn." },
        ],
      },
      {
        t: "marquee",
        label: "The machines Barn is meant for",
        items: [
          { label: "That old laptop", icon: "laptop" },
          { label: "The gaming PC", icon: "monitor" },
          { label: "The work Mac", icon: "laptop" },
          { label: "A home server", icon: "server" },
          { label: "A spare mini PC", icon: "server" },
          { label: "The desktop in the study", icon: "monitor" },
        ],
      },
      {
        t: "steps",
        eyebrow: "Your first afternoon",
        title: "Two machines, one file.",
        steps: [
          { title: "Install Barn on both", text: "Use a clean virtual environment on each. The installation guide covers macOS and Windows.", code: "python -m pip install --no-deps 'barnCompute==0.1.0a1'" },
          { title: "Create a Barn and enrol the second machine", text: "Use an invite and check the fingerprint. Approve the request on the first machine." },
          { title: "Import a file and share it", text: "Pick a file, import it, and share it with your other machine for half an hour.", code: "barn file add ./photo-archive.zip\nbarn share create <FILE_ID> --to <NODE_ID> --ttl 30m" },
          { title: "Fetch and compare", text: "Fetch it on the other machine and compare checksums. They should match.", code: "barn share fetch <SHARE_ID> --output ./photo-archive.zip" },
        ],
      },
      FIT(
        ["Two or three of your own computers on the same home network.", "People who want private, direct file exchange.", "Anyone curious about running their own infrastructure."],
        ["Phones and tablets, which are not part of the first milestone.", "Access from outside your home network.", "Automatic folder syncing."]
      ),
      {
        t: "faq",
        title: "Questions from individuals",
        items: [
          { q: "Do I need to be technical?", a: "Some comfort with a terminal helps. Barn is currently driven from the command line, and the docs walk through each command." },
          { q: "Will it work over the internet?", a: "Barn is designed for a trusted local network. Support for restricted networks and remote paths is on the roadmap." },
          { q: "Does it sync my folders?", a: "No. You import files deliberately, and share them deliberately." },
          { q: "Is it free?", a: "Pricing has not been announced. The first releases are alpha." },
        ],
      },
      others("homelabs", "developers", "teams"),
      cta("Connect what you own", "in an afternoon."),
    ],
  },

  developers: {
    path: "/solutions/developers",
    title: "For developers",
    description: "Private infrastructure with a command line you can script, stable identifiers and machine readable output.",
    hero: {
      eyebrow: "Solutions",
      badge: "For developers",
      title: "Private infrastructure you can {script.}",
      description:
        "Barn is command line first. Nodes and files have stable identifiers, status is available as JSON, and errors are distinct and documented, so it drops into the tooling you already run.",
      primary: { label: "CLI reference", href: "/docs/cli/overview" },
      secondary: { label: "Developer hub", href: "/developers" },
      visual: "terminal",
      code: {
        "file": "pipeline.sh",
        "lines": [
          "# Import an artifact and hand it to one machine",
          "barn file add ./build.tar --json",
          "barn share create <FILE_ID> --to <NODE_ID> --ttl 10m --json",
          "",
          "# On the receiving machine",
          "barn share fetch <SHARE_ID> --output ./build.tar",
          "",
          "# Gate a job on a healthy setup",
          "barn doctor --json"
        ],
        "steps": [
          {
            "line": 2,
            "text": "JSON output and stable IDs make it easy to script."
          },
          {
            "line": 3,
            "text": "Scope access to one machine and a short window."
          },
          {
            "line": 9,
            "text": "A diagnostic report with no secrets in it."
          }
        ]
      },
    },
    sections: [
      {
        t: "features",
        eyebrow: "Designed for automation",
        title: "The things scripts care about.",
        variant: "bento",
        items: [
          { icon: "terminal", title: "One command, many groups", text: "coordinator, node, file, share, transfer, doctor and config, each with help text and consistent flags." },
          { icon: "code", title: "JSON output", text: "Add --json to status commands for machine readable output you can pipe into anything." },
          { icon: "key", title: "Stable identifiers", text: "Node IDs, file IDs, share IDs and transfer IDs are opaque and stable, never file paths or addresses." },
          { icon: "list", title: "Distinct errors", text: "Offline, not authorised, expired, checksum mismatch, disk full and version mismatch are separate, so scripts can react to each." },
          { icon: "wrench", title: "A doctor for CI", text: "barn doctor --json produces a report with no secrets in it, safe to attach to an issue or a build log." },
          { icon: "book", title: "Documented limits", text: "Chunk size, file limits, timeouts and thresholds are written down, not discovered." },
        ],
      },
      {
        t: "terminal",
        eyebrow: "In a script",
        title: "A private file exchange in three commands.",
        text: "Everything you can do by hand can be done in a script, because it is all the same command line.",
        tabs: [
          { label: "import", command: "barn file add ./build.tar --name build.tar --json", lines: [{ text: "", delay: 60 }, { text: '  { "file_id": "91c4", "chunks": 24 }', tone: "green", delay: 300 }, { text: "  immutable managed copy created", tone: "muted", delay: 200 }, { text: "", delay: 60 }, { text: "  chunk and full-file SHA-256 recorded", tone: "note", delay: 100 }] },
          { label: "share", command: "barn share create 91c4 --to 7a3d --ttl 10m --json", lines: [{ text: "", delay: 60 }, { text: '  { "share_id": "c0de", "expires_in": "10m" }', tone: "muted", delay: 300 }, { text: "  grant scope: file 91c4 -> node 7a3d", tone: "yellow", delay: 220 }, { text: "", delay: 60 }, { text: "  no wildcard or public shares", tone: "note", delay: 100 }] },
          { label: "fetch", command: "barn share fetch c0de --output ./build.tar", lines: [{ text: "", delay: 60 }, { text: "  chunks       24/24 verified", tone: "green", delay: 420 }, { text: "  sha256       matched final manifest", tone: "green", delay: 240 }, { text: "", delay: 60 }, { text: "  transfer path: direct HTTPS", tone: "note", delay: 100 }] },
        ],
      },
      {
        t: "isnot",
        eyebrow: "What to expect",
        title: "What developers get in the first milestone.",
        isTitle: "Available in M1",
        isNotTitle: "Not yet",
        is: ["A documented command line tool.", "JSON output and stable identifiers.", "Clear error categories.", "A local test friendly design with isolated state directories."],
        isnot: ["A published HTTP API or SDK.", "A plugin system.", "Webhooks or event streams.", "Linux support."],
      },
      {
        t: "faq",
        title: "Developer questions",
        items: [
          { q: "Is there an API?", a: "The first milestone is command line first. A public API is not part of it." },
          { q: "Can I run several Barns on one machine for testing?", a: "Yes. Use separate state directories and ports. The coordinator and Nodes are designed to run in isolation." },
          { q: "Where is the source?", a: "Repository details will be published before launch. See the open source page for what we plan to share." },
          { q: "How do I report a bug?", a: "Run barn doctor --json and attach the output. It contains no secrets." },
        ],
      },
      others("homelabs", "teams", "individuals"),
      cta("Script your own", "private infrastructure."),
    ],
  },
};

export const solutionSlugs = Object.keys(solutions);
