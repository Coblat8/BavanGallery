import { useProgress } from "@react-three/drei"
import LoadingLogo from "../ui/loadingLogo"
import { motion} from 'motion/react'

type LoadingProps = {
	started : boolean
	onStarted:() => void
}

export default function LoadingScreen  ({ started, onStarted }:LoadingProps){
	const { progress } = useProgress()
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
			<span className=" font-teko text-neutral-200 text-lg">{progress}%</span>
			{/* <div className="loadingScreen__board"> */}
				{/* <h1 className="loadingScreen__title">Please help me!</h1> */}
				<button
					className="loadingScreen__button font-teko"
					disabled={progress < 100}
					onClick={onStarted}
				>
					Start the experience
				</button>
			{/* </div> */}
		</div>
	)
}