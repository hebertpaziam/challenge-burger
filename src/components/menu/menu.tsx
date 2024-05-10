'use client';

import './menu.scss';

import React, { useContext, useEffect, useState } from 'react';

import { Accordion } from '@/components/accordion';
import { ItemDetails } from '@/components/item-details';
import { SectionTabs } from '@/components/section-tabs';
import { BasketContext } from '@/contexts/basket';
import { CatalogContext } from '@/contexts/catalog';

export type MenuProps = Readonly<{}>;

export default ({}: MenuProps) => {
  const { catalog, fetchCatalog } = useContext(CatalogContext);
  const { basket, setBasket } = useContext(BasketContext);

  const [sectionActivated, setSectionActivated] = useState(0);

  const toggleTab = (sectionId: number) => {
    setSectionActivated(sectionActivated !== sectionId ? sectionId : 0);
  };

  useEffect(() => {
    fetchCatalog();
  }, []);

  useEffect(() => {
    const item = catalog.sections?.[0].items[0];
    setBasket({ ...basket, items: [catalog.sections?.[0].items[0]] });
  }, [catalog]);

  return (
    catalog?.sections && (
      <div className="menu">
        <SectionTabs sections={catalog.sections} sectionActivated={sectionActivated} onSectionChange={toggleTab} />

        <ol className="menu__content">
          {catalog?.sections
            ?.filter((section) => !sectionActivated || section.id === sectionActivated)
            ?.map((section) => (
              <li key={section.id} id={`section-${section.id}`}>
                <Accordion name={section.name} startsOpen={true}>
                  {section.items.map((sectionItem) => (
                    <ItemDetails
                      key={sectionItem.id}
                      item={sectionItem}
                      count={basket.items?.filter((basketItem) => basketItem?.id === sectionItem?.id).length || 0}
                    />
                  ))}
                </Accordion>
              </li>
            ))}
        </ol>
      </div>
    )
  );
};
