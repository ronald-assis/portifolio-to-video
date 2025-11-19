'use client';
import { FormEvent, useState } from 'react';
import { motion } from 'framer-motion';

export default function ContactPage() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('loading');
    
    const formData = new FormData(e.currentTarget);
    const payload = {
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message'),
      eventDate: formData.get('eventDate'),
      eventType: formData.get('eventType'),
    };
    
    try {
      // Chamada para a API Route
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      
      if (res.ok) {
        setStatus('success');
        (e.target as HTMLFormElement).reset();
      } else {
        setStatus('error');
      }
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  }
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-neutral-950 text-slate-800 dark:text-white pt-24 px-4 transition-colors">
      <div className="max-w-2xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl font-bold mb-2">Solicite um Orçamento</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">Vamos contar a sua história juntos.</p>
          
          <form onSubmit={handleSubmit} className="bg-white dark:bg-neutral-900 p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-neutral-800 space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Seu Nome</label>
                <input name="name" required className="w-full p-3 rounded-lg bg-gray-50 dark:bg-neutral-800 border border-gray-300 dark:border-neutral-700" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input name="email" type="email" required className="w-full p-3 rounded-lg bg-gray-50 dark:bg-neutral-800 border border-gray-300 dark:border-neutral-700" />
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Data do Evento</label>
                <input name="eventDate" type="date" className="w-full p-3 rounded-lg bg-gray-50 dark:bg-neutral-800 border border-gray-300 dark:border-neutral-700 text-gray-500 dark:text-gray-300" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Tipo de Evento</label>
                <select name="eventType" className="w-full p-3 rounded-lg bg-gray-50 dark:bg-neutral-800 border border-gray-300 dark:border-neutral-700">
                  <option>Casamento</option>
                  <option>Debutante (15 Anos)</option>
                  <option>Ensaio</option>
                  <option>Outro</option>
                </select>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Detalhes do Sonho</label>
              <textarea name="message" rows={4} required className="w-full p-3 rounded-lg bg-gray-50 dark:bg-neutral-800 border border-gray-300 dark:border-neutral-700"></textarea>
            </div>
            
            <button
              type="submit"
              disabled={status === 'loading' || status === 'success'}
              className={`w-full py-4 rounded-lg font-bold text-white transition-all ${
                status === 'success' ? 'bg-green-600' : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {status === 'loading' ? 'Enviando...' : status === 'success' ? 'Enviado com Sucesso!' : 'Enviar Solicitação'}
            </button>
            
            {status === 'error' && <p className="text-red-500 text-center">Erro ao enviar. Tente novamente.</p>}
          </form>
        </motion.div>
      </div>
    </div>
  );
}