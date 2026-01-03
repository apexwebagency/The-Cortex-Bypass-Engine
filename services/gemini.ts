
import { GoogleGenAI, Modality } from "@google/genai";
import { SignalRequest, Chassis } from '../types';
import { SYSTEM_INSTRUCTIONS, CHASSIS_MAP } from '../constants';

export const generateSignal = async (request: SignalRequest): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  const model = ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `[VECTOR: ${request.vector}] + [CHASSIS: ${request.chassis}] :: NOISE: "${request.noise}"`,
    config: {
      systemInstruction: SYSTEM_INSTRUCTIONS,
      temperature: 0.1, // Lower temperature for more consistent "Zero-Entropy" output
      topP: 0.8,
      topK: 40,
    },
  });

  const response = await model;
  const text = response.text || "FAILED TO COMPRESS SIGNAL";
  
  return text.replace(/```[a-z]*\n?/gi, '').replace(/```/g, '').trim();
};

export const generateVoice = async (text: string, chassis: Chassis): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  const voiceName = CHASSIS_MAP[chassis].voice;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-preview-tts",
    contents: [{ parts: [{ text: `Vocalize this command with zero hesitation. Mode: ${chassis}. Text: ${text}` }] }],
    config: {
      responseModalities: [Modality.AUDIO],
      speechConfig: {
        voiceConfig: {
          prebuiltVoiceConfig: { voiceName },
        },
      },
    },
  });

  const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
  if (!base64Audio) throw new Error("Voice generation failed");
  return base64Audio;
};

// Audio Utilities
export function decodeBase64(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

export async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}
