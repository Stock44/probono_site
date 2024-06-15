import * as React from 'react';

declare const modalContext: React.Context<(() => void) | null>;
declare function useCloseModal(): () => void;

export { modalContext, useCloseModal };
