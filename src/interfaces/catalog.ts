import { ICatalogSection } from './catalog-section';

export interface ICatalog {
  id: number;
  name: string;
  type: string;
  collapse: number;
  sections: ICatalogSection[];
}
