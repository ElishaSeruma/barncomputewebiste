import {
  type AreaDef,
  cards,
  code,
  future,
  h2,
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

export const guides: AreaDef = {
  id: "guides",
  title: "Guides",
  tagline: "Task based walkthroughs for real setups.",
  icon: "map",
  sections: [
    section("setup", "Set up", [
      page("home-lab", "Set up a home lab Barn", "Turn a few spare machines into one private network.", [
        p("A home lab is the classic Barn: a desktop, a laptop, and maybe a small always-on machine. This guide picks roles and sets them up."),
        h2("Choose roles"),
        table(
          ["Device", "Role", "Why"],
          ["Always-on mini PC", "Coordinator and Node", "Usually on, so Nodes can always reach it."],
          ["Desktop", "Node", "Large disk for files you share."],
          ["Laptop", "Node", "Comes and goes. That is fine."]
        ),
        h2("Set it up"),
        steps(
          { title: "Reserve addresses", body: "Give every device a DHCP reservation so addresses never change." },
          { title: "Create the Barn on the coordinator", body: "Use the reserved address for --advertise.", code: "barn coordinator init --name HomeBarn --advertise 192.168.1.5" },
          { title: "Enrol each device", body: "Create one invite per device and approve each request." },
          { title: "Verify", body: "Check that every Node is online.", code: "barn nodes" }
        ),
        tip("Laptops that sleep will show as suspect and then offline. They return to online when they wake."),
      ], { badge: "Draft" }),
      page("two-laptops", "Connect two laptops", "The smallest useful Barn: a Mac and a Windows laptop.", [
        p("This is the path most people take first. One laptop hosts the coordinator and also runs a Node."),
        ol("Install Barn on both laptops.", "On the first laptop, create the Barn and start the coordinator.", "Enrol the first laptop as a Node too.", "Enrol the second laptop.", "Share a file each way to confirm."),
        cards(
          { title: "Quickstart", text: "The commands, step by step.", href: "/docs/start/quickstart" },
          { title: "Firewalls", text: "Allow Barn on private networks.", href: "/docs/build/networking/firewalls/windows" }
        ),
        note("Both laptops must be on the same trusted network. Guest networks often isolate clients."),
      ], { badge: "Draft" }),
      page("run-on-startup", "Run Barn on startup", "Keep the coordinator and agent running after a reboot.", [
        future("Native background services are planned. Until then, use your operating system's scheduler.", "Planned"),
        os(
          "# launchd example (draft)\n# Create ~/Library/LaunchAgents/com.barn.node.plist\n# that runs: barn node start --bind 0.0.0.0 --peer-port 8445",
          "# Task Scheduler example (draft)\n# Create a task that runs at logon:\n# barn.exe node start --bind 0.0.0.0 --peer-port 8445"
        ),
        warn("Run agents as your own user, not as an administrator or root."),
      ], { badge: "Planned" }),
    ]),
    section("files", "Move files", [
      page("share-a-large-file", "Share a large file", "Move a large file between two Nodes reliably.", [
        p("Barn is built for files up to the configured limit, with verified, resumable chunks."),
        steps(
          { title: "Import", body: "Add the file on the sending Node.", code: "barn file add ./footage.mov" },
          { title: "Share", body: "Give the other Node a longer window for big files.", code: "barn share create <FILE_ID> --to <NODE_ID> --ttl 2h" },
          { title: "Fetch", body: "Start the download on the receiving Node.", code: "barn share fetch <SHARE_ID> --output ./footage.mov" },
          { title: "Watch", body: "Check progress.", code: "barn transfer status <TRANSFER_ID>" }
        ),
        note("The default maximum file size is 512 MiB. Larger files are refused."),
      ], { badge: "Draft" }),
      page("recover-an-interrupted-transfer", "Recover an interrupted transfer", "Pick up where a transfer left off.", [
        ol("Find the transfer: `barn transfer list`.", "Make sure the sending Node is online: `barn nodes`.", "Resume: `barn transfer resume <TRANSFER_ID>`."),
        p("Barn keeps chunks it already verified and requests only the missing ones."),
        warn("If the share has expired, create a new one. Resume needs an active share."),
        cards({ title: "Resume and recovery", text: "How recovery works.", href: "/docs/build/files/resume-and-recovery" }),
      ], { badge: "Draft" }),
      page("share-with-many-devices", "Share with several devices", "Give the same file to more than one Node.", [
        p("Each share names exactly one recipient. To reach several Nodes, create one share per Node."),
        code("barn share create <FILE_ID> --to <NODE_A> --ttl 30m\nbarn share create <FILE_ID> --to <NODE_B> --ttl 30m"),
        tip("Each recipient downloads directly from the source. The source must stay online for all of them."),
      ], { badge: "Draft" }),
    ]),
    section("operate", "Operate", [
      page("add-a-device-later", "Add a device later", "Grow your Barn over time.", [
        ol("Create a fresh invite on the coordinator.", "Copy the public certificate to the new device.", "Enrol and approve.", "Start the agent."),
        note("Existing Nodes do not need to change."),
      ], { badge: "Draft" }),
      page("change-the-coordinator-address", "Change the coordinator address", "Move the coordinator to a new IP or hostname.", [
        steps(
          { title: "Renew the certificate", body: "Include the new address.", code: "barn coordinator cert renew --advertise 192.168.1.50" },
          { title: "Update each Node", body: "Point Nodes at the new coordinator address, then restart their agents." },
          { title: "Verify", body: "Confirm every Node comes back online.", code: "barn nodes" }
        ),
        warn("Do not recreate the Barn to change an address. That would orphan every Node."),
      ], { badge: "Draft" }),
      page("retire-a-device", "Retire a device", "Remove a lost or old device safely.", [
        ol("Revoke the Node: `barn coordinator revoke <NODE_ID>`.", "Revoke any active shares that involve it.", "Wipe or dispose of the device using your normal process."),
        p("A revoked Node cannot rejoin under the same identity."),
      ], { badge: "Draft" }),
      page("keep-the-coordinator-healthy", "Keep the coordinator healthy", "Habits that keep a Barn reliable.", [
        ul("Keep the coordinator on a stable address.", "Back up its state directory after changes.", "Keep device clocks accurate. Large clock differences cause rejections.", "Run `barn doctor` after any network change."),
        table(
          ["Symptom", "First check"],
          ["Node stuck at suspect", "Network path and firewall."],
          ["Requests rejected", "Clock skew between devices."],
          ["Certificate errors", "Advertised address matches the certificate."]
        ),
      ], { badge: "Draft" }),
    ]),
  ],
};
