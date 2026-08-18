import { useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Line } from '@react-three/drei'
import * as THREE from 'three'
import { color, wireOpacity } from '@/styles/tokens'

type Pts = [number, number, number][]

function boxEdges(
  w: number,
  h: number,
  d: number,
  ox = 0,
  oy = 0,
  oz = 0,
): Pts {
  const x0 = ox - w / 2
  const x1 = ox + w / 2
  const y0 = oy
  const y1 = oy + h
  const z0 = oz - d / 2
  const z1 = oz + d / 2
  return [
    [x0, y0, z0],
    [x1, y0, z0],
    [x1, y0, z1],
    [x0, y0, z1],
    [x0, y0, z0],
    [x0, y1, z0],
    [x1, y1, z0],
    [x1, y0, z0],
    [x1, y1, z0],
    [x1, y1, z1],
    [x1, y0, z1],
    [x1, y1, z1],
    [x0, y1, z1],
    [x0, y0, z1],
    [x0, y1, z1],
    [x0, y1, z0],
  ]
}

function Wire({
  points,
  opacity = wireOpacity.mid,
  width = 1,
}: {
  points: Pts
  opacity?: number
  width?: number
}) {
  return (
    <Line
      points={points}
      color={color.wire}
      lineWidth={width}
      transparent
      opacity={opacity}
    />
  )
}

/** Softly rotating living-room wireframe — interior design, not structural cube */
function InteriorRoom({
  pointer,
}: {
  pointer: React.MutableRefObject<{ x: number; y: number }>
}) {
  const group = useRef<THREE.Group>(null)

  const room = useMemo(() => {
    const W = 3.4
    const H = 2.2
    const D = 2.8
    const floor: Pts = [
      [-W / 2, 0, -D / 2],
      [W / 2, 0, -D / 2],
      [W / 2, 0, D / 2],
      [-W / 2, 0, D / 2],
      [-W / 2, 0, -D / 2],
    ]
    const backWall: Pts = [
      [-W / 2, 0, -D / 2],
      [-W / 2, H, -D / 2],
      [W / 2, H, -D / 2],
      [W / 2, 0, -D / 2],
    ]
    const leftWall: Pts = [
      [-W / 2, 0, -D / 2],
      [-W / 2, H, -D / 2],
      [-W / 2, H, D / 2],
      [-W / 2, 0, D / 2],
      [-W / 2, 0, -D / 2],
    ]
    const windowFrame: Pts = [
      [-0.7, 0.7, -D / 2 + 0.01],
      [0.7, 0.7, -D / 2 + 0.01],
      [0.7, 1.6, -D / 2 + 0.01],
      [-0.7, 1.6, -D / 2 + 0.01],
      [-0.7, 0.7, -D / 2 + 0.01],
      [0, 0.7, -D / 2 + 0.01],
      [0, 1.6, -D / 2 + 0.01],
    ]
    const rug: Pts = [
      [-0.95, 0.01, -0.2],
      [0.95, 0.01, -0.2],
      [0.95, 0.01, 0.9],
      [-0.95, 0.01, 0.9],
      [-0.95, 0.01, -0.2],
    ]
    return { floor, backWall, leftWall, windowFrame, rug }
  }, [])

  const sofa = useMemo(() => {
    const base = boxEdges(1.8, 0.42, 0.72, 0, 0, -0.55)
    const back = boxEdges(1.8, 0.5, 0.18, 0, 0.42, -0.82)
    const armL = boxEdges(0.16, 0.38, 0.72, -0.82, 0.42, -0.55)
    const armR = boxEdges(0.16, 0.38, 0.72, 0.82, 0.42, -0.55)
    return { base, back, armL, armR }
  }, [])

  const table = useMemo(() => boxEdges(0.9, 0.32, 0.5, 0.1, 0, 0.45), [])
  const chair = useMemo(() => {
    const seat = boxEdges(0.42, 0.38, 0.42, 1.15, 0, 0.35)
    const back = boxEdges(0.42, 0.48, 0.08, 1.15, 0.38, 0.18)
    return { seat, back }
  }, [])
  const cabinet = useMemo(() => boxEdges(0.55, 1.55, 0.4, -1.25, 0, 0.55), [])
  const pendant = useMemo(() => {
    const cord: Pts = [
      [0.1, 2.15, 0.35],
      [0.1, 1.55, 0.35],
    ]
    const shade: Pts = [
      [-0.18, 1.55, 0.35],
      [0.18, 1.55, 0.35],
      [0.14, 1.35, 0.35],
      [-0.14, 1.35, 0.35],
      [-0.18, 1.55, 0.35],
    ]
    return { cord, shade }
  }, [])

  const floorGrid = useMemo(() => {
    const lines: Pts[] = []
    for (let i = -3; i <= 3; i++) {
      const x = i * 0.45
      lines.push([
        [x, 0, -1.3],
        [x, 0, 1.3],
      ])
      const z = i * 0.4
      lines.push([
        [-1.5, 0, z],
        [1.5, 0, z],
      ])
    }
    return lines
  }, [])

  useFrame((state) => {
    if (!group.current) return
    const t = state.clock.elapsedTime
    const targetY = -0.35 + t * 0.08 + pointer.current.x * 0.28
    const targetX = 0.18 + pointer.current.y * 0.18
    group.current.rotation.y += (targetY - group.current.rotation.y) * 0.035
    group.current.rotation.x += (targetX - group.current.rotation.x) * 0.035
  })

  return (
    <group ref={group} position={[0.55, -0.55, 0]} scale={1.05}>
      {floorGrid.map((pts, i) => (
        <Wire key={i} points={pts} opacity={0.1} width={0.5} />
      ))}
      <Wire points={room.floor} opacity={wireOpacity.mid} width={1.1} />
      <Wire points={room.backWall} opacity={wireOpacity.faint} width={1} />
      <Wire points={room.leftWall} opacity={wireOpacity.faint} width={1} />
      <Wire points={room.windowFrame} opacity={wireOpacity.mid} width={1} />
      <Wire points={room.rug} opacity={0.16} width={0.8} />

      <Wire points={sofa.base} opacity={wireOpacity.strong} width={1.15} />
      <Wire points={sofa.back} opacity={wireOpacity.mid} width={1} />
      <Wire points={sofa.armL} opacity={wireOpacity.mid} width={0.9} />
      <Wire points={sofa.armR} opacity={wireOpacity.mid} width={0.9} />

      <Wire points={table} opacity={wireOpacity.strong} width={1.05} />
      <Wire points={chair.seat} opacity={wireOpacity.mid} width={0.95} />
      <Wire points={chair.back} opacity={wireOpacity.mid} width={0.95} />
      <Wire points={cabinet} opacity={wireOpacity.mid} width={1} />
      <Wire points={pendant.cord} opacity={wireOpacity.faint} width={0.8} />
      <Wire points={pendant.shade} opacity={wireOpacity.mid} width={1} />
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

/** Hero WebGL — interior living-room line drawing */
export function BlueprintScene() {
  const pointer = useRef({ x: 0, y: 0 })

  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [2.8, 2.2, 4.6], fov: 38 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ width: '100%', height: '100%', background: 'transparent' }}
    >
      <PointerBridge pointer={pointer} />
      <InteriorRoom pointer={pointer} />
    </Canvas>
  )
}
