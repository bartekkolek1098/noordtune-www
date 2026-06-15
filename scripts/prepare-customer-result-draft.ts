import {mkdir, readFile, writeFile} from "node:fs/promises";
import {basename, join, resolve} from "node:path";

type SourceType = "manual" | "facebook";
type Locale = "nl" | "en" | "pl";

type LocaleNotes = Partial<Record<Locale, string>>;

type CustomerResultIntake = {
  sourceUrl?: string;
  sourceType: SourceType;
  localeNotes?: LocaleNotes;
  vehicleMake: string;
  vehicleModel: string;
  vehicleGeneration?: string;
  vehicleEngine: string;
  vehicleYear?: string;
  fuelType?: string;
  transmission?: string;
  ecu?: string;
  tcu?: string;
  serviceType: string;
  stage: string;
  stockPowerHp?: number;
  stockTorqueNm?: number;
  tunedPowerHp?: number;
  tunedTorqueNm?: number;
  gainPowerHp?: number;
  gainTorqueNm?: number;
  imagePaths: string[];
  mainImagePath?: string;
  licensePlateVisible: boolean;
  licensePlateApproved: boolean;
  customerApproved: boolean;
  certificateAvailable: boolean;
  shortDescription?: string;
  technicalNotes: string[];
  recommendations: string[];
  shouldPublish: boolean;
  shouldIndex: boolean;
  ownerReviewNotes?: string;
};

type PreparedDraft = {
  inputFile: string;
  generatedAt: string;
  suggestedSlug: string;
  missingFields: string[];
  warnings: string[];
  calculated: {
    gainPowerHp?: number;
    gainTorqueNm?: number;
  };
  safety: {
    shouldPublish: boolean;
    shouldIndex: boolean;
    customerApproved: boolean;
    licensePlateVisible: boolean;
    licensePlateApproved: boolean;
  };
  drafts: Array<Record<string, unknown>>;
};

const locales = ["nl", "en", "pl"] as const;
const site = {
  catalogUrl: "https://power.noordtune.nl/",
  whatsappUrl: "https://wa.me/31685759600"
};

function asRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" && !Array.isArray(value) ? value as Record<string, unknown> : {};
}

function asString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function asOptionalString(value: unknown) {
  const text = asString(value);
  return text.length ? text : undefined;
}

function asNumber(value: unknown) {
  return typeof value === "number" && Number.isFinite(value) ? value : undefined;
}

function asBoolean(value: unknown) {
  return typeof value === "boolean" ? value : false;
}

function asStringArray(value: unknown) {
  return Array.isArray(value) ? value.map(asString).filter(Boolean) : [];
}

function asLocaleNotes(value: unknown): LocaleNotes {
  const record = asRecord(value);
  return {
    nl: asOptionalString(record.nl),
    en: asOptionalString(record.en),
    pl: asOptionalString(record.pl)
  };
}

function asSourceType(value: unknown): SourceType {
  return value === "facebook" ? "facebook" : "manual";
}

function normalizeForSlug(value: string) {
  return value.replace(/(\d)\.(\d)/g, "$1$2");
}

function slugify(parts: string[]) {
  return parts
    .map(normalizeForSlug)
    .join(" ")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 96);
}

function calculateGain(stock?: number, tuned?: number, explicitGain?: number) {
  if (typeof explicitGain === "number") {
    return explicitGain;
  }

  if (typeof stock === "number" && typeof tuned === "number") {
    return tuned - stock;
  }

  return undefined;
}

