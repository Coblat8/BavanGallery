'use client'

import { BavanGallery } from '@/components/canvas/BavanGallery'
import { PerspectiveCamera, editable as e } from '@theatre/r3f'
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Yard } from './Yard'
import { BavanLogo } from './BavanLogo'
import * as THREE from 'three'
import { useCurrentSheet } from '@theatre/r3f'
import { Sky } from '@react-three/drei'
import { useIsClient } from '@uidotdev/usehooks'

export default function Experience() {

  const isMobile = window.innerWidth < 768

    const lookAtTarget = new THREE.Vector3(3.58, 5.37, 4.72)

  const cameraLookAtRef = useRef(null)
    const cameraRef = useRef(null)
  const spotLightTargetRef = useRef(new THREE.Object3D({ position: [0.19, 1.8, 4.54] }))
  const spotLightRef = useRef(null)
  const directionalLightRef = useRef(null)
  spotLightTargetRef.current.position.set(0.19, 1.8, 4.55)

  // Only use refs, no state at all
  const showFirstObjectRef = useRef(true)
  const introGroupRef = useRef(null)
  const galleryGroupRef = useRef(null)

  const transitionRef = useRef(null)
  const materialRef = useRef()
  const sheet = useCurrentSheet()
  const obj = sheet.object('transitionEffect', { opacity: 0 })

  // Cache last opacity value to detect changes
  const lastOpacityRef = useRef(0)

  // Handle all updates in useFrame
  useFrame(() => {
    // Setup spotlight target once
    if (spotLightRef.current && spotLightRef.current.target !== spotLightTargetRef.current) {
      spotLightRef.current.target = spotLightTargetRef.current
      spotLightRef.current.target.updateMatrixWorld()
    }

    // Ensure camera lookAt is maintained
    if (cameraRef.current && cameraLookAtRef.current) {
      cameraRef.current.lookAt(cameraLookAtRef.current.position)
    }

    // Get current opacity value from Theatre.js
    const currentOpacity = obj.value.opacity

    // Only update if opacity has changed (performance optimization)
    if (lastOpacityRef.current !== currentOpacity) {
      lastOpacityRef.current = currentOpacity

      // Update transition material
      if (materialRef.current) {
        materialRef.current.opacity = currentOpacity
      }

      //   // Handle one-way transition to gallery using visibility instead of state
      if (currentOpacity >= 0.9 && showFirstObjectRef.current) {
        showFirstObjectRef.current = false

        // Toggle visibility of groups directly
        if (introGroupRef.current) introGroupRef.current.visible = false
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
      <e.directionalLight
        ref={directionalLightRef}
        theatreKey="Direction_light"
        color={new THREE.Color(0xffffff)}
        intensity={1}
        position={[0, 10, 0]}
        visible={showFirstObjectRef.current}
      />

      {/* Spot light with ref */}

      <e.spotLight
        ref={spotLightRef}
        theatreKey="spotLight"
        intensity={50}
        penumbra={2}
        decay={0.5}
        color={new THREE.Color(0xffffff)}
        castShadow
        position={[1.2, 0.5, 0.7]}
        anglePower={20}
        distance={10}
        angle={0.3}
        attenuation={0.4}
        visible={showFirstObjectRef.current}
      />

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

      {/* Both groups are rendered, but we control visibility with refs */}
      <group
        ref={introGroupRef}
        visible={true}
      >
        <BavanLogo />
      </group>

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
