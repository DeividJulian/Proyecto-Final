"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";

type Dir = "up" | "right" | "down" | "left";
type KeyMap = Record<"ArrowUp" | "ArrowDown" | "ArrowLeft" | "ArrowRight", boolean>;

const PROXIMITY_THRESHOLD = 6; // Sensibilidad de colisión (en porcentaje)

export default function MapaPage() {
  const [pos, setPos] = useState({ x: 18, y: 72 });
  const dirRef = useRef<Dir>("right");
  const [moving, setMoving] = useState(false);
  const router = useRouter();
  const redirectedRef = useRef(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const proyectosPoint = useMemo(() => ({ x: 23, y: 10 }), []);
  const acercaPoint = useMemo(() => ({ x: 73, y: 13 }), []);
  const opinionesPoint = useMemo(() => ({ x: 18, y: 83 }), []);
  const timelinePoint = useMemo(() => ({ x: 76, y: 73 }), []);

  // Movimiento con flechas
  useEffect(() => {
    let raf: number | null = null;
    const speed = 0.45;
    const keys: KeyMap = { ArrowUp: false, ArrowDown: false, ArrowLeft: false, ArrowRight: false };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key in keys) {
        const k = e.key as keyof KeyMap;
        keys[k] = true;
        setMoving(true);
        dirRef.current = k === "ArrowUp" ? "up" : k === "ArrowDown" ? "down" : k === "ArrowLeft" ? "left" : "right";
      }
      if (e.key === "Escape") setShowTooltip(false);
    };

    const onKeyUp = (e: KeyboardEvent) => {
      if (e.key in keys) {
        keys[e.key as keyof KeyMap] = false;
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

  // Redirecciones
  useEffect(() => {
    if (redirectedRef.current) return;
    const dist = (a: any, b: any) => Math.hypot(a.x - b.x, a.y - b.y);

    if (dist(pos, proyectosPoint) <= PROXIMITY_THRESHOLD) {
      redirectedRef.current = true;
      setTimeout(() => router.push("/proyectos"), 200);
    } else if (dist(pos, acercaPoint) <= PROXIMITY_THRESHOLD) {
      redirectedRef.current = true;
      setTimeout(() => router.push("/acerca"), 200);
    } else if (dist(pos, opinionesPoint) <= PROXIMITY_THRESHOLD) {
      redirectedRef.current = true;
      setTimeout(() => router.push("/opiniones"), 200);
    } else if (dist(pos, timelinePoint) <= PROXIMITY_THRESHOLD) {
      redirectedRef.current = true;
      setTimeout(() => router.push("/timeline"), 200);
    }
  }, [pos, router, proyectosPoint, acercaPoint, opinionesPoint, timelinePoint]);

  return (
    <main className="min-h-screen w-full flex items-center justify-center bg-[#072130] overflow-hidden">
      {/* Botón ayuda */}
      <div className="fixed top-8 right-8 z-50">
        <button
          onClick={() => setShowTooltip((v) => !v)}
          onBlur={() => setTimeout(() => setShowTooltip(false), 200)}
          className="relative w-20 h-20 bg-white border-[6px] border-black rounded-full shadow-[0_8px_0_#000] hover:shadow-[0_6px_0_#000] active:translate-y-1 transition-all flex items-center justify-center"
          aria-label="Ayuda"
          title="Ayuda"
        >
          <Image src="/assets/question.png" alt="Ayuda" width={70} height={70} style={{ imageRendering: "pixelated" }} />
        </button>

        {showTooltip && (
          <div className="absolute top-24 right-0 w-[380px]">
            <div className="bg-white border-[8px] border-black rounded-xl shadow-[0_8px_0_#000] p-6">
              <p className="text-black text-[15px] leading-relaxed font-sans">
                Usa las flechas para moverte. Acércate a un letrero para visitar una sección.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Mapa centrado */}
      <div className="relative w-[min(90vw,700px)] aspect-square overflow-hidden">
        <Image
          src="/assets/mapa-overworld.jpg"
          alt="Mapa"
          fill
          sizes="100vw"
          className="object-contain"
          priority
          style={{ imageRendering: "pixelated" }}
        />

        <Link
          href="/"
          className="absolute top-4 left-4 z-30 bg-[#2b93ff] text-yellow-300 border-8 border-black rounded-md shadow-[0_10px_0_#000] px-3 py-1 font-[PressStart] text-[12px]"
        >
          VOLVER
        </Link>

        {/* Letreros */}
        <MapLabel text="Proyectos" top="10%" left="23%" href="/proyectos" />
        <MapLabel text="Acerca de Mi" top="13%" left="73%" href="/acerca" />
        <MapLabel text="Opiniones" top="83%" left="18%" href="/opiniones" />
        <MapLabel text="Línea de tiempo" top="73%" left="76%" href="/timeline" />

        {/* Texto central */}
        <SpeechBubble top="47%" left="49%">
          Explora el mapa para <br /> conocer mi portafolio
        </SpeechBubble>

        {/* Avatar */}
        <div
          className="absolute z-20"
          style={{ left: `${pos.x}%`, top: `${pos.y}%`, transform: "translate(-50%, -80%)" }}
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
      `}</style>
    </main>
  );
}

function MapLabel({ text, top, left, href }: { text: string; top: string; left: string; href?: string }) {
  const router = useRouter();
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (href && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      router.push(href);
    }
  };

  return (
    <div className="absolute z-20" style={{ top, left, transform: "translate(-50%, -50%)" }}>
      <Link href={href || "#"}>
        <button
          onKeyDown={onKeyDown}
          className="bg-[#2b2367] text-[#ffd54a] border-8 border-black rounded-md shadow-[0_10px_0_#000] px-4 py-2 font-[PressStart] text-[12px] hover:scale-[1.04] transition-transform"
          aria-label={text}
        >
          {text}
        </button>
      </Link>
    </div>
  );
}

function SpeechBubble({ top, left, children }: { top: string; left: string; children: React.ReactNode }) {
  return (
    <div className="absolute z-10" style={{ top, left, transform: "translate(-50%, -50%)" }}>
      <div className="bg-white text-black border-8 border-black rounded-md px-4 py-3 shadow-[0_8px_0_#000] font-[PressStart] text-[11px] leading-relaxed text-center">
        {children}
      </div>
      <div className="mx-auto" style={{ width: 0, height: 0, borderLeft: "10px solid transparent", borderRight: "10px solid transparent", borderTop: "12px solid #000", transform: "translateY(-3px)" }} />
      <div className="mx-auto" style={{ width: 0, height: 0, borderLeft: "8px solid transparent", borderRight: "8px solid transparent", borderTop: "10px solid #fff", transform: "translateY(-13px)" }} />
    </div>
  );
}
