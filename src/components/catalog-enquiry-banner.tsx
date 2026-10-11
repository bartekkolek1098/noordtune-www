import type {Locale} from '@/content/site';
const copy = {
  nl: {loading: 'Je motorselectie wordt opgehaald…', ready: 'Je motorselectie is toegevoegd. Controleer de gegevens en vul je vraag aan.', failed: 'Je motorselectie kon niet worden opgehaald. Vul de voertuiggegevens hieronder in; je kunt gewoon een vraag stellen.'},
  en: {loading: 'Loading your engine selection…', ready: 'Your engine selection has been added. Check the details and tell us what you need.', failed: 'Your engine selection could not be loaded. Enter the vehicle details below to continue with your enquiry.'},
  pl: {loading: 'Wczytywanie wybranego silnika…', ready: 'Wybrany silnik jest już dodany. Sprawdź dane i uzupełnij swoje pytanie.', failed: 'Nie udało się wczytać wybranego silnika. Wpisz dane auta poniżej — nadal możesz wysłać zapytanie.'}
};
export function CatalogEnquiryBanner({locale, status}: {locale: Locale; status: 'none' | 'loading' | 'ready' | 'failed'}) {
  if (status === 'none') return null;
  return <p data-testid="catalog-enquiry-status" data-status={status} role="status" aria-live="polite" className="mt-5 rounded-md border border-white/20 bg-white/[.04] p-4 text-sm leading-6 text-white/85">{copy[locale][status]}</p>;
}
