import type {Metadata} from "next";
import "./globals.css";
import {site} from "@/content/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  applicationName: site.name,
  title: {
    default: "NoordTune.nl | Chiptuning & Auto Diagnostiek",
    template: "%s"
  },
  description: site.description,
  icons: {
    icon: "/brand/noordtune-icon.png",
    apple: "/brand/noordtune-icon.png"
  }
};

export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
  return (
    <html lang="nl">
      <body>{children}</body>
    </html>
  );
}
