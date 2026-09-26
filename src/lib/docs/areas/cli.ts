import {
  type AreaDef,
  type Block,
  type PageDef,
  cards,
  code,
  folder,
  h2,
  note,
  p,
  page,
  section,
  table,
  tip,
  warn,
} from "../types";

// One reference page per command, built from the same shape so they all read alike.
interface CmdDef {
  slug: string;
  title: string;
  usage: string;
  summary: string;
  options?: [string, string][];
  example?: string;
  notes?: Block[];
}

function cmd(c: CmdDef): PageDef {
  const blocks: Block[] = [p(c.summary), h2("Usage"), code(c.usage)];
  if (c.options && c.options.length) {
    blocks.push(h2("Options"), table(["Option", "Description"], ...c.options.map(([a, b]) => [a, b])));
  }
  if (c.example) blocks.push(h2("Example"), code(c.example));
  if (c.notes) blocks.push(...c.notes);
  return page(c.slug, c.title, c.summary, blocks, { badge: "Draft", navLabel: c.title.replace(/^barn (?:coordinator|node|file|share|transfer) /, "").replace(/^barn /, "") });
}

export const cli: AreaDef = {
  id: "cli",
  title: "CLI reference",
  tagline: "Every barn command, flag and exit code.",
  icon: "terminal",
  sections: [
    section("", "Overview", [
      page("overview", "CLI overview", "The barn command line tool.", [
        p("Everything in Barn is driven by one command, `barn`. Commands are grouped by what they act on: the coordinator, a Node, files, shares and transfers."),
        code("barn --help\nbarn --version\nbarn <command> --help"),
        h2("Command groups"),
        table(
          ["Group", "What it does"],
          ["barn coordinator", "Create and administer a Barn."],
          ["barn node", "Set up and run a Node."],
          ["barn nodes", "List Nodes and their state."],
          ["barn file", "Import and list managed files."],
          ["barn share", "Create, list, revoke and fetch shares."],
          ["barn transfer", "Inspect and control transfers."],
          ["barn doctor", "Diagnose problems without printing secrets."],
          ["barn config", "Read and change settings."]
        ),
        tip("Long running commands, such as `coordinator start` and `node start`, run in the foreground. Open a second terminal for other commands."),
      ], { badge: "Draft" }),
      page("global-flags", "Global flags and output", "Flags that work on every command, output formats and exit codes.", [
        table(
          ["Flag", "Description"],
          ["--json", "Emit machine readable output for scripting."],
          ["--state-dir <path>", "Use a specific state directory."],
          ["--help", "Show help for any command."],
          ["--version", "Print the installed version."]
        ),
        h2("Exit codes"),
        table(
          ["Code", "Meaning"],
          ["0", "Success."],
          ["1", "The command failed. A message explains why."],
          ["2", "Invalid usage or arguments."]
        ),
        note("Exit codes are a draft. They will be finalised before release."),
      ], { badge: "Draft" }),
    ]),
    section("commands", "Commands", [
      folder("coordinator", "coordinator", [
        cmd({
          slug: "init",
          title: "barn coordinator init",
          usage: "barn coordinator init --name <NAME> --advertise <ADDRESS> [--state-dir <PATH>]",
          summary: "Create a new Barn on this machine.",
          options: [["--name", "Name of the Barn."], ["--advertise", "IP address or hostname other devices will use."], ["--state-dir", "Where to store coordinator state."]],
          example: "barn coordinator init --name LabBarn --advertise 192.168.1.10",
          notes: [warn("Fails if a Barn already exists in the state directory.")],
        }),
        cmd({
          slug: "ca-export",
          title: "barn coordinator ca export",
          usage: "barn coordinator ca export --output <FILE>",
          summary: "Write the Barn's public certificate to a file.",
          options: [["--output", "Path to write the .pem file."]],
          example: "barn coordinator ca export --output ./barn-ca.pem",
          notes: [note("The public certificate is safe to share. Verify its fingerprint on the receiving device.")],
        }),
        cmd({
          slug: "start",
          title: "barn coordinator start",
          usage: "barn coordinator start [--bind <ADDRESS>] [--port <PORT>]",
          summary: "Run the coordinator in the foreground.",
          options: [["--bind", "Address to listen on. Default 0.0.0.0."], ["--port", "Port to listen on. Default 8443."]],
          example: "barn coordinator start --bind 0.0.0.0 --port 8443",
        }),
        cmd({
          slug: "invite",
          title: "barn coordinator invite",
          usage: "barn coordinator invite [--ttl <DURATION>]",
          summary: "Create a single use invite code for a new device.",
          options: [["--ttl", "How long the invite is valid, for example 10m."]],
          example: "barn coordinator invite --ttl 10m",
          notes: [tip("Share the code over a private channel. It cannot be used twice.")],
        }),
        cmd({
          slug: "enrolments",
          title: "barn coordinator enrolments",
          usage: "barn coordinator enrolments",
          summary: "List pending enrolment requests.",
          example: "barn coordinator enrolments",
        }),
        cmd({
          slug: "approve",
          title: "barn coordinator approve",
          usage: "barn coordinator approve <REQUEST_ID>",
          summary: "Approve a pending enrolment request and admit the device.",
          example: "barn coordinator approve 2f6b1c8e",
          notes: [warn("Approve only devices you recognise.")],
        }),
        cmd({
          slug: "revoke",
          title: "barn coordinator revoke",
          usage: "barn coordinator revoke <NODE_ID>",
          summary: "Revoke a Node. It can no longer send heartbeats or start transfers.",
          example: "barn coordinator revoke 7a3d",
        }),
        cmd({
          slug: "cert-renew",
          title: "barn coordinator cert renew",
          usage: "barn coordinator cert renew --advertise <ADDRESS>",
          summary: "Issue a new coordinator certificate for a new address.",
          options: [["--advertise", "The new IP address or hostname."]],
          example: "barn coordinator cert renew --advertise 192.168.1.50",
          notes: [note("Update the coordinator address on each Node afterwards.")],
        }),
      ]),
      folder("node", "node", [
        cmd({
          slug: "init",
          title: "barn node init",
          usage: "barn node init --name <NAME> --advertise <ADDRESS> [--peer-port <PORT>]",
          summary: "Create this device's Node identity.",
          options: [["--name", "Name of the Node."], ["--advertise", "Address other Nodes use to reach this one."], ["--peer-port", "Port for peer connections. Default 8445."]],
          example: "barn node init --name MacNode --advertise 192.168.1.10 --peer-port 8445",
        }),
        cmd({
          slug: "enroll",
          title: "barn node enroll",
          usage: "barn node enroll --coordinator <URL> --ca-cert <FILE> --code <CODE>",
          summary: "Ask a coordinator to admit this Node.",
          options: [["--coordinator", "URL of the coordinator."], ["--ca-cert", "The Barn's public certificate."], ["--code", "A one time invite code."]],
          example: "barn node enroll --coordinator https://192.168.1.10:8443 --ca-cert ./barn-ca.pem --code <CODE>",
          notes: [warn("Verify the certificate fingerprint before enrolling.")],
        }),
        cmd({
          slug: "start",
          title: "barn node start",
          usage: "barn node start [--bind <ADDRESS>] [--peer-port <PORT>]",
          summary: "Run the Node agent in the foreground.",
          options: [["--bind", "Address to listen on."], ["--peer-port", "Peer port. Default 8445."]],
          example: "barn node start --bind 0.0.0.0 --peer-port 8445",
        }),
      ]),
      cmd({
        slug: "nodes",
        title: "barn nodes",
        usage: "barn nodes [--json]",
        summary: "List the Nodes in the Barn and their current state.",
        example: "barn nodes",
        notes: [note("States are online, suspect, offline and revoked.")],
      }),
      folder("file", "file", [
        cmd({
          slug: "add",
          title: "barn file add",
          usage: "barn file add <PATH> [--name <NAME>]",
          summary: "Import a local file into managed storage.",
          options: [["--name", "A display name for the file. Not a path."]],
          example: "barn file add ./sample.bin --name sample.bin",
        }),
        cmd({
          slug: "list",
          title: "barn file list",
          usage: "barn file list",
          summary: "List the managed files you own and can see.",
          example: "barn file list",
        }),
      ]),
      folder("share", "share", [
        cmd({
          slug: "create",
          title: "barn share create",
          usage: "barn share create <FILE_ID> --to <NODE_ID> [--ttl <DURATION>]",
          summary: "Share a managed file with one Node.",
          options: [["--to", "The recipient Node ID."], ["--ttl", "How long the share can be used to start a transfer."]],
          example: "barn share create 91c4 --to 7a3d --ttl 30m",
        }),
        cmd({ slug: "inbox", title: "barn share inbox", usage: "barn share inbox", summary: "List shares waiting for you.", example: "barn share inbox" }),
        cmd({ slug: "list", title: "barn share list", usage: "barn share list", summary: "List the shares you created.", example: "barn share list" }),
        cmd({ slug: "revoke", title: "barn share revoke", usage: "barn share revoke <SHARE_ID>", summary: "Revoke a share so new transfers cannot start.", example: "barn share revoke c0de" }),
        cmd({
          slug: "fetch",
          title: "barn share fetch",
          usage: "barn share fetch <SHARE_ID> --output <PATH>",
          summary: "Download a shared file to a local path.",
          options: [["--output", "Where to write the file. It must not already exist."]],
          example: "barn share fetch c0de --output ./received.bin",
        }),
      ]),
      folder("transfer", "transfer", [
        cmd({ slug: "list", title: "barn transfer list", usage: "barn transfer list", summary: "List current and recent transfers.", example: "barn transfer list" }),
        cmd({ slug: "status", title: "barn transfer status", usage: "barn transfer status <TRANSFER_ID>", summary: "Show progress, verified chunks and retries.", example: "barn transfer status 5e1a" }),
        cmd({ slug: "resume", title: "barn transfer resume", usage: "barn transfer resume <TRANSFER_ID>", summary: "Continue an interrupted transfer.", example: "barn transfer resume 5e1a" }),
        cmd({ slug: "cancel", title: "barn transfer cancel", usage: "barn transfer cancel <TRANSFER_ID>", summary: "Stop a transfer. Verified chunks are kept for a limited time.", example: "barn transfer cancel 5e1a" }),
      ]),
      cmd({
        slug: "doctor",
        title: "barn doctor",
        usage: "barn doctor [--json]",
        summary: "Check your setup and report problems without printing secrets.",
        options: [["--json", "Output a report you can attach to a bug report."]],
        example: "barn doctor",
        notes: [cards({ title: "Diagnostics", text: "What the report covers.", href: "/docs/build/networking/diagnostics" })],
      }),
      cmd({
        slug: "config",
        title: "barn config",
        usage: "barn config set <KEY> <VALUE>",
        summary: "Change a setting. The available keys will be documented before release.",
        example: "barn config set transport.mode auto",
        notes: [note("Relay related keys are planned. See the networking docs.")],
      }),
    ]),
  ],
};
