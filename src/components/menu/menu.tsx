'use client';

import './menu.scss';

import React, { HTMLAttributes, useContext, useEffect, useState } from 'react';

import { Accordion } from '@/components/accordion';
import { ItemDetails } from '@/components/item-details';
import { SectionTabs } from '@/components/section-tabs';
import { BasketContext } from '@/contexts/basket';
import { CatalogContext } from '@/contexts/catalog';

export type MenuProps = Readonly<{}>;

export default ({ className }: MenuProps & HTMLAttributes<HTMLDivElement>) => {
  const { catalog, fetchCatalog } = useContext(CatalogContext);
  const { basketItems, addBasketItem } = useContext(BasketContext);

  const [sectionActivated, setSectionActivated] = useState(0);

  const toggleTab = (sectionId: number) => {
    setSectionActivated(sectionActivated !== sectionId ? sectionId : 0);
  };

  useEffect(() => {
    fetchCatalog();
  }, []);

  return (
    catalog?.sections && (
      <div className={`menu ${className || ''}`}>
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
                      count={basketItems?.find((basketItem) => basketItem?.id === sectionItem?.id)?.quantity || 0}
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
