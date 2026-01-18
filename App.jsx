import React, { useEffect, useState } from "react";

import io from "socket.io-client";

import VisualizerManager from "./components/VisualizerManager";

import "./styles/visualizer.css";



const socket = io(import.meta.env.VITE_BACKEND_URL);



function App() {

  const [chat, setChat] = useState([]);

  const [input, setInput] = useState("");

  const [nowPlaying, setNowPlaying] = useState(null);

  const [audioAnalyser, setAudioAnalyser] = useState(null);



  useEffect(() => {

    socket.on("chat", (msg) => {

      setChat((prev) => [...prev, msg]);

    });



    socket.on("nowPlaying", (track) => {

      setNowPlaying(track);

    });



    return () => {

      socket.off("chat");

      socket.off("nowPlaying");

    };

  }, []);



  // AUDIO → VISUALIZER PIPE

  useEffect(() => {

    const audio = document.getElementById("audio-player");

    if (!audio) return;



    const ctx = new AudioContext();

    const src = ctx.createMediaElementSource(audio);

    const analyser = ctx.createAnalyser();



    analyser.fftSize = 256;

    src.connect(analyser);

    analyser.connect(ctx.destination);



    setAudioAnalyser(analyser);

  }, []);



  const sendMessage = async () => {

    if (!input.trim()) return;



    await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/request`, {

      method: "POST",

      headers: { "Content-Type": "application/json" },

      body: JSON.stringify({ command: input }),

    });



    setInput("");

  };



  return (

    <>

      {/* FULLSCREEN VISUALS */}

      <VisualizerManager audioAnalyser={audioAnalyser} />



      {/* AUDIO SOURCE (TEMP TEST FILE) */}

      <audio

        id="audio-player"

        src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"

        autoPlay

        controls

        style={{ display: "none" }}

      />



      {/* UI */}

      <div className="ui-overlay">

        <h1>PumpBeatsLive</h1>



        <p>

          Type <b>!anything</b> to generate a brand-new beat from scratch.

        </p>



        {nowPlaying && (

          <div>

            🎵 Now Playing: {nowPlaying.title}

          </div>

        )}



        <div className="chat-box">

          {chat.map((msg, i) => (

            <div key={i}>

              <b>{msg.user}:</b> {msg.text}

            </div>

          ))}

        </div>



        <input

          value={input}

          onChange={(e) => setInput(e.target.value)}

          placeholder="!dark trap beat with distortion"

          onKeyDown={(e) => e.key === "Enter" && sendMessage()}

        />

        <button onClick={sendMessage}>Send</button>

      </div>

    </>

  );

}



export default App;