function parseIntake(raw: unknown): CustomerResultIntake {
  const record = asRecord(raw);
  const intake = {
    sourceUrl: asOptionalString(record.sourceUrl),
    sourceType: asSourceType(record.sourceType),
    localeNotes: asLocaleNotes(record.localeNotes),
    vehicleMake: asString(record.vehicleMake),
    vehicleModel: asString(record.vehicleModel),
    vehicleGeneration: asOptionalString(record.vehicleGeneration),
    vehicleEngine: asString(record.vehicleEngine),
    vehicleYear: asOptionalString(record.vehicleYear),
    fuelType: asOptionalString(record.fuelType),
    transmission: asOptionalString(record.transmission),
    ecu: asOptionalString(record.ecu),
    tcu: asOptionalString(record.tcu),
    serviceType: asString(record.serviceType),
    stage: asString(record.stage),
    stockPowerHp: asNumber(record.stockPowerHp),
    stockTorqueNm: asNumber(record.stockTorqueNm),
    tunedPowerHp: asNumber(record.tunedPowerHp),
    tunedTorqueNm: asNumber(record.tunedTorqueNm),
    gainPowerHp: asNumber(record.gainPowerHp),
    gainTorqueNm: asNumber(record.gainTorqueNm),
    imagePaths: asStringArray(record.imagePaths),
    mainImagePath: asOptionalString(record.mainImagePath),
    licensePlateVisible: asBoolean(record.licensePlateVisible),
    licensePlateApproved: asBoolean(record.licensePlateApproved),
    customerApproved: asBoolean(record.customerApproved),
    certificateAvailable: asBoolean(record.certificateAvailable),
    shortDescription: asOptionalString(record.shortDescription),
    technicalNotes: asStringArray(record.technicalNotes),
    recommendations: asStringArray(record.recommendations),
    shouldPublish: asBoolean(record.shouldPublish),
    shouldIndex: asBoolean(record.shouldIndex),
    ownerReviewNotes: asOptionalString(record.ownerReviewNotes)
  } satisfies CustomerResultIntake;

  intake.gainPowerHp = calculateGain(intake.stockPowerHp, intake.tunedPowerHp, intake.gainPowerHp);
  intake.gainTorqueNm = calculateGain(intake.stockTorqueNm, intake.tunedTorqueNm, intake.gainTorqueNm);

  return intake;
}

function missingFields(intake: CustomerResultIntake) {
  const required: Array<[string, unknown]> = [
    ["sourceType", intake.sourceType],
    ["vehicleMake", intake.vehicleMake],
    ["vehicleModel", intake.vehicleModel],
    ["vehicleEngine", intake.vehicleEngine],
    ["serviceType", intake.serviceType],
    ["stage", intake.stage]
  ];

  if (intake.sourceType === "facebook") {
    required.push(["sourceUrl", intake.sourceUrl]);
  }

  return required.filter(([, value]) => !value).map(([field]) => field);
}

function warningsFor(intake: CustomerResultIntake, missing: string[]) {
  const warnings: string[] = [];

  if (missing.length) {
    warnings.push(`Missing required fields: ${missing.join(", ")}`);
  }

  if (!intake.customerApproved) {
    warnings.push("customerApproved is false; keep this result draft/non-indexable.");
  }

  if (intake.licensePlateVisible && !intake.licensePlateApproved) {
    warnings.push("licensePlateVisible is true but licensePlateApproved is false.");
  }

  if (intake.shouldPublish && !intake.customerApproved) {
    warnings.push("shouldPublish is true but customerApproved is false.");
  }

  if (intake.shouldPublish && intake.licensePlateVisible && !intake.licensePlateApproved) {
    warnings.push("shouldPublish is true but visible plate approval is missing.");
  }

  if (intake.shouldPublish && !intake.mainImagePath && intake.imagePaths.length === 0) {
    warnings.push("shouldPublish is true but no approved image path is provided.");
  }

  if (intake.shouldIndex && !intake.shouldPublish) {
    warnings.push("shouldIndex is true but shouldPublish is false.");
  }

  if (intake.shouldIndex && !intake.customerApproved) {
    warnings.push("shouldIndex is true but customerApproved is false.");
  }

  if (!intake.mainImagePath && intake.imagePaths.length === 0) {
    warnings.push("No image path provided; add an owner-approved local image before publication.");
  }

  return warnings;
}

