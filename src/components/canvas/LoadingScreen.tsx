import { useProgress } from "@react-three/drei"
import LoadingLogo from "../ui/loadingLogo"
import { motion } from 'motion/react'
import { useEffect, useState } from "react"

type LoadingProps = {
	started: boolean
	onStarted: () => void
}

export default function LoadingScreen({ started, onStarted }: LoadingProps) {
	const { progress, item, active, total } = useProgress()
	const [readyToStart, setReadyToStart] = useState(false)

	// Add a delay to ensure textures are loaded even after progress reaches 100%
	useEffect(() => {
		if (progress === 100) {
			// Wait additional time to ensure textures are fully processed
			const timer = setTimeout(() => {
				setReadyToStart(true)
			}, 2000)

			return () => clearTimeout(timer)
		}
	}, [progress])

	console.log('Loading:', { item, active, total, progress: Math.round(progress) })

	return (
		<div className={`loadingScreen flex-col w-screen h-screen ${started ? "loadingScreen--started" : ""}`}>
			<div className="loadingScreen__logo">
				<motion.div
					initial={{ fillOpacity: 0 }}
					animate={{ fillOpacity: progress / 100 }}
					transition={{ duration: 2 }}
				>
					<LoadingLogo progress={progress} />
				</motion.div>
			</div>
			<span className="font-teko text-neutral-200 text-lg">{Math.round(progress)}%</span>
			<button
				className="loadingScreen__button font-teko"
				disabled={!readyToStart}
				onClick={onStarted}
			>
				{readyToStart ? "Start the experience" : "Processing assets..."}
			</button>
		</div>
	)
}