import TopBar from '@/components/top-bar.tsx';
import dynamic from 'next/dynamic';

const MainMap = dynamic(() => import('@/components/main-map.tsx'), {
	ssr: false,
});

export default function Home() {
	return (
		<main className='min-h-screen w-screen bg-stone-950'>
			<TopBar />
			<MainMap className='h-screen' />
		</main>
	);
}
