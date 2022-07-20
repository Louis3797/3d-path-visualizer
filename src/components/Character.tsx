import React, { useEffect, useRef, useState } from "react";
import { useFrame, useLoader } from "react-three-fiber";
import { AnimationMixer, Mesh, Plane, Vector3 } from "three";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";

import { Animations } from "../types";

interface CharacterProps {
  floor: Plane;
  isDragging: boolean;
  setDragging: React.Dispatch<React.SetStateAction<boolean>>;
}

const Character: React.FC<CharacterProps> = ({
  floor,
  isDragging,
  setDragging,
}) => {
  const ref = useRef<Mesh>(null!);
  const [characterPosition, setCharacterPosition] = useState<Vector3>(
    new Vector3(0, 0, 0)
  );

  let pointer = new Vector3();

  const animations: Animations = {};

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

  useFrame((state, delta) => {
    if (isDragging) {
      const newPos = state.raycaster.ray.intersectPlane(floor, pointer);
      if (newPos) {
        newPos.floor();
        newPos.setY(0);
        ref.current.position.copy(newPos).floor();
        setCharacterPosition(newPos);
      }
    }
    mixer.update(delta);
  });

  useEffect(() => {
    currentAnimation.play();

    return () => {};
  });

  return (
    <mesh
      onClick={() => {
        console.info("on");
        setDragging(true);
      }}
    >
      <primitive ref={ref} position={characterPosition} object={character} />
    </mesh>
  );
};

export default Character;
