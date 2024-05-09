'use client';

import './menu.scss';

import React, { useContext, useEffect, useState } from 'react';

import { CatalogContext } from '@/contexts/catalog';

export type MenuProps = Readonly<{}>;

export default ({}: MenuProps) => {
  const { catalog, fetchCatalog } = useContext(CatalogContext);
  const [sectionActivated, setSectionActivated] = useState(0);

  useEffect(() => {
    fetchCatalog();
  }, []);

  useEffect(() => {
    if (catalog && !sectionActivated) {
      setSectionActivated(catalog.sections[0].id);
    }
  }, [catalog]);

  return (
    <div className="menu">
      <ul className="menu__section-list">
        {catalog?.sections.map((section) => (
          <li
            key={section.id}
            className={`menu__section-item ${sectionActivated === section.id ? 'menu__section-item--active' : ''}`}
          >
            <a
              className="menu__section-item-link"
              href={'#section-' + section.id}
              onClick={() => setSectionActivated(section.id)}
            >
              <img className="menu__section-image" src={section.images[0].image} alt="Menu image" />

              <p className="menu__section-title">{section.name}</p>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};
