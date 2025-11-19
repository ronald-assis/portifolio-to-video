'use client';
import { FormEvent, useState } from 'react';
import { FiMail, FiMessageSquare } from 'react-icons/fi';
import Link from 'next/link';
import Image from 'next/image';

const faqs = [
  {
    q: 'Qual é o seu processo de trabalho?',
    a: 'Começamos com uma conversa para entender sua história. Depois, planejamos a filmagem, capturamos os momentos e finalizamos com uma edição cinematográfica focada na emoção.',
  },
  {
    q: 'Você viaja para filmar eventos?',
    a: 'Sim! Adoro conhecer novos lugares e histórias. O custo de deslocamento e hospedagem é adicionado à proposta final.',
  },
  {
    q: 'Quando recebemos o filme final?',
    a: 'O prazo de entrega varia conforme a complexidade do projeto, mas geralmente fica entre 30 e 90 dias após o evento.',
  },
];

export default function ContactPage() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle');
  
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('sending');
    // Simula o envio do formulário
    setTimeout(() => {
      setStatus('success');
    }, 2000);
  }
  
  if (status === 'success') {
    return (
      <div className="min-h-screen bg-neutral-950 text-white flex flex-col items-center justify-center text-center px-4">
        <div className="max-w-md">
          <h2 className="text-3xl font-bold text-green-400 mb-4">Mensagem Enviada!</h2>
          <p className="text-neutral-300 mb-8">
            Obrigado por entrar em contato. Recebi sua mensagem e responderei o mais breve possível para conversarmos sobre seu projeto.
          </p>
          <Link href="/" className="px-6 py-3 rounded-full bg-white text-black font-semibold tracking-wide hover:bg-neutral-200 transition-transform hover:scale-105 inline-block">
            Voltar para o Início
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="relative min-h-screen bg-neutral-950 text-white">
      <div className="absolute inset-0 z-0">
        <Image
          src="/thumbs/roots.png"
          alt="Casal em um campo"
          fill
          priority
          className="object-cover object-center opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/80 to-neutral-950" />
      </div>
      
      {/* Conteúdo da Página */}
      <div className="relative z-10 pt-32 pb-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-3">Vamos criar algo incrível juntos?</h1>
            <p className="text-neutral-300 max-w-2xl mx-auto">
              Preencha o formulário ou use os contatos abaixo. Estou ansioso para ouvir sua história.
            </p>
          </div>
          
          <div className="grid md:grid-cols-5 gap-12 lg:gap-16 items-start">
            {/* Coluna da Esquerda: Infos e FAQ */}
            <div className="md:col-span-2 space-y-10">
              <div>
                <h3 className="text-2xl font-semibold mb-4">Informações de Contato</h3>
                <div className="space-y-4 text-neutral-300">
                  <a href="mailto:ronaldassi71@gmail.com" className="flex items-center gap-3 hover:text-blue-400 transition-colors">
                    <FiMail className="text-blue-400 flex-shrink-0" /> ronaldassi71@gmail.com
                  </a>
                  <a href="https://wa.me/5511978493897" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-blue-400 transition-colors">
                    <FiMessageSquare className="text-blue-400 flex-shrink-0" /> +55 (11) 97849-3897
                  </a>
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-semibold mb-6">Perguntas Frequentes</h3>
                <div className="space-y-6">
                  {faqs.map((faq, i) => (
                    <div key={i} className="border-l-2 border-neutral-800 pl-4">
                      <h4 className="font-semibold text-neutral-100 mb-1">{faq.q}</h4>
                      <p className="text-neutral-400 text-sm">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Coluna da Direita: Formulário */}
            <form onSubmit={handleSubmit} className="md:col-span-3 space-y-6 bg-black/30 backdrop-blur-sm p-8 rounded-2xl border border-white/10 shadow-2xl shadow-black/30">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-neutral-300 mb-2">Seu Nome</label>
                  <input id="name" type="text" name="name" required className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition" />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-neutral-300 mb-2">WhatsApp</label>
                  <input id="phone" type="tel" name="phone" required className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition" />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="event_date" className="block text-sm font-medium text-neutral-300 mb-2">Data do Evento</label>
                  <input id="event_date" type="date" name="event_date" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-neutral-300 focus:ring-2 focus:ring-blue-500 outline-none transition" />
                </div>
                <div>
                  <label htmlFor="event_type" className="block text-sm font-medium text-neutral-300 mb-2">Tipo de Evento</label>
                  <select id="event_type" name="event_type" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-neutral-300 focus:ring-2 focus:ring-blue-500 outline-none transition">
                    <option className="bg-neutral-800">Casamento</option>
                    <option className="bg-neutral-800">Retiro</option>
                    <option className="bg-neutral-800">Evento</option>
                    <option className="bg-neutral-800">Outro</option>
                  </select>
                </div>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-neutral-300 mb-2">Me conte mais sobre o seu evento</label>
                <textarea id="message" name="message" rows={4} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition"></textarea>
              </div>
              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full bg-white text-black font-bold py-4 rounded-lg hover:bg-gray-200 transition-transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'sending' ? 'Enviando...' : 'Solicitar Orçamento'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
