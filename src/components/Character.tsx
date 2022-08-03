import { useGesture } from "@use-gesture/react";
import React, { useEffect, useRef } from "react";
import { animated, useSpring } from "@react-spring/three";
import { useFrame, useLoader, useThree } from "react-three-fiber";
import { AnimationMixer, Mesh, Plane, Vector3 } from "three";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";

import { Animations } from "../types";
import { Node } from "../utils/Node";
import { getGraphIndexes } from "../utils/getGraphIndexes";
import { useGlobalStore } from "../global-stores/useGlobalStore";

interface CharacterProps {
  floor: Plane;
}

const Character: React.FC<CharacterProps> = ({ floor }) => {
  const { grid, setGrid, setDragging } = useGlobalStore((state) => ({
    grid: state.grid,
    setGrid: state.setGrid,
    setDragging: state.setDragging,
  }));
  const ref = useRef<Mesh>(null!);

  let pointer = new Vector3();

  const animations: Animations = {};

  const { raycaster } = useThree();

  const [character, idle_animation, walk_animation] = useLoader(FBXLoader, [
    "./models/character/character.fbx",
    "./models/character/idle.fbx",
    "./models/character/walking.fbx",
  ]);

  character.scale.setScalar(0.005);
  character.traverse((c) => {
    c.receiveShadow = true;
    c.castShadow = true;
  });

  const mixer = new AnimationMixer(character);

  animations["idle"] = {
    clip: mixer.clipAction(idle_animation.animations[0]),
  };

  animations["walking"] = {
    clip: mixer.clipAction(walk_animation.animations[0]),
  };

  let currentAnimation = animations["idle"].clip;

  const setNewStartPosition = (vector: Vector3) => {
    const [i, j] = getGraphIndexes(vector);

    const tempGraph = [...grid];

    const newStartNode: Node = tempGraph[i][j];

    // Todo What if its the finish node
    if (!newStartNode.isFinish) {
      newStartNode.isWall = false;
      newStartNode.isStart = true;
    }

    tempGraph.forEach((na) => {
      na.forEach((n) => {
        if (n.isStart && n.x !== newStartNode.x && n.z !== newStartNode.z) {
          n.isStart = false;
        }
      });
    });

    setGrid(tempGraph);
  };

  useFrame((_, delta) => {
    mixer.update(delta);
  });

  const [spring, api] = useSpring(() => ({
    position: [-10, 0, -10],
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
      setNewStartPosition(ref.current.position);
    },
  });

  useEffect(() => {
    const [i, j] = getGraphIndexes(ref.current.position);
    grid[i][j].isStart = true;
    currentAnimation.play();
  });

  return (
    <animated.mesh {...spring} {...(bind() as any)} ref={ref}>
      <primitive name="start" object={character} />
    </animated.mesh>
  );
};

export default Character;
