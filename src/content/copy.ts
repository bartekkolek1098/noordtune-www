import type {Locale, PageKey} from "./site";

export type IconName =
  | "gauge"
  | "cpu"
  | "shield"
  | "chart"
  | "wrench"
  | "scan"
  | "turbo"
  | "truck"
  | "users"
  | "map"
  | "phone"
  | "calendar"
  | "check"
  | "file"
  | "spark";

export type Cta = {
  label: string;
  href: string;
  variant?: "primary" | "outline" | "ghost";
};

export type PageHeroCopy = {
  eyebrow: string;
  title: string[];
  intro: string;
  primary: string;
  secondary: string;
};

export type SeoCopy = {
  title: string;
  description: string;
};

export type TextBlock = {
  kicker?: string;
  title: string;
  text: string;
  bullets?: string[];
  image?: string;
};

export type ServiceCardCopy = {
  title: string;
  text: string;
  bullets: string[];
  image: string;
  icon: IconName;
  page?: PageKey;
};

export type PricingPlan = {
  name: string;
  price: string;
  note: string;
  text: string;
  features: string[];
  highlighted?: boolean;
};

export type ResultCard = {
  car: string;
  stage: string;
  stock: string;
  tuned: string;
  gain: string;
  text: string;
};

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export const seo: Record<PageKey, Record<Locale, SeoCopy>> = {
  home: {
    nl: {
      title: "NoordTune.nl | Chiptuning Assen & Auto Diagnose Drenthe",
      description:
        "Professionele chiptuning en auto diagnose in Assen. ECU remap, Stage 1 tuning, Stage 2 tuning, DSG tuning en storing analyse voor Drenthe en Groningen."
    },
    en: {
      title: "NoordTune.nl | Chiptuning and Car Diagnostics in Assen",
      description:
        "Premium chiptuning, ECU remap and vehicle diagnostics in Assen. Custom software, careful logging and clear advice for every car."
    },
    pl: {
      title: "NoordTune.nl | Chiptuning i diagnostyka samochodowa Assen",
      description:
        "Profesjonalny chiptuning, remap ECU i diagnostyka samochodowa w Assen. Indywidualne strojenie, logi i jasne doradztwo."
    }
  },
  chiptuning: {
    nl: {
      title: "Chiptuning Assen | ECU Remap, Stage 1 en Stage 2 | NoordTune.nl",
      description:
        "Chiptuning Assen en Drenthe met software op maat. ECU remap, Stage 1 tuning, Stage 2 tuning, BMW chiptuning, Audi chiptuning en Volkswagen chiptuning."
    },
    en: {
      title: "Chiptuning in Assen | ECU Remap, Stage 1 and Stage 2",
      description:
        "Custom ECU remap and chiptuning in Assen. Stage 1 and Stage 2 tuning with diagnostics, safety checks and transparent advice."
    },
    pl: {
      title: "Chiptuning Assen | Remap ECU, Stage 1 i Stage 2",
      description:
        "Indywidualny remap ECU i chiptuning w Assen. Stage 1, Stage 2, diagnostyka i bezpieczne podejście do każdego auta."
    }
  },
  diagnose: {
    nl: {
      title: "Auto Diagnose Assen | Foutcodes, Live Data en Loganalyse",
      description:
        "Auto diagnose Assen voor storingen, foutcodes, live data, loganalyse, DPF storing, EGR storing en AdBlue storing. Gericht advies zonder giswerk."
    },
    en: {
      title: "Car Diagnostics in Assen | Fault Codes, Live Data and Logs",
      description:
        "Vehicle diagnostics in Assen for fault codes, live data, log analysis, DPF, EGR and AdBlue issues with clear technical advice."
    },
    pl: {
      title: "Diagnostyka samochodowa Assen | Błędy, live data i logi",
      description:
        "Diagnostyka samochodowa w Assen: kody błędów, live data, analiza logów, problemy DPF, EGR i AdBlue."
    }
  },
  diensten: {
    nl: {
      title: "Aanbod & Diensten | Chiptuning, Diagnose, DSG en TCU Tuning",
      description:
        "Bekijk alle diensten van NoordTune.nl: chiptuning, auto diagnose, loganalyse, DSG tuning, TCU tuning en emissiesysteem diagnose waar wettelijk toegestaan."
    },
    en: {
      title: "Services | Chiptuning, Diagnostics, DSG and TCU Tuning",
      description:
        "NoordTune.nl services: chiptuning, diagnostics, log analysis, DSG tuning, TCU tuning and legal software support where permitted."
    },
    pl: {
      title: "Oferta i usługi | Chiptuning, diagnostyka, DSG i TCU",
      description:
        "Usługi NoordTune.nl: chiptuning, diagnostyka, analiza logów, DSG tuning, TCU tuning i rozwiązania zgodne z przepisami."
    }
  },
  prijzen: {
    nl: {
      title: "Prijzen & Pakketten | Diagnose vanaf €89, Stage 1 vanaf €649",
      description:
        "Transparante prijzen voor chiptuning en auto diagnose: diagnose vanaf €89, Stage 1 vanaf €649, Stage 2 vanaf €849 en loganalyse vanaf €149."
    },
    en: {
      title: "Pricing | Diagnostics from €89 and Stage 1 from €649",
      description:
        "Clear starting prices for diagnostics, Stage 1, Stage 2, log analysis and mobile service. Final quote depends on the vehicle."
    },
    pl: {
      title: "Cennik | Diagnostyka od €89 i Stage 1 od €649",
      description:
        "Przejrzyste ceny startowe: diagnostyka od €89, Stage 1 od €649, Stage 2 od €849 i analiza logów od €149."
    }
  },
  resultaten: {
    nl: {
      title: "Resultaten | Voorbeelden van Stage 1 Tuning en ECU Remap",
      description:
        "Bekijk voorbeeldresultaten voor BMW chiptuning, Audi chiptuning, Volkswagen chiptuning en Mercedes chiptuning. Indicatieve winst per voertuig."
    },
    en: {
      title: "Results | Stage 1 Tuning and ECU Remap Examples",
      description:
        "Example chiptuning results for BMW, Audi, Volkswagen and Mercedes. Indicative gains, always verified per vehicle."
    },
    pl: {
      title: "Rezultaty | Przykłady Stage 1 i remap ECU",
      description:
        "Przykładowe wyniki chiptuningu BMW, Audi, Volkswagen i Mercedes. Wyniki są orientacyjne i zależą od auta."
    }
  },
  blog: {
    nl: {
      title: "Nieuws & Blog | Uitleg over Chiptuning, ECU Remap en Diagnose",
      description:
        "Lees praktische artikelen over chiptuning, Stage 1 vs Stage 2, ECU remap veiligheid, AdBlue storing en waarom diagnose voor tuning belangrijk is."
    },
    en: {
      title: "News & Blog | Chiptuning, ECU Remap and Diagnostics",
      description:
        "Educational articles about chiptuning, Stage 1 vs Stage 2, ECU remap safety, AdBlue faults and diagnostics before tuning."
    },
    pl: {
      title: "Aktualności i blog | Chiptuning, remap ECU i diagnostyka",
      description:
        "Artykuły o chiptuningu, różnicy Stage 1 i Stage 2, bezpieczeństwie remapu ECU, AdBlue i diagnostyce przed tuningiem."
    }
  },
  over: {
    nl: {
      title: "Over NoordTune.nl | Chiptuning & Auto Diagnostiek in Assen",
      description:
        "Maak kennis met NoordTune.nl in Assen: technische aanpak, maatwerk chiptuning, diagnose, loganalyse en persoonlijk advies voor Drenthe en Groningen."
    },
    en: {
      title: "About NoordTune.nl | Chiptuning and Diagnostics in Assen",
      description:
        "Meet NoordTune.nl: a technical, careful and personal approach to chiptuning, diagnostics and performance software in Assen."
    },
    pl: {
      title: "O NoordTune.nl | Chiptuning i diagnostyka w Assen",
      description:
        "Poznaj NoordTune.nl: techniczne podejście, indywidualny chiptuning, diagnostyka i doradztwo w Assen."
    }
  },
  contact: {
    nl: {
      title: "Contact | NoordTune.nl Chiptuning & Auto Diagnose Assen",
      description:
        "Neem contact op met NoordTune.nl in Assen voor chiptuning, auto diagnose, ECU remap, DSG tuning en storingsanalyse in Drenthe en Groningen."
    },
    en: {
      title: "Contact | NoordTune.nl Chiptuning and Diagnostics Assen",
      description:
        "Contact NoordTune.nl in Assen for chiptuning, diagnostics, ECU remap, DSG tuning and technical advice."
    },
    pl: {
      title: "Kontakt | NoordTune.nl Chiptuning i diagnostyka Assen",
      description:
        "Skontaktuj się z NoordTune.nl w Assen w sprawie chiptuningu, diagnostyki, remapu ECU i porad technicznych."
    }
  },
  appointment: {
    nl: {
      title: "Afspraak maken | NoordTune.nl Chiptuning & Auto Diagnose",
      description:
        "Het online afsprakensysteem van NoordTune.nl komt eraan. Neem voorlopig contact op via WhatsApp of controleer eerst jouw tuningmogelijkheden in de Power Catalog."
    },
    en: {
      title: "Book an appointment | NoordTune.nl Chiptuning & Diagnostics",
      description:
        "The online booking system is coming soon. For now, contact NoordTune.nl via WhatsApp or check your tuning options in the Power Catalog."
    },
    pl: {
      title: "Umów termin | NoordTune.nl Chiptuning i diagnostyka",
      description:
        "System rezerwacji online jest w przygotowaniu. Na razie skontaktuj się przez WhatsApp lub sprawdź auto w katalogu mocy."
    }
  },
  privacy: {
    nl: {
      title: "Privacybeleid | NoordTune.nl",
      description: "Lees hoe NoordTune.nl omgaat met persoonsgegevens, contactaanvragen en websitegegevens."
    },
    en: {
      title: "Privacy Policy | NoordTune.nl",
      description: "Read how NoordTune.nl handles personal data, contact requests and website information."
    },
    pl: {
      title: "Polityka prywatności | NoordTune.nl",
      description: "Informacje o tym, jak NoordTune.nl przetwarza dane osobowe i zapytania kontaktowe."
    }
  },
  terms: {
    nl: {
      title: "Algemene voorwaarden | NoordTune.nl",
      description: "Algemene voorwaarden voor diensten, afspraken, offertes en werkzaamheden van NoordTune.nl."
    },
    en: {
      title: "Terms and Conditions | NoordTune.nl",
      description: "General terms for services, appointments, quotes and work by NoordTune.nl."
    },
    pl: {
      title: "Regulamin | NoordTune.nl",
      description: "Warunki świadczenia usług, wizyt, wycen i prac wykonywanych przez NoordTune.nl."
    }
  }
};

