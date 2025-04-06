'use client'

// 1 - wrap <Component {...pageProps} /> with <Scroll /> in _app.jsx
// 2 - add <ScrollTicker /> wherever in the canvas
// 3 - enjoy
import {  useFrame } from '@react-three/fiber'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'
// import { project } from '../../src/components/canvas/Scene'
import { useLenis } from 'lenis/react'
import { useCurrentSheet } from '@theatre/r3f'
import { useAnimationStore } from 'lib/store/useAnimationStore'


const { damp } = THREE.MathUtils

export const ScrollTicker = ({ smooth = 9999999 }) => {

  const bavanGallerySheet = useCurrentSheet()
  const setCurrentPainting = useAnimationStore(state => state.setCurrentPainting)
  const setScrollSign = useAnimationStore(state=> state.setScrollSign)
  const scrollSign = useAnimationStore(state=> state.scrollSign)
  const introCompleted = useAnimationStore(state => state.introCompleted)
  const inputGroupVisible = useAnimationStore((state) => state.inputGroupVisible)

  const lenis = useLenis()
  const scrollProgress = useRef(0)
  const scrollTop = useRef(0)
  const animationComplete = useRef(false)
  const totalAnimation = 31 + 10 / 30


  const updateScrollState = () => {
    // if(scrollTop.current < (lenis.limit - 10)  && animationComplete.current) {
    //   animationComplete.current = false
    // }
    // if (scrollTop.current = (lenis.limit  )  && !animationComplete.current && introCompleted) {
    //   const resetPoint = ((11 + 10/30) / (31 + 10/30)) * lenis.limit  // 20% of total height
    //   lenis.scrollTo(resetPoint, {
    //     immediate: true,
    //   }) // Reset without transition
    //   scrollTop.current = resetPoint
    //   scrollProgress.current = (11 + 10 / 30) / totalAnimation
    //   animationComplete.current = true
    // }
  }

  const stopPoints = {
    stop1_start: 18 + 0 / 30,
    stop1_end: 18 + 25 / 30,
    stop1_next: 19 + 9 / 30,
    stop2_start: 20 + 0 / 30,
    stop2_end: 21 + 9 / 30,
    stop2_next: 21 + 25 / 30,
    stop3_start: 22 + 20 / 30,
    stop3_end: 23 + 25 / 30,
    stop3_next: 24 + 10 / 30,
    stop4_start: 24 + 25 / 30,
    stop4_end: 25 + 25 / 30,
    stop4_next: 26 + 10 / 30,
    stop5_start: 27 + 15 / 30,
    stop5_end: 28 + 25 / 30,
    stop5_next: 29 + 10 / 30,
  }

  // const detectStops = (delta) => {
  //   if ( lenis.velocity < 0.1 && lenis.velocity > -0.1 && !scrollSign){ 
  //     setScrollSign(true)
  //   }
  //   else if ( (lenis.velocity > 0.1 || lenis.velocity < -0.1) && scrollSign ) {
  //     setScrollSign(false)
  //   }

  //   if (scrollProgress.current * totalAnimation < (3 + 29 / 30) ) {
  //     lenis.scrollTo((3 + 29 / 30) / totalAnimation * lenis.limit, {
  //       immediate: true
  //     })
  //   }
  //     if (
  //       scrollProgress.current * totalAnimation > stopPoints.stop1_start &&
  //       scrollProgress.current * totalAnimation < stopPoints.stop1_next + 20 / 30
  //     ) {
  //       if (scrollProgress.current * totalAnimation < stopPoints.stop1_end) {
  //         if (lenis.direction === 1) {
  //           // lenis.scrollTo((stopPoints.stop1_next / totalAnimation) * lenis.limit, {
  //           //   immediate: false,
  //           //   duration: 3,
  //           //   // lock:true,
  //           //   duration: 6,
  //           //   // easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),    
  //           //   onStart: () => {
  //               setCurrentPainting(1)
  //               // lenis.options.prevent = false 
  //             // },
  //             // onComplete: () => {lenis.options.prevent = true}
  //           // }
  //         // )
  //         } else {
  //           if (scrollProgress.current * totalAnimation < stopPoints.stop1_end - 10 / 30) {
  //             setCurrentPainting(0)
  //           }
  //         }
  //       } else if (
  //         scrollProgress.current * totalAnimation >= stopPoints.stop1_end &&
  //         scrollProgress.current * totalAnimation <= stopPoints.stop1_next
  //       ) {
  //         setCurrentPainting(1)
  //       } else if (
  //         scrollProgress.current * totalAnimation > stopPoints.stop1_next &&
  //         scrollProgress.current * totalAnimation < stopPoints.stop1_next + 20 / 30
  //       ) {
  //         if (lenis.direction === 1) {
  //           setCurrentPainting(0)
  //         } else if (lenis.direction === -1) {
              
  //             // lenis.scrollTo((stopPoints.stop1_next / totalAnimation) * lenis.limit, {
  //             //   immediate: false,
  //             //   duration: 6,
  //             //   onStart: () => {
  //                 setCurrentPainting(1)
  //                 // lenis.options.prevent = true
  //             //   },
  //             //   onComplete: () => {
  //             //     // lenis.options.prevent = false
  //             //   },
  //             // })
  //         }
  //       }
  //     }

  //     // second painting
  //     else if (
  //       scrollProgress.current * totalAnimation > stopPoints.stop2_start &&
  //       scrollProgress.current * totalAnimation < stopPoints.stop2_next + 20 / 30
  //     ) {
  //       if (scrollProgress.current * totalAnimation < stopPoints.stop2_end) {
  //         if (lenis.direction === 1) {
            
  //           // lenis.scrollTo((stopPoints.stop2_next / totalAnimation) * lenis.limit, {
  //           //   immediate: false,
  //           //   duration: 6,
  //           //   // easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  //             // onStart: () => 
  //               setCurrentPainting(2)
  //             // onComplete: () => {
  //               // lenis.options.prevent = false
  //             // },
  //           // })
  //         } else {
  //           if (scrollProgress.current * totalAnimation < stopPoints.stop2_end - 10 / 30) {
  //             setCurrentPainting(0)
  //           }
  //         }
  //       } else if (
  //         scrollProgress.current * totalAnimation >= stopPoints.stop2_end &&
  //         scrollProgress.current * totalAnimation <= stopPoints.stop2_next
  //       ) {
  //         setCurrentPainting(2)
  //       } else if (
  //         scrollProgress.current * totalAnimation > stopPoints.stop2_next &&
  //         scrollProgress.current * totalAnimation < stopPoints.stop2_next + 20 / 30
  //       ) {
  //         if (lenis.direction === 1) {
  //           setCurrentPainting(0)
  //         } else if (lenis.direction === -1) {
            
  //           // lenis.scrollTo((stopPoints.stop2_next / totalAnimation) * lenis.limit, {
  //           //   immediate: false,
  //           //   duration: 3.0,
  //           //   // easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  //             // onStart: () => 
  //               setCurrentPainting(2)
  //           //   onComplete: () => {
  //           //     lenis.options.prevent = false
  //           //   },
  //           // })
  //         }
  //       }
  //     }

  //     // third painting
  //     else if (
  //       scrollProgress.current * totalAnimation > stopPoints.stop3_start &&
  //       scrollProgress.current * totalAnimation < stopPoints.stop3_next + 20 / 30
  //     ) {
  //       if (scrollProgress.current * totalAnimation < stopPoints.stop3_end) {
  //         if (lenis.direction === 1) {
            
  //           // lenis.scrollTo((stopPoints.stop3_next / totalAnimation) * lenis.limit, {
  //           //   immediate: false,
  //           //   duration: 6,
  //           //   // easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  //             // onStart: () => 
  //               setCurrentPainting(3)
  //           //   onComplete: () => {
  //           //     lenis.options.prevent = false
  //           //   },
  //           // })
  //         } else {
  //           if (scrollProgress.current * totalAnimation < stopPoints.stop3_end - 10 / 30) {
  //             setCurrentPainting(0)
  //           }
  //         }
  //       } else if (
  //         scrollProgress.current * totalAnimation >= stopPoints.stop3_end &&
  //         scrollProgress.current * totalAnimation <= stopPoints.stop3_next
  //       ) {
  //         setCurrentPainting(3)
  //       } else if (
  //         scrollProgress.current * totalAnimation > stopPoints.stop3_next &&
  //         scrollProgress.current * totalAnimation < stopPoints.stop3_next + 20 / 30
  //       ) {
  //         if (lenis.direction === 1) {
  //           setCurrentPainting(0)
  //         } else if (lenis.direction === -1) {
            
  //           // lenis.scrollTo((stopPoints.stop3_next / totalAnimation) * lenis.limit, {
  //           //   immediate: false,
  //           //   duration: 6,
  //             // easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  //             // onStart: () => 
  //               setCurrentPainting(3)
  //           //   onComplete: () => {
  //           //     lenis.options.prevent = false
  //           //   },
  //           // })
  //         // }
  //       }
  //     }

  //     // 4rd painting
  //     else if (
  //       scrollProgress.current * totalAnimation > stopPoints.stop4_start &&
  //       scrollProgress.current * totalAnimation < stopPoints.stop4_next + 20 / 30
  //     ) {
  //       if (scrollProgress.current * totalAnimation < stopPoints.stop4_end) {
  //         if (lenis.direction === 1) {
            
  //           // lenis.scrollTo((stopPoints.stop4_next / totalAnimation) * lenis.limit, {
  //           //   immediate: false,
  //           //   duration: 6,
  //           //   // easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  //             // onStart: () => 
  //               setCurrentPainting(4)
  //           //   onComplete: () => {
  //           //     lenis.options.prevent = false
  //           //   },
  //           // })
  //         } else {
  //           if (scrollProgress.current * totalAnimation < stopPoints.stop4_end - 10 / 30) {
  //             setCurrentPainting(0)
  //           }
  //         }
  //       } else if (
  //         scrollProgress.current * totalAnimation >= stopPoints.stop4_end &&
  //         scrollProgress.current * totalAnimation <= stopPoints.stop4_next
  //       ) {
  //         setCurrentPainting(4)
  //       } else if (
  //         scrollProgress.current * totalAnimation > stopPoints.stop4_next &&
  //         scrollProgress.current * totalAnimation < stopPoints.stop4_next + 20 / 30
  //       ) {
  //         if (lenis.direction === 1) {
  //           setCurrentPainting(0)
  //         } else if (lenis.direction === -1) {
            
  //           // lenis.scrollTo((stopPoints.stop4_next / totalAnimation) * lenis.limit, {
  //           //   immediate: false,
  //           //   duration: 6,
  //             // easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  //             // onStart: () => 
  //               setCurrentPainting(4)
  //           //   onComplete: () => {
  //           //     lenis.options.prevent = false
  //           //   },
  //           // })
  //         }
  //       }
  //     }

  //     // 5th painting
  //     else if (
  //       scrollProgress.current * totalAnimation > stopPoints.stop5_start &&
  //       scrollProgress.current * totalAnimation < stopPoints.stop5_next + 1
  //     ) {
  //       if (scrollProgress.current * totalAnimation < stopPoints.stop5_end) {
  //         if (lenis.direction === 1) {
            
  //           // lenis.scrollTo((stopPoints.stop5_next / totalAnimation) * lenis.limit, {
  //           //   immediate: false,
  //           //   duration: 6,
  //             // easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  //             // onStart: () => 
  //               setCurrentPainting(5)
  //           //   onComplete: () => {
  //           //     lenis.options.prevent = false
  //           //   },
  //           // })
  //         } else {
  //           if (scrollProgress.current * totalAnimation < stopPoints.stop5_end - 10 / 30) {
  //             setCurrentPainting(0)
  //           }
  //         }
  //       } else if (
  //         scrollProgress.current * totalAnimation >= stopPoints.stop5_end &&
  //         scrollProgress.current * totalAnimation <= stopPoints.stop5_next
  //       ) {
  //         setCurrentPainting(5)
  //       } else if (
  //         scrollProgress.current * totalAnimation > stopPoints.stop5_next &&
  //         scrollProgress.current * totalAnimation < stopPoints.stop5_next + 1
  //       ) {
  //         if (lenis.direction === 1) {
  //           setCurrentPainting(0)
  //         } else if (lenis.direction === -1) {
            
  //           // lenis.scrollTo((stopPoints.stop5_next / totalAnimation) * lenis.limit, {
  //           //   immediate: false,
  //           //   duration: 6,
  //             // easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  //             // onStart: () => 
  //               setCurrentPainting(5)
  //           //   onComplete: () => {
  //           //     lenis.options.prevent = false
  //           //   },
  //           // })
  //         }
  //       }
  //     }


  //     else if (scrollProgress.current * totalAnimation === totalAnimation ) {
  //        if (lenis.direction === 1) {
          
  //         // lenis.scrollTo(lenis.limit, {
  //         //   immediate: false,
  //         //   duration: 3,
  //         //   // easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  //         //   onComplete: () => {
  //             const resetPoint = ((11 + 10 / 30) / (31 + 10 / 30)) * lenis.limit // 20% of total height
  //             lenis.scrollTo(resetPoint, {
  //               immediate: true,
  //             }) // Reset without transition
  //             scrollTop.current = resetPoint
  //             scrollProgress.current = (11 + 10 / 30) / totalAnimation
  //             animationComplete.current = true
  //           }
  //         // })
  //        }
  //     }
  // }

useEffect(() => {
  lenis.scrollTo((4 / totalAnimation) * lenis.limit, {
    immediate: true,
    // easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  })
}, [inputGroupVisible])


// useEffect(() => {
    lenis.on('scroll', ({ scroll, progress }) => {
           if (introCompleted) {
             scrollTop.current = scroll
             scrollProgress.current = progress
            //  updateScrollState()
             
           }
    })
  //   return () => {
  //     lenis.off('scroll')
  //   }
  // }
  // , [lenis])

  
  useFrame(( {viewport}, delta) => {
    if (introCompleted && (scrollProgress.current * totalAnimation > 3 + 29 / 30) && (scrollProgress.current * totalAnimation) < (totalAnimation - (2/30))) {
      bavanGallerySheet.sequence.position = damp(
        bavanGallerySheet.sequence.position,
        scrollProgress.current * totalAnimation,
        smooth,
        delta
      )
      // detectStops(delta)
      //  bavanGallerySheet.sequence.position = scrollProgress.current * totalAnimation
    }
  })

  return null
}


