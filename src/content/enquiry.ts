import type {Locale} from "./site";

export const enquiryServices = ["ecu", "tcu", "diagnostics", "cloning", "advice"] as const;
export type EnquiryService = (typeof enquiryServices)[number];

type EnquiryCopy = {
  title: string;
  appointmentTitle: string;
  intro: string;
  appointmentIntro: string;
  service: string;
  chooseService: string;
  services: Record<EnquiryService, string>;
  description: string;
  vehicle: string;
  plate: string;
  preferred: string;
  preferredHint: string;
  required: string;
  optional: string;
  preview: string;
  previewHint: string;
  continue: string;
  explanation: string;
  handoff: string;
  privacy: string;
  copy: string;
  copying: string;
  copied: string;
  copyFailed: string;
  alternatives: string;
  noScript: string;
  serviceError: string;
  descriptionError: string;
  lengthError: string;
};

export const enquiryCopy = {
  nl: {
    title: "Stel je vraag via WhatsApp",
    appointmentTitle: "Bereid je afspraakaanvraag voor",
    intro: "Hallo NoordTune, ik heb een vraag.",
    appointmentIntro: "Hallo NoordTune, ik wil graag een afspraak aanvragen.",
    service: "Dienst",
    chooseService: "Kies een dienst",
    services: {ecu: "ECU tuning / chiptuning", tcu: "TCU / versnellingsbaktuning", diagnostics: "Diagnose", cloning: "ECU klonen", advice: "Overig / advies"},
    description: "Korte omschrijving van je vraag",
    vehicle: "Merk, model en motor",
    plate: "Kenteken",
    preferred: "Gewenste datum of dagdeel",
    preferredHint: "Geef je voorkeur aan; dit reserveert geen tijdstip.",
    required: "verplicht",
    optional: "optioneel",
    preview: "Voorbeeld van je bericht",
    previewHint: "Pas de velden hierboven aan om je bericht te wijzigen. Je kunt de tekst hieronder ook selecteren en kopiëren.",
    continue: "Verder via WhatsApp",
    explanation: "Je bericht wordt voorbereid voor WhatsApp. Je verstuurt het daar zelf. Een afspraak is pas definitief na onze bevestiging.",
    handoff: "Als je verdergaat, wordt je bericht in de link aan WhatsApp doorgegeven. Deze website slaat je invoer niet op.",
    privacy: "Privacybeleid",
    copy: "Bericht kopiëren",
    copying: "Bezig met kopiëren…",
    copied: "Gekopieerd",
    copyFailed: "Automatisch kopiëren is niet gelukt. Selecteer en kopieer de tekst in het berichtvoorbeeld handmatig.",
    alternatives: "Liever direct contact?",
    noScript: "Schakel JavaScript in om je bericht voor te bereiden, of gebruik de contactlinks hieronder.",
    serviceError: "Kies een dienst.",
    descriptionError: "Beschrijf kort je vraag of de gewenste werkzaamheden.",
    lengthError: "Gebruik maximaal {max} tekens."
  },
  en: {
    title: "Prepare your WhatsApp enquiry",
    appointmentTitle: "Prepare your appointment request",
    intro: "Hello NoordTune, I have an enquiry.",
    appointmentIntro: "Hello NoordTune, I would like to request an appointment.",
    service: "Service",
    chooseService: "Choose a service",
    services: {ecu: "ECU tuning / chiptuning", tcu: "TCU / gearbox tuning", diagnostics: "Diagnostics", cloning: "ECU cloning", advice: "Other / advice"},
    description: "Brief description of your request",
    vehicle: "Vehicle make, model and engine",
    plate: "Registration plate",
    preferred: "Preferred date or time of day",
    preferredHint: "Tell us your preference; this does not reserve a time slot.",
    required: "required",
    optional: "optional",
    preview: "Message preview",
    previewHint: "Edit the fields above to change your message. You can also select and copy the text below.",
    continue: "Continue in WhatsApp",
    explanation: "Your message will be prepared for WhatsApp. You send it there yourself. An appointment is only confirmed after our confirmation.",
    handoff: "When you continue, your message is passed to WhatsApp in the link. This website does not save your input.",
    privacy: "Privacy policy",
    copy: "Copy message",
    copying: "Copying…",
    copied: "Copied",
    copyFailed: "Automatic copying failed. Select and copy the text in the message preview manually.",
    alternatives: "Prefer to contact us directly?",
    noScript: "Enable JavaScript to prepare your message, or use the contact links below.",
    serviceError: "Choose a service.",
    descriptionError: "Briefly describe your question or the work you need.",
    lengthError: "Use no more than {max} characters."
  },
  pl: {
    title: "Przygotuj zapytanie do WhatsApp",
    appointmentTitle: "Przygotuj zapytanie o termin",
    intro: "Dzień dobry NoordTune, mam pytanie.",
    appointmentIntro: "Dzień dobry NoordTune, chcę zapytać o termin wizyty.",
    service: "Usługa",
    chooseService: "Wybierz usługę",
    services: {ecu: "Tuning ECU / chiptuning", tcu: "Tuning TCU / skrzyni biegów", diagnostics: "Diagnostyka", cloning: "Klonowanie ECU", advice: "Inne / doradztwo"},
    description: "Krótki opis zapytania",
    vehicle: "Marka, model i silnik",
    plate: "Numer rejestracyjny",
    preferred: "Preferowana data lub pora dnia",
    preferredHint: "Podaj swoją preferencję; nie oznacza to rezerwacji terminu.",
    required: "wymagane",
    optional: "opcjonalnie",
    preview: "Podgląd wiadomości",
    previewHint: "Zmień pola powyżej, aby poprawić wiadomość. Możesz też zaznaczyć i skopiować tekst poniżej.",
    continue: "Przejdź do WhatsApp",
    explanation: "Przygotujemy wiadomość do WhatsApp. Wyślesz ją samodzielnie w aplikacji. Termin jest potwierdzony dopiero po naszej odpowiedzi.",
    handoff: "Po przejściu dalej treść wiadomości zostanie przekazana do WhatsApp w linku. Ta strona nie zapisuje wpisanych danych.",
    privacy: "Polityka prywatności",
    copy: "Kopiuj wiadomość",
    copying: "Kopiowanie…",
    copied: "Skopiowano",
    copyFailed: "Automatyczne kopiowanie nie powiodło się. Zaznacz i skopiuj ręcznie tekst w podglądzie wiadomości.",
    alternatives: "Wolisz bezpośredni kontakt?",
    noScript: "Włącz JavaScript, aby przygotować wiadomość, lub skorzystaj z danych kontaktowych poniżej.",
    serviceError: "Wybierz usługę.",
    descriptionError: "Opisz krótko pytanie lub potrzebne prace.",
    lengthError: "Użyj maksymalnie {max} znaków."
  }
} satisfies Record<Locale, EnquiryCopy>;
