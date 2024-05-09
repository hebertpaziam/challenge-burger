const CONFIG_URL = `${process.env.API_URL}/venue/9`;

export const RequestConfig = async () => {
  try {
    const response = await fetch(CONFIG_URL);
    return await response.json();
  } catch (error) {
    throw new Error('Failed to fetch data')
  }
};