function titleFor(locale: Locale, intake: CustomerResultIntake) {
  const vehicle = `${intake.vehicleMake} ${intake.vehicleModel} ${intake.vehicleGeneration ?? ""} ${intake.vehicleEngine}`.replace(/\s+/g, " ").trim();
  if (locale === "nl") {
    return `${vehicle} ${intake.stage} klantresultaat`;
  }
  if (locale === "en") {
    return `${vehicle} ${intake.stage} customer result`;
  }
  return `${vehicle} ${intake.stage} — realizacja klienta`;
}

function fallbackDescription(locale: Locale, intake: CustomerResultIntake) {
  const vehicle = `${intake.vehicleMake} ${intake.vehicleModel} ${intake.vehicleGeneration ?? ""} ${intake.vehicleEngine}`.replace(/\s+/g, " ").trim();
  if (locale === "nl") {
    return `Draft klantresultaat voor ${vehicle}. Schrijf definitieve Nederlandse copy en laat de eigenaar privacy, beeld en publicatie goedkeuren.`;
  }
  if (locale === "en") {
    return `Draft customer result for ${vehicle}. Rewrite final English copy and confirm owner approval, privacy and image rights before publishing.`;
  }
  return `Szkic realizacji klienta dla ${vehicle}. Przygotuj finalny tekst po polsku i potwierdź zgodę właściciela, prywatność oraz prawa do zdjęć przed publikacją.`;
}

function imageAlt(locale: Locale, intake: CustomerResultIntake) {
  const vehicle = `${intake.vehicleMake} ${intake.vehicleModel} ${intake.vehicleGeneration ?? ""} ${intake.vehicleEngine}`.replace(/\s+/g, " ").trim();
  if (locale === "nl") {
    return `${vehicle} ${intake.stage} resultaat bij NoordTune.nl`;
  }
  if (locale === "en") {
    return `${vehicle} ${intake.stage} result at NoordTune.nl`;
  }
  return `${vehicle} ${intake.stage} — wynik realizacji w NoordTune.nl`;
}

function disclaimer(locale: Locale) {
  if (locale === "nl") {
    return "Draft. Resultaten zijn voertuigafhankelijk en moeten voor publicatie worden gecontroleerd op juistheid, privacy en toestemming.";
  }
  if (locale === "en") {
    return "Draft. Results are vehicle-specific and must be reviewed for accuracy, privacy and approval before publication.";
  }
  return "Szkic. Wyniki zależą od konkretnego auta i przed publikacją muszą zostać sprawdzone pod kątem poprawności, prywatności oraz zgód.";
}

function buildDraft(locale: Locale, intake: CustomerResultIntake, slug: string, warnings: string[]) {
  const allNotes = [...intake.technicalNotes, ...intake.recommendations];
  return {
    id: `${intake.sourceType}-draft-${slug}-${locale}`,
    locale,
    slug,
    title: titleFor(locale, intake),
    source: intake.sourceType,
    sourceUrl: intake.sourceUrl,
    status: "draft",
    indexable: false,
    vehicleMake: intake.vehicleMake,
    vehicleModel: intake.vehicleModel,
    vehicleGeneration: intake.vehicleGeneration,
    vehicleEngine: intake.vehicleEngine,
    vehicleYear: intake.vehicleYear,
    transmission: intake.transmission,
    ecu: intake.ecu,
    tcu: intake.tcu,
    serviceType: intake.serviceType,
    stage: intake.stage,
    fuelType: intake.fuelType,
    stockPowerHp: intake.stockPowerHp ?? 0,
    stockTorqueNm: intake.stockTorqueNm ?? 0,
    tunedPowerHp: intake.tunedPowerHp ?? 0,
    tunedTorqueNm: intake.tunedTorqueNm ?? 0,
    gainPowerHp: intake.gainPowerHp ?? 0,
    gainTorqueNm: intake.gainTorqueNm ?? 0,
    licensePlateVisible: intake.licensePlateVisible,
    images: intake.mainImagePath ? [intake.mainImagePath] : intake.imagePaths.slice(0, 1),
    imageAlt: imageAlt(locale, intake),
    shortDescription: intake.shortDescription ?? fallbackDescription(locale, intake),
    technicalNotes: allNotes.length ? allNotes : ["Draft imported from owner intake", "Owner/admin review required before publication"],
    customerApproved: intake.customerApproved,
    certificateAvailable: intake.certificateAvailable,
    publishedAt: new Date().toISOString().slice(0, 10),
    updatedAt: new Date().toISOString().slice(0, 10),
    disclaimer: disclaimer(locale),
    relatedPowerCatalogUrl: site.catalogUrl,
    whatsappCta: site.whatsappUrl,
    draftNotes: [
      "Generated by scripts/prepare-customer-result-draft.ts.",
      "Do not publish automatically.",
      "Manually review and rewrite localized copy before adding to src/content/customer-results.ts.",
      "Publication still requires status: published, indexable: true, customerApproved: true and owner-approved images.",
      intake.localeNotes?.[locale] ? `Locale note: ${intake.localeNotes[locale]}` : "Add locale-specific final wording.",
      intake.ownerReviewNotes ? `Owner review notes: ${intake.ownerReviewNotes}` : "Add owner review notes.",
      ...warnings
    ]
  };
}

