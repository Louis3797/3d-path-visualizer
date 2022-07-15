import React, { useEffect, useRef } from "react";
import { useFrame, useLoader } from "react-three-fiber";
import { AnimationMixer, Mesh, Vector3 } from "three";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";

interface Animations {
  [name: string]: {
    clip: THREE.AnimationAction;
  };
}

const Character: React.FC = () => {
  const ref = useRef<Mesh>(null!);

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
    mixer.update(delta);
  });

  useEffect(() => {
    currentAnimation.play();
  });

  return (
    <primitive ref={ref} position={new Vector3(0, 0, 0)} object={character} />
  );
};

export default Character;
