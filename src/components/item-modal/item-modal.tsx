'use client';

import './item-modal.scss';

import React, { HTMLAttributes, useContext, useEffect, useState } from 'react';

import { ActionButton } from '@/components/action-button';
import { Counter } from '@/components/counter';
import { Icon } from '@/components/icon';
import { ItemModifier } from '@/components/item-modifier';
import { ConfigContext } from '@/contexts/config';
import { ICatalogItem } from '@/interfaces/catalog-item';

export type ItemModalProps = Readonly<{ item: ICatalogItem; isOpened: boolean; onClose: (event?: any) => void }>;

export default ({ className, item, isOpened, onClose }: ItemModalProps & HTMLAttributes<HTMLDivElement>) => {
  const { locale, ccy } = useContext(ConfigContext);
  const [totalAmount, setTotalAmount] = useState(item.price || 0);
  const [modifiersAmount, setModifiersAmount] = useState(0);
  const [counterValue, setCounterValue] = useState(1);

  useEffect(() => {
    const handleKeyDown = (event: any) => event?.keyCode === 27 && onClose();
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  useEffect(() => {
    if (item.price) {
      setTotalAmount(counterValue * (item.price + modifiersAmount));
    } else {
      setTotalAmount(counterValue * modifiersAmount);
    }
  }, [counterValue, modifiersAmount]);

  return (
    <div className={`item-modal ${isOpened ? 'item-modal--open' : ''} ${className || ''}`}>
      <div className="item-modal__backdrop" onClick={onClose}></div>
      <div className="item-modal__content">
        <div className="item-modal__header">
          <img src={item.images?.[0].image} alt="" />
          <button type="button" className="item-modal__close" onClick={onClose}>
            <Icon name="x" />
          </button>
        </div>
        <div className="item-modal__info">
          <p className="item-modal__title">{item.name}</p>
          <p className="item-modal__description">{item.description}</p>
          {item.modifiers?.[0] && (
            <ItemModifier modifier={item.modifiers[0]} onChange={(value) => setModifiersAmount(value as number)} />
          )}
        </div>
        <div className="item-modal__footer">
          <Counter initialValue={counterValue} onChange={(value) => setCounterValue(value as number)} />

          <ActionButton onClick={() => alert(totalAmount)} disabled={totalAmount === 0}>
            Add to order •{' '}
            {new Intl.NumberFormat(locale, { style: 'currency', currency: ccy }).format(totalAmount || 0)}
          </ActionButton>
        </div>
      </div>
    </div>
  );
};
