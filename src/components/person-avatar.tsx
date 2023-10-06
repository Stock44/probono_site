'use client';
import React from 'react';
import * as Avatar from '@radix-ui/react-avatar';
import {type Person} from '@prisma/client';

export default function PersonAvatar({person}: {readonly person: Person}) {
	return (
		<Avatar.Root className='rounded-full w-10 h-10 bg-stone-800 flex justify-center items-center'>
			<Avatar.Fallback className=' w-full h-full flex justify-center items-center text-stone-300'>
				{`${person.givenName[0]}${person.familyName[0]}`}
			</Avatar.Fallback>
		</Avatar.Root>
	);
}
