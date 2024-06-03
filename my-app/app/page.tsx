import Link from 'next/link';
import PopupButton from './PopupButton';

export default function Home() {
	return (
		<div className='relative h-screen flex items-center justify-around'>
			<PopupButton />
			<Link href='/pageTwo'>
				<button className='bg-blue-500 text-white px-4 py-2 rounded'>
					Go to 2nd Page
				</button>
			</Link>
		</div>
	);
}
