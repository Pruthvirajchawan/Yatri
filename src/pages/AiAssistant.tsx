import React, { useState } from 'react';
import { Sparkles, Send, Bot, User, Clock, ArrowRight, ShieldCheck, Zap, Layers, RefreshCw } from 'lucide-react';
import { useTrip } from '../context/TripContext';
import { assistantService } from '../services/assistantService';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  suggestions?: string[];
}

export const AiAssistant: React.FC = () => {
  const { currentTrip, addActivity, optimizeTrip } = useTrip();

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'assistant',
      text: `Namaste! I am Yatri's Travel Intelligence Assistant. I am currently aware of your active trip: "${currentTrip.title}" (${currentTrip.totalDays} Days in ${currentTrip.destinationSummary}). How can I refine your schedule, adjust your pace, or resolve group trade-offs today?`,
      timestamp: 'Just now',
      suggestions: [
        'How can I reduce our Day 4 fatigue?',
        'Recommend an authentic hidden rooftop dinner in Udaipur',
        'What should we skip if it rains in Jaipur?',
        'Balance our budget to stay under ₹28,000/person'
      ]
    }
  ]);

  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      const response = await assistantService.sendMessage(query, currentTrip);
      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'assistant',
        text: response.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestions: response.suggestedActions?.map(a => a.label)
      };
      setMessages((prev) => [...prev, botMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="min-h-screen bg-atmospheric pt-28 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Title */}
        <div className="text-center max-w-2xl mx-auto mb-6 space-y-2">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/90 backdrop-blur-md rounded-full border border-[#E8EEF5] floating-nav-shadow text-xs font-semibold text-[#101827]">
            <Sparkles className="w-3.5 h-3.5 text-[#168BFF]" />
            <span>Context-Aware Travel Concierge</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#101827]">
            Yatri AI Assistant
          </h1>
          <p className="text-xs sm:text-sm text-[#64748B]">
            Ask questions, ask for pace adjustments, or request zero-regret recommendations grounded in your actual itinerary.
          </p>
        </div>

        {/* Current Trip Context Strip */}
        <div className="bg-white rounded-2xl p-4 border border-[#E8EEF5] editorial-card-shadow flex items-center justify-between mb-4 text-xs">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#35A86B] animate-pulse" />
            <span className="text-[#64748B]">Active Context:</span>
            <strong className="text-[#101827]">{currentTrip.title}</strong>
          </div>
          <span className="text-[11px] font-semibold text-[#168BFF] bg-[#DFF1FF] px-2.5 py-1 rounded-full">
            Health: {currentTrip.health.score}/100
          </span>
        </div>

        {/* Chat Window Container */}
        <div className="bg-white rounded-3xl border border-[#E8EEF5] editorial-card-shadow overflow-hidden flex flex-col h-[560px]">
          {/* Messages Scroll Area */}
          <div className="flex-1 p-6 overflow-y-auto space-y-5">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex items-start gap-3 ${
                  msg.sender === 'user' ? 'flex-row-reverse' : ''
                }`}
              >
                {/* Avatar */}
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 shadow-xs ${
                    msg.sender === 'user'
                      ? 'bg-[#101827] text-white'
                      : 'bg-[#168BFF] text-white font-serif font-bold text-xs'
                  }`}
                >
                  {msg.sender === 'user' ? <User className="w-4 h-4" /> : '✦'}
                </div>

                {/* Message Bubble */}
                <div
                  className={`max-w-[82%] sm:max-w-[75%] rounded-2xl p-4 space-y-2 ${
                    msg.sender === 'user'
                      ? 'bg-[#101827] text-white rounded-tr-none'
                      : 'bg-[#F4FAFF] text-[#101827] border border-[#E8EEF5] rounded-tl-none'
                  }`}
                >
                  <p className="text-xs sm:text-sm leading-relaxed whitespace-pre-line">
                    {msg.text}
                  </p>
                  <span
                    className={`text-[10px] block ${
                      msg.sender === 'user' ? 'text-white/60 text-right' : 'text-[#94A3B8]'
                    }`}
                  >
                    {msg.timestamp}
                  </span>

                  {/* Suggestion Chips from Bot */}
                  {msg.suggestions && msg.suggestions.length > 0 && (
                    <div className="pt-2 border-t border-[#E8EEF5] space-y-1.5">
                      <span className="text-[10px] uppercase font-bold text-[#168BFF] block">
                        Quick Suggestions:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {msg.suggestions.map((s, i) => (
                          <button
                            key={i}
                            onClick={() => handleSend(s)}
                            className="text-left text-[11px] px-2.5 py-1 bg-white hover:bg-[#DFF1FF] text-[#101827] hover:text-[#168BFF] rounded-lg border border-[#E8EEF5] transition-colors cursor-pointer"
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2 text-xs text-[#64748B]">
                <div className="w-7 h-7 rounded-full bg-[#168BFF] text-white flex items-center justify-center text-xs">
                  ✦
                </div>
                <div className="p-3 bg-[#F4FAFF] rounded-2xl border border-[#E8EEF5] flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#168BFF] animate-bounce" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#168BFF] animate-bounce delay-150" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#168BFF] animate-bounce delay-300" />
                  <span className="text-[11px] ml-1">Analyzing itinerary decision logic...</span>
                </div>
              </div>
            )}
          </div>

          {/* Chat Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-4 bg-white border-t border-[#E8EEF5] flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Ask Yatri anything about your itinerary, road routes, or fatigue..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 px-4 py-3 bg-[#F4FAFF] rounded-full border border-[#E8EEF5] text-xs sm:text-sm text-[#101827] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#168BFF]"
            />

            <button
              type="submit"
              disabled={!input.trim() || isTyping}
              className="w-11 h-11 rounded-full bg-[#101827] hover:bg-[#168BFF] text-white flex items-center justify-center transition-all disabled:opacity-40 cursor-pointer shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
