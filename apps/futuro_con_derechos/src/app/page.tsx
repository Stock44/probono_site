import TopBar from '@/components/top-bar.tsx';
import dynamic from 'next/dynamic';
import {Paper} from 'geostats-ui';

const MainMap = dynamic(() => import('@/components/main-map.tsx'), {
	ssr: false,
});

export default function Home() {
	return (
		<main className='h-screen w-screen overflow-hidden bg-stone-950 text-stone-300'>
			<TopBar />
			<Paper className='absolute right-8 top-20'>Hola!</Paper>
			<MainMap className='h-full' />
		</main>
	);
}
