'use client';

import './item-details.scss';

import React, { HTMLAttributes, useContext, useState } from 'react';

import { ItemModal } from '@/components/item-modal';
import { ConfigContext } from '@/contexts/config';
import { ICatalogItem } from '@/interfaces/catalog-item';

export type ItemDetailsProps = Readonly<{ item: ICatalogItem; count: number }>;

export default function ItemDetails({ className, item, count }: ItemDetailsProps & HTMLAttributes<HTMLDivElement>) {
  const { locale, ccy } = useContext(ConfigContext);
  const [isModalOpened, setIsModalOpened] = useState(false);

  const openModal = (event?: any) => {
    event?.preventDefault();
    event?.stopPropagation();

    if (isModalOpened) return;
    setIsModalOpened(true);
  };

  const closeModal = (event?: any) => {
    event?.preventDefault();
    event?.stopPropagation();

    if (!isModalOpened) return;
    setIsModalOpened(false);
  };

  return (
    <div className={`item-details ${className || ''}`} onClick={openModal}>
      <span className="item-details__content">
        <p className="item-details__title">
          <span className="item-details__counter" data-count={count || 0}></span>
          {item.name}
        </p>

        {item?.description && (
          <p className="item-details__description" title={item?.description}>
            {item.description}
          </p>
        )}

        <p className="item-details__price">
          {new Intl.NumberFormat(locale, {
            style: 'currency',
            currency: ccy,
          }).format(item.price || 0)}
        </p>
      </span>
      {item.images?.[0].image && <img className="item-details__image" src={item.images?.[0].image} alt="Menu image" />}
      <ItemModal item={item} isOpened={isModalOpened} onClose={closeModal} />
    </div>
  );
}
