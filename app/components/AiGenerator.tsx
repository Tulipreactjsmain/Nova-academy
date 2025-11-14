'use client';

import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { FiSend } from 'react-icons/fi';
import { RiRobot2Line, RiUser3Line } from 'react-icons/ri';

interface Message {
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

export default function AiGenerator() {
  const [prompt, setPrompt] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = Math.min(textarea.scrollHeight, 150) + 'px';
    }
  }, [prompt]);

  const generateContent = async () => {
    if (!prompt.trim()) return;

    try {
      setLoading(true);
      setMessages(prev => [...prev, { type: 'user', content: prompt, timestamp: new Date() }]);
      setPrompt('');

      const response = await axios.post('/api/ai/generate', { prompt });
      const data = response.data;
      
      if (response.status !== 200) {
        throw new Error(data.error || 'Failed to generate content');
      }

      setMessages(prev => [...prev, { type: 'ai', content: data.text, timestamp: new Date() }]);
    } catch (error: any) {
      console.error('Error:', error);
      setMessages(prev => [...prev, { 
        type: 'ai', 
        content: 'Error: ' + error.message,
        timestamp: new Date()
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      generateContent();
    }
  };

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    }).format(date);
  };

  return (
    <div className="flex flex-col h-full relative">
      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto px-4 md:px-8 space-y-6 pb-52" data-lenis-prevent>
        <div className="max-w-4xl mx-auto w-full">
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-[50vh] text-center space-y-4 text-gray-500">
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
                <RiRobot2Line className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <p className="text-lg font-medium text-gray-700">Start a Conversation</p>
                <p className="text-sm">Ask me anything - I'm here to help!</p>
              </div>
            </div>
          )}
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} items-end space-x-2`}
            >
              {message.type === 'ai' && (
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-violet-600 flex items-center justify-center flex-shrink-0">
                  <RiRobot2Line className="w-5 h-5 text-white" />
                </div>
              )}
              <div className="flex flex-col space-y-1 max-w-[80%]">
                <div
                  className={`px-4 py-3 rounded-2xl ${
                    message.type === 'user'
                      ? 'bg-gradient-to-r from-blue-600 to-violet-600 text-white rounded-br-none'
                      : 'bg-gray-100 text-gray-800 rounded-bl-none'
                  }`}
                >
                  {message.content}
                </div>
                <span className="text-xs text-gray-400 px-2">
                  {formatTime(message.timestamp)}
                </span>
              </div>
              {message.type === 'user' && (
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                  <RiUser3Line className="w-5 h-5 text-gray-600" />
                </div>
              )}
            </div>
          ))}
          {loading && (
            <div className="flex justify-start items-end space-x-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-violet-600 flex items-center justify-center">
                <RiRobot2Line className="w-5 h-5 text-white" />
              </div>
              <div className="bg-gray-100 px-4 py-3 rounded-2xl rounded-bl-none">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Fixed Input Container */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t shadow-lg">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="relative flex items-end space-x-2">
            <textarea
              ref={textareaRef}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Type your message..."
              className="flex-1 resize-none rounded-xl border-0 bg-gray-100 p-4 pr-16 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[52px] max-h-[150px]"
              style={{ lineHeight: '1.5' }}
            />
            <button
              onClick={generateContent}
              disabled={loading || !prompt.trim()}
              className="absolute right-2 bottom-2 p-2 rounded-lg bg-gradient-to-r from-blue-600 to-violet-600 text-white hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
            >
              <FiSend className="w-5 h-5" />
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2 text-center">
            Press Enter to send • Shift + Enter for new line
          </p>
        </div>
      </div>
    </div>
  );
} 