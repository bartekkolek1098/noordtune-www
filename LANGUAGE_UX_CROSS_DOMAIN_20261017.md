# NoordTune — widoczny wybór języka i synchronizacja WWW ↔ Power Catalog

Data: 2026-10-17. Dwa repozytoria: `noordtune-www` i `noordtune-power-catalog`.

## Oczekiwane zachowanie

- W nagłówku obu serwisów na telefonie i komputerze: jeden widoczny przycisk z globusem, kodem bieżącego języka oraz rozwijanym menu zawierającym 🇳🇱 Nederlands / 🇬🇧 English / 🇵🇱 Polski. Na szerokim ekranie również napis „Taal”, „Language” lub „Język”. Opcje mają min. 44 px wysokości, są obsługiwane klawiaturą i zamykane Escape lub kliknięciem poza menu.
- W pełnoekranowym menu telefonu: trzy bezpośrednio klikalne pola z pełnymi nazwami.
- Wybór na jednym serwisie zapisuje cookie `noordtune_preferred_locale` na domenie rodzicielskiej `.noordtune.nl` na 365 dni (tylko jawny wybór użytkownika). Na localhost cookie pozostaje host-only.
- WWW `/`: nowi użytkownicy i roboty trafiają na `/nl`; jawna preferencja z obu serwisów wygrywa przed dotychczasowym cookie `noordtune_locale`.
- Power Catalog `/`: preferencja współdzielona wygrywa przed starszym `NEXT_LOCALE`, a dla nowego użytkownika nadal działa `Accept-Language`. Wyraźne adresy `/nl`, `/en`, `/pl` zachowują swoją treść, niezależnie od cookie.
- Zachowano istniejące ścieżki tłumaczeń usług, języki `hreflang`, `x-default` na NL i canonical. Brak zmian cennika, danych RDW, wyników Stage 1, formularzy i śledzenia danych użytkownika.

## Testy regresyjne

- WWW: `pnpm test:language`, `pnpm test:seo`, `pnpm typecheck`, `pnpm lint`, `pnpm build`.
- Katalog: `pnpm test:language`, `pnpm test:seo`, `pnpm typecheck`, `pnpm lint`, `pnpm build`.
- Przeglądarka obu lokalnych produkcyjnych aplikacji: `NOORDTUNE_WWW_QA_URL=http://127.0.0.1:3175 NOORDTUNE_POWER_QA_URL=http://127.0.0.1:3176 pnpm qa:language`.
- Chrome QA: z WWW PL → Power PL, z Power EN → WWW EN, stare `NEXT_LOCALE` nie wygrywa, język katalogu z `Accept-Language` dla nowego klienta, ekran 320/390/1440, Escape, kliknięcie poza menu, czytelne opcje w mobilnym dialogu, bez wysyłania rzeczywistych formularzy.
- Katalog dodatkowo: `pnpm qa:ux:mobile` i `pnpm qa:manual-selector` (testy dopasowane do nowego headera).

## Granice wdrożenia

Nie zmieniano struktury layoutów Next.js; HTML wysyłany przez serwer ma obecnie dla stron EN/PL początkowy `lang="nl"`, po czym istniejący skrypt natychmiast aktualizuje atrybut przeglądarki. Ewentualna pełna korekta atrybutu **w HTML SSR** wymaga odrębnej migracji layoutów oraz testów SEO/caching. Ten pakiet dotyczy użyteczności i respektowania jawnej preferencji języka.
