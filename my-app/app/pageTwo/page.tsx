'use client';
import { useEffect, useState } from 'react';
import CreativeAnimation from '../creative-animation/page';
import Image from 'next/image';
const PopupContent = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [isClosing, setIsClosing] = useState(false);
	const [isOpening, setIsOpening] = useState(false);
	const handleClosePopup = () => {
		setIsClosing(true);
	};
	const handleButtonClick = () => {
		setIsOpening(true);
		setIsOpen(true);
	};
	useEffect(() => {
		if (isClosing) {
			const timer = setTimeout(() => {
				setIsOpen(false);
				setIsClosing(false);
			}, 500);
			return () => clearTimeout(timer);
		}
	}, [isClosing]);
	useEffect(() => {
		if (isOpening) {
			const timer = setTimeout(() => {
				setIsOpening(false);
			}, 500);
			return () => clearTimeout(timer);
		}
	}, [isOpening]);
	return (
		<div className='gradient-background'>
			<div className='relative flex items-center justify-center h-screen w-full p-4'>
				<div
					className='flex items-center justify-center min-h-screen cursor-pointer relative'
					onClick={handleButtonClick}>
					<div className='relative w-full h-screen p-4  font-bold font-sans'>
						Welcome To The Hyperspace Task
						<div className='absolute-center'>
							<svg
								className='circle-svg'
								viewBox='0 0 500 500'>
								<defs>
									<path
										d='M50,250c0-110.5,89.5-200,200-200s200,89.5,200,200s-89.5,200-200,200S50,360.5,50,250'
										id='textcircle_top'></path>
								</defs>
								<text
									className='circle-text'
									dy='70'
									textLength='1220'>
									<textPath xlinkHref='#textcircle_top'>
										Click To View The Canvas |
									</textPath>
									<animateTransform
										attributeName='transform'
										attributeType='XML'
										type='rotate'
										from='0 250 250'
										to='360 250 250'
										dur='20s'
										repeatCount='indefinite'
									/>
								</text>
							</svg>
						</div>
						<div className='absolute-center2'>
							<div className='showreels-div flex justify-center items-center cursor-pointer'>
								<div className='relative'>
									<div className='absolute inset-0 rounded-full border-4 border-white'></div>
									<Image
										alt='imagePreview'
										className='rounded-full'
										width={100}
										height={100}
										src='/imagePreview.png'></Image>
								</div>
								<Image
									width={100}
									height={100}
									alt='play'
									className='showreels-btn'
									src='/play.png'
								/>
							</div>
						</div>
					</div>
				</div>
				{isOpen && (
					<div
						className={`fixed inset-0 transition-opacity duration-500 ${
							isClosing
								? 'opacity-0'
								: isOpening
								? 'opacity-0'
								: 'opacity-100'
						}`}>
						<CreativeAnimation onClose={handleClosePopup} />
					</div>
				)}
			</div>
			<style jsx>{`
				.gradient-background {
					background: linear-gradient(
						-45deg,
						#ee7752,
						#e73c7e,
						#23a6d5,
						#23d5ab
					);
					background-size: 400% 400%;
					animation: gradient 15s ease infinite;
					height: 100vh;
				}
				@keyframes gradient {
					0% {
						background-position: 0% 50%;
					}
					50% {
						background-position: 100% 50%;
					}
					100% {
						background-position: 0% 50%;
					}
				}
			`}</style>
		</div>
	);
};
export default PopupContent;
