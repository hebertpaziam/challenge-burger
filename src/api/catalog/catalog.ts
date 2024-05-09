const MENU_URL = `/api/menu`;

export const RequestCatalog = async () => {
  try {
    const response = await fetch(MENU_URL);
    const result = await response.json();

    return result;
  } catch (error) {}
};
