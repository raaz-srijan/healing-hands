import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

interface Message {
  _id?: string;
  role: 'user' | 'bot';
  content: string;
  createdAt?: string;
  intent?: string | null;
}

interface ChatbotProps {
  isOpen: boolean;
  onClose: () => void;
}

const Chatbot: React.FC<ChatbotProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [showContactForm, setShowContactForm] = useState(false);
  const [contactInfo, setContactInfo] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [rateLimitError, setRateLimitError] = useState<string>('');
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    let storedSessionId = localStorage.getItem('chatSessionId');
    
    if (!storedSessionId) {
      storedSessionId = `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem('chatSessionId', storedSessionId);
    }
    
    setSessionId(storedSessionId);
    
    if (storedSessionId) {
      loadChatHistory(storedSessionId);
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const loadChatHistory = async (sid: string) => {
    try {
      const response = await axios.get(`${API_URL}/chats/history`, {
        params: { sessionId: sid, page: 1, limit: 50 }
      });
      
      if (response.data && Array.isArray(response.data) && response.data.length > 0) {
        setMessages(response.data);
      } else {
        // If history is empty, show default greeting
        setMessages([{
          role: 'bot',
          content: "Hello! I'm your hospital assistant. How can I help you today? You can ask about appointments, departments, visiting hours, location, insurance, or emergency services.",
          createdAt: new Date().toISOString()
        }]);
      }
    } catch (err: any) {
      console.error('Error loading chat history:', err);
      // Fallback greeting on error
      setMessages([{
        role: 'bot',
        content: "Hello! I'm your hospital assistant. How can I help you today? You can ask about appointments, departments, visiting hours, location, insurance, or emergency services.",
        createdAt: new Date().toISOString()
      }]);
    }
  };

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;
    
    const userMessage = inputMessage.trim();
    setInputMessage('');
    setError('');
    setRateLimitError('');

    const newUserMessage: Message = {
      role: 'user',
      content: userMessage,
      createdAt: new Date().toISOString()
    };
    
    setMessages(prev => [...prev, newUserMessage]);
    setIsLoading(true);

    try {
      const response = await axios.post(`${API_URL}/chats/send`, {
        sessionId,
        message: userMessage
      });

      const botMessage: Message = {
        role: 'bot',
        content: response.data.reply,
        createdAt: new Date().toISOString()
      };
      
      setMessages(prev => [...prev, botMessage]);

      if (response.data.reply.toLowerCase().includes('contact') || 
          response.data.reply.toLowerCase().includes('reach you')) {
        setShowContactForm(true);
      }

    } catch (err: any) {
      console.error('Error sending message:', err);
      
      if (err.response?.status === 429) {
        const retryAfter = err.response.data?.retryAfter || '1 minute';
        setRateLimitError(`Too many messages. Please wait ${retryAfter} before sending another message.`);
        
        setMessages(prev => [...prev, {
          role: 'bot',
          content: `I'm receiving too many messages right now. Please wait a moment before sending another message.`,
          createdAt: new Date().toISOString()
        }]);
      } else if (err.response?.status === 400) {
        setError(err.response.data?.error || 'Invalid message. Please try again.');
        
        setMessages(prev => [...prev, {
          role: 'bot',
          content: 'Sorry, there was an issue with your message. Please try rephrasing it.',
          createdAt: new Date().toISOString()
        }]);
      } else {
        setError('Failed to send message. Please try again.');
        
        setMessages(prev => [...prev, {
          role: 'bot',
          content: "I'm having trouble connecting right now. Please try again in a moment.",
          createdAt: new Date().toISOString()
        }]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const submitContactInfo = async () => {
    if (!contactInfo.name || !contactInfo.email) {
      setError('Please provide at least your name and email.');
      return;
    }

    try {
      await axios.post(`${API_URL}/chats/session-info`, {
        sessionId,
        name: contactInfo.name,
        email: contactInfo.email,
        phone: contactInfo.phone
      });

      setMessages(prev => [...prev, {
        role: 'bot',
        content: `Thank you, ${contactInfo.name}! I've saved your contact information. Someone from our team will reach out to you soon.`,
        createdAt: new Date().toISOString()
      }]);

      setShowContactForm(false);
      setContactInfo({ name: '', email: '', phone: '' });
      setError('');
    } catch (err: any) {
      console.error('Error submitting contact info:', err);
      
      if (err.response?.status === 400) {
        setError(err.response.data?.error || err.response.data?.errors?.join(', ') || 'Invalid information provided.');
      } else {
        setError('Failed to save contact information. Please try again.');
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const clearChat = () => {
    const newSessionId = `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem('chatSessionId', newSessionId);
    setSessionId(newSessionId);
    setMessages([{
      role: 'bot',
      content: "Hello! I'm your hospital assistant. How can I help you today?",
      createdAt: new Date().toISOString()
    }]);
    setError('');
    setRateLimitError('');
    setShowContactForm(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-5 right-5 w-[380px] max-w-[calc(100vw-40px)] h-[600px] max-h-[calc(100vh-100px)] bg-gradient-to-br from-indigo-500 to-purple-600 rounded-[20px] shadow-2xl flex flex-col overflow-hidden z-[1000] animate-slideUp md:w-[380px] md:h-[600px]">
      {/* Header */}
      <div className="bg-white/10 backdrop-blur-md px-5 py-4 flex justify-between items-center border-b border-white/20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
            </svg>
          </div>
          <div>
            <h3 className="text-white font-semibold text-base m-0">Hospital Assistant</h3>
            <span className="text-white/80 text-xs flex items-center gap-1.5">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              Online
            </span>
          </div>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={clearChat} 
            className="bg-white/20 hover:bg-white/30 border-none w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer transition-all text-white hover:scale-105"
            title="New Chat"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M19 13H5v-2h14v2z"/>
            </svg>
          </button>
          <button 
            onClick={onClose} 
            className="bg-white/20 hover:bg-white/30 border-none w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer transition-all text-white hover:scale-105"
            title="Close"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-5 bg-white dark:bg-slate-900 flex flex-col gap-3 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 dark:scrollbar-track-gray-800">
        {messages.map((msg, index) => (
          <div key={index} className={`flex flex-col max-w-[80%] animate-fadeIn ${msg.role === 'user' ? 'self-end' : 'self-start'}`}>
            <div className={`px-4 py-3 rounded-2xl break-words leading-relaxed text-sm ${
              msg.role === 'user' 
                ? 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-br-sm' 
                : 'bg-gray-100 dark:bg-slate-800 text-gray-800 dark:text-gray-100 rounded-bl-sm'
            }`}>
              {msg.content}
            </div>
            {msg.createdAt && (
              <div className={`text-xs text-gray-400 mt-1 px-1 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            )}
          </div>
        ))}
        
        {isLoading && (
          <div className="flex flex-col max-w-[80%] self-start animate-fadeIn">
            <div className="px-4 py-4 rounded-2xl bg-gray-100 dark:bg-slate-800 rounded-bl-sm flex gap-1">
              <span className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce"></span>
              <span className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce [animation-delay:0.2s]"></span>
              <span className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce [animation-delay:0.4s]"></span>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Contact Form */}
      {showContactForm && (
        <div className="bg-gray-50 dark:bg-slate-800 p-4 border-t border-gray-200 dark:border-slate-700 flex flex-col gap-3">
          <h4 className="m-0 mb-2 text-sm font-semibold text-gray-800 dark:text-gray-100">Contact Information</h4>
          <input
            type="text"
            placeholder="Your Name *"
            value={contactInfo.name}
            onChange={(e) => setContactInfo({ ...contactInfo, name: e.target.value })}
            className="px-3 py-2.5 border border-gray-300 rounded-lg text-sm transition-all focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          />
          <input
            type="email"
            placeholder="Your Email *"
            value={contactInfo.email}
            onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
            className="px-3 py-2.5 border border-gray-300 rounded-lg text-sm transition-all focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          />
          <input
            type="tel"
            placeholder="Your Phone (optional)"
            value={contactInfo.phone}
            onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
            className="px-3 py-2.5 border border-gray-300 dark:border-slate-600 rounded-lg text-sm transition-all focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:bg-slate-700 dark:text-white"
          />
          <div className="flex gap-2">
            <button 
              onClick={submitContactInfo} 
              className="flex-1 px-4 py-2.5 bg-gradient-to-br from-indigo-500 to-purple-600 text-white border-none rounded-lg text-sm font-medium cursor-pointer transition-all hover:-translate-y-0.5 hover:shadow-lg"
            >
              Submit
            </button>
            <button 
              onClick={() => setShowContactForm(false)} 
              className="flex-1 px-4 py-2.5 bg-gray-200 dark:bg-slate-700 text-gray-600 dark:text-gray-300 border-none rounded-lg text-sm font-medium cursor-pointer transition-all hover:bg-gray-300 dark:hover:bg-slate-600"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Error Messages */}
      {error && (
        <div className="px-5 py-3 text-sm text-center bg-red-100 text-red-800 border-t border-red-200 animate-shake">
          {error}
        </div>
      )}

      {rateLimitError && (
        <div className="px-5 py-3 text-sm text-center bg-yellow-100 text-yellow-800 border-t border-yellow-200 animate-shake">
          {rateLimitError}
        </div>
      )}

      {/* Input Area */}
      <div className="flex gap-2 p-4 bg-white dark:bg-slate-900 border-t border-gray-200 dark:border-slate-800">
        <input
          type="text"
          placeholder="Type your message..."
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={isLoading}
          maxLength={1000}
          className="flex-1 px-4 py-3 border border-gray-300 dark:border-slate-700 rounded-full text-sm transition-all focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:bg-slate-800 dark:text-white disabled:bg-gray-100 dark:disabled:bg-slate-900 disabled:cursor-not-allowed"
        />
        <button 
          onClick={sendMessage} 
          disabled={isLoading || !inputMessage.trim()}
          className="w-11 h-11 bg-gradient-to-br from-indigo-500 to-purple-600 border-none rounded-full flex items-center justify-center cursor-pointer transition-all text-white hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
          </svg>
        </button>
      </div>

      {/* Footer */}
      <div className="px-5 py-2 bg-white/10 backdrop-blur-md text-center border-t border-white/20">
        <small className="text-white/80 text-xs">Powered by Hospital Management System</small>
      </div>

      <style>{`
        @keyframes slideUp {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }

        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        .animate-shake {
          animation: shake 0.5s;
        }

        .scrollbar-thin::-webkit-scrollbar {
          width: 6px;
        }

        .scrollbar-track-gray-100::-webkit-scrollbar-track {
          background: #f3f4f6;
        }
        
        /* Dark mode scrollbar track */
        :global(.dark) .scrollbar-track-gray-100::-webkit-scrollbar-track {
           background: #1f2937;
        }

        .scrollbar-thumb-gray-400::-webkit-scrollbar-thumb {
          background: #9ca3af;
          border-radius: 3px;
        }

        .scrollbar-thumb-gray-400::-webkit-scrollbar-thumb:hover {
          background: #6b7280;
        }
      `}</style>
    </div>
  );
};

export default Chatbot;
