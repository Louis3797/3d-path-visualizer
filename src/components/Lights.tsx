import React from "react";

const Lights: React.FC = () => {
  return (
    <group>
      <hemisphereLight args={["#E4D8DC", "darkslategrey", 0.3]} />
      <directionalLight
        castShadow
        position={[7, 15, 10]}
        intensity={2.5}
        color="#FFE3E3"
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={50}
        shadow-camera-near={0.5}
        shadow-camera-left={-30}
        shadow-camera-right={30}
        shadow-camera-top={30}
        shadow-camera-bottom={-30}
        shadow-bias={-0.0002}
      />
    </group>
  );
};

export default Lights;
