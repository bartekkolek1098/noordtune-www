import type {Metadata, Viewport} from "next";
import {Analytics} from "@vercel/analytics/next";
import "./globals.css";
import {site} from "@/content/site";

const localeScript = `
(() => {
  try {
    const locale = window.location.pathname.split("/").filter(Boolean)[0];
    document.documentElement.lang = ["nl", "en", "pl"].includes(locale) ? locale : "nl";
  } catch {
    document.documentElement.lang = "nl";
  }
})();
`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  applicationName: site.name,
  title: {
    default: "NoordTune.nl | Chiptuning & Auto Diagnostiek",
    template: "%s"
  },
  description: site.description,
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      {url: "/favicon.svg", type: "image/svg+xml"},
      {url: "/favicon-16x16.png", sizes: "16x16", type: "image/png"},
      {url: "/favicon-32x32.png", sizes: "32x32", type: "image/png"},
      {url: "/favicon-48x48.png", sizes: "48x48", type: "image/png"},
      {url: "/favicon.ico", sizes: "any"}
    ],
    apple: [{url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png"}]
  }
};

export const viewport: Viewport = {
  themeColor: "#111111"
};

export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
  return (
    <html lang="nl" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{__html: localeScript}} />
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
