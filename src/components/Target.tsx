import { useGesture } from "@use-gesture/react";
import React, { useEffect, useRef } from "react";
import { animated, useSpring } from "@react-spring/three";
import { useThree } from "react-three-fiber";
import { Mesh, Plane, Vector3 } from "three";
import { Node } from "../utils/Node";
import { getGraphIndexes } from "../utils/getGraphIndexes";
import RedFlag from "./generated/RedFlag";
import { useGlobalStore } from "../global-stores/useGlobalStore";

interface TargetProps {
  floor: Plane;
}

const Target: React.FC<TargetProps> = ({ floor }) => {
  const { grid, setGrid, setDragging } = useGlobalStore((state) => ({
    grid: state.grid,
    setGrid: state.setGrid,
    setDragging: state.setDragging,
  }));
  const ref = useRef<Mesh>(null!);

  let pointer = new Vector3();

  const { raycaster } = useThree();

  const setNewTargetPosition = (vector: Vector3) => {
    const [i, j] = getGraphIndexes(vector);

    const tempGraph = [...grid];

    const newTargetNode: Node = tempGraph[i][j];

    // Todo What if its the start node
    if (!newTargetNode.isStart) {
      newTargetNode.isWall = false;
      newTargetNode.isFinish = true;
    }

    setGrid(tempGraph);

    grid.forEach((na) => {
      na.forEach((n) => {
        if (n.isFinish && n.x !== newTargetNode.x && n.z !== newTargetNode.z) {
          n.isFinish = false;
        }
      });
    });
  };

  const [spring, api] = useSpring(() => ({
    position: [10, 0, 10],
  }));

  const bind = useGesture({
    onDrag: () => {
      const newPos = raycaster.ray.intersectPlane(floor, pointer);
      if (newPos) {
        newPos.addScalar(0.5).floor();
        return api.start({ position: [newPos.x, 0, newPos.z] });
      }
    },
    onDragStart: () => {
      setDragging(true);
    },
    onDragEnd: () => {
      setDragging(false);
      setNewTargetPosition(ref.current.position);
    },
  });

  useEffect(() => {
    const [i, j] = getGraphIndexes(ref.current.position);
    grid[i][j].isFinish = true;
  });

  return (
    <animated.mesh {...spring} {...(bind() as any)} ref={ref} dispose={null}>
      <RedFlag />
    </animated.mesh>
  );
};

export default Target;
