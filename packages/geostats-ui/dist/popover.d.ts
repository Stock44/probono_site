import React__default from 'react';
import { AriaPopoverProps } from 'react-aria';
import { OverlayTriggerState } from 'react-stately';

declare const Popover: React__default.ForwardRefExoticComponent<{
    readonly children: React__default.ReactNode;
    readonly state: OverlayTriggerState;
} & Omit<AriaPopoverProps, "popoverRef"> & React__default.RefAttributes<HTMLDivElement>>;

export { Popover as default };
