"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import LanguageSwitcher from "./i18n/LanguageSwitcher";
import { useLang } from "./i18n/LangContext";

type Theme = "light" | "dark";

export default function ProyectosPage() {
  const { t } = useLang();

  const [theme, setTheme] = useState<Theme>("light");
  const [showTooltip, setShowTooltip] = useState(false);

  // Sincronizar tema con localStorage (igual que en Home)
  useEffect(() => {
    const fromStorage = (typeof window !== "undefined" && localStorage.getItem("theme")) as
      | Theme
      | null;

    if (fromStorage === "light" || fromStorage === "dark") {
      setTheme(fromStorage);
    } else {
      const prefersDark =
        typeof window !== "undefined" &&
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches;
      setTheme(prefersDark ? "dark" : "light");
    }
  }, []);

  const isDark = theme === "dark";
  const bgUrl = isDark ? "/assets/proyectos-oscuro.jpg" : "/assets/cielo.jpg";

  return (
    <main className="min-h-screen w-full overflow-x-hidden relative">
      {/* Fondo */}
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center"
        style={{ backgroundImage: `url("${bgUrl}")` }}
        aria-hidden
      />

      {/* Selector de idioma */}
      <LanguageSwitcher />

      {/* Botón de ayuda */}
      <div className="fixed top-8 right-8 z-50">
        <button
          onClick={() => setShowTooltip(!showTooltip)}
          onBlur={() => setTimeout(() => setShowTooltip(false), 200)}
          className="relative w-20 h-20 bg-white border-[6px] border-black rounded-full shadow-[0_8px_0_#000] hover:shadow-[0_6px_0_#000] active:translate-y-1 transition-all flex items-center justify-center group overflow-hidden animate-float"
          aria-label={t("common.help")}
          title={t("common.help")}
          type="button"
        >
          <Image
            src="/assets/question.png"
            alt={t("common.help")}
            width={70}
            height={70}
            style={{ imageRendering: "pixelated" }}
            className="group-hover:scale-110 transition-transform"
          />
        </button>

        {/* Tooltip */}
        {showTooltip && (
          <div className="absolute top-24 right-0 w-[380px] animate-fadeIn">
            <div className="bg-white border-[8px] border-black rounded-xl shadow-[0_8px_0_#000] p-6">
              <p
                className="text-black text-[15px] leading-relaxed"
                style={{ fontFamily: "Arial, sans-serif" }}
              >
                {t("projects.help")}
              </p>
            </div>
            <div className="absolute -top-4 right-6 w-8 h-8 bg-white border-l-[8px] border-t-[8px] border-black rotate-45" />
          </div>
        )}
      </div>

      {/* Cabecera */}
      <header className="px-4 pt-10 pb-6">
        <div className="mx-auto max-w-6xl">
          <div
            className={`mx-auto w-[min(820px,92vw)] border-8 border-black rounded-md shadow-[0_12px_0_#000] ${
              isDark ? "bg-[#142033]" : "bg-[#1f4875]"
            }`}
          >
            <h1 className="text-center text-white font-[PressStart] text-[28px] py-6 tracking-wide">
              {t("projects.title")}
            </h1>
          </div>
        </div>
      </header>

      {/* Rejilla de proyectos */}
      <section className="mx-auto max-w-6xl px-4 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 place-items-center">
          <ProjectCard
            title={t("projects.card1Title")}
            img="/assets/mapas.png"
            link="https://taller-maps.vercel.app/"
            isDark={isDark}
          />
          <ProjectCard
            title={t("projects.card2Title")}
            img="/assets/porta.png"
            link="https://example-portfolio-xi.vercel.app/"
            isDark={isDark}
          />
          <ProjectCard
            title={t("projects.card3Title")}
            img="/assets/tiquete.png"
            link="https://taller-tiquete.vercel.app/"
            isDark={isDark}
          />
        </div>

        {/* Botón VOLVER */}
        <div className="mt-10 flex items-center justify-center">
          <PixelBrownLinkBtn href="/mapa">
            {t("projects.back")}
          </PixelBrownLinkBtn>
        </div>
      </section>

      {/* Estilos locales */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.25s ease-out;
        }
        .animate-float {
          animation: float 2.5s ease-in-out infinite;
        }
      `}</style>
    </main>
  );
}

/* ========= Componentes auxiliares ========= */

function ProjectCard({
  title,
  img,
  link,
  isDark,
}: {
  title: string;
  img: string;
  link: string;
  isDark: boolean;
}) {
  const { t } = useLang();
  const btnClass = isDark ? "bg-[#1c4f82] text-white" : "bg-[#2a6f97] text-white";

  return (
    <div className="relative w-[290px]">
      <div
        className="
          relative mx-auto w-[290px]
          bg-[#0f2a37] border-8 border-black rounded-md
          shadow-[0_14px_0_#000] px-3 pt-3 pb-5
          transition-transform duration-150 ease-out
          hover:scale-[1.06]
        "
        style={{ imageRendering: "pixelated" }}
      >
        <div className="border-8 border-black rounded-md bg-[#123141] p-2">
          <div className="overflow-hidden border-4 border-black rounded">
            <Image
              src={img}
              alt={title}
              width={260}
              height={200}
              className="block"
              style={{ imageRendering: "pixelated" }}
              priority
            />
          </div>
        </div>

        <p className="mt-3 text-center text-[12px] font-[PressStart] text-[#ffd54a]">
          {title}
        </p>

        <div className="mt-3 text-center">
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-block ${btnClass} border-4 border-black rounded-md px-4 py-2 font-[PressStart] text-[10px] shadow-[0_6px_0_#000] hover:translate-y-0.5 hover:shadow-[0_4px_0_#000] active:translate-y-1 active:shadow-[0_2px_0_#000] transition-transform`}
          >
            {t("projects.viewProject")}
          </a>
        </div>
      </div>
    </div>
  );
}

function PixelBrownLinkBtn({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="
        inline-block
        bg-[#6e3a06] text-white
        border-8 border-black rounded-md
        shadow-[0_10px_0_#000]
        px-8 py-3
        font-[PressStart] text-[16px] tracking-wide
        hover:translate-y-0.5 hover:shadow-[0_8px_0_#000]
        active:translate-y-1 active:shadow-[0_6px_0_#000]
        transition-transform
      "
    >
      {children}
    </Link>
  );
}
