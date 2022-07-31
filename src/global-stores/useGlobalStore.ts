import create from "zustand";
import { GlobalState } from "../types";
import { Node } from "../utils/Node";

export const useGlobalStore = create<GlobalState>()((set, _get) => ({
  algorithm: "",
  speed: "",
  grid: [],
  isDragging: false,
  setAlgorithm: (newAlgorithm: string) => set({ algorithm: newAlgorithm }),
  setSpeed: (newSpeed: string) => set({ speed: newSpeed }),
  setGrid: (newGrid: Node[][]) => set({ grid: newGrid }),
  setDragging: (drag: boolean) => set({ isDragging: drag }),
}));
