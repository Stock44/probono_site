import * as react_jsx_runtime from 'react/jsx-runtime';
import { AriaCheckboxProps } from 'react-aria';
import { ToggleProps } from 'react-stately';

type CheckboxProps = {
    readonly className?: string;
} & AriaCheckboxProps & ToggleProps;
declare function Checkbox(props: CheckboxProps): react_jsx_runtime.JSX.Element;

export { Checkbox, type CheckboxProps };
