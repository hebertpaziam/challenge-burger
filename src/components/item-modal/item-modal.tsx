'use client';

import './item-modal.scss';

import React, { HTMLAttributes, useContext, useEffect, useState } from 'react';

import { ActionButton } from '@/components/action-button';
import { Counter } from '@/components/counter';
import { Icon } from '@/components/icon';
import { ItemModifier } from '@/components/item-modifier';
import { BasketContext } from '@/contexts/basket';
import { ConfigContext } from '@/contexts/config';
import { ICatalogItem } from '@/interfaces/catalog-item';
import { ICatalogItemModifierOption } from '@/interfaces/catalog-item-modifier-option';

export type ItemModalProps = Readonly<{
  item: ICatalogItem;
  isOpened: boolean;
  onClose: (event?: any) => void;
}>;

export default function ItemModal({
  className,
  item,
  isOpened,
  onClose,
}: ItemModalProps & HTMLAttributes<HTMLDivElement>) {
  const { locale, ccy } = useContext(ConfigContext);
  const [totalAmount, setTotalAmount] = useState(item.price || 0);
  const [selectedModifiers, setSelectedModifiers] = useState<ICatalogItemModifierOption[]>([]);
  const [counterValue, setCounterValue] = useState(1);

  const { addBasketItem } = useContext(BasketContext);

  const onAddToBasket = () => {
    addBasketItem({
      ...item,
      modifiers: item.modifiers?.map((modifier) => ({ ...modifier, items: selectedModifiers })),
      quantity: counterValue,
    });
    onClose();
  };

  useEffect(() => {
    const handleKeyDown = (event: any) => event?.keyCode === 27 && onClose();
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    const amountModifiers = selectedModifiers.reduce((total, current) => total + current.price, 0);
    if (item.price) {
      setTotalAmount(counterValue * (item.price + amountModifiers));
    } else {
      setTotalAmount(counterValue * amountModifiers);
    }
  }, [counterValue, selectedModifiers, item.price]);

  return (
    <div className={`item-modal ${isOpened ? 'item-modal--open' : ''} ${className || ''}`}>
      <div className="item-modal__backdrop" onClick={onClose}></div>
      <div className="item-modal__content">
        <div className="item-modal__header">
          {item.images?.[0].image && <img src={item.images?.[0].image} alt="" />}
          <button type="button" className="item-modal__close" onClick={onClose}>
            <Icon name="x" />
          </button>
        </div>
        <div className="item-modal__info">
          <p className="item-modal__title">{item.name}</p>
          <p className="item-modal__description">{item.description}</p>
          {item.modifiers?.length && (
            <ItemModifier
              modifier={item.modifiers[0]}
              onChange={(modifiers) => setSelectedModifiers(modifiers as ICatalogItemModifierOption[])}
            />
          )}
        </div>
        <div className="item-modal__footer">
          <Counter initialValue={counterValue} onChange={(value) => setCounterValue(value as number)} />

          <ActionButton onClick={onAddToBasket} disabled={totalAmount === 0}>
            Add to order •{' '}
            {new Intl.NumberFormat(locale, { style: 'currency', currency: ccy }).format(totalAmount || 0)}
          </ActionButton>
        </div>
      </div>
    </div>
  );
}
