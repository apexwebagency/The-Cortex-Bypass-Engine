
import React from 'react';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col items-center p-4 md:p-8 selection:bg-green-500/30 selection:text-green-400">
      <div className="w-full max-w-4xl flex flex-col gap-8">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-white/10 pb-6 gap-4">
          <div>
            <h1 className="text-3xl font-black tracking-tighter uppercase text-white mb-1">
              The Cortex Bypass Engine
            </h1>
            <p className="text-xs font-mono text-zinc-500 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              NLC-26 v2.0 // NEUROLINGUISTIC COMPRESSOR
            </p>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-mono text-zinc-600 uppercase">Status: Operating</p>
            <p className="text-[10px] font-mono text-zinc-600 uppercase">Protocol: Incinerator.v2</p>
          </div>
        </header>

        <main className="flex flex-col gap-10">
          {children}
        </main>

        <footer className="mt-auto pt-10 border-t border-white/10 opacity-30">
          <p className="text-[10px] font-mono text-center">
            &copy; 2024 NLC-26 SYSTEMS // BYPASS THE PREFRONTAL CORTEX // STRIKE THE AMYGDALA
          </p>
        </footer>
      </div>
    </div>
  );
};
