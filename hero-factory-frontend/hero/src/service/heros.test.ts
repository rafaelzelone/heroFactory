import { describe, it, expect, beforeEach, vi } from 'vitest';
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

// Inicializa o mock para a instância do axios
const mock = new MockAdapter(api);

describe('Heros Service', () => {
  const mockHero: Hero = {
    id: 1,
    name: 'Tony Stark',
    heroName: 'Iron Man',
    birthDate: '1970-05-29',
    universe: 'Marvel',
    skill: 'Intelligence',
    avatarUrl: 'https://example.com/ironman.png'
  };

  beforeEach(() => {
    mock.reset(); // Limpa o histórico de chamadas entre os testes
  });

  it('listHeroes deve buscar heróis com filtro de nome', async () => {
    const heroesList = [mockHero];
    // Simula GET /heroes?name=Iron
    mock.onGet('/heroes', { params: { name: 'Iron' } }).reply(200, heroesList);

    const result = await listHeroes('Iron');

    expect(result).toEqual(heroesList);
    expect(mock.history.get[0].params).toEqual({ name: 'Iron' });
  });

  it('createHero deve enviar os dados corretamente e retornar o herói criado', async () => {
    // Resolvemos o erro de tipagem removendo o 'id' do objeto enviado
    const { id, ...heroDataToSave } = mockHero;
    
    mock.onPost('/heroes', heroDataToSave).reply(201, mockHero);

    const result = await createHero(heroDataToSave);

    expect(result).toEqual(mockHero);
    expect(JSON.parse(mock.history.post[0].data)).toEqual(heroDataToSave);
  });

  it('updateHero deve chamar a rota correta com o ID e payload parcial', async () => {
    const updateData: Partial<Hero> = { heroName: 'Mark 85' };
    
    mock.onPut('/heroes/1').reply(200, { ...mockHero, ...updateData });

    const result = await updateHero(1, updateData);

    expect(result.heroName).toBe('Mark 85');
    expect(mock.history.put[0].url).toBe('/heroes/1');
  });

  it('toggleHeroStatus deve chamar a rota de toggle com PATCH', async () => {
    mock.onPatch('/heroes/1/toggle').reply(200);

    await expect(toggleHeroStatus(1)).resolves.toBeUndefined();
    expect(mock.history.patch[0].url).toBe('/heroes/1/toggle');
  });

  it('deleteHero deve disparar o método DELETE na rota correta', async () => {
    mock.onDelete('/heroes/1').reply(204);

    await deleteHero(1);

    expect(mock.history.delete[0].url).toBe('/heroes/1');
    expect(mock.history.delete[0].method).toBe('delete');
  });
});