function prepareDraft(inputFile: string, intake: CustomerResultIntake): PreparedDraft {
  const slug = slugify([
    intake.vehicleMake,
    intake.vehicleModel,
    intake.vehicleGeneration ?? "",
    intake.vehicleEngine,
    intake.stage
  ]);
  const missing = missingFields(intake);
  const warnings = warningsFor(intake, missing);

  return {
    inputFile,
    generatedAt: new Date().toISOString(),
    suggestedSlug: slug,
    missingFields: missing,
    warnings,
    calculated: {
      gainPowerHp: intake.gainPowerHp,
      gainTorqueNm: intake.gainTorqueNm
    },
    safety: {
      shouldPublish: intake.shouldPublish,
      shouldIndex: intake.shouldIndex,
      customerApproved: intake.customerApproved,
      licensePlateVisible: intake.licensePlateVisible,
      licensePlateApproved: intake.licensePlateApproved
    },
    drafts: locales.map((locale) => buildDraft(locale, intake, slug, warnings))
  };
}

function getArgValue(name: string) {
  const prefix = `${name}=`;
  return process.argv.find((arg) => arg.startsWith(prefix))?.slice(prefix.length);
}

function inputFiles() {
  const explicitInput = getArgValue("--input");
  const positional = process.argv.slice(2).filter((arg) => !arg.startsWith("--"));
  return explicitInput ? [explicitInput] : positional;
}

async function main() {
  const inputs = inputFiles();
  if (inputs.length === 0) {
    throw new Error("Provide at least one intake JSON file, for example: tsx scripts/prepare-customer-result-draft.ts data/customer-result-intake.bmw-x3-example.json");
  }

  const write = process.argv.includes("--write");
  const outDir = resolve(getArgValue("--out-dir") ?? "data/customer-result-drafts");
  const outputs: PreparedDraft[] = [];

  for (const input of inputs) {
    const inputPath = resolve(input);
    const raw = JSON.parse(await readFile(inputPath, "utf8")) as unknown;
    const intake = parseIntake(raw);
    const prepared = prepareDraft(input, intake);

    if (prepared.missingFields.length > 0) {
      throw new Error(`${input} is missing required fields: ${prepared.missingFields.join(", ")}`);
    }

    outputs.push(prepared);

    if (write) {
      await mkdir(outDir, {recursive: true});
      const outPath = join(outDir, `${prepared.suggestedSlug || basename(input, ".json")}.draft.json`);
      await writeFile(outPath, `${JSON.stringify(prepared, null, 2)}\n`, "utf8");
      console.error(`Wrote draft JSON: ${outPath}`);
    }
  }

  console.log(JSON.stringify({drafts: outputs}, null, 2));
  if (!write) {
    console.error("Dry run only. Use --write to save draft JSON under data/customer-result-drafts/.");
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
