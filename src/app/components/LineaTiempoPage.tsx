// src/app/timeline/page.tsx
"use client";

import React, { useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import LanguageSwitcher from "../components/i18n/LanguageSwitcher";
import { useLang } from "../components/i18n/LangContext";

type NodeItem = {
  id: number;
  image: string;
  alt: string;
  x: number; // posición horizontal en %
  y: number; // posición vertical en %
};

export default function LineaTiempoPage() {
  const { t } = useLang();
  const [showTooltip, setShowTooltip] = useState(false);

  const frameRef = useRef<HTMLDivElement | null>(null);

  // Línea principal horizontal (porcentaje sobre el alto del contenedor)
  const yMain = 38;

  // Nodos (misma composición que tu referencia)
  const timelineNodes: NodeItem[] = useMemo(
    () => [
      { id: 1, image: "/assets/sala-cine.png", alt: "Sala de cine", x: 32, y: 18 },
      { id: 2, image: "/assets/tiquete.png", alt: "Tiquete", x: 68, y: 18 },
      { id: 3, image: "/assets/mapas.png", alt: "Proyecto mapa", x: 50, y: 62 },
    ],
    []
  );

  const handleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await frameRef.current?.requestFullscreen?.();
      } else {
        await document.exitFullscreen();
      }
    } catch {
      // ignorar si no está soportado
    }
  };

  return (
    <div className="h-screen relative overflow-hidden bg-slate-950">
      {/* Fondo */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/linea-de-tiempo.png"
          alt="Fondo línea de tiempo"
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
      </div>

      {/* Degradado oscuro */}
      <div className="absolute inset-0 bg-gradient-to-b from-cyan-950/40 via-slate-950/60 to-slate-950/80 z-[1]" />

      {/* Marco “tech” */}
      <div className="absolute inset-0 pointer-events-none z-[2]">
        <div
          className="absolute inset-4 border-8 border-cyan-600 rounded-3xl"
          style={{
            boxShadow:
              "0 0 40px rgba(6, 182, 212, 0.5), inset 0 0 60px rgba(0, 0, 0, 0.8)",
            imageRendering: "pixelated",
          }}
        />
        <div className="absolute top-8 left-8 w-32 h-32 border-l-4 border-t-4 border-cyan-500" />
        <div className="absolute top-8 right-8 w-32 h-32 border-r-4 border-t-4 border-cyan-500" />
        <div className="absolute bottom-8 left-8 w-32 h-32 border-l-4 border-b-4 border-cyan-500" />
        <div className="absolute bottom-8 right-8 w-32 h-32 border-r-4 border-b-4 border-cyan-500" />
      </div>

      {/* Botón de idioma, sincronizado (fijo arriba a la izquierda) */}
      <div className="fixed top-8 left-8 z-[60]">
        <LanguageSwitcher />
      </div>

      {/* Botón de ayuda fijo */}
      <div className="fixed top-8 right-8 z-[60]">
        <button
          onClick={() => setShowTooltip((v) => !v)}
          onBlur={() => setTimeout(() => setShowTooltip(false), 200)}
          className="relative w-20 h-20 bg-white border-[6px] border-black rounded-full shadow-[0_8px_0_#000] hover:shadow-[0_6px_0_#000] active:translate-y-1 transition-all flex items-center justify-center group overflow-hidden"
          aria-label="Ayuda"
          title="Ayuda"
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

        {showTooltip && (
          <div className="absolute top-24 right-0 w-[320px] md:w-[380px] animate-fadeIn">
            <div className="bg-white border-[8px] border-black rounded-xl shadow-[0_8px_0_#000] p-6">
              <p
                className="text-black text-[15px] leading-relaxed"
                style={{ fontFamily: "Arial, sans-serif" }}
              >
                {t("timeline.helpText")}{" "}
                <strong>{t("timeline.fullscreen")}</strong>{" "}
                {t("timeline.helpTail")}
              </p>
            </div>
            <div className="absolute -top-4 right-6 w-8 h-8 bg-white border-l-[8px] border-t-[8px] border-black rotate-45" />
          </div>
        )}
      </div>

      {/* CONTENIDO PRINCIPAL: centrado verticalmente, sin scroll */}
      <div
        className="relative z-10 flex flex-col items-center justify-center h-full px-4 md:px-6"
        ref={frameRef}
      >
        {/* Título */}
        <div className="flex justify-center mb-8">
          <div
            className="px-6 md:px-10 py-3 md:py-4 rounded-2xl border-4 border-black"
            style={{
              boxShadow: "0 8px 0px rgba(0,0,0,0.8)",
              imageRendering: "pixelated",
              backgroundColor: "#2D246A",
            }}
          >
            <h1
              className="text-2xl md:text-4xl font-bold text-yellow-400 tracking-widest"
              style={{
                textShadow: "2px 2px 0px rgba(0,0,0,0.8)",
                fontFamily: "monospace",
              }}
            >
              {t("timeline.title")}
            </h1>
          </div>
        </div>

        {/* Contenedor de línea de tiempo (horizontal, como en la referencia) */}
        <div className="relative max-w-[1200px] w-full mx-auto">
          {/* Avatar grande a la izquierda */}
          <div className="absolute left-2 top-[36%] -translate-y-1/2 z-20">
            <div
              className="p-2 rounded-xl shadow-2xl bg-transparent"
              style={{ imageRendering: "pixelated" }}
            >
              <div className="w-[140px] h-[140px] rounded-xl overflow-hidden border-4 border-cyan-700 bg-slate-900 grid place-items-center">
                <Image
                  src="/assets/avatar-primera-persona.png"
                  alt="Avatar pixel"
                  width={140}
                  height={140}
                  className="object-contain"
                  style={{ imageRendering: "pixelated" }}
                  priority
                />
              </div>
            </div>
          </div>

          {/* Área de líneas y nodos */}
          <div className="ml-[170px] mr-6 relative min-h-[520px]">
            {/* Líneas (SVG) */}
            <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
              {/* Línea principal horizontal */}
              <line
                x1="-3%"
                y1={`${yMain}%`}
                x2="103%"
                y2={`${yMain}%`}
                stroke="#22c55e"
                strokeWidth="6"
                style={{ filter: "drop-shadow(0 0 8px rgba(34,197,94,0.9))" }}
              />

              {/* Conectores verticales a cada nodo */}
              {timelineNodes.map((n) => (
                <line
                  key={`v-${n.id}`}
                  x1={`${n.x}%`}
                  y1={`${yMain}%`}
                  x2={`${n.x}%`}
                  y2={`${n.y}%`}
                  stroke="#22c55e"
                  strokeWidth="6"
                  style={{ filter: "drop-shadow(0 0 8px rgba(34,197,94,0.9))" }}
                />
              ))}
            </svg>

            {/* Nodos (cuadros de imagen) */}
            {timelineNodes.map((n) => (
              <div
                key={n.id}
                className="absolute z-10 cursor-pointer transition-transform hover:scale-110"
                style={{ left: `calc(${n.x}% - 64px)`, top: `calc(${n.y}% - 64px)` }}
                title={n.alt}
              >
                <div
                  className="w-32 h-32 border-4 border-cyan-500 rounded-xl overflow-hidden bg-slate-900 relative"
                  style={{
                    boxShadow:
                      "0 0 25px rgba(6,182,212,0.6), inset 0 0 20px rgba(0,0,0,0.5)",
                    imageRendering: "pixelated",
                  }}
                >
                  <Image
                    src={n.image}
                    alt={n.alt}
                    width={128}
                    height={128}
                    className="w-full h-full object-cover"
                    style={{ imageRendering: "pixelated" }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Botones inferiores fijos (no afectan el scroll) */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 flex gap-4 md:gap-6 z-[60]">
        <button
          onClick={handleFullscreen}
          className="bg-amber-900 hover:bg-amber-800 text-yellow-400 font-bold text-base md:text-xl px-6 md:px-10 py-3 md:py-4 rounded-xl border-4 border-black shadow-2xl transition-all hover:scale-105"
          style={{
            textShadow: "2px 2px 0px rgba(0,0,0,0.8)",
            fontFamily: "monospace",
            imageRendering: "pixelated",
            boxShadow: "0 8px 0px rgba(0,0,0,0.6)",
            backgroundColor: "#78350f",
          }}
          type="button"
        >
          {t("timeline.fullscreen")}
        </button>

        <Link
          href="/mapa"
          className="bg-orange-900 hover:bg-orange-800 text-yellow-400 font-bold text-base md:text-xl px-6 md:px-10 py-3 md:py-4 rounded-xl border-4 border-black shadow-2xl transition-all hover:scale-105"
          style={{
            textShadow: "2px 2px 0px rgba(0,0,0,0.8)",
            fontFamily: "monospace",
            imageRendering: "pixelated",
            boxShadow: "0 8px 0px rgba(0, 0, 0, 0.6)",
            backgroundColor: "#9a3412",
          }}
        >
          {t("timeline.back").toUpperCase()}
        </Link>
      </div>

      {/* Animación fadeIn para el tooltip */}
      <style jsx>{`
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
    </div>
  );
}
