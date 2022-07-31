import { Button, SelectChangeEvent } from "@mui/material";
import React from "react";
import { useGlobalStore } from "../../global-stores/useGlobalStore";
import DropDownButton from "./DropDownButton";

const Navbar: React.FC = () => {
  const { algorithm, speed, setAlgorithm, setSpeed } = useGlobalStore(
    (state) => ({
      algorithm: state.algorithm,
      speed: state.speed,
      setAlgorithm: state.setAlgorithm,
      setSpeed: state.setSpeed,
    })
  );
  const config: {
    algorithms: {
      name: string;
      value: string;
    }[];
    speed: {
      name: string;
      value: number;
    }[];
  } = {
    algorithms: [
      {
        name: "Breath First Search",
        value: "BFS",
      },
      {
        name: "Depth First Search",
        value: "DFS",
      },
      {
        name: "Dijkstra",
        value: "Dijkstra",
      },
      {
        name: "A*",
        value: "A-Star",
      },
    ],
    speed: [
      {
        name: "Slow",
        value: 1,
      },
      {
        name: "Normal",
        value: 5,
      },
      {
        name: "Fast",
        value: 10,
      },
    ],
  };

  const handleAlgorithmChange = (event: SelectChangeEvent) => {
    setAlgorithm(event.target.value);
  };
  const handleSpeedChange = (event: SelectChangeEvent) => {
    setSpeed(event.target.value);
  };

  return (
    <div className="absolute flex flex-row top-0 bg-transparent w-screen h-10 items-center space-x-4 py-3 px-4">
      <p className="text-xl select-none font-medium">3D Path Visualizer</p>
      <DropDownButton
        value={algorithm}
        label="Algorithms"
        onChange={handleAlgorithmChange}
        data={config.algorithms}
      />
      <DropDownButton
        value={speed}
        label="Speed"
        onChange={handleSpeedChange}
        data={config.speed}
      />
      <Button
        variant="contained"
        size="small"
        disabled={algorithm.length === 0}
      >
        Visualize {algorithm}!
      </Button>
      <Button variant="contained" size="small" disabled={false}>
        Clear Board
      </Button>
      <Button variant="contained" size="small" disabled={false}>
        Clear Walls
      </Button>
      <Button variant="contained" size="small" disabled={false}>
        Clear Path
      </Button>
    </div>
  );
};

export default Navbar;
