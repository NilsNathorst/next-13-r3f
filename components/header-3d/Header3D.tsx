"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { useSprings, a } from "@react-spring/three";

import React, { useEffect } from "react";
import { usePathname } from "next/navigation";
import { getPositions, Pages } from "@utils/*";
import { Mesh } from "three";
type Header3DProps = any;

export const Header3D = (props: Header3DProps) => {
  return (
    <Canvas flat shadows camera={{ position: [0, 0, 100], fov: 100 }}>
      <pointLight intensity={0.5} />
      <ambientLight intensity={1.85} />
      <spotLight
        castShadow
        intensity={0.2}
        angle={Math.PI / 7}
        position={[150, 150, 250]}
        penumbra={1}
        shadow-mapSize={2048}
      />
      <Boxes />
    </Canvas>
  );
};

function Boxes() {
  const pathname = usePathname();
  console.log({ pathname });
  const length = 17;

  const blocks = [
    { args: [5, 5, 5] },
    { args: [5, 5, 5] },
    { args: [5, 5, 5] },
    { args: [5, 5, 5] },
    { args: [5, 5, 5] },
    { args: [5, 5, 5] },
    { args: [5, 5, 5] },
    { args: [5, 5, 5] },
    { args: [5, 5, 5] },
    { args: [5, 5, 5] },
    { args: [5, 5, 5] },
    { args: [5, 5, 5] },
    { args: [5, 5, 5] },
    { args: [5, 5, 5] },
    { args: [5, 5, 5] },
    { args: [5, 5, 5] },
    { args: [5, 5, 5] },
  ];

  const initialPositions = getPositions(pathname as Pages);

  const [springs, set] = useSprings(length, (i) => ({
    from: initialPositions[i],
    ...initialPositions[i],
    config: { mass: 20, tension: 150, friction: 50 },
  }));

  useEffect(() => {
    const newPositions = getPositions(pathname as Pages);
    console.log({ newPositions });
    set((i) => ({ ...newPositions[i], delay: i * 40 }));
  }, [pathname]);

  return (
    <>
      {blocks.map((d, index) => (
        <Box springs={springs} index={index} key={index} />
      ))}
    </>
  );
}

function Box({ index, springs }: { index: number; springs: any }) {
  function useTurntable() {
    const ref = React.useRef<any>(null!);
    useFrame((state) => {
      ref.current.position.y =
        Math.sin(state.clock.getElapsedTime() + index) * 2;
    });

    return ref;
  }

  const ref = useTurntable();

  return (
    <group ref={ref}>
      <a.mesh key={index} {...springs[index]} castShadow receiveShadow>
        <boxBufferGeometry args={[5, 5, 5]} />
        {/* @ts-ignore */}
        <a.meshStandardMaterial
          color={springs[index].color}
          roughness={0.75}
          metalness={0.5}
        />
      </a.mesh>
    </group>
  );
}
