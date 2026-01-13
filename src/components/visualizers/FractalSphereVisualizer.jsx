//smooth rotating luminous fractal with pulsing energy



import React, { useRef, useEffect } from "react";



export default function FractalSphereVisualizer({ analyser }) {

  const canvasRef = useRef(null);



  useEffect(() => {

    const canvas = canvasRef.current;

    const ctx = canvas.getContext("2d");

    const w = canvas.width = window.innerWidth;

    const h = canvas.height = window.innerHeight;



    const data = new Uint8Array(64);

    let t = 0;



    function draw() {

      if (analyser) analyser.getByteFrequencyData(data);

      const bass = data[1] / 255;



      t += 0.01 + bass * 0.05;



      ctx.fillStyle = "rgba(0, 0, 0, 0.25)";

      ctx.fillRect(0, 0, w, h);



      for (let i = 0; i < 200; i++) {

        const angle = (i / 200) * Math.PI * 2;

        const radius = 150 + Math.sin(t + i) * 40 + bass * 80;



        const x = w / 2 + Math.cos(angle + t * 0.5) * radius;

        const y = h / 2 + Math.sin(angle + t * 0.5) * radius;



        ctx.fillStyle = `rgba(0, ${150 + bass * 100}, 255, 0.8)`;

        ctx.beginPath();

        ctx.arc(x, y, 3 + bass * 6, 0, Math.PI * 2);

        ctx.fill();

      }



      requestAnimationFrame(draw);

    }



    draw();

  }, [analyser]);



  return <canvas ref={canvasRef} className="visualizer-canvas"></canvas>;

}