import clsx from "clsx";
import {ArrowRight, MessageCircle} from "lucide-react";
import Link from "next/link";
import type {ReactNode} from "react";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "outline" | "ghost";
  className?: string;
  icon?: "arrow" | "whatsapp" | "none";
};

export const buttonClasses = {
  primary:
    "border-primary bg-primary text-white shadow-[0_0_34px_rgba(227,6,19,.22)] hover:bg-red-700 hover:border-red-500",
  outline:
    "border-white/24 bg-black/42 text-white hover:border-primary hover:text-white hover:bg-primary/14",
  ghost: "border-transparent bg-transparent text-white hover:text-primary"
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className,
  icon = "arrow"
}: ButtonLinkProps) {
  const content = (
    <>
      <span>{children}</span>
      {icon === "arrow" ? <ArrowRight aria-hidden="true" className="h-4 w-4" /> : null}
      {icon === "whatsapp" ? <MessageCircle aria-hidden="true" className="h-4 w-4" /> : null}
    </>
  );
  const classes = clsx(
    "inline-flex min-h-11 items-center justify-center gap-2 rounded-[3px] border px-5 py-3 text-sm font-black uppercase tracking-normal transition focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-black",
    buttonClasses[variant],
    className
  );

  if (href.startsWith("http")) {
    return (
      <a className={classes} href={href} rel="noreferrer" target="_blank">
        {content}
      </a>
    );
  }

  return (
    <Link className={classes} href={href}>
      {content}
    </Link>
  );
}
