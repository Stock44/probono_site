'use client';
import React from 'react';
import {type User} from '@prisma/client';
import {Item} from 'react-stately';
import ListBox from 'geostats-ui/list-box.tsx';

export type MembersListProps = {
	readonly members: User[];
};

export default function MembersList(props: MembersListProps) {
	const {members} = props;
	return (
		<ListBox items={members}>
			{member => (
				<Item>
					{member.givenName} {member.familyName}
				</Item>
			)}
		</ListBox>
	);
}
