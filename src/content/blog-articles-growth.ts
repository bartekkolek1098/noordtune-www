import type {BlogArticle} from "./blog-articles";
import {site} from "./site";

const growthDates = {
  publishedAt: "2026-06-16",
  updatedAt: "2026-06-16"
};

function published(article: Omit<BlogArticle, "status" | "publishedAt" | "updatedAt">): BlogArticle {
  return {
    ...article,
    status: "published",
    ...growthDates
  };
}

export const nlGrowthBlogArticles: BlogArticle[] = [
  published({
    locale: "nl",
    slug: "wat-is-ecu-remap",
    title: "Wat is ECU remap?",
    metaTitle: "Wat is ECU remap? Uitleg over software op maat | NoordTune.nl",
    metaDescription:
      "ECU remap uitgelegd: wat wordt er aangepast, wanneer is het zinvol en waarom diagnose, loganalyse en maatwerk belangrijk zijn.",
    category: "ECU remap",
    readTime: "9 min",
    heroImage: "/images/blog/ecu-remap.webp",
    intro:
      "ECU remap is het opnieuw kalibreren van de motorsoftware. Niet om zomaar alle limieten omhoog te zetten, maar om de auto sterker, soepeler en voorspelbaarder te laten reageren binnen marges die passen bij motor, transmissie en gebruik.",
    sections: [
      {
        heading: "Wat doet de ECU precies?",
        body: [
          "De ECU is de motorcomputer. Deze bepaalt onder andere hoeveel brandstof wordt ingespoten, hoeveel turbodruk wordt gevraagd, hoe het gaspedaal wordt vertaald en welk koppel de motor mag leveren. In moderne auto's werken die tabellen samen met beveiligingen voor temperatuur, rook, klopregeling, transmissielimieten en foutdetectie.",
          "Een remap verandert dus niet een enkele instelling. Het is een samenhangende softwarekalibratie. Als je alleen piekvermogen verhoogt zonder naar de rest te kijken, kan de auto onrustig, rokerig of technisch zwaarder belast worden dan nodig."
        ]
      },
      {
        heading: "Waarom maatwerk beter is dan een standaard bestand",
        body: [
          "Twee auto's met dezelfde motor kunnen anders reageren. Kilometerstand, onderhoud, brandstofkwaliteit, softwareversie, turbo, injectoren, automaat en eerdere reparaties maken verschil. Daarom gebruikt NoordTune.nl de Power Catalog als indicatie, maar blijft de definitieve afstemming voertuigspecifiek.",
          "Bij een maatwerk ECU remap kijken we naar de technische basis en het doel van de bestuurder. De ene klant wil vooral soepel koppel voor dagelijks rijden, de andere een krachtiger bovenin voor sportiever gebruik. De software moet daarbij passen."
        ],
        bullets: ["controle van foutcodes en live data", "software passend bij motor en transmissie", "realistische turbodruk en koppelopbouw", "advies over onderhoud, brandstof en gebruik"]
      },
      {
        heading: "Wanneer is ECU remap zinvol?",
        body: [
          "ECU remap is zinvol wanneer de auto technisch gezond is en de motor reserve heeft. Vooral turbo benzine- en dieselmotoren reageren vaak duidelijk op Stage 1 tuning. Het verschil zit meestal niet alleen in topvermogen, maar in een breder bruikbaar koppelgebied.",
          "Bij oudere of zwaar belaste auto's is controle vooraf extra belangrijk. Een zwakke koppeling, lekkende turboslang, vervuilde sensor of afwijkende brandstofdruk kan eerst opgelost moeten worden voordat tuning verstandig is."
        ]
      },
      {
        heading: "Wat controleert NoordTune eerst?",
        body: [
          "Voor een verantwoorde remap kijken we naar foutcodes, live data, motorbelasting, relevante sensoren en waar nodig logbestanden tijdens rijden. Bij automaten of DSG kan ook de transmissiegrens bepalen hoeveel koppel verantwoord is.",
          "Die diagnose voorkomt dat tuning een bestaand probleem maskeert. Een auto die al niet goed loopt, wordt door extra vermogen niet ineens betrouwbaar."
        ]
      },
      {
        heading: "Start met de Power Catalog, eindig met advies op maat",
        body: [
          "De NoordTune Power Catalog laat snel zien welke Stage 1, Stage 2, DSG/TCU of software-opties mogelijk kunnen zijn voor jouw voertuig. Zie de waarden als een sterke indicatie, niet als belofte voor elk individueel exemplaar.",
          "Voor definitief advies kun je je kenteken, motorvariant of voertuiggegevens via WhatsApp sturen. Dan kijken we gericht naar jouw auto, je wensen en de technische haalbaarheid."
        ]
      }
    ],
    faq: [
      {question: "Is ECU remap hetzelfde als chiptuning?", answer: "In de praktijk wel. ECU remap beschrijft specifieker dat de software in de motorcomputer opnieuw wordt gekalibreerd."},
      {question: "Kan elke auto een ECU remap krijgen?", answer: "Nee. De technische staat, motorvariant, ECU, transmissie en softwareversie bepalen of tuning verstandig en mogelijk is."},
      {question: "Zijn cataloguswaarden gegarandeerd?", answer: "Nee. Waarden zijn indicatief. Het resultaat verschilt per auto, onderhoud, brandstof, softwareversie en hardware."},
      {question: "Moet ik na een remap anders rijden?", answer: "Normaal rijden blijft mogelijk, maar goed warmrijden, tijdig onderhoud en kwalitatieve brandstof worden belangrijker."}
    ],
    relatedLinks: [
      {label: "Chiptuning op maat", href: "/nl/chiptuning"},
      {label: "Auto diagnose", href: "/nl/auto-diagnose"},
      {label: "Open Power Catalog", href: site.catalogUrl}
    ]
  }),
  published({
    locale: "nl",
    slug: "chiptuning-met-automaat",
    title: "Chiptuning met automaat: waar moet je op letten?",
    metaTitle: "Chiptuning met automaat | DSG, TCU en koppel veilig afstemmen",
    metaDescription:
      "Chiptuning met automaat vraagt aandacht voor koppel, schakellogica, temperatuur en DSG/TCU limieten. Lees waar NoordTune op let.",
    category: "Automaat",
    readTime: "8 min",
    heroImage: "/images/blog/automatic-transmission-tuning.webp",
    intro:
      "Een automatische transmissie maakt chiptuning niet onmogelijk, maar wel technischer. Motor en transmissie moeten na de tuning nog steeds logisch samenwerken. Vooral koppelopbouw, schakelmomenten en temperatuur verdienen aandacht.",
    sections: [
      {
        heading: "Waarom een automaat anders reageert",
        body: [
          "Bij een handbak voelt de bestuurder direct wat koppeling en aandrijflijn doen. Bij een automaat bepaalt software wanneer er geschakeld wordt, hoeveel slip wordt toegestaan en hoe koppel wordt begrensd. Extra motorkoppel kan die logica veranderen.",
          "Een goede tuning met automaat houdt daarom rekening met de transmissie. Het doel is geen harde, nerveuze auto, maar een aandrijflijn die sterker voelt en toch soepel blijft."
        ]
      },
      {
        heading: "DSG en TCU tuning",
        body: [
          "Bij veel DSG- of TCU-gestuurde transmissies staan aparte limieten in de transmissiesoftware. Als de motorsoftware meer koppel vraagt dan de transmissie accepteert, kan de auto beperken, vreemd schakelen of niet optimaal aanvoelen.",
          "DSG / TCU tuning kan helpen om schakellogica, koppeldrempels en soms schakelgedrag beter af te stemmen op de nieuwe motorsoftware. Dat is niet altijd nodig, maar moet wel serieus beoordeeld worden."
        ],
        bullets: ["koppellimieten controleren", "schakelmomenten beoordelen", "temperaturen bewaken", "geen onnodig harde schakeling afdwingen"]
      },
      {
        heading: "Stage 1 of Stage 2 met automaat",
        body: [
          "Stage 1 tuning is bij veel automaten prima mogelijk wanneer onderhoud, olieconditie en live data goed zijn. Stage 2 vraagt meer aandacht omdat het koppel en de thermische belasting vaak hoger liggen.",
          "Bij twijfel is loganalyse verstandig. Daarmee zie je of turbodruk, luchtmassa, brandstofdruk en transmissiegedrag passen bij de gewenste software."
        ]
      },
      {
        heading: "Veelgemaakte fouten",
        body: [
          "Een veelgemaakte fout is alleen naar motorgegevens kijken. Een auto kan op papier veel vermogen leveren, maar alsnog beperkt worden door koppeling, koppelomvormer, DSG-koppelingen of temperatuurmanagement.",
          "Ook te agressieve gaspedaalrespons kan een automaat onrustig maken. NoordTune.nl kiest liever voor een nette koppelcurve dan voor een tuning die indrukwekkend klinkt maar minder prettig rijdt."
        ]
      },
      {
        heading: "Zo helpt NoordTune je kiezen",
        body: [
          "Gebruik de Power Catalog voor een eerste indicatie en stuur daarna je voertuiggegevens via WhatsApp. Vermeld bij voorkeur motor, bouwjaar, transmissietype, kilometerstand en eventuele klachten. Dan kunnen we beoordelen of Stage 1, Stage 2 of DSG/TCU tuning past."
        ]
      }
    ],
    faq: [
      {question: "Is chiptuning slecht voor een automaat?", answer: "Niet automatisch. Het hangt af van transmissietype, onderhoud, olieconditie, koppelgrenzen en hoe de software wordt opgebouwd."},
      {question: "Heb ik altijd DSG of TCU tuning nodig?", answer: "Nee. Soms is motorsoftware voldoende, maar bij hogere koppels of specifiek schakelgedrag kan TCU tuning verstandig zijn."},
      {question: "Kan een automaat na tuning zuiniger rijden?", answer: "Bij rustig rijden kan de auto efficiënter aanvoelen, maar verbruik hangt vooral af van rijstijl, route en belasting."}
    ],
    relatedLinks: [
      {label: "DSG / TCU tuning", href: "/nl/dsg-tcu-tuning"},
      {label: "Stage 1 tuning", href: "/nl/stage-1-tuning"},
      {label: "Open Power Catalog", href: site.catalogUrl}
    ]
  }),
  published({
    locale: "nl",
    slug: "wanneer-is-stage-2-tuning-verstandig",
    title: "Wanneer is Stage 2 tuning verstandig?",
    metaTitle: "Wanneer is Stage 2 tuning verstandig? Hardware, logs en risico's",
    metaDescription:
      "Stage 2 tuning is zinvol met passende hardware en controle. Lees wanneer het verstandig is en waarom diagnose en loganalyse belangrijk zijn.",
    category: "Stage 2",
    readTime: "9 min",
    heroImage: "/images/blog/stage-2-tuning.webp",
    intro:
      "Stage 2 tuning kan veel opleveren, maar is niet simpelweg de volgende stap voor iedere auto. Het is vooral verstandig wanneer de hardware, onderhoudsstaat en data laten zien dat de auto de extra belasting verantwoord aankan.",
    sections: [
      {
        heading: "Stage 2 begint bij hardware",
        body: [
          "Waar Stage 1 bedoeld is voor standaard hardware, wordt Stage 2 meestal afgestemd op ondersteunende onderdelen. Denk aan betere luchttoevoer, intercooler, turbo-upgrade, uitlaatdelen of andere componenten die de motor helpen efficiënter te ademen en warmte kwijt te raken.",
          "Welke hardware nodig is, verschilt per auto. Een diesel, turbo benzinemotor, DSG-auto of handgeschakelde auto vraagt steeds een andere afweging."
        ]
      },
      {
        heading: "De auto moet technisch gezond zijn",
        body: [
          "Stage 2 legt meer druk op turbo, brandstofsysteem, koppeling, transmissie en koeling. Als er al foutcodes, lekkages, slip of afwijkende sensordata zijn, worden die problemen sneller zichtbaar.",
          "NoordTune.nl kijkt daarom eerst naar de basis. Soms is onderhoud, reparatie of loganalyse belangrijker dan direct tuning uitvoeren."
        ],
        bullets: ["geen actieve relevante foutcodes", "turbosysteem en inlaat lekvrij", "brandstofdruk en luchtmassa in orde", "transmissie en koppeling geschikt voor extra koppel"]
      },
      {
        heading: "Loganalyse is bij Stage 2 geen luxe",
        body: [
          "Met loganalyse zie je wat de auto onder belasting doet. Turbodruk, luchtmassa, injectie, ontsteking, lambda, temperaturen en koppelbeperkingen vertellen of de setup gezond reageert.",
          "Die data helpt om software niet te agressief te maken. Een nette Stage 2 tune is afgestemd op wat de auto herhaalbaar en verantwoord kan leveren."
        ]
      },
      {
        heading: "Let op regelgeving en gebruik",
        body: [
          "Sommige hardware-aanpassingen kunnen gevolgen hebben voor keuring, emissie-eisen of gebruik op de openbare weg. NoordTune.nl formuleert daarom voorzichtig en bespreekt oplossingen afhankelijk van voertuig, toepassing en regelgeving.",
          "Het is belangrijk dat de eigenaar weet welke wijzigingen wettelijk zijn toegestaan in de eigen situatie."
        ]
      },
      {
        heading: "Wanneer Stage 1 beter is",
        body: [
          "Als de auto dagelijks wordt gebruikt, veel kilometers maakt of technisch nog standaard is, kan Stage 1 de betere keuze zijn. Je krijgt vaak al een grote verbetering zonder de extra complexiteit van hardware en hogere thermische belasting.",
          "Een eerlijk advies kan dus ook zijn: eerst Stage 1, onderhoud op orde brengen of loganalyse uitvoeren voordat Stage 2 aan de beurt is."
        ]
      }
    ],
    faq: [
      {question: "Is Stage 2 altijd sneller dan Stage 1?", answer: "Meestal wel, maar alleen als de hardware en technische staat het toelaten. Zonder goede basis kan Stage 2 juist minder betrouwbaar zijn."},
      {question: "Welke hardware heb ik nodig?", answer: "Dat verschilt per voertuig. Daarom kijken we naar motor, turbo, koeling, transmissie, brandstofsysteem en het doel van de auto."},
      {question: "Is Stage 2 geschikt voor dagelijks rijden?", answer: "Dat kan, maar hangt sterk af van setup, onderhoud, rijstijl en regelgeving. De software moet bewust op gebruik worden afgestemd."}
    ],
    relatedLinks: [
      {label: "Stage 2 tuning", href: "/nl/stage-2-tuning"},
      {label: "Loganalyse", href: "/nl/loganalyse"},
      {label: "Klantresultaten", href: "/nl/resultaten"}
    ]
  }),
  published({
    locale: "nl",
    slug: "waarom-loganalyse-belangrijk-is-voor-tuning",
    title: "Waarom loganalyse belangrijk is vóór tuning",
    metaTitle: "Waarom loganalyse vóór tuning belangrijk is | NoordTune.nl",
    metaDescription:
      "Loganalyse laat zien hoe een auto onder belasting reageert. Ontdek waarom logs belangrijk zijn voor veilige chiptuning en diagnose.",
    category: "Loganalyse",
    readTime: "8 min",
    heroImage: "/images/blog/log-analysis.webp",
    intro:
      "Loganalyse maakt zichtbaar wat je tijdens het rijden voelt. Waar een foutcode alleen een aanwijzing geeft, laat een log zien hoe turbodruk, brandstof, luchtmassa en temperaturen zich gedragen onder echte belasting.",
    sections: [
      {
        heading: "Wat is loganalyse?",
        body: [
          "Bij loganalyse worden meetwaarden tijdens rijden of onder belasting vastgelegd. Denk aan turbodruk, gevraagde en gemeten luchtmassa, raildruk, injectiecorrecties, lambda, ontsteking, inlaattemperatuur en koppelbeperkingen.",
          "Die data vertelt of de auto gezond reageert. Het verschil tussen 'voelt traag' en 'brandstofdruk zakt bij hoge belasting' is precies waarom logs waardevol zijn."
        ]
      },
      {
        heading: "Waarom vóór tuning?",
        body: [
          "Tuning op een auto met verborgen problemen is geen goede basis. Een vervuilde sensor, lekkende slang, zwakke pomp of te hoge temperatuur kan ervoor zorgen dat extra vermogen onbetrouwbaar wordt.",
          "Door vóór tuning te loggen, zie je of de auto klaar is voor software-aanpassing. Soms voorkomt dat dure vervolgproblemen."
        ],
        bullets: ["basisgezondheid controleren", "risico's vroeg herkennen", "software realistischer afstemmen", "nacontrole na tuning mogelijk maken"]
      },
      {
        heading: "Welke signalen zijn belangrijk?",
        body: [
          "Niet elke waarde is voor elke auto even relevant. Bij turbo benzinemotoren kijken we bijvoorbeeld naar ontsteking, lambda en turbodruk. Bij diesels zijn luchtmassa, raildruk, roetbelasting en turbodruk vaak belangrijk. Bij automaten telt transmissiegedrag mee.",
          "Het gaat om samenhang. Een losse waarde zonder context kan misleidend zijn."
        ]
      },
      {
        heading: "Loganalyse bij klachten",
        body: [
          "Ook zonder tuning is loganalyse nuttig bij noodloop, vermogensverlies, rook, haperen of onverklaarbare storingen. De auto kan stationair prima lijken, maar onder belasting afwijken.",
          "NoordTune.nl gebruikt loganalyse daarom zowel bij diagnose als bij voorbereiding op chiptuning."
        ]
      },
      {
        heading: "Van data naar advies",
        body: [
          "Na de analyse krijg je geen losse cijferbrij, maar een praktisch advies: tuning mogelijk, eerst onderhoud uitvoeren, extra controle nodig of een specifieke storing verder onderzoeken. Dat maakt de vervolgstap duidelijker."
        ]
      }
    ],
    faq: [
      {question: "Is loganalyse altijd nodig?", answer: "Niet bij elke eenvoudige Stage 1, maar bij klachten, Stage 2, automaten of twijfel is het sterk aan te raden."},
      {question: "Kan loganalyse een foutcode vervangen?", answer: "Nee. Het vult foutcodes aan. Samen geven foutcodes, live data en logs een veel completer beeld."},
      {question: "Moet de auto rijdend worden gelogd?", answer: "Vaak wel, omdat veel afwijkingen pas onder belasting zichtbaar worden."}
    ],
    relatedLinks: [
      {label: "Auto diagnose", href: "/nl/auto-diagnose"},
      {label: "Loganalyse", href: "/nl/loganalyse"},
      {label: "Is ECU remap veilig?", href: "/nl/blog/is-ecu-remap-veilig"}
    ]
  }),
  published({
    locale: "nl",
    slug: "dsg-tcu-tuning-uitgelegd",
    title: "DSG / TCU tuning uitgelegd",
    metaTitle: "DSG / TCU tuning uitgelegd | Schakellogica en koppel op maat",
    metaDescription:
      "Lees wat DSG en TCU tuning doen, wanneer het zinvol is en hoe transmissiesoftware samenwerkt met chiptuning.",
    category: "DSG / TCU",
    readTime: "8 min",
    heroImage: "/images/blog/dsg-tcu-tuning.webp",
    intro:
      "DSG / TCU tuning draait om de software van de transmissie. Bij moderne auto's bepaalt die software hoe, wanneer en met welke koppellimieten de auto schakelt. Na chiptuning kan transmissiesoftware net zo belangrijk zijn als motorsoftware.",
    sections: [
      {
        heading: "Wat doet de TCU?",
        body: [
          "De TCU is de transmissieregelunit. Deze bewaakt schakelmomenten, koppeldrempels, slip, temperatuur en rijprogramma's. Bij DSG, ZF, DCT en andere automaten kan de TCU bepalen hoeveel van het motorkoppel werkelijk wordt toegestaan.",
          "Als de motor meer koppel levert maar de TCU oude grenzen aanhoudt, voelt de auto soms beperkt of minder vloeiend."
        ]
      },
      {
        heading: "Wanneer is DSG / TCU tuning zinvol?",
        body: [
          "TCU tuning is vooral zinvol wanneer de motorsoftware duidelijk meer koppel levert, wanneer de auto schakelgedrag vertoont dat niet past bij de nieuwe vermogensopbouw, of wanneer Stage 2 meer controle vraagt.",
          "Het is niet altijd nodig. Bij sommige auto's blijft de originele transmissiesoftware prima werken. Daarom beoordelen we dit per voertuig."
        ],
        bullets: ["koppellimieten passend maken", "schakelmomenten logischer maken", "launch- of sportgedrag alleen waar passend", "temperatuur en betrouwbaarheid blijven belangrijk"]
      },
      {
        heading: "Geen harde schakeling als doel op zich",
        body: [
          "Een sportiever gevoel betekent niet dat schakelen altijd harder moet. Voor dagelijks rijden is voorspelbaarheid vaak belangrijker dan agressie. Goede TCU tuning voelt natuurlijk, ondersteunt het extra koppel en voorkomt onnodige belasting.",
          "NoordTune.nl kijkt daarom naar het gebruik van de auto: dagelijks, zakelijk, caravan, sportief of projectauto."
        ]
      },
      {
        heading: "Samenwerking met ECU remap",
        body: [
          "Motor en transmissie vormen één aandrijflijn. Een nette ECU remap met verkeerde transmissielimieten kan minder goed aanvoelen. Andersom heeft TCU tuning zonder gezonde motorbasis weinig waarde.",
          "Daarom combineren we advies over DSG / TCU tuning met diagnose, Power Catalog indicatie en waar nodig loganalyse."
        ]
      },
      {
        heading: "Wat moet je vooraf weten?",
        body: [
          "Niet elke transmissie ondersteunt dezelfde opties. Softwareversie, bouwjaar, transmissietype en beschikbare tools bepalen wat mogelijk is. Definitief advies volgt pas na voertuigcontrole."
        ]
      }
    ],
    faq: [
      {question: "Is DSG tuning verplicht bij Stage 1?", answer: "Nee, niet altijd. Het hangt af van koppelwinst, transmissietype, rijgedrag en fabriekslimieten."},
      {question: "Wordt de automaat minder comfortabel?", answer: "Dat hoeft niet. Een goede TCU tune kan juist rustiger en logischer aanvoelen."},
      {question: "Kan TCU tuning slijtage voorkomen?", answer: "Het kan helpen om koppel en schakellogica beter te laten passen, maar onderhoud en technisch gebruik blijven bepalend."}
    ],
    relatedLinks: [
      {label: "DSG / TCU tuning", href: "/nl/dsg-tcu-tuning"},
      {label: "Chiptuning met automaat", href: "/nl/blog/chiptuning-met-automaat"},
      {label: "Open Power Catalog", href: site.catalogUrl}
    ]
  }),
  published({
    locale: "nl",
    slug: "dpf-egr-of-adblue-storing-wat-nu",
    title: "DPF, EGR of AdBlue storing: wat nu?",
    metaTitle: "DPF, EGR of AdBlue storing? Diagnose en advies | NoordTune.nl",
    metaDescription:
      "Een DPF, EGR of AdBlue storing vraagt zorgvuldige diagnose. Lees welke stappen verstandig zijn en welke oplossingen afhankelijk zijn van voertuig en regelgeving.",
    category: "Diagnose",
    readTime: "9 min",
    heroImage: "/images/blog/dpf-egr-adblue-diagnostics.webp",
    intro:
      "Een DPF, EGR of AdBlue storing is zelden alleen een lampje op het dashboard. De oorzaak kan liggen in sensoren, vervuiling, gebruik, softwarestatus, onderhoud of een combinatie daarvan. De juiste aanpak begint met diagnose, niet met gokken.",
    sections: [
      {
        heading: "Begin met uitlezen en context",
        body: [
          "Een foutcode vertelt waar het systeem een afwijking ziet, maar niet altijd waarom. Bij AdBlue kan het gaan om pompdruk, NOx-sensoren, kristallisatie, tankverwarming of softwarestatus. Bij DPF spelen roetbelasting, regeneratie, druksensoren en rijprofiel mee. Bij EGR kan vervuiling, positiefeedback of luchtmassa een rol spelen.",
          "Daarom kijkt NoordTune.nl naar foutcodes, freeze frames, live data en wanneer de storing ontstaat."
        ]
      },
      {
        heading: "Niet elke oplossing is hetzelfde",
        body: [
          "Soms is reinigen, repareren of een sensor vervangen de juiste route. Soms is er een software-update of voertuigspecifiek advies nodig. Software-oplossingen worden alleen besproken waar technisch passend en wettelijk toegestaan.",
          "We vermijden publieke beloftes over generieke verwijdering of gegarandeerde uitkomsten. Emissiesystemen vallen onder regelgeving en de juiste keuze hangt af van voertuig, gebruik en lokale wetgeving."
        ],
        bullets: ["diagnose en storing analyse", "advies op maat", "controle van live data", "software-oplossingen waar wettelijk toegestaan"]
      },
      {
        heading: "Waarom gebruik en onderhoud meetellen",
        body: [
          "Korte ritten, lage motortemperatuur, slechte brandstof, achterstallig onderhoud of eerdere reparaties kunnen invloed hebben op DPF, EGR en AdBlue. Alleen de foutcode wissen lost de oorzaak meestal niet op.",
          "Een duurzame aanpak kijkt naar de technische reden achter de storing en naar hoe de auto wordt gebruikt."
        ]
      },
      {
        heading: "Wanneer direct contact verstandig is",
        body: [
          "Bij aftellende AdBlue meldingen, noodloop, herhaald regenereren, rook, vermogensverlies of terugkerende foutcodes is wachten vaak geen goed idee. Door tijdig te meten voorkom je dat gevolgschade of onnodige kosten ontstaan.",
          "Stuur via WhatsApp je foutcode, dashboardmelding, voertuiggegevens en korte omschrijving. Dan kunnen we inschatten welke diagnose zinvol is."
        ]
      },
      {
        heading: "Wat je wel en niet mag verwachten",
        body: [
          "Je mag een technische uitleg, heldere vervolgstappen en eerlijk advies verwachten. Je mag niet verwachten dat elke storing met dezelfde softwarematige stap opgelost wordt of dat elke aanpassing wettelijk is toegestaan.",
          "NoordTune.nl houdt de communicatie bewust zorgvuldig: eerst meten, dan beoordelen, daarna pas adviseren."
        ]
      }
    ],
    faq: [
      {question: "Kan ik doorrijden met een AdBlue storing?", answer: "Dat hangt af van de melding. Sommige auto's starten na een aftelperiode niet meer. Laat de storing daarom tijdig uitlezen."},
      {question: "Is een DPF storing altijd een defect filter?", answer: "Nee. Druksensoren, rijprofiel, regeneratieproblemen, EGR of motorstoringen kunnen ook oorzaak zijn."},
      {question: "Bieden jullie software-oplossingen?", answer: "We bespreken software alleen wanneer dat technisch passend en wettelijk toegestaan is voor voertuig, gebruik en situatie."}
    ],
    relatedLinks: [
      {label: "Auto diagnose", href: "/nl/auto-diagnose"},
      {label: "DPF storing", href: "/nl/dpf-storing"},
      {label: "EGR storing", href: "/nl/egr-storing"},
      {label: "AdBlue storing", href: "/nl/adblue-storing"}
    ]
  })
];

