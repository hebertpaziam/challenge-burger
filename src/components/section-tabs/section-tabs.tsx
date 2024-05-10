'use client';

import './section-tabs.scss';

import React, { HTMLAttributes } from 'react';

import { ICatalogSection } from '@/interfaces/catalog-section';

export type SectionTabsProps = Readonly<{
  sections: ICatalogSection[];
  sectionActivated: number;
  onSectionChange: (sectionId: number) => void;
}>;

export default ({
  className,
  sections,
  sectionActivated,
  onSectionChange,
}: SectionTabsProps & HTMLAttributes<HTMLDivElement>) => {
  return (
    <ol className={`section-tabs ${className || ''}`}>
      {sections.map((section) => (
        <li key={section.id} className={`section-tabs__item ${sectionActivated === section.id ? 'section-tabs__item--active' : ''}`}>
          <a
            className="section-tabs__item-link"
            onClick={() => onSectionChange(sectionActivated !== section.id ? section.id : 0)}
          >
            <img className="section-tabs__image" src={section.images[0].image} alt="Section image" />
            <p className="section-tabs__title">{section.name}</p>
          </a>
        </li>
      ))}
    </ol>
  );
};
