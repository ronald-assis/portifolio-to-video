'use client'
import React, { FormEvent, useEffect, useState } from 'react';
import { FiMail, FiMessageSquare } from 'react-icons/fi';
import Link from 'next/link';
import Image from 'next/image';
import { AsYouType, CountryCode } from 'libphonenumber-js';

function countryCodeToFlag(isoCode: string) {
  if (!isoCode) return '';
  return String.fromCodePoint(...[...isoCode.toUpperCase()].map(char => 127397 + char.charCodeAt(0)));
}

const faqs = [
  { q: 'Qual é o seu processo de trabalho?', a: 'Começamos com uma conversa...' },
  { q: 'Você viaja para filmar eventos?', a: 'Sim! Adoro conhecer novos lugares...' },
  { q: 'Quando recebemos o filme final?', a: 'O prazo de entrega varia...' },
];

interface Country {
  code: CountryCode;
  name: string;
  dial: string;
}

interface RestCountry {
  name: {
    common: string;
  };
  cca2: string;
  idd: {
    root: string;
    suffixes?: string[];
  };
}

export default function ContactPage() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [country, setCountry] = useState<CountryCode>('BR');
  const [phone, setPhone] = useState('');
  const [countries, setCountries] = useState<Country[]>([]);
  const [countriesLoading, setCountriesLoading] = useState(true);
  
  useEffect(() => {
    async function fetchCountries() {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all?fields=name,cca2,idd');
        if (!response.ok) throw new Error('Failed to fetch countries');
        const data = await response.json();
        
        const countryList: Country[] = data
          .filter((c: RestCountry) => c.idd.root)
          .map((c: RestCountry) => ({
            code: c.cca2 as CountryCode,
            name: c.name.common,
            dial: `${c.idd.root}${c.idd.suffixes ? c.idd.suffixes[0] : ''}`,
          }))
          .sort((a: Country, b: Country) => a.name.localeCompare(b.name));
        
        const brazil = countryList.find(c => c.code === 'BR');
        const otherCountries = countryList.filter(c => c.code !== 'BR');
        
        setCountries(brazil ? [brazil, ...otherCountries] : countryList);
        
      } catch (error) {
        console.error('Error fetching countries:', error);
        setCountries([
          { code: 'BR', name: 'Brazil', dial: '+55' },
          { code: 'US', name: 'United States', dial: '+1' },
        ]);
      } finally {
        setCountriesLoading(false);
      }
    }
    fetchCountries();
  }, []);
  
  
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus('sending');
    setErrorMessage('');
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    
    try {
      const emailResponse = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      
      const sheetResponse = await fetch('/api/sheet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.name,
          phone: data.phone,
          message: data.message,
          event_date: data.event_date || '',
          event_type: data.event_type || '',
        }),
      });
      
      if (emailResponse.ok && sheetResponse.ok) {
        setStatus('success');
        form.reset();
        setPhone('');
        setCountry('BR');
      } else {
        const errorData = await (emailResponse.ok ? sheetResponse : emailResponse).json();
        setErrorMessage(errorData.error || 'Ocorreu um erro ao enviar. Tente novamente.');
        setStatus('error');
      }
    } catch {
      setErrorMessage('Falha na comunicação com o servidor. Verifique sua conexão.');
      setStatus('error');
    }
  }
  
  function handlePhoneChange(e: React.ChangeEvent<HTMLInputElement>) {
    const formatter = new AsYouType(country);
    const formatted = formatter.input(e.target.value);
    setPhone(formatted);
  }
  
  function handleCountryChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const newCountry = e.target.value as CountryCode;
    setCountry(newCountry);
    const digits = phone.replace(/\D/g, '');
    const formatter = new AsYouType(newCountry);
    setPhone(formatter.input(digits));
  }
  
  if (status === 'success') {
    return (
      <div className="min-h-screen bg-neutral-950 text-white flex flex-col items-center justify-center text-center px-4">
        <div className="max-w-md">
          <h2 className="text-3xl font-bold text-green-400 mb-4">Mensagem Enviada!</h2>
          <p className="text-neutral-300 mb-8">Obrigado por entrar em contato. Responderei em breve.</p>
          <Link href="/" className="px-6 py-3 rounded-full bg-white text-black font-semibold inline-block">Voltar para o Início</Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="relative min-h-screen bg-neutral-950 text-white">
      <div className="absolute inset-0 z-0">
        <Image src="/thumbs/roots.png" alt="Casal em um campo" fill priority className="object-cover object-center opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/80 to-neutral-950" />
      </div>
      
      <div className="relative z-10 pt-32 pb-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-3">Vamos criar algo incrível juntos?</h1>
            <p className="text-neutral-300 max-w-2xl mx-auto">Preencha o formulário ou use os contatos abaixo.</p>
          </div>
          
          <div className="grid md:grid-cols-5 gap-12 lg:gap-16 items-start">
            <div className="md:col-span-2 space-y-10">
              <div>
                <h3 className="text-2xl font-semibold mb-4">Informações de Contato</h3>
                <div className="space-y-4 text-neutral-300">
                  <a href="mailto:ronaldassis71@gmail.com" className="flex items-center gap-3 hover:text-blue-400 transition-colors">
                    <FiMail className="text-blue-400 flex-shrink-0" /> ronaldassis71@gmail.com
                  </a>
                  <a href="https://wa.me/5511978493897?text=Gostaria%20de%20Fazer%20um%20Or%C3%A7amento%20de%20Videos" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-blue-400 transition-colors">
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
            
            <form onSubmit={handleSubmit} className="md:col-span-3 space-y-6 bg-black/30 backdrop-blur-sm p-8 rounded-2xl border border-white/10 shadow-2xl shadow-black/30">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-neutral-300 mb-2">Seu Nome</label>
                  <input id="name" type="text" name="name" required className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition" />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-neutral-300 mb-2">WhatsApp</label>
                  <div className="flex">
                    <div className="relative">
                      <select
                        id="country"
                        name="country"
                        value={country}
                        onChange={handleCountryChange}
                        disabled={countriesLoading}
                        className="absolute inset-y-0 left-0 bg-transparent w-24 h-full pl-3 pr-8 text-transparent focus:ring-0 outline-none border-r border-white/10 disabled:opacity-50"
                        aria-label="Country code"
                      >
                        {countries.map(c => <option key={c.code} value={c.code}>{c.name}</option>)}
                      </select>
                      <div className="absolute inset-y-0 left-0 flex items-center px-3 pointer-events-none text-neutral-300">
                        {countriesLoading ? (
                          <div className="w-5 h-5 border-2 border-neutral-400 border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                          <>
                            <span>{countryCodeToFlag(country)}</span>
                            <span className="ml-2">{countries.find(c => c.code === country)?.dial}</span>
                          </>
                        )}
                      </div>
                    </div>
                    <input
                      id="phone"
                      type="tel"
                      name="phone"
                      required
                      value={phone}
                      onChange={handlePhoneChange}
                      className="w-full bg-white/5 border border-white/10 rounded-lg pl-28 pr-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition"
                    />
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="event_date" className="block text-sm font-medium text-neutral-300 mb-2">Data do Evento</label>
                  <input id="event_date" type="date" name="event_date" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-neutral-300 focus:ring-2 focus:ring-blue-500 outline-none transition" />
                </div>
                
                <div>
                  <label htmlFor="event_type" className="block text-sm font-medium text-neutral-300 mb-2">Tipo de Evento</label>
                  <select id="event_type" name="event_type" defaultValue="Casamento" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-neutral-300 focus:ring-2 focus:ring-blue-500 outline-none transition">
                    <option className="bg-neutral-800">Casamento</option>
                    <option className="bg-neutral-800">Retiro</option>
                    <option className="bg-neutral-800">Evento</option>
                    <option className="bg-neutral-800">Outro</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-neutral-300 mb-2">Me conte mais sobre o seu evento</label>
                <textarea id="message" name="message" rows={4} required className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition"></textarea>
              </div>
              
              <button type="submit" disabled={status === 'sending'} className="w-full bg-white text-black font-bold py-4 rounded-lg hover:bg-gray-200 transition-transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed">
                {status === 'sending' ? 'Enviando...' : 'Solicitar Orçamento'}
              </button>
              
              {status === 'error' && <p className="text-red-500 text-center mt-4">{errorMessage}</p>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
