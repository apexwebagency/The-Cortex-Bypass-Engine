
import React, { useState, useEffect, useRef } from 'react';
import { Chassis } from '../types';
import { generateVoice, decodeBase64, decodeAudioData } from '../services/gemini';

interface SignalDisplayProps {
  signal: string | null;
  chassis: Chassis;
}

export const SignalDisplay: React.FC<SignalDisplayProps> = ({ signal, chassis }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isVocalizing, setIsVocalizing] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  
  useEffect(() => {
    if (!signal) {
      setDisplayedText('');
      return;
    }

    let i = 0;
    const interval = setInterval(() => {
      setDisplayedText(signal.slice(0, i));
      i++;
      if (i > signal.length) clearInterval(interval);
    }, 20);

    return () => clearInterval(interval);
  }, [signal]);

  const handleVocalize = async () => {
    if (!signal || isVocalizing) return;
    
    setIsVocalizing(true);
    try {
      const base64Audio = await generateVoice(signal, chassis);
      
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      }
      
      const ctx = audioContextRef.current;
      const audioData = decodeBase64(base64Audio);
      const audioBuffer = await decodeAudioData(audioData, ctx, 24000, 1);
      
      const source = ctx.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(ctx.destination);
      source.onended = () => setIsVocalizing(false);
      source.start();
    } catch (err) {
      console.error("Vocalization failed", err);
      setIsVocalizing(false);
    }
  };

  if (!signal) return null;

  return (
    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex justify-between items-center border-b border-green-500/20 pb-2">
        <h3 className="text-xs font-mono uppercase text-green-500 flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${isVocalizing ? 'bg-red-500 animate-ping' : 'bg-green-500'}`}></span>
          Output: Zero-Entropy Signal
        </h3>
        <div className="text-[10px] font-mono text-zinc-600 flex gap-4">
          <span>MODE: {chassis}</span>
          <span>STRIKE_CONFIRMED</span>
        </div>
      </div>

      <div className={`
        bg-zinc-900/30 border p-12 md:p-16 relative overflow-hidden transition-all duration-500
        ${isVocalizing ? 'border-red-500/30 shadow-[0_0_40px_rgba(239,68,68,0.1)]' : 'border-green-500/10'}
      `}>
        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-white/5"></div>
        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-white/5"></div>
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-white/5"></div>
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-white/5"></div>

        <pre className="text-2xl md:text-4xl font-black text-white whitespace-pre-wrap leading-tight text-left break-words tracking-tighter">
          {displayedText}
          <span className="inline-block w-3 h-8 bg-green-500 animate-pulse ml-1 align-middle"></span>
        </pre>

        {isVocalizing && (
          <div className="absolute bottom-4 left-0 w-full flex justify-center gap-1 opacity-20 px-8">
            {[...Array(40)].map((_, i) => (
              <div 
                key={i} 
                className="flex-1 bg-red-500 animate-bounce" 
                style={{ height: `${Math.random() * 24 + 4}px`, animationDelay: `${i * 0.03}s` }}
              ></div>
            ))}
          </div>
        )}
      </div>

      <div className="flex justify-center gap-4">
        <button 
          onClick={handleVocalize}
          disabled={isVocalizing}
          className={`
            px-6 py-3 text-[10px] font-mono uppercase border transition-all duration-300 tracking-widest
            ${isVocalizing 
              ? 'border-red-500 text-red-500 bg-red-500/5' 
              : 'border-white/10 text-zinc-400 hover:text-white hover:border-white/30'
            }
          `}
        >
          {isVocalizing ? 'TRANSMITTING...' : 'VOCALIZE'}
        </button>
        <button 
          onClick={() => navigator.clipboard.writeText(signal)}
          className="px-6 py-3 text-[10px] font-mono uppercase text-zinc-500 hover:text-green-500 transition-colors border border-white/5 hover:border-green-500/30 tracking-widest"
        >
          Capture
        </button>
      </div>
    </div>
  );
};
