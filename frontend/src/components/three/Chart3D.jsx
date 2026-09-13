import React, { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'

function Bar({ position, targetHeight, color, delay }) {
  const ref = useRef()
  useFrame((state) => {
    const t = Math.max(0, state.clock.elapsedTime - delay)
    const eased = 1 - Math.pow(1 - Math.min(t / 1.2, 1), 3)
    const h = targetHeight * eased
    if (ref.current) {
      ref.current.scale.y = Math.max(h, 0.001)
      ref.current.position.y = (h * 1.4) / 2
    }
  })
  return (
    <mesh ref={ref} position={position} castShadow>
      <boxGeometry args={[0.42, 1.4, 0.42]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.35} metalness={0.2} roughness={0.4} />
    </mesh>
  )
}

export default function Chart3D({ data = [], color = '#22E5C8' }) {
  const max = Math.max(...data.map((d) => d.value), 1)
  const spacing = 0.62
  const startX = -((data.length - 1) * spacing) / 2

  return (
    <div className="h-56 w-full">
      <Canvas camera={{ position: [3.2, 2.4, 3.6], fov: 40 }} shadows>
        <ambientLight intensity={0.55} />
        <directionalLight position={[3, 5, 2]} intensity={1.2} castShadow />
        <pointLight position={[-2, 1, -2]} intensity={2} color="#7C6CFF" />
        <group position={[0, -0.7, 0]}>
          {data.map((d, i) => (
            <Bar
              key={d.label ?? i}
              position={[startX + i * spacing, 0, 0]}
              targetHeight={(d.value / max) * 1.6}
              color={color}
              delay={i * 0.08}
            />
          ))}
          <mesh position={[0, -0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[data.length * spacing + 1, 2]} />
            <meshStandardMaterial color="#0B1220" />
          </mesh>
        </group>
      </Canvas>
    </div>
  )
}
