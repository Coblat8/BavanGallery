'use client'

import { LenisRef, ReactLenis } from 'lenis/react'
import { ReactNode, useEffect, useRef, useState } from 'react'
import { useTempus } from 'tempus/react'

export default function ClientLenis({ children }: { children: ReactNode }) {
	const lenisRef = useRef<LenisRef>(null)
	const [isIOS, setIsIOS] = useState(false)

	// Detect iOS on client side
	useEffect(() => {
		const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) ||
			(navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
		setIsIOS(iOS)
	}, [])

	useTempus((time: number) => {
		if (lenisRef.current?.lenis) {
			lenisRef.current.lenis.raf(time)
		}
	})

	return (
		<ReactLenis
			root
			ref={lenisRef}
			options={{
				duration: isIOS ? 1.2 : 2.4, // Shorter duration on iOS for responsiveness
				easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
				smoothWheel: true,
				wheelMultiplier: 0.7,
				syncTouch: true,
				// iOS-specific touch handling
				syncTouchLerp: isIOS ? 0.09 : 0.075, // Higher value for iOS = less smoothing but more responsive
				touchMultiplier: isIOS ? 1.5 : 1,    // Adjust touch sensitivity for iOS
				touchInertiaMultiplier: isIOS ? 0.8 : 1, // Reduced inertia for iOS
				orientation: "vertical",
				gestureOrientation: "vertical",
				// smoothTouch: true,	
				autoRaf: false,
			}}
		>
			{children}
		</ReactLenis>
	)
}