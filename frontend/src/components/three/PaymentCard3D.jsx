import React, { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { RoundedBox, Text } from '@react-three/drei'

function Card({ hovered }) {
  const ref = useRef()
  useFrame((state) => {
    const target = hovered ? 0.55 : 0.15
    ref.current.rotation.y += (target - ref.current.rotation.y) * 0.06
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.6) * 0.04
  })
  return (
    <group ref={ref}>
      <RoundedBox args={[3.2, 2, 0.08]} radius={0.12} smoothness={4} castShadow>
        <meshStandardMaterial color="#101a2c" metalness={0.7} roughness={0.25} />
      </RoundedBox>
      <mesh position={[0, 0, 0.045]}>
        <planeGeometry args={[3.0, 1.8]} />
        <meshStandardMaterial color="#0d1526" metalness={0.5} roughness={0.3} />
      </mesh>
      <mesh position={[-1.15, 0.45, 0.05]}>
        <boxGeometry args={[0.5, 0.38, 0.03]} />
        <meshStandardMaterial color="#FFB84D" metalness={0.8} roughness={0.3} />
      </mesh>
      <Text position={[-1.35, -0.15, 0.05]} fontSize={0.22} color="#E8F0F5" anchorX="left">
        4291  8830  1147  20{new Date().getFullYear().toString().slice(-2)}
      </Text>
      <Text position={[-1.35, -0.65, 0.05]} fontSize={0.14} color="#8FA1B3" anchorX="left">
        NEXUSCARE MEMBER
      </Text>
      <Text position={[1.0, -0.65, 0.05]} fontSize={0.14} color="#22E5C8" anchorX="left">
        VALID THRU 12/29
      </Text>
      <mesh position={[1.25, 0.45, 0.06]}>
        <circleGeometry args={[0.22, 32]} />
        <meshStandardMaterial color="#7C6CFF" emissive="#7C6CFF" emissiveIntensity={0.6} transparent opacity={0.85} />
      </mesh>
      <mesh position={[1.05, 0.45, 0.06]}>
        <circleGeometry args={[0.22, 32]} />
        <meshStandardMaterial color="#22E5C8" emissive="#22E5C8" emissiveIntensity={0.6} transparent opacity={0.7} />
      </mesh>
    </group>
  )
}

export default function PaymentCard3D({ hovered = false }) {
  return (
    <div className="h-64 w-full">
      <Canvas camera={{ position: [0, 0, 5], fov: 38 }} shadows>
        <ambientLight intensity={0.6} />
        <directionalLight position={[3, 4, 4]} intensity={1.3} castShadow />
        <pointLight position={[-3, -2, 2]} intensity={2.5} color="#7C6CFF" />
        <pointLight position={[3, 2, -2]} intensity={2} color="#22E5C8" />
        <Card hovered={hovered} />
      </Canvas>
    </div>
  )
}
