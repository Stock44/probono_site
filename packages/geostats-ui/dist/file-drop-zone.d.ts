import * as react_jsx_runtime from 'react/jsx-runtime';
import { ReactNode, ComponentProps } from 'react';
import { FormValidationProps } from '@react-aria/form';

type FileDropZoneProps = {
    readonly className?: string;
    readonly name?: string;
    readonly label?: ReactNode;
    readonly acceptedMimeTypes?: string[];
    readonly error?: string;
} & FormValidationProps<File | undefined> & Omit<ComponentProps<'input'>, 'type' | 'accept' | 'ref'>;
declare function FileDropZone(props: FileDropZoneProps): react_jsx_runtime.JSX.Element;

export { FileDropZone, type FileDropZoneProps };
