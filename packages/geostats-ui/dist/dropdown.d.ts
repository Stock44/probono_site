import * as react_jsx_runtime from 'react/jsx-runtime';
import { ReactNode } from 'react';

type DropdownProps = BaseDropdownProps | StatefulDropDownProps;
declare function Dropdown(props: DropdownProps): react_jsx_runtime.JSX.Element;
type StatefulDropDownProps = Omit<BaseDropdownProps, 'isOpen' | 'onToggle'> & {
    readonly isInitiallyOpen?: boolean;
};
declare function StatefulDropDown(props: StatefulDropDownProps): react_jsx_runtime.JSX.Element;
type BaseDropdownProps = {
    readonly isOpen: boolean;
    readonly onToggle: (isOpen: boolean) => void;
    readonly label: ReactNode;
    readonly children: ReactNode;
    readonly className?: string;
};
declare function BaseDropdown(props: BaseDropdownProps): react_jsx_runtime.JSX.Element;

export { BaseDropdown, type BaseDropdownProps, Dropdown, type DropdownProps, StatefulDropDown, type StatefulDropDownProps };
