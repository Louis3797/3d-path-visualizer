import { NodeProps } from "../types";

export class Node {
  // Coordinates
  public x: number;
  public z: number;
  public isStart: boolean;
  public isFinish: boolean;
  public isWall: boolean;
  public distance: number;
  public prevNode: Node | null;

  constructor({
    x,
    z,
    isStart = false,
    isFinish = false,
    isWall = false,
    distance = Infinity,
    prevNode = null,
  }: NodeProps) {
    this.x = x;
    this.z = z;
    this.isStart = isStart;
    this.isFinish = isFinish;
    this.isWall = isWall;
    this.distance = distance;
    this.prevNode = prevNode;
  }
}
