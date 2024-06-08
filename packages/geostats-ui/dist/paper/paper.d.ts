import * as react_jsx_runtime from 'react/jsx-runtime';
import { ComponentProps } from 'react';
import { PaperVariantProps } from './paper-variants.js';
import 'cva';

type PaperProps = ComponentProps<'div'> & PaperVariantProps;
declare function Paper(props: PaperProps): react_jsx_runtime.JSX.Element;

export { Paper, type PaperProps };
