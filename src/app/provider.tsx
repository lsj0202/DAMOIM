'use client';

import { OverlayProvider } from '@toss/use-overlay';

type ProviderProps = {
  children: React.ReactNode;
};

const Provider = ({ children }: ProviderProps) => {
  return <OverlayProvider>{children}</OverlayProvider>;
};

export default Provider;
