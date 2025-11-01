'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const LineaTiempoPage = () => {
  const router = useRouter();

  const timelineNodes = [
    {
      id: 1,
      image: '/assets/reproducir.png',
      alt: 'Excursionista en montaña',
      position: { top: '20%', left: '38%' }
    },
    {
      id: 2,
      image: '/assets/sala-cine.png',
      alt: 'Ciudad al atardecer',
      position: { top: '20%', right: '22%' }
    },
    {
      id: 3,
      image: '/assets/mapas.png',
      alt: 'Playa al atardecer',
      position: { top: '50%', left: '50%', transform: 'translateX(-50%)' }
    }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/linea de tiempo.png"
          alt="Fondo línea de tiempo"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Pixel border decoration with darker overlay */}
      <div className="absolute inset-0 pointer-events-none z-[1]">
        <div className="w-full h-full border-8 border-cyan-600" style={{
          boxShadow: 'inset 0 0 30px rgba(0, 0, 0, 0.5)',
          imageRendering: 'pixelated',
          backgroundColor: 'rgba(0, 20, 40, 0.3)'
        }}></div>
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Header */}
        <div className="flex justify-center mb-12">
          <div className="bg-gradient-to-r from-indigo-900 to-indigo-800 px-20 py-6 rounded-lg border-4 border-indigo-700 shadow-2xl" style={{
            imageRendering: 'pixelated'
          }}>
            <h1 className="text-6xl font-bold text-yellow-400 tracking-wider" style={{
              textShadow: '4px 4px 0px rgba(0,0,0,0.7)',
              fontFamily: 'monospace',
              imageRendering: 'pixelated'
            }}>
              LÍNEA DE TIEMPO
            </h1>
          </div>
        </div>

        {/* Main content area */}
        <div className="relative max-w-6xl mx-auto">
          {/* Character avatar - left side */}
          <div className="absolute left-8 top-1/2 -translate-y-1/2 z-20">
            <div className="bg-cyan-700 p-4 rounded-lg border-4 border-cyan-900 shadow-2xl" style={{
              imageRendering: 'pixelated'
            }}>
              <div className="w-36 h-36 relative">
                <div className="w-full h-full bg-gradient-to-b from-amber-200 to-amber-300 rounded-lg relative overflow-hidden flex items-center justify-center">
                  <Image 
                    src="/assets/porta.png" 
                    alt="Avatar"
                    width={130}
                    height={130}
                    className="object-contain"
                    style={{ imageRendering: 'pixelated' }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Timeline container */}
          <div className="ml-56 mr-12 relative min-h-[500px]">
            {/* Timeline lines */}
            <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
              {/* Horizontal main line */}
              <line x1="10%" y1="28%" x2="90%" y2="28%" 
                    stroke="#22c55e" strokeWidth="5" />
              
              {/* Vertical lines */}
              <line x1="35%" y1="28%" x2="35%" y2="23%" 
                    stroke="#22c55e" strokeWidth="5" />
              <line x1="75%" y1="28%" x2="75%" y2="23%" 
                    stroke="#22c55e" strokeWidth="5" />
              <line x1="50%" y1="28%" x2="50%" y2="55%" 
                    stroke="#22c55e" strokeWidth="5" />
            </svg>

            {/* Timeline nodes/images */}
            {timelineNodes.map((node) => (
              <div
                key={node.id}
                className="absolute z-10 cursor-pointer transition-transform hover:scale-110"
                style={node.position}
              >
                <div className="relative">
                  <div className="w-36 h-36 border-4 border-cyan-500 rounded-lg overflow-hidden shadow-2xl bg-slate-900" style={{
                    imageRendering: 'pixelated'
                  }}>
                    <Image
                      src={node.image}
                      alt={node.alt}
                      width={144}
                      height={144}
                      className="w-full h-full object-cover"
                      style={{ imageRendering: 'pixelated' }}
                    />
                  </div>
                  {/* Glow effect */}
                  <div className="absolute inset-0 border-4 border-cyan-400 rounded-lg opacity-0 hover:opacity-60 transition-opacity"
                       style={{ boxShadow: '0 0 25px rgba(6, 182, 212, 0.9)' }}>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom buttons */}
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex gap-8 z-30">
          <button
            onClick={() => router.push('/')}
            className="bg-gradient-to-b from-orange-600 to-orange-800 hover:from-orange-500 hover:to-orange-700 
                     text-yellow-300 font-bold text-2xl px-16 py-5 rounded-lg 
                     border-4 border-orange-950 shadow-2xl transition-all hover:scale-105"
            style={{ 
              textShadow: '3px 3px 0px rgba(0,0,0,0.7)',
              fontFamily: 'monospace',
              imageRendering: 'pixelated'
            }}
          >
            PANTALLA COMPLETA
          </button>
          
          <button
            onClick={() => router.back()}
            className="bg-gradient-to-b from-orange-600 to-orange-800 hover:from-orange-500 hover:to-orange-700 
                     text-yellow-300 font-bold text-2xl px-16 py-5 rounded-lg 
                     border-4 border-orange-950 shadow-2xl transition-all hover:scale-105"
            style={{ 
              textShadow: '3px 3px 0px rgba(0,0,0,0.7)',
              fontFamily: 'monospace',
              imageRendering: 'pixelated'
            }}
          >
            VOLVER
          </button>
        </div>
      </div>
    </div>
  );
};

export default LineaTiempoPage;