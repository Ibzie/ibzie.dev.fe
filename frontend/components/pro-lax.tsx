"use client";

import { useTheme } from "./theme-provider";

interface ProLaxTextProps {
  pro: string;
  lax: string;
  className?: string;
}

export function ProLaxText({ pro, lax, className }: ProLaxTextProps) {
  const { theme } = useTheme();
  return (
    <span className={className}>
      {theme === "lax" ? lax : pro}
    </span>
  );
}

interface ProLaxHtmlProps {
  pro: string;
  lax: string;
  className?: string;
}

export function ProLaxHtml({ pro, lax, className }: ProLaxHtmlProps) {
  const { theme } = useTheme();
  const html = theme === "lax" ? lax : pro;
  return (
    <div
      className={className}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

interface ProLaxListProps {
  pro: string[];
  lax: string[];
  itemTemplate: string;
  className?: string;
  itemClassName?: string;
}

export function ProLaxList({
  pro,
  lax,
  itemTemplate,
  className,
  itemClassName,
}: ProLaxListProps) {
  const { theme } = useTheme();
  const items = theme === "lax" ? lax : pro;

  return (
    <div className={className}>
      {items.map((item, i) => {
        const inner = itemTemplate.replace("{{value}}", item);
        return (
          <div
            key={i}
            className={itemClassName}
            dangerouslySetInnerHTML={{ __html: inner }}
          />
        );
      })}
    </div>
  );
}

interface ConditionalProps {
  children: React.ReactNode;
}

export function LaxOnly({ children }: ConditionalProps) {
  const { theme } = useTheme();
  if (theme !== "lax") return null;
  return <>{children}</>;
}

export function ProOnly({ children }: ConditionalProps) {
  const { theme } = useTheme();
  if (theme !== "pro") return null;
  return <>{children}</>;
}
