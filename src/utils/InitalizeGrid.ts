import { Node } from "./Node";

export const initializeGrid = (size: number): Node[][] => {
  const tempGraph: Node[][] = [];

  // Amount of vertices in grid
  // Amount - 1, because we start count by 0
  let verticeAmount = Math.pow(size, 2) - 1;

  for (let i = 0; i < size; i++) {
    tempGraph.push([]);
    for (let j = 0; j < size; j++) {
      tempGraph[i].push(new Node({ x: i, z: j, instanceId: verticeAmount-- }));
    }
  }

  return tempGraph;
};