export const pageHeroes: Record<PageKey, Record<Locale, PageHeroCopy>> = {
  home: {
    nl: {
      eyebrow: "Chiptuning & Auto Diagnose in Assen",
      title: ["Meer vermogen.", "Meer rijplezier.", "100% op maat."],
      intro: "Professionele chiptuning, ECU remap en auto diagnose, afgestemd op jouw auto, motor en rijstijl.",
      primary: "Vermogen berekenen",
      secondary: "WhatsApp ons"
    },
    en: {
      eyebrow: "Chiptuning & Car Diagnostics in Assen",
      title: ["More power.", "Better response.", "100% custom."],
      intro: "Professional ECU remap, chiptuning and vehicle diagnostics tailored to your car, engine and driving style.",
      primary: "Check tuning options",
      secondary: "Message us"
    },
    pl: {
      eyebrow: "Chiptuning i diagnostyka samochodowa w Assen",
      title: ["Więcej mocy.", "Więcej frajdy z jazdy.", "100% pod Twoje auto."],
      intro: "Profesjonalny chiptuning, remap ECU i diagnostyka przygotowane indywidualnie pod konkretny samochód.",
      primary: "Sprawdź możliwości auta",
      secondary: "Napisz na WhatsApp"
    }
  },
  chiptuning: {
    nl: {
      eyebrow: "ECU remap Assen",
      title: ["Chiptuning", "op maat"],
      intro:
        "Meer vermogen, meer koppel en een soepelere rijervaring met software die past bij jouw motor, transmissie en gebruik.",
      primary: "Bekijk tuningmogelijkheden",
      secondary: "Plan een afspraak"
    },
    en: {
      eyebrow: "ECU remap Assen",
      title: ["Custom", "chiptuning"],
      intro: "More power, more torque and cleaner drivability with software matched to your engine and use.",
      primary: "Check tuning options",
      secondary: "Book an appointment"
    },
    pl: {
      eyebrow: "Remap ECU Assen",
      title: ["Chiptuning", "na zamówienie"],
      intro: "Więcej mocy, momentu i lepsza reakcja auta dzięki oprogramowaniu dobranemu do silnika, skrzyni i sposobu użytkowania.",
      primary: "Sprawdź możliwości auta",
      secondary: "Umów wizytę"
    }
  },
  diagnose: {
    nl: {
      eyebrow: "Auto diagnose Assen",
      title: ["Storing zoeken", "zonder giswerk"],
      intro:
        "Foutcodes, live data en loganalyse brengen duidelijkheid voordat er onderdelen worden vervangen of software wordt aangepast.",
      primary: "WhatsApp ons",
      secondary: "Controleer jouw auto"
    },
    en: {
      eyebrow: "Vehicle diagnostics Assen",
      title: ["Find faults", "with data"],
      intro: "Fault codes, live data and log analysis give clarity before parts or software are changed.",
      primary: "Message us on WhatsApp",
      secondary: "Check tuning options"
    },
    pl: {
      eyebrow: "Diagnostyka samochodowa Assen",
      title: ["Diagnoza", "bez zgadywania"],
      intro: "Kody błędów, live data i logi pokazują problem, zanim wymienisz części albo zmienisz oprogramowanie.",
      primary: "Napisz na WhatsApp",
      secondary: "Sprawdź auto w katalogu"
    }
  },
  diensten: {
    nl: {
      eyebrow: "Aanbod & diensten",
      title: ["Alles voor", "prestaties en controle"],
      intro:
        "Van chiptuning tot auto diagnose, loganalyse en DSG / TCU tuning. Eerlijk advies, professionele uitvoering.",
      primary: "Open Power Catalog",
      secondary: "WhatsApp ons"
    },
    en: {
      eyebrow: "Services",
      title: ["Performance", "and control"],
      intro: "From chiptuning to diagnostics, log analysis and DSG / TCU tuning with honest technical advice.",
      primary: "Open Power Catalog",
      secondary: "Message us on WhatsApp"
    },
    pl: {
      eyebrow: "Oferta i usługi",
      title: ["Osiągi", "i kontrola"],
      intro: "Od chiptuningu po diagnostykę, logi i tuning DSG / TCU. Uczciwe doradztwo, dokładna praca i jasne zasady.",
      primary: "Otwórz katalog mocy",
      secondary: "Napisz na WhatsApp"
    }
  },
  prijzen: {
    nl: {
      eyebrow: "Prijzen & pakketten",
      title: ["Transparant", "vanaf de start"],
      intro:
        "Indicatieve vanaf-prijzen voor diagnose, Stage 1, Stage 2, loganalyse en mobiele service. De exacte prijs hangt af van jouw voertuig.",
      primary: "Plan een afspraak",
      secondary: "WhatsApp ons"
    },
    en: {
      eyebrow: "Pricing",
      title: ["Clear", "from the start"],
      intro: "Indicative starting prices for diagnostics, Stage 1, Stage 2, logs and mobile service.",
      primary: "Book an appointment",
      secondary: "Message us on WhatsApp"
    },
    pl: {
      eyebrow: "Cennik",
      title: ["Przejrzyście", "od początku"],
      intro: "Orientacyjne ceny diagnostyki, Stage 1, Stage 2, analizy logów i usługi mobilnej. Ostateczna wycena zależy od konkretnego auta.",
      primary: "Umów wizytę",
      secondary: "Napisz na WhatsApp"
    }
  },
  resultaten: {
    nl: {
      eyebrow: "Resultaten & klantcases",
      title: ["Meetbare winst", "realistische marges"],
      intro:
        "Voorbeeldresultaten voor populaire motoren. Iedere auto wordt afzonderlijk beoordeeld op onderhoud, ECU, transmissie en gebruik.",
      primary: "Bekijk tuningmogelijkheden",
      secondary: "WhatsApp ons"
    },
    en: {
      eyebrow: "Results",
      title: ["Measured gains", "realistic margins"],
      intro: "Example results for popular engines. Every vehicle is checked individually before tuning.",
      primary: "Check tuning options",
      secondary: "Message us on WhatsApp"
    },
    pl: {
      eyebrow: "Rezultaty",
      title: ["Mierzalne efekty", "realne marginesy"],
      intro: "Przykładowe wyniki popularnych silników. Każde auto jest oceniane indywidualnie przed tuningiem.",
      primary: "Sprawdź możliwości auta",
      secondary: "Napisz na WhatsApp"
    }
  },
  blog: {
    nl: {
      eyebrow: "Nieuws & blog",
      title: ["Kennis", "voor betere keuzes"],
      intro:
        "Heldere uitleg over chiptuning, ECU remap, storing analyse, Stage 1, Stage 2 en onderhoud na tuning.",
      primary: "Controleer jouw auto",
      secondary: "WhatsApp ons"
    },
    en: {
      eyebrow: "News & blog",
      title: ["Knowledge", "for better choices"],
      intro: "Clear articles about chiptuning, ECU remap, diagnostics, Stage 1, Stage 2 and tuning aftercare.",
      primary: "Check tuning options",
      secondary: "Message us on WhatsApp"
    },
    pl: {
      eyebrow: "Aktualności i blog",
      title: ["Wiedza", "dla lepszych decyzji"],
      intro: "Proste wyjaśnienia o chiptuningu, remapie ECU, diagnostyce, Stage 1 i Stage 2.",
      primary: "Sprawdź auto w katalogu",
      secondary: "Napisz na WhatsApp"
    }
  },
  over: {
    nl: {
      eyebrow: "Over NoordTune.nl",
      title: ["Techniek", "met aandacht"],
      intro:
        "NoordTune.nl combineert passie voor auto's met diagnose, softwarekennis en een nuchtere aanpak voor betrouwbare prestaties.",
      primary: "WhatsApp ons",
      secondary: "Plan een afspraak"
    },
    en: {
      eyebrow: "About NoordTune.nl",
      title: ["Technical", "and personal"],
      intro: "NoordTune.nl combines automotive passion with diagnostics, software knowledge and careful tuning.",
      primary: "Message us on WhatsApp",
      secondary: "Book an appointment"
    },
    pl: {
      eyebrow: "O NoordTune.nl",
      title: ["Technika", "i dbałość"],
      intro: "NoordTune.nl łączy pasję do aut, diagnostykę, wiedzę o oprogramowaniu i rozsądne podejście do osiągów.",
      primary: "Napisz na WhatsApp",
      secondary: "Umów wizytę"
    }
  },
  contact: {
    nl: {
      eyebrow: "Contact & afspraak",
      title: ["Wij staan", "voor je klaar"],
      intro:
        "Stuur je vraag, kenteken of storing via WhatsApp. We denken mee over chiptuning, auto diagnose en de juiste vervolgstap.",
      primary: "Plan een afspraak",
      secondary: "WhatsApp ons"
    },
    en: {
      eyebrow: "Contact",
      title: ["Ready", "to help"],
      intro: "Send your question, plate or fault description via WhatsApp and we will advise the next step.",
      primary: "Book an appointment",
      secondary: "Message us on WhatsApp"
    },
    pl: {
      eyebrow: "Kontakt",
      title: ["Jesteśmy", "do pomocy"],
      intro: "Wyślij pytanie, numer rejestracyjny lub opis błędu przez WhatsApp, a doradzimy kolejny krok.",
      primary: "Umów wizytę",
      secondary: "Napisz na WhatsApp"
    }
  },
  appointment: {
    nl: {
      eyebrow: "Afspraak maken",
      title: ["Online boeken", "komt binnenkort"],
      intro:
        "We bereiden een duidelijk afsprakensysteem voor. Tot die tijd plannen we persoonlijk via WhatsApp en kun je alvast de tuningmogelijkheden van je auto controleren.",
      primary: "WhatsApp ons",
      secondary: "Open Power Catalog"
    },
    en: {
      eyebrow: "Booking",
      title: ["Online booking", "coming soon"],
      intro:
        "We are preparing a clear booking system. Until then, please contact us via WhatsApp and check your vehicle in the Power Catalog.",
      primary: "Message us on WhatsApp",
      secondary: "Open Power Catalog"
    },
    pl: {
      eyebrow: "Termin",
      title: ["Rezerwacja online", "w przygotowaniu"],
      intro:
        "Przygotowujemy prosty system rezerwacji. Do tego czasu skontaktuj się przez WhatsApp i sprawdź auto w katalogu mocy.",
      primary: "Napisz na WhatsApp",
      secondary: "Otwórz katalog mocy"
    }
  },
  privacy: {
    nl: {
      eyebrow: "Privacy",
      title: ["Privacybeleid"],
      intro: "Hoe NoordTune.nl zorgvuldig omgaat met contactgegevens, websitegebruik en aanvragen.",
      primary: "Contact",
      secondary: "WhatsApp ons"
    },
    en: {
      eyebrow: "Privacy",
      title: ["Privacy policy"],
      intro: "How NoordTune.nl handles contact details, website usage and requests.",
      primary: "Contact",
      secondary: "Message us on WhatsApp"
    },
    pl: {
      eyebrow: "Prywatność",
      title: ["Polityka prywatności"],
      intro: "Jak NoordTune.nl obsługuje dane kontaktowe, użycie strony i zapytania.",
      primary: "Kontakt",
      secondary: "Napisz na WhatsApp"
    }
  },
  terms: {
    nl: {
      eyebrow: "Voorwaarden",
      title: ["Algemene voorwaarden"],
      intro: "Duidelijke uitgangspunten voor afspraken, offertes, diagnose en tuning werkzaamheden.",
      primary: "Contact",
      secondary: "WhatsApp ons"
    },
    en: {
      eyebrow: "Terms",
      title: ["Terms and conditions"],
      intro: "Clear principles for appointments, quotes, diagnostics and tuning work.",
      primary: "Contact",
      secondary: "Message us on WhatsApp"
    },
    pl: {
      eyebrow: "Warunki",
      title: ["Regulamin"],
      intro: "Zasady dotyczące wizyt, wycen, diagnostyki i prac tuningowych.",
      primary: "Kontakt",
      secondary: "Napisz na WhatsApp"
    }
  }
};

