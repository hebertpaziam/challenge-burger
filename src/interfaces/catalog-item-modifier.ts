import { ICatalogItemModifierOption } from './catalog-item-modifier-option';

export interface ICatalogItemModifier {
  id: number;
  name: string;
  minChoices: number;
  maxChoices: number;
  items: ICatalogItemModifierOption[];
}
