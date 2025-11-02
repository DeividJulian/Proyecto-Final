'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

const LineaTiempoPage = () => {
  const router = useRouter();

  const timelineNodes = [
    {
      id: 1,
      image: '/assets/reproducir.png',
      alt: 'Excursionista en montaña',
      position: { top: '-3%', left: '27%' }
    },
    {
      id: 2,
      image: '/assets/sala-cine.png',
      alt: 'Ciudad al atardecer',
      position: { top: '-3%', right: '18%' }
    },
    {
      id: 3,
      image: '/assets/mapas.png',
      alt: 'Playa al atardecer',
      position: { top: '40%', left: '50%', transform: 'translateX(-50%)' }
    }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden bg-slate-950">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/linea de tiempo.png"
          alt="Fondo línea de tiempo"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-cyan-950/40 via-slate-950/60 to-slate-950/80 z-[1]"></div>

      {/* Decorative tech border frame */}
      <div className="absolute inset-0 pointer-events-none z-[2]">
        {/* Main frame border */}
        <div className="absolute inset-4 border-8 border-cyan-600 rounded-3xl"
          style={{
            boxShadow: '0 0 40px rgba(6, 182, 212, 0.5), inset 0 0 60px rgba(0, 0, 0, 0.8)',
            imageRendering: 'pixelated'
          }}>
        </div>
        
        {/* Inner decorative corners */}
        <div className="absolute top-8 left-8 w-32 h-32 border-l-4 border-t-4 border-cyan-500"></div>
        <div className="absolute top-8 right-8 w-32 h-32 border-r-4 border-t-4 border-cyan-500"></div>
        <div className="absolute bottom-8 left-8 w-32 h-32 border-l-4 border-b-4 border-cyan-500"></div>
        <div className="absolute bottom-8 right-8 w-32 h-32 border-r-4 border-b-4 border-cyan-500"></div>
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        {/* Header */}
        <div className="flex justify-center mb-16 mt-8">
          <div className="bg-indigo-900 px-32 py-6 rounded-3xl border-4 border-black shadow-2xl" style={{
            boxShadow: '0 8px 0px rgba(0, 0, 0, 0.8)',
            imageRendering: 'pixelated',
            backgroundColor: '#312e81'
          }}>
            <h1 className="text-5xl font-bold text-yellow-400 tracking-widest" style={{
              textShadow: '2px 2px 0px rgba(0,0,0,0.8)',
              fontFamily: 'monospace',
              imageRendering: 'pixelated'
            }}>
              LINEA DE TIEMPO
            </h1>
          </div>
        </div>

        {/* Main content area */}
        <div className="relative max-w-6xl mx-auto">
          {/* Character avatar - left side */}
          <div className="absolute left-5 top-[30%] -translate-y-1/2 z-20">
            <div className="bg-gradient-to-br from-cyan-600 to-cyan-800 p-6 rounded-2xl border-4 border-cyan-900 shadow-2xl" style={{
              boxShadow: '0 0 30px rgba(6, 182, 212, 0.6), inset 0 2px 8px rgba(255, 255, 255, 0.1)',
              imageRendering: 'pixelated'
            }}>
              <div className="w-50 h-50 relative">
                <div className="w-full h-full bg-gradient-to-b bg-amber-900 to-slate-900 rounded-xl relative overflow-hidden flex items-center justify-center border-2 border-cyan-700">
                  <img 
                    src="/assets/avatar-primera-persona.png" 
                    alt="Avatar"
                    className="w-full h-full object-contain"
                    style={{ imageRendering: 'pixelated' }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Timeline container */}
          <div className="ml-64 mr-12 relative min-h-[450px]">
            {/* Timeline lines */}
            <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
              {/* Horizontal main line */}
              <line x1="-2%" y1="30%" x2="90%" y2="30%" 
                    stroke="#22c55e" strokeWidth="6" 
                    style={{ filter: 'drop-shadow(0 0 8px rgba(34, 197, 94, 0.8))' }} />
              
              {/* Vertical lines from nodes */}
              <line x1="35%" y1="30%" x2="35%" y2="22%" 
                    stroke="#22c55e" strokeWidth="6" 
                    style={{ filter: 'drop-shadow(0 0 8px rgba(34, 197, 94, 0.8))' }} />
              <line x1="75%" y1="30%" x2="75%" y2="22%" 
                    stroke="#22c55e" strokeWidth="6" 
                    style={{ filter: 'drop-shadow(0 0 8px rgba(34, 197, 94, 0.8))' }} />
              <line x1="50%" y1="30%" x2="50%" y2="65%" 
                    stroke="#22c55e" strokeWidth="6" 
                    style={{ filter: 'drop-shadow(0 0 8px rgba(34, 197, 94, 0.8))' }} />
            </svg>

            {/* Timeline nodes/images */}
            {timelineNodes.map((node) => (
              <div
                key={node.id}
                className="absolute z-10 cursor-pointer transition-transform hover:scale-110"
                style={node.position}
              >
                <div className="relative">
                  <div className="w-32 h-32 border-4 border-cyan-500 rounded-xl overflow-hidden shadow-2xl bg-slate-900" style={{
                    boxShadow: '0 0 25px rgba(6, 182, 212, 0.6), inset 0 0 20px rgba(0, 0, 0, 0.5)',
                    imageRendering: 'pixelated'
                  }}>
                    <img
                      src={node.image}
                      alt={node.alt}
                      className="w-full h-full object-cover"
                      style={{ imageRendering: 'pixelated' }}
                    />
                  </div>
                  {/* Glow effect */}
                  <div className="absolute inset-0 border-4 border-cyan-300 rounded-xl opacity-0 hover:opacity-70 transition-opacity"
                       style={{ boxShadow: '0 0 30px rgba(6, 182, 212, 1)' }}>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom buttons */}
        <div className="fixed bottom-12 left-1/2 -translate-x-1/2 flex gap-6 z-30">
          <button
            onClick={() => router.push('/')}
            className="bg-amber-900 hover:bg-amber-800 
                     text-yellow-400 font-bold text-2xl px-20 py-5 rounded-xl 
                     border-4 border-black shadow-2xl transition-all hover:scale-105"
            style={{ 
              textShadow: '2px 2px 0px rgba(0,0,0,0.8)',
              fontFamily: 'monospace',
              imageRendering: 'pixelated',
              boxShadow: '0 8px 0px rgba(0, 0, 0, 0.6)',
              backgroundColor: '#78350f'
            }}
          >
            PANTALLA COMPLETA
          </button>
          
          <button
            onClick={() => router.back()}
            className="bg-orange-900 hover:bg-orange-800 
                     text-yellow-400 font-bold text-2xl px-20 py-5 rounded-xl 
                     border-4 border-black shadow-2xl transition-all hover:scale-105"
            style={{ 
              textShadow: '2px 2px 0px rgba(0,0,0,0.8)',
              fontFamily: 'monospace',
              imageRendering: 'pixelated',
              boxShadow: '0 8px 0px rgba(0, 0, 0, 0.6)',
              backgroundColor: '#9a3412'
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