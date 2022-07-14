import { Plane } from "@react-three/drei";
import React, { useRef, useState } from "react";
import { DoubleSide, Mesh, PlaneBufferGeometry, Vector3 } from "three";

const Ground: React.FC = () => {
  const ground = useRef<PlaneBufferGeometry>(null);

  const ray = useRef<Mesh>(null!);

  const [boxes, setBoxes] = useState<Vector3[]>([]);

  // add given vector to boxes, if its not already present
  const addbox = (vector: Vector3) => {
    for (let i = 0; i < boxes.length; i++) {
      const v: Vector3 = boxes[i];
      if (v.x === vector.x && v.z === vector.z) {
        return;
      }
    }

    setBoxes((v) => [...v, vector]);
  };

  return (
    <>
      {/* Ground Plane */}
      <Plane
        args={[100, 100, 100, 100]}
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
            new Vector3(e.point.x, 0, e.point.z).floor()
          );
        }}
      >
        <meshBasicMaterial
          side={DoubleSide}
          color="#00dd00"
          attach="material"
        />
      </Plane>
      {/* Mouse Pointer Plane */}
      <mesh position={[0, 0.5, 0]} rotation={[-Math.PI / 2, 0, 0]} ref={ray}>
        <planeGeometry args={[1, 1, 1, 1]} />
        <meshBasicMaterial
          side={DoubleSide}
          color="#ff0000ee"
          attach="material"
        />
      </mesh>
      {/* Obstacles */}
      {boxes.map((o) => {
        return (
          <mesh position={[o.x, 5, o.z]}>
            <boxGeometry args={[1, 10, 1]} />
            <meshBasicMaterial attach="material" color="#354411" />
          </mesh>
        );
      })}
    </>
  );
};

export default Ground;