export const homeContent: Record<Locale, {
  trust: string[];
  features: Array<{title: string; text: string; icon: IconName}>;
  intro: TextBlock;
  highlights: TextBlock[];
  finalTitle: string;
  finalText: string;
}> = {
  nl: {
    trust: ["Chiptuning op maat", "Auto diagnose", "Stage 1 / Stage 2", "Assen & omgeving"],
    features: [
      {title: "Meer vermogen & koppel", text: "Direct voelbare prestatieverbetering", icon: "gauge"},
      {title: "100% op maat", text: "Geen standaard bestand zonder controle", icon: "cpu"},
      {title: "Veilig & betrouwbaar", text: "Met aandacht voor motor en transmissie", icon: "shield"},
      {title: "Betere rijervaring", text: "Meer souplesse, respons en rust", icon: "chart"}
    ],
    intro: {
      kicker: "Wat doet NoordTune.nl?",
      title: "Software, diagnose en advies voor auto's die beter moeten rijden.",
      text:
        "NoordTune.nl helpt automobilisten en ondernemers in Assen, Drenthe en Groningen met professionele chiptuning, ECU remap en auto diagnose. Wij kijken niet alleen naar piekvermogen, maar naar het complete gedrag van de auto: koppelopbouw, gaspedaalrespons, schakelmomenten, foutcodes, live data en de technische staat. Zo ontstaat een oplossing die past bij jouw motor, jouw gebruik en jouw verwachtingen.",
      bullets: [
        "Chiptuning Assen met veilige marges en originele file backup",
        "Auto diagnose Assen voor foutcodes, live data en loganalyse",
        "Advies voor Stage 1 tuning, Stage 2 tuning, DSG tuning en TCU tuning",
        "Ondersteuning bij DPF storing, EGR storing en AdBlue storing waar wettelijk toegestaan"
      ],
      image: "/images/sections/obd-reprogramming.webp"
    },
    highlights: [
      {
        kicker: "Chiptuning op maat",
        title: "Meer vermogen zonder het karakter van jouw auto te verpesten.",
        text:
          "Een goede ECU remap voelt alsof de auto zo uit de fabriek had moeten komen: krachtiger, soepeler en voorspelbaar. Bij NoordTune.nl stemmen we software af op de motorvariant, onderhoudsstaat, brandstof, transmissie en jouw rijstijl. Stage 1 tuning is ideaal voor een standaard auto. Stage 2 tuning past bij voertuigen met ondersteunende hardware en vraagt extra controle op temperaturen, luchtmassa, turbodruk en koppellimieten.",
        bullets: ["BMW chiptuning", "Audi chiptuning", "Volkswagen chiptuning", "Mercedes chiptuning"],
        image: "/images/sections/autotuner-ecu-hands.jpeg"
      },
      {
        kicker: "Auto diagnose & loganalyse",
        title: "Meten voordat we aanpassen.",
        text:
          "Bij moderne auto's vertelt een foutcode zelden het hele verhaal. Daarom combineren we diagnose met live data, loganalyse en technische interpretatie. Dat is belangrijk bij vermogensverlies, noodloop, DPF storing, EGR storing, AdBlue storing, turbodrukproblemen of onrustig schakelgedrag. Ook voor tuning controleren we waar nodig eerst de basis, zodat software geen bestaande problemen verbergt.",
        bullets: ["Foutcodes uitlezen", "Live data controleren", "Rijlogs analyseren", "Gericht hersteladvies"],
        image: "/images/sections/obd-connector.jpg"
      },
      {
        kicker: "DSG / TCU tuning",
        title: "Transmissiesoftware die past bij het extra koppel.",
        text:
          "Bij veel auto's bepaalt de transmissie hoe bruikbaar de tuning voelt. DSG tuning of TCU tuning kan schakelmomenten, koppelbegrenzers en rijgedrag optimaliseren. Het doel is geen harde of onrustige bak, maar een transmissie die logischer reageert op het extra vermogen en comfortabel blijft in dagelijks gebruik.",
        bullets: ["Koppellimieten controleren", "Schakelgedrag verbeteren", "Betere respons onder belasting"],
        image: "/images/sections/datalog-road.webp"
      }
    ],
    finalTitle: "Klaar voor meer vermogen en zekerheid?",
    finalText:
      "Stuur je kenteken, motorvariant of storing via WhatsApp. Dan kijken we gericht mee en verwijzen we je naar de catalogus of een passende afspraak."
  },
  en: {
    trust: ["Custom ECU remap", "Car diagnostics", "Stage 1 / Stage 2", "Assen area"],
    features: [
      {title: "More power & torque", text: "Performance you can feel", icon: "gauge"},
      {title: "Built per vehicle", text: "No blind generic files", icon: "cpu"},
      {title: "Safe approach", text: "With engine and gearbox limits in mind", icon: "shield"},
      {title: "Better drivability", text: "Smoother response and control", icon: "chart"}
    ],
    intro: {
      kicker: "What does NoordTune.nl do?",
      title: "Software, diagnostics and advice for cars that should drive better.",
      text:
        "NoordTune.nl provides professional chiptuning, ECU remap and diagnostics in Assen. We focus on the whole vehicle: torque delivery, throttle response, gearbox behavior, fault codes and live data.",
      bullets: ["Custom ECU remap", "Diagnostics and log analysis", "Stage 1 and Stage 2 advice", "DSG and TCU tuning"],
      image: "/images/sections/obd-reprogramming.webp"
    },
    highlights: [
      {
        kicker: "Custom chiptuning",
        title: "More performance with a factory-like feel.",
        text:
          "Good tuning makes the vehicle stronger and smoother without losing reliability. We tune for the engine, transmission, condition and intended use.",
        bullets: ["BMW tuning", "Audi tuning", "Volkswagen tuning", "Mercedes tuning"],
        image: "/images/sections/autotuner-ecu-hands.jpeg"
      },
      {
        kicker: "Diagnostics and logs",
        title: "Measure first, tune second.",
        text:
          "Fault codes, live data and logs help separate real causes from symptoms before software or parts are changed.",
        bullets: ["Fault codes", "Live data", "Road logs", "Clear advice"],
        image: "/images/sections/obd-connector.jpg"
      },
      {
        kicker: "DSG / TCU tuning",
        title: "Transmission behavior matched to the extra torque.",
        text:
          "DSG and TCU tuning can improve shift behavior, torque limits and response while keeping the car pleasant every day.",
        bullets: ["Torque limits", "Shift strategy", "Drivability"],
        image: "/images/sections/datalog-road.webp"
      }
    ],
    finalTitle: "Ready for more performance?",
    finalText: "Send your vehicle details via WhatsApp and we will point you to the right catalog result or appointment."
  },
  pl: {
    trust: ["Chiptuning na zamówienie", "Diagnostyka samochodowa", "Stage 1 / Stage 2", "Assen i okolice"],
    features: [
      {title: "Więcej mocy i momentu", text: "Odczuwalna poprawa osiągów", icon: "gauge"},
      {title: "Pod konkretne auto", text: "Bez ślepych gotowych plików", icon: "cpu"},
      {title: "Bezpieczne podejście", text: "Z uwagą na silnik i skrzynię", icon: "shield"},
      {title: "Lepsza jazda", text: "Lepsza reakcja i płynność", icon: "chart"}
    ],
    intro: {
      kicker: "Co robi NoordTune.nl?",
      title: "Oprogramowanie, diagnostyka i doradztwo dla aut, które mają jeździć lepiej.",
      text:
        "NoordTune.nl oferuje profesjonalny chiptuning, remap ECU i diagnostykę w Assen. Patrzymy na cały samochód: moment obrotowy, reakcję gazu, pracę skrzyni, kody błędów i live data. Dzięki temu doradzamy rozwiązanie dopasowane do auta, silnika i sposobu jazdy.",
      bullets: ["Indywidualny remap ECU", "Diagnostyka i analiza logów", "Stage 1 i Stage 2", "DSG i TCU tuning"],
      image: "/images/sections/obd-reprogramming.webp"
    },
    highlights: [
      {
        kicker: "Chiptuning na zamówienie",
        title: "Więcej osiągów z seryjnym charakterem jazdy.",
        text:
          "Dobry tuning sprawia, że auto jest mocniejsze i płynniejsze bez utraty kultury pracy. Program dobieramy do silnika, skrzyni, stanu auta i sposobu użytkowania. Liczą się nie tylko liczby, ale też sposób budowania momentu, reakcja pedału gazu i bezpieczeństwo podzespołów.",
        bullets: ["BMW tuning", "Audi tuning", "Volkswagen tuning", "Mercedes tuning"],
        image: "/images/sections/autotuner-ecu-hands.jpeg"
      },
      {
        kicker: "Diagnostyka i logi",
        title: "Najpierw pomiar, potem zmiany.",
        text:
          "Kody błędów, live data i logi pomagają znaleźć przyczynę problemu przed wymianą części lub zmianą oprogramowania. To ważne przy spadku mocy, trybie awaryjnym, problemach z DPF, EGR, AdBlue albo nietypowej pracy skrzyni.",
        bullets: ["Kody błędów", "Live data", "Logi drogowe", "Jasne doradztwo"],
        image: "/images/sections/obd-connector.jpg"
      },
      {
        kicker: "DSG / TCU tuning",
        title: "Praca skrzyni dopasowana do dodatkowego momentu.",
        text:
          "Tuning DSG i TCU może poprawić zmiany biegów, limity momentu i reakcję auta, zachowując komfort jazdy. Celem nie jest nerwowa skrzynia, tylko napęd, który logicznie współpracuje z dodatkowym momentem.",
        bullets: ["Limity momentu", "Strategia zmian", "Komfort jazdy"],
        image: "/images/sections/datalog-road.webp"
      }
    ],
    finalTitle: "Gotowy na lepsze osiągi i pewność?",
    finalText: "Sprawdź swoje auto w katalogu mocy NoordTune albo wyślij nam dane pojazdu przez WhatsApp."
  }
};

