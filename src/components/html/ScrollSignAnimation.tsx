import { useAnimationStore } from "lib/store/useAnimationStore"
import { AnimatePresence, motion } from "motion/react"

export default function ScrollSignAnimation() {

	const scrollSign = useAnimationStore(state => state.scrollSign)
	const currentPainting = useAnimationStore(state => state.currentPainting)
	const introCompleted = useAnimationStore(state => state.introCompleted)

	return (
		<>
			<AnimatePresence>
				{
					scrollSign && currentPainting === 0 && introCompleted &&
					<>				
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.5, ease: 'easeOut' }}
							// key={currentPainting}
							className=" flex w-10 h-16 lg:w-16 lg:h-20 justify-center items-center border-neutral-900 rounded-full backdrop-blur-lg z-50"
							style={{
								width: 60,
								height: 84,
								borderWidth: 4,
								borderColor: '#171717'
							}}
						>
							<motion.div
								initial={{ y: -15, opacity: 1, height: 16 }}
								animate={{ y: 2, opacity: 0.1, height: 8 }}
								transition={{ duration: 1, repeat: Infinity, repeatType: "loop", repeatDelay: 0.6, ease: 'easeOut' }}
								className=" flex w-[6px] h-4 bg-neutral-900 rounded-full"
								style={{
									width: 6,
									height: 16,
									backgroundColor: '#171717'
								}}
							/>

						</motion.div>
						<motion.span
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.5, ease: 'easeOut' }}
							className=" text-base lg:text-xl font-baumans font-semibold flex w-full items-center justify-center px-2 py-2 backdrop-blur-lg shadow-sm shadow-neutral-700 rounded-3xl"
							style={{ 
								color: '#171717 ', 
								fontWeight: 600,
								paddingLeft: '1rem',
								paddingRight: '1rem',
								borderRadius: '1.5rem'
							 }}
						> SWIPE/SCROLL TO MOVE</motion.span>
						
					</>
				}
			</AnimatePresence>
		</>
	)
}
