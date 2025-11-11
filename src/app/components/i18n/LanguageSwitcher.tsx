"use client";

import React from "react";
import { useLang } from "./LangContext";

export default function LanguageSwitcher() {
  const { lang, setLang } = useLang();

  const toggle = () => setLang(lang === "es" ? "en" : "es");
  const title = lang === "es" ? "Cambiar a inglés" : "Switch to Spanish";
  const label = lang === "es" ? "ES" : "EN";

  return (
    <button
      type="button"
      onClick={toggle}
      title={title}
      aria-label={title}
      className="
        fixed top-4 left-4 z-50
        px-4 py-2 text-sm font-[PressStart]
        bg-[#2b2367] text-[#ffd54a]
        border-[6px] border-black rounded-md
        shadow-[0_6px_0_#000] active:translate-y-1 transition-transform
      "
    >
      {label}
    </button>
  );
}
