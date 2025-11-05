"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";

type Dir = "up" | "right" | "down" | "left";
type KeyMap = Record<"ArrowUp" | "ArrowDown" | "ArrowLeft" | "ArrowRight", boolean>;

const PROXIMITY_THRESHOLD = 6; // sensibilidad de proximidad

export default function MapaPage() {
  // Posición del avatar en % dentro del mapa
  const [pos, setPos] = useState({ x: 18, y: 72 });
  const dirRef = useRef<Dir>("right");
  const [moving, setMoving] = useState(false);

  // Globo introductorio: se oculta al primer movimiento
  const [showIntro, setShowIntro] = useState(true);
  const hasMovedRef = useRef(false);

  const router = useRouter();
  const redirectedRef = useRef(false);

  // Anclas de navegación (fijas para no generar warnings en dependencias)
  const proyectosPoint = useMemo(() => ({ x: 23, y: 10 }), []);
  const acercaPoint = useMemo(() => ({ x: 73, y: 13 }), []);
  const opinionesPoint = useMemo(() => ({ x: 18, y: 83 }), []);
  const timelinePoint = useMemo(() => ({ x: 76, y: 73 }), []);

  // Tooltip del botón de ayuda
  const [showTooltip, setShowTooltip] = useState(false);

  // Sin scroll en el mapa
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  // Movimiento con flechas
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

  // Cercanía -> navegación
  useEffect(() => {
    if (redirectedRef.current) return;

    const dist = (a: { x: number; y: number }, b: { x: number; y: number }) => {
      const dx = a.x - b.x;
      const dy = a.y - b.y;
      return Math.sqrt(dx * dx + dy * dy);
    };

    if (dist(pos, proyectosPoint) <= PROXIMITY_THRESHOLD) {
      redirectedRef.current = true;
      setTimeout(() => router.push("/proyectos"), 220);
      return;
    }
    if (dist(pos, acercaPoint) <= PROXIMITY_THRESHOLD) {
      redirectedRef.current = true;
      setTimeout(() => router.push("/acerca"), 220);
      return;
    }
    if (dist(pos, opinionesPoint) <= PROXIMITY_THRESHOLD) {
      redirectedRef.current = true;
      setTimeout(() => router.push("/opiniones"), 220);
      return;
    }
    if (dist(pos, timelinePoint) <= PROXIMITY_THRESHOLD) {
      redirectedRef.current = true;
      setTimeout(() => router.push("/timeline"), 220);
      return;
    }
  }, [pos, router, proyectosPoint, acercaPoint, opinionesPoint, timelinePoint]);

  return (
    <main className="h-screen w-full overflow-hidden flex items-center justify-center bg-[#072130]">
      {/* Botón de ayuda con animación flotante */}
      <div className="fixed top-6 right-6 z-50">
        <button
          onClick={() => setShowTooltip((v) => !v)}
          onBlur={() => setTimeout(() => setShowTooltip(false), 200)}
          className="pixel-help"
          aria-label="Ayuda"
          title="Ayuda"
        >
          <span className="pixel-help__ring" />
          <span className="pixel-help__disc">
            <Image
              src="/assets/question.png"
              alt="Ayuda"
              width={64}
              height={64}
              priority
              style={{ imageRendering: "pixelated" }}
            />
          </span>
        </button>

        {showTooltip && (
          <div className="absolute top-24 right-0 w-[360px] animate-fadeIn">
            <div className="bg-white border-[8px] border-black rounded-xl shadow-[0_8px_0_#000] p-6">
              <p
                className="text-black text-[15px] leading-relaxed"
                style={{ fontFamily: "Arial, sans-serif" }}
              >
                Usa las flechas para moverte. Acércate a{" "}
                <strong>Proyectos</strong>, <strong>Acerca de Mi</strong>,{" "}
                <strong>Opiniones</strong> o <strong>Línea de tiempo</strong>{" "}
                para entrar.
              </p>
            </div>
            <div className="absolute -top-4 right-6 w-8 h-8 bg-white border-l-[8px] border-t-[8px] border-black rotate-45" />
          </div>
        )}
      </div>

      {/* Mapa: cuadrado adaptativo (no recorta, no provoca scroll) */}
      <div
        className="relative overflow-hidden"
        style={{
          // ⬇️ cuadrado que se adapta a la pantalla
          // para que siempre se vea completo sin scroll
          // 950px tope máximo (puedes subirlo/bajarlo si quieres)
          width: "min(92vw, 92vh, 950px)",
          height: "min(92vw, 92vh, 950px)",
        }}
      >
        {/* Fondo del mapa */}
        <div
          className="absolute inset-0 bg-center bg-no-repeat bg-contain"
          style={{ backgroundImage: 'url("/assets/mapa-overworld.jpg")' }}
          aria-hidden
        />

        {/* Botón Volver */}
        <Link
          href="/"
          className="absolute top-3 left-3 z-30 bg-[#2b93ff] text-yellow-300 border-8 border-black rounded-md shadow-[0_10px_0_#000] px-3 py-1 font-[PressStart] text-[12px]"
        >
          VOLVER
        </Link>

        {/* Letreros compactos con tipografía adaptable */}
        <MapLabel text="Proyectos" top="9%" left="23%" href="/proyectos" />
        <MapLabel text="Acerca de Mi" top="12%" left="73%" href="/acerca" />
        <MapLabel text="Opiniones" top="84%" left="18%" href="/opiniones" />
        <MapLabel text="Línea de tiempo" top="73%" left="76%" href="/timeline" />

        {/* Globo introductorio (solo al inicio) */}
        {showIntro && (
          <SpeechBubble top="47%" left="49%">
            Explora el mapa para <br /> conocer mi portafolio
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
            width={96}
            height={96}
            priority
            className={moving ? "select-none" : "select-none animate-bob"}
            style={{ imageRendering: "pixelated" }}
          />
        </div>
      </div>

      {/* Estilos/animaciones locales */}
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
          animation: fadeIn 0.2s ease-out;
        }

        /* Botón de ayuda con aro negro y disco blanco */
        .pixel-help {
          position: relative;
          width: 84px;
          height: 84px;
          border: none;
          background: transparent;
          padding: 0;
          cursor: pointer;
          display: grid;
          place-items: center;
          animation: float 2.6s ease-in-out infinite;
          filter: drop-shadow(0 6px 0 #000);
        }
        .pixel-help__ring {
          position: absolute;
          inset: 0;
          border-radius: 9999px;
          background: #000;
          box-shadow: inset 0 0 0 8px #000;
        }
        .pixel-help__disc {
          position: relative;
          width: 76px;
          height: 76px;
          border-radius: 9999px;
          background: #fff;
          display: grid;
          place-items: center;
          border: 6px solid #000;
        }
      `}</style>
    </main>
  );
}

/* ---------- Componentes auxiliares ---------- */

function MapLabel({
  text,
  top,
  left,
  href,
}: {
  text: string;
  top: string;
  left: string;
  href?: string;
}) {
  const router = useRouter();

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (!href) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      router.push(href);
    }
  };

  return (
    <div
      className="absolute z-20"
      style={{ top, left, transform: "translate(-50%, -50%)" }}
    >
      {href ? (
        <Link href={href} className="block">
          <button
            onKeyDown={onKeyDown}
            className="
              bg-[#2b2367] text-[#ffd54a]
              border-8 border-black rounded-md
              shadow-[0_10px_0_#000]
              px-3 py-1
              font-[PressStart]
              /* Tamaño de fuente adaptable para que no se vea diminuto */
              text-[clamp(10px,1.2vw,14px)]
              hover:scale-[1.05]
              transition-transform
            "
            aria-label={text}
          >
            {text}
          </button>
        </Link>
      ) : (
        <div
          className="
            bg-[#2b2367] text-[#ffd54a]
            border-8 border-black rounded-md shadow-[0_10px_0_#000]
            px-3 py-1 font-[PressStart] text-[clamp(10px,1.2vw,14px)]
          "
        >
          {text}
        </div>
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
    <div
      className="absolute z-10"
      style={{ top, left, transform: "translate(-50%, -50%)" }}
    >
      <div
        className="
          bg-white text-black border-8 border-black rounded-md
          px-3 py-2 shadow-[0_8px_0_#000]
          font-[PressStart]
          text-[clamp(10px,1.15vw,13px)]
          leading-relaxed text-center
        "
      >
        {children}
      </div>
      {/* piquito negro */}
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
      {/* piquito blanco */}
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
