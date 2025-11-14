// src/app/components/OpinionesPage.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import LanguageSwitcher from "./i18n/LanguageSwitcher";
import { useLang } from "./i18n/LangContext";

type Theme = "light" | "dark";

export default function OpinionesPage() {
  const { t } = useLang();

  const videos = [
    { id: 1, videoId: "dQw4w9WgXcQ", titleKey: "opiniones.video1" },
    { id: 2, videoId: "dQw4w9WgXcQ", titleKey: "opiniones.video2" },
    { id: 3, videoId: "dQw4w9WgXcQ", titleKey: "opiniones.video3" },
    { id: 4, videoId: "dQw4w9WgXcQ", titleKey: "opiniones.video4" }
  ];

  // === Tema sincronizado con Home ===
  const [theme, setTheme] = useState<Theme>("light");
  useEffect(() => {
    const saved = (typeof window !== "undefined"
      ? localStorage.getItem("theme")
      : null) as Theme | null;

    if (saved === "light" || saved === "dark") {
      setTheme(saved);
      return;
    }
    const prefersDark =
      typeof window !== "undefined" &&
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    setTheme(prefersDark ? "dark" : "light");
  }, []);

  const isDark = theme === "dark";
  const bgUrl = isDark
    ? "/assets/sala-cine.png"        // fondo de cine noche (modo oscuro)
    : "/assets/modo-light-cine.png"; // fondo de cine con gente (modo claro)

  // Tooltip del botón de interrogación
  const [showTooltip, setShowTooltip] = useState(false);

  // Clases para el botón VOLVER según tema (opcional, puedes dejarlas fijas)
  const backBtnClasses = isDark
    ? "bg-[#0e2a3a] hover:bg-[#12384d] text-[#e5ff7a]"
    : "bg-[#5a3921] hover:bg-[#6e4528] text-white";

  return (
    <main className="min-h-screen w-full relative overflow-hidden flex items-center justify-center">
      {/* Fondo de cine/teatro según tema */}
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center"
        style={{ backgroundImage: `url("${bgUrl}")` }}
        aria-hidden
      />

      {/* Conmutador de idioma (arriba a la izquierda como en Home) */}
      <LanguageSwitcher />

      {/* Botón de interrogación flotante */}
      <div className="fixed top-8 right-8 z-50">
        <button
          onClick={() => setShowTooltip(!showTooltip)}
          onBlur={() => setTimeout(() => setShowTooltip(false), 200)}
          className="relative w-20 h-20 bg-white border-[6px] border-black rounded-full shadow-[0_8px_0_#000] hover:shadow-[0_6px_0_#000] active:translate-y-1 transition-all flex items-center justify-center group overflow-hidden"
          aria-label={t("opiniones.helpAria")}
          type="button"
        >
          <Image
            src="/assets/question.png"
            alt="Ayuda"
            width={70}
            height={70}
            style={{ imageRendering: "pixelated" }}
            className="group-hover:scale-110 transition-transform"
            priority
          />
        </button>

        {/* Tooltip mensaje */}
        {showTooltip && (
          <div className="absolute top-24 right-0 w-[380px] animate-fadeIn">
            <div className="bg-white border-[8px] border-black rounded-xl shadow-[0_8px_0_#000] p-6">
              <p
                className="text-black text-[15px] leading-relaxed"
                style={{ fontFamily: "Arial, sans-serif" }}
              >
                {t("opiniones.helpText")}{" "}
                <strong>{t("common.back").toUpperCase()}</strong>{" "}
                {t("opiniones.helpTail")}
              </p>
            </div>
            {/* Flecha apuntando al botón */}
            <div className="absolute -top-4 right-6 w-8 h-8 bg-white border-l-[8px] border-t-[8px] border-black transform rotate-45"></div>
          </div>
        )}
      </div>

      {/* Contenedor principal */}
      <div className="w-full max-w-[1100px] mx-auto px-4 py-8">
        {/* Título OPINIONES */}
        <div className="bg-[#1b2b3b] border-[6px] border-black rounded-md shadow-[0_8px_0_#000] mb-8">
          <h1 className="text-center text-yellow-300 font-[PressStart] text-[22px] py-5 tracking-wider">
            {t("opiniones.title")}
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-6 items-start">
          {/* Columna izquierda: Grid de videos */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {videos.map((video) => (
              <VideoCard
                key={video.id}
                videoId={video.videoId}
                titleKey={video.titleKey}
              />
            ))}
          </div>

          {/* Columna derecha: Globo de diálogo y avatar */}
          <aside className="flex flex-col items-center gap-6 lg:min-w-[320px]">
            {/* Globo de diálogo */}
            <div className="relative bg-white border-[6px] border-black rounded-xl shadow-[0_8px_0_#000] p-5 max-w-[300px]">
              <p
                className="text-black text-[13px] leading-relaxed"
                style={{ fontFamily: "Arial, sans-serif" }}
              >
                {t("opiniones.bubble")}
              </p>
              {/* Flecha del globo apuntando hacia abajo */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-white border-b-[6px] border-r-[6px] border-black transform rotate-45"></div>
            </div>

            {/* Avatar flotante - espejado para que mire hacia los videos */}
            <div className="relative">
              <div className="animate-float">
                <Image
                  src="/assets/avatar-parado.png"
                  alt="Avatar"
                  width={180}
                  height={180}
                  style={{ imageRendering: "pixelated", transform: "scaleX(-1)" }}
                />
              </div>
            </div>
          </aside>
        </div>

        {/* Botón VOLVER centrado */}
        <div className="flex justify-center mt-8">
          <Link
            href="/mapa"
            className={`${backBtnClasses} border-[6px] border-black rounded-md shadow-[0_8px_0_#000] hover:shadow-[0_5px_0_#000] active:translate-y-1 transition-all px-12 py-3 font-[PressStart] text-[16px] tracking-wide`}
          >
            {t("common.back").toUpperCase()}
          </Link>
        </div>
      </div>

      {/* Animaciones y estilos específicos */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-15px);
          }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .play-button-frame {
          width: 110px;
          height: 72px;
          display: grid;
          place-items: center;
          border: 6px solid #23181b;
          background: linear-gradient(180deg, #ffd24d 0%, #f0a500 100%);
          box-shadow: 0 6px 0 #000, inset 0 2px 0 rgba(255, 255, 255, 0.25),
            0 6px 12px rgba(0, 0, 0, 0.4);
          border-radius: 6px;
          image-rendering: pixelated;
          transform: translateZ(0);
        }
        .play-button-frame:active {
          transform: translateY(3px);
          box-shadow: 0 3px 0 #000;
        }
        .play-triangle {
          width: 48px;
          height: 48px;
          transform: scale(1);
          transition: transform 150ms ease;
        }
        .play-wrap:hover .play-triangle {
          transform: scale(1.06) translateY(-2px);
        }

        @media (min-width: 1024px) {
          .play-button-frame {
            width: 140px;
            height: 92px;
          }
          .play-triangle {
            width: 60px;
            height: 60px;
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
          animation: fadeIn 0.2s ease-out;
        }
      `}</style>
    </main>
  );
}

/* Componente de tarjeta de video */
function VideoCard({ videoId, titleKey }: { videoId: string; titleKey: string }) {
  const { t } = useLang();
  const titulo = t(titleKey);
  const playPrefix = t("opiniones.playPrefix");

  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="bg-black border-[6px] border-white rounded-md shadow-[0_8px_0_#000] overflow-hidden">
      <div className="relative w-full aspect-video bg-black flex items-center justify-center p-4">
        {!isPlaying ? (
          <button
            onClick={() => setIsPlaying(true)}
            className="relative w-full h-full flex items-center justify-center group play-wrap"
            aria-label={`${playPrefix} ${titulo}`}
            type="button"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-black" />
            <div className="absolute inset-2 border-4 border-white rounded-md pointer-events-none" />
            <div className="relative z-10 play-button-frame">
              <Image
                src="/assets/reproducir.png"
                alt="Play retro"
                width={72}
                height={72}
                style={{ imageRendering: "pixelated" }}
                className="play-triangle"
              />
            </div>
          </button>
        ) : (
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
            title={titulo}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        )}
      </div>
    </div>
  );
}
