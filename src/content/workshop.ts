import type {Locale} from "@/content/site";
import type {IconName} from "@/content/copy";

export const workshopEquipment = [
  "Magicmotorsport FLEX",
  "AutoTuner",
  "HEXPROG II",
  "FormulaFlash",
  "Alientech KESS3",
  "KT200",
  "PCMFlash"
] as const;

export const workshopCopy = {
  nl: {
    kicker: "Onze apparatuur",
    title: "Professionele apparatuur. Voertuigspecifieke aanpak.",
    description: "Bij NoordTune werken we met professionele ECU- en TCU-programmeertools en diagnoseapparatuur. Afhankelijk van het voertuig, de regelunit en de softwareversie kiezen we de passende methode voor uitlezen, programmeren, diagnose of softwareoptimalisatie.",
    equipment: "Wij beschikken onder andere over Magicmotorsport FLEX, AutoTuner, HEXPROG II, FormulaFlash, Alientech KESS3, KT200 en PCMFlash. Daarnaast werken we met verschillende professionele diagnose-interfaces en gespecialiseerde softwarelicenties.",
    value: "Voor jou betekent dit dat we eerst de technische situatie beoordelen en vervolgens een passende werkwijze bespreken. De mogelijkheden hangen af van jouw voertuig en regelunit.",
    servicesAbout: "Meer over onze apparatuur en werkwijze"
  },
  en: {
    kicker: "Our equipment",
    title: "Professional equipment. A vehicle-specific approach.",
    description: "At NoordTune, we use professional ECU and TCU programming tools and diagnostic equipment. We select the appropriate method for reading, programming, diagnostics or software optimisation based on the vehicle, control unit and software version.",
    equipment: "Our equipment includes Magicmotorsport FLEX, AutoTuner, HEXPROG II, FormulaFlash, Alientech KESS3, KT200 and PCMFlash. We also use a range of professional diagnostic interfaces and specialised software licences.",
    value: "For you, this means we assess the technical situation first and then discuss a suitable approach. The available options depend on your vehicle and control unit.",
    servicesAbout: "More about our equipment and approach"
  },
  pl: {
    kicker: "Nasze wyposażenie",
    title: "Profesjonalny sprzęt. Podejście dopasowane do pojazdu.",
    description: "W NoordTune korzystamy z profesjonalnych narzędzi do programowania ECU i TCU oraz sprzętu diagnostycznego. W zależności od pojazdu, sterownika i wersji oprogramowania dobieramy odpowiednią metodę odczytu, programowania, diagnostyki lub optymalizacji oprogramowania.",
    equipment: "Nasze wyposażenie obejmuje między innymi Magicmotorsport FLEX, AutoTuner, HEXPROG II, FormulaFlash, Alientech KESS3, KT200 i PCMFlash. Korzystamy również z różnych profesjonalnych interfejsów diagnostycznych i specjalistycznych licencji na oprogramowanie.",
    value: "Dla Ciebie oznacza to, że najpierw oceniamy sytuację techniczną, a następnie omawiamy odpowiednią metodę pracy. Dostępne możliwości zależą od konkretnego pojazdu i sterownika.",
    servicesAbout: "Więcej o naszym sprzęcie i sposobie pracy"
  }
} satisfies Record<Locale, {
  kicker: string;
  title: string;
  description: string;
  equipment: string;
  value: string;
  servicesAbout: string;
}>;

// These descriptions are used only on Services, keeping the homepage cards unchanged.
export const workshopServiceDescriptions: Record<Locale, Partial<Record<IconName, string>>> = {
  nl: {
    gauge: "Software afgestemd op jouw auto. Met professionele ECU-programmeerapparatuur kiezen we de uitlees- en programmeermethode voor de exacte regelunit en softwareversie.",
    scan: "Eerst diagnose: met professionele diagnose-interfaces beoordelen we foutcodes, live data en meetwaarden. Zo bespreken we de passende vervolgstap voordat we software aanpassen.",
    cpu: "Schakelgedrag en koppellimieten afgestemd op jouw transmissie. We kiezen met professionele TCU-programmeerapparatuur een passende methode voor de exacte regelunit."
  },
  en: {
    gauge: "Software tailored to your car. Using professional ECU programming equipment, we select the reading and programming method for the exact control unit and software version.",
    scan: "Diagnostics first: professional diagnostic interfaces help us assess fault codes, live data and measurements. We discuss the appropriate next step before changing software.",
    cpu: "Shift behaviour and torque limits matched to your transmission. With professional TCU programming equipment, we select a suitable method for the exact control unit."
  },
  pl: {
    gauge: "Oprogramowanie dopasowane do Twojego auta. Korzystając z profesjonalnego sprzętu do programowania ECU, dobieramy metodę odczytu i zapisu do konkretnego sterownika oraz wersji oprogramowania.",
    scan: "Najpierw diagnostyka: profesjonalne interfejsy pozwalają ocenić kody błędów, dane bieżące i wyniki pomiarów. Przed zmianą oprogramowania omawiamy odpowiedni kolejny krok.",
    cpu: "Praca skrzyni i limity momentu dopasowane do Twojej przekładni. Korzystając z profesjonalnego sprzętu do programowania TCU, dobieramy odpowiednią metodę do konkretnego sterownika."
  }
};
