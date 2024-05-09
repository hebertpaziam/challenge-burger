'use client';

import React, { createContext, ReactNode, useState } from 'react';

import { RequestCatalog } from '@/api/catalog';
import { ICatalog } from '@/interfaces/catalog';

export type CatalogContextProps = Readonly<{
  children: ReactNode;
}>;

export const CatalogContext = createContext({});

export const CatalogProvider = ({ children }: CatalogContextProps) => {
  const [catalog, setCatalog] = useState<ICatalog | null>(null);

  const fetchCatalog = async () => {
    try {
      const result = await RequestCatalog();
      setCatalog(result);
    } catch (error) {}
  };

  return <CatalogContext.Provider value={{ catalog, setCatalog, fetchCatalog }}>{children}</CatalogContext.Provider>;
};
