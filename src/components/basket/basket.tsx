'use client';

import './basket.scss';

import React, { HTMLAttributes, useContext, useEffect, useState } from 'react';

import { Icon } from '@/components/icon';
import { BasketContext } from '@/contexts/basket';
import { ConfigContext } from '@/contexts/config';
import { IBasketItem } from '@/interfaces/basket-item';
import { ICatalogItemModifier } from '@/interfaces/catalog-item-modifier';

import ActionButton from '../action-button/action-button';
import Counter from '../counter/counter';

export default function Basket({ className }: HTMLAttributes<HTMLDivElement>) {
  const [total, setTotal] = useState(0);
  const [isBasketOpened, setIsBasketOpened] = useState(false);
  const { locale, ccy } = useContext(ConfigContext);
  const { basketItems, updateBasketQuantityItem } = useContext(BasketContext);

  const getModifiersAmount = (modifiers: ICatalogItemModifier[] = []): number => {
    return modifiers.reduce(
      (total, modifier) => total + modifier.items.reduce((total, option) => total + option.price, 0),
      0,
    );
  };

  const getItemSubTotal = (item: IBasketItem): number => {
    return (item.price + getModifiersAmount(item.modifiers)) * item.quantity;
  };

  const redirectToCheckout = () => {
    location.href = 'https://www.youtube.com/embed/hPr-Yc92qaY?autoplay=1&controls=0&rel=0&loop=1&showinfo=0';
  };

  useEffect(() => {
    const handleKeyDown = (event: any) => event?.keyCode === 27 && setIsBasketOpened(false);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (basketItems?.length) {
      setTotal(basketItems.reduce((total, item) => total + getItemSubTotal(item), 0));
    }
  }, [basketItems]);

  return (
    <div className={`basket ${!isBasketOpened ? 'basket--hidden' : ''} ${!basketItems?.length ? 'basket__mobile-actions--hidden' : ''}`}>
      <div className={`basket__container  ${className || ''}`}>
        <div className="basket__header">
          <h2 className="basket__title">Basket</h2>
          <button type="button" className="basket__close" onClick={() => setIsBasketOpened(false)}>
            <Icon name="x" className="basket__close-icon" />
          </button>
        </div>
        <div className="basket__content">
          {basketItems?.length ? (
            <ul className="basket__list">
              {basketItems?.map((item) => (
                <li key={item?.id} className="basket__item">
                  <p className="basket__item-title">
                    {item.name}{' '}
                    <strong>
                      {new Intl.NumberFormat(locale, { style: 'currency', currency: ccy }).format(
                        getItemSubTotal(item),
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
        </div>
        <div className="basket__footer">
          {!!basketItems?.length && (
            <>
              <p className="basket__subtotal">
                <span>Sub total</span>
                <strong>{new Intl.NumberFormat(locale, { style: 'currency', currency: ccy }).format(total)}</strong>
              </p>
              <hr />
              <p className="basket__total">
                <span>Total</span>
                <strong>{new Intl.NumberFormat(locale, { style: 'currency', currency: ccy }).format(total)}</strong>
              </p>
              <ActionButton className="basket__checkout" onClick={redirectToCheckout}>
                Checkout now
              </ActionButton>
            </>
          )}
        </div>
        <div className={`basket__mobile-actions`}>
          <ActionButton className="basket__show" onClick={() => setIsBasketOpened(true)}>
            Your basket • {basketItems?.length} item(s)
          </ActionButton>
        </div>
      </div>
    </div>
  );
}
