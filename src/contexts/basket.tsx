'use client';

import React, { createContext, ReactNode, useState } from 'react';

import { IBasketItem } from '@/interfaces/basket-item';

export type BasketProviderProps = Readonly<{
  children: ReactNode;
}>;

export type BasketContextProps = Readonly<{
  basketItems: IBasketItem[];
  addBasketItem: (item: IBasketItem) => void;
  removeBasketItem: (item: IBasketItem) => void;
  updateBasketQuantityItem: (quantity: number, item: IBasketItem) => void;
}>;

export const BasketContext = createContext({} as BasketContextProps);

export const BasketProvider = ({ children }: BasketProviderProps) => {
  const [basketItems, setBasketItems] = useState<IBasketItem[]>([]);

  const addBasketItem = (item: IBasketItem) => {
    if (!item?.id) return;
    
    setBasketItems([...basketItems.filter((basketItem) => basketItem.id !== item.id), item]);
  };

  const removeBasketItem = (item: IBasketItem) => {
    setBasketItems(basketItems.filter((basketItem) => basketItem.id !== item.id));
  };

  const updateBasketQuantityItem = (quantity: number, item: IBasketItem) => {
    if (quantity <= 0) return removeBasketItem(item);

    setBasketItems((items) =>
      items.map((basketItem) => (basketItem.id === item.id ? { ...basketItem, quantity } : basketItem)),
    );
  };

  return (
    <BasketContext.Provider value={{ basketItems, addBasketItem, removeBasketItem, updateBasketQuantityItem }}>
      {children}
    </BasketContext.Provider>
  );
};