export const services: Record<Locale, ServiceCardCopy[]> = {
  nl: [
    {
      title: "Chiptuning",
      text: "Meer vermogen, meer koppel en een soepelere verbranding. Volledig afgestemd op jouw auto.",
      bullets: ["Stage 1 tuning", "Stage 2 tuning", "ECU remap Assen"],
      image: "/images/sections/autotuner-ecu-hands.jpeg",
      icon: "gauge",
      page: "chiptuning"
    },
    {
      title: "Auto Diagnose",
      text: "Professionele diagnose van storingen, foutcodes, live data en meetwaarden.",
      bullets: ["Foutcodes uitlezen", "Live data analyse", "Gericht advies"],
      image: "/images/sections/obd-connector.jpg",
      icon: "scan",
      page: "diagnose"
    },
    {
      title: "DPF / EGR / AdBlue",
      text: "Diagnose, storing analyse en softwarematige ondersteuning waar wettelijk toegestaan.",
      bullets: ["DPF storing", "EGR storing", "AdBlue storing"],
      image: "/images/sections/bmw-diagnostics.jpg",
      icon: "shield",
      page: "diagnose"
    },
    {
      title: "DSG / TCU tuning",
      text: "Optimalisatie van schakelgedrag, koppellimieten en rijgevoel voor transmissies.",
      bullets: ["Snellere respons", "Soepeler schakelen", "Passend bij extra koppel"],
      image: "/images/sections/datalog-road.webp",
      icon: "cpu",
      page: "diensten"
    },
    {
      title: "Loganalyse",
      text: "Gedetailleerde analyse van rijlogs, turbodruk, luchtmassa, injectie en veiligheid.",
      bullets: ["Data analyse", "Probleemdetectie", "Controle na tuning"],
      image: "/images/sections/autotuner-bench.webp",
      icon: "chart",
      page: "diagnose"
    },
    {
      title: "Mobiele service",
      text: "Waar mogelijk komen we naar je toe voor diagnose of voorbereiding op locatie.",
      bullets: ["Assen en omgeving", "Vooraf afgestemd", "Flexibel plannen"],
      image: "/images/sections/bench-ecu-service.webp",
      icon: "truck",
      page: "contact"
    }
  ],
  en: [],
  pl: []
};

services.en = [
  {
    title: "Chiptuning",
    text: "More power, torque and cleaner drivability with software tailored to your car.",
    bullets: ["Stage 1 tuning", "Stage 2 tuning", "ECU remap"],
    image: "/images/sections/autotuner-ecu-hands.jpeg",
    icon: "gauge",
    page: "chiptuning"
  },
  {
    title: "Car diagnostics",
    text: "Professional fault code reading, live data checks and technical diagnosis.",
    bullets: ["Fault codes", "Live data", "Clear advice"],
    image: "/images/sections/obd-connector.jpg",
    icon: "scan",
    page: "diagnose"
  },
  {
    title: "DPF / EGR / AdBlue",
    text: "Fault analysis and legal software support where permitted.",
    bullets: ["DPF faults", "EGR faults", "AdBlue faults"],
    image: "/images/sections/bmw-diagnostics.jpg",
    icon: "shield",
    page: "diagnose"
  },
  {
    title: "DSG / TCU tuning",
    text: "Transmission behavior, torque limits and shift response matched to the tune.",
    bullets: ["Response", "Shift comfort", "Torque control"],
    image: "/images/sections/datalog-road.webp",
    icon: "cpu",
    page: "diensten"
  },
  {
    title: "Log analysis",
    text: "Detailed review of boost, airflow, injection, temperatures and safety margins.",
    bullets: ["Data analysis", "Problem detection", "Aftercare"],
    image: "/images/sections/autotuner-bench.webp",
    icon: "chart",
    page: "diagnose"
  },
  {
    title: "Mobile service",
    text: "Where possible, we come to you for diagnostics or preparation on location.",
    bullets: ["Assen region", "Planned upfront", "Flexible"],
    image: "/images/sections/bench-ecu-service.webp",
    icon: "truck",
    page: "contact"
  }
];

services.pl = [
  {
    title: "Chiptuning",
    text: "Więcej mocy, momentu i lepsza reakcja dzięki oprogramowaniu dobranemu do konkretnego auta.",
    bullets: ["Stage 1", "Stage 2", "Remap ECU"],
    image: "/images/sections/autotuner-ecu-hands.jpeg",
    icon: "gauge",
    page: "chiptuning"
  },
  {
    title: "Diagnostyka",
    text: "Profesjonalny odczyt błędów, live data, analiza logów i techniczna interpretacja wyników.",
    bullets: ["Kody błędów", "Live data", "Doradztwo"],
    image: "/images/sections/obd-connector.jpg",
    icon: "scan",
    page: "diagnose"
  },
  {
    title: "DPF / EGR / AdBlue",
    text: "Diagnostyka, analiza usterek i rozwiązania zgodne z przepisami tam, gdzie jest to możliwe.",
    bullets: ["DPF", "EGR", "AdBlue"],
    image: "/images/sections/bmw-diagnostics.jpg",
    icon: "shield",
    page: "diagnose"
  },
  {
    title: "DSG / TCU tuning",
    text: "Praca skrzyni, limity momentu i reakcja dopasowane do dodatkowego momentu.",
    bullets: ["Reakcja", "Komfort zmian", "Kontrola momentu"],
    image: "/images/sections/datalog-road.webp",
    icon: "cpu",
    page: "diensten"
  },
  {
    title: "Analiza logów",
    text: "Szczegółowa analiza doładowania, przepływu powietrza, wtrysku, temperatur i marginesów bezpieczeństwa.",
    bullets: ["Analiza danych", "Wykrywanie problemów", "Kontrola po tuningu"],
    image: "/images/sections/autotuner-bench.webp",
    icon: "chart",
    page: "diagnose"
  },
  {
    title: "Serwis mobilny",
    text: "Tam, gdzie jest to technicznie możliwe, przyjeżdżamy na diagnostykę lub przygotowanie na miejscu.",
    bullets: ["Okolice Assen", "Uzgodnienie przed", "Elastycznie"],
    image: "/images/sections/bench-ecu-service.webp",
    icon: "truck",
    page: "contact"
  }
];

