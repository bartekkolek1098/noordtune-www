"use client";

import {useEffect, useId, useRef, useState, type KeyboardEvent} from "react";
import {enquiryCopy, enquiryServices} from "@/content/enquiry";
import {pathFor, site, type Locale} from "@/content/site";
import {buildEnquiryMessage, enquiryLimits, enquiryWhatsAppUrl, validateEnquiry, type EnquiryErrors, type EnquiryFields, type EnquiryKind} from "@/lib/enquiry";

const inputClass = "w-full min-w-0 rounded-[3px] border border-white/25 bg-black/40 px-3 py-3 text-base text-white outline-none focus-visible:ring-2 focus-visible:ring-primary scroll-mt-28";
const actionClass = "inline-flex min-h-11 items-center justify-center rounded-[3px] border px-4 py-3 text-sm font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black disabled:opacity-60";

export function WhatsAppEnquiry({locale, kind}: {locale: Locale; kind: EnquiryKind}) {
  const copy = enquiryCopy[locale];
  const id = useId();
  const [ready, setReady] = useState(false);
  const [fields, setFields] = useState<EnquiryFields>({service: "", description: "", vehicle: "", plate: "", preferred: ""});
  const [errors, setErrors] = useState<EnquiryErrors>({});
  const [copyStatus, setCopyStatus] = useState<"idle" | "copying" | "copied" | "failed">("idle");
  const revision = useRef(0);
  const preview = useRef<HTMLTextAreaElement>(null);
  const message = buildEnquiryMessage(fields, locale, kind);

  useEffect(() => setReady(true), []);

  function updateField(key: keyof EnquiryFields, value: string) {
    revision.current += 1;
    setFields((current) => ({...current, [key]: value}));
    setErrors((current) => ({...current, [key]: undefined}));
    setCopyStatus("idle");
  }

  function validate() {
    const nextErrors = validateEnquiry(fields, locale, kind);
    setErrors(nextErrors);
    const first = Object.keys(nextErrors)[0];
    if (first) document.getElementById(`${id}-${first}`)?.focus();
    return !first;
  }

  function continueInWhatsApp() {
    if (!validate()) return;
    // Only this explicit action passes the message to an external destination.
    window.open(enquiryWhatsAppUrl(message), "_blank", "noopener,noreferrer");
  }

  function onInputKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter" && !event.nativeEvent.isComposing) {
      event.preventDefault();
      continueInWhatsApp();
    }
  }

  async function copyMessage() {
    if (!validate()) return;
    const currentRevision = ++revision.current;
    setCopyStatus("copying");
    try {
      await navigator.clipboard.writeText(message);
      if (revision.current === currentRevision) setCopyStatus("copied");
    } catch {
      if (revision.current !== currentRevision) return;
      setCopyStatus("failed");
      preview.current?.focus();
      preview.current?.select();
    }
  }

  function errorFor(key: keyof EnquiryFields) {
    return errors[key] ? <p className="mt-2 text-sm text-rose-300" id={`${id}-${key}-error`} role="alert">{errors[key]}</p> : null;
  }

  return (
    <section aria-labelledby={`${id}-title`} className="panel-edge min-w-0 scroll-mt-28 rounded-[3px] p-5 sm:p-6" data-enquiry={kind}>
      <h2 className="racing-title text-2xl text-white sm:text-3xl" id={`${id}-title`}>
        {kind === "appointment" ? copy.appointmentTitle : copy.title}
      </h2>
      <p className="mt-4 text-sm leading-6 text-white/85" id={`${id}-explanation`}>{copy.explanation}</p>
      {/* Deliberately no native form: Enter cannot submit a GET or POST, even before hydration. */}
      <fieldset aria-describedby={`${id}-explanation`} className="mt-5 min-w-0 space-y-4" disabled={!ready}>
        <legend className="sr-only">{kind === "appointment" ? copy.appointmentTitle : copy.title}</legend>
        <div>
          <label className="mb-2 block text-sm font-semibold" htmlFor={`${id}-service`}>{copy.service} <span className="font-normal text-white/65">({copy.required})</span></label>
          <select aria-describedby={errors.service ? `${id}-service-error` : undefined} aria-invalid={!!errors.service} className={inputClass} id={`${id}-service`} onChange={(event) => updateField("service", event.target.value)} required value={fields.service}>
            <option value="">{copy.chooseService}</option>
            {enquiryServices.map((service) => <option key={service} value={service}>{copy.services[service]}</option>)}
          </select>
          {errorFor("service")}
        </div>
        <div>
          <label className="mb-2 block text-sm font-semibold" htmlFor={`${id}-description`}>{copy.description} <span className="font-normal text-white/65">({copy.required})</span></label>
          <textarea aria-describedby={errors.description ? `${id}-description-error` : undefined} aria-invalid={!!errors.description} autoComplete="off" className={inputClass} id={`${id}-description`} maxLength={enquiryLimits.description} onChange={(event) => updateField("description", event.target.value)} required rows={3} value={fields.description} />
          {errorFor("description")}
        </div>
        <div className="grid min-w-0 gap-4 sm:grid-cols-2">
          {(["vehicle", "plate"] as const).map((key) => (
            <div className="min-w-0" key={key}>
              <label className="mb-2 block text-sm font-semibold" htmlFor={`${id}-${key}`}>{copy[key]} <span className="font-normal text-white/65">({copy.optional})</span></label>
              <input aria-describedby={errors[key] ? `${id}-${key}-error` : undefined} aria-invalid={!!errors[key]} autoComplete="off" className={inputClass} id={`${id}-${key}`} maxLength={enquiryLimits[key]} onChange={(event) => updateField(key, event.target.value)} onKeyDown={onInputKeyDown} type="text" value={fields[key]} />
              {errorFor(key)}
            </div>
          ))}
        </div>
        {kind === "appointment" ? (
          <div>
            <label className="mb-2 block text-sm font-semibold" htmlFor={`${id}-preferred`}>{copy.preferred} <span className="font-normal text-white/65">({copy.optional})</span></label>
            <input aria-describedby={`${id}-preferred-hint${errors.preferred ? ` ${id}-preferred-error` : ""}`} aria-invalid={!!errors.preferred} autoComplete="off" className={inputClass} id={`${id}-preferred`} maxLength={enquiryLimits.preferred} onChange={(event) => updateField("preferred", event.target.value)} onKeyDown={onInputKeyDown} type="text" value={fields.preferred} />
            <p className="mt-2 text-sm text-white/65" id={`${id}-preferred-hint`}>{copy.preferredHint}</p>
            {errorFor("preferred")}
          </div>
        ) : null}
        <div className="border-t border-white/15 pt-4">
          <label className="mb-2 block text-sm font-semibold" htmlFor={`${id}-preview`}>{copy.preview}</label>
          <textarea aria-describedby={`${id}-preview-hint`} className={`${inputClass} text-sm leading-6`} id={`${id}-preview`} readOnly ref={preview} rows={6} value={message} />
          <p className="mt-2 text-sm leading-6 text-white/65" id={`${id}-preview-hint`}>{copy.previewHint}</p>
        </div>
        <p className="text-sm leading-6 text-white/75">{copy.handoff} <a className="underline underline-offset-4 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary" href={pathFor(locale, "privacy")} rel="noreferrer" target="_blank">{copy.privacy}</a></p>
        <div className="flex flex-wrap gap-3">
          <button className={`${actionClass} border-primary bg-primary hover:bg-red-700`} onClick={continueInWhatsApp} type="button">{copy.continue}</button>
          <button className={`${actionClass} border-white/30 bg-black/40 hover:border-primary`} disabled={copyStatus === "copying"} onClick={copyMessage} type="button">{copyStatus === "copying" ? copy.copying : copy.copy}</button>
        </div>
        <p aria-live="polite" className="text-sm leading-6 text-white/85" role="status">{copyStatus === "copied" ? copy.copied : copyStatus === "failed" ? copy.copyFailed : ""}</p>
      </fieldset>
      {!ready ? <p className="mt-4 text-sm leading-6 text-white/75">{copy.noScript}</p> : null}
      <div className="mt-5 border-t border-white/15 pt-4 text-sm">
        <p className="font-semibold">{copy.alternatives}</p>
        <div className="mt-2 flex flex-wrap gap-x-5 gap-y-2 [&_a]:min-h-11 [&_a]:py-3 [&_a]:underline [&_a]:underline-offset-4 [&_a]:focus-visible:outline [&_a]:focus-visible:outline-2 [&_a]:focus-visible:outline-primary">
          <a href={`tel:${site.phone.replace(/\s/g, "")}`}>{site.phone}</a>
          <a className="break-all" href={`mailto:${site.email}`}>{site.email}</a>
          <a href={site.whatsappUrl} rel="noreferrer" target="_blank">WhatsApp</a>
        </div>
      </div>
    </section>
  );
}
