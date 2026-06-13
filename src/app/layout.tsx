import type {Metadata} from "next";
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
  icons: {
    icon: "/brand/noordtune-icon.png",
    apple: "/brand/noordtune-icon.png"
  }
};

export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
  return (
    <html lang="nl" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{__html: localeScript}} />
      </head>
      <body>{children}</body>
    </html>
  );
}
