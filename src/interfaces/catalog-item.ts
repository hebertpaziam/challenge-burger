import { ICatalogImage } from './catalog-image';
import { ICatalogItemModifier } from './catalog-item-modifier';

export interface ICatalogItem {
  id: number;
  name: string;
  description: string;
  alcoholic: number;
  price: number;
  position: number;
  visible: number;
  availabilityType: string;
  sku: string;
  images: ICatalogImage[];
  available: boolean;
  modifiers?: ICatalogItemModifier[]
}
