"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

type Theme = "light" | "dark";

export default function ProyectosPage() {
  const [showTooltip, setShowTooltip] = useState(false);
  const [theme, setTheme] = useState<Theme>("light");

  // Lee el tema guardado (persistencia total en la app)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("theme") as Theme | null;
      if (stored === "dark" || stored === "light") setTheme(stored);
    }
  }, []);

  const isDark = theme === "dark";
  const bgUrl = isDark ? "/assets/proyectos-oscuro.jpg" : "/assets/cielo.jpg";

  // Paletas para botones
  const headerBg = isDark ? "bg-[#1e293b]" : "bg-[#1f4875]";
  const cardBg = "bg-[#0f2a37]"; // mantiene estilo arcade
  const linkBtn =
    "inline-block border-4 border-black rounded-md px-4 py-2 font-[PressStart] text-[10px] shadow-[0_6px_0_#000] transition-transform hover:translate-y-0.5 active:translate-y-1";
  const linkBtnColors = isDark ? "bg-[#2563eb] text-white" : "bg-[#2a6f97] text-white";
  const volverBtn =
    isDark
      ? "bg-[#4d2b00] text-[#fef3c7]" // marrón oscuro + crema
      : "bg-[#6e3a06] text-white";

  return (
    <main className="min-h-screen w-full overflow-x-hidden relative">
      {/* Fondo según tema */}
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center"
        style={{ backgroundImage: `url(${bgUrl})`, imageRendering: "pixelated" }}
        aria-hidden
      />

      {/* Botón de interrogación flotante con animación */}
      <div className="fixed top-8 right-8 z-50">
        <button
          onClick={() => setShowTooltip((v) => !v)}
          onBlur={() => setTimeout(() => setShowTooltip(false), 200)}
          className="relative w-20 h-20 bg-white border-[6px] border-black rounded-full shadow-[0_8px_0_#000] hover:shadow-[0_6px_0_#000] active:translate-y-1 transition-all grid place-items-center overflow-hidden animate-bob"
          aria-label="Ayuda"
          title="Ayuda"
        >
          <div className="w-[60px] h-[60px] rounded-full bg-black/80 grid place-items-center">
            <Image
              src="/assets/question.png"
              alt="Ayuda"
              width={36}
              height={36}
              style={{ imageRendering: "pixelated" }}
              priority
            />
          </div>
        </button>

        {showTooltip && (
          <div className="absolute top-24 right-0 w-[380px]">
            <div className="bg-white border-[8px] border-black rounded-xl shadow-[0_8px_0_#000] p-6">
              <p className="text-black text-[15px] leading-relaxed" style={{ fontFamily: "Arial, sans-serif" }}>
                Aquí verás mis proyectos. Haz clic en <strong>VER PROYECTO</strong> para abrirlos
                en una pestaña nueva. Usa <strong>VOLVER</strong> para regresar al mapa.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Cabecera */}
      <header className="px-4 pt-10 pb-6">
        <div className="mx-auto max-w-6xl">
          <div className={`mx-auto w-[min(820px,92vw)] ${headerBg} border-8 border-black rounded-md shadow-[0_12px_0_#000]`}>
            <h1 className="text-center text-white font-[PressStart] text-[28px] py-6 tracking-wide">
              MIS PROYECTOS
            </h1>
          </div>
        </div>
      </header>

      {/* Rejilla */}
      <section className="mx-auto max-w-6xl px-4 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 place-items-center">
          <ProjectCard title="Proyecto 1" img="/assets/mapas.png" link="https://taller-maps.vercel.app/" isDark={isDark} cardBg={cardBg} linkBtn={linkBtn} linkBtnColors={linkBtnColors} />
          <ProjectCard title="Proyecto 2" img="/assets/porta.png" link="https://example-portfolio-xi.vercel.app/" isDark={isDark} cardBg={cardBg} linkBtn={linkBtn} linkBtnColors={linkBtnColors} />
          <ProjectCard title="Proyecto 3" img="/assets/tiquete.png" link="https://taller-tiquete.vercel.app/" isDark={isDark} cardBg={cardBg} linkBtn={linkBtn} linkBtnColors={linkBtnColors} />
        </div>

        {/* Volver */}
        <div className="mt-10 flex items-center justify-center">
          <Link
            href="/mapa"
            className={`inline-block ${volverBtn} border-8 border-black rounded-md shadow-[0_10px_0_#000] px-8 py-3 font-[PressStart] text-[16px] tracking-wide hover:translate-y-0.5 hover:shadow-[0_8px_0_#000] active:translate-y-1 transition-transform`}
          >
            VOLVER
          </Link>
        </div>
      </section>

      {/* animación flotante */}
      <style jsx>{`
        @keyframes bob {
          0% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
          100% { transform: translateY(0); }
        }
        .animate-bob {
          animation: bob 1.4s ease-in-out infinite;
        }
      `}</style>
    </main>
  );
}

/* ========= Componentes ========= */
function ProjectCard({
  title,
  img,
  link,
  isDark,
  cardBg,
  linkBtn,
  linkBtnColors,
}: {
  title: string;
  img: string;
  link: string;
  isDark: boolean;
  cardBg: string;
  linkBtn: string;
  linkBtnColors: string;
}) {
  return (
    <div className="relative w-[290px]">
      <div
        className={`relative mx-auto w-[290px] ${cardBg} border-8 border-black rounded-md shadow-[0_14px_0_#000] px-3 pt-3 pb-5 transition-transform duration-150 ease-out hover:scale-[1.06]`}
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

        <p className={`mt-3 text-center text-[12px] font-[PressStart] ${isDark ? "text-[#fde68a]" : "text-[#ffd54a]"}`}>
          {title}
        </p>

        <div className="mt-3 text-center">
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className={`${linkBtn} ${linkBtnColors}`}
          >
            VER PROYECTO
          </a>
        </div>
      </div>
    </div>
  );
}
