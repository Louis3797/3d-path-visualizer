import { Node } from "../Node";

export const dfs = (
  graph: Node[][],
  start: Node,
  end: Node,
  toAnimate: Node[]
) => {
  if (start === end) {
    return;
  }

  const needToVisit: Node[] = [start]; // functions as queue

  while (needToVisit.length) {
    const currentNode = needToVisit.shift();

    // if currentNode is not undefined
    if (currentNode) {
      // if node is wall continue
      if (currentNode.isWall) {
        console.log("wall");
        continue;
      }

      // if end return
      if (currentNode === end) {
        console.log("end");
        return;
      }
      if (!currentNode.visited) {
        // mark as visited
        currentNode.visited = true;

        // add this node to array to be animated

        toAnimate.push(currentNode);

        // iterate over all members
        const neighbours = getNeighbours(currentNode, graph);
        for (const node of neighbours) {
          node.prevNode = currentNode;
          needToVisit.push(node);
        }
      }
    }
  }
};

const getNeighbours = (vertex: Node, graph: Node[][]): Node[] => {
  const neighbors = [];

  const { x: col, z: row } = vertex;

  if (row > 0) neighbors.push(graph[row - 1][col]);

  if (row < graph.length - 1) neighbors.push(graph[row + 1][col]);

  if (col > 0) neighbors.push(graph[row][col - 1]);

  if (col < graph[0].length - 1) neighbors.push(graph[row][col + 1]);

  return neighbors.filter((neighbor) => !neighbor.visited);
};
