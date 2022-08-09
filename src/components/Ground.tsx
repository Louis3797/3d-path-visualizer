import { useSpring } from "react-spring";
import { ThreeEvent } from "@react-three/fiber";
import React, { useLayoutEffect, useRef } from "react";
import {
  Color,
  DoubleSide,
  InstancedMesh,
  Matrix4,
  Mesh,
  Plane,
  PlaneBufferGeometry,
  Vector3,
} from "three";
import { useGlobalStore } from "../global-stores/useGlobalStore";
import { getGraphIndexes } from "../utils/getGraphIndexes";

import Character from "./Character";
import Obstacle from "./Obstacle";
import Target from "./Target";
import { animated } from "@react-spring/three";

const Ground: React.FC = () => {
  // used for the raycaster
  const floor: Plane = new Plane(new Vector3(0, -0.001, 0), 0);

  const plane = new PlaneBufferGeometry(1, 1, 1, 1);
  plane.rotateX(-Math.PI / 2);

  // size of the grid plane
  const planeSize = 31;

  const { grid, setGrid, isDragging } = useGlobalStore((state) => ({
    grid: state.grid,
    setGrid: state.setGrid,
    isDragging: state.isDragging,
  }));

  // refs
  const mesh = useRef<InstancedMesh>(null!);
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

  const updateColor = (id: number) => {
    api.start({
      to: [
        {
          color: "#72FFFF",
        },
        {
          color: "#00D7FF",
        },
        {
          color: "#0096FF",
        },
        {
          color: "#5800FF",
        },
      ],
      from: {
        color: "#ECECEC",
      },
      onChange: () => {
        mesh.current.setColorAt(id, new Color().setStyle(spring.color.get()));
        mesh.current.instanceColor!.needsUpdate = true;
      },
    });
  };

  useLayoutEffect(() => {
    let i = 0;
    const offset = -0;

    const matrix = new Matrix4();

    const color = new Color(0xececec);

    for (let x = 0; x < planeSize; x++) {
      for (let y = 0; y < planeSize; y++) {
        matrix.setPosition(offset - x, 0, offset - y);

        mesh.current.setMatrixAt(i, matrix);
        mesh.current.setColorAt(i, color);

        i++;
      }

      mesh.current.instanceColor!.needsUpdate = true;
      mesh.current.instanceMatrix.needsUpdate = true;
    }
  }, []);

  const [spring, api] = useSpring(() => ({
    color: "#ECECEC",
    config: { duration: 100 },
  }));

  return (
    <>
      {/* Grid Helper */}
      <gridHelper args={[planeSize, planeSize]} receiveShadow />
      {/* Grid */}
      <animated.instancedMesh
        ref={mesh}
        receiveShadow
        args={[
          null as unknown as PlaneBufferGeometry,
          undefined,
          Math.pow(planeSize, 2),
        ]}
        position={[15, -0.001, 15]}
        onClick={(e: ThreeEvent<MouseEvent>) => {
          e.stopPropagation();
          if (!isDragging) {
            addBuilding(e.point);
          }

          if (e.instanceId) {
            updateColor(e.instanceId);
          }
        }}
        onPointerMove={(e: ThreeEvent<MouseEvent>) => {
          e.stopPropagation();
          ray.current?.position.copy(
            new Vector3(Math.round(e.point.x), 0, Math.round(e.point.z))
              .floor()
              .addScalar(0.0001)
          );
        }}
      >
        <planeBufferGeometry
          args={[1, 1, 1, 1]}
          {...floor}
          attach="geometry"
          {...plane}
        />
        <meshPhongMaterial
          side={DoubleSide}
          color="#ECECEC"
          attach="material"
        />
      </animated.instancedMesh>
      {/* Mouse Pointer Plane */}
      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} ref={ray}>
        <planeGeometry args={[1, 1, 1, 1]} />
        <meshStandardMaterial
          side={DoubleSide}
          color="#F29191"
          attach="material"
        />
      </mesh>
      {/* Obstacles */}
      <instancedMesh count={961}>
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
      </instancedMesh>
      {/* Character */}
      <Character floor={floor} />
      {/* Target */}
      <Target floor={floor} />
    </>
  );
};

export default Ground;
