import { Vector3 } from "three";

/**
 * Calculates the indexes in the graph for the given vector
 * @param vector Given vector we want the indexes for
 * @returns Returns indexes as const [i, j]
 */
export const getGraphIndexes = (vector: Vector3) => {
  // We calculate + 15 because some coordinates are in the minus range
  const i = Math.round(vector.x) + 15;
  const j = Math.round(vector.z) + 15;

  return [i, j] as const;
};
