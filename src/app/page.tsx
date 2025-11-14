"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import LanguageSwitcher from "./components/i18n/LanguageSwitcher";
import { useLang } from "./components/i18n/LangContext";

type Theme = "light" | "dark";

export default function Home() {
  const { t } = useLang();

  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const saved = (typeof window !== "undefined" ? localStorage.getItem("theme") : null) as
      | Theme
      | null;
    if (saved === "light" || saved === "dark") {
      setTheme(saved);
      return;
    }
    const prefersDark =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    setTheme(prefersDark ? "dark" : "light");
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") localStorage.setItem("theme", theme);
  }, [theme]);

  const isDark = theme === "dark";
  const bgUrl = isDark ? "/assets/modo-oscuro.jpg" : "/assets/bg-city.png";

  return (
    <main className="relative min-h-[100svh] overflow-x-hidden">
      {/* Fondo */}
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center transition-all duration-700 ease-in-out"
        style={{ backgroundImage: `url(${bgUrl})` }}
        aria-hidden
      />

      {/* ===== CONTROLES FIJOS SOLO EN DESKTOP ===== */}
      <div className="hidden lg:block fixed top-3 left-3 z-40">
        <LanguageSwitcher />
      </div>
      <ThemeToggle
        isDark={isDark}
        onToggle={() => setTheme(isDark ? "light" : "dark")}
        labelLight={isDark ? "Tema claro" : "Switch to dark"}
        labelDark={isDark ? "Tema claro" : "Switch to dark"}
        className="hidden lg:block fixed top-3 right-3 z-50"
      />

      {/* Contenido */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-6 pb-8">
        {/* En móvil es columna centrada; en desktop se convierte en grid */}
        <div className="flex flex-col items-center gap-6 lg:grid lg:grid-cols-[minmax(420px,540px)_1fr] lg:items-start lg:gap-8">
          {/* Columna izquierda (greeting + controles mobile + avatar mobile + botones) */}
          <section className="w-full flex flex-col items-center lg:items-start">
            {/* Cartel de saludo */}
            <div
              className={`w-full max-w-sm sm:max-w-md lg:max-w-[540px] border-8 border-black shadow-[0_10px_0_#000] rounded-md ${
                isDark ? "bg-[#101b2a] text-[#e5ff7a]" : "bg-[#31256c] text-yellow-300"
              }`}
            >
              <p className="px-4 py-3 text-[12px] sm:text-[14px] md:text-[16px] leading-snug font-[PressStart] text-center sm:text-left">
                {t("home.greeting")}
              </p>
            </div>

            {/* ===== CONTROLES DE IDIOMA / TEMA SOLO EN MÓVIL (debajo del cartel) ===== */}
            <div className="mt-4 flex items-center justify-center gap-4 lg:hidden">
              <div className="scale-[0.85] origin-center -mt--15">
                <LanguageSwitcher />
              </div>
              <ThemeToggle
                isDark={isDark}
                onToggle={() => setTheme(isDark ? "light" : "dark")}
                labelLight={isDark ? "Tema claro" : "Switch to dark"}
                labelDark={isDark ? "Tema claro" : "Switch to dark"}
                className="scale-[0.85] ml-80"
              />
            </div>

            {/* Avatar centrado SOLO en móvil */}
            <div className="mt-6 lg:hidden">
              <Image
                src="/assets/avatar-parado.png"
                alt="Avatar"
                width={220}
                height={220}
                priority
                style={{ imageRendering: "pixelated" }}
                className="select-none mx-auto animate-bob"
              />
            </div>

            {/* Botones debajo del avatar en móvil, al lado en desktop */}
            <div className="mt-6 space-y-3 w-full max-w-sm sm:max-w-md lg:max-w-[540px]">
              <PixelButton href="/mapa" label={t("common.start")} isDark={isDark} />
              <PixelButton href="/proyectos" label={t("common.projects")} isDark={isDark} />
              <PixelButton href="/acerca" label={t("common.about")} isDark={isDark} />
              <PixelButton href="/opiniones" label={t("common.reviews")} isDark={isDark} />
              <PixelButton href="/timeline" label={t("common.timeline")} isDark={isDark} />
            </div>
          </section>

          {/* Columna derecha: nombre y avatar solo en pantallas grandes */}
          <section className="relative justify-self-center lg:justify-self-end mt-2 lg:mt-0 pt-24 hidden lg:block">
            {/* Cartel nombre flotando encima del avatar SOLO en desktop */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 z-20 w-[min(300px,70vw)]">
              <div className="animate-name-bob">
                <div
                  className={`w-full text-center border-8 border-black rounded-md px-3 py-2 shadow-[0_12px_0_#000] text-[16px] leading-tight ${
                    isDark ? "bg-[#101b2a] text-[#e5ff7a]" : "bg-[#31256c] text-yellow-300"
                  }`}
                >
                  <span className="block font-[PressStart]">{t("home.name")}</span>
                </div>
              </div>
            </div>

            {/* Avatar para desktop */}
            <Image
              src="/assets/avatar-parado.png"
              alt="Avatar"
              width={0}
              height={0}
              sizes="(min-width:1024px) 300px, 40vw"
              style={{
                width: "clamp(220px,28vw,300px)",
                height: "auto",
                imageRendering: "pixelated",
              }}
              priority
              className="select-none mt-4 animate-bob"
            />
          </section>
        </div>

        {/* Contacto */}
        <div className="mt-8 mx-auto w-full max-w-sm sm:max-w-xl lg:max-w-[860px] grid grid-cols-1 md:grid-cols-2 gap-4">
          <ContactPanel isDark={isDark}>
            <span className={isDark ? "text-[#e5ff7a]" : "text-yellow-300"}>
              {t("contact.phoneLabel")}
            </span>{" "}
            <span className="text-white">{t("contact.phoneValue")}</span>
          </ContactPanel>

          <ContactPanel isDark={isDark}>
            <span className={isDark ? "text-[#e5ff7a]" : "text-yellow-300"}>
              {t("contact.emailLabel")}
            </span>{" "}
            <span className="text-white">{t("contact.emailValue")}</span>
          </ContactPanel>
        </div>
      </div>

      {/* Animaciones */}
      <style jsx>{`
        @keyframes bob {
          0% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-6px);
          }
          100% {
            transform: translateY(0);
          }
        }
        .animate-bob {
          animation: bob 1.4s ease-in-out infinite;
        }
        @keyframes nameBob {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-4px);
          }
        }
        .animate-name-bob {
          animation: nameBob 2.2s ease-in-out infinite;
        }
      `}</style>
    </main>
  );
}

/* ====== UI helpers ====== */

function ThemeToggle({
  isDark,
  onToggle,
  labelLight,
  labelDark,
  className = "",
}: {
  isDark: boolean;
  onToggle: () => void;
  labelLight: string;
  labelDark: string;
  className?: string;
}) {
  const label = isDark ? labelLight : labelDark;
  return (
    <button
      onClick={onToggle}
      aria-label={label}
      aria-pressed={isDark}
      className={`select-none ${className}`}
      title={label}
      type="button"
    >
      <div
        className={`
          relative w-[100px] h-[46px]
          border-[6px] border-black rounded-full
          transition-all duration-300 ease-in-out
          shadow-[0_6px_0_#000]
          ${
            isDark
              ? "bg-gradient-to-r from-[#0ea5a8] to-[#1e3a8a]"
              : "bg-gradient-to-r from-[#f97316] to-[#facc15]"
          }
        `}
        style={{ imageRendering: "pixelated" }}
      >
        <div className="absolute inset-0 grid grid-cols-6 opacity-20 pointer-events-none">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={`seg-${i}`} className="border-r-2 border-black/40" />
          ))}
        </div>

        <div
          className={`
            absolute top-[6px] w-[34px] h-[34px]
            border-[6px] border-black rounded-full
            flex items-center justify-center
            transition-transform duration-300 ease-in-out
            ${isDark ? "translate-x-[54px] bg-[#0ea5a8]" : "translate-x-0 bg-[#facc15]"}
          `}
          style={{ imageRendering: "pixelated", boxShadow: "0 4px 0 #000" }}
        >
          <span
            className="text-[16px] select-none"
            style={{ filter: "drop-shadow(2px 2px 0 #000)" }}
          >
            {isDark ? "🌙" : "☀️"}
          </span>
        </div>
      </div>
    </button>
  );
}

