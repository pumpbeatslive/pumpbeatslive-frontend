import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [chat, setChat] = useState([]);
  const [input, setInput] = useState('');

  const sendMessage = () => {
    if (!input.trim()) return;
    setChat([...chat, { text: input, user: 'You' }]);
    setInput('');
    
    // Simulate sending to backend
    fetch('/api/request', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ command: input }),
    });
  };

  return (
    <div className="App">
      <h1>PumpBeatsLive</h1>
      <div className="chat-box">
        {chat.map((msg, i) => (
          <div key={i}>{msg.user}: {msg.text}</div>
        ))}
      </div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type a command (e.g. !make lo-fi beat)"
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default App;
