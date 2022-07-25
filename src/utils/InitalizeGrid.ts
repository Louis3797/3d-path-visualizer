import { Node } from "./Node";

export const initializeGrid = (size: number): Node[][] => {
  const tempGraph: Node[][] = [];
  for (let i = 0; i < size; i++) {
    tempGraph.push([]);
    for (let j = 0; j < size; j++) {
      tempGraph[i].push(new Node({ x: i, z: j }));
    }
  }

  return tempGraph;
};