export const enGrowthBlogArticles: BlogArticle[] = [
  published({
    locale: "en",
    slug: "what-is-ecu-remap",
    title: "What is ECU remap?",
    metaTitle: "What is ECU remap? Custom engine software explained",
    metaDescription:
      "A practical explanation of ECU remap, engine calibration, diagnostics and why custom tuning matters.",
    category: "ECU remap",
    readTime: "7 min",
    heroImage: "/images/blog/ecu-remap.webp",
    intro:
      "ECU remap means recalibrating the engine control software. Done properly, it is not about chasing the highest number, but about improving torque, response and drivability within responsible margins.",
    sections: [
      {heading: "The ECU controls the engine strategy", body: ["The ECU manages fuel, boost, torque limits, throttle response and many protection strategies. A remap changes how those maps work together, so the calibration must be balanced rather than aggressive in one area.", "That is why a professional remap should feel natural. The car should pull stronger, build power smoothly and remain predictable in daily use."]},
      {heading: "Why custom calibration matters", body: ["Cars with the same engine code can behave differently because of mileage, maintenance, software version, fuel quality and hardware condition. NoordTune uses catalog data as an indication, then checks the actual vehicle before final advice.", "The goal can also differ per owner: daily torque, smoother response, towing support or a sportier feel."], bullets: ["fault-code and live-data checks", "engine and transmission-aware software", "realistic boost and torque targets", "clear aftercare advice"]},
      {heading: "When ECU remap makes sense", body: ["A remap makes sense when the vehicle is technically healthy and the engine has safe reserve. Turbo petrol and diesel engines often respond clearly, especially in the usable midrange.", "If the car has faults, leaks, weak sensors or transmission issues, diagnostics should come first. Extra power should not be used to hide an existing problem."]},
      {heading: "Start with the Power Catalog", body: ["The NoordTune Power Catalog gives a useful first indication for Stage 1, Stage 2 and DSG/TCU options. Final advice still depends on the exact vehicle, ECU, software version and technical condition."]}
    ],
    faq: [
      {question: "Is ECU remap the same as chiptuning?", answer: "In common use, yes. ECU remap more specifically describes recalibrating the engine control software."},
      {question: "Are catalog figures guaranteed?", answer: "No. They are indicative and depend on vehicle condition, fuel, software version and hardware."},
      {question: "Should diagnostics be done first?", answer: "Yes. A healthy baseline is important before changing engine software."}
    ],
    relatedLinks: [
      {label: "Chiptuning", href: "/en/chiptuning"},
      {label: "Car diagnostics", href: "/en/car-diagnostics"},
      {label: "Open Power Catalog", href: site.catalogUrl}
    ]
  }),
  published({
    locale: "en",
    slug: "chiptuning-with-automatic-transmission",
    title: "Chiptuning with automatic transmission",
    metaTitle: "Chiptuning with automatic transmission | DSG and TCU advice",
    metaDescription:
      "What to check before tuning an automatic, DSG or TCU-equipped car: torque, shift logic, temperature and drivability.",
    category: "Automatic",
    readTime: "7 min",
    heroImage: "/images/blog/automatic-transmission-tuning.webp",
    intro:
      "Automatic transmission cars can be tuned very well, but the engine and gearbox software must still work as one system. Torque delivery, shift logic and temperature control matter.",
    sections: [
      {heading: "Why automatics need extra attention", body: ["The transmission decides when to shift, how much slip is acceptable and what torque is allowed. When engine torque increases, the original transmission strategy may no longer feel ideal.", "A good tune keeps the drivetrain smooth and predictable instead of simply making the throttle aggressive."]},
      {heading: "DSG and TCU limits", body: ["Many DSG or TCU-controlled transmissions have separate torque limits. If engine software asks for more torque than the gearbox accepts, the car can limit power or behave inconsistently.", "TCU tuning can adjust torque limits and shift strategy where supported, but it is not automatically required for every car."], bullets: ["check torque limits", "review shift behavior", "monitor temperature", "avoid harsh shifts without reason"]},
      {heading: "Stage 1 or Stage 2 with an automatic", body: ["Stage 1 is often possible when the gearbox is healthy and maintained. Stage 2 needs more care because heat and torque are usually higher.", "Log analysis helps confirm whether boost, airflow, fuel pressure and gearbox behavior match the desired calibration."]},
      {heading: "Practical advice from NoordTune", body: ["Use the Power Catalog for a first indication and send your vehicle details by WhatsApp. Mention engine, year, gearbox type, mileage and any symptoms so we can advise realistically."]}
    ],
    faq: [
      {question: "Is tuning bad for an automatic gearbox?", answer: "Not by definition. It depends on gearbox type, maintenance, torque limits and how the software is calibrated."},
      {question: "Do I always need TCU tuning?", answer: "No. It depends on the vehicle and torque increase."},
      {question: "Can tuning keep factory-like comfort?", answer: "Yes. Smooth drivability is often better than overly aggressive shift behavior."}
    ],
    relatedLinks: [
      {label: "Services", href: "/en/services"},
      {label: "Stage 1 vs Stage 2", href: "/en/news-blog/stage-1-vs-stage-2"},
      {label: "Open Power Catalog", href: site.catalogUrl}
    ]
  }),
  published({
    locale: "en",
    slug: "when-does-stage-2-tuning-make-sense",
    title: "When does Stage 2 tuning make sense?",
    metaTitle: "When does Stage 2 tuning make sense? Hardware and log checks",
    metaDescription:
      "Stage 2 tuning explained: when supporting hardware, diagnostics and log analysis make the upgrade responsible.",
    category: "Stage 2",
    readTime: "8 min",
    heroImage: "/images/blog/stage-2-tuning.webp",
    intro:
      "Stage 2 tuning is not simply the next menu option after Stage 1. It makes sense when hardware, maintenance and data show that the vehicle can handle the extra load responsibly.",
    sections: [
      {heading: "Stage 2 starts with hardware", body: ["Stage 1 is normally calibrated for standard hardware. Stage 2 is usually matched to supporting parts such as intake, intercooler, turbo upgrade or exhaust components, depending on the vehicle and legal context.", "The correct hardware differs per platform, fuel type and use case."]},
      {heading: "The vehicle must be healthy", body: ["Stage 2 increases stress on turbo, fuel system, clutch, transmission and cooling. Existing faults or weak components should be addressed first.", "NoordTune checks the baseline before recommending a calibration."], bullets: ["no relevant active faults", "healthy boost and intake system", "fuel data within range", "gearbox and clutch suitable for torque"]},
      {heading: "Log analysis protects the setup", body: ["Logs show how the car behaves under load. Boost, airflow, fuel pressure, temperature and torque intervention data help shape a safe calibration.", "This avoids tuning only for a peak number while ignoring repeatability and drivability."]},
      {heading: "Legal and practical context", body: ["Some hardware modifications can be regulated differently depending on vehicle, use and local law. NoordTune discusses software and hardware carefully and vehicle-specifically.", "For many daily cars, Stage 1 can be the better balance."]}
    ],
    faq: [
      {question: "Is Stage 2 always better than Stage 1?", answer: "No. It can be stronger, but only when the hardware and condition support it."},
      {question: "Do I need logs for Stage 2?", answer: "They are strongly recommended because Stage 2 works closer to the vehicle's limits."},
      {question: "Can Stage 2 be daily driven?", answer: "Sometimes, but it depends on setup, maintenance, driving style and legal context."}
    ],
    relatedLinks: [
      {label: "Chiptuning", href: "/en/chiptuning"},
      {label: "Customer results", href: "/en/results"},
      {label: "Open Power Catalog", href: site.catalogUrl}
    ]
  }),
  published({
    locale: "en",
    slug: "why-log-analysis-matters-before-tuning",
    title: "Why log analysis matters before tuning",
    metaTitle: "Why log analysis matters before tuning | NoordTune.nl",
    metaDescription:
      "Log analysis shows how a car behaves under load before tuning. Learn why data matters for safe ECU remap decisions.",
    category: "Diagnostics",
    readTime: "7 min",
    heroImage: "/images/blog/log-analysis.webp",
    intro:
      "Log analysis turns a driving impression into measurable data. It shows how boost, airflow, fuel pressure and temperature behave when the vehicle is actually under load.",
    sections: [
      {heading: "What is logged?", body: ["Relevant values differ by engine, but often include requested and measured boost, airflow, fuel pressure, injection correction, lambda, ignition timing, intake temperature and torque intervention.", "Those values help separate a feeling from a technical cause."]},
      {heading: "Why before tuning?", body: ["A hidden issue can become more obvious after tuning. A weak sensor, boost leak or fuel pressure problem should be found before adding extra load.", "Logs help decide whether tuning is sensible now or whether repair comes first."], bullets: ["baseline health check", "early risk detection", "better calibration decisions", "possible after-tune comparison"]},
      {heading: "Useful for diagnostics too", body: ["Log analysis is valuable for limp mode, power loss, smoke, hesitation and repeated faults. Some problems only appear during driving, not at idle in the workshop."]},
      {heading: "From data to advice", body: ["NoordTune translates the data into practical next steps: tune, repair, inspect further or adjust the plan."]}
    ],
    faq: [
      {question: "Is log analysis required for every tune?", answer: "Not always, but it is valuable for Stage 2, complaints, automatics and uncertain vehicle condition."},
      {question: "Does it replace fault codes?", answer: "No. It complements fault codes and live data."},
      {question: "Can logs be taken on the road?", answer: "Often yes, because many issues only appear under load."}
    ],
    relatedLinks: [
      {label: "Car diagnostics", href: "/en/car-diagnostics"},
      {label: "Is ECU remap safe?", href: "/en/news-blog/is-ecu-remap-safe"},
      {label: "Message us", href: site.whatsappUrl}
    ]
  }),
  published({
    locale: "en",
    slug: "dsg-tcu-tuning-explained",
    title: "DSG / TCU tuning explained",
    metaTitle: "DSG / TCU tuning explained | Gearbox software and torque limits",
    metaDescription:
      "Learn what DSG and TCU tuning do, when gearbox software matters and how it works with ECU remap.",
    category: "DSG / TCU",
    readTime: "7 min",
    heroImage: "/images/blog/dsg-tcu-tuning.webp",
    intro:
      "DSG / TCU tuning focuses on transmission software. In many modern cars, gearbox logic decides how much torque is allowed and how the car shifts.",
    sections: [
      {heading: "What the TCU controls", body: ["The TCU manages shift points, torque limits, clutch behavior, temperature strategy and drive modes. If engine torque changes, the original transmission strategy may no longer be ideal.", "A good gearbox calibration supports the engine tune without making the car unpleasant."]},
      {heading: "When it helps", body: ["TCU tuning can help when torque increases are significant, when shifts do not match the new power delivery or when Stage 2 requires more control.", "It is not always necessary. NoordTune checks this per vehicle."], bullets: ["torque limit alignment", "better shift logic", "temperature awareness", "drivability first"]},
      {heading: "Comfort still matters", body: ["Hard shifts are not automatically better. For a daily car, smooth and predictable behavior often matters more than an aggressive feel."]},
      {heading: "Working with ECU remap", body: ["Engine and transmission software should be considered together. The best result comes from a balanced drivetrain, not isolated changes."]}
    ],
    faq: [
      {question: "Do all DSG cars need TCU tuning?", answer: "No. It depends on torque increase, software limits and driving behavior."},
      {question: "Can TCU tuning improve comfort?", answer: "Yes, if calibrated with drivability in mind."},
      {question: "Is it only for DSG?", answer: "No. TCU tuning can apply to several automatic transmission types where software support exists."}
    ],
    relatedLinks: [
      {label: "Services", href: "/en/services"},
      {label: "Automatic transmission tuning", href: "/en/news-blog/chiptuning-with-automatic-transmission"},
      {label: "Open Power Catalog", href: site.catalogUrl}
    ]
  }),
  published({
    locale: "en",
    slug: "dpf-egr-adblue-fault-what-now",
    title: "DPF, EGR or AdBlue fault: what now?",
    metaTitle: "DPF, EGR or AdBlue fault? Diagnostics and careful advice",
    metaDescription:
      "A careful guide to DPF, EGR and AdBlue fault diagnostics, legal wording and vehicle-specific advice.",
    category: "Diagnostics",
    readTime: "8 min",
    heroImage: "/images/blog/dpf-egr-adblue-diagnostics.webp",
    intro:
      "A DPF, EGR or AdBlue warning should be diagnosed carefully. The cause can be sensors, contamination, driving profile, software state, maintenance or several factors at once.",
    sections: [
      {heading: "Start with codes and context", body: ["A fault code points to a system, but not always to the real cause. AdBlue faults can involve NOx sensors, pump pressure or crystallization. DPF faults can involve soot load, regeneration and pressure sensors. EGR faults can involve airflow and position feedback.", "NoordTune combines codes, freeze-frame data, live values and the conditions in which the fault appears."]},
      {heading: "One fault does not mean one solution", body: ["Sometimes cleaning, repair or sensor replacement is correct. Sometimes further diagnostics or vehicle-specific advice is needed. Software solutions are only discussed where technically suitable and legally permitted.", "We do not advertise generic illegal removal or guaranteed outcomes."], bullets: ["diagnostics", "fault analysis", "tailored advice", "legal context matters"]},
      {heading: "Driving profile matters", body: ["Short trips, low engine temperature, poor fuel, maintenance history and previous repairs can all affect emissions systems. Clearing a code rarely fixes the underlying reason."]},
      {heading: "When to contact us", body: ["Countdown messages, limp mode, repeated regeneration, smoke, power loss or returning fault codes should be checked promptly. Send your vehicle data and warning message by WhatsApp for advice."]}
    ],
    faq: [
      {question: "Can I keep driving with an AdBlue fault?", answer: "It depends on the message. Some vehicles may eventually refuse to start, so early diagnosis is wise."},
      {question: "Is a DPF fault always a failed filter?", answer: "No. Sensors, driving profile, regeneration issues or other engine faults can be involved."},
      {question: "Do you offer software solutions?", answer: "Only where technically appropriate and legally permitted for the vehicle and situation."}
    ],
    relatedLinks: [
      {label: "Car diagnostics", href: "/en/car-diagnostics"},
      {label: "Contact", href: "/en/contact"},
      {label: "Message us", href: site.whatsappUrl}
    ]
  })
];

