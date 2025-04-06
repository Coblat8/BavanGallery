import { motion } from "motion/react"

type LoadingLogoProps = {
	progress?: number
}

export default function LoadingLogo({ progress = 0 }: LoadingLogoProps) {
	return (
		<svg width="70vw" height="70vh" id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 438.7 172.57">
			{/* This is just an example - replace with your actual SVG path */}
			<motion.path
				className="cls-1" d="M438.7.73c-20.29,18.26-44.54,34.07-69.75,44.63-75.06,31.63-161.7,47.63-239,73.13-35.25,11.93-69.95,25.76-102.22,44.44-6.88,2.74-21.05,11.23-27.73,9.37C104.22,99.24,235.81,91.55,352.7,45.21c22.91-8.89,45.67-19.82,65.94-33.78,5.01-2.43,15.2-14.49,20.06-10.7Z"
				fill="none"
				stroke="#000"
				strokeWidth="2"
				initial={{ pathLength: 0, fill: "rgba(0, 0, 0, 0)" }}
				animate={{
					pathLength: progress / 100,
					fill: `rgba(80, 80, 80, ${progress / 100})`
				}}
				transition={{ duration: 0.5 }}
			/>
		</svg>
	)
}

