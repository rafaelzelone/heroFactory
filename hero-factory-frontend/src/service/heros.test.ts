import { describe, it, expect, beforeEach } from 'vitest';
import MockAdapter from 'axios-mock-adapter';
import api from './api';
import {
  listHeroes,
  createHero,
  updateHero,
  toggleHeroStatus,
  deleteHero
} from './heros';
import type { Hero } from '../types/hero';

// Initializes the mock for the axios instance
const mock = new MockAdapter(api);

describe('Heroes Service', () => {
  const mockHero: Hero = {
    id: '1',
    name: 'Tony Stark',
    heroName: 'Iron Man',
    dateBirth: '1970-05-29',
    universe: 'Marvel',
    mainPower: 'Intelligence',
    avatarUrl: 'https://example.com/ironman.png',
    active: true
  };

  beforeEach(() => {
    mock.reset();
  });

  it('listHeroes should fetch heroes with a name filter', async () => {
    const mockResponse = {
      heroes: [mockHero],
      pages: 1,
      currentPage: 1
    };

    mock.onGet('/heroes').reply((config) => {
      if (config.params.name === 'Iron') {
        return [200, mockResponse];
      }
      return [404];
    });

    const result = await listHeroes('Iron');

    expect(result.heroes).toEqual([mockHero]);
    expect(mock.history.get[0].params.name).toBe('Iron');
  });
  it('createHero should send data correctly and return the created hero', async () => {
    const { id, ...heroDataToSave } = mockHero;

    mock.onPost('/heroes', heroDataToSave).reply(201, mockHero);

    const result = await createHero(heroDataToSave);

    expect(result).toEqual(mockHero);
    expect(JSON.parse(mock.history.post[0].data)).toEqual(heroDataToSave);
  });

  it('updateHero should call the correct route with the ID and partial payload', async () => {
    const updateData: Partial<Hero> = { heroName: 'Mark 85' };

    mock.onPut('/heroes/1').reply(200, { ...mockHero, ...updateData });

    const result = await updateHero('1', updateData);

    expect(result.heroName).toBe('Mark 85');
    expect(mock.history.put[0].url).toBe('/heroes/1');
  });

  it('toggleHeroStatus should call the toggle route with PATCH', async () => {
    mock.onPatch('/heroes/1/toggle').reply(200);

    await expect(toggleHeroStatus('1')).resolves.toBeUndefined();
    expect(mock.history.patch[0].url).toBe('/heroes/1/toggle');
  });

  it('deleteHero should trigger the DELETE method on the correct route', async () => {
    mock.onDelete('/heroes/1').reply(204);

    await deleteHero('1');

    expect(mock.history.delete[0].url).toBe('/heroes/1');
    expect(mock.history.delete[0].method).toBe('delete');
  });
});