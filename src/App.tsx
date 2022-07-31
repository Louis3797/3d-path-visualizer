import {
  createTheme,
  StyledEngineProvider,
  ThemeProvider,
} from "@mui/material";
import { OrbitControls, Sky, softShadows } from "@react-three/drei";
import { Suspense, useState } from "react";
import { Canvas } from "react-three-fiber";

import {
  ACESFilmicToneMapping,
  BasicShadowMap,
  PCFSoftShadowMap,
  sRGBEncoding,
} from "three";
import Ground from "./components/Ground";
import Navbar from "./components/ui/Navbar";

softShadows();
function App() {
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const theme = createTheme({
    palette: {
      mode: "light",
    },
  });

  return (
    <>
      <ThemeProvider theme={theme}>
        <StyledEngineProvider injectFirst>
          <div
            className="w-screen h-screen"
            onDoubleClick={() => {
              if (isDragging === true) {
                setIsDragging(false);
              }
            }}
          >
            <Canvas
              shadows={{ type: BasicShadowMap }}
              camera={{ fov: 75, near: 0.5, far: 500, position: [5, 2, 5] }}
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
              <ambientLight intensity={0.6} castShadow color="#ffffff" />
              <directionalLight
                position={[15, 20, 15]}
                castShadow
                intensity={1.5}
                shadow-mapSize-width={1024}
                shadow-mapSize-height={1024}
                shadow-camera-far={50}
                shadow-camera-near={0.5}
                shadow-camera-left={-30}
                shadow-camera-right={30}
                shadow-camera-top={30}
                shadow-camera-bottom={-30}
                shadow-bias={-0.001}
                color="#ffffff"
              />
              <Suspense fallback={null}>
                <Ground isDragging={isDragging} setDragging={setIsDragging} />
              </Suspense>
            </Canvas>
            <Navbar />
          </div>
        </StyledEngineProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
