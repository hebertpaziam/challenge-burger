'use client';

import React, { createContext, Dispatch, ReactNode, useState } from 'react';

import { RequestCatalog } from '@/api/catalog';
import { ICatalog } from '@/interfaces/catalog';

export type CatalogProviderProps = Readonly<{
  children: ReactNode;
}>;

export type CatalogContextProps = Readonly<{
  catalog: ICatalog;
  setCatalog: Dispatch<React.SetStateAction<ICatalog>>;
  fetchCatalog: () => Promise<void>;
}>;

export const CatalogContext = createContext({} as CatalogContextProps);

export const CatalogProvider = ({ children }: CatalogProviderProps) => {
  const [catalog, setCatalog] = useState<ICatalog>({} as ICatalog);

  const fetchCatalog = async () => {
    try {
      const result = await RequestCatalog();

      if (result) {
        result.sections
          .sort((a, b) => a.position - b.position)
          .forEach((section) => {
            section.items
              .sort((a, b) => a.position - b.position)
              .forEach((item) => {
                item.modifiers?.forEach((modifier) => modifier.items.sort((a, b) => a.position - b.position));
              });
          });
      }
      setCatalog(result);
    } catch (error) {
      throw new Error('Failed to fetch data');
    }
  };

  return <CatalogContext.Provider value={{ catalog, setCatalog, fetchCatalog }}>{children}</CatalogContext.Provider>;
};
