'use client';
import { FormEvent, useState } from 'react';

export default function ContactPage() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle');
  
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('sending');
    // Aqui você integraria com o EmailJS ou API Route
    setTimeout(() => setStatus('success'), 2000);
  }
  
  return (
    <div className="min-h-screen bg-neutral-950 text-white pt-24 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">Vamos conversar?</h1>
        <p className="text-neutral-400 mb-8">Me conte sobre o seu sonho. Responderei o mais rápido possível.</p>
        
        <form onSubmit={handleSubmit} className="space-y-6 bg-neutral-900 p-8 rounded-2xl border border-neutral-800">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-neutral-400 mb-1">Seu Nome</label>
              <input type="text" required className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition" />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-400 mb-1">WhatsApp</label>
              <input type="tel" required className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition" />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-neutral-400 mb-1">Data do Evento</label>
              <input type="date" className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-3 text-neutral-300 focus:ring-2 focus:ring-blue-500 outline-none transition" />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-400 mb-1">Tipo de Evento</label>
              <select className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-3 text-neutral-300 focus:ring-2 focus:ring-blue-500 outline-none transition">
                <option>Casamento</option>
                <option>Debutante (15 Anos)</option>
                <option>Ensaio Externo</option>
                <option>Outro</option>
              </select>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-neutral-400 mb-1">Mensagem / Detalhes</label>
            <textarea rows={4} className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition"></textarea>
          </div>
          
          <button
            type="submit"
            disabled={status === 'sending' || status === 'success'}
            className="w-full bg-white text-black font-bold py-4 rounded-lg hover:bg-gray-200 transition disabled:opacity-50"
          >
            {status === 'sending' ? 'Enviando...' : status === 'success' ? 'Mensagem Enviada!' : 'Solicitar Orçamento'}
          </button>
        </form>
      </div>
    </div>
  );
}