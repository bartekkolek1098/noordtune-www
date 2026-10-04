"use client";

import Link from "next/link";
import type {AnchorHTMLAttributes, ReactNode} from "react";
import {trackConversion, type ConversionEvent} from "@/lib/analytics";

type TrackedLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  href: string;
  analytics: ConversionEvent;
  children: ReactNode;
};

export function TrackedLink({analytics, children, href, onClick, ...props}: TrackedLinkProps) {
  function handleClick(event: React.MouseEvent<HTMLAnchorElement>) {
    trackConversion(analytics);
    onClick?.(event);
  }

  const analyticsAttributes = {
    "data-analytics-event": analytics.name,
    "data-analytics-locale": analytics.properties.locale,
    "data-analytics-source": "source" in analytics.properties ? analytics.properties.source : undefined,
    "data-analytics-slug": "slug" in analytics.properties ? analytics.properties.slug : undefined
  };

  if (/^(?:https?:|mailto:|tel:)/.test(href)) {
    return <a {...props} {...analyticsAttributes} href={href} onClick={handleClick}>{children}</a>;
  }

  return <Link {...props} {...analyticsAttributes} href={href} onClick={handleClick}>{children}</Link>;
}
