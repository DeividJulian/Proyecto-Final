// src/app/components/i18n/messages.ts
import es from "../../../messages/es.json";
import en from "../../../messages/en.json";

export type Locale = "es" | "en";

export const MESSAGES = {
  es,
  en,
} as const;

// Utilidad para obtener valores por clave anidada ("a.b.c")
export function getByPath(obj: any, path: string) {
  return path.split(".").reduce((acc, k) => (acc ? acc[k] : undefined), obj);
}

// Interpolación simple: "Hola {nombre}" + { nombre: "Deivid" }
export function interpolate(input: string, vars?: Record<string, string | number>) {
  if (!vars) return input;
  return input.replace(/\{(\w+)\}/g, (_, k) =>
    Object.prototype.hasOwnProperty.call(vars, k) ? String(vars[k]) : `{${k}}`
  );
}
