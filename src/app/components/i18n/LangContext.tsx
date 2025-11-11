"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Locale, MESSAGES, getByPath, interpolate } from "./messages";

type LangContextValue = {
  lang: Locale;
  setLang: (l: Locale) => void;
  t: (key: string, vars?: Record<string, string | number>) => string;
};

const LangContext = createContext<LangContextValue | null>(null);

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Locale>("es");

  // cargar idioma guardado o preferencia del navegador
  useEffect(() => {
    const saved = (typeof window !== "undefined"
      ? localStorage.getItem("lang")
      : null) as Locale | null;

    if (saved === "es" || saved === "en") {
      setLangState(saved);
      return;
    }

    const nav = typeof navigator !== "undefined" ? navigator.language : "es";
    setLangState(nav.toLowerCase().startsWith("en") ? "en" : "es");
  }, []);

  // guardar cambios
  const setLang = useCallback((l: Locale) => {
    setLangState(l);
    if (typeof window !== "undefined") localStorage.setItem("lang", l);
  }, []);

  // función de traducción
  const t = useCallback(
    (key: string, vars?: Record<string, string | number>) => {
      const dict = MESSAGES[lang] as any;
      const raw = getByPath(dict, key);
      if (typeof raw === "string") return interpolate(raw, vars);
      return key; // si no existe, devolvemos la clave (útil para detectar faltantes)
    },
    [lang]
  );

  const value = useMemo(() => ({ lang, setLang, t }), [lang, setLang, t]);

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used within LangProvider");
  return ctx;
}
