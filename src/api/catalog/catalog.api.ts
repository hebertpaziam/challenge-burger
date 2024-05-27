import { ICatalog } from '@/interfaces/catalog';

const MENU_URL = `/api/menu`;

export const RequestCatalog = async (): Promise<ICatalog> => {
  try {
    const response = await fetch(MENU_URL);
    return await response.json();
  } catch (error) {
    return Promise.reject(error);
  }
};
