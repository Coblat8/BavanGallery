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

	// console.log('Loading:', { item, active, total, progress: Math.round(progress) })

	return (
		<div className={`loadingScreen flex-col w-screen h-screen pt-44 md:pt-60 ${started ? " opacity-0 transition-opacity duration-700 delay-500 loadingScreen--started" : ""}`}>
			<div className="loadingScreen__logo">
				<motion.div
					// initial={{ fillOpacity: 0 }}
					// animate={{ fillOpacity: progress / 100 }}
					// transition={{ duration: 2 }}
				>
					<LoadingLogo progress={progress} total={total} />
				</motion.div>
			</div>
			<div className="relative top-auto lg:-top-20 flex flex-col w-full justify-center items-center">
			<span className={`font-teko text-neutral-200 text-lg  ${total === 63 ? " opacity-0 transition-opacity duration-300" : ""}`}>{Math.floor(total * 100 / 63)}%</span>
			<button
				className="loadingScreen__button text-3xl font-teko hover:shadow-white hover:drop-shadow-lg hover:text-white/60 hover:blur-[1px]"
				disabled={!readyToStart}
				onClick={onStarted}
				>
				{readyToStart ? "Start the experience" : "Processing assets..."}
			</button>
				</div>
		</div>
	)
}