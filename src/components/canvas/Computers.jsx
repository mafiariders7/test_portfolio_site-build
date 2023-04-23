import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";

import CanvasLoader from "../Loader";


const Computers = ({isMobile}) => {

  const computer = useGLTF("./desktop_pc/scene.gltf");

  return (
    <mesh>
      <hemisphereLight intensity={0.15}
        groundColor="black"
      />
      <spotLight 
        positon ={[-20,50,10]}
        angle ={0.12}
        penubra={1}
        intensity={1}
        castShadow
        shadow-mapSize={1024}
      />
      <pointLight intensity={1} />
      <primitive
        object={computer.scene}
        scale ={isMobile?0.55: 0.75}
        position ={ isMobile? [0,-3,-1.8]:[0,-3.7,-1.5]}
        rotation ={[-0.01,-0.2,-0.1]}

      />
    </mesh>
  )
}

const ComputersCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(()=>{
     const mediaQuary = window.matchMedia('(max-width:500px)');
     setIsMobile(mediaQuary.matches);
       
     const handleMediaQuaryChange = (e) => {
      setIsMobile(e.matches);
     }

      mediaQuary.addEventListener('change',handleMediaQuaryChange);

      return ()=>{
        mediaQuary.removeEventListener('change',handleMediaQuaryChange);
      }

  },[]);


  return (
    <Canvas
      frameloop='demand'
      shadows
      camera={{ position: [20, 3, 5], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}>

      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Computers  isMobile={isMobile} />
      </Suspense>

      <Preload all />
    </Canvas>
  );
};

export default ComputersCanvas;