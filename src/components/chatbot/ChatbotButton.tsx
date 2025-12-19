import React, { useState } from 'react';
import Chatbot from './Chatbot';

const ChatbotButton: React.FC = () => {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [hasUnread, setHasUnread] = useState(false);

  const toggleChatbot = () => {
    setIsChatbotOpen(!isChatbotOpen);
    if (!isChatbotOpen) {
      setHasUnread(false);
    }
  };

  return (
    <>
      <button 
        className={`
          fixed bottom-5 right-5 w-14 h-14 md:w-[60px] md:h-[60px]
          rounded-full border-none cursor-pointer
          flex items-center justify-center
          text-white transition-all duration-300 ease-in-out
          z-[999] shadow-lg
          ${isChatbotOpen 
            ? 'bg-red-500 hover:bg-red-600 scale-100' 
            : 'bg-gradient-to-br from-indigo-500 to-purple-600 hover:scale-110'
          }
          hover:shadow-2xl active:scale-95
          focus:outline-none focus:ring-4 focus:ring-indigo-300
          animate-float
        `}
        onClick={toggleChatbot}
        aria-label="Toggle chatbot"
        style={{
          boxShadow: isChatbotOpen 
            ? '0 6px 30px rgba(239, 68, 68, 0.4)' 
            : '0 4px 20px rgba(102, 126, 234, 0.4)'
        }}
      >
        {isChatbotOpen ? (
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="currentColor"
            className="w-7 h-7 transition-transform duration-300"
          >
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
          </svg>
        ) : (
          <>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="currentColor"
              className="w-7 h-7 transition-transform duration-300 hover:rotate-12"
            >
              <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/>
            </svg>
            {hasUnread && (
              <span 
                className="
                  absolute top-2 right-2 w-3 h-3 
                  bg-red-500 border-2 border-white rounded-full
                  animate-pulse-badge
                "
              />
            )}
          </>
        )}
      </button>

      {isChatbotOpen && (
        <Chatbot 
          isOpen={isChatbotOpen} 
          onClose={() => setIsChatbotOpen(false)} 
        />
      )}

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes pulse-badge {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.2);
            opacity: 0.8;
          }
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-float:hover {
          animation: none;
        }

        .animate-pulse-badge {
          animation: pulse-badge 2s infinite;
        }
      `}</style>
    </>
  );
};

export default ChatbotButton;
