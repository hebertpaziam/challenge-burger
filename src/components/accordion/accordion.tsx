'use client';

import './accordion.scss';

import React, { HTMLAttributes, useState } from 'react';

import Icon from '../icon/icon';

export type AccordionProps = Readonly<{
  name: string;
  startsOpen: boolean;
}>;

export default ({ name, className, children, startsOpen }: AccordionProps & HTMLAttributes<HTMLDivElement>) => {
  const [isOpen, setIsOpen] = useState(startsOpen);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`accordion ${className || ''} ${isOpen ? 'accordion--open' : ''}`}>
      <button type="button" className="accordion__header" onClick={toggleAccordion}>
        <p className="accordion__title">{name}</p>
        <Icon className='accordion__icon' name="chevron-down" />
      </button>
      <div className="accordion__content">{children}</div>
    </div>
  );
};
