'use client'

import { Canvas, useLoader } from '@react-three/fiber'
import { Suspense, useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { ScrollTicker } from '@/templates/Scroll'
import { PerformanceMonitor, Preload, Stats, useTexture, useGLTF } from '@react-three/drei'
import { getProject } from '@theatre/core'
import { RefreshSnapshot, SheetProvider } from '@theatre/r3f'
// import extension from '@theatre/r3f/dist/extension'
// import studio from '@theatre/studio'
import { useAnimationStore } from 'lib/store/useAnimationStore'
import projectState from '../../../public/Bavan Gallery Project.theatre-project-state-3.json'
import Experience from './Experience'
import LoadingScreen from './LoadingScreen'
import { useIsClient } from '@uidotdev/usehooks'
import { EXRLoader } from 'three/addons/loaders/EXRLoader.js'


const isProd = true

// if (!isProd) {
//   studio.initialize()
//   studio.extend(extension)
//   studio.ui.hide()
// }
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


// Create a PreloadAssets component that explicitly loads all textures
function PreloadAssets() {
  // Preload all your textures here
  useTexture([
    '/Smeared_wall/Smeared Wall_BaseColor3.jpg',
    '/Smeared_wall/Smeared Wall_Normal.jpg',
    '/black_metal/metal09_diffuse.jpg',
    '/black_metal/metal0_normal_opengl.jpg',
    '/black_metal/metal0_glossiness.jpg',
    '/concrete/albedo.jpg',
    '/concrete/normal.jpg',
    '/concrete/roughness.jpg',
    '/paintings/Image_1_back_2.jpg',
    '/paintings/Image_2_front.jpg',
    '/paintings/Image_3_front.jpg',
    '/paintings/Image_4_front.jpg',
    '/paintings/Image_5_front.jpg',
    '/ao/inside_wall_Bake1_PBR_Ambient_Occlusion.jpg',
    '/ao/bottom_walls_Bake1_PBR_Ambient_Occlusion.jpg',
    '/ao/ground_floor_1_Bake1_PBR_Ambient_Occlusion.jpg',
    '/ao/ground_floor_2_Bake1_PBR_Ambient_Occlusion.jpg',
    '/ao/top_walls_Bake1_PBR_Ambient_Occlusion.jpg',
    // '/lightmaps/inside_wall_Bake1_PBR_Lightmap2.exr',
    // '/lightmaps/bottom_walls_Bake1_PBR_Lightmap3.exr',
    // '/lightmaps/ground_floor_1_Bake1_PBR_Lightmap2.exr',
    // '/lightmaps/ground_floor_2_Bake1_PBR_Lightmap2.exr',
    // '/lightmaps/top_walls_Bake1_PBR_Lightmap2.exr',
  ])

    function useEXRTexture(url) {
      const texture = useLoader(EXRLoader, url, (loader) => {
      })
      texture.flipY = true
      texture.needsUpdate = true
      return texture
    }

    useEXRTexture('/lightmaps/inside_wall_Bake1_PBR_Lightmap2.exr')
    useEXRTexture('/lightmaps/bottom_walls_Bake1_PBR_Lightmap3.exr')
    useEXRTexture('/lightmaps/ground_floor_1_Bake1_PBR_Lightmap2.exr')
    useEXRTexture('/lightmaps/ground_floor_2_Bake1_PBR_Lightmap2.exr')
    useEXRTexture('/lightmaps/top_walls_Bake1_PBR_Lightmap2.exr')


  // Preload all models
  useGLTF.preload('/bavan_gallery_final.glb')
  useGLTF.preload('/yard-transformed.glb')
  useGLTF.preload('/bavan_logo.glb')

  return null
}

export default function Scene({ ...props }) {
  const isClient = useIsClient()
  const audioRef = useRef(null)
  const setIntroCompleted = useAnimationStore((state) => state.setIntroCompleted)
  const [start, setStart] = useState(false)
// const [dpr, setDpr] = useState(1.5)


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
      }, 3000) // 4 seconds delay

      // Cleanup function to clear the timeout if component unmounts
      return () => clearTimeout(animationTimer)
    }
  }, [setIntroCompleted, start])

  if(!isClient) return null
const isMobile = window.innerWidth < 768

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
        dpr={isMobile ? 2 : 1.5}
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
        {/* <PerformanceMonitor
          bounds={(refreshrate) => (refreshrate > 90 ? [40, 90] : [45, 60])}
          onIncline={() => setDpr(2)}
          onDecline={() => setDpr(1.5)}
          flipflops={3}
          onFallback={() => setDpr(1.5)}
        /> */}
        <Suspense fallback={null}>
          <PreloadAssets />
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
