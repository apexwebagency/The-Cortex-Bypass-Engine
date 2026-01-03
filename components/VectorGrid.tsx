
import React from 'react';
import { Vector, Chassis } from '../types';
import { VECTORS, CHASSIS_MAP } from '../constants';

interface MatrixSelectorProps {
  selectedVector: Vector;
  onVectorSelect: (v: Vector) => void;
  selectedChassis: Chassis;
  onChassisSelect: (c: Chassis) => void;
}

export const MatrixSelector: React.FC<MatrixSelectorProps> = ({ 
  selectedVector, 
  onVectorSelect, 
  selectedChassis, 
  onChassisSelect 
}) => {
  return (
    <div className="flex flex-col gap-8">
      {/* Axis A: Vector */}
      <div>
        <h3 className="text-[10px] font-mono text-zinc-500 uppercase mb-3 tracking-widest">Axis A: The Vector (The Goal)</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {Object.entries(VECTORS).map(([key, data]) => {
            const v = key as Vector;
            const isActive = selectedVector === v;
            return (
              <button
                key={v}
                onClick={() => onVectorSelect(v)}
                className={`
                  p-3 text-left border transition-all duration-200
                  ${isActive 
                    ? 'border-green-500 bg-green-500/10 shadow-[0_0_15px_rgba(34,197,94,0.1)]' 
                    : 'border-white/5 hover:border-white/20 bg-white/[0.01]'
                  }
                `}
              >
                <div className={`text-[9px] font-mono uppercase mb-1 ${isActive ? 'text-green-500' : 'text-zinc-600'}`}>
                  {v}
                </div>
                <div className={`text-sm font-black uppercase ${isActive ? 'text-white' : 'text-zinc-400'}`}>
                  {data.label}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Axis B: Chassis */}
      <div>
        <h3 className="text-[10px] font-mono text-zinc-500 uppercase mb-3 tracking-widest">Axis B: The Chassis (Syntactic Housing)</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {Object.entries(CHASSIS_MAP).map(([key, data]) => {
            const c = key as Chassis;
            const isActive = selectedChassis === c;
            return (
              <button
                key={c}
                onClick={() => onChassisSelect(c)}
                className={`
                  p-3 text-left border transition-all duration-200
                  ${isActive 
                    ? 'border-red-500 bg-red-500/10 shadow-[0_0_15px_rgba(239,68,68,0.1)]' 
                    : 'border-white/5 hover:border-white/20 bg-white/[0.01]'
                  }
                `}
              >
                <div className={`text-[9px] font-mono uppercase mb-1 ${isActive ? 'text-red-500' : 'text-zinc-600'}`}>
                  {c}
                </div>
                <div className={`text-sm font-black uppercase ${isActive ? 'text-white' : 'text-zinc-400'}`}>
                  {data.label}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
