
import React, { useState, useCallback } from 'react';
import { Layout } from './components/Layout';
import { MatrixSelector } from './components/VectorGrid';
import { InputArea } from './components/InputArea';
import { SignalDisplay } from './components/SignalDisplay';
import { Vector, Chassis } from './types';
import { generateSignal } from './services/gemini';

const App: React.FC = () => {
  const [vector, setVector] = useState<Vector>(Vector.STRATEGIC);
  const [chassis, setChassis] = useState<Chassis>(Chassis.SCALPEL);
  const [noise, setNoise] = useState('');
  const [signal, setSignal] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleProcess = useCallback(async () => {
    if (!noise.trim()) return;
    
    setLoading(true);
    setError(null);
    setSignal(null);

    try {
      const result = await generateSignal({ vector, chassis, noise });
      setSignal(result);
    } catch (err) {
      console.error(err);
      setError("SYSTEM MALFUNCTION: UNABLE TO BYPASS CORTEX. CHECK LOGS.");
    } finally {
      setLoading(false);
    }
  }, [vector, chassis, noise]);

  return (
    <Layout>
      <section className="flex flex-col gap-4">
        <h2 className="text-[10px] font-mono uppercase text-zinc-700 tracking-[0.2em]">01_Select_Matrix_Coordinates</h2>
        <MatrixSelector 
          selectedVector={vector} 
          onVectorSelect={setVector} 
          selectedChassis={chassis} 
          onChassisSelect={setChassis} 
        />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-[10px] font-mono uppercase text-zinc-700 tracking-[0.2em]">02_Inject_High_Entropy_Noise</h2>
        <InputArea 
          value={noise} 
          onChange={setNoise} 
          onProcess={handleProcess} 
          isLoading={loading} 
        />
      </section>

      {error && (
        <div className="p-4 border border-red-500/50 bg-red-500/5 text-red-500 font-mono text-[10px] uppercase text-center animate-pulse">
          {error}
        </div>
      )}

      {signal && (
        <section className="flex flex-col gap-4 mb-24">
          <h2 className="text-[10px] font-mono uppercase text-zinc-700 tracking-[0.2em]">03_Extract_Zero_Entropy_Signal</h2>
          <SignalDisplay signal={signal} chassis={chassis} />
        </section>
      )}
    </Layout>
  );
};

export default App;
