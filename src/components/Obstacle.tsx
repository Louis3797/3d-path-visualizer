import React, { useMemo, useRef, useState } from "react";
import { useFrame, useLoader, Vector3 } from "react-three-fiber";
import { Mesh } from "three";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
interface ObstaclesProps {
  position: Vector3;
}
const Obstacle: React.FC<ObstaclesProps> = ({ position }) => {
  const [
    obstacle1,
    obstacle2,
    obstacle3,
    obstacle4,
    obstacle5,
    obstacle6,
    obstacle7,
    obstacle8,
    obstacle9,
    obstacle10,
    obstacle11,
    obstacle12,
    obstacle13,
    obstacle14,
    obstacle15,
    obstacle16,
    obstacle17,
    obstacle18,
    obstacle19,
  ] = useLoader(FBXLoader, [
    "./models/1Story_GableRoof_Mat.fbx",
    "./models/1Story_Mat.fbx",
    "./models/1Story_RoundRoof_Mat.fbx",
    "./models/1Story_Sign_Mat.fbx",
    "./models/2Story_2_Mat.fbx",
    "./models/2Story_Balcony_Mat.fbx",
    "./models/2Story_Center_Mat.fbx",
    "./models/2Story_Columns_Mat.fbx",
    "./models/2Story_Double_Mat.fbx",
    "./models/2Story_GableRoof_Mat.fbx",
    "./models/2Story_Mat.fbx",
    "./models/2Story_RoundRoof_Mat.fbx",
    "./models/2Story_Sign_Mat.fbx",
    "./models/2Story_Stairs_Mat.fbx",
    "./models/3Story_Balcony_Mat.fbx",
    "./models/3Story_Small_Mat.fbx",
    "./models/4Story_Center_Mat.fbx",
    "./models/4Story_Mat.fbx",
    "./models/6Story_Stack_Mat.fbx",
  ]);

  obstacle1.scale.setScalar(0.004);
  obstacle1.traverse((o) => {
    o.castShadow = true;
    o.receiveShadow = true;
  });

  obstacle2.scale.setScalar(0.004);
  obstacle2.traverse((o) => {
    o.castShadow = true;
    o.receiveShadow = true;
  });

  obstacle3.scale.setScalar(0.004);
  obstacle3.traverse((o) => {
    o.castShadow = true;
    o.receiveShadow = true;
  });
  obstacle4.scale.setScalar(0.004);
  obstacle4.traverse((o) => {
    o.castShadow = true;
    o.receiveShadow = true;
  });
  obstacle5.scale.setScalar(0.004);
  obstacle5.traverse((o) => {
    o.castShadow = true;
    o.receiveShadow = true;
  });
  obstacle6.scale.setScalar(0.004);
  obstacle6.traverse((o) => {
    o.castShadow = true;
    o.receiveShadow = true;
  });
  obstacle7.scale.setScalar(0.004);
  obstacle7.traverse((o) => {
    o.castShadow = true;
    o.receiveShadow = true;
  });

  obstacle8.scale.setScalar(0.004);
  obstacle8.traverse((o) => {
    o.castShadow = true;
    o.receiveShadow = true;
  });

  obstacle9.scale.setScalar(0.004);
  obstacle9.traverse((o) => {
    o.castShadow = true;
    o.receiveShadow = true;
  });
  obstacle10.scale.setScalar(0.004);
  obstacle10.traverse((o) => {
    o.castShadow = true;
    o.receiveShadow = true;
  });
  obstacle11.scale.setScalar(0.004);
  obstacle11.traverse((o) => {
    o.castShadow = true;
    o.receiveShadow = true;
  });
  obstacle12.scale.setScalar(0.004);
  obstacle12.traverse((o) => {
    o.castShadow = true;
    o.receiveShadow = true;
  });
  obstacle13.scale.setScalar(0.004);
  obstacle13.traverse((o) => {
    o.castShadow = true;
    o.receiveShadow = true;
  });
  obstacle14.scale.setScalar(0.004);
  obstacle14.traverse((o) => {
    o.castShadow = true;
    o.receiveShadow = true;
  });

  obstacle15.scale.setScalar(0.004);
  obstacle15.traverse((o) => {
    o.castShadow = true;
    o.receiveShadow = true;
  });

  obstacle16.scale.setScalar(0.004);
  obstacle16.traverse((o) => {
    o.castShadow = true;
    o.receiveShadow = true;
  });
  obstacle17.scale.setScalar(0.004);
  obstacle17.traverse((o) => {
    o.castShadow = true;
    o.receiveShadow = true;
  });
  obstacle18.scale.setScalar(0.004);
  obstacle18.traverse((o) => {
    o.castShadow = true;
    o.receiveShadow = true;
  });
  obstacle19.scale.setScalar(0.004);
  obstacle19.traverse((o) => {
    o.castShadow = true;
    o.receiveShadow = true;
  });

  const randomNumber = Math.floor(Math.random() * 19) + 1;
  const obstacle = useMemo(
    () =>
      randomNumber === 1
        ? obstacle1.clone()
        : randomNumber === 2
        ? obstacle2.clone()
        : randomNumber === 3
        ? obstacle3.clone()
        : randomNumber === 4
        ? obstacle4.clone()
        : randomNumber === 5
        ? obstacle5.clone()
        : randomNumber === 6
        ? obstacle6.clone()
        : randomNumber === 7
        ? obstacle7.clone()
        : randomNumber === 8
        ? obstacle8.clone()
        : randomNumber === 9
        ? obstacle9.clone()
        : randomNumber === 10
        ? obstacle10.clone()
        : randomNumber === 11
        ? obstacle11.clone()
        : randomNumber === 12
        ? obstacle12.clone()
        : randomNumber === 13
        ? obstacle13.clone()
        : randomNumber === 14
        ? obstacle14.clone()
        : randomNumber === 15
        ? obstacle15.clone()
        : randomNumber === 16
        ? obstacle16.clone()
        : randomNumber === 17
        ? obstacle17.clone()
        : randomNumber === 18
        ? obstacle18.clone()
        : obstacle19.clone(),
    []
  );

  const ref = useRef<Mesh>(null!);
  const [obstaclePosition, setObstaclePosition] = useState<Vector3>(position);

  useFrame((_state, _delta) => {
    if (ref.current.position.y > 0.01) {
      const newPos: Vector3 = ref.current.position;
      newPos.y -= 0.2;
      setObstaclePosition(newPos);
    }
  });

  return <primitive ref={ref} position={obstaclePosition} object={obstacle} />;
};

export default Obstacle;
