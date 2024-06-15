import React, {type ComponentProps, forwardRef} from 'react';
import {omit} from 'lodash';
import paperVariants, {type PaperVariantProps} from '@/components/paper/paper-variants.tsx';

export type PaperProps = ComponentProps<'div'> & PaperVariantProps;

const Paper = forwardRef<HTMLDivElement>((props: PaperProps, ref) => <div {...omit(props, ['hoverEffect', 'spacing'])} className={paperVariants(props)}/>);

export default Paper;
