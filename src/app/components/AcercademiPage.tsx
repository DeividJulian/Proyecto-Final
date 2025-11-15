// src/app/acerca/page.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import LanguageSwitcher from "../components/i18n/LanguageSwitcher";
import { useLang } from "../components/i18n/LangContext";
import { MESSAGES } from "../components/i18n/messages";

type Theme = "light" | "dark";

export default function AcercaPage() {
  const { lang } = useLang();
  const messages = MESSAGES[lang];

  // barras
  const [habilidades] = useState(78);
  const [debilidades] = useState(34);
  const [pasatiempos] = useState(88);
  const [alimentos] = useState(64);

  // tema sincronizado con Home
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

  // UI modales / tooltip
  const [showTooltip, setShowTooltip] = useState(false);
  const [showHabilidadesModal, setShowHabilidadesModal] = useState(false);
  const [showDebilidadesModal, setShowDebilidadesModal] = useState(false);
  const [showPasatiemposModal, setShowPasatiemposModal] = useState(false);
  const [showAlimentosModal, setShowAlimentosModal] = useState(false);

  // Alternar avatar/foto
  const [showPhoto, setShowPhoto] = useState(false);
  const currentImage = showPhoto ? "/assets/mi-foto.png" : "/assets/avatar-parado.png";
  const currentAlt = showPhoto ? "Foto de Deivid" : "Avatar pixel art";

  // fondos
  const bgUrl = isDark ? "/assets/habitacion-gamer.png" : "/assets/modo-light-habitacion.png";

  // paletas
  const titleCard = isDark ? "bg-[#101b2a] text-[#e5ff7a]" : "bg-[#31256c] text-yellow-300";
  const panelCard = isDark ? "bg-[#0f1c2a]" : "bg-[#1b2b3b]";
  const chipBtn = isDark
    ? "bg-[#0ea5a8] hover:bg-[#0c9294] text-[#e5ff7a]"
    : "bg-[#31256c] hover:bg-[#3a2e79] text-yellow-300";
  const meterShell = "bg-[#0d1821]";
  const meterTrack = "bg-[#1a2530]";
  const avatarPanel = isDark ? "bg-[#0f1c2a]" : "bg-[#1b2b3b]";
  const volverBtnClasses = isDark
    ? "bg-[#0e2a3a] hover:bg-[#12384d] text-[#e5ff7a]"
    : "bg-[#5a3921] hover:bg-[#6e4528] text-white";

  const aboutText = messages.about.description;

  return (
    <main className="h-screen w-full relative overflow-y-auto md:overflow-hidden flex items-center justify-center">
      {/* Fondo */}
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center"
        style={{ backgroundImage: `url("${bgUrl}")` }}
        aria-hidden
      />

      {/* Botón idioma */}
      <div className="fixed top-4 left-4 z-50">
        <LanguageSwitcher />
      </div>

      {/* Botón ayuda */}
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={() => setShowTooltip(!showTooltip)}
          onBlur={() => setTimeout(() => setShowTooltip(false), 200)}
          className="relative w-16 h-16 sm:w-20 sm:h-20 bg-white border-[6px] border-black rounded-full shadow-[0_6px_0_#000] hover:shadow-[0_4px_0_#000] active:translate-y-1 transition-all flex items-center justify-center overflow-hidden"
          title="Ayuda"
          aria-label="Ayuda"
          type="button"
        >
          <Image
            src="/assets/question.png"
            alt="Ayuda"
            width={60}
            height={60}
            style={{ imageRendering: "pixelated" }}
            priority
          />
        </button>

        {showTooltip && (
          <div className="absolute top-20 right-0 w-[300px] sm:w-[380px]">
            <div className="bg-white border-[8px] border-black rounded-xl shadow-[0_8px_0_#000] p-4 sm:p-6">
              <p
                className="text-black text-[13px] sm:text-[15px] leading-relaxed"
                style={{ fontFamily: "Arial, sans-serif" }}
              >
                {messages.about.helpTooltip}
              </p>
            </div>
            <div className="absolute -top-4 right-6 w-8 h-8 bg-white border-l-[8px] border-t-[8px] border-black rotate-45" />
          </div>
        )}
      </div>

      {/* Contenedor principal (todo el alto de la pantalla) */}
      <div className="w-full max-w-[1100px] mx-auto px-4 py-4 h-full flex flex-col">
        {/* ====== LAYOUT MOBILE (columna) ====== */}
        <div className="flex-1 block md:hidden pt-16 pb-6 space-y-4">
          {/* Título */}
          <div
            className={`${titleCard} border-[6px] border-black rounded-md shadow-[0_8px_0_#000] w-full max-w-[520px] mx-auto`}
          >
            <h1 className="text-center font-[PressStart] text-[16px] py-3 tracking-wider">
              {messages.about.title}
            </h1>
          </div>

          {/* Descripción */}
          <div
            className={`${panelCard} border-[6px] border-black rounded-md shadow-[0_8px_0_#000] px-4 py-3 w-full max-w-[520px] mx-auto`}
          >
            <p className="text-[11px] leading-relaxed text-white font-[PressStart]">{aboutText}</p>
          </div>

          {/* Avatar centrado */}
          <div
            className={`${avatarPanel} border-[6px] border-black rounded-md shadow-[0_8px_0_#000] px-4 py-4 flex items-center justify-center min-h-[210px] relative w-full max-w-[520px] mx-auto`}
          >
            <button
              type="button"
              aria-label="Mostrar avatar"
              onClick={() => setShowPhoto(false)}
              className="pressable absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 grid place-items-center bg-[#2b2367] text-[#ffd54a] border-[6px] border-black rounded-md shadow-[0_6px_0_#000]"
            >
              {"<"}
            </button>

            <div className="relative z-10">
              <Image
                src={currentImage}
                alt={currentAlt}
                width={150}
                height={150}
                style={{ imageRendering: "pixelated" }}
              />
            </div>

            <button
              type="button"
              aria-label="Mostrar foto"
              onClick={() => setShowPhoto(true)}
              className="pressable absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 grid place-items-center bg-[#2b2367] text-[#ffd54a] border-[6px] border-black rounded-md shadow-[0_6px_0_#000]"
            >
              {">"}
            </button>
          </div>

          {/* HABILIDADES */}
          <div className="w-full max-w-[520px] mx-auto">
            <div className="mb-2">
              <button
                onClick={() => setShowHabilidadesModal(true)}
                className={`inline-block ${chipBtn} px-4 py-2 border-[6px] border-black rounded-md font-[PressStart] text-[11px] shadow-[0_6px_0_#000] hover:shadow-[0_4px_0_#000] active:translate-y-1 transition-transform`}
                type="button"
              >
                {messages.about.skillsTitle}
              </button>
            </div>
            <div
              className={`${meterShell} border-[6px] border-black rounded-md p-2 shadow-[0_6px_0_#000] w-full`}
            >
              <div className={`${meterTrack} w-full h-6 rounded-sm overflow-hidden border-2 border-black`}>
                <div
                  className="h-full transition-all duration-700"
                  style={{
                    width: `${habilidades}%`,
                    background: "#35f5a6",
                    boxShadow: "inset 0 -4px 0 rgba(0,0,0,0.3)",
                  }}
                />
              </div>
            </div>
          </div>

          {/* DEBILIDADES */}
          <div className="w-full max-w-[520px] mx-auto">
            <div className="mb-2">
              <button
                onClick={() => setShowDebilidadesModal(true)}
                className={`inline-block ${chipBtn} px-4 py-2 border-[6px] border-black rounded-md font-[PressStart] text-[11px] shadow-[0_6px_0_#000] hover:shadow-[0_4px_0_#000] active:translate-y-1 transition-transform`}
                type="button"
              >
                {messages.about.weaknessesTitle}
              </button>
            </div>
            <div
              className={`${meterShell} border-[6px] border-black rounded-md p-2 shadow-[0_6px_0_#000] w-full`}
            >
              <div className={`${meterTrack} w-full h-6 rounded-sm overflow-hidden border-2 border-black`}>
                <div
                  className="h-full transition-all duration-700"
                  style={{
                    width: `${debilidades}%`,
                    background: "#ff6b6b",
                    boxShadow: "inset 0 -4px 0 rgba(0,0,0,0.3)",
                  }}
                />
              </div>
            </div>
          </div>

          {/* PASATIEMPOS */}
          <div className="w-full max-w-[520px] mx-auto">
            <div className="mb-2">
              <button
                onClick={() => setShowPasatiemposModal(true)}
                className={`inline-block ${chipBtn} px-4 py-2 border-[6px] border-black rounded-md font-[PressStart] text-[11px] shadow-[0_6px_0_#000] hover:shadow-[0_4px_0_#000] active:translate-y-1 transition-transform`}
                type="button"
              >
                {messages.about.hobbiesTitle}
              </button>
            </div>
            <div
              className={`${meterShell} border-[6px] border-black rounded-md p-2 shadow-[0_6px_0_#000] w-full`}
            >
              <div className={`${meterTrack} w-full h-6 rounded-sm overflow-hidden border-2 border-black`}>
                <div
                  className="h-full transition-all duration-700"
                  style={{
                    width: `${pasatiempos}%`,
                    background: "#22d3ee",
                    boxShadow: "inset 0 -4px 0 rgba(0,0,0,0.3)",
                  }}
                />
              </div>
            </div>
          </div>

          {/* ALIMENTOS */}
          <div className="w-full max-w-[520px] mx-auto">
            <div className="mb-2">
              <button
                onClick={() => setShowAlimentosModal(true)}
                className={`inline-block ${chipBtn} px-4 py-2 border-[6px] border-black rounded-md font-[PressStart] text-[11px] shadow-[0_6px_0_#000] hover:shadow-[0_4px_0_#000] active:translate-y-1 transition-transform`}
                type="button"
              >
                {messages.about.foodsTitle}
              </button>
            </div>
            <div
              className={`${meterShell} border-[6px] border-black rounded-md p-2 shadow-[0_6px_0_#000] w-full`}
            >
              <div className={`${meterTrack} w-full h-6 rounded-sm overflow-hidden border-2 border-black`}>
                <div
                  className="h-full transition-all duration-700"
                  style={{
                    width: `${alimentos}%`,
                    background: "#ffd200",
                    boxShadow: "inset 0 -4px 0 rgba(0,0,0,0.3)",
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* ====== LAYOUT DESKTOP (igual que antes) ====== */}
        <div className="flex-1 hidden md:grid md:grid-cols-[1.6fr_1fr] gap-4 md:gap-6 items-start pt-20">
          {/* Columna izquierda */}
          <div className="space-y-3 md:space-y-4">
            <div
              className={`${titleCard} border-[6px] border-black rounded-md shadow-[0_8px_0_#000] w-full max-w-[520px] mx-auto md:mx-0`}
            >
              <h1 className="text-center font-[PressStart] text-[18px] sm:text-[20px] py-3 sm:py-4 tracking-wider">
                {messages.about.title}
              </h1>
            </div>

            <div
              className={`${panelCard} border-[6px] border-black rounded-md shadow-[0_8px_0_#000] px-4 py-3 sm:px-5 sm:py-4 w-full max-w-[520px] mx-auto md:mx-0`}
            >
              <p className="text-[11px] sm:text-[12px] leading-relaxed sm:leading-relaxed text-white font-[PressStart]">
                {aboutText}
              </p>
            </div>

            {/* HABILIDADES */}
            <div className="w-full max-w-[520px] mx-auto md:mx-0">
              <div className="mb-2">
                <button
                  onClick={() => setShowHabilidadesModal(true)}
                  className={`inline-block ${chipBtn} px-4 sm:px-5 py-2 border-[6px] border-black rounded-md font-[PressStart] text-[12px] sm:text-[14px] shadow-[0_6px_0_#000] hover:shadow-[0_4px_0_#000] active:translate-y-1 transition-transform`}
                  type="button"
                >
                  {messages.about.skillsTitle}
                </button>
              </div>
              <div
                className={`${meterShell} border-[6px] border-black rounded-md p-2 shadow-[0_6px_0_#000] w-full`}
              >
                <div className={`${meterTrack} w-full h-6 rounded-sm overflow-hidden border-2 border-black`}>
                  <div
                    className="h-full transition-all duration-700"
                    style={{
                      width: `${habilidades}%`,
                      background: "#35f5a6",
                      boxShadow: "inset 0 -4px 0 rgba(0,0,0,0.3)",
                    }}
                  />
                </div>
              </div>
            </div>

            {/* DEBILIDADES */}
            <div className="w-full max-w-[520px] mx-auto md:mx-0">
              <div className="mb-2">
                <button
                  onClick={() => setShowDebilidadesModal(true)}
                  className={`inline-block ${chipBtn} px-4 sm:px-5 py-2 border-[6px] border-black rounded-md font-[PressStart] text-[12px] sm:text-[14px] shadow-[0_6px_0_#000] hover:shadow-[0_4px_0_#000] active:translate-y-1 transition-transform`}
                  type="button"
                >
                  {messages.about.weaknessesTitle}
                </button>
              </div>
              <div
                className={`${meterShell} border-[6px] border-black rounded-md p-2 shadow-[0_6px_0_#000] w-full`}
              >
                <div className={`${meterTrack} w-full h-6 rounded-sm overflow-hidden border-2 border-black`}>
                  <div
                    className="h-full transition-all duration-700"
                    style={{
                      width: `${debilidades}%`,
                      background: "#ff6b6b",
                      boxShadow: "inset 0 -4px 0 rgba(0,0,0,0.3)",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Columna derecha */}
          <aside className="space-y-3 md:space-y-4 md:pt-4 flex flex-col items-center md:items-stretch">
            <div
              className={`${avatarPanel} border-[6px] border-black rounded-md shadow-[0_8px_0_#000] px-4 py-4 sm:px-6 sm:py-6 flex items-center justify-center min-h-[230px] sm:min-h-[260px] relative w-full max-w-[420px]`}
            >
              <button
                type="button"
                aria-label="Mostrar avatar"
                onClick={() => setShowPhoto(false)}
                className="pressable absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 grid place-items-center bg-[#2b2367] text-[#ffd54a] border-[6px] border-black rounded-md shadow-[0_6px_0_#000]"
              >
                {"<"}
              </button>

              <div className="relative z-10">
                <Image
                  src={currentImage}
                  alt={currentAlt}
                  width={170}
                  height={170}
                  style={{ imageRendering: "pixelated" }}
                />
              </div>

              <button
                type="button"
                aria-label="Mostrar foto"
                onClick={() => setShowPhoto(true)}
                className="pressable absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 grid place-items-center bg-[#2b2367] text-[#ffd54a] border-[6px] border-black rounded-md shadow-[0_6px_0_#000]"
              >
                {">"}
              </button>

              <img src="/assets/avatar-parado.png" alt="" style={{ display: "none" }} />
              <img src="/assets/mi-foto.png" alt="" style={{ display: "none" }} />
            </div>

            {/* PASATIEMPOS */}
            <div className="w-full max-w-[520px] mx-auto md:mx-0">
              <div className="mb-2">
                <button
                  onClick={() => setShowPasatiemposModal(true)}
                  className={`inline-block ${chipBtn} px-4 sm:px-5 py-2 border-[6px] border-black rounded-md font-[PressStart] text-[12px] sm:text-[14px] shadow-[0_6px_0_#000] hover:shadow-[0_4px_0_#000] active:translate-y-1 transition-transform`}
                  type="button"
                >
                  {messages.about.hobbiesTitle}
                </button>
              </div>
              <div
                className={`${meterShell} border-[6px] border-black rounded-md p-2 shadow-[0_6px_0_#000] w-full`}
              >
                <div className={`${meterTrack} w-full h-6 rounded-sm overflow-hidden border-2 border-black`}>
                  <div
                    className="h-full transition-all duration-700"
                    style={{
                      width: `${pasatiempos}%`,
                      background: "#22d3ee",
                      boxShadow: "inset 0 -4px 0 rgba(0,0,0,0.3)",
                    }}
                  />
                </div>
              </div>
            </div>

            {/* ALIMENTOS */}
            <div className="w-full max-w-[520px] mx-auto md:mx-0">
              <div className="mb-2">
                <button
                  onClick={() => setShowAlimentosModal(true)}
                  className={`inline-block ${chipBtn} px-4 sm:px-5 py-2 border-[6px] border-black rounded-md font-[PressStart] text-[12px] sm:text-[14px] shadow-[0_6px_0_#000] hover:shadow-[0_4px_0_#000] active:translate-y-1 transition-transform`}
                  type="button"
                >
                  {messages.about.foodsTitle}
                </button>
              </div>
              <div
                className={`${meterShell} border-[6px] border-black rounded-md p-2 shadow-[0_6px_0_#000] w-full`}
              >
                <div className={`${meterTrack} w-full h-6 rounded-sm overflow-hidden border-2 border-black`}>
                  <div
                    className="h-full transition-all duration-700"
                    style={{
                      width: `${alimentos}%`,
                      background: "#ffd200",
                      boxShadow: "inset 0 -4px 0 rgba(0,0,0,0.3)",
                    }}
                  />
                </div>
              </div>
            </div>
          </aside>
        </div>

        {/* Franja inferior: VOLVER siempre visible */}
        <div className="flex justify-center items-center pb-3">
          <Link
            href="/mapa"
            className={`${volverBtnClasses} border-[6px] border-black rounded-md shadow-[0_8px_0_#000] hover:shadow-[0_5px_0_#000] active:translate-y-1 transition-transform px-10 sm:px-16 py-3 font-[PressStart] text-[16px] tracking-wide`}
          >
            {messages.about.back}
          </Link>
        </div>
      </div>

      {/* Animaciones locales: sólo para flechas (al presionar) */}
      <style jsx>{`
        .pressable {
          transition: transform 120ms ease, box-shadow 120ms ease;
        }
        .pressable:active {
          transform: translateY(4px);
          box-shadow: 0 4px 0 #000;
        }
      `}</style>

      {/* ===== MODALES ===== */}
      {showHabilidadesModal && (
        <ModalBase onClose={() => setShowHabilidadesModal(false)}>
          <ModalContent
            titulo={messages.about.skillsTitle}
            backLabel={messages.about.back}
            isDark={isDark}
            onClose={() => setShowHabilidadesModal(false)}
          >
            <HabilidadBarraItem color="#35f5a6" titulo={messages.about.skill1} />
            <HabilidadBarraItem color="#22d3ee" titulo={messages.about.skill2} />
            <HabilidadBarraItem color="#ffd200" titulo={messages.about.skill3} />
          </ModalContent>
        </ModalBase>
      )}

      {showDebilidadesModal && (
        <ModalBase onClose={() => setShowDebilidadesModal(false)}>
          <ModalContent
            titulo={messages.about.weaknessesTitle}
            backLabel={messages.about.back}
            isDark={isDark}
            onClose={() => setShowDebilidadesModal(false)}
          >
            <HabilidadBarraItem color="#ff6b6b" titulo={messages.about.weak1} />
            <HabilidadBarraItem color="#ff8c42" titulo={messages.about.weak2} />
            <HabilidadBarraItem color="#e63946" titulo={messages.about.weak3} />
          </ModalContent>
        </ModalBase>
      )}

      {showPasatiemposModal && (
        <ModalBase onClose={() => setShowPasatiemposModal(false)}>
          <ModalContent
            titulo={messages.about.hobbiesTitle}
            backLabel={messages.about.back}
            isDark={isDark}
            onClose={() => setShowPasatiemposModal(false)}
          >
            <HabilidadBarraItem color="#22d3ee" titulo={messages.about.hobby1} />
            <HabilidadBarraItem color="#a78bfa" titulo={messages.about.hobby2} />
            <HabilidadBarraItem color="#34d399" titulo={messages.about.hobby3} />
          </ModalContent>
        </ModalBase>
      )}

      {showAlimentosModal && (
        <ModalBase onClose={() => setShowAlimentosModal(false)}>
          <ModalContent
            titulo={messages.about.foodsTitle}
            backLabel={messages.about.back}
            isDark={isDark}
            onClose={() => setShowAlimentosModal(false)}
          >
            <HabilidadBarraItem color="#ffd200" titulo={messages.about.food1} />
            <HabilidadBarraItem color="#ff6b9d" titulo={messages.about.food2} />
            <HabilidadBarraItem color="#fb923c" titulo={messages.about.food3} />
          </ModalContent>
        </ModalBase>
      )}
    </main>
  );
}

/* ---------- Componentes auxiliares ---------- */

function ModalBase({
  children,
  onClose,
}: {
  children: React.ReactNode;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80"
      onClick={onClose}
    >
      <div
        className="w-[90%] max-w-[950px] max-h-[85vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="relative bg-cover bg-center border-[8px] border-black rounded-lg shadow-[0_12px_0_#000]"
          style={{ backgroundImage: 'url("/assets/dojo-clasico.png")' }}
        >
          <div className="relative z-10 p-6 sm:p-8">{children}</div>
        </div>
      </div>
    </div>
  );
}

function ModalContent({
  titulo,
  children,
  isDark,
  onClose,
  backLabel,
}: {
  titulo: string;
  children: React.ReactNode;
  isDark: boolean;
  onClose: () => void;
  backLabel: string;
}) {
  const volverBtnClasses = isDark
    ? "bg-[#0e2a3a] hover:bg-[#12384d] text-[#e5ff7a]"
    : "bg-[#5a3921] hover:bg-[#6e4528] text-white";

  return (
    <>
      <div className="bg-[#2e1b6b] border-[6px] border-black rounded-md shadow-[0_8px_0_#000] mb-6">
        <h2 className="text-center text-yellow-300 font-[PressStart] text-[20px] sm:text-[22px] py-4 sm:py-5 tracking-wider">
          {titulo}
        </h2>
      </div>
      <div className="space-y-6 mb-8">{children}</div>
      <div className="flex justify-center">
        <button
          onClick={onClose}
          className={`${volverBtnClasses} border-[6px] border-black rounded-md shadow-[0_8px_0_#000] hover:shadow-[0_5px_0_#000] active:translate-y-1 transition-transform px-10 sm:px-12 py-3 font-[PressStart] text-[16px] tracking-wide`}
          type="button"
        >
          {backLabel}
        </button>
      </div>
    </>
  );
}

function HabilidadBarraItem({ color, titulo }: { color: string; titulo: string }) {
  return (
    <div className="flex items-center gap-4">
      <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 relative">
        <div
          className="absolute inset-0 bg-gradient-to-b from-[#5fb5e8] to-[#2d5f8d] border-4 border-black"
          style={{
            clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
            filter: "drop-shadow(0 4px 0 #000)",
          }}
        />
      </div>

      <div className="flex-1">
        <div className="bg-[#1e0f3e] border-[6px] border-black rounded-md shadow-[0_6px_0_#000] p-2 sm:p-3">
          <div className="bg-[#0d1821] border-4 border-black rounded-sm overflow-hidden">
            <div
              className="h-10 sm:h-12 flex items-center justify-center text-black font-bold text-[14px] sm:text-[18px]"
              style={{
                background: color,
                boxShadow: "inset 0 -4px 0 rgba(0,0,0,0.3)",
                fontFamily: "Arial, sans-serif",
              }}
            >
              {titulo}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
