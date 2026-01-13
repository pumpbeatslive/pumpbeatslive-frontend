//BIG pops on bass hits, smooth glowing particles otherwise



import React, { useRef, useEffect } from "react";



export default function FireworksVisualizer({ analyser }) {

  const canvasRef = useRef(null);



  useEffect(() => {

    const canvas = canvasRef.current;

    const ctx = canvas.getContext("2d");

    const w = canvas.width = window.innerWidth;

    const h = canvas.height = window.innerHeight;



    const data = new Uint8Array(64);

    const particles = [];



    function spawnFirework(intensity) {

      for (let i = 0; i < 80 + intensity * 50; i++) {

        particles.push({

          x: w / 2,

          y: h / 2,

          vx: Math.random() * 4 - 2,

          vy: Math.random() * 4 - 2,

          life: 1,

          color: `rgba(0, ${100 + intensity * 150}, 255, 1)`

        });

      }

    }



    function draw() {

      if (analyser) analyser.getByteFrequencyData(data);

      const bass = data[1] / 255;



      if (bass > 0.5) spawnFirework(bass);



      ctx.fillStyle = "rgba(0, 0, 0, 0.2)";

      ctx.fillRect(0, 0, w, h);



      particles.forEach((p, i) => {

        p.x += p.vx;

        p.y += p.vy;

        p.life -= 0.01;



        if (p.life <= 0) particles.splice(i, 1);



        ctx.fillStyle = p.color.replace("1)", `${p.life})`);

        ctx.beginPath();

        ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);

        ctx.fill();

      });



      requestAnimationFrame(draw);

    }



    draw();

  }, [analyser]);



  return <canvas ref={canvasRef} className="visualizer-canvas"></canvas>;

}