function PixelButton({
  href,
  label,
  isDark,
}: {
  href: string;
  label: string;
  isDark: boolean;
}) {
  const lightClasses =
    "bg-[#2b93ff] text-yellow-300 shadow-[0_10px_0_#000] hover:shadow-[0_8px_0_#000]";
  const darkClasses =
    "bg-[#0ea5a8] text-[#e5ff7a] shadow-[0_10px_0_#000] hover:shadow-[0_8px_0_#000]";

  return (
    <Link
      href={href}
      className={`
        block w-full text-center border-8 border-black rounded-md
        px-5 py-3
        text-[14px] sm:text-[16px] md:text-[18px]
        font-[PressStart] tracking-wide
        hover:translate-y-0.5 active:translate-y-1
        transition-transform
        ${isDark ? darkClasses : lightClasses}
      `}
    >
      {label}
    </Link>
  );
}

function ContactPanel({
  children,
  isDark,
}: {
  children: React.ReactNode;
  isDark: boolean;
}) {
  return (
    <div
      className={`
        border-8 border-black rounded-md px-4 py-3
        text-[11px] sm:text-[12px] md:text-[14px]
        font-[PressStart] tracking-wide
        shadow-[0_10px_0_#000]
        ${isDark ? "bg-[#0a1622] text-white" : "bg-[#132533] text-white"}
      `}
    >
      {children}
    </div>
  );
}
