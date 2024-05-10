'use client';

import './field.scss';

import React, { HTMLAttributes } from 'react';

import { Icon } from '@/components/icon';

export type FieldProps = Readonly<{
  onChange: Function;
  type: 'text';
  value: any;
  prefixIcon?: string;
  placeholder?: string;
}>;

export default ({
  className,
  placeholder,
  prefixIcon,
  type = 'text',
  value,
  onChange,
}: FieldProps & HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={`field ${className || ''}`}>
      {prefixIcon && <Icon className="field__icon-prefix" name={prefixIcon} />}

      <input
        className="field__input"
        value={value}
        type={type}
        placeholder={placeholder}
        onChange={(e) => onChange(e)}
      />
    </div>
  );
};
