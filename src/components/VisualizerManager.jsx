//import React, { useEffect, useRef, useState } from "react";

import GalaxyVisualizer from "./visualizers/GalaxyVisualizer";

import NeonWaveVisualizer from "./visualizers/NeonWaveVisualizer";

import FireworksVisualizer from "./visualizers/FireworksVisualizer";

import FractalSphereVisualizer from "./visualizers/FractalSphereVisualizer";

import MatrixGridVisualizer from "./visualizers/MatrixGridVisualizer";



const VISUALIZERS = [

  GalaxyVisualizer,

  NeonWaveVisualizer,

  FireworksVisualizer,

  FractalSphereVisualizer,

  MatrixGridVisualizer

];



export default function VisualizerManager({ audioAnalyser }) {

  const [index, setIndex] = useState(0);

  const switchInterval = useRef(null);



  // Switch every 2.5 minutes

  useEffect(() => {

    switchInterval.current = setInterval(() => {

      setIndex(prev => (prev + 1) % VISUALIZERS.length);

    }, 150000); // 150,000 ms = 2.5 minutes



    return () => clearInterval(switchInterval.current);

  }, []);



  const SelectedVisualizer = VISUALIZERS[index];



  return (

    <div className="visualizer-container">

      <SelectedVisualizer analyser={audioAnalyser} />

    </div>

  );

}
