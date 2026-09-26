import {
  Network,
  Laptop,
  Activity,
  HardDrive,
  Share2,
  ArrowLeftRight,
  Database,
  Cpu,
  Sparkles,
  Home,
  Palette,
  Users,
  User,
  Terminal,
  BookOpen,
  GitBranch,
  ListChecks,
  LifeBuoy,
  Newspaper,
  FileText,
  Map,
  HelpCircle,
  Info,
  Mail,
} from "lucide-react";
import type { NavItem } from "@/components/ui/dorpdown-navigation";

// Placeholder destinations. Items marked "(Future)" describe roadmap direction, not shipped features.
export const NAV_ITEMS: NavItem[] = [
  {
    id: 1,
    label: "Product",
    subMenus: [
      {
        title: "Foundation",
        items: [
          { label: "Barns", description: "A private network of trusted devices", icon: Network, href: "/product/barns" },
          { label: "Nodes", description: "Approved devices with their own identity", icon: Laptop, href: "/product/nodes" },
          { label: "Availability", description: "See which devices are online", icon: Activity, href: "/product/availability" },
        ],
      },
      {
        title: "Files",
        items: [
          { label: "Managed Files", description: "Bring files into your Barn on purpose", icon: HardDrive, href: "/product/managed-files" },
          { label: "Sharing", description: "Explicit, per-device permissions", icon: Share2, href: "/product/sharing" },
          { label: "Transfers", description: "Verified, resumable file exchange", icon: ArrowLeftRight, href: "/product/transfers" },
        ],
      },
      {
        title: "Roadmap",
        items: [
          { label: "Distributed Storage", description: "Future · storage across your Nodes", icon: Database, href: "/product/distributed-storage" },
          { label: "Compute", description: "Future · workloads across your Barn", icon: Cpu, href: "/product/compute" },
          { label: "AI", description: "Future · private AI on trusted hardware", icon: Sparkles, href: "/product/ai" },
        ],
      },
    ],
  },
  {
    id: 2,
    label: "Developers",
    subMenus: [
      {
        title: "Get started",
        items: [
          { label: "Quickstart", description: "Create a Barn and add a Node", icon: Terminal, href: "/docs/start/quickstart" },
          { label: "Installation", description: "macOS and Windows", icon: ListChecks, href: "/docs/start/install/requirements" },
          { label: "Concepts", description: "Barns, Nodes, shares and transfers", icon: BookOpen, href: "/docs/start/concepts/barns" },
        ],
      },
      {
        title: "Build with Barn",
        items: [
          { label: "Developer Hub", description: "Everything for building on Barn", icon: Terminal, href: "/developers" },
          { label: "CLI Reference", description: "Everything the barn command does", icon: Terminal, href: "/docs/cli/overview" },
          { label: "Changelog", description: "See what shipped", icon: FileText, href: "/docs/reference/changelog" },
          { label: "Open Source", description: "Source, issues and contributing", icon: GitBranch, href: "/developers/open-source" },
        ],
      },
    ],
  },
  {
    id: 3,
    label: "Solutions",
    subMenus: [
      {
        title: "Use cases",
        items: [
          { label: "Home Labs", description: "Make spare machines useful together", icon: Home, href: "/solutions/home-labs" },
          { label: "Creative Studios", description: "Move large files between workstations", icon: Palette, href: "/solutions/creative-studios" },
          { label: "Small Teams", description: "A private network for your own devices", icon: Users, href: "/solutions/small-teams" },
        ],
      },
      {
        title: "Who it's for",
        items: [
          { label: "Individuals", description: "Laptop, desktop and a spare machine", icon: User, href: "/solutions/individuals" },
          { label: "Developers", description: "Private infrastructure you can script", icon: Terminal, href: "/solutions/developers" },
        ],
      },
    ],
  },
  {
    id: 4,
    label: "Docs",
    subMenus: [
      {
        title: "Documentation",
        items: [
          { label: "Documentation home", description: "Everything in one place", icon: BookOpen, href: "/docs" },
          { label: "Getting Started", description: "Your first Barn in minutes", icon: Terminal, href: "/docs/start/introduction" },
          { label: "Guides", description: "Add Nodes, share and transfer files", icon: ListChecks, href: "/docs/guides" },
          { label: "Troubleshooting", description: "Fix connectivity and setup issues", icon: LifeBuoy, href: "/docs/reference/troubleshooting/cannot-connect" },
        ],
      },
    ],
  },
  { id: 5, label: "Blog", link: "/blog" },
  {
    id: 6,
    label: "Company",
    alignRight: true,
    subMenus: [
      {
        title: "Barn Computing",
        items: [
          { label: "About", description: "Why we're building Barn", icon: Info, href: "/about" },
          { label: "Roadmap", description: "What's built and what's next", icon: Map, href: "/roadmap" },
          { label: "FAQ", description: "Common questions, answered", icon: HelpCircle, href: "/faq" },
          { label: "Press", description: "News and announcements", icon: Newspaper, href: "/press" },
          { label: "Contact", description: "Get in touch", icon: Mail, href: "/contact" },
        ],
      },
    ],
  },
];
