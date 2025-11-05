"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

type Theme = "light" | "dark";

export default function ProyectosPage() {
  const [showTooltip, setShowTooltip] = useState(false);
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("theme") as Theme | null;
      if (stored === "dark" || stored === "light") setTheme(stored);
    }
  }, []);

  const bgUrl =
    theme === "dark"
      ? "/assets/proyectos-oscuro.jpg"
      : "/assets/cielo.jpg";

  return (
    <main className="min-h-screen w-full overflow-x-hidden relative">
      {/* Fondo dinámico según tema */}
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center"
        style={{ backgroundImage: `url(${bgUrl})`, imageRendering: "pixelated" }}
        aria-hidden
      />

      {/* Botón de interrogación */}
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
              <p className="text-black text-[15px] leading-relaxed font-sans">
                Aquí verás mis proyectos. Haz clic en <strong>VER PROYECTO</strong> o usa <strong>VOLVER</strong> para regresar.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Cabecera */}
      <header className="px-4 pt-10 pb-6">
        <div className="mx-auto max-w-6xl">
          <div
            className={`mx-auto w-[min(820px,92vw)] border-8 border-black rounded-md shadow-[0_12px_0_#000] ${
              theme === "dark" ? "bg-[#1e293b]" : "bg-[#1f4875]"
            }`}
          >
            <h1 className="text-center text-white font-[PressStart] text-[28px] py-6 tracking-wide">
              MIS PROYECTOS
            </h1>
          </div>
        </div>
      </header>

      {/* Rejilla de proyectos */}
      <section className="mx-auto max-w-6xl px-4 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 place-items-center">
          <ProjectCard title="Proyecto 1" img="/assets/mapas.png" link="https://taller-maps.vercel.app/" />
          <ProjectCard title="Proyecto 2" img="/assets/porta.png" link="https://example-portfolio-xi.vercel.app/" />
          <ProjectCard title="Proyecto 3" img="/assets/tiquete.png" link="https://taller-tiquete.vercel.app/" />
        </div>

        {/* Botón volver */}
        <div className="mt-10 flex items-center justify-center">
          <PixelBrownLinkBtn href="/mapa">VOLVER</PixelBrownLinkBtn>
        </div>
      </section>
    </main>
  );
}

/* ========= Componentes auxiliares ========= */
function ProjectCard({ title, img, link }: { title: string; img: string; link: string }) {
  return (
    <div className="relative w-[290px]">
      <div
        className="relative mx-auto w-[290px] bg-[#0f2a37] border-8 border-black rounded-md shadow-[0_14px_0_#000] px-3 pt-3 pb-5 hover:scale-[1.06] transition-transform"
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
        <p className="mt-3 text-center text-[12px] font-[PressStart] text-[#ffd54a]">{title}</p>
        <div className="mt-3 text-center">
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#2a6f97] text-white border-4 border-black rounded-md px-4 py-2 font-[PressStart] text-[10px] shadow-[0_6px_0_#000] hover:translate-y-0.5 transition-transform"
          >
            VER PROYECTO
          </a>
        </div>
      </div>
    </div>
  );
}

function PixelBrownLinkBtn({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-block bg-[#6e3a06] text-white border-8 border-black rounded-md shadow-[0_10px_0_#000] px-8 py-3 font-[PressStart] text-[16px] tracking-wide hover:translate-y-0.5 transition-transform"
    >
      {children}
    </Link>
  );
}