export const plGrowthBlogArticles: BlogArticle[] = [
  published({
    locale: "pl",
    slug: "co-to-jest-remap-ecu",
    title: "Co to jest remap ECU?",
    metaTitle: "Co to jest remap ECU? Indywidualna kalibracja silnika",
    metaDescription:
      "Remap ECU wyjaśniony po ludzku: co zmienia się w oprogramowaniu, kiedy ma to sens i dlaczego diagnostyka jest ważna.",
    category: "Remap ECU",
    readTime: "8 min",
    heroImage: "/images/blog/ecu-remap.webp",
    intro:
      "Remap ECU to ponowna kalibracja oprogramowania sterownika silnika. Dobrze wykonany remap nie polega na ślepym podnoszeniu limitów, lecz na dopasowaniu momentu, reakcji i mocy do konkretnego auta.",
    sections: [
      {heading: "Czym steruje ECU?", body: ["ECU zarządza dawką paliwa, doładowaniem, limitami momentu, reakcją pedału gazu oraz strategiami ochronnymi. Zmiana jednej tabeli bez zrozumienia reszty może pogorszyć kulturę pracy albo zwiększyć obciążenie osprzętu.", "Profesjonalny remap powinien być spójny. Auto ma jechać mocniej, ale nadal przewidywalnie i płynnie."]},
      {heading: "Dlaczego mapa gotowa nie zawsze wystarczy", body: ["Dwa auta z tym samym silnikiem mogą różnić się przebiegiem, stanem technicznym, wersją softu, paliwem i osprzętem. Dlatego katalog mocy daje wskazówkę, a finalna decyzja wymaga spojrzenia na konkretny samochód.", "NoordTune dobiera kalibrację do celu kierowcy: elastyczność na co dzień, lepsza reakcja, mocniejsze przyspieszenie albo spokojniejsza praca automatu."], bullets: ["kontrola błędów i live data", "oprogramowanie pod silnik i skrzynię", "realistyczne doładowanie i moment", "zalecenia po usłudze"]},
      {heading: "Kiedy remap ma sens?", body: ["Remap ma sens, gdy auto jest technicznie zdrowe i ma bezpieczny zapas. Silniki turbo benzynowe i diesla często reagują szczególnie dobrze w średnim zakresie obrotów.", "Jeżeli są błędy, nieszczelności, słabe czujniki lub problemy ze skrzynią, najpierw potrzebna jest diagnostyka. Tuning nie powinien ukrywać usterki."]},
      {heading: "Od czego zacząć?", body: ["Najpierw sprawdź auto w katalogu mocy NoordTune. Potem wyślij dane pojazdu przez WhatsApp, aby otrzymać poradę dopasowaną do silnika, ECU, skrzyni i stanu technicznego."]}
    ],
    faq: [
      {question: "Czy remap ECU to chiptuning?", answer: "W praktyce tak. Remap ECU dokładniej opisuje zmianę kalibracji w sterowniku silnika."},
      {question: "Czy wynik z katalogu jest gwarancją?", answer: "Nie. To orientacyjna wartość zależna od stanu auta, paliwa, wersji oprogramowania i osprzętu."},
      {question: "Czy przed remapem trzeba zrobić diagnostykę?", answer: "Tak, przynajmniej podstawową kontrolę. Zdrowa baza jest kluczowa dla bezpiecznego tuningu."}
    ],
    relatedLinks: [
      {label: "Chiptuning", href: "/pl/chiptuning"},
      {label: "Diagnostyka samochodowa", href: "/pl/diagnostyka-samochodowa"},
      {label: "Otwórz katalog mocy", href: site.catalogUrl}
    ]
  }),
  published({
    locale: "pl",
    slug: "chiptuning-z-automatyczna-skrzynia",
    title: "Chiptuning z automatyczną skrzynią",
    metaTitle: "Chiptuning z automatyczną skrzynią | DSG, TCU i moment",
    metaDescription:
      "Co sprawdzić przed tuningiem auta z automatem, DSG lub TCU: moment, limity, temperatury i płynność jazdy.",
    category: "Automat",
    readTime: "7 min",
    heroImage: "/images/blog/automatic-transmission-tuning.webp",
    intro:
      "Automatyczna skrzynia nie wyklucza chiptuningu, ale wymaga rozsądnego podejścia. Silnik i skrzynia muszą po modyfikacji nadal pracować jak jeden układ.",
    sections: [
      {heading: "Dlaczego automat wymaga uwagi", body: ["Skrzynia decyduje, kiedy zmienić bieg, ile poślizgu dopuścić i jaki moment zaakceptować. Po zwiększeniu momentu oryginalna strategia może nie pasować idealnie.", "Dobra kalibracja nie robi z auta nerwowego projektu. Ma poprawić elastyczność i reakcję, zachowując płynność."]},
      {heading: "DSG i TCU", body: ["Wiele skrzyń DSG lub TCU ma własne limity momentu. Jeżeli silnik prosi o więcej, niż skrzynia przyjmuje, auto może ograniczać moc albo zachowywać się niespójnie.", "TCU tuning bywa pomocny, ale nie jest obowiązkowy w każdym aucie."], bullets: ["kontrola limitów momentu", "ocena zmiany biegów", "temperatura skrzyni", "brak sztucznie twardej pracy"]},
      {heading: "Stage 1 czy Stage 2 z automatem", body: ["Stage 1 często działa bardzo dobrze, jeśli skrzynia jest sprawna i serwisowana. Stage 2 wymaga więcej kontroli, bo obciążenie i temperatura są zwykle wyższe.", "Logi pomagają ocenić, czy doładowanie, przepływ powietrza, paliwo i praca skrzyni pasują do planowanej mapy."]},
      {heading: "Jak przygotować dane do porady", body: ["Podaj silnik, rocznik, typ skrzyni, przebieg i ewentualne objawy. Katalog mocy daje punkt startu, a finalna rekomendacja zależy od konkretnego auta."]}
    ],
    faq: [
      {question: "Czy tuning niszczy automat?", answer: "Nie musi. Ryzyko zależy od typu skrzyni, serwisu, limitów momentu i sposobu kalibracji."},
      {question: "Czy zawsze potrzebuję TCU tuning?", answer: "Nie. To zależy od przyrostu momentu i możliwości danej skrzyni."},
      {question: "Czy automat może zostać komfortowy?", answer: "Tak. Płynność jest często ważniejsza niż agresywne zmiany biegów."}
    ],
    relatedLinks: [
      {label: "Usługi", href: "/pl/uslugi"},
      {label: "Stage 1 vs Stage 2", href: "/pl/aktualnosci-blog/stage-1-vs-stage-2"},
      {label: "Otwórz katalog mocy", href: site.catalogUrl}
    ]
  }),
  published({
    locale: "pl",
    slug: "kiedy-stage-2-ma-sens",
    title: "Kiedy Stage 2 ma sens?",
    metaTitle: "Kiedy Stage 2 tuning ma sens? Osprzęt, logi i bezpieczeństwo",
    metaDescription:
      "Stage 2 tuning wymaga odpowiedniego osprzętu, diagnostyki i logów. Sprawdź, kiedy jest rozsądnym wyborem.",
    category: "Stage 2",
    readTime: "8 min",
    heroImage: "/images/blog/stage-2-tuning.webp",
    intro:
      "Stage 2 nie jest automatycznie lepszym wyborem dla każdego auta. Ma sens wtedy, gdy osprzęt, stan techniczny i dane pokazują, że samochód zniesie większe obciążenie.",
    sections: [
      {heading: "Stage 2 zaczyna się od osprzętu", body: ["Stage 1 jest zwykle przygotowany pod seryjne części. Stage 2 wymaga konfiguracji dopasowanej do osprzętu, na przykład wydajniejszego dolotu, intercoolera, turbosprężarki lub elementów wydechu, zależnie od auta i przepisów.", "Nie ma jednej listy części dla wszystkich samochodów. Każda platforma wymaga osobnej oceny."]},
      {heading: "Auto musi być zdrowe", body: ["Większe obciążenie dotyczy turbo, paliwa, sprzęgła, skrzyni i chłodzenia. Aktywne błędy, nieszczelności lub poślizg sprzęgła trzeba rozwiązać przed tuningiem.", "NoordTune najpierw sprawdza bazę, a dopiero potem dobiera mapę."], bullets: ["brak istotnych błędów", "szczelny układ doładowania", "prawidłowe dane paliwa", "skrzynia gotowa na wyższy moment"]},
      {heading: "Logi są kluczowe", body: ["Logi pokazują zachowanie auta pod obciążeniem. Doładowanie, przepływ powietrza, paliwo i temperatury pomagają przygotować kalibrację, która jest powtarzalna, a nie tylko efektowna na papierze."]},
      {heading: "Przepisy i użytkowanie", body: ["Niektóre modyfikacje sprzętowe mogą podlegać przepisom zależnie od kraju, auta i sposobu użytkowania. Dlatego NoordTune omawia rozwiązania ostrożnie i indywidualnie."]}
    ],
    faq: [
      {question: "Czy Stage 2 zawsze daje więcej niż Stage 1?", answer: "Zwykle tak, ale tylko przy właściwym osprzęcie i zdrowym aucie."},
      {question: "Czy do Stage 2 potrzebne są logi?", answer: "Są bardzo wskazane, bo Stage 2 pracuje bliżej limitów układu."},
      {question: "Czy Stage 2 nadaje się na co dzień?", answer: "Może się nadawać, ale zależy od konfiguracji, serwisu, stylu jazdy i przepisów."}
    ],
    relatedLinks: [
      {label: "Chiptuning", href: "/pl/chiptuning"},
      {label: "Realizacje klientów", href: "/pl/rezultaty"},
      {label: "Otwórz katalog mocy", href: site.catalogUrl}
    ]
  }),
  published({
    locale: "pl",
    slug: "dlaczego-logi-sa-wazne-przed-tuningiem",
    title: "Dlaczego logi są ważne przed tuningiem",
    metaTitle: "Dlaczego logi przed tuningiem są ważne | NoordTune.nl",
    metaDescription:
      "Logi pokazują, jak auto zachowuje się pod obciążeniem. To ważne przed remapem ECU, Stage 2 i diagnostyką usterek.",
    category: "Logi",
    readTime: "7 min",
    heroImage: "/images/blog/log-analysis.webp",
    intro:
      "Logi zamieniają odczucie z jazdy w konkretne dane. Pokazują, jak doładowanie, przepływ powietrza, paliwo i temperatury zachowują się, gdy auto naprawdę pracuje pod obciążeniem.",
    sections: [
      {heading: "Co mierzy się w logach?", body: ["Zakres zależy od silnika, ale często sprawdza się wymagane i rzeczywiste doładowanie, przepływ powietrza, ciśnienie paliwa, korekty wtrysku, lambda, zapłon, temperaturę dolotu i ograniczenia momentu.", "Dzięki temu łatwiej odróżnić subiektywne wrażenie od technicznej przyczyny."]},
      {heading: "Dlaczego przed tuningiem?", body: ["Ukryta usterka po tuningu może stać się większym problemem. Słaby czujnik, nieszczelność lub spadek ciśnienia paliwa powinny zostać wykryte wcześniej.", "Logi pomagają zdecydować, czy tuning można wykonać teraz, czy najpierw potrzebna jest naprawa."], bullets: ["kontrola zdrowia auta", "wczesne wykrycie ryzyka", "lepsza kalibracja", "porównanie po modyfikacji"]},
      {heading: "Pomocne także przy usterkach", body: ["Loganalyse przydaje się przy trybie awaryjnym, spadku mocy, dymieniu, szarpaniu i powracających błędach. Część problemów widać dopiero podczas jazdy."]},
      {heading: "Dane zamienione w poradę", body: ["NoordTune przekłada logi na praktyczne zalecenia: można stroić, trzeba naprawić, warto dalej diagnozować albo zmienić plan."]}
    ],
    faq: [
      {question: "Czy logi są konieczne przy każdej usłudze?", answer: "Nie zawsze, ale są bardzo przydatne przy Stage 2, objawach, automatach i niepewnym stanie auta."},
      {question: "Czy logi zastępują kody błędów?", answer: "Nie. Uzupełniają diagnostykę i live data."},
      {question: "Czy logi robi się podczas jazdy?", answer: "Często tak, bo wiele odchyleń pojawia się dopiero pod obciążeniem."}
    ],
    relatedLinks: [
      {label: "Diagnostyka samochodowa", href: "/pl/diagnostyka-samochodowa"},
      {label: "Czy remap ECU jest bezpieczny?", href: "/pl/aktualnosci-blog/czy-remap-ecu-jest-bezpieczny"},
      {label: "Napisz na WhatsApp", href: site.whatsappUrl}
    ]
  }),
  published({
    locale: "pl",
    slug: "dsg-tcu-tuning-wyjasnienie",
    title: "DSG / TCU tuning — wyjaśnienie",
    metaTitle: "DSG / TCU tuning wyjaśniony | Skrzynia, moment i soft",
    metaDescription:
      "Wyjaśniamy, czym jest DSG/TCU tuning, kiedy ma sens i jak współpracuje z remapem ECU.",
    category: "DSG / TCU",
    readTime: "7 min",
    heroImage: "/images/blog/dsg-tcu-tuning.webp",
    intro:
      "DSG / TCU tuning dotyczy oprogramowania skrzyni biegów. W wielu nowoczesnych autach to skrzynia decyduje, ile momentu zostanie zaakceptowane i jak samochód zmienia biegi.",
    sections: [
      {heading: "Za co odpowiada TCU?", body: ["TCU kontroluje momenty zmiany biegów, limity momentu, pracę sprzęgieł, temperaturę i tryby jazdy. Po zwiększeniu momentu silnika oryginalne ustawienia skrzyni mogą nie być idealne.", "Dobra kalibracja skrzyni wspiera tuning silnika, ale nie psuje komfortu."]},
      {heading: "Kiedy to pomaga?", body: ["TCU tuning pomaga przy większym przyroście momentu, przy niepasującym zachowaniu skrzyni albo przy Stage 2. Nie jest jednak potrzebny zawsze.", "Każdy samochód trzeba ocenić osobno."], bullets: ["dopasowanie limitów momentu", "lepsza logika zmian", "kontrola temperatury", "płynność przed agresją"]},
      {heading: "Komfort nadal ma znaczenie", body: ["Twardsza zmiana biegów nie zawsze oznacza lepszą skrzynię. W aucie codziennym ważna jest przewidywalność i płynność, szczególnie przy częściowym obciążeniu."]},
      {heading: "Współpraca z ECU", body: ["Silnik i skrzynia tworzą jeden układ. Najlepszy efekt daje zbalansowanie remapu ECU z możliwościami transmisji."]}
    ],
    faq: [
      {question: "Czy każda DSG wymaga TCU tuning?", answer: "Nie. Decyduje przyrost momentu, limity softu i zachowanie skrzyni."},
      {question: "Czy TCU tuning może poprawić komfort?", answer: "Tak, jeżeli kalibracja jest nastawiona na płynność, a nie tylko sportowe wrażenie."},
      {question: "Czy dotyczy tylko DSG?", answer: "Nie. TCU tuning może dotyczyć różnych automatów, jeśli istnieje wsparcie dla danej skrzyni."}
    ],
    relatedLinks: [
      {label: "Usługi", href: "/pl/uslugi"},
      {label: "Chiptuning z automatem", href: "/pl/aktualnosci-blog/chiptuning-z-automatyczna-skrzynia"},
      {label: "Otwórz katalog mocy", href: site.catalogUrl}
    ]
  }),
  published({
    locale: "pl",
    slug: "dpf-egr-adblue-usterka-co-dalej",
    title: "DPF, EGR lub AdBlue — usterka, co dalej?",
    metaTitle: "DPF, EGR lub AdBlue usterka | Diagnostyka i doradztwo",
    metaDescription:
      "Ostrożne wyjaśnienie diagnostyki usterek DPF, EGR i AdBlue: live data, kody błędów, przepisy i indywidualna porada.",
    category: "Diagnostyka",
    readTime: "8 min",
    heroImage: "/images/blog/dpf-egr-adblue-diagnostics.webp",
    intro:
      "Komunikat DPF, EGR lub AdBlue nie powinien być traktowany jak przypadkowa kontrolka. Przyczyna może leżeć w czujnikach, zabrudzeniu, stylu jazdy, wersji oprogramowania, serwisie albo kilku rzeczach naraz.",
    sections: [
      {heading: "Zacznij od kodów i kontekstu", body: ["Kod błędu wskazuje system, ale nie zawsze wskazuje realną przyczynę. Przy AdBlue znaczenie mogą mieć czujniki NOx, ciśnienie, krystalizacja lub grzanie. Przy DPF liczy się obciążenie sadzą, regeneracja i czujniki różnicy ciśnień. Przy EGR ważny bywa przepływ powietrza i pozycja zaworu.", "NoordTune łączy kody błędów, live data, freeze frame i opis sytuacji, w której problem występuje."]},
      {heading: "Jedna usterka nie oznacza jednej odpowiedzi", body: ["Czasem właściwa jest naprawa, czyszczenie lub wymiana czujnika. Czasem potrzebna jest dalsza diagnostyka albo porada dotycząca konkretnego auta. Rozwiązania programowe omawiamy wyłącznie tam, gdzie są technicznie uzasadnione i zgodne z przepisami.", "Nie obiecujemy publicznie uniwersalnych rozwiązań ani identycznego efektu dla każdego pojazdu."], bullets: ["diagnostyka", "analiza usterek", "doradztwo", "przepisy mają znaczenie"]},
      {heading: "Styl jazdy i serwis", body: ["Krótkie trasy, niska temperatura pracy, paliwo, historia napraw i stan silnika wpływają na układy emisji. Samo skasowanie błędu zwykle nie usuwa przyczyny."]},
      {heading: "Kiedy napisać do NoordTune", body: ["Odliczanie AdBlue, tryb awaryjny, częste regeneracje, dymienie, spadek mocy lub powracające błędy warto sprawdzić szybko. Wyślij dane auta i komunikat przez WhatsApp, a podpowiemy następny krok."]}
    ],
    faq: [
      {question: "Czy mogę jeździć z błędem AdBlue?", answer: "To zależy od komunikatu. Niektóre auta po odliczaniu mogą nie uruchomić silnika, dlatego lepiej reagować wcześniej."},
      {question: "Czy błąd DPF zawsze oznacza uszkodzony filtr?", answer: "Nie. Przyczyną mogą być czujniki, styl jazdy, regeneracja lub inne usterki silnika."},
      {question: "Czy oferujecie rozwiązania programowe?", answer: "Tylko wtedy, gdy są technicznie uzasadnione i zgodne z przepisami dla konkretnego auta oraz sytuacji."}
    ],
    relatedLinks: [
      {label: "Diagnostyka samochodowa", href: "/pl/diagnostyka-samochodowa"},
      {label: "Kontakt", href: "/pl/kontakt"},
      {label: "Napisz na WhatsApp", href: site.whatsappUrl}
    ]
  })
];
