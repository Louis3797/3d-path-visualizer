import { Plane } from "@react-three/drei";
import React, { useRef, useState } from "react";
import {
  DoubleSide,
  Mesh,
  Plane as ThreePlane,
  PlaneBufferGeometry,
  Vector3,
} from "three";
import Obstacle from "./Obstacle";

interface GroundProps {
  floor: ThreePlane;
  isDragging: boolean;
}

const Ground: React.FC<GroundProps> = ({ floor, isDragging }) => {
  const planeSize = 31;
  const ground = useRef<PlaneBufferGeometry>(null);

  const ray = useRef<Mesh>(null!);

  const [boxes, setBoxes] = useState<Vector3[]>([]);

  // add given vector to boxes, if its not already present
  const addBuilding = (vector: Vector3) => {
    for (let i = 0; i < boxes.length; ++i) {
      const v: Vector3 = boxes[i];
      if (v.x === vector.x && v.z === vector.z) {
        // setBoxes([...boxes.slice(0, i), ...boxes.slice(i + 1, boxes.length)]);
        return;
      }
    }

    setBoxes((v) => [...v, vector]);
  };

  return (
    <>
      <gridHelper args={[31, 31]} receiveShadow />
      {/* Ground Plane */}
      <Plane
        args={[planeSize, planeSize, planeSize, planeSize]}
        {...floor}
        position={[0, -0.001, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        receiveShadow
        onClick={(e) => {
          if (!isDragging) {
            const vector = new Vector3(
              Math.round(e.point.x),
              0,
              Math.round(e.point.z)
            ).floor();
            addBuilding(vector);
          }
        }}
        ref={ground}
        name="floor"
        onPointerMove={(e) => {
          ray.current?.position.copy(
            new Vector3(Math.round(e.point.x), 0, Math.round(e.point.z))
              .floor()
              .addScalar(0.0001)
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
        <meshStandardMaterial
          side={DoubleSide}
          color="#f0f0f0"
          attach="material"
        />
      </mesh>
      {/* Obstacles */}
      {boxes.map((o, idx) => {
        return <Obstacle position={new Vector3(o.x, 5, o.z)} key={idx} />;
      })}
    </>
  );
};

export default Ground;
