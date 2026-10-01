import {
  type AreaDef,
  cards,
  code,
  folder,
  h2,
  h3,
  note,
  ol,
  os,
  p,
  page,
  section,
  steps,
  table,
  tip,
  ul,
  warn,
} from "../types";

export const start: AreaDef = {
  id: "start",
  title: "Getting started",
  tagline: "Install Barn and connect your first two devices.",
  icon: "rocket",
  sections: [
    section("", "Overview", [
      page(
        "introduction",
        "What is Barn?",
        "Barn Computing turns the devices you trust into a private computing network that can work together.",
        [
          p("A **Barn** is a private group of approved devices. Each device in a Barn is a **Node**. Barn gives those Nodes a trusted environment to recognise one another, report availability, communicate, and exchange files."),
          note("These docs describe the M1 foundation, which is in development. Anything beyond it is labelled Planned or Future.", "Status"),
          h2("The idea in one minute"),
          p("Most of your computers work as separate islands, with online services acting as the middleman between them. Barn starts from a different question: what if the devices you already trust could operate as one private environment?"),
          ul(
            "**Create a Barn** on a computer that acts as the coordinator.",
            "**Enrol Nodes**, each one approved by you before it joins.",
            "**Watch availability**, so you can see which Nodes are online.",
            "**Share files** explicitly with one chosen Node at a time."
          ),
          h2("What Barn is not"),
          ul(
            "Not a public peer-to-peer network. Only devices you approve can join.",
            "Not a cloud drive. Files stay on your own devices.",
            "Not a blockchain or cryptocurrency project.",
            "Not a finished distributed storage or compute platform. Those are on the roadmap."
          ),
          h2("Where to go next"),
          cards(
            { title: "Quickstart", text: "Connect two devices and share a file.", href: "/docs/start/quickstart" },
            { title: "Core concepts", text: "Barns, Nodes, managed files, shares and transfers.", href: "/docs/start/concepts/barns" },
            { title: "CLI reference", text: "Every barn command and flag.", href: "/docs/cli/overview" },
            { title: "Roadmap", text: "What is built and what is next.", href: "/docs/roadmap/overview" }
          ),
        ],
        { badge: "Pre-alpha" }
      ),
      page(
        "quickstart",
        "Quickstart",
        "Create a Barn, enrol a second device and share a file in about ten minutes.",
        [
          p("This walkthrough uses two computers on the same trusted network: a Mac that hosts the coordinator, and a Windows PC that joins it. You can use two Macs or two Windows machines too."),
          note("You need Python 3.11 or 3.12 on both machines and a stable local IP address for each. See [Requirements](/docs/start/install/requirements)."),
          steps(
            {
              title: "Install Barn on both machines",
              body: "Create a virtual environment and install the package. Full instructions are in [Installation](/docs/start/install/platform/macos).",
              code: "python -m pip install --no-deps 'barnCompute==0.1.0a1'",
            },
            {
              title: "Create the Barn",
              body: "On the machine that will host the coordinator, initialise a Barn and export its public certificate.",
              code: "barn coordinator init --name LabBarn --advertise 192.168.1.10\nbarn coordinator ca export --output ./barn-ca.pem",
            },
            {
              title: "Start the coordinator",
              body: "Leave this running in its own terminal.",
              code: "barn coordinator start --bind 0.0.0.0 --port 8443",
            },
            {
              title: "Create an invite",
              body: "Invites are single use and expire quickly. Copy the code to the second machine over a channel you trust.",
              code: "barn coordinator invite --ttl 10m",
            },
            {
              title: "Enrol the second device",
              body: "Copy the public certificate to the new device, check its fingerprint, then enrol.",
              code: "barn node init --name WindowsNode --advertise 192.168.1.20 --peer-port 8445\nbarn node enroll --coordinator https://192.168.1.10:8443 --ca-cert ./barn-ca.pem --code <CODE>",
            },
            {
              title: "Approve it",
              body: "Back on the coordinator machine, review the pending request and approve it.",
              code: "barn coordinator enrolments\nbarn coordinator approve <REQUEST_ID>",
            },
            {
              title: "Start the node agent and check status",
              body: "Run the agent on the new device, then confirm both Nodes show as online.",
              code: "barn node start --bind 0.0.0.0 --peer-port 8445\nbarn nodes",
            }
          ),
          tip("Run `barn doctor` on each machine if anything looks wrong. It checks certificates, ports and connectivity without printing secrets."),
          h2("Share your first file"),
          code("barn file add ./sample.bin\nbarn share create <FILE_ID> --to <NODE_ID> --ttl 30m"),
          p("On the receiving machine, look in your inbox and fetch the file."),
          code("barn share inbox\nbarn share fetch <SHARE_ID> --output ./received.bin"),
        ],
        { badge: "Pre-alpha" }
      ),
    ]),
    section("install", "Installation", [
      page(
        "requirements",
        "Requirements",
        "What you need before installing Barn.",
        [
          h2("Supported platforms"),
          table(
            ["Platform", "Status", "Notes"],
            ["macOS", "M1 target", "Current supported releases, Apple silicon and Intel."],
            ["Windows", "M1 target", "Current supported releases, x64."],
            ["Linux", "Not yet", "Not a first target. Track the roadmap."]
          ),
          h2("Software"),
          ul("Python 3.11 or 3.12", "pip and the venv module", "A terminal: zsh on macOS, PowerShell on Windows"),
          h2("Network"),
          ul(
            "Both devices on the same trusted local network.",
            "A stable IP address or hostname for each device.",
            "The coordinator port (default 8443) and each Node peer port (default 8445) reachable on your private network."
          ),
          warn("Guest and public Wi-Fi networks often isolate clients from one another. If your devices cannot reach each other, see [Public Wi-Fi](/docs/build/networking/public-wifi)."),
        ],
        { badge: "Pre-alpha" }
      ),
      folder("platform", "Platform guides", [
        page(
          "macos",
          "Install on macOS",
          "Install Barn into a clean virtual environment on macOS.",
          [
            p("Barn is an alpha package. Install it into an isolated virtual environment rather than your system Python."),
            code("python3.12 -m venv .venv-barn\nsource .venv-barn/bin/activate\npython -m pip install --upgrade pip", "bash", "zsh"),
            p("Install the runtime dependencies first, then the Barn package itself."),
            code("python -m pip install -r requirements/runtime-test.txt\npython -m pip install --no-deps 'barnCompute==0.1.0a1'", "bash", "zsh"),
            note("The current published alpha is `barnCompute==0.1.0a1` on TestPyPI. Install runtime dependencies from production PyPI first, then install the Barn package with `--no-deps` when reproducing release evidence."),
            h2("Allow incoming connections"),
            p("If the macOS firewall is on, allow the Python interpreter when prompted so other devices can reach your Node. Do not disable the firewall entirely."),
          ],
          { badge: "Alpha", navLabel: "macOS" }
        ),
        page(
          "windows",
          "Install on Windows",
          "Install Barn into a clean virtual environment on Windows.",
          [
            code("py -3.12 -m venv .venv-barn\n.\\.venv-barn\\Scripts\\python.exe -m pip install --upgrade pip", "powershell", "PowerShell"),
            p("Use the explicit virtual environment interpreter for every command. You do not need to change the PowerShell execution policy."),
            code("$PY = '.\\.venv-barn\\Scripts\\python.exe'\n& $PY -m pip install -r requirements/runtime-test.txt\n& $PY -m pip install --no-deps 'barnCompute==0.1.0a1'", "powershell", "PowerShell"),
            h2("Windows Firewall"),
            p("Allow the Barn peer port on private networks only. Never turn the firewall off. See [Firewalls](/docs/build/networking/firewalls/windows)."),
          ],
          { badge: "Alpha", navLabel: "Windows" }
        ),
      ]),
      page(
        "verify",
        "Verify your install",
        "Confirm the CLI is on your path and the package is the one you expect.",
        [
          os("barn --version\npython -m pip show barnCompute", ".\\.venv-barn\\Scripts\\barn.exe --version\n& $PY -m pip show barnCompute"),
          p("You should see the version you installed. If the command is not found, make sure the virtual environment is active or call the executable by its full path."),
          h2("Run the diagnostics"),
          code("barn doctor"),
          p("`barn doctor` checks your platform, Python and package versions, certificates, local ports, connectivity, clock skew and permissions. Add `--json` to attach the report to a bug report. Secrets are never printed."),
        ],
        { badge: "Pre-alpha" }
      ),
      page(
        "upgrade",
        "Upgrade Barn",
        "Move to a newer release without losing your Barn.",
        [
          p("Your Barn state lives in a state directory, separate from the installed package. Upgrading the package does not delete it."),
          ol("Stop the coordinator and any node agents.", "Install the new version into the same virtual environment.", "Start the coordinator, then the node agents.", "Run `barn doctor` to confirm everything is healthy."),
          warn("Alpha releases can change the wire protocol. If two devices run incompatible versions, `barn doctor` reports a protocol mismatch. Upgrade both devices together."),
        ],
        { badge: "Pre-alpha" }
      ),
    ]),
    section("concepts", "Core concepts", [
      page(
        "barns",
        "Barns",
        "A Barn is a private group of approved devices.",
        [
          p("A Barn is the trust boundary. Devices are members only because you approved them. Being on the same Wi-Fi network is never enough."),
          h2("The coordinator"),
          p("One computer runs the coordinator. It keeps the Barn identity, the list of Nodes, shares, and audit events. It does not store your files. Your files stay on the Nodes that own them."),
          h2("One Barn per trust domain"),
          p("Each Barn has its own certificate authority. Two Barns never trust each other by accident. Multi-Barn federation is not part of the first milestone."),
          cards(
            { title: "Create a Barn", text: "Initialise the coordinator.", href: "/docs/build/barns/create-a-barn" },
            { title: "Trust and certificates", text: "How devices verify the coordinator.", href: "/docs/build/barns/trust-and-certificates" }
          ),
        ]
      ),
      page(
        "nodes",
        "Nodes",
        "A Node is an approved device inside a Barn.",
        [
          p("Every Node has its own persistent identity. A Node keeps the same identity across restarts. It is identified by its Node ID, not by its IP address."),
          h2("Life of a Node"),
          table(
            ["State", "Meaning"],
            ["Pending", "Enrolment requested, waiting for your approval."],
            ["Online", "Approved and sending healthy heartbeats."],
            ["Suspect", "No valid heartbeat recently. Might be a brief interruption."],
            ["Offline", "No heartbeat for a longer time."],
            ["Revoked", "Removed by an administrator. Stays revoked until you act."]
          ),
          p("Offline and revoked are different things. An offline Node can return. A revoked Node cannot."),
        ]
      ),
      page(
        "managed-files",
        "Managed files",
        "Only files you deliberately import can be shared.",
        [
          p("Barn never exposes your filesystem. To share a file you first import it into the Node's managed storage. Barn keeps an immutable copy and records its size and checksums."),
          code("barn file add ./report.pdf --name report.pdf"),
          note("Changing the original file after import does not change the managed copy. Recipients always receive the version you imported."),
          h2("Why a copy?"),
          ul("The bytes you share cannot change underneath a transfer.", "Integrity checks have a stable reference.", "Nothing outside managed storage is reachable from the network.")
        ]
      ),
      page(
        "shares",
        "Shares",
        "A share lets one specific Node access one specific file.",
        [
          p("Membership does not expose files. A share is an explicit permission that names a file, a recipient Node, and an expiry."),
          code("barn share create <FILE_ID> --to <NODE_ID> --ttl 30m"),
          ul("Read-only.", "One recipient. There are no wildcard or public shares.", "Expires, and can be revoked at any time.", "Starting a transfer after expiry or revocation is denied.")
        ]
      ),
      page(
        "transfers",
        "Transfers",
        "How a shared file moves between Nodes.",
        [
          p("When the recipient fetches a share, the file is transferred in one megabyte chunks directly between the two devices. Every chunk is checked, and the finished file is verified end to end."),
          h2("What you get"),
          ul("Integrity verification of every chunk and of the final file.", "Resume from already verified chunks after an interruption.", "Clear errors that distinguish offline, unauthorised and corrupt cases."),
          h2("What to expect"),
          p("The sending Node must be online to finish a new transfer. Transfers are not distributed storage. The sender keeps its copy and the receiver gets its own."),
          cards({ title: "Resume and recovery", text: "What happens when a transfer is interrupted.", href: "/docs/build/files/resume-and-recovery" })
        ]
      ),
      page(
        "availability",
        "Availability",
        "How Barn knows which Nodes are online.",
        [
          p("Each Node sends a signed heartbeat to the coordinator every few seconds. The coordinator marks a Node suspect and then offline as heartbeats stop."),
          table(
            ["Setting", "Default"],
            ["Heartbeat interval", "5 seconds"],
            ["Suspect after", "15 seconds"],
            ["Offline after", "30 seconds"]
          ),
          tip("A Node counts as online only when its heartbeat is valid and its peer endpoint is reachable. Run `barn doctor` to see both."),
        ]
      ),
    ]),
    section("tutorials", "Tutorials", [
      page(
        "first-barn",
        "Build your first Barn",
        "A longer walkthrough that explains each step of setting up a two device Barn.",
        [
          p("The [Quickstart](/docs/start/quickstart) is the short version. This tutorial explains what each step is doing and how to check it worked."),
          h2("1. Decide which device is the coordinator"),
          p("Pick a computer that is usually on. It can also run a Node. Give it a stable IP address or hostname, because it goes into the certificate."),
          h2("2. Initialise and start"),
          code("barn coordinator init --name LabBarn --advertise 192.168.1.10\nbarn coordinator start --bind 0.0.0.0 --port 8443"),
          note("The advertised address must match how other devices will reach the coordinator. If it changes later, renew the certificate."),
          h2("3. Add the second device"),
          p("Generate an invite, copy the public certificate to the other machine, compare fingerprints, and enrol. Nothing is trusted until you approve it."),
          h2("4. Check the result"),
          code("barn nodes\nbarn doctor"),
          p("Both Nodes should show as online with different Node IDs."),
        ],
        { badge: "Pre-alpha" }
      ),
      page(
        "share-your-first-file",
        "Share your first file",
        "Import a file, share it with one Node, fetch it, and verify the checksum.",
        [
          steps(
            { title: "Import", body: "Add the file to managed storage on the sending Node.", code: "barn file add ./sample.bin" },
            { title: "Share", body: "Create a 30 minute share for the other Node.", code: "barn share create <FILE_ID> --to <NODE_ID> --ttl 30m" },
            { title: "Fetch", body: "On the receiving Node, fetch the share into a new path.", code: "barn share fetch <SHARE_ID> --output ./received.bin" },
            { title: "Compare", body: "Confirm both copies match.", code: "shasum -a 256 ./sample.bin ./received.bin" }
          ),
          note("Barn will not overwrite an existing output path. Choose a new filename."),
          tip("Windows users can compare checksums with `Get-FileHash .\\sample.bin -Algorithm SHA256`.", "On Windows"),
        ],
        { badge: "Pre-alpha" }
      ),
      page(
        "next-steps",
        "Next steps",
        "Where to go after your first Barn.",
        [
          cards(
            { title: "Networking", text: "Addresses, ports and firewalls.", href: "/docs/build/networking/overview" },
            { title: "Security and trust", text: "How membership and sharing are protected.", href: "/docs/build/security/overview" },
            { title: "Guides", text: "Task based walkthroughs.", href: "/docs/guides/setup/home-lab" },
            { title: "Troubleshooting", text: "Fix common problems.", href: "/docs/reference/troubleshooting/cannot-connect" }
          ),
          h3("Roadmap"),
          p("Distributed storage, compute and AI workloads are part of the longer term direction. See the [roadmap](/docs/roadmap/overview)."),
        ]
      ),
    ]),
  ],
};
