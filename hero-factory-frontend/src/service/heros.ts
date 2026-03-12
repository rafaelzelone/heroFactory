import type { Hero, HeroesResponse } from "../types/hero";
import api from "./api";

export const listHeroes = async (name?: string, page: number = 1): Promise<HeroesResponse> => {
  const params: any = { page };
  if (name) {
    params.name = name;
  }

  const response = await api.get<HeroesResponse>('/heroes', { params });

  return response.data;
};

export const createHero = async (heroData: Omit<Hero, 'id'>): Promise<Hero> => {
  const response = await api.post('/heroes', heroData);
  return response.data;
};

export const updateHero = async (id: string, heroData: Partial<Hero>): Promise<Hero> => {
  const response = await api.put(`/heroes/${id}`, heroData);
  return response.data;
};

export const toggleHeroStatus = async (id: string): Promise<void> => {
  await api.patch(`/heroes/${id}/toggle`);
};

export const deleteHero = async (id: string): Promise<void> => {
  await api.delete(`/heroes/${id}`);
};