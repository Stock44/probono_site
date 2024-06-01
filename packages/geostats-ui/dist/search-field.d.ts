import * as react_jsx_runtime from 'react/jsx-runtime';
import { AriaSearchFieldProps } from 'react-aria';
import { SearchFieldProps as SearchFieldProps$1 } from 'react-stately';

type SearchFieldProps = {
    readonly className: string;
} & AriaSearchFieldProps & SearchFieldProps$1;
declare function SearchField(props: SearchFieldProps): react_jsx_runtime.JSX.Element;

export { type SearchFieldProps, SearchField as default };
