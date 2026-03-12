import type { Hero } from "../types/hero";
import api from "./api";

export const listHeroes = async (name?: string): Promise<Hero[]> => {
  const params = name ? { name } : {};
  const response = await api.get('/heroes', { params });
  return response.data;
};

export const createHero = async (heroData: Omit<Hero, 'id'>): Promise<Hero> => {
  const response = await api.post('/heroes', heroData);
  return response.data;
};

export const updateHero = async (id: number, heroData: Partial<Hero>): Promise<Hero> => {
  const response = await api.put(`/heroes/${id}`, heroData);
  return response.data;
};

export const toggleHeroStatus = async (id: number): Promise<void> => {
  await api.patch(`/heroes/${id}/toggle`);
};

export const deleteHero = async (id: number): Promise<void> => {
  await api.delete(`/heroes/${id}`);
};