import assert from "node:assert/strict";
import {test} from "node:test";
import {enquiryCopy, enquiryServices} from "../src/content/enquiry";
import {locales, site} from "../src/content/site";
import {buildEnquiryMessage, enquiryLimits, enquiryWhatsAppUrl, validateEnquiry, type EnquiryFields} from "../src/lib/enquiry";

const empty: EnquiryFields = {service: "", description: "", vehicle: "", plate: "", preferred: ""};

test("service and a non-whitespace description are required; optional fields are not", () => {
  assert.deepEqual(Object.keys(validateEnquiry(empty, "en", "contact")), ["service", "description"]);
  for (const description of ["", "  ", "\n\t\r\n", "\u00a0"]) {
    assert.ok(validateEnquiry({...empty, service: "ecu", description}, "pl", "appointment").description);
  }
  for (const service of ["", "invalid", "constructor", "__proto__"]) {
    assert.ok(validateEnquiry({...empty, service, description: "Synthetic enquiry"}, "nl", "contact").service);
  }
  for (const service of enquiryServices) {
    assert.deepEqual(validateEnquiry({...empty, service, description: "Synthetic enquiry"}, "en", "appointment"), {});
  }
});

test("all text limits are enforced at the boundary", () => {
  for (const key of Object.keys(enquiryLimits) as Array<keyof typeof enquiryLimits>) {
    const fields = {...empty, service: "ecu", description: "Synthetic enquiry", [key]: "x".repeat(enquiryLimits[key])};
    assert.deepEqual(validateEnquiry(fields, "en", "appointment"), {});
    fields[key] += "x";
    assert.ok(validateEnquiry(fields, "en", "appointment")[key]);
  }
});

const expected = {
  nl: ["Hallo NoordTune, ik heb een vraag.", "Dienst: Diagnose", "Korte omschrijving van je vraag:"],
  en: ["Hello NoordTune, I have an enquiry.", "Service: Diagnostics", "Brief description of your request:"],
  pl: ["Dzień dobry NoordTune, mam pytanie.", "Usługa: Diagnostyka", "Krótki opis zapytania:"]
};

for (const locale of locales) {
  test(`${locale}: readable localized message and omitted optional fields`, () => {
    const fields = {...empty, service: "diagnostics", description: "  SYNTHETIC & + #\r\nZażółć gęślą jaźń  ", vehicle: " \t ", plate: "\n", preferred: "  "};
    const [intro, service, description] = expected[locale];
    assert.equal(buildEnquiryMessage(fields, locale, "contact"), `${intro}\n${service}\n\n${description}\nSYNTHETIC & + #\nZażółć gęślą jaźń`);
    assert.deepEqual(validateEnquiry(fields, locale, "contact"), {});
  });

  test(`${locale}: appointment preferences only appear on appointment enquiries`, () => {
    const fields = {...empty, service: "tcu", description: "Synthetic gearbox enquiry", vehicle: " Test car 2.0 ", plate: " TEST-ONLY ", preferred: " Weekday afternoon "};
    const message = buildEnquiryMessage(fields, locale, "appointment");
    assert.ok(message.startsWith(enquiryCopy[locale].appointmentIntro));
    assert.ok(message.includes(`${enquiryCopy[locale].vehicle}: Test car 2.0`));
    assert.ok(message.includes(`${enquiryCopy[locale].plate}: TEST-ONLY`));
    assert.ok(message.includes(`${enquiryCopy[locale].preferred}: Weekday afternoon`));
    assert.ok(!buildEnquiryMessage(fields, locale, "contact").includes("Weekday afternoon"));
  });

  test(`${locale}: WhatsApp URL round-trips Unicode, symbols and newlines to the configured recipient`, () => {
    const message = buildEnquiryMessage({...empty, service: "advice", description: "SYNTHETIC & + # ? = %\nZażółć gęślą jaźń 🚗"}, locale, "contact");
    const url = new URL(enquiryWhatsAppUrl(message));
    assert.equal(url.origin + url.pathname, site.whatsappUrl);
    assert.equal(url.searchParams.get("text"), message);
    assert.equal(url.hash, "");
    assert.deepEqual([...url.searchParams.keys()], ["text"]);
  });
}
