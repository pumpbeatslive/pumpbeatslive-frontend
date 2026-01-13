//blue/green galaxy, sparkles, reacts to beat



import React, { useRef, useEffect } from "react";



export default function GalaxyVisualizer({ analyser }) {

  const canvasRef = useRef(null);



  useEffect(() => {

    const canvas = canvasRef.current;

    const ctx = canvas.getContext("2d");

    const w = canvas.width = window.innerWidth;

    const h = canvas.height = window.innerHeight;



    const stars = Array.from({ length: 300 }, () => ({

      x: Math.random() * w,

      y: Math.random() * h,

      z: Math.random() * 3 + 0.5

    }));



    const data = new Uint8Array(64);



    function draw() {

      if (analyser) analyser.getByteFrequencyData(data);

      const bass = data[1] / 255; // kick drum level



      ctx.fillStyle = `rgba(0, 10, 20, 0.25)`;

      ctx.fillRect(0, 0, w, h);



      stars.forEach((s) => {

        const speed = s.z + bass * 5;



        s.x += speed;

        if (s.x > w) s.x = 0;



        const size = s.z + bass * 3;

        ctx.fillStyle = `rgba(${20 + bass * 200}, ${80 + bass * 120}, 255, 0.9)`;

        ctx.beginPath();

        ctx.arc(s.x, s.y, size, 0, Math.PI * 2);

        ctx.fill();

      });



      requestAnimationFrame(draw);

    }



    draw();

  }, [analyser]);



  return <canvas ref={canvasRef} className="visualizer-canvas"></canvas>;

}