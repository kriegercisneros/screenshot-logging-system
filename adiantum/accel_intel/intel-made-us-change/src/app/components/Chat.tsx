

// "use client";

// import { useState, useRef, useEffect } from "react";
// import { useTheme } from "next-themes";
// import { Sun, Moon, Send } from "lucide-react";

// interface Message {
//   id: number;
//   sender: "user" | "bot";
//   content: string;
// }

// export default function Chat() {
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [input, setInput] = useState<string>("");
//   const { theme, setTheme } = useTheme();
//   const bottomRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     bottomRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   const handleToggleTheme = () => {
//     setTheme(theme === "dark" ? "light" : "dark");
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (input.trim()) {
//       // Add user message
//       const userMessage: Message = {
//         id: Date.now(),
//         sender: "user",
//         content: input,
//       };
      
//       setMessages((prev) => [...prev, userMessage]);
//       setInput("");
      
//       // Simulate response (replace with actual API call)
//       setTimeout(() => {
//         const botMessage: Message = {
//           id: Date.now() + 1,
//           sender: "bot",
//           content: `Echo: ${input.trim()}`,
//         };
        
//         setMessages((prev) => [...prev, botMessage]);
//       }, 500);
//     }
//   };

//   return (
//     <div className="border rounded-xl shadow-lg overflow-hidden bg-white dark:bg-gray-900 transition-colors duration-200">
//       {/* Header */}
//       <div className="border-b p-4 flex justify-between items-center dark:border-gray-700">
//         <h2 className="font-semibold text-xl text-gray-800 dark:text-white">Chat</h2>
//         <button
//           onClick={handleToggleTheme}
//           className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
//           aria-label="Toggle theme"
//         >
//           {theme === "dark" ? (
//             <Sun className="h-5 w-5 text-yellow-500" />
//           ) : (
//             <Moon className="h-5 w-5 text-gray-600" />
//           )}
//         </button>
//       </div>

//       {/* Messages area */}
//       <div className="h-96 overflow-y-auto p-4 bg-gray-50 dark:bg-gray-800">
//         {messages.length === 0 ? (
//           <div className="h-full flex items-center justify-center">
//             <p className="text-gray-500 dark:text-gray-400 text-center">
//               Send a message to start the conversation
//             </p>
//           </div>
//         ) : (
//           <div className="space-y-4">
//             {messages.map((msg) => (
//               <div
//                 key={msg.id}
//                 className={`max-w-[80%] p-3 rounded-lg ${
//                   msg.sender === "user"
//                     ? "ml-auto bg-blue-500 text-white rounded-br-none"
//                     : "mr-auto bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-bl-none"
//                 }`}
//               >
//                 {msg.content}
//               </div>
//             ))}
//             <div ref={bottomRef} />
//           </div>
//         )}
//       </div>

//       {/* Input area */}
//       <form onSubmit={handleSubmit} className="border-t p-4 flex gap-2 dark:border-gray-700">
//         <input
//           type="text"
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           placeholder="Type your message..."
//           className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
//         />
//         <button
//           type="submit"
//           className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors flex items-center justify-center"
//           disabled={!input.trim()}
//         >
//           <Send className="h-5 w-5" />
//         </button>
//       </form>
//     </div>
//   );
// }

"use client";

import { useState, useRef, useEffect } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon, Send } from "lucide-react";

interface Message {
  id: number;
  sender: "user" | "bot";
  content: string;
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const { theme, setTheme } = useTheme();
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleToggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      // Add user message
      const userMessage: Message = {
        id: Date.now(),
        sender: "user",
        content: input,
      };
      
      setMessages((prev) => [...prev, userMessage]);
      setInput("");
      
      // Simulate response (replace with actual API call)
      setTimeout(() => {
        const botMessage: Message = {
          id: Date.now() + 1,
          sender: "bot",
          content: `Echo: ${input.trim()}`,
        };
        
        setMessages((prev) => [...prev, botMessage]);
      }, 500);
    }
  };

  return (
    <div style={{ 
      maxWidth: '650px', 
      margin: '0 auto',
      border: '1px solid #e5e7eb',
      borderRadius: '1rem',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      overflow: 'hidden',
      backgroundColor: theme === 'dark' ? '#111827' : 'white'
    }}>
      {/* Header */}
      <div style={{
        borderBottom: '1px solid ' + (theme === 'dark' ? '#374151' : '#e5e7eb'),
        padding: '1rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <h2 style={{ 
          fontWeight: '600', 
          fontSize: '1.25rem',
          color: theme === 'dark' ? 'white' : '#1f2937'
        }}>
          Chat
        </h2>
        <button
          onClick={handleToggleTheme}
          style={{
            padding: '0.5rem',
            borderRadius: '9999px',
            backgroundColor: theme === 'dark' ? '#1f2937' : '#f3f4f6',
            transition: 'background-color 0.2s'
          }}
          aria-label="Toggle theme"
        >
          {theme === "dark" ? (
            <Sun className="h-5 w-5 text-yellow-500" />
          ) : (
            <Moon className="h-5 w-5 text-gray-600" />
          )}
        </button>
      </div>

      {/* Messages area */}
      <div style={{
        height: '400px',
        overflowY: 'auto',
        padding: '1rem',
        backgroundColor: theme === 'dark' ? '#1f2937' : '#f9fafb'
      }}>
        {messages.length === 0 ? (
          <div style={{
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <p style={{
              textAlign: 'center',
              color: theme === 'dark' ? '#9ca3af' : '#6b7280'
            }}>
              Send a message to start the conversation
            </p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {messages.map((msg) => (
              <div
                key={msg.id}
                style={{
                  maxWidth: '80%',
                  padding: '0.75rem 1rem',
                  borderRadius: '0.75rem',
                  alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                  backgroundColor: msg.sender === 'user' 
                    ? '#3b82f6' 
                    : theme === 'dark' ? '#374151' : '#e5e7eb',
                  color: msg.sender === 'user' 
                    ? 'white' 
                    : theme === 'dark' ? 'white' : '#1f2937',
                  borderBottomRightRadius: msg.sender === 'user' ? 0 : '0.75rem',
                  borderBottomLeftRadius: msg.sender === 'user' ? '0.75rem' : 0,
                  marginBottom: '0.5rem'
                }}
              >
                {msg.content}
              </div>
            ))}
            <div ref={bottomRef} />
          </div>
        )}
      </div>

      {/* Input area */}
      <form 
        onSubmit={handleSubmit} 
        style={{
          borderTop: '1px solid ' + (theme === 'dark' ? '#374151' : '#e5e7eb'),
          padding: '1rem',
          display: 'flex',
          gap: '0.5rem'
        }}
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          style={{
            flexGrow: 1,
            padding: '0.5rem 1rem',
            borderRadius: '9999px',
            border: '1px solid ' + (theme === 'dark' ? '#374151' : '#e5e7eb'),
            backgroundColor: theme === 'dark' ? '#1f2937' : 'white',
            color: theme === 'dark' ? 'white' : 'black',
            outline: 'none'
          }}
        />
        <button
          type="submit"
          disabled={!input.trim()}
          style={{
            padding: '0.5rem 1rem',
            borderRadius: '9999px',
            backgroundColor: '#3b82f6',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: input.trim() ? '1' : '0.5'
          }}
        >
          <Send className="h-5 w-5" />
        </button>
      </form>
    </div>
  );
}