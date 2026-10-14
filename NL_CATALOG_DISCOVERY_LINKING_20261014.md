# NoordTune NL — bezpośrednie linkowanie z WWW do Power Catalog, 14.10.2026

## Stan bazowy
- Główna WWW: commit produkcyjny f410513abf55229c4c85fa778b80cb634f8aa59e.
- Katalog: commit produkcyjny cf0af77dbb5f8480fe72fa8d9a3cd2624de052b6 (PR #67).
- Przed pakietem duża część WWW linkowała tylko do startowej strony katalogu. Nie tworzymy nowych stron ani nie zmieniamy wartości Stage 1.

## Zmiany
- Lista 22 ręcznie sprawdzonych, już opublikowanych adresów NL katalogu (model, silnik lub samochód dostawczy), w `src/content/catalog-discovery.ts`.
- Widoczna nawigacja z 9 popularnymi kierunkami na głównej stronie NL i `/nl/chiptuning`.
- Linki kontekstowe, właściwe dla marki, na pięciu stronach NL: BMW, Audi, Volkswagen, Ford i Toyota.
- Weryfikowane metadane dla konkretnych generacji, bez zgadywania ECU i bez dopisywania parametrów tuningu.
- Oddzielne zdarzenia `power_catalog_click` z anonimowymi źródłami `catalog_discovery_home` i `catalog_discovery_brand`; żadnych danych identyfikujących klienta.
- Brak zmian w innych językach, cenniku, formularzach i mechanizmach silnika/RDW.

## QA
- `pnpm test:seo`, `pnpm test:analytics`, `pnpm test:brand`, `pnpm typecheck`, `pnpm lint`, `pnpm build` — zaliczone.
- Local production build 146 statycznych tras.
- `NOORDTUNE_WWW_QA_URL=http://127.0.0.1:3133 pnpm qa:catalog-discovery` — zaliczone:
  - 9 linków na stronie NL / NL chiptuning,
  - 5 marek ze swoimi podstronami silników,
  - 22/22 publiczne adresy katalogu HTTP 200 oraz poprawne canonical,
  - mobile 320 i 390 oraz desktop 1440, bez poziomego przewijania,
  - brak wstawiania polskich/angielskich fałszywych wersji odnośników.
