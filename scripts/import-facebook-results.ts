import {mkdir, readFile, writeFile} from "node:fs/promises";
import {dirname, resolve} from "node:path";

type Locale = "nl" | "en" | "pl";

type ImportImage = {
  sourcePath: string;
  approvedForWebsite?: boolean;
  licensePlateVisible?: boolean;
  licensePlateApproved?: boolean;
  alt?: string;
};

type FacebookResultPost = {
  facebookPostUrl: string;
  locale?: Locale;
  vehicleMake: string;
  vehicleModel: string;
  vehicleGeneration?: string;
  vehicleEngine: string;
  vehicleYear?: string;
  transmission?: string;
  ecu?: string;
  tcu?: string;
  fuelType?: string;
  serviceType: string;
  stage: string;
  stockPowerHp?: number;
  stockTorqueNm?: number;
  tunedPowerHp?: number;
  tunedTorqueNm?: number;
  gainPowerHp?: number;
  gainTorqueNm?: number;
  shortDescription?: string;
  technicalNotes?: string[];
  images?: ImportImage[];
  customerApproved?: boolean;
  certificateAvailable?: boolean;
  certificateNote?: string;
  languageNotes?: string;
};

type ImportFile = {
  posts: FacebookResultPost[];
};

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
  return text.length > 0 ? text : undefined;
}

function asNumber(value: unknown) {
  return typeof value === "number" && Number.isFinite(value) ? value : undefined;
}

function asBoolean(value: unknown) {
  return typeof value === "boolean" ? value : undefined;
}

function asStringArray(value: unknown) {
  return Array.isArray(value) ? value.map(asString).filter(Boolean) : [];
}

function asImages(value: unknown): ImportImage[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.map((item) => {
    const record = asRecord(item);
    return {
      sourcePath: asString(record.sourcePath),
      approvedForWebsite: asBoolean(record.approvedForWebsite) ?? false,
      licensePlateVisible: asBoolean(record.licensePlateVisible) ?? false,
      licensePlateApproved: asBoolean(record.licensePlateApproved) ?? false,
      alt: asOptionalString(record.alt)
    };
  }).filter((image) => image.sourcePath);
}

function toLocale(value: unknown): Locale {
  return value === "en" || value === "pl" || value === "nl" ? value : "nl";
}

function slugify(parts: string[]) {
  return parts
    .join(" ")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 96);
}

function parseImportFile(raw: unknown): ImportFile {
  const record = asRecord(raw);
  if (!Array.isArray(record.posts)) {
    throw new Error("Import JSON must contain a top-level posts array.");
  }

  return {
    posts: record.posts.map((item) => {
      const post = asRecord(item);
      return {
        facebookPostUrl: asString(post.facebookPostUrl),
        locale: toLocale(post.locale),
        vehicleMake: asString(post.vehicleMake),
        vehicleModel: asString(post.vehicleModel),
        vehicleGeneration: asOptionalString(post.vehicleGeneration),
        vehicleEngine: asString(post.vehicleEngine),
        vehicleYear: asOptionalString(post.vehicleYear),
        transmission: asOptionalString(post.transmission),
        ecu: asOptionalString(post.ecu),
        tcu: asOptionalString(post.tcu),
        fuelType: asOptionalString(post.fuelType),
        serviceType: asString(post.serviceType),
        stage: asString(post.stage),
        stockPowerHp: asNumber(post.stockPowerHp),
        stockTorqueNm: asNumber(post.stockTorqueNm),
        tunedPowerHp: asNumber(post.tunedPowerHp),
        tunedTorqueNm: asNumber(post.tunedTorqueNm),
        gainPowerHp: asNumber(post.gainPowerHp),
        gainTorqueNm: asNumber(post.gainTorqueNm),
        shortDescription: asOptionalString(post.shortDescription),
        technicalNotes: asStringArray(post.technicalNotes),
        images: asImages(post.images),
        customerApproved: asBoolean(post.customerApproved) ?? false,
        certificateAvailable: asBoolean(post.certificateAvailable) ?? false,
        certificateNote: asOptionalString(post.certificateNote),
        languageNotes: asOptionalString(post.languageNotes)
      };
    })
  };
}

