import { OrbitControls, Sky, softShadows } from "@react-three/drei";
import { Suspense, useState } from "react";
import { Canvas } from "react-three-fiber";

import {
  ACESFilmicToneMapping,
  PCFSoftShadowMap,
  Plane,
  sRGBEncoding,
  Vector3,
} from "three";
import Character from "./components/Character";
import Ground from "./components/Ground";

softShadows();
function App() {
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const floor = new Plane(new Vector3(0, -0.001, 0), 0);

  return (
    <div
      className="container"
      onDoubleClick={() => {
        if (isDragging === true) {
          console.info("first");
          setIsDragging(false);
        }
      }}
    >
      <Canvas
        shadows
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

        <ambientLight intensity={1.5} castShadow color="#ffffff" />
        <directionalLight
          position={[50, 20, 50]}
          castShadow
          intensity={0.7}
          shadow-mapSize-width={4096}
          shadow-mapSize-height={4096}
          shadow-camera-far={500}
          shadow-camera-near={0.5}
          shadow-camera-left={50}
          shadow-camera-right={-50}
          shadow-camera-top={50}
          shadow-camera-bottom={-50}
          color="#0CECDD"
        />
        <Suspense fallback={null}>
          <Character
            floor={floor}
            isDragging={isDragging}
            setDragging={setIsDragging}
          />
          <Ground floor={floor} isDragging={isDragging} />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default App;
