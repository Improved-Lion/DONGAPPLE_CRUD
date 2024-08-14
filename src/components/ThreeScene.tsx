import React, { useRef } from 'react'
import { Canvas, useThree, useFrame } from '@react-three/fiber'
import { useDrag } from '@use-gesture/react'
import * as THREE from 'three'
import { Text } from '@react-three/drei'

// 랜덤 위치를 생성하는 함수
const randomSphereSurfacePosition = (radius: number) => {
  const u = Math.random()
  const v = Math.random()
  const theta = 2 * Math.PI * u
  const phi = Math.acos(2 * v - 1)
  const x = radius * Math.sin(phi) * Math.cos(theta)
  const y = radius * Math.sin(phi) * Math.sin(theta)
  const z = radius * Math.cos(phi)
  return [x, y, z]
}

// 텍스트가 카메라를 바라보도록 설정하는 컴포넌트
const TextWithCameraOrientation = ({
  position,
  text,
}: {
  position: [number, number, number]
  text: string
}) => {
  const textRef = useRef<THREE.Mesh>(null)
  const { camera } = useThree()

  // 매 프레임마다 텍스트가 카메라를 바라보도록 설정
  useFrame(() => {
    if (textRef.current) {
      textRef.current.lookAt(camera.position)
    }
  })

  return (
    <Text
      ref={textRef}
      position={position}
      fontSize={0.15}
      color="white"
      anchorX="center"
      anchorY="middle"
    >
      {text}
    </Text>
  )
}

// 구체 컴포넌트
const Sphere = () => {
  const meshRef = useRef<THREE.Mesh>(null)

  // 드래그 이벤트 핸들러
  const bind = useDrag((state) => {
    if (meshRef.current) {
      const {
        movement: [x, y],
      } = state
      const rotationSpeed = 0.00008 // 드래그 속도 조절
      meshRef.current.rotation.y += x * rotationSpeed
      meshRef.current.rotation.x -= y * rotationSpeed
    }
  })

  const countries = [
    '대한민국',
    '일본',
    '중국',
    '미국',
    '캐나다',
    '호주',
    '영국',
    '프랑스',
    '독일',
    '이탈리아',
    '스페인',
    '브라질',
    '멕시코',
    '인도',
    '러시아',
  ]

  return (
    <mesh ref={meshRef} {...bind()}>
      <sphereGeometry args={[2, 32, 32]} />
      <meshStandardMaterial
        color="white"
        transparent={true}
        opacity={0}
        side={THREE.DoubleSide}
        depthWrite={false}
        depthTest={false}
      />
      {countries.map((country, index) => (
        <TextWithCameraOrientation
          key={index}
          position={randomSphereSurfacePosition(2)}
          text={country}
        />
      ))}
    </mesh>
  )
}

// 메인 씬 컴포넌트
const ThreeScene = () => {
  return (
    <div style={{ height: '100vh', backgroundColor: 'black' }}>
      <Canvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Sphere />
      </Canvas>
    </div>
  )
}

export default ThreeScene
