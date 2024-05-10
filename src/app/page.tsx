'use client';
import './page.scss';

import React, { ReactNode, useContext, useEffect, useState } from 'react';

import { Banner } from '@/components/banner';
import { Basket } from '@/components/basket';
import { Field } from '@/components/field';
import { Menu } from '@/components/menu';
import { CatalogContext } from '@/contexts/catalog';
import { ICatalog } from '@/interfaces/catalog';
import { ICatalogSection } from '@/interfaces/catalog-section';
import { Equalize } from '@/utils';

export type HomeProps = Readonly<{
  children?: ReactNode;
}>;
export default ({ children }: HomeProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
  const [isBasketOpened, setIsBasketOpened] = useState(true);
  const [filteredCatalog, setFilteredCatalog] = useState({} as ICatalog);
  const { catalog, fetchCatalog } = useContext(CatalogContext);

  const handlerChange = (e: any) => {
    setSearchTerm(e.target.value);
  };

  const processSearch = () => {
    let filtered: ICatalogSection[] = [...catalog.sections.map((section) => ({ ...section, items: [] }))];

    catalog.sections.forEach((section) => {
      section.items.forEach((sectionItem) => {
        const name = Equalize(sectionItem.name);
        const term = Equalize(searchTerm);

        if (!name.includes(term)) return;

        filtered = filtered.map((filteredSection) =>
          filteredSection.id !== section.id
            ? filteredSection
            : { ...filteredSection, items: [...filteredSection.items, sectionItem] },
        );
      });
    });

    setFilteredCatalog({ ...filteredCatalog, sections: [...filtered.filter((section) => !!section.items.length)] });
  };

  useEffect(() => {
    fetchCatalog();
  }, []);

  useEffect(() => {
    setFilteredCatalog({ ...catalog });
  }, [catalog]);

  useEffect(() => {
    if (catalog?.sections?.length) {
      if (timeoutId) {
        clearTimeout(timeoutId);
        setTimeoutId(null);
      }

      const newTimeoutId = setTimeout(() => processSearch(), 500);
      setTimeoutId(newTimeoutId);
    }
  }, [searchTerm, catalog]);

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
          <Menu className="home__menu-content" catalog={filteredCatalog} />
          <Basket className="home__basket" isOpened={isBasketOpened} onClose={() => setIsBasketOpened(false)} />
        </div>
      </div>
    </div>
  );
};
