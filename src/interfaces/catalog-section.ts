import { ICatalogImage } from './catalog-image';
import { ICatalogItem } from './catalog-item';

export interface ICatalogSection {
  id: number;
  name: string;
  description: string;
  position: number;
  visible: number;
  images: ICatalogImage[];
  items: ICatalogItem[];
}
