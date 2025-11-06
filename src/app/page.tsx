// src/app/page.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type Theme = "light" | "dark";

export default function Home() {
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
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", theme);
    }
  }, [theme]);

  const isDark = theme === "dark";
  const bgUrl = isDark ? "/assets/modo-oscuro.jpg" : "/assets/bg-city.png";

  return (
    <main className="relative min-h-[100svh] overflow-x-hidden overflow-y-hidden">
      {/* Fondo */}
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center transition-all duration-700 ease-in-out"
        style={{ backgroundImage: `url(${bgUrl})` }}
        aria-hidden
      />

      {/* Toggle compacto */}
      <ThemeToggle isDark={isDark} onToggle={() => setTheme(isDark ? "light" : "dark")} />

      {/* Contenido (compactado para evitar scroll) */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-4 pb-6">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(420px,540px)_1fr] items-start gap-4 lg:gap-8">
          {/* Columna izquierda */}
          <section className="w-full">
            <div
              className={`mx-auto w-[min(540px,92vw)] border-8 border-black shadow-[0_10px_0_#000] rounded-md ${
                isDark ? "bg-[#101b2a] text-[#e5ff7a]" : "bg-[#31256c] text-yellow-300"
              }`}
            >
              <p className="px-4 py-3 text-[clamp(15px,1.9vw,20px)] leading-snug font-[PressStart]">
                ¡Hola! ¿Listo para conocer mi portafolio personal?
              </p>
            </div>

            {/* Botones */}
            <div className="mt-4 space-y-3 w-[min(540px,92vw)]">
              <PixelButton href="/mapa" label="EMPEZAR" isDark={isDark} />
              <PixelButton href="/proyectos" label="PROYECTOS" isDark={isDark} />
              <PixelButton href="/acerca" label="ACERCA DE MI" isDark={isDark} />
              <PixelButton href="/opiniones" label="OPINIONES" isDark={isDark} />
              <PixelButton href="/timeline" label="LINEA DE TIEMPO" isDark={isDark} />
            </div>
          </section>

          {/* Columna derecha */}
          <section className="relative justify-self-center lg:justify-self-end mt-2 lg:mt-0 pt-10">
            {/* Cartel nombre */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 z-20 w-[min(300px,70vw)]">
              <div className="animate-name-bob">
                <div
                  className={`w-full text-center border-8 border-black rounded-md px-3 py-2 shadow-[0_12px_0_#000] text-[clamp(13px,1.7vw,18px)] leading-tight ${
                    isDark ? "bg-[#101b2a] text-[#e5ff7a]" : "bg-[#31256c] text-yellow-300"
                  }`}
                >
                  <span className="block">Deivid</span>
                  <span className="block">Julian</span>
                </div>
              </div>
            </div>

            {/* Avatar (más pequeño) */}
            <Image
              src="/assets/avatar-parado.png"
              alt="Avatar"
              width={0}
              height={0}
              sizes="(min-width:1024px) 300px, 40vw"
              style={{
                width: "clamp(200px,28vw,300px)",
                height: "auto",
                imageRendering: "pixelated",
              }}
              priority
              className="select-none -mt-1 animate-bob"
            />
          </section>
        </div>

        {/* Contacto (más compacto) */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-3 w-[min(860px,96vw)]">
          <ContactPanel isDark={isDark}>
            <span className={isDark ? "text-[#e5ff7a]" : "text-yellow-300"}>Contáctame :</span>{" "}
            <span className="text-white">316 895 7503</span>
          </ContactPanel>

          <ContactPanel isDark={isDark}>
            <span className="text-white">deividjulianalvarado@gmail.com</span>
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

/* ===== Toggle tema pixelado (aún más compacto) ===== */
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
      className="fixed top-3 right-3 z-50 select-none"
      title={label}
      type="button"
    >
      {/* Rail 100×46 */}
      <div
        className={`
          relative w-[100px] h-[46px]
          border-[6px] border-black rounded-full
          transition-all duration-300 ease-in-out
          shadow-[0_6px_0_#000]
          ${isDark ? "bg-gradient-to-r from-[#0ea5a8] to-[#1e3a8a]" : "bg-gradient-to-r from-[#f97316] to-[#facc15]"}
        `}
        style={{ imageRendering: "pixelated" }}
      >
        {/* Segmentos */}
        <div className="absolute inset-0 grid grid-cols-6 opacity-20 pointer-events-none">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={`seg-${i}`} className="border-r-2 border-black/40" />
          ))}
        </div>

        {/* Knob 34px */}
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
          <span className="text-[16px] select-none" style={{ filter: "drop-shadow(2px 2px 0 #000)" }}>
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
        px-5 py-3 text-[clamp(16px,1.9vw,22px)] font-[PressStart] tracking-wide
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
        text-[clamp(12px,1.4vw,18px)] font-[PressStart] tracking-wide
        shadow-[0_10px_0_#000]
        ${isDark ? "bg-[#0a1622] text-white" : "bg-[#132533] text-white"}
      `}
    >
      {children}
    </div>
  );
}
