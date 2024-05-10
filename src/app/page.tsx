'use client';
import './page.scss';

import React, { ReactNode, useEffect, useState } from 'react';

import { Banner } from '@/components/banner';
import { Basket } from '@/components/basket';
import { Field } from '@/components/field';
import { Menu } from '@/components/menu';

export type HomeProps = Readonly<{
  children?: ReactNode;
}>;
export default ({ children }: HomeProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
  const [isBasketOpened, setIsBasketOpened] = useState(true);

  const handlerChange = (e: any) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    if (searchTerm) {
      if (timeoutId) {
        clearTimeout(timeoutId);
        setTimeoutId(null);
      }

      const newTimeoutId = setTimeout(() => alert(searchTerm), 500);
      setTimeoutId(newTimeoutId);
    }
  }, [searchTerm]);

  return (
    <div className="home">
      <div className="home__banner">
        <Banner />
      </div>
      <div className="home__content page-content">
        <Field
          type="text"
          prefixIcon="search"
          placeholder="Search menu items"
          className="home__search"
          value={searchTerm}
          onChange={handlerChange}
        />

        <div className="home__menu">
          <Menu className="home__menu-content" />
          <Basket className="home__basket" isOpened={isBasketOpened} onClose={() => setIsBasketOpened(false)} />
        </div>
      </div>
    </div>
  );
};
