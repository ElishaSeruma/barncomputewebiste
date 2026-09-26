import { h2, note, p, tip, ul } from "@/lib/docs/types";
import type { BlogPost } from "./types";

// Draft posts. Titles, dates and copy are placeholders that will be replaced before launch.
export const posts: BlogPost[] = [
  {
    slug: "introducing-barn",
    title: "Introducing Barn: your devices, one private network",
    excerpt: "Most of us own several capable computers that behave like strangers. Barn is a foundation for making them work as one private environment.",
    category: "Announcement",
    date: "September 2026",
    readMinutes: 6,
    author: "The Barn team",
    icon: "rocket",
    blocks: [
      p("A desktop here. A laptop there. A spare machine sitting in a drawer. Most people now own several capable computers, and almost none of them know the others exist. When one needs to reach another, the default answer is to send the data somewhere else first and bring it back."),
      p("Barn starts from a different question: what if the devices you already trust could operate as one private computing environment? Not a public network, not somebody else's cloud, just your own machines, deliberately connected."),
      h2("What a Barn is"),
      p("A **Barn** is a private group of approved devices. Each device in it is a **Node**. Joining is never automatic. A device becomes a member only after you approve it, and nothing about being on the same Wi-Fi network changes that."),
      p("Once devices are in a Barn, they can recognise each other, report whether they are available, and exchange files when you explicitly allow it."),
      h2("What we are building first"),
      ul(
        "Creating a Barn and its trust boundary.",
        "Enrolling and approving Nodes, each with its own persistent identity.",
        "Availability monitoring, so you can see which devices are online.",
        "Explicit, per device file sharing with integrity checks and resumable transfers.",
        "macOS and Windows as the first desktop targets."
      ),
      note("This is the M1 foundation and it is in development. We will only describe something as available once it has passed acceptance testing."),
      h2("Where it goes next"),
      p("File exchange is the beginning, not the destination. The same trusted network is meant to support distributed storage and, later, compute and AI workloads across hardware you control. Those are directions, and we label them that way."),
      h2("Why start with the foundation"),
      p("Storage and compute only become useful when the devices underneath can identify, trust, reach, and coordinate with one another reliably. So that is where we begin. Follow along in the [docs](/docs) or on the [roadmap](/roadmap)."),
    ],
  },
  {
    slug: "why-file-exchange-first",
    title: "Why we started with file exchange",
    excerpt: "File sharing is a modest first feature. It is also the fastest way to prove that devices can trust and reach each other.",
    category: "Engineering",
    date: "September 2026",
    readMinutes: 5,
    author: "The Barn team",
    icon: "transfer",
    blocks: [
      p("It would have been more exciting to lead with distributed storage or compute. We chose file exchange instead, and it was a deliberate call."),
      h2("It exercises everything that matters"),
      p("Moving one file between two devices, safely, touches almost every hard problem the rest of Barn depends on: who is allowed to do what, how devices find each other, what happens when a network drops, and how you know the bytes that arrived are the bytes that were sent."),
      ul(
        "**Identity and approval.** A transfer only makes sense between devices that were admitted on purpose.",
        "**Authorisation.** Access is per file, per Node and time limited, which forces a precise permission model.",
        "**Reliability.** Interruptions are normal. Resuming from verified chunks is a real test of the design.",
        "**Integrity.** Every chunk and the final file are checked, so corruption cannot pass quietly."
      ),
      h2("It is honest to test"),
      p("File exchange either works or it does not. There is no ambiguity in a checksum. That makes it an excellent acceptance test for a foundation: two real machines, a large file in each direction, an interruption in the middle, and a matching hash at the end."),
      h2("It is useful on its own"),
      p("A private way to move large files between your own computers, without a middleman, is useful today. It also gives early users something concrete to try while the larger ideas take shape."),
      tip("New to Barn? The [quickstart](/docs/start/quickstart) takes about ten minutes and ends with a shared file."),
      h2("What it is not"),
      p("Barn's transfers are not distributed storage. The sender keeps its file and the receiver gets its own copy. Placing data across several Nodes is a separate, planned milestone."),
    ],
  },
  {
    slug: "explicit-trust-in-practice",
    title: "What explicit trust looks like in practice",
    excerpt: "Barn never lets a device join because it is nearby, and never shares a file because two devices belong to the same Barn. Here is how that plays out.",
    category: "Security",
    date: "September 2026",
    readMinutes: 6,
    author: "The Barn team",
    icon: "shield",
    blocks: [
      p("Two rules shape almost everything in Barn: membership is deliberate, and sharing is deliberate. Neither happens as a side effect of something else."),
      h2("Membership is a decision"),
      p("A new device asks to join using a short lived, single use invite. That alone does not admit it. The request waits until an administrator reviews it and approves it. Only then does the device become a Node."),
      ul(
        "Invites expire quickly and cannot be reused.",
        "A device proves it holds its own private key when it asks to join.",
        "Approval is separate from the invite, so a leaked code alone is not enough.",
        "An administrator can revoke a Node at any time."
      ),
      h2("Sharing is a second decision"),
      p("Belonging to a Barn does not expose your files. To share, you first import a file into managed storage, then create a share that names one recipient Node and a lifetime. The recipient can start a transfer only while the share is active."),
      h2("Nothing is absolute"),
      p("We avoid claiming that any system is perfectly secure, and Barn is no exception. The coordinator is an administrative authority, other processes running as your own user are outside the boundary, and integrity checks detect tampering but do not hide content."),
      note("The security pages in the docs are a high level summary. Detailed engineering material will be published separately."),
      h2("Why this matters"),
      p("When trust is explicit, mistakes are visible. You can always answer two questions: which devices are in my Barn, and which files can they reach? That clarity is the point. Read more in the [security overview](/docs/build/security/overview)."),
    ],
  },
  {
    slug: "availability-without-guessing",
    title: "Availability, without the guesswork",
    excerpt: "Is that machine actually reachable? Barn separates a healthy heartbeat from a reachable peer, and shows you three clear states.",
    category: "Engineering",
    date: "September 2026",
    readMinutes: 5,
    author: "The Barn team",
    icon: "activity",
    blocks: [
      p("Most tools say a device is online as long as it recently said something. That is a low bar. A machine can talk to a coordinator and still be unreachable by the device that needs its file."),
      h2("Three states"),
      p("Each approved Node sends a signed heartbeat every few seconds. If they stop, the coordinator moves the Node through three states."),
      ul(
        "**Online.** A recent, valid heartbeat and a reachable peer endpoint.",
        "**Suspect.** No valid heartbeat for about 15 seconds. It might just be a blip.",
        "**Offline.** No heartbeat for about 30 seconds."
      ),
      p("A fourth state, revoked, is different in kind. It is an administrator's decision, not a symptom."),
      h2("Heartbeat is not reachability"),
      p("The coordinator hearing from a Node proves one path works. It does not prove another Node can connect to it. That is why Barn treats the peer endpoint separately and why `barn doctor` checks both."),
      h2("Recovery is boring on purpose"),
      p("When a network drops, the agent keeps trying with exponential backoff and jitter. When the coordinator restarts, it does not treat old heartbeats as current. Nodes are non-online until they report in again."),
      tip("See [availability](/docs/build/nodes/availability) in the docs for the exact thresholds and how to change them."),
    ],
  },
  {
    slug: "road-to-distributed-storage",
    title: "The road from file exchange to distributed storage",
    excerpt: "M2 is about spreading data across trusted Nodes. Here is what it builds on, and what we are careful not to promise.",
    category: "Roadmap",
    date: "September 2026",
    readMinutes: 5,
    author: "The Barn team",
    icon: "database",
    blocks: [
      p("Barn's first milestone moves whole files between two Nodes. The next planned milestone explores something bigger: letting a Barn decide where data lives across several Nodes, so you do not manage every physical location by hand."),
      h2("What carries over"),
      ul(
        "The same explicit membership and identity model.",
        "The same integrity checks on data in motion.",
        "The same authorisation model, extended to placement."
      ),
      h2("What is new"),
      p("Placing data on more than one Node, recovering it when a Node is lost, and letting you set rules for it. Each of these introduces new questions about key ownership, encryption at rest, and how a lost device is replaced."),
      note("This is a planned direction, not a feature. We will not describe distributed storage as available until it has been built and verified."),
      h2("Deliberately not in M1"),
      p("Today, a transfer copies a file from one Node to another. The source keeps its copy. The source must be online to finish a new transfer. That is honest and simple, and it is the right base to build placement on."),
      p("Follow progress on the [roadmap](/roadmap) or read the [storage overview](/product/distributed-storage)."),
    ],
  },
  {
    slug: "two-laptops-ten-minutes",
    title: "Two laptops in ten minutes",
    excerpt: "The smallest useful Barn is a Mac and a Windows PC. Here is the path from install to a verified file.",
    category: "Guides",
    date: "September 2026",
    readMinutes: 4,
    author: "The Barn team",
    icon: "laptop",
    blocks: [
      p("You do not need a server room to try Barn. Two ordinary computers on the same trusted network are enough."),
      h2("What you need"),
      ul("Two computers, for example a Mac and a Windows laptop.", "Python 3.11 or 3.12 on both.", "A stable local address for each."),
      h2("The short version"),
      ul(
        "Install Barn on both machines.",
        "On the first machine, create the Barn and start the coordinator.",
        "Create an invite and enrol the second machine.",
        "Approve the request on the first machine.",
        "Import a file, share it with the other Node, and fetch it."
      ),
      p("At the end, compare checksums on both machines. They should match."),
      note("The commands are in the [quickstart](/docs/start/quickstart). If something goes wrong, `barn doctor` is the first thing to try."),
      h2("Where to go from here"),
      p("Add a third device, try a larger file, or interrupt a transfer on purpose and watch it resume from the verified chunks. The [guides](/docs/guides) walk through each."),
    ],
  },
];

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug);
}

export function getAllPostSummaries() {
  return posts.map(({ slug, title, excerpt, category, date, readMinutes, icon }) => ({
    slug,
    title,
    excerpt,
    category,
    date,
    readMinutes,
    icon,
  }));
}

export function getRelatedPosts(slug: string, count = 2) {
  return posts.filter((p) => p.slug !== slug).slice(0, count);
}
