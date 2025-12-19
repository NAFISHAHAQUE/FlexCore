import React, { useState } from 'react';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: 'Hi! 👋 I\'m your fitness coach. How can I help you today?', sender: 'bot' }
  ]);
  const [input, setInput] = useState('');

  const quickPrompts = [
    'Give me a full-body workout',
    'How much protein should I eat?',
    'Motivation tips, please',
    'Stretching routine before lifting'
  ];

  const botResponses = {
    workout: "Great! What type of workout are you interested in? We have Strength, Cardio, HIIT, and Flexibility options.",
    form: "Proper form is crucial! Focus on controlled movements, full range of motion, and core engagement.",
    nutrition: "Aim for protein with each meal (20-30g), stay hydrated, and eat whole foods. Post-workout meals are especially important!",
    motivation: "You've got this! Remember, every workout brings you closer to your goals. Progress over perfection! 💪",
    rest: "Rest days are important too! Aim for 7-9 hours of sleep and take at least one full rest day per week.",
    hiit: "HIIT is intense but effective! Do 30-60 seconds of max effort, then 30-60 seconds of recovery. Usually 15-30 minutes total.",
    strength: "For strength training, focus on progressive overload. Increase weight, reps, or sets every 2-3 weeks to keep challenging your muscles.",
    cardio: "Cardio improves heart health! Mix steady-state cardio with interval training for best results.",
    stretching: "Stretching helps mobility and prevents injury. Do dynamic stretches before workouts and static stretches after.",
    default: "I can help with workout advice, form tips, nutrition guidance, and motivation! What would you like to know?"
  };

  const sendMessage = (content) => {
    if (!content.trim()) return;

    const userMsg = { id: Date.now(), text: content, sender: 'user' };
    setMessages((prev) => [...prev, userMsg]);

    let response = botResponses.default;
    const lowerInput = content.toLowerCase();

    if (lowerInput.includes('workout') || lowerInput.includes('plan') || lowerInput.includes('exercise')) {
      response = botResponses.workout;
    } else if (lowerInput.includes('form') || lowerInput.includes('technique')) {
      response = botResponses.form;
    } else if (lowerInput.includes('nutrition') || lowerInput.includes('eat') || lowerInput.includes('food') || lowerInput.includes('protein')) {
      response = botResponses.nutrition;
    } else if (lowerInput.includes('motiv') || lowerInput.includes('tired') || lowerInput.includes('lazy')) {
      response = botResponses.motivation;
    } else if (lowerInput.includes('rest') || lowerInput.includes('sleep') || lowerInput.includes('recover')) {
      response = botResponses.rest;
    } else if (lowerInput.includes('hiit') || lowerInput.includes('interval')) {
      response = botResponses.hiit;
    } else if (lowerInput.includes('strength') || lowerInput.includes('weight') || lowerInput.includes('muscle')) {
      response = botResponses.strength;
    } else if (lowerInput.includes('cardio') || lowerInput.includes('running') || lowerInput.includes('cycling')) {
      response = botResponses.cardio;
    } else if (lowerInput.includes('stretch') || lowerInput.includes('flexible')) {
      response = botResponses.stretching;
    }

    setTimeout(() => {
      setMessages((prev) => [...prev, { id: Date.now() + 1, text: response, sender: 'bot' }]);
    }, 300);
  };

  const handleSend = () => {
    sendMessage(input);
    setInput('');
  };

  const handleQuickSend = (prompt) => {
    sendMessage(prompt);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {/* Chat Bubble Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="h-14 w-14 rounded-full bg-[#7B9669] hover:bg-[#8aa678] text-white shadow-lg flex items-center justify-center transition-all transform hover:scale-110"
        >
          <span className="text-2xl">💬</span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="w-80 h-96 bg-white rounded-2xl shadow-xl flex flex-col border border-[#d4e0ce]">
          {/* Header */}
          <div className="bg-[#7B9669] text-white px-4 py-3 rounded-t-2xl flex justify-between items-center">
            <div>
              <h3 className="font-bold text-sm">Fitness Coach</h3>
              <p className="text-xs opacity-90">Always here to help</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-lg hover:text-[#e8f0e3] transition"
            >
              ✕
            </button>
          </div>

          {/* Quick prompts */}
          <div className="flex flex-wrap gap-2 px-4 py-3 border-b border-[#d4e0ce] bg-[#f8fbf6]">
            {quickPrompts.map((prompt) => (
              <button
                key={prompt}
                type="button"
                onClick={() => handleQuickSend(prompt)}
                className="rounded-full bg-white px-3 py-1 text-[11px] font-semibold text-[#4a5b3f] border border-[#d4e0ce] hover:border-[#7B9669] hover:text-[#7B9669] transition"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map(msg => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-lg text-sm ${
                    msg.sender === 'user'
                      ? 'bg-[#7B9669] text-white rounded-br-none'
                      : 'bg-[#f0f5ed] text-slate-800 border border-[#d4e0ce] rounded-bl-none'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="border-t border-[#d4e0ce] p-3 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask me anything..."
              className="flex-1 border border-[#d4e0ce] rounded-lg px-3 py-2 text-sm focus:border-[#7B9669] focus:outline-none focus:ring-1 focus:ring-[#7B9669]/50"
            />
            <button
              onClick={handleSend}
              className="bg-[#7B9669] hover:bg-[#8aa678] text-white px-3 py-2 rounded-lg text-sm font-semibold transition"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
