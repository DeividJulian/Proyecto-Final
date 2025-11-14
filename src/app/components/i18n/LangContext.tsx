// src/app/components/i18n/LangContext.tsx
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

  useEffect(() => {
    const saved = localStorage.getItem("lang") as Locale | null;

    if (saved === "es" || saved === "en") {
      setLangState(saved);
      return;
    }

    const nav = navigator.language.startsWith("en") ? "en" : "es";
    setLangState(nav);
  }, []);

  const setLang = useCallback((value: Locale) => {
    setLangState(value);
    localStorage.setItem("lang", value);
  }, []);

  const t = useCallback(
    (key: string, vars?: Record<string, string | number>) => {
      const dict = MESSAGES[lang];
      const raw = getByPath(dict, key);
      if (typeof raw === "string") return interpolate(raw, vars);
      return key;
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
