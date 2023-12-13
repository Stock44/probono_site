'use client';
import React, {type ReactNode} from 'react';
import Link, {type LinkProps} from 'next/link';

export type ClientLinkProps = {
	readonly children: ReactNode;
} & LinkProps;

export default function ClientLink(props: ClientLinkProps) {
	return <Link {...props}/>;
}
