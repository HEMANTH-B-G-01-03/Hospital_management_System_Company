import React, { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'

function Helix() {
  const group = useRef()
  const count = 40

  const points = useMemo(() => {
    const arr = []
    for (let i = 0; i < count; i++) {
      const t = (i / count) * Math.PI * 6
      const y = i * 0.14 - (count * 0.14) / 2
      arr.push({
        a: [Math.cos(t) * 1.1, y, Math.sin(t) * 1.1],
        b: [Math.cos(t + Math.PI) * 1.1, y, Math.sin(t + Math.PI) * 1.1],
        rung: i % 3 === 0
      })
    }
    return arr
  }, [])

  useFrame((state) => {
    group.current.rotation.y = state.clock.elapsedTime * 0.25
  })

  return (
    <group ref={group}>
      {points.map((p, i) => (
        <group key={i}>
          <mesh position={p.a}>
            <sphereGeometry args={[0.055, 12, 12]} />
            <meshStandardMaterial color="#22E5C8" emissive="#22E5C8" emissiveIntensity={1.2} />
          </mesh>
          <mesh position={p.b}>
            <sphereGeometry args={[0.055, 12, 12]} />
            <meshStandardMaterial color="#7C6CFF" emissive="#7C6CFF" emissiveIntensity={1.2} />
          </mesh>
          {p.rung && (
            <mesh position={[(p.a[0] + p.b[0]) / 2, p.a[1], (p.a[2] + p.b[2]) / 2]}>
              <boxGeometry args={[Math.hypot(p.a[0] - p.b[0], p.a[2] - p.b[2]), 0.02, 0.02]} />
              <meshBasicMaterial color="#6FFFE9" transparent opacity={0.35} />
            </mesh>
          )}
        </group>
      ))}
    </group>
  )
}

export default function DNAHelix({ className = '' }) {
  return (
    <div className={className}>
      <Canvas camera={{ position: [0, 0, 5.2], fov: 45 }}>
        <ambientLight intensity={0.6} />
        <pointLight position={[3, 2, 4]} intensity={2} color="#22E5C8" />
        <pointLight position={[-3, -2, -4]} intensity={2} color="#7C6CFF" />
        <Helix />
      </Canvas>
    </div>
  )
}
