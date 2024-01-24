import React from 'react';
import miImagenFondo from './LABNL2.JPG';
import AccountButtons from '@/app/account-buttons.tsx';

export default function Home() {
    const alturaTopBar = 64; 


    const backgroundStyle: React.CSSProperties = {
        backgroundImage: `url('https://via.placeholder.com/1200x800')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'absolute', //cadena texto
        top: `${alturaTopBar}px`, //px
        left: '0',
        right: '0',
        bottom: '0',
        zIndex: -2
    };
	
	const parallelogramStyle: React.CSSProperties = {
        position: 'absolute',
        top: `${alturaTopBar}px`, 
        left: '0',
        width: '50%', 
        height: `calc(100% - ${alturaTopBar}px)`, 
        backgroundColor: 'black',
        clipPath: 'polygon(0 0, 80% 0, 100% 100%, 20% 100%)',
        zIndex: -1
    };

    return (
        <div className='w-full h-full'>
            <div style={backgroundStyle} /> 
            <div style={parallelogramStyle} /> 
            <div className='text-white w-full flex flex-col gap-2 items-start ml-16' style={{ paddingTop: `${alturaTopBar}px` }}>
                <h1 className='text-7xl mb-4 ml-5'>Registra tu</h1>
                <h1 className='text-7xl mb-4 ml-5'>organización!</h1>
				<br/>
				<h2 className='text-3l ml-16'>ve de manera visual con cartografía y geoestadística, el impacto </h2>
				<h2 className='text-3l ml-16 mb-10'>que tiene tu iniciativa</h2>

				<div className='ml-48'>
    				<AccountButtons onlyRegisterButton={true} />
				</div>

            </div>
			
			
        </div>
    );
}
