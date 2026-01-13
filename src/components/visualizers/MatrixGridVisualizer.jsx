//blue/green matrix rain + heavy beat pulses





import React, { useRef, useEffect } from "react";



export default function MatrixGridVisualizer({ analyser }) {

  const canvasRef = useRef(null);



  useEffect(() => {

    const canvas = canvasRef.current;

    const ctx = canvas.getContext("2d");

    const w = canvas.width = window.innerWidth;

    const h = canvas.height = window.innerHeight;



    const columns = Math.floor(w / 20);

    const drops = new Array(columns).fill(0);

    const data = new Uint8Array(64);



    function draw() {

      if (analyser) analyser.getByteFrequencyData(data);

      const bass = data[1] / 255;



      ctx.fillStyle = "rgba(0,0,0,0.1)";

      ctx.fillRect(0, 0, w, h);



      ctx.fillStyle = `rgba(0, 255, 150, ${0.6 + bass * 0.4})`;

      ctx.font = "18px monospace";



      for (let i = 0; i < drops.length; i++) {

        const text = String.fromCharCode(0x30A0 + Math.random() * 96);

        const x = i * 20;

        const y = drops[i] * 20;



        ctx.fillText(text, x, y);



        if (y > h || Math.random() > 0.98 - bass * 0.5) {

          drops[i] = 0;

        } else {

          drops[i]++;

        }

      }



      requestAnimationFrame(draw);

    }



    draw();

  }, [analyser]);



  return <canvas ref={canvasRef} className="visualizer-canvas"></canvas>;

}