function validatePost(post: FacebookResultPost, index: number) {
  const missing = [
    ["facebookPostUrl", post.facebookPostUrl],
    ["vehicleMake", post.vehicleMake],
    ["vehicleModel", post.vehicleModel],
    ["vehicleEngine", post.vehicleEngine],
    ["serviceType", post.serviceType],
    ["stage", post.stage]
  ].filter(([, value]) => !value).map(([field]) => field);

  if (missing.length > 0) {
    throw new Error(`Post ${index + 1} is missing required fields: ${missing.join(", ")}`);
  }

  if (!post.facebookPostUrl.startsWith("https://")) {
    throw new Error(`Post ${index + 1} facebookPostUrl must be an https URL.`);
  }
}

function toDraftCustomerResult(post: FacebookResultPost, index: number) {
  validatePost(post, index);

  const slug = slugify([
    post.vehicleMake,
    post.vehicleModel,
    post.vehicleGeneration ?? "",
    post.vehicleEngine,
    post.stage
  ]);
  const hasApprovedPlate = post.images?.some((image) => image.licensePlateVisible && image.licensePlateApproved) ?? false;

  return {
    id: `facebook-draft-${slug}-${post.locale ?? "nl"}`,
    locale: post.locale ?? "nl",
    slug,
    source: "facebook",
    sourceUrl: post.facebookPostUrl,
    status: "draft",
    indexable: false,
    vehicleMake: post.vehicleMake,
    vehicleModel: post.vehicleModel,
    vehicleGeneration: post.vehicleGeneration,
    vehicleEngine: post.vehicleEngine,
    vehicleYear: post.vehicleYear,
    transmission: post.transmission,
    ecu: post.ecu,
    tcu: post.tcu,
    serviceType: post.serviceType,
    stage: post.stage,
    fuelType: post.fuelType,
    stockPowerHp: post.stockPowerHp ?? 0,
    stockTorqueNm: post.stockTorqueNm ?? 0,
    tunedPowerHp: post.tunedPowerHp ?? 0,
    tunedTorqueNm: post.tunedTorqueNm ?? 0,
    gainPowerHp: post.gainPowerHp ?? 0,
    gainTorqueNm: post.gainTorqueNm ?? 0,
    licensePlateVisible: hasApprovedPlate,
    images: [],
    imageAlt: post.images?.find((image) => image.alt)?.alt ?? `${post.vehicleMake} ${post.vehicleModel} ${post.stage} customer result`,
    shortDescription: post.shortDescription ?? "Draft imported from a Facebook-style result post. Rewrite before publication.",
    technicalNotes: post.technicalNotes?.length ? post.technicalNotes : ["Draft imported from Facebook-style source", "Owner/admin review required before publication"],
    customerApproved: false,
    certificateAvailable: post.certificateAvailable ?? false,
    certificateNote: post.certificateNote,
    publishedAt: new Date().toISOString().slice(0, 10),
    updatedAt: new Date().toISOString().slice(0, 10),
    disclaimer: "Draft only. Add localized vehicle-specific disclaimer before publication.",
    relatedPowerCatalogUrl: site.catalogUrl,
    whatsappCta: site.whatsappUrl,
    draftNotes: [
      "Imported as draft only.",
      "Do not publish automatically.",
      "Confirm customer approval, image rights, visible plate approval and final copy.",
      "Download/store approved images manually; this script does not fetch Facebook media.",
      post.languageNotes ? `Language notes: ${post.languageNotes}` : "Add NL/EN/PL language notes before publication."
    ]
  };
}

function getArg(name: string) {
  const value = process.argv.find((arg) => arg.startsWith(`${name}=`));
  return value?.slice(name.length + 1);
}

async function main() {
  const inputPath = resolve(getArg("--input") ?? "data/facebook-result-import.example.json");
  const write = process.argv.includes("--write");
  const outPath = resolve(getArg("--out") ?? "data/facebook-result-import.drafts.json");
  const raw = JSON.parse(await readFile(inputPath, "utf8")) as unknown;
  const importFile = parseImportFile(raw);
  const drafts = importFile.posts.map(toDraftCustomerResult);
  const output = JSON.stringify({drafts}, null, 2);

  if (write) {
    await mkdir(dirname(outPath), {recursive: true});
    await writeFile(outPath, `${output}\n`, "utf8");
    console.log(`Wrote draft customer results to ${outPath}`);
    return;
  }

  console.log(output);
  console.error("Dry run only. Use --write --out=data/facebook-result-import.drafts.json to write draft JSON.");
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
