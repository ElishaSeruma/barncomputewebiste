import {
  type AreaDef,
  cards,
  code,
  folder,
  future,
  h2,
  note,
  ol,
  os,
  p,
  page,
  section,
  table,
  tip,
  ul,
  warn,
} from "../types";

export const build: AreaDef = {
  id: "build",
  title: "Build",
  tagline: "Create Barns, enrol Nodes, share files and connect devices.",
  icon: "layers",
  sections: [
    // ------------------------------------------------------------------ Barns
    section("barns", "Barns", [
      page("overview", "Barns overview", "Everything you can do with a Barn and its coordinator.", [
        p("A Barn is created on one computer, the coordinator. The coordinator issues the Barn's identity, keeps the registry of approved Nodes, and records shares and audit events."),
        cards(
          { title: "Create a Barn", text: "Initialise a Barn and its certificate authority.", href: "/docs/build/barns/create-a-barn" },
          { title: "Run the coordinator", text: "Start it, stop it and keep it healthy.", href: "/docs/build/barns/coordinator" },
          { title: "Invites and enrolment", text: "Let a new device ask to join.", href: "/docs/build/barns/invites" },
          { title: "Renew certificates", text: "Change the address a Barn is reached at.", href: "/docs/build/barns/certificate-renewal" }
        ),
      ], { badge: "Pre-alpha" }),
      page("create-a-barn", "Create a Barn", "Initialise the coordinator, generate the Barn identity and export the public certificate.", [
        code("barn coordinator init --name LabBarn --advertise 192.168.1.10"),
        p("This creates the state directory, a per-Barn certificate authority, a certificate for the coordinator, and a signing identity used to authorise transfers. It prints the Barn ID and the fingerprint of the public certificate."),
        note("Write the fingerprint down or keep the terminal open. You will compare it on every device you add."),
        h2("Options"),
        table(
          ["Flag", "Description"],
          ["--name", "A human friendly name for the Barn."],
          ["--advertise", "The IP address or hostname other devices use to reach the coordinator. It is placed in the certificate."],
          ["--state-dir", "Where to keep coordinator state. Useful for tests and multiple instances."]
        ),
        h2("Export the public certificate"),
        code("barn coordinator ca export --output ./barn-ca.pem"),
        p("The public certificate is not a secret. Private keys never leave the coordinator state directory."),
        warn("Barn will refuse to initialise over an existing Barn. It never regenerates the Barn identity on restart."),
      ], { badge: "Pre-alpha" }),
      page("coordinator", "Run the coordinator", "Start the coordinator service and understand what it listens on.", [
        code("barn coordinator start --bind 0.0.0.0 --port 8443"),
        p("The coordinator runs in the foreground and responds to Ctrl+C. Administrative commands use a separate local-only service, so run them from another terminal on the same machine."),
        h2("Ports"),
        table(
          ["Service", "Default", "Reachable from"],
          ["Control plane (HTTPS)", "8443", "Devices on your network"],
          ["Admin (loopback)", "8754", "This machine only"]
        ),
        tip("The coordinator can run alongside a Node on the same computer. They use separate state directories and ports."),
        h2("After a restart"),
        p("Node identities, shares and the registry are restored. Nodes show as not online until they send fresh heartbeats."),
      ], { badge: "Pre-alpha" }),
      page("trust-and-certificates", "Trust and certificates", "How devices verify that they are talking to the right coordinator.", [
        p("Every Barn has its own certificate authority. A device joins by importing the Barn's public certificate over a channel you trust, and verifying its fingerprint against the one the coordinator displayed."),
        h2("Verify the fingerprint"),
        ol("Run the init command on the coordinator and note the fingerprint.", "Copy `barn-ca.pem` to the new device.", "Compare the fingerprint the new device computes with the one you noted.", "Only continue if they match."),
        warn("Barn has no insecure mode. There is no flag to skip certificate checks, and it will not trust a certificate downloaded from an unverified source."),
        cards({ title: "Security overview", text: "The wider trust model.", href: "/docs/build/security/overview" }),
      ], { badge: "Pre-alpha" }),
      page("invites", "Invites and enrolment", "Invites let a new device ask to join. Approval is separate.", [
        code("barn coordinator invite --ttl 10m"),
        ul("An invite is a single use code with an expiry.", "Only a hash of the code is stored on the coordinator.", "A valid code alone does not make a device a member. You still approve it.", "Failed attempts are rate limited."),
        h2("Review pending requests"),
        code("barn coordinator enrolments\nbarn coordinator approve <REQUEST_ID>"),
        tip("Check the device name and fingerprint shown in the request before approving."),
      ], { badge: "Pre-alpha" }),
      page("certificate-renewal", "Renew certificates", "Change the address of a coordinator without recreating the Barn.", [
        p("If the coordinator's IP address or hostname changes, its certificate no longer matches. Renew it instead of creating a new Barn."),
        code("barn coordinator cert renew --advertise 192.168.1.50"),
        p("Then update the coordinator address stored on each Node. The Barn identity does not change."),
        note("Use stable addresses where you can. A DHCP reservation on your router avoids most renewals."),
      ], { badge: "Pre-alpha" }),
      page("backups", "Back up coordinator state", "What to keep safe so you can recover a Barn.", [
        p("The coordinator state directory holds the Barn identity, the registry and shares. Losing it means creating a new Barn and enrolling every device again."),
        ul("Stop the coordinator before copying its state directory.", "Store the copy somewhere private. It contains private keys.", "Never commit state to source control."),
        future("Built in backup and restore commands are being considered. This page describes the manual approach.", "Planned"),
      ], { badge: "Planned" }),
    ]),

    // ------------------------------------------------------------------ Nodes
    section("nodes", "Nodes", [
      page("overview", "Nodes overview", "A Node is one approved device in a Barn.", [
        p("Each Node runs an agent that keeps its own files, reports availability to the coordinator, and transfers files directly to other Nodes."),
        cards(
          { title: "Enrol a Node", text: "Ask to join a Barn.", href: "/docs/build/nodes/enrol-a-node" },
          { title: "Approve a Node", text: "Review and admit a device.", href: "/docs/build/nodes/approve-a-node" },
          { title: "Availability", text: "Online, suspect and offline.", href: "/docs/build/nodes/availability" },
          { title: "Revoke a Node", text: "Remove a device from the Barn.", href: "/docs/build/nodes/revoke-a-node" }
        ),
      ], { badge: "Pre-alpha" }),
      page("enrol-a-node", "Enrol a Node", "Create a Node identity and ask a coordinator to admit it.", [
        p("Enrolment has two parts: prepare the Node locally, then submit a request to the coordinator."),
        os(
          "barn node init --name MacNode --advertise 192.168.1.10 --peer-port 8445\nbarn node enroll --coordinator https://192.168.1.10:8443 --ca-cert ./barn-ca.pem --code <CODE>",
          "barn node init --name WindowsNode --advertise 192.168.1.20 --peer-port 8445\nbarn node enroll --coordinator https://192.168.1.10:8443 --ca-cert .\\barn-ca.pem --code <CODE>"
        ),
        p("`node init` generates the Node's private identity locally. It is never sent anywhere. `node enroll` sends the public part with a proof that you hold the private key."),
        note("You do not need the agent running to enrol. Start it after the request is approved."),
      ], { badge: "Pre-alpha" }),
      page("approve-a-node", "Approve a Node", "Review a pending request and admit the device to the Barn.", [
        code("barn coordinator enrolments\nbarn coordinator approve <REQUEST_ID>"),
        p("Approval consumes the invite, registers the Node's identity, and issues it a certificate signed by the Barn. The Node then starts sending heartbeats."),
        warn("Approve only requests you recognise. If the name or fingerprint looks wrong, reject the request and investigate."),
      ], { badge: "Pre-alpha" }),
      page("identity", "Node identity", "Node IDs, keys and what persists across restarts.", [
        p("A Node ID is a random identifier. It is not an address. A Node keeps its identity across restarts, upgrades and IP address changes."),
        table(
          ["Item", "Where it lives", "Shared?"],
          ["Private identity key", "The Node's state directory", "Never"],
          ["Node ID", "Node and coordinator", "Yes"],
          ["Public key and certificate", "Node and coordinator", "Yes"]
        ),
        tip("Back up the Node state directory if you want to keep the same Node identity after a reinstall."),
      ], { badge: "Pre-alpha" }),
      page("availability", "Node availability", "How online, suspect and offline are decided.", [
        p("Every five seconds an approved Node sends a signed heartbeat. If heartbeats stop, the coordinator marks the Node suspect after 15 seconds and offline after 30 seconds. All three values can be configured."),
        code("barn nodes"),
        table(
          ["State", "Colour cue", "What it means"],
          ["Online", "Green", "Recent heartbeat and a reachable peer endpoint."],
          ["Suspect", "Yellow", "No valid heartbeat recently."],
          ["Offline", "Red", "No heartbeat for longer than the offline threshold."]
        ),
        note("A heartbeat proves the coordinator can hear the Node. It does not by itself prove other Nodes can reach it. `barn doctor` checks the peer endpoint too."),
      ], { badge: "Pre-alpha" }),
      page("run-the-agent", "Run the Node agent", "Start the agent that keeps a Node online and moves files.", [
        code("barn node start --bind 0.0.0.0 --peer-port 8445"),
        p("The agent runs in the foreground by default. It reconnects on its own after network interruptions, using exponential backoff with jitter."),
        future("Running the agent as a background service on login is planned. For now, keep it in a terminal or use your operating system's own tools.", "Planned"),
      ], { badge: "Pre-alpha" }),
      page("revoke-a-node", "Revoke a Node", "Remove a device so it can no longer take part in the Barn.", [
        code("barn coordinator revoke <NODE_ID>"),
        p("A revoked Node cannot send heartbeats, receive new shares or start new transfers. Bytes already delivered cannot be recalled, so revoke quickly if a device is lost."),
        warn("Offline is not the same as revoked. A device that is switched off can return. A revoked device cannot."),
      ], { badge: "Pre-alpha" }),
    ]),

    // ------------------------------------------------------------------ Files
    section("files", "Files and sharing", [
      page("overview", "Files overview", "Import, share and fetch files between Nodes.", [
        ol("Import a file into managed storage.", "Create a share for one Node.", "The recipient fetches the share."),
        cards(
          { title: "Managed files", text: "Import and list files.", href: "/docs/build/files/managed-files" },
          { title: "Create a share", text: "Give one Node access.", href: "/docs/build/files/create-a-share" },
          { title: "Fetch a share", text: "Download and verify.", href: "/docs/build/files/fetch-a-share" },
          { title: "Limits and quotas", text: "Sizes and storage limits.", href: "/docs/build/files/limits-and-quotas" }
        ),
      ], { badge: "Pre-alpha" }),
      page("managed-files", "Managed files", "Import a file into Barn managed storage.", [
        code("barn file add ./sample.bin --name sample.bin\nbarn file list"),
        p("Barn copies the file into private managed storage while hashing it, then records the size, an overall checksum, and a checksum for each one megabyte chunk."),
        ul("Symlinks and special files are refused.", "The original path is never exposed to other devices.", "Empty files are supported."),
        note("The managed copy is immutable. Edit the original and import again to share a new version."),
      ], { badge: "Pre-alpha" }),
      page("create-a-share", "Create a share", "Give one Node read access to one file, for a limited time.", [
        code("barn share create <FILE_ID> --to <NODE_ID> --ttl 30m"),
        table(
          ["Rule", "Detail"],
          ["Who can create", "The owner of the file."],
          ["Who can receive", "One other approved Node in the same Barn."],
          ["Access", "Read only."],
          ["Lifetime", "Until the time limit, or until you revoke it."]
        ),
        h2("Revoke a share"),
        code("barn share list\nbarn share revoke <SHARE_ID>"),
        p("Revoking stops new transfers from starting. It cannot recall bytes that have already been delivered."),
      ], { badge: "Pre-alpha" }),
      page("fetch-a-share", "Fetch a share", "Download a shared file to a path on your device.", [
        code("barn share inbox\nbarn share fetch <SHARE_ID> --output ./received.bin"),
        p("The output path is a local path on the receiving device. Barn will not overwrite an existing file, and it cleans up partial output if something fails."),
        ul("Every chunk is verified as it arrives.", "The final file is checked against the recorded checksum and size.", "The file is never opened or run for you."),
        tip("Check progress with `barn transfer status <TRANSFER_ID>`."),
      ], { badge: "Pre-alpha" }),
      page("transfers", "Transfers", "Monitor, resume and cancel transfers.", [
        code("barn transfer list\nbarn transfer status <TRANSFER_ID>\nbarn transfer resume <TRANSFER_ID>\nbarn transfer cancel <TRANSFER_ID>"),
        table(
          ["Command", "Purpose"],
          ["list", "Show current and recent transfers."],
          ["status", "Show verified chunks, bytes and retries."],
          ["resume", "Continue an interrupted transfer."],
          ["cancel", "Stop requesting chunks. Verified chunks are kept for a while."]
        ),
        note("A transfer cannot finish while the sending Node is offline. Bring it back online and resume."),
      ], { badge: "Pre-alpha" }),
      page("resume-and-recovery", "Resume and recovery", "How Barn recovers from interrupted transfers.", [
        p("Files move in one megabyte chunks. Each chunk is verified and saved before it is recorded. If a transfer is interrupted, Barn resumes from the chunks it already verified instead of starting again."),
        h2("Common interruptions"),
        table(
          ["What happened", "What to do"],
          ["Sender went offline", "Bring it back online, then run `barn transfer resume`."],
          ["Your agent restarted", "Start the agent. The transfer resumes from its journal."],
          ["Network dropped", "Barn retries automatically with backoff."],
          ["A chunk failed its check", "It is discarded and fetched again. A corrupt file is never committed."]
        ),
        warn("If the underlying file changed, the transfer fails with a checksum error. Barn never stitches together different versions of a file."),
      ], { badge: "Pre-alpha" }),
      page("limits-and-quotas", "Limits and quotas", "Default size limits, and how to reason about storage.", [
        table(
          ["Limit", "Default"],
          ["Maximum file size", "512 MiB"],
          ["Chunk size", "1 MiB"],
          ["Managed storage per Node", "2 GiB (suggested)"],
          ["Concurrent chunk downloads", "2"],
          ["Transfer permission lifetime", "30 minutes"]
        ),
        p("Files over the limit are refused before anything is copied, with a structured error. Memory use stays bounded because files are streamed."),
        note("Limits are configurable within documented bounds. These defaults are draft values."),
      ], { badge: "Pre-alpha" }),
      page("share-lifecycle", "Share lifecycle", "From creation to expiry.", [
        ol("Created: the owner picks a file, a recipient and a lifetime.", "Active: the recipient can start a transfer.", "In use: a transfer runs with its own short lived permission.", "Expired or revoked: new transfers are denied."),
        p("A share controls when a transfer can start. An active transfer has its own limited lifetime, and is renewed only while the share remains active."),
      ], { badge: "Pre-alpha" }),
    ]),

    // ------------------------------------------------------------------ Networking
    section("networking", "Networking", [
      page("overview", "Networking overview", "How Nodes reach the coordinator and each other.", [
        p("Nodes talk to the coordinator over HTTPS for membership and authorisation. Files travel directly between Nodes over authenticated HTTPS. Barn prefers direct connections and never sends file bytes through the coordinator."),
        cards(
          { title: "Addressing", text: "Stable addresses and ports.", href: "/docs/build/networking/addressing" },
          { title: "Direct connections", text: "How Nodes reach each other.", href: "/docs/build/networking/direct-connections" },
          { title: "Firewalls", text: "Allow Barn safely.", href: "/docs/build/networking/firewalls/macos" },
          { title: "Diagnostics", text: "Find out what is wrong.", href: "/docs/build/networking/diagnostics" }
        ),
      ], { badge: "Pre-alpha" }),
      page("addressing", "Addressing", "IP addresses are locators. Node IDs are identities.", [
        p("Barn needs a stable address or hostname for the coordinator and for each Node. There is no network scanning or broadcast discovery."),
        table(
          ["Setting", "Default"],
          ["Coordinator port", "8443"],
          ["Node peer port", "8445"]
        ),
        tip("Give each device a DHCP reservation on your router. It keeps addresses stable without manual configuration."),
        warn("The address you advertise must match the certificate. If it changes, renew the certificate."),
      ], { badge: "Pre-alpha" }),
      page("direct-connections", "Direct connections", "Node to Node transfers without an intermediary.", [
        p("The receiving Node asks the coordinator for permission, then connects directly to the sending Node's peer endpoint and downloads chunks."),
        ul("Both devices must be able to reach each other's peer port.", "Certificates are verified on every connection.", "There are no insecure fallbacks."),
        note("If a direct connection is not possible, the transfer fails with a clear error. See [Public Wi-Fi](/docs/build/networking/public-wifi) for planned alternatives."),
      ], { badge: "Pre-alpha" }),
      folder("firewalls", "Firewalls", [
        page("macos", "macOS firewall", "Allow Barn through the macOS firewall.", [
          p("When the firewall is enabled, macOS asks whether to allow incoming connections for the Python interpreter running Barn. Allow it."),
          ul("Do not turn the firewall off.", "Prefer allowing only the interpreter in your Barn virtual environment."),
        ], { badge: "Pre-alpha", navLabel: "macOS" }),
        page("windows", "Windows Firewall", "Allow the Barn peer port on private networks.", [
          p("Create an inbound rule for the Node peer port, scoped to private networks."),
          code("New-NetFirewallRule -DisplayName 'Barn peer' -Direction Inbound -Protocol TCP -LocalPort 8445 -Profile Private -Action Allow", "powershell", "PowerShell (administrator)"),
          warn("Never disable the whole firewall to make Barn work."),
        ], { badge: "Pre-alpha", navLabel: "Windows" }),
      ]),
      page("diagnostics", "Diagnostics", "Use barn doctor to find connectivity and trust problems.", [
        code("barn doctor\nbarn doctor --json"),
        p("The report covers platform and versions, certificate fingerprints and validity, local ports, coordinator connectivity, clock skew, Node approval, heartbeat, and peer reachability. Secrets are never printed, so the JSON output is safe to attach to a bug report."),
      ], { badge: "Pre-alpha" }),
      page("public-wifi", "Public Wi-Fi and relays", "What happens when devices cannot reach each other directly.", [
        future("Relay data transport exists in the M1 work, but complete public-Wi-Fi operation is still an M1 closure gate.", "Closure gate"),
        p("Some networks let devices reach the internet but isolate clients from each other. M1 data relay work is designed so a separately deployed WSS relay can route bounded encrypted streams between approved Barn peers without becoming a Barn authority."),
        ul("The relay must not receive node private keys, coordinator admin tokens, Barn CA private keys or plaintext file bytes.", "A relay ticket controls relay admission only; it does not approve a Node and does not authorise a file.", "The remaining closure gap is coordinator control traffic: Nodes still need an outbound-only authenticated path to the coordinator when direct LAN reachability is blocked."),
        note("Do not solve this by disabling TLS verification, opening router ports, using UPnP, turning off firewalls or tunnelling through an unknown third party."),
      ], { badge: "Closure gate" }),
    ]),

    // ------------------------------------------------------------------ Security
    section("security", "Security and trust", [
      page("overview", "Security overview", "How Barn approaches trust. Details will be published with the release.", [
        note("This page is a high level summary. It does not describe internal protocols, and it makes no absolute guarantees."),
        ul(
          "Membership is explicit. Devices are approved before they join.",
          "Devices have persistent identities.",
          "Connections are encrypted and verified against your Barn's certificate.",
          "File access is explicit, per Node, and time limited.",
          "Transfers are integrity checked."
        ),
        cards(
          { title: "Trust model", text: "Who is trusted with what.", href: "/docs/build/security/trust-model" },
          { title: "Integrity checks", text: "How files are verified.", href: "/docs/build/security/integrity-checks" }
        ),
      ], { badge: "Pre-alpha" }),
      page("trust-model", "Trust model", "What the coordinator, Nodes and administrators are trusted to do.", [
        table(
          ["Role", "Trusted to"],
          ["Administrator", "Approve devices and control who can share."],
          ["Coordinator", "Keep the registry and authorise transfers."],
          ["Node", "Protect the files in its own managed storage."]
        ),
        warn("The coordinator is an administrative authority. Confidentiality against a compromised coordinator is not a goal of the first milestone."),
        p("Other processes running as the same operating system user on a Node are outside Barn's isolation boundary."),
      ], { badge: "Pre-alpha" }),
      page("approval-and-membership", "Approval and membership", "Why a valid invite is not membership.", [
        ol("An administrator creates a single use, expiring invite.", "The new device proves it holds its private key.", "The request waits for approval.", "Only after approval is the device a member."),
        tip("Treat invites like short lived passwords. Share them privately and let them expire."),
      ], { badge: "Pre-alpha" }),
      page("integrity-checks", "Integrity checks", "How Barn knows a file arrived intact.", [
        p("Every chunk is hashed and compared to the recorded value before it is kept. When all chunks are present, the final file is checked for size and overall checksum before it is exported."),
        code("shasum -a 256 ./sample.bin ./received.bin", "bash", "macOS"),
        note("Integrity checking detects corruption and tampering with content. It does not hide the content from anyone with access to the file."),
      ], { badge: "Pre-alpha" }),
      page("local-access", "Local access", "How the CLI talks to your own agent.", [
        p("The CLI controls your local agent and coordinator through services that listen on the loopback interface only. A private, randomly generated secret protects them, stored outside your project folders."),
        ul("Never expose these services on a LAN address.", "Do not copy the secret into scripts or shell history."),
      ], { badge: "Pre-alpha" }),
      page("data-at-rest", "Data at rest", "Encrypting stored files on a Node.", [
        future("Encryption of managed files at rest is planned for the storage milestone. Today, protect your devices with full disk encryption from your operating system.", "Planned"),
      ], { badge: "Planned" }),
      page("reporting-issues", "Reporting a security issue", "How to tell the team about a vulnerability.", [
        p("A dedicated disclosure address will be published before release. Until then, do not post details of a suspected vulnerability publicly and do not include private keys, local admin tokens, invite codes, state directories, relay credentials or sensitive file contents in any public report."),
        note("For now, use the contact page for a non-sensitive first message and say you need a private security channel."),
      ], { badge: "Pre-alpha" }),
    ]),
  ],
};
