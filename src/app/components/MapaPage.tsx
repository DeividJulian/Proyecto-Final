"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

type Dir = "up" | "right" | "down" | "left";
type KeyMap = Record<"ArrowUp" | "ArrowDown" | "ArrowLeft" | "ArrowRight", boolean>;

export default function MapaPage() {
  // Posición del avatar en % dentro del contenedor del mapa
  const [pos, setPos] = useState({ x: 18, y: 72 });
  const dirRef = useRef<Dir>("right");
  const [moving, setMoving] = useState(false);

  const router = useRouter();
  const redirectedRef = useRef(false);

  // Puntos de interés en el mapa
  const proyectosPoint = { x: 23, y: 10 };
  const acercaPoint = { x: 73, y: 13 }; // coordenada para Acerca de Mi
  const opinionesPoint = { x: 18, y: 83 };
  const timelinePoint = { x: 76, y: 73 };

  const PROXIMITY_THRESHOLD = 6; // en porcentaje (ajusta si quieres más/menos sensibilidad)

  // Estado para mostrar/ocultar el globo de ayuda al pulsar "?"
  const [showHelpBubble, setShowHelpBubble] = useState(false);

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

      // allow Esc to close help bubble quickly
      if (e.key === "Escape") {
        setShowHelpBubble(false);
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

  // Proximidad -> redirigir a /proyectos o /acerca
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

    // Calcular distancia a Opiniones (si quisieras)
    const dxOpiniones = pos.x - opinionesPoint.x;
    const dyOpiniones = pos.y - opinionesPoint.y;
    const distanceOpiniones = Math.sqrt(dxOpiniones * dxOpiniones + dyOpiniones * dyOpiniones);

    // Redirigir a Proyectos si está cerca
    if (distanceProyectos <= PROXIMITY_THRESHOLD) {
      redirectedRef.current = true;
      // breve delay para permitir animación/feedback
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

    // (Opcional) redirigir a Opiniones
    if (distanceOpiniones <= PROXIMITY_THRESHOLD) {
      redirectedRef.current = true;
      setTimeout(() => {
        router.push("/opiniones");
      }, 220);
      return;
    }
  }, [pos, router]);

  // toggle help bubble when clicking icon
  const onQuestionClick = () => {
    setShowHelpBubble((v) => !v);
  };

  return (
    <main className="min-h-screen w-full flex items-center justify-center bg-[#072130]">
      {/* Contenedor del mapa (cuadrado y centrado) */}
      <div className="relative w-[min(92vw,950px)] aspect-square overflow-hidden">
        {/* Fondo del mapa */}
        <div
          className="absolute inset-0 bg-center bg-no-repeat bg-contain"
          style={{ backgroundImage: 'url("/assets/mapa-overworld.jpg")' }}
          aria-hidden
        />

        {/* Botón Volver (ahora a /mapa si vienes desde otras secciones) */}
        <Link
          href="/"
          className="absolute top-4 left-4 z-30 bg-[#2b93ff] text-yellow-300 border-8 border-black rounded-md shadow-[0_10px_0_#000] px-3 py-1 font-[PressStart] text-[12px]"
        >
          VOLVER
        </Link>

        {/* Etiquetas del mapa: ahora MapLabel es interactivo y accesible por teclado */}
        <MapLabel text="Proyectos" top="10%" left="23%" href="/proyectos" />
        <MapLabel text="Acerca de Mi" top="13%" left="73%" href="/acerca" />
        <MapLabel text="Opiniones" top="83%" left="18%" href="/opiniones" />
        <MapLabel text="Línea de tiempo" top="73%" left="76%" href="/timeline" />

        {/* Globito central */}
        <SpeechBubble top="47%" left="49%">
          Explora el mapa para <br /> conocer mi portafolio
        </SpeechBubble>

        {/* Signo de interrogación PNG (abajo derecha, zona "polpixel") */}
        <div
          className="absolute z-30 animate-bob flex items-end"
          style={{ bottom: "6%", right: "7%" }}
          title="Ayuda"
        >
          {/* help bubble aparece a la izquierda del icono */}
          {showHelpBubble && (
            <div
              role="dialog"
              aria-live="polite"
              aria-label="Ayuda mapa"
              className="mr-3 bg-white text-black border-8 border-black rounded-md px-6 py-5 shadow-[0_8px_0_#000] font-[PressStart] text-[18px] leading-tight max-w-xs"
            >
              Utiliza las flechas para moverte por el mapa y conocer mi portafolio, acercate a cada
              seccion para visitarla.
            </div>
          )}

          <button
            onClick={onQuestionClick}
            className="p-0 m-0 bg-transparent border-0"
            aria-expanded={showHelpBubble}
            aria-controls="help-bubble"
            title="Ayuda"
          >
            <Image
              src="/assets/question.png"
              alt="Ayuda"
              width={46}
              height={64}
              style={{ imageRendering: "pixelated", display: "block" }}
              priority
            />
          </button>
        </div>

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

/**
 * MapLabel: ahora es accesible (button) y además mantiene el Link para SEO/semántica.
 * Si el usuario hace Enter o Space en el botón, se navega también.
 */
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
  // useRouter aquí para navegar programáticamente si se presiona Enter/Space
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
        // mantenemos el Link (para comportamiento normal con click/SEO)
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
