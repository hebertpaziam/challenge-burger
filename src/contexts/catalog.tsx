'use client';

import React, { createContext, Dispatch, ReactNode, useState } from 'react';

import { RequestCatalog } from '@/api/catalog';
import { ICatalog } from '@/interfaces/catalog';

export type CatalogProviderProps = Readonly<{
  children: ReactNode;
}>;

export type CatalogContextProps = Readonly<{
  catalog: ICatalog | null;
  setCatalog: Dispatch<React.SetStateAction<ICatalog | null>>;
  fetchCatalog: () => Promise<void>;
}>;

export const CatalogContext = createContext({} as CatalogContextProps);

export const CatalogProvider = ({ children }: CatalogProviderProps) => {
  const [catalog, setCatalog] = useState<ICatalog | null>(null);

  const fetchCatalog = async () => {
    try {
      const result = await RequestCatalog();
      setCatalog(result);
    } catch (error) {
      throw new Error('Failed to fetch data');
    }
  };

  return <CatalogContext.Provider value={{ catalog, setCatalog, fetchCatalog }}>{children}</CatalogContext.Provider>;
};
