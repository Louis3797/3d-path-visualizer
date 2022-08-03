import { Plane } from "@react-three/drei";
import React, { useRef } from "react";
import {
  DoubleSide,
  Mesh,
  Plane as ThreePlane,
  PlaneBufferGeometry,
  Vector3,
} from "three";
import { useGlobalStore } from "../global-stores/useGlobalStore";
import { getGraphIndexes } from "../utils/getGraphIndexes";

import Character from "./Character";
import Obstacle from "./Obstacle";
import Target from "./Target";

const Ground: React.FC = () => {
  const floor: ThreePlane = new ThreePlane(new Vector3(0, -0.001, 0), 0);
  const planeSize = 31;
  const { grid, setGrid, isDragging } = useGlobalStore((state) => ({
    grid: state.grid,
    setGrid: state.setGrid,
    isDragging: state.isDragging,
  }));

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

    const tempGraph = [...grid]; // Copies old graph

    const newNode = tempGraph[i][j];

    if (!newNode.isFinish && !newNode.isStart) {
      newNode.isWall = !newNode.isWall; // Add or remove wall
    }
    setGrid(tempGraph); // We set a new graph every time, because otherwise we don't re-render
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
        ref={ground}
        name="floor"
        onClick={(e) => {
          if (e.intersections[0].object.name === "floor") {
            if (!isDragging) {
              addBuilding(e.point);
            }
          }
        }}
        onPointerMove={(e) => {
          ray.current?.position.copy(
            new Vector3(Math.round(e.point.x), 0, Math.round(e.point.z))
              .floor()
              .addScalar(0.0001)
          );
        }}
      >
        <meshStandardMaterial
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
        {grid.map((obstacles) => {
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
      <Character floor={floor} />
      {/* Target */}
      <Target floor={floor} />
    </>
  );
};

export default Ground;
