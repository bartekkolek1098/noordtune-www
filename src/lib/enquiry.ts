import {enquiryCopy, enquiryServices, type EnquiryService} from "../content/enquiry";
import {site, type Locale} from "../content/site";

export type EnquiryKind = "contact" | "appointment";
export type EnquiryFields = {
  service: string;
  description: string;
  vehicle: string;
  plate: string;
  preferred: string;
};
export type EnquiryErrors = Partial<Record<keyof EnquiryFields, string>>;

export const enquiryLimits = {description: 1000, vehicle: 120, plate: 24, preferred: 100} as const;

function isService(value: string): value is EnquiryService {
  return enquiryServices.some((service) => service === value);
}

export function validateEnquiry(fields: EnquiryFields, locale: Locale, kind: EnquiryKind): EnquiryErrors {
  const copy = enquiryCopy[locale];
  const errors: EnquiryErrors = {};
  if (!isService(fields.service)) errors.service = copy.serviceError;
  if (!fields.description.trim()) errors.description = copy.descriptionError;
  for (const key of Object.keys(enquiryLimits) as Array<keyof typeof enquiryLimits>) {
    if (key === "preferred" && kind !== "appointment") continue;
    if (fields[key].length > enquiryLimits[key]) {
      errors[key] = copy.lengthError.replace("{max}", String(enquiryLimits[key]));
    }
  }
  return errors;
}

export function buildEnquiryMessage(fields: EnquiryFields, locale: Locale, kind: EnquiryKind): string {
  const copy = enquiryCopy[locale];
  const lines = [kind === "appointment" ? copy.appointmentIntro : copy.intro];
  if (isService(fields.service)) lines.push(`${copy.service}: ${copy.services[fields.service]}`);
  for (const key of ["vehicle", "plate", "preferred"] as const) {
    if (key === "preferred" && kind !== "appointment") continue;
    const value = fields[key].trim();
    if (value) lines.push(`${copy[key]}: ${value}`);
  }
  const description = fields.description.replace(/\r\n?/g, "\n").trim();
  if (description) lines.push("", `${copy.description}:`, description);
  return lines.join("\n");
}

export function enquiryWhatsAppUrl(message: string): string {
  const url = new URL(site.whatsappUrl);
  url.searchParams.set("text", message);
  return url.toString();
}
