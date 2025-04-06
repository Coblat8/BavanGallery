'use client'

import { Canvas } from '@react-three/fiber'
import { Suspense, useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { ScrollTicker } from '@/templates/Scroll'
import { Preload, Stats } from '@react-three/drei'
import { getProject } from '@theatre/core'
import { RefreshSnapshot, SheetProvider } from '@theatre/r3f'
import extension from '@theatre/r3f/dist/extension'
import studio from '@theatre/studio'
import { useAnimationStore } from 'lib/store/useAnimationStore'
import projectState from '../../../public/Bavan Gallery Project.theatre-project-state-2.json'
import Experience from './Experience'
import LoadingScreen from './LoadingScreen'

const isProd = false

if (!isProd) {
  studio.initialize()
  studio.extend(extension)
  studio.ui.hide()
}
export const project = getProject(
  'Bavan Gallery Project',
  isProd
    ? {
        state: projectState,
      }
    : undefined
)
export const bavanGallerySheet = project.sheet('Bavan Gallery Sheet')

// const audio = new Audio('./audio/0406.mp3')

export default function Scene({ ...props }) {
  const audioRef = useRef(null)
  const setIntroCompleted = useAnimationStore((state) => state.setIntroCompleted)
  const [start, setStart] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      audioRef.current = new Audio('./audio/0406.mp3')
    }
  }, [start])

  useEffect(() => {
    if (start) {
      
      audioRef.current.play()
      audioRef.current.loop = true

      // Delay the animation by 4 seconds
      const animationTimer = setTimeout(() => {
        project.ready.then(() => {
          bavanGallerySheet.sequence
            .play({
              range: [0, 3 + 24 / 30],
            })
            .then(() => {
              // bavanGallerySheet.sequence.pause()
              setIntroCompleted(true)
            })
        })
      }, 4000) // 4 seconds delay

      // Cleanup function to clear the timeout if component unmounts
      return () => clearTimeout(animationTimer)
    }
  }, [setIntroCompleted, start])

  return (
    <>
      <Canvas
        {...props}
        shadows
        gl={{
          antialias: false,
          preserveDrawingBuffer: true,
          powerPreference: 'high-performance',
          toneMappingExposure: 2,
        }}
        onCreated={({ gl }) => {
          gl.clearDepth()
          gl.toneMapping = THREE.AgXToneMapping
        }}
        dpr={1.5}
        style={{
          zIndex: 30,
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          pointerEvents: 'auto',
        }}
      >
        <Stats />
        <Suspense fallback={null}>
          <SheetProvider sheet={bavanGallerySheet}>
            <ScrollTicker />
            <RefreshSnapshot />
            {/* <AdaptiveDpr pixelated /> */}
            {/* <Environment preset="city" /> */}
            {start && <Experience />}
            <Preload all />
          </SheetProvider>
        </Suspense>
      </Canvas>
      <LoadingScreen
        started={start}
        onStarted={() => setStart(true)}
      />
    </>
  )
}
