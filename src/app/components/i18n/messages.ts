// src/app/components/i18n/messages.ts
import es from "../../../messages/es.json";
import en from "../../../messages/en.json";

export type Locale = "es" | "en";

export const MESSAGES = {
  es,
  en,
} as const;

export function getByPath(obj: unknown, path: string): unknown {
  return path.split(".").reduce((acc: any, key) => {
    if (acc && typeof acc === "object" && key in acc) return acc[key];
    return undefined;
  }, obj);
}

export function interpolate(
  text: string,
  vars?: Record<string, string | number>
): string {
  if (!vars) return text;
  return text.replace(/\{(\w+)\}/g, (_, k) =>
    vars[k] !== undefined ? String(vars[k]) : `{${k}}`
  );
}
