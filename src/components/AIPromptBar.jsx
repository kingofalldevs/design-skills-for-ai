import React, { useState, useRef, useEffect } from 'react';

// Predefined smart responses for the offline mock fallback
function getSmartMockResponse(prompt) {
  const normalized = prompt.toLowerCase();
  
  if (normalized.includes('hello') || normalized.includes('hi') || normalized.includes('hey')) {
    return "hello! i am your deepseek design stylist. what are we designing today?";
  }
  if (normalized.includes('neon') || normalized.includes('cyber') || normalized.includes('dark')) {
    return "neon styling works best when contrast is high. i suggest a background of `#0c0817` coupled with borders of `rgba(255, 0, 85, 0.2)` and a primary theme color of `#00ffcc`. should i draft a layout config for this?";
  }
  if (normalized.includes('stark') || normalized.includes('mono') || normalized.includes('minimal')) {
    return "a stark layout should prioritize typography weights (like `100` or `200` for headings) and clean line heights. use pure black `#000000` or white `#ffffff` with absolute minimal layout boundaries (borders set to `none` or solid dividers).";
  }
  if (normalized.includes('nav') || normalized.includes('navigation') || normalized.includes('header')) {
    return "for a clean navigation bar, i recommend setting a fixed height of `72px`, display `flex` for alignment, and horizontal links with subtle hover transitions (like opacity or a thin underline).";
  }
  if (normalized.includes('pricing') || normalized.includes('plan') || normalized.includes('pricing grid')) {
    return "pricing grids look outstanding when structured inside cards with varying opacity levels (e.g. `rgba(255,255,255,0.01)`), featuring a prominent pro tier card styled with filled contrast colors to drive click rates.";
  }
  
  return `that sounds like an interesting design concept! using deepseek-v3, we can build it with clean layout structures, modern styling rules, and smooth micro-animations. is there a specific theme or color scheme you want to apply?`;
}

export default function AIPromptBar() {
  const [chatOpen, setChatOpen] = useState(false);
  const [promptInput, setPromptInput] = useState('');
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'hello! what are we designing today?' }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  
  const messagesEndRef = useRef(null);

  // Auto scroll to bottom of chat
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  const handleSend = async (textToSend) => {
    if (!textToSend.trim()) return;

    const newMessages = [...messages, { role: 'user', content: textToSend }];
    setMessages(newMessages);
    setPromptInput('');
    setIsTyping(true);

    try {
      const apiKey = import.meta.env.VITE_DEEPSEEK_API_KEY;
      let replyContent = '';

      if (apiKey && apiKey !== '' && apiKey !== 'your_actual_deepseek_api_key') {
        // Prepare API request payload
        const apiMessages = newMessages.map(msg => ({
          role: msg.role,
          content: msg.content
        }));

        const response = await fetch('https://api.deepseek.com/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
          },
          body: JSON.stringify({
            model: 'deepseek-chat',
            messages: [
              { 
                role: 'system', 
                content: 'You are DeepSeek AI Stylist. You help developers and designers brainstorm and build premium components. Keep your replies concise, lowercase, and styled using monospace-friendly phrasing.' 
              },
              ...apiMessages
            ]
          })
        });

        if (!response.ok) {
          throw new Error(`API returned: ${response.statusText}`);
        }

        const data = await response.json();
        replyContent = data.choices[0].message.content;
      } else {
        // Simulate thinking animation
        await new Promise(resolve => setTimeout(resolve, 1500));
        replyContent = getSmartMockResponse(textToSend);
      }

      setMessages(prev => [...prev, { role: 'assistant', content: replyContent }]);
    } catch (error) {
      console.error("DeepSeek API chat error:", error);
      setMessages(prev => [
        ...prev, 
        { role: 'assistant', content: `error: ${error.message}. check your connection or api key configuration.` }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleBarSubmit = (e) => {
    e.preventDefault();
    if (!promptInput.trim()) return;
    setChatOpen(true);
    handleSend(promptInput);
  };

  return (
    <>
      {/* Floating Prompt Bar (Trigger) */}
      <div className="ai-prompt-bar-container">
        <form onSubmit={handleBarSubmit} className="ai-prompt-bar" onClick={() => !chatOpen && setChatOpen(true)}>
          <div className="ai-icon-wrap">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m11.314 11.314l.707-.707" />
              <circle cx="12" cy="12" r="4" />
            </svg>
          </div>
          <input
            type="text"
            className="ai-input"
            value={promptInput}
            onChange={(e) => setPromptInput(e.target.value)}
            placeholder="what are we designing today "
            aria-label="Ask deepseek design agent"
            disabled={chatOpen} // Redirect typing input to chat window once open
          />
          <div className="ai-action-group">
            <span className="deepseek-badge">deepseek</span>
            <button 
              type="submit" 
              className="ai-submit-btn"
              aria-label="Open chat"
              disabled={chatOpen && !promptInput.trim()}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
            </button>
          </div>
        </form>
      </div>

      {/* Expanded Chat Overlay Window */}
      {chatOpen && (
        <div className="ai-chat-window">
          <div className="ai-chat-header">
            <div className="ai-chat-title-group">
              <span className="ai-chat-status"></span>
              <span className="ai-chat-title">deepseek ai stylist</span>
            </div>
            <button 
              className="ai-chat-close-btn" 
              onClick={() => setChatOpen(false)}
              aria-label="Close chat"
            >
              ✕
            </button>
          </div>

          <div className="ai-chat-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`ai-chat-msg ${msg.role}`}>
                {msg.content}
              </div>
            ))}
            {isTyping && (
              <div className="ai-chat-msg assistant">
                <div className="typing-dots">
                  <div className="typing-dot"></div>
                  <div className="typing-dot"></div>
                  <div className="typing-dot"></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form 
            onSubmit={(e) => {
              e.preventDefault();
              const inputVal = e.target.elements.message.value;
              if (inputVal.trim()) {
                handleSend(inputVal);
                e.target.reset();
              }
            }}
            className="ai-chat-input-area"
          >
            <input
              type="text"
              name="message"
              className="ai-chat-input"
              placeholder="type your prompt..."
              autoComplete="off"
              disabled={isTyping}
            />
            <button 
              type="submit" 
              className="ai-chat-send-btn"
              disabled={isTyping}
              aria-label="Send message"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </form>
        </div>
      )}
    </>
  );
}
