"use client";
import {useEffect, useRef, useState} from 'react';
import {catalogEnquiryParams, catalogEnquiryPrefix, parseCatalogEnquiryHash, validCatalogEnquiryContext, type CatalogEnquiryContext, type CatalogEnquiryRef} from '@/lib/catalog-enquiry-contract';
import {trackConversion} from '@/lib/analytics';
import type {Locale} from '@/content/site';
type ImportState = {status: 'none' | 'loading' | 'ready' | 'failed'; context?: CatalogEnquiryContext};

/** Only approved public IDs cross domains. User input and registrations never enter this flow. */
export function useCatalogEnquiry(locale: Locale, anchor: string) {
  const [state, setState] = useState<ImportState>({status: 'none'});
  const original = useRef<{hash: string; ref?: CatalogEnquiryRef} | null>(null);
  const [revision, setRevision] = useState(0);
  useEffect(() => {
    const readIncomingHash = () => {
      const hash = window.location.hash;
      if (!hash.startsWith(catalogEnquiryPrefix)) return;
      original.current = {hash, ref: parseCatalogEnquiryHash(hash)};
      setRevision(value => value + 1);
    };
    window.addEventListener('hashchange', readIncomingHash);
    return () => window.removeEventListener('hashchange', readIncomingHash);
  }, []);
  useEffect(() => {
    // Reuse the parsed reference across React StrictMode effect replays.
    if (!original.current) original.current = {hash: window.location.hash, ref: parseCatalogEnquiryHash(window.location.hash)};
    if (!original.current.hash.startsWith(catalogEnquiryPrefix)) return;
    const ref = original.current.ref;
    window.history.replaceState(window.history.state, '', window.location.pathname + window.location.search + '#' + anchor);
    if (!ref) {setState({status: 'failed'}); return;}
    const controller = new AbortController();
    const timer = window.setTimeout(() => controller.abort('timeout'), 9000);
    let active = true;
    setState({status: 'loading'});
    void (async () => {
      try {
        const response = await fetch('/api/catalog-enquiry?' + catalogEnquiryParams(ref), {signal: controller.signal, credentials: 'same-origin'});
        if (!response.ok) throw new Error('Context not available');
        const data: {context?: unknown} = await response.json();
        if (!validCatalogEnquiryContext(data.context, ref)) throw new Error('Invalid context');
        if (!active) return;
        setState({status: 'ready', context: data.context});
        trackConversion({name: 'catalog_context_loaded', properties: {locale, source: 'catalog_' + ref.kind as 'catalog_manual' | 'catalog_profile' | 'catalog_engine'}});
        window.requestAnimationFrame(() => {
          const target = document.getElementById(anchor);
          const typing = ['INPUT','TEXTAREA','SELECT'].includes(document.activeElement?.tagName ?? '');
          if (target && !typing) target.scrollIntoView({block: 'start', behavior: 'instant'});
        });
      } catch {
        if (!active) return;
        setState({status: 'failed'});
        trackConversion({name: 'catalog_context_failed', properties: {locale, source: 'catalog_' + ref.kind as 'catalog_manual' | 'catalog_profile' | 'catalog_engine'}});
      } finally {window.clearTimeout(timer);}
    })();
    return () => {active = false; window.clearTimeout(timer); controller.abort();};
  }, [locale, anchor, revision]);
  return state;
}
