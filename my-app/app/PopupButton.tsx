'use client';
import { useState } from 'react';
export default function PopupButton() {
	const [isOpen, setIsOpen] = useState(false);

	const handleOpenPopup = () => {
		setIsOpen(true);
	};

	const handleClosePopup = () => {
		setIsOpen(false);
	};

	return (
		<>
			<button
				className='bg-blue-500 text-white px-4 py-2 rounded'
				onClick={handleOpenPopup}>
				Open Popup
			</button>
			{isOpen && (
				<div className='fixed inset-0 flex items-center justify-center z-50 backdrop-blur-lg'>
					<div
						className='absolute inset-0 bg-black opacity-50'
						onClick={handleClosePopup}></div>
					<div className='bg-white p-8 rounded shadow-lg z-10'>
						<h2 className='text-2xl font-bold mb-4'>Popup Content</h2>
						<p>This is the content of the popup.</p>
						<button
							className='mt-4 bg-blue-500 text-white px-4 py-2 rounded'
							onClick={handleClosePopup}>
							Close
						</button>
					</div>
				</div>
			)}
		</>
	);
}
