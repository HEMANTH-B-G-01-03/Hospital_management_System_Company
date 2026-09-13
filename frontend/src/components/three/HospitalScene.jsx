import React, { Suspense, useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Environment, ContactShadows, Sparkles } from '@react-three/drei'
import * as THREE from 'three'

function Building() {
  const group = useRef()
  useFrame((state) => {
    group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.15) * 0.25 + 0.4
  })

  const windowGrid = useMemo(() => {
    const items = []
    for (let f = 0; f < 6; f++) {
      for (let w = 0; w < 5; w++) {
        items.push({ x: -0.9 + w * 0.45, y: -1.3 + f * 0.42, lit: Math.random() > 0.35 })
      }
    }
    return items
  }, [])

  return (
    <group ref={group} position={[0, -0.3, 0]}>
      {/* Main tower */}
      <mesh position={[0, 0.2, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.2, 3.4, 1.6]} />
        <meshStandardMaterial color="#101a2c" metalness={0.4} roughness={0.35} />
      </mesh>

      {/* Windows */}
      {windowGrid.map((w, i) => (
        <mesh key={i} position={[w.x, w.y + 0.2, 0.81]}>
          <planeGeometry args={[0.22, 0.22]} />
          <meshStandardMaterial
            color={w.lit ? '#6FFFE9' : '#0a1420'}
            emissive={w.lit ? '#22E5C8' : '#000000'}
            emissiveIntensity={w.lit ? 1.6 : 0}
          />
        </mesh>
      ))}

      {/* Side wing */}
      <mesh position={[1.7, -0.5, -0.2]} castShadow receiveShadow>
        <boxGeometry args={[1.3, 1.8, 1.3]} />
        <meshStandardMaterial color="#0c1522" metalness={0.3} roughness={0.4} />
      </mesh>

      {/* Cross emblem */}
      <group position={[0, 1.65, 0.82]}>
        <mesh>
          <boxGeometry args={[0.5, 0.14, 0.05]} />
          <meshStandardMaterial color="#7C6CFF" emissive="#7C6CFF" emissiveIntensity={1.4} />
        </mesh>
        <mesh>
          <boxGeometry args={[0.14, 0.5, 0.05]} />
          <meshStandardMaterial color="#7C6CFF" emissive="#7C6CFF" emissiveIntensity={1.4} />
        </mesh>
      </group>

      {/* Helipad ring on roof */}
      <mesh position={[0, 1.92, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.4, 0.46, 32]} />
        <meshBasicMaterial color="#22E5C8" />
      </mesh>

      {/* Ground plate */}
      <mesh position={[0, -2.05, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <circleGeometry args={[3.4, 48]} />
        <meshStandardMaterial color="#060B14" />
      </mesh>

      {/* Ground ring pulse */}
      <mesh position={[0, -2.03, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.7, 1.74, 64]} />
        <meshBasicMaterial color="#22E5C8" transparent opacity={0.5} />
      </mesh>
    </group>
  )
}

function OrbitingIcon({ radius, speed, offset, color, shape = 'sphere' }) {
  const ref = useRef()
  useFrame((state) => {
    const t = state.clock.elapsedTime * speed + offset
    ref.current.position.set(Math.cos(t) * radius, Math.sin(t * 0.6) * 0.6 + 0.6, Math.sin(t) * radius)
  })
  return (
    <mesh ref={ref}>
      {shape === 'sphere' ? <icosahedronGeometry args={[0.14, 0]} /> : <octahedronGeometry args={[0.16, 0]} />}
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.9} />
    </mesh>
  )
}

export default function HospitalScene() {
  return (
    <div className="relative h-[420px] w-full sm:h-[520px]">
      <Canvas shadows camera={{ position: [4.5, 1.6, 5], fov: 42 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.4} />
          <directionalLight position={[4, 6, 3]} intensity={1.4} castShadow color="#cfe9ff" />
          <pointLight position={[-3, 1, -2]} intensity={4} color="#7C6CFF" />
          <pointLight position={[2, -1, 3]} intensity={3} color="#22E5C8" />

          <Float speed={1.4} rotationIntensity={0.15} floatIntensity={0.5}>
            <Building />
          </Float>

          <OrbitingIcon radius={2.6} speed={0.35} offset={0} color="#22E5C8" shape="sphere" />
          <OrbitingIcon radius={2.9} speed={0.28} offset={2} color="#7C6CFF" shape="octa" />
          <OrbitingIcon radius={2.3} speed={0.42} offset={4} color="#FF6B8B" shape="sphere" />

          <Sparkles count={60} scale={[8, 4, 8]} size={2} speed={0.3} color="#6FFFE9" opacity={0.5} />

          <ContactShadows position={[0, -2.05, 0]} opacity={0.5} scale={10} blur={2.4} far={4} color="#000000" />
          <Environment preset="city" />
        </Suspense>
      </Canvas>
    </div>
  )
}
