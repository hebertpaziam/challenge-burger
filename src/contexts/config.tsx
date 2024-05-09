'use client';

import React, { createContext, ReactNode, useState } from 'react';

import { IConfig } from '@/interfaces/config';

export type ConfigContextProps = Readonly<{
  children: ReactNode;
  initialConfig: IConfig;
}>;

export const ConfigContext = createContext<IConfig>({} as IConfig);

export const ConfigProvider = ({ children, initialConfig }: ConfigContextProps) => {
  const [config] = useState<IConfig>(initialConfig);

  return <ConfigContext.Provider value={config}>{children}</ConfigContext.Provider>;
};
