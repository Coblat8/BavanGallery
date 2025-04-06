'use client'

import { useIsClient } from '@uidotdev/usehooks'
import { useAnimationStore } from 'lib/store/useAnimationStore'
import { AnimatePresence, motion } from 'motion/react'

export default function HtmlContainer() {

	const currentPainting = useAnimationStore(state => state.currentPainting)
	const isClient = useIsClient()
	if(!isClient) return null

	const isMobile = window.innerWidth < 768

	return (
		<>
			<AnimatePresence>
				{currentPainting !== 0 &&
					<motion.div
						initial={{ 
							opacity: 0, 
							x: isMobile ? '-50%' : 200, 
							y: isMobile ? 200  : '-50%' 
						}}
						animate={{ 
							opacity: 1, 
							x: isMobile ? '-50%' : 0, 
							y: isMobile ? 0 : '-50%' 
						}}
						exit={{ 
							opacity: 0, 
							x: isMobile ? '-50%' : 200,
							y: isMobile ? 200 : '-50%' 
							}}
						transition={{ duration: 0.8, ease: 'easeOut' }}
						key={currentPainting}
						id="html-container"
						className='fixed top-[70vh] lg:top-1/2 lg:-translate-y-1/2 left-1/2 lg:right-40 bg-neutral-500/20 backdrop-blur-lg flex flex-col shrink-0 items-start justify-start gap-4 w-full h-[30vh] lg:w-[34rem] lg:h-[36rem] rounded-2xl shadow-lg drop-shadow-lg z-50 '>
						<div className=" flex flex-col gap-2 lg:gap-4 pt-4 lg:pt-16">
							<motion.h2
								initial={{ opacity: 0, y: -50, }}
								animate={{ opacity: 1, y: 0, }}
								exit={{ opacity: 0, y: -50, }}
								transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
								className=" text-2xl lg:text-[2rem] lg:leading-10 font-baumans font-bold px-16"> {`Artwork ${currentPainting}`} </motion.h2>
							<motion.p
								initial={{ opacity: 0, }}
								animate={{ opacity: 1, }}
								exit={{ opacity: 0, }}
								transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
								className=" text-sm lg:text-xl font-outfit text-neutral-900/80 px-16">
								Created entirely from woven wool, this piece replaces traditional brushstrokes with layered fibers. The rich crimson shapes emerge organically, resembling natural patterns or cellular forms.
							</motion.p>
							<span className=" font-outfit text-neutral-900/70 py-6 px-16"> untitiled, Sepideh Farzam, 2025</span>
						</div>
						<div className="hidden md:block w-full h-[2px] bg-neutral-900/50" />
						<div className=" hidden md:flex flex-col w-full h-fit justify-start items-start gap-4 px-16 font-teko">
							<span className=" text-3xl pt-4"> VISIT US DURING ART FAIRS</span>
							<button className=" bg-black text-slate-200 text-xl rounded-md px-8 py-2 "> Enter </button>
						</div>
					</motion.div>}
			</AnimatePresence>
		</>
	)
}
