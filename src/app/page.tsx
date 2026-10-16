import {cookies} from "next/headers";
import {permanentRedirect, redirect} from "next/navigation";
import {defaultLocale, isLocale, localeCookieName} from "@/content/site";

/**
 * Root is a deterministic Dutch entry for first-time visitors and crawlers.
 *
 * Googlebot does not send Accept-Language, and a temporary 307 that varies
 * by that header obscures the preferred canonical. Other language pages
 * remain fully available via their dedicated URLs and language switcher.
 *
 * An explicit language selection stored by the switcher is respected and
 * remains temporary (never cached as a permanent language redirect).
 */
export default async function RootPage() {
  const storedLocale = (await cookies()).get(localeCookieName)?.value;
  if (isLocale(storedLocale) && storedLocale !== defaultLocale) {
    redirect(`/${storedLocale}`);
  }

  permanentRedirect(`/${defaultLocale}`);
}
