// src/app/components/OpinionesPage.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function OpinionesPage() {
  const videos = [
    { id: 1, videoId: "dQw4w9WgXcQ", titulo: "Video 1" },
    { id: 2, videoId: "dQw4w9WgXcQ", titulo: "Video 2" },
    { id: 3, videoId: "dQw4w9WgXcQ", titulo: "Video 3" },
    { id: 4, videoId: "dQw4w9WgXcQ", titulo: "Video 4" },
  ];

  return (
    <main className="min-h-screen w-full relative overflow-hidden flex items-center justify-center">
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center"
        style={{ backgroundImage: 'url("/assets/sala-cine.png")' }}
        aria-hidden
      />

      <div className="w-full max-w-[1100px] mx-auto px-4 py-8">
        <div className="bg-[#2e1b6b] border-[6px] border-black rounded-md shadow-[0_8px_0_#000] mb-8">
          <h1 className="text-center text-yellow-300 font-[PressStart] text-[22px] py-5 tracking-wider">
            OPINIONES
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-6 items-start">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {videos.map((video) => (
              <VideoCard key={video.id} videoId={video.videoId} titulo={video.titulo} />
            ))}
          </div>

          <aside className="flex flex-col items-center gap-6 lg:min-w-[320px]">
            <div className="relative bg-white border-[6px] border-black rounded-xl shadow-[0_8px_0_#000] p-5 max-w-[300px]">
              <p className="text-black text-[13px] leading-relaxed" style={{ fontFamily: 'Arial, sans-serif' }}>
                Aquí podrás escuchar las opiniones y comentarios de personas que han compartido conmigo
              </p>
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-white border-b-[6px] border-r-[6px] border-black transform rotate-45"></div>
            </div>

            <div className="relative">
              <div className="animate-float">
                <Image
                  src="/assets/avatar-parado.png"
                  alt="Avatar"
                  width={180}
                  height={180}
                  style={{ imageRendering: "pixelated" }}
                />
              </div>
            </div>
          </aside>
        </div>

        <div className="flex justify-center mt-8">
          <Link
            href="/mapa"
            className="bg-[#5a3921] hover:bg-[#6e4528] text-white border-[6px] border-black rounded-md shadow-[0_8px_0_#000] hover:shadow-[0_5px_0_#000] active:translate-y-1 transition-all px-12 py-3 font-[PressStart] text-[16px] tracking-wide"
          >
            VOLVER
          </Link>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        .animate-float { animation: float 3s ease-in-out infinite; }
      `}</style>
    </main>
  );
}

/* Componente interno VideoCard */
function VideoCard({ videoId, titulo }: { videoId: string; titulo: string }) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="bg-black border-[6px] border-white rounded-md shadow-[0_8px_0_#000] overflow-hidden">
      <div className="relative w-full aspect-video bg-black flex items-center justify-center">
        {!isPlaying ? (
          <button onClick={() => setIsPlaying(true)} className="relative w-full h-full flex items-center justify-center group">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-black" />
            <div className="relative z-10">
              <Image
                src="/assets/play-icon.png"
                alt="Reproducir"
                width={80}
                height={80}
                style={{ imageRendering: "pixelated" }}
                className="group-hover:scale-110 transition-transform"
              />
            </div>
          </button>
        ) : (
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
            title={titulo}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        )}
      </div>
    </div>
  );
}
