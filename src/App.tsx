import { OrbitControls, Sky } from "@react-three/drei";
import { Suspense, useState } from "react";
import { Canvas } from "react-three-fiber";

import {
  ACESFilmicToneMapping,
  BasicShadowMap,
  PCFSoftShadowMap,
  sRGBEncoding,
} from "three";
import Ground from "./components/Ground";

function App() {
  const [isDragging, setIsDragging] = useState<boolean>(false);
  return (
    <div
      className="container"
      onDoubleClick={() => {
        if (isDragging === true) {
          setIsDragging(false);
        }
      }}
    >
      <Canvas
        shadows={{ type: BasicShadowMap }}
        camera={{ fov: 75, near: 1, far: 500, position: [5, 2, 5] }}
        onCreated={({ gl }) => {
          gl.setPixelRatio(window.devicePixelRatio);
          gl.outputEncoding = sRGBEncoding;
          gl.physicallyCorrectLights = true;
          gl.shadowMap.enabled = true;
          gl.shadowMap.type = PCFSoftShadowMap;
          gl.toneMapping = ACESFilmicToneMapping;
        }}
      >
        <Sky />
        <OrbitControls enabled={!isDragging} />

        <ambientLight intensity={0.5} castShadow color="#ffffff" />
        <directionalLight
          position={[50, 30, 50]}
          castShadow
          intensity={1.5}
          shadow-mapSize-width={512}
          shadow-mapSize-height={512}
          shadow-camera-far={50}
          shadow-camera-near={0.1}
          shadow-camera-left={20}
          shadow-camera-right={-20}
          shadow-camera-top={20}
          shadow-camera-bottom={-20}
          color="#ffffff"
        />

        <Suspense fallback={null}>
          <Ground isDragging={isDragging} setDragging={setIsDragging} />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default App;
