import { faker } from '@faker-js/faker';

import { ICatalog } from '@/interfaces/catalog';

import { RequestCatalog } from './catalog.api';

test('should RequestCatalog return success', async () => {
  const mockData = {
    id: faker.number.int(),
    name: faker.string.alpha(),
    type: faker.string.alpha(),
    collapse: faker.number.int(),
    sections: [],
  } as ICatalog;
  
  global.fetch = jest.fn().mockResolvedValueOnce({ ok: true, json: () => Promise.resolve(mockData) });
  const request = RequestCatalog();

  expect(request).resolves.toStrictEqual(mockData);
  expect(global.fetch).toHaveBeenCalledWith('/api/menu');
});

test('should RequestCatalog return error', async () => {
  const error = faker.lorem.paragraph();
  global.fetch = jest.fn().mockRejectedValueOnce(error);

  const request = RequestCatalog();

  expect(request).rejects.toMatch(error);
  expect(global.fetch).toHaveBeenCalledWith('/api/menu');
});
