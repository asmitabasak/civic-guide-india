"use client";
import { useState } from 'react';

export default function CivicGuide() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Progress: [░░░░░░░░░░] 0%\n---\n> ### 📍 Welcome to CivicGuide\n> Please enter your **State** or **Zip Code** to begin your roadmap.' }
  ]);

  const sendMessage = async () => {
    const userMsg = { role: 'user', content: input };
    setMessages([...messages, userMsg]);
    setInput('');

    const res = await fetch('/api/chat', {
      method: 'POST',
      body: JSON.stringify({ messages: [...messages, userMsg] }),
    });
    const data = await res.json();
    setMessages(prev => [...prev, { role: 'assistant', content: data.content }]);
  };

  return (
    <div className="min-h-screen bg-[#1A2E26] text-[#FDE68A] p-8 font-sans">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 border-b border-[#FDE68A] pb-2">CivicPulse Engine</h1>
        
        <div className="space-y-6 mb-8">
          {messages.map((m, i) => (
            <div key={i} className={m.role === 'user' ? 'text-right' : 'text-left'}>
              <div className={`inline-block p-4 rounded-lg ${m.role === 'user' ? 'bg-[#2D332D]' : 'bg-[#1e3a2f] border-l-4 border-[#FDE68A] shadow-xl'} max-w-full whitespace-pre-wrap`}>
                {m.content}
              </div>
            </div>
          ))}
        </div>

        <div className="fixed bottom-8 left-0 right-0 px-8">
          <div className="max-w-2xl mx-auto flex gap-2">
            <input 
              className="flex-1 bg-[#2D332D] border border-[#FDE68A] rounded p-3 text-white focus:outline-none"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter location..."
            />
            <button onClick={sendMessage} className="bg-[#FDE68A] text-[#1A2E26] font-bold px-6 rounded hover:bg-yellow-200 transition">
              SEND
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
