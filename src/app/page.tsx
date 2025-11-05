// src/app/page.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type Theme = "light" | "dark";

export default function Home() {
  const [theme, setTheme] = useState<Theme>("light");

  // Carga preferencia guardada o la del sistema (solo en cliente)
  useEffect(() => {
    const saved = (typeof window !== "undefined" ? localStorage.getItem("theme") : null) as Theme | null;
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

  // Guarda preferencia (solo en cliente)
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", theme);
    }
  }, [theme]);

  const isDark = theme === "dark";
  const bgUrl = isDark ? "/assets/modo-oscuro.jpg" : "/assets/bg-city.png";

  return (
    <main className="relative min-h-screen overflow-x-hidden">
      {/* Fondo */}
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center transition-all duration-700 ease-in-out"
        style={{ backgroundImage: `url(${bgUrl})` }}
        aria-hidden
      />

      {/* Toggle Claro/Oscuro (pixelado) */}
      <ThemeToggle
        isDark={isDark}
        onToggle={() => setTheme(isDark ? "light" : "dark")}
      />

      {/* Contenido */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-[560px_1fr] items-start gap-8 lg:gap-16">
          {/* Columna izquierda */}
          <section className="w-full">
            <div
              className={`mx-auto w-[560px] max-w-full border-8 border-black shadow-[0_10px_0_#000] rounded-md ${
                isDark ? "bg-[#101b2a] text-[#e5ff7a]" : "bg-[#31256c] text-yellow-300"
              }`}
            >
              <p className="px-6 py-5 text-[26px] leading-tight font-[PressStart]">
                ¡Hola! ¿Listo para conocer mi portafolio personal?
              </p>
            </div>

            {/* Botones */}
            <div className="mt-6 space-y-5 w-[560px] max-w-full">
              <PixelButton href="/mapa" label="EMPEZAR" isDark={isDark} />
              <PixelButton href="/proyectos" label="PROYECTOS" isDark={isDark} />
              <PixelButton href="/acerca" label="ACERCA DE MI" isDark={isDark} />
              <PixelButton href="/opiniones" label="OPINIONES" isDark={isDark} />
              <PixelButton href="/timeline" label="LINEA DE TIEMPO" isDark={isDark} />
            </div>
          </section>

          {/* Columna derecha */}
          <section className="relative justify-self-center lg:justify-self-end mt-6 lg:mt-0 pt-20">
            {/* Cartel nombre */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 z-20 w-[320px]">
              <div className="animate-name-bob">
                <div
                  className={`w-full text-center border-8 border-black rounded-md px-4 py-3 shadow-[0_12px_0_#000] text-[22px] leading-tight ${
                    isDark ? "bg-[#101b2a] text-[#e5ff7a]" : "bg-[#31256c] text-yellow-300"
                  }`}
                >
                  <span className="block">Deivid</span>
                  <span className="block">Julian</span>
                </div>
              </div>
            </div>

            {/* Avatar */}
            <Image
              src="/assets/avatar-parado.png"
              alt="Avatar"
              width={420}
              height={420}
              priority
              className="select-none -mt-2 animate-bob"
            />
          </section>
        </div>

        {/* Contacto */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 w-[880px] max-w-full">
          <ContactPanel isDark={isDark}>
            <span className={isDark ? "text-[#e5ff7a]" : "text-yellow-300"}>Contáctame :</span>{" "}
            <span className="text-white">316 895 7503</span>
          </ContactPanel>

          <ContactPanel isDark={isDark}>
            <span className="text-white">deividjulianalvarado@gmail.com</span>
          </ContactPanel>
        </div>
      </div>

      {/* Animaciones locales */}
      <style jsx>{`
        @keyframes bob {
          0% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
          100% { transform: translateY(0); }
        }
        .animate-bob { animation: bob 1.4s ease-in-out infinite; }

        @keyframes nameBob {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        .animate-name-bob { animation: nameBob 2.2s ease-in-out infinite; }
      `}</style>
    </main>
  );
}

/* ===== Toggle tema pixelado accesible (compatible Vercel) ===== */
function ThemeToggle({
  isDark,
  onToggle,
}: {
  isDark: boolean;
  onToggle: () => void;
}) {
  const label = isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro";

  return (
    <button
      onClick={onToggle}
      aria-label={label}
      aria-pressed={isDark}
      className="fixed top-5 right-5 z-50 select-none"
      title={label}
      type="button"
    >
      {/* Rail */}
      <div
        className={`
          relative w-[136px] h-[64px]
          border-[6px] border-black rounded-full
          transition-all duration-300 ease-in-out
          shadow-[0_6px_0_#000]
          ${isDark ? "bg-gradient-to-r from-[#0ea5a8] to-[#1e3a8a]" : "bg-gradient-to-r from-[#f97316] to-[#facc15]"}
        `}
        style={{ imageRendering: "pixelated" }}
      >
        {/* Segmentos del rail */}
        <div className="absolute inset-0 grid grid-cols-6 opacity-20 pointer-events-none">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={`seg-${i}`} className="border-r-2 border-black/40" />
          ))}
        </div>

        {/* Knob */}
        <div
          className={`
            absolute top-[6px] w-[48px] h-[48px]
            border-[6px] border-black rounded-full
            flex items-center justify-center
            transition-transform duration-300 ease-in-out
            ${isDark ? "translate-x-[76px] bg-[#0ea5a8]" : "translate-x-0 bg-[#facc15]"}
          `}
          style={{ imageRendering: "pixelated", boxShadow: "0 4px 0 #000" }}
        >
          <span
            className="text-[22px] select-none"
            style={{ filter: "drop-shadow(2px 2px 0 #000)" }}
          >
            {isDark ? "🌙" : "☀️"}
          </span>
        </div>
      </div>
    </button>
  );
}

/* ========= Componentes auxiliares ========= */
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
        block w-full text-center
        border-8 border-black rounded-md
        px-6 py-4 text-[26px] font-[PressStart] tracking-wide
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
        border-8 border-black rounded-md px-6 py-5
        text-[22px] font-[PressStart] tracking-wide shadow-[0_10px_0_#000]
        ${isDark ? "bg-[#0a1622] text-white" : "bg-[#132533] text-white"}
      `}
    >
      {children}
    </div>
  );
}
