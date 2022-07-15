import { Plane } from "@react-three/drei";
import React, { useRef, useState } from "react";
import { DoubleSide, Mesh, PlaneBufferGeometry, Vector3 } from "three";
import Obstacle from "./Obstacle";

const Ground: React.FC = () => {
  const planeSize = 30;
  const ground = useRef<PlaneBufferGeometry>(null);

  const ray = useRef<Mesh>(null!);

  const [boxes, setBoxes] = useState<Vector3[]>([]);

  // add given vector to boxes, if its not already present
  const addbox = (vector: Vector3) => {
    for (let i = 0; i < boxes.length; i++) {
      const v: Vector3 = boxes[i];
      if (v.x === vector.x && v.z === vector.z) {
        // Todo delete obstacles
        return;
      }
    }

    setBoxes((v) => [...v, vector]);
  };

  return (
    <>
      {/* Ground Plane */}
      <Plane
        args={[planeSize, planeSize, planeSize, planeSize]}
        position={[0, 0, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        onClick={(e) => {
          const vector = new Vector3(e.point.x, 0, e.point.z).floor();
          addbox(vector);
        }}
        ref={ground}
        name="floor"
        onPointerMove={(e) => {
          ray.current.position.copy(
            new Vector3(e.point.x, 0, e.point.z).floor().addScalar(0.0001)
          );
        }}
      >
        <meshBasicMaterial
          side={DoubleSide}
          color="#A2B5BB"
          attach="material"
        />
      </Plane>
      {/* Mouse Pointer Plane */}
      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} ref={ray}>
        <planeGeometry args={[1, 1, 1, 1]} />
        <meshBasicMaterial
          side={DoubleSide}
          color="#f0f0f0"
          attach="material"
        />
      </mesh>
      {/* Obstacles */}
      {boxes.map((o) => {
        return <Obstacle position={new Vector3(o.x, 5, o.z)} />;
      })}
    </>
  );
};

export default Ground;
