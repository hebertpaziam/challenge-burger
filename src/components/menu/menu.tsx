'use client';

import './menu.scss';

import React, { useContext, useEffect, useState } from 'react';

import { BasketContext } from '@/contexts/basket';
import { CatalogContext } from '@/contexts/catalog';
import { ConfigContext } from '@/contexts/config';

import { Accordion } from '../accordion';

export type MenuProps = Readonly<{}>;

export default ({}: MenuProps) => {
  const { catalog, fetchCatalog } = useContext(CatalogContext);
  const { basket, setBasket } = useContext(BasketContext);
  const { locale, ccy } = useContext(ConfigContext);
  const [sectionActivated, setSectionActivated] = useState(0);

  useEffect(() => {
    fetchCatalog();
  }, []);

  useEffect(() => {
    const item = catalog.sections?.[0].items[0];
    setBasket({ ...basket, items: [catalog.sections?.[0].items[0]] });
  }, [catalog]);

  const toggleTab = (sectionId: number) => {
    setSectionActivated(sectionActivated !== sectionId ? sectionId : 0);
  };

  return (
    <div className="menu">
      <ol className="menu__section-list">
        {catalog?.sections?.map((section) => (
          <li
            key={section.id}
            className={`menu__section-item ${sectionActivated === section.id ? 'menu__section-item--active' : ''}`}
          >
            <a className="menu__section-item-link" onClick={() => toggleTab(section.id)}>
              <img className="menu__section-image" src={section.images[0].image} alt="Menu image" />
              <p className="menu__section-title">{section.name}</p>
            </a>
          </li>
        ))}
      </ol>

      <ol className="menu__content">
        {catalog?.sections
          ?.filter((section) => !sectionActivated || section.id === sectionActivated)
          ?.map((section) => (
            <li key={section.id} id={`section-${section.id}`}>
              <Accordion name={section.name} startsOpen={true}>
                {section.items.map((item) => (
                  <div className="menu__content-item" key={item.id}>
                    <span className="menu__content-details">
                      <p className="menu__content-title">
                        <span
                          className="menu__content-counter"
                          data-count={basket.items?.filter((i) => i?.id === item?.id).length || 0}
                        ></span>
                        {item.name}
                      </p>

                      {item?.description && (
                        <p className="menu__content-description" title={item?.description}>
                          {item.description}
                        </p>
                      )}

                      <p className="menu__content-price">
                        {new Intl.NumberFormat(locale, {
                          style: 'currency',
                          currency: ccy,
                        }).format(item.price || 0)}
                      </p>
                    </span>
                    {item.images?.[0].image && (
                      <img className="menu__content-image" src={item.images?.[0].image} alt="Menu image" />
                    )}
                  </div>
                ))}
              </Accordion>
            </li>
          ))}
      </ol>
    </div>
  );
};
