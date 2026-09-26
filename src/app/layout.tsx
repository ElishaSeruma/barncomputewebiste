import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  icons: { icon: [{ url: "/favicon.svg", type: "image/svg+xml" }] },
  title: "Barn Computing | Your Devices. One Barn.",
  description:
    "Barn Computing is building a private computing network that lets trusted devices communicate, share data, and grow into distributed storage and compute infrastructure.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link rel="preconnect" href="https://cdn.fontshare.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=satoshi@300,400,500,700,900&display=swap"
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
