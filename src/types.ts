import { Node } from "./utils/Node";

export type Animations = {
  [name: string]: {
    clip: THREE.AnimationAction;
  };
};

export type NodeProps = {
  x: number;
  z: number;
  isStart?: boolean;
  isFinish?: boolean;
  isWall?: boolean;
  distance?: number;
  prevNode?: Node | null;
};
