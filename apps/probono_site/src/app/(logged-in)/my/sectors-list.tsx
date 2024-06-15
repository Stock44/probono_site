'use client';
import React from 'react';
import {type Sector} from '@prisma/client';
import {Item} from 'react-stately';

import {ListBox} from 'geostats-ui';

export type SectorsListProps = {
	readonly sectors: Sector[];
};

export default function SectorsList(props: SectorsListProps) {
	const {sectors} = props;
	return (
		<ListBox items={sectors}>
			{sector => <Item>{sector.name}</Item>}
		</ListBox>
	);
}