export const processSteps: Record<Locale, Array<{title: string; text: string; icon: IconName}>> = {
  nl: [
    {title: "Afspraak maken", text: "Je stuurt je kenteken, motor of klacht via WhatsApp of formulier.", icon: "calendar"},
    {title: "Diagnose & intake", text: "We bespreken wensen en controleren de technische basis.", icon: "scan"},
    {title: "Op maat maken", text: "Software of advies wordt afgestemd op jouw voertuig.", icon: "cpu"},
    {title: "Uitvoeren", text: "De werkzaamheden worden zorgvuldig en professioneel uitgevoerd.", icon: "wrench"},
    {title: "Testen", text: "Waar nodig controleren we met proefrit, data en foutcodecheck.", icon: "check"},
    {title: "Klaar & rijden", text: "Je krijgt duidelijke uitleg, advies en nazorg waar passend.", icon: "spark"}
  ],
  en: [
    {title: "Book", text: "Send your vehicle and question via WhatsApp or form.", icon: "calendar"},
    {title: "Intake", text: "We discuss your goals and check the technical baseline.", icon: "scan"},
    {title: "Custom setup", text: "Software or advice is matched to the vehicle.", icon: "cpu"},
    {title: "Work", text: "The work is carried out carefully and professionally.", icon: "wrench"},
    {title: "Test", text: "We verify with road test, data or fault code checks where needed.", icon: "check"},
    {title: "Drive", text: "You receive clear explanation and aftercare advice.", icon: "spark"}
  ],
  pl: [
    {title: "Termin", text: "Wyślij dane auta i pytanie przez WhatsApp lub formularz.", icon: "calendar"},
    {title: "Intake", text: "Ustalamy cel i sprawdzamy bazę techniczną.", icon: "scan"},
    {title: "Dobór", text: "Oprogramowanie lub doradztwo dopasowujemy do auta.", icon: "cpu"},
    {title: "Praca", text: "Wykonujemy usługę dokładnie i profesjonalnie.", icon: "wrench"},
    {title: "Test", text: "W razie potrzeby sprawdzamy jazdą, danymi i błędami.", icon: "check"},
    {title: "Odbiór", text: "Dostajesz wyjaśnienie i zalecenia po usłudze.", icon: "spark"}
  ]
};

export const whyItems: Record<Locale, Array<{title: string; text: string; icon: IconName}>> = {
  nl: [
    {title: "Expertise", text: "Jarenlange ervaring met chiptuning, ECU diagnose en software.", icon: "gauge"},
    {title: "Maatwerk", text: "Elke auto is anders. Wij stemmen de aanpak af op voertuig en doel.", icon: "cpu"},
    {title: "Kwaliteit", text: "Geen loze claims, maar controle, uitleg en betrouwbare marges.", icon: "shield"},
    {title: "Klantgericht", text: "Persoonlijk advies, duidelijke communicatie en snelle reactie.", icon: "users"},
    {title: "Resultaat", text: "Merkbare verbetering in vermogen, koppel en rijplezier.", icon: "chart"}
  ],
  en: [
    {title: "Expertise", text: "Experience with chiptuning, ECU diagnostics and software.", icon: "gauge"},
    {title: "Custom work", text: "Every vehicle receives a matched approach.", icon: "cpu"},
    {title: "Quality", text: "Clear checks, realistic margins and honest claims.", icon: "shield"},
    {title: "Personal", text: "Direct advice and fast communication.", icon: "users"},
    {title: "Result", text: "Noticeable improvement in power, torque and drivability.", icon: "chart"}
  ],
  pl: [
    {title: "Doświadczenie", text: "Praktyka w chiptuningu, diagnostyce ECU i oprogramowaniu.", icon: "gauge"},
    {title: "Indywidualnie", text: "Każde auto wymaga dopasowanego podejścia.", icon: "cpu"},
    {title: "Jakość", text: "Realne marginesy, kontrola i uczciwe informacje.", icon: "shield"},
    {title: "Kontakt", text: "Bezpośrednie doradztwo i szybka komunikacja.", icon: "users"},
    {title: "Wynik", text: "Odczuwalna poprawa mocy, momentu i jazdy.", icon: "chart"}
  ]
};

export const pricingPlans: Record<Locale, PricingPlan[]> = {
  nl: [
    {name: "Diagnose", price: "€89,-", note: "vanaf", text: "Volledige diagnose van motor en systemen.", features: ["Foutcodes", "Basiscontrole", "Advies"]},
    {name: "Stage 1", price: "€649,-", note: "vanaf", text: "Meer vermogen en koppel op standaard hardware.", features: ["ECU remap", "Originele file backup", "Controle"], highlighted: true},
    {name: "Stage 2", price: "€849,-", note: "vanaf", text: "Voor auto's met passende hardware en extra controle.", features: ["Uitgebreide software", "Logadvies", "Veiligheidsmarges"]},
    {name: "Loganalyse", price: "€149,-", note: "vanaf", text: "Analyse van motorwaarden, prestaties en storingen.", features: ["Data analyse", "Rapport", "Advies"]},
    {name: "Mobiele service", price: "€129,-", note: "vanaf", text: "Service op locatie waar technisch mogelijk.", features: ["Op afspraak", "Assen regio", "Vooraf afgestemd"]},
    {name: "EGR / DPF / AdBlue", price: "op aanvraag", note: "", text: "Diagnose, storing analyse en oplossingen waar wettelijk toegestaan.", features: ["Storing analyse", "Advies", "Maatwerk"]}
  ],
  en: [
    {name: "Diagnostics", price: "€89,-", note: "from", text: "Full diagnosis of engine and related systems.", features: ["Fault codes", "Basic checks", "Advice"]},
    {name: "Stage 1", price: "€649,-", note: "from", text: "More power and torque on standard hardware.", features: ["ECU remap", "Original file backup", "Checks"], highlighted: true},
    {name: "Stage 2", price: "€849,-", note: "from", text: "For cars with supporting hardware and extra control.", features: ["Extended software", "Log advice", "Margins"]},
    {name: "Log analysis", price: "€149,-", note: "from", text: "Review of engine data, performance and faults.", features: ["Data", "Report", "Advice"]},
    {name: "Mobile service", price: "€129,-", note: "from", text: "Service on location where technically possible.", features: ["Appointment", "Assen region", "Planned"]},
    {name: "EGR / DPF / AdBlue", price: "on request", note: "", text: "Diagnostics and legal solutions where permitted.", features: ["Fault analysis", "Advice", "Custom"]}
  ],
  pl: [
    {name: "Diagnostyka", price: "€89,-", note: "od", text: "Pełna diagnostyka silnika i powiązanych systemów.", features: ["Kody błędów", "Kontrola", "Doradztwo"]},
    {name: "Stage 1", price: "€649,-", note: "od", text: "Więcej mocy i momentu na seryjnym osprzęcie.", features: ["Remap ECU", "Kopia oryginału", "Kontrola"], highlighted: true},
    {name: "Stage 2", price: "€849,-", note: "od", text: "Dla aut z odpowiednim osprzętem i dodatkową kontrolą.", features: ["Oprogramowanie", "Logi", "Marginesy"]},
    {name: "Analiza logów", price: "€149,-", note: "od", text: "Analiza danych silnika, osiągów i usterek.", features: ["Dane", "Raport", "Porada"]},
    {name: "Serwis mobilny", price: "€129,-", note: "od", text: "Usługa na miejscu, jeżeli technicznie możliwa.", features: ["Termin", "Region Assen", "Uzgodnienie"]},
    {name: "EGR / DPF / AdBlue", price: "na zapytanie", note: "", text: "Diagnostyka i rozwiązania zgodne z przepisami tam, gdzie są dozwolone.", features: ["Analiza", "Porada", "Indywidualnie"]}
  ]
};

export const results: Record<Locale, ResultCard[]> = {
  nl: [
    {car: "BMW 330d", stage: "Stage 1", stock: "265 pk / 580 Nm", tuned: "320 pk / 680 Nm", gain: "+55 pk", text: "Sterke diesel met brede koppelopbouw, ideaal voor dagelijks rijden en snelwegkilometers."},
    {car: "Audi A4 2.0 TDI", stage: "Stage 1", stock: "190 pk / 400 Nm", tuned: "225 pk / 470 Nm", gain: "+35 pk", text: "Meer trekkracht in het middengebied met behoud van rustige, comfortabele rijeigenschappen."},
    {car: "Volkswagen Golf GTI", stage: "Stage 1", stock: "245 pk / 370 Nm", tuned: "305 pk / 450 Nm", gain: "+60 pk", text: "Snellere respons en duidelijk meer punch zonder harde of nerveuze vermogensafgifte."},
    {car: "Mercedes C 220d", stage: "Stage 1", stock: "194 pk / 400 Nm", tuned: "230 pk / 500 Nm", gain: "+36 pk", text: "Comfortabel meer koppel voor inhalen, belading en soepel rijden op lage toeren."}
  ],
  en: [
    {car: "BMW 330d", stage: "Stage 1", stock: "265 hp / 580 Nm", tuned: "320 hp / 680 Nm", gain: "+55 hp", text: "Strong diesel tuning with broad torque for daily driving."},
    {car: "Audi A4 2.0 TDI", stage: "Stage 1", stock: "190 hp / 400 Nm", tuned: "225 hp / 470 Nm", gain: "+35 hp", text: "More midrange torque with a calm factory-like feel."},
    {car: "Volkswagen Golf GTI", stage: "Stage 1", stock: "245 hp / 370 Nm", tuned: "305 hp / 450 Nm", gain: "+60 hp", text: "Sharper response and extra punch without nervous delivery."},
    {car: "Mercedes C 220d", stage: "Stage 1", stock: "194 hp / 400 Nm", tuned: "230 hp / 500 Nm", gain: "+36 hp", text: "Comfortable extra torque for overtaking and daily use."}
  ],
  pl: [
    {car: "BMW 330d", stage: "Stage 1", stock: "265 KM / 580 Nm", tuned: "320 KM / 680 Nm", gain: "+55 KM", text: "Mocny diesel z szerokim momentem do jazdy codziennej."},
    {car: "Audi A4 2.0 TDI", stage: "Stage 1", stock: "190 KM / 400 Nm", tuned: "225 KM / 470 Nm", gain: "+35 KM", text: "Więcej momentu w średnim zakresie i spokojny, fabryczny charakter."},
    {car: "Volkswagen Golf GTI", stage: "Stage 1", stock: "245 KM / 370 Nm", tuned: "305 KM / 450 Nm", gain: "+60 KM", text: "Lepsza reakcja i mocniejsze przyspieszenie bez nerwowości."},
    {car: "Mercedes C 220d", stage: "Stage 1", stock: "194 KM / 400 Nm", tuned: "230 KM / 500 Nm", gain: "+36 KM", text: "Więcej momentu do wyprzedzania i codziennej jazdy."}
  ]
};

