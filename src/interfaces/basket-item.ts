import { ICatalogItem } from './catalog-item';

export interface IBasketItem extends ICatalogItem {
  quantity: number;
}
