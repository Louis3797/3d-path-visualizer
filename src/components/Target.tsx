import { useGesture } from "@use-gesture/react";
import React, { useEffect, useRef } from "react";
import { animated, useSpring } from "@react-spring/three";
import { useThree } from "react-three-fiber";
import { Mesh, Plane, Vector3 } from "three";
import { Node } from "../utils/Node";
import { getGraphIndexes } from "../utils/getGraphIndexes";
import RedFlag from "./generated/RedFlag";

interface TargetProps {
  floor: Plane;
  graph: Node[][];
  setGraph: React.Dispatch<React.SetStateAction<Node[][]>>;
  setDragging: React.Dispatch<React.SetStateAction<boolean>>;
}

const Target: React.FC<TargetProps> = ({
  floor,
  graph,
  setGraph,
  setDragging,
}) => {
  const ref = useRef<Mesh>(null!);

  let pointer = new Vector3();

  const { raycaster } = useThree();

  const setNewTargetPosition = (vector: Vector3) => {
    const [i, j] = getGraphIndexes(vector);

    const tempGraph = [...graph];

    const newTargetNode: Node = tempGraph[i][j];

    // Todo What if its the start node
    if (!newTargetNode.isStart) {
      newTargetNode.isWall = false;
      newTargetNode.isFinish = true;
    }

    setGraph(tempGraph);

    graph.forEach((na) => {
      na.forEach((n) => {
        if (n.isFinish && n !== newTargetNode) {
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
    graph[i][j].isFinish = true;
  });

  return (
    <animated.mesh {...spring} {...(bind() as any)} ref={ref} dispose={null}>
      <RedFlag />
    </animated.mesh>
  );
};

export default Target;
