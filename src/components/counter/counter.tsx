'use client';
import './counter.scss';

import React, { HTMLAttributes, useEffect, useState } from 'react';

import { Icon } from '@/components/icon';

export type CounterProps = Readonly<{
  initialValue?: number;
  minValue?: number;
  maxValue?: number;
  onChange: (value: number) => void;
}>;

export default ({
  className,
  initialValue = 1,
  minValue = 1,
  maxValue = 100,
  onChange,
}: CounterProps & HTMLAttributes<HTMLDivElement>) => {
  const [value, setValue] = useState(initialValue || minValue);

  useEffect(() => {
    onChange(value);
  }, [value]);

  return (
    <div className={`counter ${className || ''}`}>
      <button
        type="button"
        className="counter__button counter__button--decrement"
        disabled={value <= minValue}
        onClick={() => setValue(value - 1)}
      >
        <Icon name="minus" />
      </button>

      <p className="counter__value">{value}</p>

      <button
        type="button"
        className="counter__button counter__button--increment"
        disabled={value >= maxValue}
        onClick={() => setValue(value + 1)}
      >
        <Icon name="plus" />
      </button>
    </div>
  );
};
