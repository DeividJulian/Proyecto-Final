// src/app/mapa/page.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import LanguageSwitcher from "../components/i18n/LanguageSwitcher";
import { useLang } from "../components/i18n/LangContext";

type Dir = "up" | "right" | "down" | "left";
type KeyMap = Record<"ArrowUp" | "ArrowDown" | "ArrowLeft" | "ArrowRight", boolean>;
type Theme = "light" | "dark";

const PROXIMITY_THRESHOLD = 6;

export default function MapaPage() {
  const { t } = useLang();

  // --- Tema sincronizado con Home ---
  const [theme, setTheme] = useState<Theme>("light");
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
  const mapBgUrl = isDark ? "/assets/modo-dark-mapa.png" : "/assets/mapa-overworld.jpg";

  // --- Estado de juego/pos ---
  const [pos, setPos] = useState({ x: 18, y: 72 });
  const dirRef = useRef<Dir>("right");
  const [moving, setMoving] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const hasMovedRef = useRef(false);
  const router = useRouter();
  const redirectedRef = useRef(false);

  // ref del contenedor del mapa para táctil
  const mapRef = useRef<HTMLDivElement | null>(null);

  const proyectosPoint = useMemo(() => ({ x: 23, y: 10 }), []);
  const acercaPoint = useMemo(() => ({ x: 73, y: 13 }), []);
  const opinionesPoint = useMemo(() => ({ x: 18, y: 83 }), []);
  const timelinePoint = useMemo(() => ({ x: 76, y: 73 }), []);

  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  // --- Movimiento con teclado ---
  useEffect(() => {
    let raf: number | null = null;
    const speed = 0.45;
    const keys: KeyMap = {
      ArrowUp: false,
      ArrowDown: false,
      ArrowLeft: false,
      ArrowRight: false,
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key in keys) {
        const k = e.key as keyof KeyMap;
        keys[k] = true;
        setMoving(true);
        if (k === "ArrowUp") dirRef.current = "up";
        if (k === "ArrowDown") dirRef.current = "down";
        if (k === "ArrowLeft") dirRef.current = "left";
        if (k === "ArrowRight") dirRef.current = "right";
        if (!hasMovedRef.current) {
          hasMovedRef.current = true;
          setShowIntro(false);
        }
      }
      if (e.key === "Escape") setShowTooltip(false);
    };

    const onKeyUp = (e: KeyboardEvent) => {
      if (e.key in keys) {
        const k = e.key as keyof KeyMap;
        keys[k] = false;
        if (!Object.values(keys).some(Boolean)) setMoving(false);
      }
    };

    const tick = () => {
      setPos((p) => {
        let { x, y } = p;
        if (keys.ArrowUp) y -= speed;
        if (keys.ArrowDown) y += speed;
        if (keys.ArrowLeft) x -= speed;
        if (keys.ArrowRight) x += speed;
        x = Math.max(0, Math.min(100, x));
        y = Math.max(0, Math.min(100, y));
        return { x, y };
      });
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  // --- Movimiento táctil: tocar/arrastrar para mover el avatar ---
  const handleTouch = (e: React.TouchEvent<HTMLDivElement>) => {
    const touch = e.touches[0];
    if (!touch || !mapRef.current) return;

    const rect = mapRef.current.getBoundingClientRect();
    const relativeX = ((touch.clientX - rect.left) / rect.width) * 100;
    const relativeY = ((touch.clientY - rect.top) / rect.height) * 100;

    const x = Math.max(0, Math.min(100, relativeX));
    const y = Math.max(0, Math.min(100, relativeY));

    setPos({ x, y });
    setMoving(true);

    if (!hasMovedRef.current) {
      hasMovedRef.current = true;
      setShowIntro(false);
    }
  };

  const handleTouchEnd = () => {
    setMoving(false);
  };

  // --- Detección de proximidad para rutas ---
  useEffect(() => {
    if (redirectedRef.current) return;
    const dist = (a: { x: number; y: number }, b: { x: number; y: number }) =>
      Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);

    if (dist(pos, proyectosPoint) <= PROXIMITY_THRESHOLD) {
      redirectedRef.current = true;
      setTimeout(() => router.push("/proyectos"), 220);
    } else if (dist(pos, acercaPoint) <= PROXIMITY_THRESHOLD) {
      redirectedRef.current = true;
      setTimeout(() => router.push("/acerca"), 220);
    } else if (dist(pos, opinionesPoint) <= PROXIMITY_THRESHOLD) {
      redirectedRef.current = true;
      setTimeout(() => router.push("/opiniones"), 220);
    } else if (dist(pos, timelinePoint) <= PROXIMITY_THRESHOLD) {
      redirectedRef.current = true;
      setTimeout(() => router.push("/timeline"), 220);
    }
  }, [pos, router, proyectosPoint, acercaPoint, opinionesPoint, timelinePoint]);

  return (
    <main className="h-screen w-full overflow-hidden flex items-center justify-center bg-[#072130]">
      {/* Selector de idioma */}
      <LanguageSwitcher />

      {/* Botón de ayuda (más pequeño en móvil) */}
      <div className="fixed top-6 right-6 z-50">
        <button
          onClick={() => setShowTooltip((v) => !v)}
          onBlur={() => setTimeout(() => setShowTooltip(false), 200)}
          className={`
            relative
            w-14 h-14
            sm:w-20 sm:h-20
            bg-white border-[6px] border-black rounded-full
            shadow-[0_8px_0_#000] hover:shadow-[0_6px_0_#000]
            active:translate-y-1
            transition-all flex items-center justify-center
            group overflow-hidden animate-float
          `}
          aria-label={t("map.helpTitle")}
          title={t("map.helpTitle")}
        >
          <Image
            src="/assets/question.png"
            alt={t("map.helpTitle")}
            width={70}
            height={70}
            priority
            style={{ imageRendering: "pixelated" }}
            className="group-hover:scale-110 transition-transform w-9 h-9 sm:w-[70px] sm:h-[70px]"
          />
        </button>

        {showTooltip && (
          <div className="absolute top-24 right-0 w-[340px] animate-fadeIn">
            <div className="bg-white border-[8px] border-black rounded-xl shadow-[0_8px_0_#000] p-6">
              <p className="text-black text-[15px] leading-relaxed font-sans">
                {t("map.helpText")}
              </p>
            </div>
            <div className="absolute -top-4 right-6 w-8 h-8 bg-white border-l-[8px] border-t-[8px] border-black rotate-45" />
          </div>
        )}
      </div>

      {/* Lienzo cuadrado del mapa */}
      <div
        ref={mapRef}
        className="relative overflow-hidden touch-none"
        style={{ width: "min(90vw, 90vh, 850px)", height: "min(90vw, 90vh, 850px)" }}
        onTouchStart={handleTouch}
        onTouchMove={handleTouch}
        onTouchEnd={handleTouchEnd}
      >
        {/* Fondo del mapa por tema */}
        <div
          className="absolute inset-0 bg-center bg-no-repeat bg-contain"
          style={{ backgroundImage: `url("${mapBgUrl}")` }}
          aria-hidden
        />

        {/* VOLVER */}
        <Link
          href="/"
          className={`absolute top-3 left-3 z-30 border-8 border-black rounded-md px-3 py-[6px] font-[PressStart] text-[10px] hover:translate-y-0.5 active:translate-y-1 transition-transform shadow-[0_8px_0_#000] ${
            isDark
              ? "bg-[#0ea5a8] text-[#e5ff7a] hover:shadow-[0_6px_0_#000]"
              : "bg-[#2b93ff] text-yellow-300 hover:shadow-[0_6px_0_#000]"
          }`}
        >
          {t("map.back")}
        </Link>

        {/* Letreros del mapa */}
        <MapLabel
          isDark={isDark}
          text={t("common.projects")}
          top="9%"
          left="35%"
          href="/proyectos"
        />
        <MapLabel
          isDark={isDark}
          text={t("common.about")}
          top="12%"
          left="73%"
          href="/acerca"
        />
        <MapLabel
          isDark={isDark}
          text={t("common.reviews")}
          top="83%"
          left="18%"
          href="/opiniones"
        />
        <MapLabel
          isDark={isDark}
          text={t("common.timeline")}
          top="73%"
          left="76%"
          href="/timeline"
        />

        {/* Globo inicial (se oculta al mover) */}
        {showIntro && (
          <SpeechBubble top="47%" left="49%">
            {t("map.intro")}
          </SpeechBubble>
        )}

        {/* Avatar */}
        <div
          className="absolute z-20"
          style={{
            left: `${pos.x}%`,
            top: `${pos.y}%`,
            transform: "translate(-50%, -80%)",
          }}
        >
          <Image
            src="/assets/avatar-parado.png"
            alt="Avatar"
            width={60}
            height={60}
            priority
            className={moving ? "select-none" : "select-none animate-bob"}
            style={{ imageRendering: "pixelated" }}
          />
        </div>
      </div>

      {/* Animaciones */}
      <style jsx>{`
        @keyframes bob {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-6px);
          }
        }
        .animate-bob {
          animation: bob 1.4s ease-in-out infinite;
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-6px);
          }
        }
        .animate-float {
          animation: float 2.5s ease-in-out infinite;
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
      `}</style>
    </main>
  );
}

/* ---------- Auxiliares ---------- */

function MapLabel({
  text,
  top,
  left,
  href,
  isDark,
}: {
  text: string;
  top: string;
  left: string;
  href?: string;
  isDark: boolean;
}) {
  const router = useRouter();
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (!href) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      router.push(href);
    }
  };

  const base =
    "border-8 border-black rounded-md shadow-[0_8px_0_#000] px-3 py-[6px] font-[PressStart] text-[clamp(9px,1vw,12px)] hover:translate-y-0.5 active:translate-y-1 transition-transform";
  const themeClass = isDark
    ? "bg-[#0ea5a8] text-[#e5ff7a] hover:shadow-[0_6px_0_#000]"
    : "bg-[#2b93ff] text-yellow-300 hover:shadow-[0_6px_0_#000]";

  return (
    <div className="absolute z-20" style={{ top, left, transform: "translate(-50%, -50%)" }}>
      {href ? (
        <Link href={href}>
          <button onKeyDown={onKeyDown} className={`${base} ${themeClass}`}>
            {text}
          </button>
        </Link>
      ) : (
        <div className={`${base} ${themeClass}`}>{text}</div>
      )}
    </div>
  );
}

function SpeechBubble({
  top,
  left,
  children,
}: {
  top: string;
  left: string;
  children: React.ReactNode;
}) {
  return (
    <div className="absolute z-10" style={{ top, left, transform: "translate(-50%, -50%)" }}>
      <div className="bg-white text-black border-8 border-black rounded-md px-3 py-2 shadow-[0_8px_0_#000] font-[PressStart] text-[clamp(8px,1vw,11px)] leading-relaxed text-center">
        {children}
      </div>
      <div
        className="mx-auto"
        style={{
          width: 0,
          height: 0,
          borderLeft: "10px solid transparent",
          borderRight: "10px solid transparent",
          borderTop: "12px solid #000",
          transform: "translateY(-3px)",
        }}
      />
      <div
        className="mx-auto"
        style={{
          width: 0,
          height: 0,
          borderLeft: "8px solid transparent",
          borderRight: "8px solid transparent",
          borderTop: "10px solid #fff",
          transform: "translateY(-13px)",
        }}
      />
    </div>
  );
}
