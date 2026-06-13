"use client";

import clsx from "clsx";
import {MessageCircle} from "lucide-react";
import {site, type Locale} from "@/content/site";

type FloatingWhatsAppProps = {
  locale: Locale;
  reduced?: boolean;
};

const labels = {
  nl: {
    aria: "WhatsApp NoordTune.nl",
    title: "WhatsApp NoordTune.nl"
  },
  en: {
    aria: "Message NoordTune.nl on WhatsApp",
    title: "Message NoordTune.nl on WhatsApp"
  },
  pl: {
    aria: "Napisz do NoordTune.nl na WhatsApp",
    title: "Napisz do NoordTune.nl na WhatsApp"
  }
} satisfies Record<Locale, {aria: string; title: string}>;

export function FloatingWhatsApp({locale, reduced = false}: FloatingWhatsAppProps) {
  const copy = labels[locale];

  return (
    <a
      aria-label={copy.aria}
      title={copy.title}
      className={clsx(
        "fixed right-4 z-50 inline-flex h-12 w-12 items-center justify-center rounded-full border border-primary/70 bg-[#101112]/92 text-white shadow-[0_0_34px_rgba(227,6,19,.34)] backdrop-blur-md transition hover:bg-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-black md:right-6",
        "bottom-[calc(env(safe-area-inset-bottom)+18px)]",
        reduced ? "md:h-11 md:w-11" : "md:h-12 md:w-12"
      )}
      href={site.whatsappUrl}
      rel="noreferrer"
      target="_blank"
    >
      <MessageCircle className="h-5 w-5" />
    </a>
  );
}
