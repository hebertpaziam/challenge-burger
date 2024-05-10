'use client';

import './item-modifier.scss';

import React, { HTMLAttributes, useContext, useEffect, useState } from 'react';

import { ConfigContext } from '@/contexts/config';
import { ICatalogItemModifier } from '@/interfaces/catalog-item-modifier';

export type ItemModifierProps = Readonly<{
  modifier: ICatalogItemModifier;
  onChange: (value: number) => void;
}>;

export default ({
  className,
  modifier,
  onChange,
}: ItemModifierProps & HTMLAttributes<HTMLDivElement>) => {
  const { locale, ccy } = useContext(ConfigContext);
  const [selectedOptions, setSelectedOptions] = useState<number[]>([]);

  const isMultiple = modifier.minChoices !== modifier.maxChoices;

  const handleSelect = (optionId: number) => {
    setTimeout(() => {
      const newSelectedOptions = isMultiple ? [...new Set<number>([...selectedOptions, optionId])] : [optionId];
      setSelectedOptions(newSelectedOptions);
    }, 0);
  };

  useEffect(() => {
    const amount = modifier.items.reduce(
      (acc, item) => acc + (selectedOptions.includes(item.id) ? item.price || 0 : 0),
      0,
    );

    onChange(amount);
  }, [selectedOptions]);

  return (
    <div className={`item-modifier ${className || ''}`}>
      <div className="item-modifier__header">
        <p className="item-modifier__title">{modifier.name}</p>
        <p className="item-modifier__description">
          {!isMultiple
            ? `Select ${modifier.minChoices} option(s)`
            : `Select between ${modifier.minChoices} and ${modifier.maxChoices} options`}
        </p>
      </div>
      <ul className="item-modifier__options">
        {modifier.items?.map((option, index) => (
          <li key={option.id} className="item-modifier__option">
            <label className="item-modifier__option-label" htmlFor={`option-${option.id}`}>
              <p className="item-modifier__option-name">{option.name}</p>
              <p className="item-modifier__option-price">
                {new Intl.NumberFormat(locale, { style: 'currency', currency: ccy }).format(option.price || 0)}
              </p>
            </label>
            <input
              className="item-modifier__option-input"
              type={isMultiple ? 'checkbox' : 'radio'}
              value={option.id}
              name={`modifier-${modifier.id}`}
              id={`option-${option.id}`}
              checked={selectedOptions.includes(option.id)}
              onChange={() => handleSelect(option.id)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
