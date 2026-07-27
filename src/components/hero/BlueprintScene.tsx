import { useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Line } from '@react-three/drei'
import * as THREE from 'three'

function BlueprintFrame({ pointer }: { pointer: React.MutableRefObject<{ x: number; y: number }> }) {
  const group = useRef<THREE.Group>(null)

  const edges = useMemo(() => {
    const s = 1.35
    return [
      [-s, -s, -s],
      [s, -s, -s],
      [s, s, -s],
      [-s, s, -s],
      [-s, -s, -s],
      [-s, -s, s],
      [s, -s, s],
      [s, s, s],
      [-s, s, s],
      [-s, -s, s],
      [-s, s, s],
      [-s, s, -s],
      [s, s, -s],
      [s, s, s],
      [s, -s, s],
      [s, -s, -s],
    ] as [number, number, number][]
  }, [])

  const gridLines = useMemo(() => {
    const lines: [number, number, number][][] = []
    for (let i = -3; i <= 3; i++) {
      lines.push([
        [-3, 0, i],
        [3, 0, i],
      ])
      lines.push([
        [i, 0, -3],
        [i, 0, 3],
      ])
    }
    return lines
  }, [])

  useFrame((state) => {
    if (!group.current) return
    const t = state.clock.elapsedTime
    const targetY = t * 0.12 + pointer.current.x * 0.35
    const targetX = 0.28 + pointer.current.y * 0.25
    group.current.rotation.y += (targetY - group.current.rotation.y) * 0.04
    group.current.rotation.x += (targetX - group.current.rotation.x) * 0.04
  })

  return (
    <group ref={group} position={[0.9, 0.1, 0]}>
      <Line points={edges} color="#7eb6ff" lineWidth={1.2} transparent opacity={0.75} />
      {gridLines.map((pts, i) => (
        <Line
          key={i}
          points={pts as [number, number, number][]}
          color="#2a4a6e"
          lineWidth={0.6}
          transparent
          opacity={0.45}
          position={[0, -1.4, 0]}
        />
      ))}
      <mesh>
        <boxGeometry args={[1.2, 1.2, 1.2]} />
        <meshBasicMaterial color="#c45c26" wireframe transparent opacity={0.55} />
      </mesh>
      <mesh position={[0.55, 0.55, 0.55]}>
        <boxGeometry args={[0.35, 0.35, 0.35]} />
        <meshBasicMaterial color="#d96b32" wireframe transparent opacity={0.8} />
      </mesh>
    </group>
  )
}

function PointerBridge({
  pointer,
}: {
  pointer: React.MutableRefObject<{ x: number; y: number }>
}) {
  const { viewport } = useThree()
  useFrame((state) => {
    pointer.current.x = (state.pointer.x * viewport.width) / 20
    pointer.current.y = (state.pointer.y * viewport.height) / 20
  })
  return null
}

export function BlueprintScene() {
  const pointer = useRef({ x: 0, y: 0 })

  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0.6, 5.2], fov: 42 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ width: '100%', height: '100%', background: 'transparent' }}
    >
      <PointerBridge pointer={pointer} />
      <BlueprintFrame pointer={pointer} />
    </Canvas>
  )
}
