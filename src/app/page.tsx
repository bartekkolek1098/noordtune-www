import {cookies, headers} from "next/headers";
import {redirect} from "next/navigation";
import {defaultLocale, isLocale, localeCookieName, type Locale} from "@/content/site";

function localeFromAcceptLanguage(value: string | null): Locale {
  if (!value) {
    return defaultLocale;
  }

  const normalized = value.toLowerCase();
  if (normalized.startsWith("nl")) {
    return "nl";
  }
  if (normalized.startsWith("en")) {
    return "en";
  }
  if (normalized.startsWith("pl")) {
    return "pl";
  }

  return defaultLocale;
}

export default async function RootPage() {
  const cookieStore = await cookies();
  const storedLocale = cookieStore.get(localeCookieName)?.value;

  if (isLocale(storedLocale)) {
    redirect(`/${storedLocale}`);
  }

  const headerStore = await headers();
  redirect(`/${localeFromAcceptLanguage(headerStore.get("accept-language"))}`);
}
