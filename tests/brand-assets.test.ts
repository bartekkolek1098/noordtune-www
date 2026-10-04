import assert from "node:assert/strict";
import {existsSync, readFileSync, readdirSync} from "node:fs";
import {join} from "node:path";
import {test} from "node:test";
import {latestBlogArticles} from "../src/content/blog-articles";
import {site} from "../src/content/site";
import {articleJsonLd, localBusinessJsonLd} from "../src/lib/seo";

const publicRoot = join(process.cwd(), "public");
const logoUrl = `${site.url}/brand/noordtune-logo-schema.svg`;

function readPublic(path: string) {
  return readFileSync(join(publicRoot, path));
}

function pngDimensions(path: string) {
  const file = readPublic(path);
  assert.equal(file.subarray(1, 4).toString("ascii"), "PNG", `${path} is not a PNG`);
  return {width: file.readUInt32BE(16), height: file.readUInt32BE(20)};
}

function sourceFiles(path: string): string[] {
  return readdirSync(path, {withFileTypes: true}).flatMap((entry) => {
    const entryPath = join(path, entry.name);
    return entry.isDirectory() ? sourceFiles(entryPath) : [entryPath];
  });
}

test("owner-supplied SVG logos preserve the documented variants and intrinsic size", () => {
  const dark = readPublic("brand/noordtune-logo-dark.svg").toString("utf8");
  const schema = readPublic("brand/noordtune-logo-schema.svg").toString("utf8");

  for (const [path, svg] of [
    ["logo-dark.svg", dark],
    ["logo.svg", schema]
  ] as const) {
    assert.match(svg, /<svg[^>]+width="600"[^>]+height="184"[^>]+viewBox="80 72 600 184"/);
    assert.ok(!/<image\b/i.test(svg), `${path} must not embed bitmap artwork`);
    assert.ok(!/<filter\b/i.test(svg), `${path} must not add SVG filters`);
  }

  assert.match(dark, /class="ink" fill="#FFFFFF"/);
  assert.match(schema, /class="ink" fill="#000000"/);
});

test("favicon, Apple and Android assets have the expected dimensions", () => {
  assert.deepEqual(pngDimensions("favicon-16x16.png"), {width: 16, height: 16});
  assert.deepEqual(pngDimensions("favicon-32x32.png"), {width: 32, height: 32});
  assert.deepEqual(pngDimensions("favicon-48x48.png"), {width: 48, height: 48});
  assert.deepEqual(pngDimensions("apple-touch-icon.png"), {width: 180, height: 180});
  assert.deepEqual(pngDimensions("android-chrome-192x192.png"), {width: 192, height: 192});
  assert.deepEqual(pngDimensions("android-chrome-512x512.png"), {width: 512, height: 512});

  const icon = readPublic("favicon.ico");
  assert.equal(icon.readUInt16LE(0), 0);
  assert.equal(icon.readUInt16LE(2), 1);
  const sizes = Array.from({length: icon.readUInt16LE(4)}, (_, index) => {
    const offset = 6 + index * 16;
    return icon.readUInt8(offset) || 256;
  });
  assert.deepEqual(sizes.sort((a, b) => a - b), [16, 24, 32, 48, 64, 128, 256]);
});

test("web manifest and root metadata reference only the supplied web icon set", () => {
  const manifest = JSON.parse(readPublic("site.webmanifest").toString("utf8"));
  assert.deepEqual(manifest, {
    name: "NoordTune.nl",
    short_name: "NoordTune",
    icons: [
      {src: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png"},
      {src: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png"}
    ],
    theme_color: "#111111",
    background_color: "#111111",
    display: "standalone",
    start_url: "/"
  });

  const layout = readFileSync(join(process.cwd(), "src", "app", "layout.tsx"), "utf8");
  for (const path of [
    "/favicon.svg",
    "/favicon-16x16.png",
    "/favicon-32x32.png",
    "/favicon-48x48.png",
    "/favicon.ico",
    "/apple-touch-icon.png",
    "/site.webmanifest"
  ]) {
    assert.ok(layout.includes(path), `Root metadata is missing ${path}`);
  }
  assert.ok(layout.includes('themeColor: "#111111"'));
  assert.ok(!layout.includes("noordtune-icon.png"));
});

test("active components use the dark-background logo without CSS inversion", () => {
  for (const component of ["header.tsx", "mobile-menu.tsx", "footer.tsx"]) {
    const source = readFileSync(join(process.cwd(), "src", "components", component), "utf8");
    assert.ok(source.includes('src="/brand/noordtune-logo-dark.svg"'), `${component} uses the wrong logo`);
    assert.ok(source.includes("width={600}"), `${component} has the wrong intrinsic width`);
    assert.ok(source.includes("height={184}"), `${component} has the wrong intrinsic height`);
    assert.ok(!source.includes("invert"), `${component} must not invert the supplied SVG`);
  }

  const activeSource = sourceFiles(join(process.cwd(), "src"))
    .filter((path) => /\.(?:ts|tsx|css)$/.test(path))
    .map((path) => readFileSync(path, "utf8"))
    .join("\n");
  assert.ok(!activeSource.includes("/brand/noordtune-logo.png"));
  assert.ok(!activeSource.includes("/brand/noordtune-icon.png"));
});

test("structured data uses the stable light-background logo URL and actual dimensions", () => {
  assert.ok(existsSync(join(publicRoot, "brand", "noordtune-logo-schema.svg")));
  const localBusiness = localBusinessJsonLd("nl");
  assert.equal(localBusiness.logo, logoUrl);
  assert.equal(localBusiness.image, logoUrl);

  const article = latestBlogArticles("nl", 1)[0];
  assert.ok(article);
  const articleData = articleJsonLd(article);
  assert.deepEqual(articleData.publisher.logo, {
    "@type": "ImageObject",
    url: logoUrl,
    width: 600,
    height: 184
  });
});

test("brand refresh preserves the frozen Power Catalog destination", () => {
  assert.equal(site.catalogUrl, "https://power.noordtune.nl/");
});
