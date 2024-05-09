'use client';

import React, { createContext, Dispatch, ReactNode, useState } from 'react';

import { IBasket } from '@/interfaces/basket';

export type BasketProviderProps = Readonly<{
  children: ReactNode;
}>;

export type BasketContextProps = Readonly<{
  basket: IBasket;
  setBasket: Dispatch<React.SetStateAction<IBasket>>;
}>;

export const BasketContext = createContext({} as BasketContextProps);

export const BasketProvider = ({ children }: BasketProviderProps) => {
  const [basket, setBasket] = useState<IBasket>({} as IBasket);

  return <BasketContext.Provider value={{ basket, setBasket }}>{children}</BasketContext.Provider>;
};
