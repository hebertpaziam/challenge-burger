'use client';

import './basket.scss';

import React, { HTMLAttributes, useContext, useEffect } from 'react';

import { Icon } from '@/components/icon';
import { BasketContext } from '@/contexts/basket';
import { ConfigContext } from '@/contexts/config';
import { ICatalogItemModifier } from '@/interfaces/catalog-item-modifier';

import ActionButton from '../action-button/action-button';
import Counter from '../counter/counter';

export type BasketProps = Readonly<{
  isOpened: boolean;
  onClose: (event?: any) => void;
}>;

export default ({ isOpened, onClose, className }: BasketProps & HTMLAttributes<HTMLDivElement>) => {
  const { locale, ccy } = useContext(ConfigContext);
  const { basketItems, updateBasketQuantityItem } = useContext(BasketContext);

  const getModifiersAmount = (modifiers?: ICatalogItemModifier[]): number =>
    modifiers?.reduce(
      (total, modifier) => total + modifier.items.reduce((total, option) => total + option.price, 0),
      0,
    ) || 0;

  useEffect(() => {
    const handleKeyDown = (event: any) => event?.keyCode === 27 && onClose();
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return (
    <div className={`basket ${isOpened ? 'basket--open' : ''} ${className || ''}`}>
      <div className="basket__header">
        <h2 className="basket__title">Basket</h2>
        <button type="button" className="basket__close" onClick={onClose}>
          <Icon name="x" className="basket__close-icon" />
        </button>
      </div>
      {basketItems?.length ? (
        <ul className="basket__list">
          {basketItems?.map((item) => (
            <li key={item?.id} className="basket__item">
              <p className="basket__item-title">
                {item.name}{' '}
                <strong>
                  {new Intl.NumberFormat(locale, { style: 'currency', currency: ccy }).format(
                    (item.price + getModifiersAmount(item.modifiers)) * item.quantity,
                  )}
                </strong>
              </p>
              {item?.modifiers?.length && (
                <p className="basket__item-subtitle">
                  {`With ${item.modifiers![0].items[0].name} ` +
                    `(+${new Intl.NumberFormat(locale, { style: 'currency', currency: ccy }).format(getModifiersAmount(item.modifiers!))})`}
                  <span></span>
                </p>
              )}
              <Counter
                className="basket__item-counter"
                initialValue={item?.quantity}
                minValue={0}
                onChange={(value) => updateBasketQuantityItem(value as number, item)}
              />
            </li>
          ))}
        </ul>
      ) : (
        <p className="basket__empty">Your basket is empty</p>
      )}

      <div className="basket__footer">
        {!!basketItems.length && (
          <>
            <p className="basket__subtotal">
              <span>Sub total</span> <strong>R$22.50</strong>
            </p>
            <hr />
            <p className="basket__total">
              <span>Total</span> <strong>R$22.50</strong>
            </p>
            <ActionButton className="basket__checkout">Checkout now</ActionButton>
          </>
        )}
      </div>
    </div>
  );
};
