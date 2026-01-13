//soft waves + intense bursts on beat



import React, { useRef, useEffect } from "react";



export default function NeonWaveVisualizer({ analyser }) {

  const canvasRef = useRef(null);



  useEffect(() => {

    const canvas = canvasRef.current;

    const ctx = canvas.getContext("2d");

    const w = canvas.width = window.innerWidth;

    const h = canvas.height = window.innerHeight;



    const data = new Uint8Array(64);

    let phase = 0;



    function draw() {

      if (analyser) analyser.getByteFrequencyData(data);

      const bass = data[1] / 255;



      phase += 0.02 + bass * 0.1;



      ctx.fillStyle = "rgba(0, 0, 0, 0.15)";

      ctx.fillRect(0, 0, w, h);



      ctx.lineWidth = 3 + bass * 5;

      ctx.strokeStyle = `rgba(0, 255, 180, ${0.6 + bass * 0.4})`;

      ctx.beginPath();



      for (let x = 0; x < w; x += 10) {

        const y =

          h / 2 +

          Math.sin((x + phase * 80) * 0.01) * 80 +

          bass * 50;



        ctx.lineTo(x, y);

      }



      ctx.stroke();



      requestAnimationFrame(draw);

    }



    draw();

  }, [analyser]);



  return <canvas ref={canvasRef} className="visualizer-canvas"></canvas>;

}