import { OrbitControls, Sky, softShadows } from "@react-three/drei";
import { Suspense } from "react";
import { Canvas } from "react-three-fiber";

import { ACESFilmicToneMapping, PCFSoftShadowMap, sRGBEncoding } from "three";
import Ground from "./components/Ground";

softShadows();
function App() {
  return (
    <div className="container">
      <Canvas
        shadows
        camera={{ fov: 75, near: 1, far: 500, position: [80, 20, 80] }}
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
        <OrbitControls />
        <ambientLight intensity={1.5} castShadow color="#ffffff" />
        <Suspense fallback={null}>
          <Ground />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default App;
