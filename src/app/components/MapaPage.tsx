"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";

type Dir = "up" | "right" | "down" | "left";
type KeyMap = Record<"ArrowUp" | "ArrowDown" | "ArrowLeft" | "ArrowRight", boolean>;

/** Constante estable fuera del componente para no generar warnings en deps */
const PROXIMITY_THRESHOLD = 6; // en porcentaje (ajusta si quieres más/menos sensibilidad)

export default function MapaPage() {
  // Posición del avatar en % dentro del contenedor del mapa
  const [pos, setPos] = useState({ x: 18, y: 72 });
  const dirRef = useRef<Dir>("right");
  const [moving, setMoving] = useState(false);

  const router = useRouter();
  const redirectedRef = useRef(false);

  // Puntos de interés en el mapa (memoizados para no romper reglas de deps)
  const proyectosPoint = useMemo(() => ({ x: 23, y: 10 }), []);
  const acercaPoint = useMemo(() => ({ x: 73, y: 13 }), []); // coordenada para Acerca de Mi
  const opinionesPoint = useMemo(() => ({ x: 18, y: 83 }), []);
  const timelinePoint = useMemo(() => ({ x: 76, y: 73 }), []); // Línea de tiempo

  // Estado para mostrar/ocultar el globo de ayuda del botón "?"
  const [showTooltip, setShowTooltip] = useState(false);

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
      }

      // Escape cierra el tooltip
      if (e.key === "Escape") {
        setShowTooltip(false);
      }
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

  // Proximidad -> redirigir a /proyectos, /acerca, /opiniones, /timeline
  useEffect(() => {
    if (redirectedRef.current) return;

    // Calcular distancia a Proyectos
    const dxProyectos = pos.x - proyectosPoint.x;
    const dyProyectos = pos.y - proyectosPoint.y;
    const distanceProyectos = Math.sqrt(dxProyectos * dxProyectos + dyProyectos * dyProyectos);

    // Calcular distancia a Acerca de Mi
    const dxAcerca = pos.x - acercaPoint.x;
    const dyAcerca = pos.y - acercaPoint.y;
    const distanceAcerca = Math.sqrt(dxAcerca * dxAcerca + dyAcerca * dyAcerca);

    // Calcular distancia a Opiniones
    const dxOpiniones = pos.x - opinionesPoint.x;
    const dyOpiniones = pos.y - opinionesPoint.y;
    const distanceOpiniones = Math.sqrt(dxOpiniones * dxOpiniones + dyOpiniones * dyOpiniones);

    // Calcular distancia a Línea de tiempo
    const dxTimeline = pos.x - timelinePoint.x;
    const dyTimeline = pos.y - timelinePoint.y;
    const distanceTimeline = Math.sqrt(dxTimeline * dxTimeline + dyTimeline * dyTimeline);

    // Redirigir a Proyectos si está cerca
    if (distanceProyectos <= PROXIMITY_THRESHOLD) {
      redirectedRef.current = true;
      setTimeout(() => {
        router.push("/proyectos");
      }, 220);
      return;
    }

    // Redirigir a Acerca de Mi si está cerca
    if (distanceAcerca <= PROXIMITY_THRESHOLD) {
      redirectedRef.current = true;
      setTimeout(() => {
        router.push("/acerca");
      }, 220);
      return;
    }

    // Redirigir a Opiniones si está cerca
    if (distanceOpiniones <= PROXIMITY_THRESHOLD) {
      redirectedRef.current = true;
      setTimeout(() => {
        router.push("/opiniones");
      }, 220);
      return;
    }

    // Redirigir a Línea de tiempo si está cerca
    if (distanceTimeline <= PROXIMITY_THRESHOLD) {
      redirectedRef.current = true;
      setTimeout(() => {
        router.push("/timeline");
      }, 220);
      return;
    }
  }, [pos, router, proyectosPoint, acercaPoint, opinionesPoint, timelinePoint]);

  return (
    <main className="min-h-screen w-full flex items-center justify-center bg-[#072130]">
      {/* Botón de interrogación flotante (igual que en /acerca) */}
      <div className="fixed top-8 right-8 z-50">
        <button
          onClick={() => setShowTooltip((v) => !v)}
          onBlur={() => setTimeout(() => setShowTooltip(false), 200)}
          className="relative w-20 h-20 bg-white border-[6px] border-black rounded-full shadow-[0_8px_0_#000] hover:shadow-[0_6px_0_#000] active:translate-y-1 transition-all flex items-center justify-center group overflow-hidden"
          aria-label="Ayuda"
          title="Ayuda"
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
          <div className="absolute top-24 right-0 w-[380px]">
            <div className="bg-white border-[8px] border-black rounded-xl shadow-[0_8px_0_#000] p-6">
              <p className="text-black text-[15px] leading-relaxed" style={{ fontFamily: "Arial, sans-serif" }}>
                Utiliza las flechas para moverte por el mapa. Acércate a cada
                letrero para entrar: <strong>Proyectos</strong>, <strong>Acerca de Mi</strong>,
                <strong> Opiniones</strong> o <strong>Línea de tiempo</strong>.
              </p>
            </div>
            <div className="absolute -top-4 right-6 w-8 h-8 bg-white border-l-[8px] border-t-[8px] border-black rotate-45" />
          </div>
        )}
      </div>

      {/* Contenedor del mapa (cuadrado y centrado) */}
      <div className="relative w-[min(92vw,950px)] aspect-square overflow-hidden">
        {/* Fondo del mapa */}
        <div
          className="absolute inset-0 bg-center bg-no-repeat bg-contain"
          style={{ backgroundImage: 'url("/assets/mapa-overworld.jpg")' }}
          aria-hidden
        />

        {/* Botón Volver */}
        <Link
          href="/"
          className="absolute top-4 left-4 z-30 bg-[#2b93ff] text-yellow-300 border-8 border-black rounded-md shadow-[0_10px_0_#000] px-3 py-1 font-[PressStart] text-[12px]"
        >
          VOLVER
        </Link>

        {/* Etiquetas del mapa */}
        <MapLabel text="Proyectos" top="10%" left="23%" href="/proyectos" />
        <MapLabel text="Acerca de Mi" top="13%" left="73%" href="/acerca" />
        <MapLabel text="Opiniones" top="83%" left="18%" href="/opiniones" />
        <MapLabel text="Línea de tiempo" top="73%" left="76%" href="/timeline" />

        {/* Globito central */}
        <SpeechBubble top="47%" left="49%">
          Explora el mapa para <br /> conocer mi portafolio
        </SpeechBubble>

        {/* Avatar PNG (idle bob cuando no se mueve) */}
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

      {/* Animaciones CSS locales */}
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
            className="bg-[#2b2367] text-[#ffd54a] border-8 border-black rounded-md shadow-[0_10px_0_#000] px-4 py-2 font-[PressStart] text-[12px] hover:scale-[1.04] transition-transform"
            aria-label={text}
          >
            {text}
          </button>
        </Link>
      ) : (
        <div className="bg-[#2b2367] text-[#ffd54a] border-8 border-black rounded-md shadow-[0_10px_0_#000] px-4 py-2 font-[PressStart] text-[12px]">
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
      <div className="bg-white text-black border-8 border-black rounded-md px-4 py-3 shadow-[0_8px_0_#000] font-[PressStart] text-[11px] leading-relaxed text-center">
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
