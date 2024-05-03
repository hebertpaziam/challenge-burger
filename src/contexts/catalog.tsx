'use client';

import React, { createContext, ReactNode, useEffect, useState } from 'react';

import { RequestCatalog } from '@/api/catalog';
import { ICatalog } from '@/interfaces/catalog';

export type CatalogContextProps = Readonly<{
  children: ReactNode;
}>;

export const CatalogContext = createContext({ catalog: {} as ICatalog, setCatalog: () => {} } as any);

export const CatalogProvider = ({ children }: CatalogContextProps) => {
  const [catalog, setCatalog] = useState<ICatalog>({} as ICatalog);

  useEffect(() => {
    RequestCatalog()
  }, []);

  return <CatalogContext.Provider value={{ catalog, setCatalog }}>{children}</CatalogContext.Provider>;
};