export const posts: Record<Locale, BlogPost[]> = {
  nl: [
    {slug: "wat-is-chiptuning", title: "Wat is chiptuning?", excerpt: "Een heldere uitleg over ECU remap, koppel, vermogen en waarom maatwerk belangrijk is.", category: "Chiptuning", readTime: "5 min"},
    {slug: "stage-1-vs-stage-2", title: "Stage 1 vs Stage 2: wat is het verschil?", excerpt: "Wanneer is Stage 1 voldoende en wanneer vraagt Stage 2 om hardware en extra controle?", category: "Techniek", readTime: "6 min"},
    {slug: "is-ecu-remap-veilig", title: "Is ECU remap veilig voor mijn motor?", excerpt: "Veiligheid hangt af van marges, onderhoud, diagnose en de manier waarop software wordt aangepast.", category: "Advies", readTime: "7 min"},
    {slug: "adblue-storing-uitgelegd", title: "AdBlue storing uitgelegd", excerpt: "Wat betekent een AdBlue storing, welke diagnose is nodig en welke oplossingen zijn wettelijk mogelijk?", category: "Diagnose", readTime: "4 min"},
    {slug: "tips-na-tuning", title: "5 tips na een tuning", excerpt: "Praktische tips over warmrijden, onderhoud, brandstofkwaliteit en wanneer je opnieuw moet laten controleren.", category: "Nazorg", readTime: "5 min"},
    {slug: "diagnose-voor-tuning", title: "Waarom diagnose voor tuning belangrijk is", excerpt: "Een goede tuning begint met weten of de motor, sensoren en transmissie gezond zijn.", category: "Diagnose", readTime: "6 min"}
  ],
  en: [
    {slug: "what-is-chiptuning", title: "What is chiptuning?", excerpt: "A clear explanation of ECU remap, torque, power and custom software.", category: "Chiptuning", readTime: "5 min"},
    {slug: "stage-1-vs-stage-2", title: "Stage 1 vs Stage 2", excerpt: "When Stage 1 is enough and when Stage 2 needs hardware and extra checks.", category: "Technical", readTime: "6 min"},
    {slug: "is-ecu-remap-safe", title: "Is ECU remap safe?", excerpt: "Safety depends on margins, maintenance, diagnosis and how software is calibrated.", category: "Advice", readTime: "7 min"},
    {slug: "adblue-fault-explained", title: "AdBlue fault explained", excerpt: "What an AdBlue fault means and which legal diagnostic steps are possible.", category: "Diagnostics", readTime: "4 min"},
    {slug: "tips-after-tuning", title: "5 tips after tuning", excerpt: "Warm-up, maintenance, fuel quality and when to schedule checks.", category: "Aftercare", readTime: "5 min"},
    {slug: "diagnostics-before-tuning", title: "Why diagnose before tuning", excerpt: "Good tuning starts with knowing the engine and transmission are healthy.", category: "Diagnostics", readTime: "6 min"}
  ],
  pl: [
    {slug: "czym-jest-chiptuning", title: "Czym jest chiptuning?", excerpt: "Proste wyjaśnienie remapu ECU, mocy, momentu i indywidualnego oprogramowania.", category: "Chiptuning", readTime: "5 min"},
    {slug: "stage-1-vs-stage-2", title: "Stage 1 vs Stage 2", excerpt: "Kiedy wystarczy Stage 1, a kiedy Stage 2 wymaga osprzętu i dodatkowej kontroli.", category: "Technika", readTime: "6 min"},
    {slug: "czy-remap-ecu-jest-bezpieczny", title: "Czy remap ECU jest bezpieczny?", excerpt: "Bezpieczeństwo zależy od marginesów, stanu auta, diagnostyki i sposobu kalibracji.", category: "Porady", readTime: "7 min"},
    {slug: "adblue-wyjasnienie-usterki", title: "AdBlue - wyjaśnienie usterki", excerpt: "Co oznacza błąd AdBlue i jakie kroki diagnostyczne są możliwe zgodnie z przepisami?", category: "Diagnostyka", readTime: "4 min"},
    {slug: "porady-po-tuningu", title: "5 porad po tuningu", excerpt: "Rozgrzewanie, serwis, jakość paliwa i kontrola po modyfikacji.", category: "Po usłudze", readTime: "5 min"},
    {slug: "diagnostyka-przed-tuningiem", title: "Dlaczego diagnostyka przed tuningiem?", excerpt: "Dobry tuning zaczyna się od zdrowego silnika, osprzętu i skrzyni.", category: "Diagnostyka", readTime: "6 min"}
  ]
};

export const faqs: Record<Locale, FaqItem[]> = {
  nl: [
    {question: "Is chiptuning schadelijk voor mijn auto?", answer: "Niet wanneer de software zorgvuldig wordt afgestemd en de auto technisch gezond is. Daarom letten we op onderhoudsstaat, foutcodes, live data, turbodruk, temperaturen en transmissielimieten. Extreme claims vermijden we bewust."},
    {question: "Wat is het verschil tussen Stage 1 tuning en Stage 2 tuning?", answer: "Stage 1 tuning is bedoeld voor een standaard auto en richt zich op veilige optimalisatie van de ECU. Stage 2 tuning vraagt meestal om ondersteunende hardware en extra controle, bijvoorbeeld op luchttoevoer, uitlaat, temperaturen en koppellimieten."},
    {question: "Kunnen jullie helpen bij DPF storing, EGR storing of AdBlue storing?", answer: "Ja, we kunnen diagnose, storing analyse en advies op maat uitvoeren. Softwarematige oplossingen worden alleen besproken waar dat technisch passend en wettelijk toegestaan is. De juiste aanpak hangt af van voertuig, gebruik en lokale regelgeving."},
    {question: "Hoe lang duurt een afspraak?", answer: "Een diagnose kan vaak binnen een uur duidelijkheid geven. Chiptuning duurt meestal enkele uren, afhankelijk van ECU type, leesmethode, controle en eventuele loganalyse."},
    {question: "Moet ik eerst de catalogus gebruiken?", answer: "Dat hoeft niet, maar het helpt. Via de power catalogus kun je snel een indicatie zien. Voor definitief advies controleren we altijd de exacte motorvariant en technische situatie."}
  ],
  en: [
    {question: "Is chiptuning harmful?", answer: "Not when software is calibrated carefully and the car is healthy. We check the technical baseline and avoid extreme claims."},
    {question: "What is Stage 1 vs Stage 2?", answer: "Stage 1 is for standard hardware. Stage 2 usually requires supporting hardware and extra checks."},
    {question: "Can you help with DPF, EGR or AdBlue faults?", answer: "Yes, through diagnostics and advice. Software support is only discussed where technically suitable and legally permitted."},
    {question: "How long does it take?", answer: "Diagnostics can often give clarity within an hour. Tuning usually takes several hours depending on the ECU and checks."},
    {question: "Should I use the catalog first?", answer: "It helps for an indication, but final advice always depends on the exact vehicle."}
  ],
  pl: [
    {question: "Czy chiptuning szkodzi autu?", answer: "Nie, jeżeli oprogramowanie jest przygotowane rozsądnie, a auto jest technicznie sprawne. Sprawdzamy bazę, unikamy skrajnych obietnic i dobieramy marginesy do konkretnego pojazdu."},
    {question: "Czym różni się Stage 1 od Stage 2?", answer: "Stage 1 jest dla seryjnego auta. Stage 2 zwykle wymaga odpowiedniego osprzętu, analizy logów i dodatkowej kontroli temperatur, doładowania oraz limitów skrzyni."},
    {question: "Czy pomagacie przy DPF, EGR lub AdBlue?", answer: "Tak, przez diagnostykę, analizę usterek i doradztwo. Rozwiązania omawiamy tylko tam, gdzie są technicznie uzasadnione i zgodne z przepisami."},
    {question: "Ile trwa wizyta?", answer: "Diagnostyka często daje odpowiedź w ciągu godziny. Tuning zwykle trwa kilka godzin, zależnie od ECU, metody odczytu i zakresu kontroli."},
    {question: "Czy najpierw użyć katalogu?", answer: "Katalog daje dobrą wskazówkę, ale finalna wycena i rekomendacja zależą od konkretnego auta."}
  ]
};

