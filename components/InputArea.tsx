
import React from 'react';

interface InputAreaProps {
  value: string;
  onChange: (val: string) => void;
  onProcess: () => void;
  isLoading: boolean;
}

export const InputArea: React.FC<InputAreaProps> = ({ value, onChange, onProcess, isLoading }) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-end">
        <label className="text-xs font-mono uppercase text-zinc-500">
          Input: High-Entropy Noise (Complex Draft)
        </label>
        <span className="text-[10px] font-mono text-zinc-700">Entropy Level: {value.length > 0 ? 'High' : 'Zero'}</span>
      </div>
      
      <div className="relative">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Paste complex thoughts, corporate jargon, or hesitant requests here..."
          className="w-full h-48 bg-black border border-white/10 p-4 font-mono text-sm text-zinc-300 focus:outline-none focus:border-white/30 transition-colors resize-none placeholder:text-zinc-700"
          disabled={isLoading}
        />
        <div className="absolute bottom-4 right-4 flex gap-2">
           <button
             onClick={() => onChange('')}
             className="px-3 py-1 text-[10px] font-mono uppercase border border-white/10 text-zinc-500 hover:text-zinc-300 hover:border-white/30 transition-colors"
           >
             Flush Buffer
           </button>
        </div>
      </div>

      <button
        onClick={onProcess}
        disabled={isLoading || !value.trim()}
        className={`
          w-full py-4 text-sm font-black uppercase tracking-widest border transition-all duration-300
          ${isLoading 
            ? 'bg-zinc-900 border-zinc-800 text-zinc-700 cursor-not-allowed' 
            : 'bg-white text-black border-white hover:bg-transparent hover:text-white'
          }
        `}
      >
        {isLoading ? (
          <span className="flex items-center justify-center gap-2">
            <span className="w-1 h-1 bg-zinc-700 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
            <span className="w-1 h-1 bg-zinc-700 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
            <span className="w-1 h-1 bg-zinc-700 rounded-full animate-bounce"></span>
            BYPASSING CORTEX...
          </span>
        ) : 'DETONATE & DISTILL'}
      </button>
    </div>
  );
};
