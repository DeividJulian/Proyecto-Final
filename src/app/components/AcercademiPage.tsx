// src/app/acerca/page.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function AcercaPage() {
  const aboutText =
    "¡Hola! Soy Deivid Julian Alvarado Moran. " +
    "Soy un estudiante de Ingeniería de Software apasionado por el desarrollo web y el diseño creativo. " +
    "Me gusta construir proyectos que combinen tecnología con ideas innovadoras, aplicando diferentes lenguajes y herramientas.";

  const [habilidades] = useState(78);
  const [debilidades] = useState(34);
  const [pasatiempos] = useState(88);
  const [alimentos] = useState(64);

  // Estado para el tooltip
  const [showTooltip, setShowTooltip] = useState(false);
  const [showHabilidadesModal, setShowHabilidadesModal] = useState(false);
  const [showDebilidadesModal, setShowDebilidadesModal] = useState(false);
  const [showPasatiemposModal, setShowPasatiemposModal] = useState(false);
  const [showAlimentosModal, setShowAlimentosModal] = useState(false);

  return (
    <main className="min-h-screen w-full relative overflow-hidden flex items-center justify-center">
      {/* Fondo habitación pixel art */}
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center"
        style={{ backgroundImage: 'url("/assets/habitacion-gamer.png")' }}
        aria-hidden
      />

      {/* Botón de interrogación flotante */}
      <div className="fixed top-8 right-8 z-50">
        <button
          onClick={() => setShowTooltip(!showTooltip)}
          onBlur={() => setTimeout(() => setShowTooltip(false), 200)}
          className="relative w-20 h-20 bg-white border-[6px] border-black rounded-full shadow-[0_8px_0_#000] hover:shadow-[0_6px_0_#000] active:translate-y-1 transition-all flex items-center justify-center group overflow-hidden"
        >
          <Image
            src="/assets/question.png"
            alt="Ayuda"
            width={70}
            height={70}
            style={{ imageRendering: "pixelated" }}
            className="group-hover:scale-110 transition-transform"
          />
        </button>

        {/* Tooltip mensaje */}
        {showTooltip && (
          <div className="absolute top-24 right-0 w-[380px]">
            <div className="bg-white border-[8px] border-black rounded-xl shadow-[0_8px_0_#000] p-6">
              <p className="text-black text-[15px] leading-relaxed" style={{ fontFamily: 'Arial, sans-serif' }}>
                Puedes dar click en cada sección para conocer más de mi
              </p>
            </div>
            {/* Flecha apuntando al botón */}
            <div className="absolute -top-4 right-6 w-8 h-8 bg-white border-l-[8px] border-t-[8px] border-black transform rotate-45"></div>
          </div>
        )}
      </div>

      {/* Contenedor principal */}
      <div className="w-full max-w-[1100px] mx-auto px-4">
        {/* Grid principal: 2 columnas bien definidas */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-4">
          
          {/* ========== COLUMNA IZQUIERDA ========== */}
          <div className="space-y-4">
            {/* Cartel: ACERCA DE MI */}
            <div className="bg-[#2e1b6b] border-[6px] border-black rounded-md shadow-[0_8px_0_#000]">
              <h1 className="text-center text-yellow-300 font-[PressStart] text-[22px] py-5 tracking-wider">
                ACERCA DE MI
              </h1>
            </div>

            {/* Cuadro de texto oscuro */}
            <div className="bg-[#1e0f3e] border-[6px] border-black rounded-md shadow-[0_8px_0_#000] p-5">
              <p className="text-[13px] leading-loose text-white font-[PressStart]">
                {aboutText}
              </p>
            </div>

            {/* HABILIDADES - Clickeable */}
            <div>
              <div className="mb-3">
                <button
                  onClick={() => setShowHabilidadesModal(true)}
                  className="inline-block bg-[#2e1b6b] hover:bg-[#3d2589] text-yellow-300 px-5 py-2 border-[6px] border-black rounded-md font-[PressStart] text-[15px] shadow-[0_6px_0_#000] hover:shadow-[0_4px_0_#000] active:translate-y-1 transition-all cursor-pointer"
                >
                  HABILIDADES
                </button>
              </div>
              <div className="bg-[#0d1821] border-[6px] border-black rounded-md p-2 shadow-[0_6px_0_#000] max-w-[75%]">
                <div className="w-full bg-[#1a2530] h-7 rounded-sm overflow-hidden border-2 border-black">
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

            {/* DEBILIDADES - Clickeable */}
            <div>
              <div className="mb-3">
                <button
                  onClick={() => setShowDebilidadesModal(true)}
                  className="inline-block bg-[#2e1b6b] hover:bg-[#3d2589] text-yellow-300 px-5 py-2 border-[6px] border-black rounded-md font-[PressStart] text-[15px] shadow-[0_6px_0_#000] hover:shadow-[0_4px_0_#000] active:translate-y-1 transition-all cursor-pointer"
                >
                  DEBILIDADES
                </button>
              </div>
              <div className="bg-[#0d1821] border-[6px] border-black rounded-md p-2 shadow-[0_6px_0_#000] max-w-[75%]">
                <div className="w-full bg-[#1a2530] h-7 rounded-sm overflow-hidden border-2 border-black">
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

            {/* Botón VOLVER (va a /mapa) */}
            <div className="pt-2">
              <Link
                href="/mapa"
                className="inline-block bg-[#5a3921] hover:bg-[#6e4528] text-white border-[6px] border-black rounded-md shadow-[0_8px_0_#000] hover:shadow-[0_5px_0_#000] active:translate-y-1 transition-all px-10 py-3 font-[PressStart] text-[16px] tracking-wide"
              >
                VOLVER
              </Link>
            </div>
          </div>

          {/* ========== COLUMNA DERECHA ========== */}
          <aside className="space-y-4 lg:min-w-[400px]">
            {/* Avatar con flechas */}
            <div className="relative bg-[#1e0f3e] border-[6px] border-black rounded-md shadow-[0_8px_0_#000] p-6 flex items-center justify-center min-h-[320px]">
              {/* Flecha izquierda */}
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[40px] text-[#5fb5e8] font-bold select-none">
                ◄
              </div>
              
              {/* Avatar centrado con animación flotante */}
              <div className="relative z-10 animate-float">
                <Image
                  src="/assets/avatar-parado.png"
                  alt="Avatar pixel art"
                  width={180}
                  height={180}
                  style={{ imageRendering: "pixelated" }}
                />
              </div>
              
              {/* Flecha derecha */}
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[40px] text-[#5fb5e8] font-bold select-none">
                ►
              </div>
            </div>

            {/* PASATIEMPOS - Clickeable */}
            <div>
              <div className="mb-3">
                <button
                  onClick={() => setShowPasatiemposModal(true)}
                  className="inline-block bg-[#2e1b6b] hover:bg-[#3d2589] text-yellow-300 px-5 py-2 border-[6px] border-black rounded-md font-[PressStart] text-[15px] shadow-[0_6px_0_#000] hover:shadow-[0_4px_0_#000] active:translate-y-1 transition-all cursor-pointer"
                >
                  PASATIEMPOS
                </button>
              </div>
              <div className="bg-[#0d1821] border-[6px] border-black rounded-md p-2 shadow-[0_6px_0_#000] w-full">
                <div className="w-full bg-[#1a2530] h-7 rounded-sm overflow-hidden border-2 border-black">
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

            {/* ALIMENTOS QUE DISFRUTO - Clickeable */}
            <div>
              <div className="mb-3">
                <button
                  onClick={() => setShowAlimentosModal(true)}
                  className="inline-block bg-[#2e1b6b] hover:bg-[#3d2589] text-yellow-300 px-5 py-2 border-[6px] border-black rounded-md font-[PressStart] text-[15px] shadow-[0_6px_0_#000] hover:shadow-[0_4px_0_#000] active:translate-y-1 transition-all cursor-pointer"
                >
                  ALIMENTOS QUE DISFRUTO
                </button>
              </div>
              <div className="bg-[#0d1821] border-[6px] border-black rounded-md p-2 shadow-[0_6px_0_#000] w-full">
                <div className="w-full bg-[#1a2530] h-7 rounded-sm overflow-hidden border-2 border-black">
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
      </div>

      {/* Estilos para animaciones */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-15px);
          }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes scaleIn {
          from {
            transform: scale(0.9);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }
      `}</style>

      {/* MODAL DE HABILIDADES */}
      {showHabilidadesModal && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 animate-fadeIn"
          onClick={() => setShowHabilidadesModal(false)}
        >
          <div 
            className="w-[90%] max-w-[950px] max-h-[85vh] overflow-hidden animate-scaleIn"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Fondo del modal igual a la imagen */}
            <div
              className="relative bg-cover bg-center border-[8px] border-black rounded-lg shadow-[0_12px_0_#000]"
              style={{ backgroundImage: 'url("/assets/dojo-clasico.png")' }}
            >
              {/* Contenido del modal */}
              <div className="relative z-10 p-8">
                {/* Título HABILIDADES */}
                <div className="bg-[#2e1b6b] border-[6px] border-black rounded-md shadow-[0_8px_0_#000] mb-6">
                  <h2 className="text-center text-yellow-300 font-[PressStart] text-[22px] py-5 tracking-wider">
                    HABILIDADES
                  </h2>
                </div>

                {/* Lista de habilidades con barras */}
                <div className="space-y-6 mb-8">
                  <HabilidadBarraItem color="#35f5a6" titulo="Perseverancia" />
                  <HabilidadBarraItem color="#22d3ee" titulo="Creatividad" />
                  <HabilidadBarraItem color="#ffd200" titulo="Adaptibilidad" />
                </div>

                {/* Botón VOLVER centrado — cierra el modal y NO navega */}
                <div className="flex justify-center">
                  <button
                    onClick={() => setShowHabilidadesModal(false)}
                    className="bg-[#5a3921] hover:bg-[#6e4528] text-white border-[6px] border-black rounded-md shadow-[0_8px_0_#000] hover:shadow-[0_5px_0_#000] active:translate-y-1 transition-all px-12 py-3 font-[PressStart] text-[16px] tracking-wide"
                  >
                    VOLVER
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL DE DEBILIDADES */}
      {showDebilidadesModal && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 animate-fadeIn"
          onClick={() => setShowDebilidadesModal(false)}
        >
          <div 
            className="w-[90%] max-w-[950px] max-h-[85vh] overflow-hidden animate-scaleIn"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="relative bg-cover bg-center border-[8px] border-black rounded-lg shadow-[0_12px_0_#000]"
              style={{ backgroundImage: 'url("/assets/dojo-clasico.png")' }}
            >
              <div className="relative z-10 p-8">
                <div className="bg-[#2e1b6b] border-[6px] border-black rounded-md shadow-[0_8px_0_#000] mb-6">
                  <h2 className="text-center text-yellow-300 font-[PressStart] text-[22px] py-5 tracking-wider">
                    DEBILIDADES
                  </h2>
                </div>

                <div className="space-y-6 mb-8">
                  <HabilidadBarraItem color="#ff6b6b" titulo="Impaciencia" />
                  <HabilidadBarraItem color="#ff8c42" titulo="Perfeccionismo" />
                  <HabilidadBarraItem color="#e63946" titulo="Autocrítica" />
                </div>

                <div className="flex justify-center">
                  <button
                    onClick={() => setShowDebilidadesModal(false)}
                    className="bg-[#5a3921] hover:bg-[#6e4528] text-white border-[6px] border-black rounded-md shadow-[0_8px_0_#000] hover:shadow-[0_5px_0_#000] active:translate-y-1 transition-all px-12 py-3 font-[PressStart] text-[16px] tracking-wide"
                  >
                    VOLVER
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL DE PASATIEMPOS */}
      {showPasatiemposModal && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 animate-fadeIn"
          onClick={() => setShowPasatiemposModal(false)}
        >
          <div 
            className="w-[90%] max-w-[950px] max-h-[85vh] overflow-hidden animate-scaleIn"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="relative bg-cover bg-center border-[8px] border-black rounded-lg shadow-[0_12px_0_#000]"
              style={{ backgroundImage: 'url("/assets/dojo-clasico.png")' }}
            >
              <div className="relative z-10 p-8">
                <div className="bg-[#2e1b6b] border-[6px] border-black rounded-md shadow-[0_8px_0_#000] mb-6">
                  <h2 className="text-center text-yellow-300 font-[PressStart] text-[22px] py-5 tracking-wider">
                    PASATIEMPOS
                  </h2>
                </div>

                <div className="space-y-6 mb-8">
                  <HabilidadBarraItem color="#22d3ee" titulo="Videojuegos" />
                  <HabilidadBarraItem color="#a78bfa" titulo="Programación" />
                  <HabilidadBarraItem color="#34d399" titulo="Música" />
                </div>

                <div className="flex justify-center">
                  <button
                    onClick={() => setShowPasatiemposModal(false)}
                    className="bg-[#5a3921] hover:bg-[#6e4528] text-white border-[6px] border-black rounded-md shadow-[0_8px_0_#000] hover:shadow-[0_5px_0_#000] active:translate-y-1 transition-all px-12 py-3 font-[PressStart] text-[16px] tracking-wide"
                  >
                    VOLVER
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL DE ALIMENTOS QUE DISFRUTO */}
      {showAlimentosModal && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 animate-fadeIn"
          onClick={() => setShowAlimentosModal(false)}
        >
          <div 
            className="w-[90%] max-w-[950px] max-h-[85vh] overflow-hidden animate-scaleIn"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="relative bg-cover bg-center border-[8px] border-black rounded-lg shadow-[0_12px_0_#000]"
              style={{ backgroundImage: 'url("/assets/dojo-clasico.png")' }}
            >
              <div className="relative z-10 p-8">
                <div className="bg-[#2e1b6b] border-[6px] border-black rounded-md shadow-[0_8px_0_#000] mb-6">
                  <h2 className="text-center text-yellow-300 font-[PressStart] text-[22px] py-5 tracking-wider">
                    ALIMENTOS QUE DISFRUTO
                  </h2>
                </div>

                <div className="space-y-6 mb-8">
                  <HabilidadBarraItem color="#ffd200" titulo="Pizza" />
                  <HabilidadBarraItem color="#ff6b9d" titulo="Sushi" />
                  <HabilidadBarraItem color="#fb923c" titulo="Hamburguesas" />
                </div>

                <div className="flex justify-center">
                  <button
                    onClick={() => setShowAlimentosModal(false)}
                    className="bg-[#5a3921] hover:bg-[#6e4528] text-white border-[6px] border-black rounded-md shadow-[0_8px_0_#000] hover:shadow-[0_5px_0_#000] active:translate-y-1 transition-all px-12 py-3 font-[PressStart] text-[16px] tracking-wide"
                  >
                    VOLVER
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

/* Componente para las barras de habilidades en el modal */
function HabilidadBarraItem({ color, titulo }: { color: string; titulo: string }) {
  return (
    <div className="flex items-center gap-4">
      {/* Icono decorativo (triángulo azul como en la imagen) */}
      <div className="flex-shrink-0 w-12 h-12 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#5fb5e8] to-[#2d5f8d] border-4 border-black" 
             style={{ 
               clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
               filter: 'drop-shadow(0 4px 0 #000)'
             }} 
        />
      </div>

      {/* Barra con título */}
      <div className="flex-1">
        <div className="bg-[#1e0f3e] border-[6px] border-black rounded-md shadow-[0_6px_0_#000] p-3">
          <div className="bg-[#0d1821] border-4 border-black rounded-sm overflow-hidden">
            <div 
              className="h-12 flex items-center justify-center text-black font-bold text-[18px]"
              style={{ 
                background: color,
                boxShadow: "inset 0 -4px 0 rgba(0,0,0,0.3)",
                fontFamily: 'Arial, sans-serif'
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