export const pageSections: Record<PageKey, Record<Locale, TextBlock[]>> = {
  home: {nl: [], en: [], pl: []},
  chiptuning: {
    nl: [
      {
        kicker: "ECU remap Assen",
        title: "Chiptuning draait om balans, niet alleen om piekvermogen.",
        text:
          "Bij chiptuning wordt de software in de motorcomputer aangepast zodat de motor efficienter en krachtiger reageert. Denk aan turbodruk, inspuiting, koppelbegrenzers, gaspedaalrespons en veiligheidsmarges. Een goede ECU remap in Assen begint daarom met de vraag: wat kan deze motor verantwoord leveren, in deze auto, met deze transmissie en dit gebruik?",
        bullets: ["Meer vermogen en koppel", "Betere gaspedaalrespons", "Soepeler rijgedrag", "Vaak prettiger verbruik bij rustig rijden"],
        image: "/images/sections/autotuner-ecu-hands.jpeg"
      },
      {
        kicker: "Stage 1 tuning",
        title: "Voor standaard auto's die meer souplesse en trekkracht mogen krijgen.",
        text:
          "Stage 1 tuning is de meest gekozen vorm van chiptuning Drenthe. De auto blijft technisch standaard, terwijl de software binnen veilige marges wordt geoptimaliseerd. Dit is populair bij BMW chiptuning, Audi chiptuning, Volkswagen chiptuning en Mercedes chiptuning omdat moderne turbo benzine- en dieselmotoren vaak veel reserve hebben.",
        bullets: ["Geen hardware verplicht", "Originele software veiligstellen", "Afstemming op motor en brandstof", "Duidelijke uitleg van resultaat en risico's"]
      },
      {
        kicker: "Stage 2 tuning",
        title: "Voor voertuigen met ondersteunende hardware en extra controle.",
        text:
          "Stage 2 tuning gaat verder dan een standaard ECU remap. Denk aan betere luchttoevoer, downpipe of andere ondersteunende componenten, afhankelijk van voertuig en wetgeving. Omdat de marges kleiner worden, is loganalyse belangrijker. NoordTune.nl kijkt naar turbodruk, luchtmassa, injectie, temperaturen en transmissielimieten voordat we een passend advies geven."
      }
    ],
    en: [
      {kicker: "ECU remap", title: "Chiptuning is about balance, not just peak numbers.", text: "We adjust engine software around boost, injection, torque limits, throttle response and safety margins.", bullets: ["More power", "More torque", "Better response", "Factory-like feel"], image: "/images/sections/autotuner-ecu-hands.jpeg"},
      {kicker: "Stage 1", title: "For standard cars that should feel stronger.", text: "Stage 1 tuning keeps the car on standard hardware and optimizes software within realistic margins."},
      {kicker: "Stage 2", title: "For vehicles with supporting hardware.", text: "Stage 2 requires more checks, especially logs, temperatures, airflow and gearbox limits."}
    ],
    pl: [
      {kicker: "Remap ECU", title: "Chiptuning to balans, nie tylko maksymalna liczba.", text: "Zmieniamy oprogramowanie silnika z uwagą na doładowanie, wtrysk, limity momentu, reakcję gazu i marginesy bezpieczeństwa. Dobra kalibracja ma dawać więcej przyjemności z jazdy, ale nadal pasować do auta i sposobu użytkowania.", bullets: ["Więcej mocy", "Więcej momentu", "Lepsza reakcja", "Fabryczny charakter"], image: "/images/sections/autotuner-ecu-hands.jpeg"},
      {kicker: "Stage 1", title: "Dla seryjnych aut, które mają jechać mocniej.", text: "Stage 1 zachowuje seryjny osprzęt i optymalizuje oprogramowanie w rozsądnych marginesach. To najczęstszy wybór, gdy auto jest technicznie zdrowe i ma dostać więcej elastyczności bez zmian mechanicznych."},
      {kicker: "Stage 2", title: "Dla aut z odpowiednim osprzętem.", text: "Stage 2 wymaga więcej kontroli, szczególnie logów, temperatur, przepływu powietrza, doładowania i limitów skrzyni. Nie każde auto potrzebuje Stage 2; czasem Stage 1 daje lepszą równowagę na co dzień."}
    ]
  },
  diagnose: {
    nl: [
      {
        kicker: "Auto diagnose Assen",
        title: "Een foutcode is een aanwijzing, geen eindconclusie.",
        text:
          "Veel storingen worden te snel opgelost door onderdelen te vervangen. NoordTune.nl begint met uitlezen, live data, freeze frames en context: wanneer treedt de storing op, onder welke belasting en welke waardes wijken af? Zo wordt auto diagnose Assen een gerichte technische analyse in plaats van gokken.",
        bullets: ["Foutcodes uitlezen en interpreteren", "Live data vergelijken", "Sensorwaarden en drukwaarden controleren", "Advies voor reparatie of softwarematige vervolgstap"],
        image: "/images/sections/obd-connector.jpg"
      },
      {
        kicker: "DPF / EGR / AdBlue",
        title: "Storing analyse met aandacht voor techniek en regelgeving.",
        text:
          "Bij een DPF storing, EGR storing of AdBlue storing is de oorzaak vaak een combinatie van sensoren, gebruik, vervuiling, softwarestatus en onderhoud. Wij geven diagnose, storing analyse en advies op maat. Software-oplossingen worden alleen besproken waar wettelijk toegestaan, technisch verantwoord en passend bij voertuig en gebruik."
      },
      {
        kicker: "Loganalyse",
        title: "Data maakt zichtbaar wat je tijdens het rijden voelt.",
        text:
          "Bij loganalyse kijken we naar meetwaarden onder belasting. Denk aan turbodruk, luchtmassa, brandstofdruk, lambda, ontsteking, injectiecorrecties, roetbelasting en transmissiegedrag. Dit is waardevol bij prestatieverlies, noodloop, tuningvoorbereiding en controle na tuning."
      }
    ],
    en: [
      {kicker: "Diagnostics", title: "A fault code is a clue, not the full answer.", text: "We combine codes, live data and context to avoid replacing parts blindly.", bullets: ["Fault codes", "Live data", "Sensor checks", "Repair advice"], image: "/images/sections/obd-connector.jpg"},
      {kicker: "DPF / EGR / AdBlue", title: "Fault analysis with technical and legal care.", text: "We provide diagnostics and advice. Software solutions are only discussed where legally permitted."},
      {kicker: "Log analysis", title: "Data shows what you feel while driving.", text: "Logs help analyze boost, airflow, fuel pressure, lambda, correction values and gearbox behavior."}
    ],
    pl: [
      {kicker: "Diagnostyka", title: "Kod błędu to wskazówka, nie cała odpowiedź.", text: "Łączymy kody błędów, live data, freeze frame i kontekst usterki, aby uniknąć wymiany części na ślepo. Dzięki temu łatwiej odróżnić objaw od realnej przyczyny.", bullets: ["Kody błędów", "Live data", "Sensory", "Porada"], image: "/images/sections/obd-connector.jpg"},
      {kicker: "DPF / EGR / AdBlue", title: "Analiza usterek z uwagą na technikę i przepisy.", text: "Wykonujemy diagnostykę, analizę usterek i doradztwo. Rozwiązania programowe omawiamy wyłącznie wtedy, gdy są technicznie uzasadnione i zgodne z obowiązującymi przepisami."},
      {kicker: "Logi", title: "Dane pokazują to, co czujesz podczas jazdy.", text: "Logi pomagają sprawdzić doładowanie, przepływ powietrza, ciśnienie paliwa, lambda, korekty wtrysku i pracę skrzyni pod obciążeniem."}
    ]
  },
  diensten: {nl: [], en: [], pl: []},
  prijzen: {
    nl: [
      {
        kicker: "Waarom vanaf-prijzen?",
        title: "De juiste prijs hangt af van ECU, motor, methode en controle.",
        text:
          "Een eerlijke offerte begint met technische informatie. Sommige auto's kunnen via OBD worden gelezen, andere vragen bench of boot. Bij Stage 2 tuning, DSG tuning, TCU tuning of emissiesysteem storingen kan extra diagnose of loganalyse nodig zijn. Daarom zijn onze prijzen helder als startpunt, maar blijft definitieve prijs afhankelijk van voertuig en opdracht."
      }
    ],
    en: [{title: "Why starting prices?", text: "The final price depends on the ECU, engine, access method, checks and requested work."}],
    pl: [{title: "Dlaczego ceny są orientacyjne?", text: "Cena zależy od ECU, silnika, metody odczytu, zakresu kontroli i rodzaju pracy. Niektóre auta można obsłużyć przez OBD, inne wymagają bench lub boot. Przy Stage 2, DSG / TCU albo usterkach DPF, EGR i AdBlue potrzebna może być dodatkowa diagnostyka lub analiza logów."}]
  },
  resultaten: {
    nl: [
      {
        kicker: "Realistische resultaten",
        title: "Vermogenswinst is afhankelijk van auto, staat en softwareversie.",
        text:
          "De voorbeelden op deze pagina zijn indicatief. Een BMW 330d Stage 1, Audi A4 2.0 TDI Stage 1, Volkswagen Golf GTI Stage 1 of Mercedes C 220d Stage 1 kan per bouwjaar, ECU, transmissie en onderhoudsstaat verschillen. Daarom gebruiken we de catalogus als indicatie en geven we definitief advies op basis van jouw auto."
      }
    ],
    en: [{title: "Realistic results", text: "Power gains depend on vehicle, condition, ECU, gearbox and software version."}],
    pl: [{title: "Realne wyniki", text: "Przyrost zależy od auta, stanu technicznego, ECU, skrzyni, wersji oprogramowania i osprzętu. Przykłady pokazują orientacyjny potencjał, ale ostateczne doradztwo zawsze opieramy na konkretnym pojeździe."}]
  },
  blog: {
    nl: [
      {
        kicker: "Kennisbank",
        title: "Beter begrijpen betekent betere keuzes maken.",
        text:
          "Chiptuning, ECU remap en moderne auto diagnose zitten vol vaktermen. In onze blog leggen we uit wat belangrijk is, waar je op moet letten en welke vragen je vooraf moet stellen. Zo weet je beter wat Stage 1 tuning, Stage 2 tuning, loganalyse, DSG tuning of een AdBlue storing inhoudt."
      }
    ],
    en: [{title: "Knowledge base", text: "Clear explanations help you make better tuning and diagnostic decisions."}],
    pl: [{title: "Baza wiedzy", text: "Proste wyjaśnienia pomagają lepiej zdecydować o tuningu, diagnostyce i kolejnych krokach. Piszemy o Stage 1, Stage 2, remapie ECU, AdBlue, logach oraz tym, dlaczego zdrowa baza techniczna jest ważniejsza niż obietnica najwyższego wyniku."}]
  },
  over: {
    nl: [
      {
        kicker: "Wie wij zijn",
        title: "NoordTune.nl is gebouwd rond techniek, niet rond snelle verkooppraat.",
        text:
          "Wij houden van auto's die goed rijden: krachtig wanneer je het vraagt, rustig wanneer je normaal rijdt en betrouwbaar wanneer je erop moet rekenen. Vanuit Assen helpen we klanten in Drenthe, Groningen en Noord-Nederland met chiptuning, auto diagnose en softwareadvies. Onze aanpak is persoonlijk, nuchter en technisch onderbouwd.",
        bullets: ["Persoonlijke intake", "Duidelijke uitleg", "Zorgvuldige diagnose", "Software op maat"]
      },
      {
        kicker: "Onze missie",
        title: "Meer rijplezier zonder blind risico.",
        text:
          "Het doel is niet het hoogste getal op papier, maar een auto die beter voelt en verantwoord blijft. Daarom combineren we tuning met diagnose, logging en eerlijk advies. Soms betekent dat tunen. Soms betekent dat eerst een storing oplossen. Die eerlijkheid is precies waarom klanten voor NoordTune.nl kiezen."
      }
    ],
    en: [{title: "Technical, personal and realistic.", text: "NoordTune.nl is built around careful diagnostics, honest advice and custom software rather than empty claims."}],
    pl: [{title: "Technicznie, osobiście i realistycznie.", text: "NoordTune.nl opiera się na diagnostyce, uczciwym doradztwie i indywidualnym oprogramowaniu. Czasem najlepszym krokiem jest tuning, a czasem najpierw naprawa usterki lub sprawdzenie logów."}]
  },
  contact: {
    nl: [
      {
        kicker: "Servicegebied",
        title: "Chiptuning en auto diagnose voor Assen, Drenthe en Groningen.",
        text:
          "NoordTune.nl werkt vanuit Assen en helpt klanten uit onder andere Assen, Beilen, Hoogeveen, Emmen, Groningen, Veendam, Stadskanaal, Drachten en de rest van Noord-Nederland. Stuur je kenteken, motorcode, foutcode of gewenste dienst via WhatsApp voor een snelle eerste inschatting.",
        bullets: ["WhatsApp: +31 685 759 600", "Assen, Netherlands", "Afspraak op maat", "Mobiele service waar mogelijk"]
      }
    ],
    en: [{title: "Assen and the northern Netherlands.", text: "Send your plate, engine code, fault code or requested service via WhatsApp for a first indication."}],
    pl: [{title: "Assen i północna Holandia.", text: "Wyślij numer auta, kod silnika, błąd lub wybraną usługę przez WhatsApp, a podamy pierwszą wskazówkę. Obsługujemy klientów z Assen, Drenthe, Groningen i okolic."}]
  },
  appointment: {
    nl: [
      {
        kicker: "Binnenkort beschikbaar",
        title: "Een booking-flow met servicekeuze, voertuiggegevens en beschikbaarheid.",
        text:
          "Het toekomstige afsprakensysteem krijgt een duidelijke selectie voor chiptuning, auto diagnose, loganalyse en advies. Voor nu werkt persoonlijk contact sneller: stuur je kenteken, motorvariant of foutcode via WhatsApp en we plannen samen de juiste vervolgstap.",
        bullets: [
          "Voorlopig plannen via WhatsApp",
          "Power Catalog gebruiken voor een eerste indicatie",
          "Servicekeuze en voertuigdetails worden later toegevoegd",
          "Geen online betaling of kalenderkoppeling in deze eerste versie"
        ],
        image: "/images/sections/tuning-laptop-b2.webp"
      }
    ],
    en: [
      {
        kicker: "Coming soon",
        title: "A booking flow with service selection, vehicle details and availability.",
        text:
          "The future appointment system will include service choice, vehicle details and available time slots. For now, WhatsApp is the fastest way to plan the right next step.",
        bullets: ["Plan via WhatsApp for now", "Use the Power Catalog first", "Service choice will be added later"],
        image: "/images/sections/tuning-laptop-b2.webp"
      }
    ],
    pl: [
      {
        kicker: "W przygotowaniu",
        title: "Rezerwacja z wyborem usługi, danymi auta i dostępnością.",
        text:
          "Przyszły system terminów będzie zawierał wybór usługi, dane pojazdu i dostępne godziny. Na razie najszybszą drogą pozostaje kontakt przez WhatsApp.",
        bullets: ["Na razie WhatsApp", "Najpierw sprawdź katalog mocy", "Wybór usługi będzie dodany później"],
        image: "/images/sections/tuning-laptop-b2.webp"
      }
    ]
  },
  privacy: {
    nl: [
      {title: "Welke gegevens wij verwerken", text: "Wanneer je contact opneemt, kunnen wij je naam, telefoonnummer, e-mailadres, kenteken, voertuiggegevens en bericht verwerken om je aanvraag te beantwoorden."},
      {title: "Waarom wij gegevens gebruiken", text: "Wij gebruiken gegevens voor contact, planning, offertes, uitvoering van diensten, wettelijke administratie en verbetering van onze website."},
      {title: "Bewaren en delen", text: "Wij bewaren gegevens niet langer dan nodig en delen ze niet met derden voor verkoopdoeleinden. Technische dienstverleners kunnen gegevens verwerken wanneer dat nodig is voor website, hosting of communicatie."}
    ],
    en: [
      {title: "Data we process", text: "When you contact NoordTune.nl, we may process your name, phone number, email address, license plate, vehicle details and message so we can answer your request properly."},
      {title: "Why we use data", text: "We use this information for communication, planning, quotations, service preparation, administration and improving the website experience."},
      {title: "Storage and sharing", text: "We do not keep data longer than necessary and we do not sell personal data. Technical service providers may process data only where needed for hosting, website operation or communication."},
      {title: "Your rights", text: "You may ask us to view, correct or delete your personal data where legally possible. Contact us if you have a question about privacy or a previous request."}
    ],
    pl: [
      {title: "Jakie dane przetwarzamy", text: "Gdy kontaktujesz się z NoordTune.nl, możemy przetwarzać imię, numer telefonu, adres e-mail, numer rejestracyjny, dane pojazdu oraz treść wiadomości."},
      {title: "Po co używamy danych", text: "Dane służą do kontaktu, planowania wizyty, przygotowania wyceny, wykonania usługi, administracji i poprawy działania strony."},
      {title: "Przechowywanie i udostępnianie", text: "Nie przechowujemy danych dłużej, niż jest to potrzebne, i nie sprzedajemy danych osobowych. Dostawcy techniczni mogą przetwarzać dane tylko wtedy, gdy jest to potrzebne do hostingu, strony lub komunikacji."},
      {title: "Twoje prawa", text: "Możesz poprosić o wgląd, poprawienie lub usunięcie danych, jeśli pozwalają na to przepisy. W sprawach prywatności skontaktuj się z NoordTune.nl."}
    ]
  },
  terms: {
    nl: [
      {title: "Afspraken en offertes", text: "Offertes zijn indicatief totdat voertuiggegevens, technische staat en gewenste werkzaamheden zijn gecontroleerd. Afspraken worden in overleg gepland."},
      {title: "Diagnose en resultaten", text: "Diagnose en tuningresultaten zijn afhankelijk van voertuig, onderhoudsstaat, softwareversie, hardware, brandstofkwaliteit en gebruik. Vermogenswaarden zijn indicatief tenzij specifiek gemeten."},
      {title: "Wettelijke context", text: "Werkzaamheden aan emissiegerelateerde systemen worden alleen besproken en uitgevoerd waar technisch verantwoord en wettelijk toegestaan. De klant blijft verantwoordelijk voor gebruik van het voertuig volgens lokale regelgeving."}
    ],
    en: [
      {title: "Appointments and quotes", text: "Quotes remain indicative until vehicle details, technical condition and requested work have been checked. Appointments are planned in consultation and may depend on parts, access method or required diagnostics."},
      {title: "Diagnostics and results", text: "Diagnostic conclusions and tuning results depend on the vehicle, condition, software version, hardware, fuel quality and use. Power figures are indicative unless specifically measured."},
      {title: "Legal context", text: "Work related to emissions systems is discussed and performed only where technically responsible and legally permitted. The customer remains responsible for using the vehicle according to local regulations."},
      {title: "Customer responsibility", text: "The customer must provide accurate vehicle information, report known faults and follow aftercare or maintenance advice where relevant."}
    ],
    pl: [
      {title: "Terminy i wyceny", text: "Wyceny są orientacyjne do czasu sprawdzenia danych auta, stanu technicznego i zakresu prac. Terminy ustalamy indywidualnie, zależnie od usługi i potrzebnej diagnostyki."},
      {title: "Diagnostyka i wyniki", text: "Wnioski z diagnostyki oraz wyniki tuningu zależą od auta, stanu technicznego, wersji oprogramowania, osprzętu, paliwa i sposobu użytkowania. Wartości mocy są orientacyjne, jeśli nie zostały osobno zmierzone."},
      {title: "Kontekst prawny", text: "Prace dotyczące systemów emisji omawiamy i wykonujemy tylko tam, gdzie jest to technicznie uzasadnione i zgodne z przepisami. Klient odpowiada za użytkowanie pojazdu zgodnie z lokalnym prawem."},
      {title: "Odpowiedzialność klienta", text: "Klient powinien przekazać prawidłowe dane pojazdu, zgłosić znane usterki i stosować się do zaleceń dotyczących dalszego użytkowania lub serwisu."}
    ]
  }
};
