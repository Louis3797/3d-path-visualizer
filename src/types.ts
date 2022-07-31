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

export type GlobalState = {
  algorithm: string;
  setAlgorithm: (newAlgorithm: string) => void;
  speed: number;
  setSpeed: (newSpeed: number) => void;
  grid: Node[][];
  setGrid: (newGrid: Node[][]) => void;
  isDragging: boolean;
  setDragging: (drag: boolean) => void;
};
