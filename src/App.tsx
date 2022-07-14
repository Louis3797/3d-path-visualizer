import { OrbitControls, Sky, softShadows } from "@react-three/drei";
import { Suspense, useEffect, useRef } from "react";
import { Canvas } from "react-three-fiber";

import {
  ACESFilmicToneMapping,
  DoubleSide,
  PCFSoftShadowMap,
  PlaneGeometry,
  sRGBEncoding,
} from "three";

softShadows();
function App() {
  let plane = new PlaneGeometry(100, 100, 50, 50);
  const ground = useRef<PlaneGeometry>(plane);

  const updateBufferGeometry = () => {
    if (ground != null) {
      let position = ground.current.getAttribute("position");

      let arr = position.array;

      for (let index = 0; index < arr.length; index++) {
        console.log(arr[index]);
      }

      console.log(arr);

      position.needsUpdate = true;
    }
  };

  useEffect(() => {
    updateBufferGeometry();
  });

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
          <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry {...plane} attach="geometry" ref={ground} />
            <meshStandardMaterial
              side={DoubleSide}
              color="#7ec850"
              attach="material"
            />
          </mesh>
          <gridHelper args={[100, 50, "#000", "#000"]} />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default App;
