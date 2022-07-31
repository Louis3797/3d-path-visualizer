import { Button, SelectChangeEvent } from "@mui/material";
import React, { useState } from "react";
import DropDownButton from "./DropDownButton";

const Navbar: React.FC = () => {
  const config: Record<
    "algorithms" | "speed",
    { name: string | number; value: string | number }[]
  > = {
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
  const [currentAlgorithm, setCurrentAlgorithm] = useState("");
  const [currentSpeed, setCurrentSpeed] = useState("");

  const handleAlgorithmChange = (event: SelectChangeEvent) => {
    setCurrentAlgorithm(event.target.value);
  };
  const handleSpeedChange = (event: SelectChangeEvent) => {
    setCurrentSpeed(event.target.value);
  };

  return (
    <div className="absolute flex flex-row top-0 bg-transparent w-screen h-10 items-center space-x-4 py-3 px-4">
      <p className="text-xl select-none font-medium">3D Path Visualizer</p>
      <DropDownButton
        value={currentAlgorithm}
        label="Algorithms"
        onChange={handleAlgorithmChange}
        data={config.algorithms}
      />
      <DropDownButton
        value={currentSpeed}
        label="Speed"
        onChange={handleSpeedChange}
        data={config.speed}
      />
      <Button
        variant="contained"
        size="small"
        disabled={currentAlgorithm.length === 0}
      >
        Visualize {currentAlgorithm}!
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
