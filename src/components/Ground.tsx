import { Plane } from "@react-three/drei";
import React, { useRef, useState } from "react";
import {
  DoubleSide,
  Mesh,
  Plane as ThreePlane,
  PlaneBufferGeometry,
  Vector3,
} from "three";
import { getGraphIndexes } from "../utils/getGraphIndexes";
import { initializeGrid } from "../utils/InitalizeGrid";

import { Node } from "../utils/Node";
import Character from "./Character";
import Obstacle from "./Obstacle";

interface GroundProps {
  isDragging: boolean;
  setDragging: React.Dispatch<React.SetStateAction<boolean>>;
}

const Ground: React.FC<GroundProps> = ({ isDragging, setDragging }) => {
  const floor: ThreePlane = new ThreePlane(new Vector3(0, -0.001, 0), 0);
  // const { mouse, camera, scene } = useThree();

  const planeSize = 31;

  const [graph, setGraph] = useState<Node[][]>(initializeGrid(planeSize));

  const ground = useRef<PlaneBufferGeometry>(null!);
  const ray = useRef<Mesh>(null!);

  /**
   * Checks if an obstacle can be added at the given position.
   * If there is already an obstacle at the position,
   * it will be removed.
   *
   * @param vector Specified position
   */
  const addBuilding = (vector: Vector3) => {
    const [i, j] = getGraphIndexes(vector);

    const tempGraph = [...graph]; // Copies old graph

    const newNode = tempGraph[i][j];

    if (!newNode.isFinish && !newNode.isStart) {
      newNode.isWall = !newNode.isWall; // Add or remove wall
    }
    setGraph(tempGraph); // We set a new graph every time, because otherwise we don't re-render
  };

  return (
    <>
      {/* Grid Helper */}
      <gridHelper args={[planeSize, planeSize]} receiveShadow />
      {/* Ground Plane */}
      <Plane
        args={[planeSize, planeSize, planeSize, planeSize]}
        {...floor}
        position={[0, -0.001, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        receiveShadow
        onClick={(e) => {
          if (e.intersections[0].object.name === "floor") {
            if (!isDragging) {
              addBuilding(e.point);
            }
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
      <group>
        {graph.map((obstacles) => {
          return obstacles.map((obstacle, idx) => {
            if (obstacle.isWall) {
              return (
                <Obstacle
                  position={new Vector3(obstacle.x - 15, 5, obstacle.z - 15)}
                  key={idx}
                />
              );
            }
            return null;
          });
        })}
      </group>
      {/* Character */}
      <Character
        floor={floor}
        graph={graph}
        setGraph={setGraph}
        setDragging={setDragging}
      />
    </>
  );
};

export default Ground;
