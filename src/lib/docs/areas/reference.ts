import {
  type AreaDef,
  cards,
  code,
  future,
  h2,
  note,
  ol,
  p,
  page,
  section,
  table,
  tip,
  ul,
  warn,
} from "../types";

export const reference: AreaDef = {
  id: "reference",
  title: "Reference",
  tagline: "Glossary, errors, limits and troubleshooting.",
  icon: "book",
  sections: [
    section("", "Reference", [
      page("glossary", "Glossary", "The words Barn uses, and what they mean.", [
        table(
          ["Term", "Meaning"],
          ["Barn", "A private group of approved devices."],
          ["Node", "One approved device in a Barn."],
          ["Coordinator", "The service that keeps the Barn's registry and authorises transfers."],
          ["Managed file", "A file deliberately imported into Barn managed storage."],
          ["Share", "Permission for one Node to fetch one file, for a limited time."],
          ["Transfer", "The movement of an authorised file between Nodes."],
          ["Chunk", "A one megabyte block of a file, verified individually."],
          ["Heartbeat", "A periodic signal a Node sends to show it is available."],
          ["Bay", "A planned storage concept. Not part of the current foundation."]
        ),
      ], { badge: "Draft" }),
      page("errors", "Error codes", "What Barn's transfer errors mean and what to do.", [
        table(
          ["Code", "Meaning", "What to do"],
          ["RETRYABLE_CONNECTION", "A network problem interrupted the transfer.", "Wait or resume. Barn retries automatically."],
          ["NOT_AUTHORISED", "You are not allowed to fetch this file.", "Ask the owner for a new share."],
          ["SHARE_EXPIRED", "The share expired or was revoked.", "Ask for a new share."],
          ["SOURCE_OFFLINE", "The sending Node is offline.", "Bring it online, then resume."],
          ["CHECKSUM_MISMATCH", "Received data did not match the recorded checksum.", "Retry. If it persists, re-import the file."],
          ["DISK_FULL", "There is not enough free space.", "Free space or choose another location."],
          ["PROTOCOL_MISMATCH", "The devices run incompatible versions.", "Upgrade both devices."]
        ),
        note("These names come from the design draft and may change."),
      ], { badge: "Draft" }),
      page("limits", "Limits", "Default limits for the first milestone.", [
        table(
          ["Limit", "Default"],
          ["Maximum file size", "512 MiB"],
          ["Managed storage per Node", "2 GiB"],
          ["Chunk size", "1 MiB"],
          ["Heartbeat interval", "5 s"],
          ["Suspect after", "15 s"],
          ["Offline after", "30 s"],
          ["Allowed clock difference", "2 minutes"],
          ["Invite lifetime", "Set with --ttl, for example 10m"],
          ["Transfer permission lifetime", "30 minutes"]
        ),
      ], { badge: "Draft" }),
      page("platform-support", "Platform support", "Where Barn runs.", [
        table(
          ["Platform", "Status"],
          ["macOS", "First target"],
          ["Windows", "First target"],
          ["Linux", "Not yet"],
          ["iOS and Android", "Not planned for the first milestone"]
        ),
        p("Python 3.11 and 3.12 are supported."),
      ], { badge: "Draft" }),
      page("state-directories", "State directories", "Where Barn keeps its data.", [
        p("Coordinator and Node state live in separate directories, using the standard per user data location for each operating system."),
        ul("Override with `--state-dir`.", "Never share these directories. They contain private keys.", "Never put them inside a project folder or source control."),
        warn("Do not delete a state directory to fix a problem unless you mean to lose that Barn or Node identity."),
      ], { badge: "Draft" }),
      page("configuration", "Configuration", "How settings are stored and changed.", [
        code("barn config set <KEY> <VALUE>"),
        p("Settings cover ports, addresses, timeouts and limits. Values outside the documented bounds are rejected."),
        future("A full list of keys will be published before release.", "Coming soon"),
      ], { badge: "Draft" }),
      page("changelog", "Changelog", "What changed in each release.", [
        table(
          ["Version", "Notes"],
          ["0.1.0a1", "First alpha of the M1 foundation. Barn creation, enrolment, heartbeats, file sharing and verified transfers."]
        ),
        note("Placeholder entries. The real changelog will be generated from releases."),
      ], { badge: "Draft" }),
      page("faq", "Frequently asked questions", "Short answers to common questions.", [
        h2("Is Barn cloud storage?"),
        p("Not in the traditional sense. Barn is a private computing layer for devices you trust. Storage is one part of the direction."),
        h2("Do all my devices join automatically?"),
        p("No. Each device must be approved before it joins."),
        h2("Does joining share my files?"),
        p("No. Files must be imported and shared explicitly, one Node at a time."),
        h2("Do devices need the same Wi-Fi?"),
        p("Today they need to reach each other on a trusted network. Support for restricted networks is planned."),
        h2("Which platforms are supported?"),
        p("macOS and Windows are the first targets."),
        h2("Is Barn a blockchain project?"),
        p("No."),
      ], { badge: "Draft" }),
    ]),
    section("troubleshooting", "Troubleshooting", [
      page("cannot-connect", "Cannot connect to the coordinator", "A Node cannot reach the coordinator.", [
        ol("Confirm the coordinator is running.", "Check the address and port you are using.", "Check the firewall on the coordinator machine.", "Run `barn doctor` on the Node."),
        tip("Test from the same machine first. If it works locally but not remotely, it is usually a firewall or address problem."),
      ], { badge: "Draft" }),
      page("certificate-errors", "Certificate errors", "Verification failed for the coordinator or a peer.", [
        ul("The certificate does not match the address you are connecting to.", "You imported the wrong Barn's certificate.", "The address changed since the certificate was issued."),
        p("Fix the address, then renew the certificate if needed. Barn has no option to skip verification."),
        cards({ title: "Renew certificates", text: "Change the coordinator address.", href: "/docs/build/barns/certificate-renewal" }),
      ], { badge: "Draft" }),
      page("clock-skew", "Clock skew", "Requests rejected because clocks disagree.", [
        p("Signed requests include a timestamp. If a device's clock is more than a couple of minutes off, requests are rejected and `barn doctor` reports clock skew."),
        ol("Turn on automatic time in your operating system.", "Re-run `barn doctor`."),
      ], { badge: "Draft" }),
      page("node-offline", "A Node shows offline", "Work out why a Node is suspect or offline.", [
        table(
          ["Check", "How"],
          ["Is the agent running?", "Start it with `barn node start`."],
          ["Is the device awake?", "Sleeping devices stop sending heartbeats."],
          ["Can it reach the coordinator?", "Run `barn doctor` on the Node."],
          ["Was it revoked?", "Check `barn nodes` on the coordinator."]
        ),
      ], { badge: "Draft" }),
      page("transfer-stuck", "A transfer is stuck", "A transfer is not making progress.", [
        ol("Run `barn transfer status <TRANSFER_ID>`.", "Check that the sending Node is online.", "Try `barn transfer resume <TRANSFER_ID>`.", "If the share expired, ask for a new one."),
      ], { badge: "Draft" }),
    ]),
  ],
};
