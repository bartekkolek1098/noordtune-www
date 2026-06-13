import {readFile} from "node:fs/promises";
import {join} from "node:path";

type Check = {
  file: string;
  pattern: RegExp;
  message: string;
};

const root = process.cwd();

const files = [
  "src/content/copy.ts",
  "src/content/site.ts",
  "src/content/seo-landings.ts",
  "src/components/power-catalog-section.tsx",
  "src/components/cta-section.tsx",
  "src/components/page-renderers.tsx",
  "src/components/seo-landing-renderer.tsx",
  "src/components/footer.tsx",
  "src/components/cards.tsx"
];

const polishFiles = [
  "src/content/copy.ts",
  "src/components/power-catalog-section.tsx",
  "src/components/cta-section.tsx",
  "src/components/page-renderers.tsx",
  "src/components/seo-landing-renderer.tsx",
  "src/components/footer.tsx",
  "src/components/cards.tsx"
];

const checks: Check[] = [
  {file: "src/content/copy.ts", pattern: /\bWiecej\b|\bWIECEJ\b|\bWiecej\b/i, message: "Polish copy contains unaccented 'wiecej'."},
  {file: "src/content/copy.ts", pattern: /\bOsiagi\b|\bOSIAGI\b|\bosiagi\b/, message: "Polish copy contains unaccented 'osiagi'."},
  {file: "src/content/copy.ts", pattern: /\bWyslij\b|\bwyslij\b|\bWYSLIJ\b/, message: "Polish copy contains unaccented 'wyslij'."},
  {file: "src/content/copy.ts", pattern: /\bOtworz\b|\botworz\b|\bOTWORZ\b/, message: "Polish copy contains unaccented 'otworz'."},
  {file: "src/content/copy.ts", pattern: /\bZamowienie\b|\bzamowienie\b|\bZAMOWIENIE\b/, message: "Polish copy contains unaccented 'zamowienie'."},
  {file: "src/content/copy.ts", pattern: /Diagnostyka auta|DIAGNOSTYKA AUTA/, message: "Polish copy uses the weak phrase 'diagnostyka auta'."},
  {file: "src/content/copy.ts", pattern: /lepsza jazde|LEPSZA JAZDE/i, message: "Polish copy contains unaccented 'lepsza jazde'."},
  {file: "src/components/power-catalog-section.tsx", pattern: /pl:\s*{[\s\S]*?(Open Power Catalog|Ask via WhatsApp|Zapytaj przez WhatsApp)[\s\S]*?}/, message: "Power Catalog component contains mixed-language Polish CTA leftovers."},
  {file: "src/components/cta-section.tsx", pattern: /Otworz|Napisz WhatsApp|OPEN POWER CATALOG|CHECK TUNING OPTIONS/, message: "Final CTA contains wrong-language or unaccented labels."},
  {file: "src/components/page-renderers.tsx", pattern: /Sprawdz auto|Napisz WhatsApp|WhatsApp us|Open catalogus|Open catalog"/, message: "Page renderer contains mixed or unaccented CTA labels."},
  {file: "src/components/footer.tsx", pattern: /Gotowy na lepsza|Sprawdz auto|wyslij|Open Power Catalog[\s\S]*pl/, message: "Footer contains Polish/English CTA leftovers."},
  {file: "src/components/cards.tsx", pattern: /Wiecej|Najczesciej/, message: "Cards contain unaccented Polish labels."},
  {file: "src/components/seo-landing-renderer.tsx", pattern: /Uzyj|Wyslij|Najczestsze|Powiazane/, message: "SEO landing renderer contains unaccented Polish labels."}
];

const requiredLabels = [
  "Vermogen berekenen",
  "Open Power Catalog",
  "WhatsApp ons",
  "Plan een afspraak",
  "Check tuning options",
  "Message us on WhatsApp",
  "Book an appointment",
  "Sprawdź możliwości auta",
  "Otwórz katalog mocy",
  "Napisz na WhatsApp",
  "Umów wizytę",
  "Sprawdź auto w katalogu"
];

function stripRouteBlocks(source: string) {
  return source
    .replace(/pl:\s*"(?:uslugi|rezultaty|aktualnosci-blog|polityka-prywatnosci)"/g, "")
    .replace(/\/pl\/(?:uslugi|rezultaty|aktualnosci-blog|polityka-prywatnosci)/g, "");
}

async function readUtf8(file: string) {
  const bytes = await readFile(join(root, file));
  const decoder = new TextDecoder("utf-8", {fatal: true});
  return decoder.decode(bytes);
}

async function main() {
  const failures: string[] = [];
  const contents = new Map<string, string>();

  for (const file of files) {
    try {
      contents.set(file, await readUtf8(file));
    } catch (error) {
      failures.push(`${file}: not valid UTF-8 (${error instanceof Error ? error.message : String(error)})`);
    }
  }

  for (const check of checks) {
    const source = contents.get(check.file);
    if (!source) {
      continue;
    }
    const searchable = polishFiles.includes(check.file) ? stripRouteBlocks(source) : source;
    if (check.pattern.test(searchable)) {
      failures.push(`${check.file}: ${check.message}`);
    }
  }

  const allSource = Array.from(contents.values()).join("\n");
  for (const label of requiredLabels) {
    if (!allSource.includes(label)) {
      failures.push(`Missing required CTA label: ${label}`);
    }
  }

  const polishVisibleSource = polishFiles.map((file) => stripRouteBlocks(contents.get(file) ?? "")).join("\n");
  for (const englishCta of ["OPEN POWER CATALOG", "MESSAGE US", "CHECK TUNING OPTIONS"]) {
    if (polishVisibleSource.includes(englishCta)) {
      failures.push(`Polish visible content contains English CTA: ${englishCta}`);
    }
  }

  if (failures.length > 0) {
    console.error("Content audit failed:");
    for (const failure of failures) {
      console.error(`- ${failure}`);
    }
    process.exit(1);
  }

  console.log("Content audit passed.");
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
