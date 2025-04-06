'use client'

import { BavanGallery } from '@/components/canvas/BavanGallery'
import { PerspectiveCamera, editable as e } from '@theatre/r3f'
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Yard } from './Yard'
import * as THREE from 'three'
import { useCurrentSheet } from '@theatre/r3f'
import { Sky } from '@react-three/drei'
import { useIsClient } from '@uidotdev/usehooks'
import { useAnimationStore } from 'lib/store/useAnimationStore'
import IntroScene from './IntroScene'

export default function Experience() {

  const isMobile = window.innerWidth < 768

    const lookAtTarget = new THREE.Vector3(3.58, 5.37, 4.72)

  const cameraLookAtRef = useRef(null)
    const cameraRef = useRef(null)

const setInputGroupVisible = useAnimationStore((state) => state.setInputGroupVisible)
  // Only use refs, no state at all
  const showFirstObjectRef = useRef(true)
  const galleryGroupRef = useRef(null)

  const transitionRef = useRef(null)
  const materialRef = useRef()
  const sheet = useCurrentSheet()
  const obj = sheet.object('transitionEffect', { opacity: 0 })

  // Cache last opacity value to detect changes
  const lastOpacityRef = useRef(0)

  // Handle all updates in useFrame
  useFrame(() => {
    // Optimize camera lookAt for performance
    if (
      cameraRef.current &&
      cameraLookAtRef.current &&
      cameraRef.current.position.manhattanDistanceTo(
        cameraRef.current.userData.lastPos || new THREE.Vector3()
      ) > 0.001
    ) {
      // Only update lookAt when camera position has changed significantly
      cameraRef.current.lookAt(cameraLookAtRef.current.position)
      cameraRef.current.userData.lastPos = cameraRef.current.position.clone()
    }

    // Optimize transition effect updates
    const currentOpacity = obj.value.opacity
    const opacityDiff = Math.abs(lastOpacityRef.current - currentOpacity)

    // Only update if opacity has changed significantly (reduces processing on small changes)
    if (opacityDiff > 0.01) {
      lastOpacityRef.current = currentOpacity

      if (materialRef.current) {
        materialRef.current.opacity = currentOpacity
      }

      if (currentOpacity >= 0.9 && showFirstObjectRef.current) {
        showFirstObjectRef.current = false
        setInputGroupVisible(false)
        if (galleryGroupRef.current) galleryGroupRef.current.visible = true
      }
    }
  })
  const isClient = useIsClient()
  if(!isClient) return null


  return (
    <>
      <PerspectiveCamera
        ref={cameraRef}
        theatreKey="Camera"
        makeDefault
        fov={isMobile ? 80 : 60}
        position={[1, 2.5, 5]}
      />

      <e.mesh
        ref={cameraLookAtRef}
        theatreKey="lookAt"
        visible="editor"
        position={lookAtTarget}
      >
        <boxGeometry args={[0.2, 0.2, 0.2]} />
        <meshBasicMaterial color="hotpink" />
      </e.mesh>

      {/* <color
        args={[0x65c2f5]}
        attach="background"
      /> */}

      <Sky
        distance={450000}
        sunPosition={[0, 1, 0]}
        inclination={0}
        azimuth={0.25}
      />

      {/* Directional light with ref */}

      {/* Transition layer */}
      <e.mesh
        ref={transitionRef}
        theatreKey="transition"
        position={[0, 0, 0]}
        renderOrder={1000}
      >
        <planeGeometry args={[10000, 10000]} />
        <meshBasicMaterial
          ref={materialRef}
          color="white"
          transparent={true}
          opacity={0}
          side={THREE.DoubleSide}
          depthTest={false}
        />
      </e.mesh>

      <IntroScene />

      <group
        ref={galleryGroupRef}
        visible={false}
      >
        <BavanGallery />
        <Yard />
      </group>
    </>
  )
}
