import React, { useEffect, useState } from "react";

import io from "socket.io-client";

import VisualizerManager from "./components/VisualizerManager";



export default function App() {

  const [chat, setChat] = useState([]);

  const [nowPlaying, setNowPlaying] = useState(null);

  const [queue, setQueue] = useState([]);

  const [audioAnalyser, setAudioAnalyser] = useState(null);



  useEffect(() => {

    const socket = io("https://pumpbeatslive-backend.onrender.com");



    socket.on("chat", msg => setChat(prev => [...prev, msg]));

    socket.on("nowPlaying", track => setNowPlaying(track));

    socket.on("queue", q => setQueue(q));



    return () => socket.disconnect();

  }, []);



  // Audio analyzer

  useEffect(() => {

    const audio = document.getElementById("audio-stream");

    if (!audio) return;



    const ctx = new AudioContext();

    const src = ctx.createMediaElementSource(audio);

    const analyser = ctx.createAnalyser();



    analyser.fftSize = 256;

    src.connect(analyser);

    analyser.connect(ctx.destination);



    setAudioAnalyser(analyser);

  }, []);



  return (

    <>

      {/* Full-screen visualizer */}

      <VisualizerManager audioAnalyser={audioAnalyser} />



      {/* Invisible audio element */}

      <audio id="audio-stream" src="/stream" autoPlay />



      {/* UI Overlay */}

      <div className="ui-overlay">

        <h1>PumpBeatsLive</h1>



        <div className="now-playing-box">

          <h2>Now Playing</h2>

          {nowPlaying ? (

            <div>{nowPlaying.title} — {nowPlaying.requester}</div>

          ) : <div>Idle</div>}

        </div>



        <div className="queue-box">

          <h2>Up Next</h2>

          {queue.map((q, i) => (

            <div key={i}>{i + 1}. {q.title} — {q.requester}</div>

          ))}

        </div>



        <div className="chat-box">

          {chat.map((msg, i) => (

            <div key={i}>{msg.user}: {msg.text}</div>

          ))}

        </div>

      </div>

    </>

  );

}