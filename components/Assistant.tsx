
import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X, Bot, Loader2 } from 'lucide-react';
import { getTravelAssistantResponse } from '../services/geminiService';
import { useLanguage } from '../LanguageContext';

const Assistant: React.FC = () => {
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  
  const initialMsg = language === 'pt' 
    ? "Olá! Sou o seu assistente Algarve Explorer. Pronto para planear o seu próximo trilho?"
    : "Olá! I'm your Algarve Explorer assistant. Ready to plan your next trail adventure?";

  const [messages, setMessages] = useState<{ role: 'user' | 'bot'; content: string }[]>([
    { role: 'bot', content: initialMsg }
  ]);
  
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Reset assistant greeting if language changes when drawer is closed or if you want to keep it dynamic
    setMessages([{ role: 'bot', content: initialMsg }]);
  }, [language]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsLoading(true);

    const botResponse = await getTravelAssistantResponse(userMsg, language);
    setMessages(prev => [...prev, { role: 'bot', content: botResponse }]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[60]">
      {isOpen ? (
        <div className="bg-white rounded-2xl shadow-2xl w-80 sm:w-96 flex flex-col overflow-hidden border border-slate-100 animate-in slide-in-from-bottom-5 duration-300">
          <div className="bg-[#da6927] p-4 flex justify-between items-center">
            <div className="flex items-center space-x-2 text-white">
              <Bot size={20} />
              <span className="font-bold">{language === 'pt' ? 'Guia AI Algarve' : 'Algarve Guide AI'}</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white hover:bg-[#da6927]/90 p-1 rounded">
              <X size={20} />
            </button>
          </div>

          <div ref={scrollRef} className="h-80 overflow-y-auto p-4 space-y-4 bg-slate-50">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                  msg.role === 'user' 
                    ? 'bg-[#da6927] text-white rounded-br-none' 
                    : 'bg-white text-slate-700 shadow-sm border border-slate-100 rounded-bl-none'
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white p-3 rounded-2xl rounded-bl-none shadow-sm border border-slate-100">
                  <Loader2 className="animate-spin text-[#da6927]" size={18} />
                </div>
              </div>
            )}
          </div>

          <div className="p-4 border-t bg-white">
            <div className="flex space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder={language === 'pt' ? "Pergunte sobre trilhos, clima..." : "Ask about trails, weather..."}
                className="flex-1 bg-slate-100 border-none rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#da6927] outline-none"
              />
              <button 
                onClick={handleSend}
                disabled={isLoading}
                className="bg-[#da6927] hover:bg-[#da6927]/90 text-white p-2 rounded-lg disabled:opacity-50"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-[#da6927] hover:bg-[#da6927]/90 text-white p-4 rounded-full shadow-lg transform hover:scale-110 transition-all group"
        >
          <MessageSquare className="group-hover:rotate-12 transition-transform" />
        </button>
      )}
    </div>
  );
};

export default Assistant;
