'use client';

import './item-modifier.scss';

import React, { HTMLAttributes, useContext, useEffect, useState } from 'react';

import { ConfigContext } from '@/contexts/config';
import { ICatalogItemModifier } from '@/interfaces/catalog-item-modifier';
import { ICatalogItemModifierOption } from '@/interfaces/catalog-item-modifier-option';

export type ItemModifierProps = Readonly<{
  modifier: ICatalogItemModifier;
  onChange: (options: ICatalogItemModifierOption[]) => void;
}>;

export default function ItemModifier({
  className,
  modifier,
  onChange,
}: ItemModifierProps & HTMLAttributes<HTMLDivElement>) {
  const { locale, ccy } = useContext(ConfigContext);
  const [selectedOptions, setSelectedOptions] = useState<ICatalogItemModifierOption[]>([]);

  const isMultiple = modifier.minChoices !== modifier.maxChoices;

  const handleSelect = (option: ICatalogItemModifierOption) => {
    setTimeout(() => {
      const newSelectedOptions = isMultiple ? [...new Set([...selectedOptions, option])] : [option];
      setSelectedOptions(newSelectedOptions);
    }, 0);
  };

  useEffect(() => {
    onChange(selectedOptions);
  }, [onChange, selectedOptions]);

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
        {modifier.items?.map((option) => (
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
              checked={!!selectedOptions.find(({ id }) => id === option.id)}
              onChange={() => handleSelect(option)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
