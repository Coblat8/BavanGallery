'use client'

import { LenisRef, ReactLenis } from 'lenis/react'
import { ReactNode, useEffect, useRef } from 'react'
import { useTempus } from 'tempus/react'

export default function ClientLenis({ children }: { children: ReactNode }) {

	const lenisRef = useRef<LenisRef>(null)

	// useTempus((time: number) => {
	// 	if (lenisRef.current?.lenis) {
	// 		lenisRef.current.lenis.raf(time)
	// 	}
	// })

	return (
		<ReactLenis
			root
			ref={lenisRef}
			options={{
				duration: 2.4,
				easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
				// lerp: 0.08,              // lower value for quicker interpolation
				smoothWheel: true,      // enable smooth wheel events
				wheelMultiplier: 0.7,     // adjust if needed based on your experience
				syncTouch: true,  // better sync between touch and scroll
				// syncTouchLerp: 0.08,      // optional: sync touch lerp if supported
				// touchInertiaMultiplier: 2, // lower inertia for a smoother touch experience
				touchMultiplier: 2,
				infinite: false,  
				autoRaf: true,
				// autoResize: true,
			}}
		>
			{children}
		</ReactLenis>
	)
}