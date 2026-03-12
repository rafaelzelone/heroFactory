import request from 'supertest';
import { app } from '../../server'; 
import { describe, it, expect, beforeAll } from '@jest/globals';
import { prisma } from '../../lib/prisma';

describe('Hero API - Integration Tests', () => {
  let createdHeroId: string; 

  beforeAll(async () => {
    await prisma.hero.deleteMany();
  });

  it('should create a new hero', async () => {
    const response = await request(app)
      .post('/heroes')
      .send({
        name: 'Bruce Wayne',
        heroName: 'Batman',
        mainPower: 'Intelligence',
        universe: 'DC',
        dateBirth: '1939-05-27T00:00:00.000Z',
        avatarUrl: 'https://example.com/batman.jpg',
        active: true
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    createdHeroId = response.body.id;
  });

it('should list all heroes', async () => {
  const response = await request(app).get('/heroes');
  expect(response.status).toBe(200);
  
  const heroes = response.body.heroes || response.body; 
  
  expect(Array.isArray(heroes)).toBe(true);
  expect(heroes.length).toBeGreaterThan(0);
});

  it('should update an existing hero', async () => {
    const response = await request(app)
      .put(`/heroes/${createdHeroId}`)
      .send({
        name: 'Bruce Wayne Updated',
        heroName: 'The Dark Knight',
        mainPower: 'Wealth',
        universe: 'DC',
        dateBirth: '1939-05-27T00:00:00.000Z',
        active: true
      });

    expect(response.status).toBe(200);
    expect(response.body.heroName).toBe('The Dark Knight');
  });

  it('should toggle hero active status', async () => {
    const response = await request(app)
      .patch(`/heroes/${createdHeroId}/toggle`);

    expect(response.status).toBe(200);
  });

  it('should delete a hero', async () => {
    const response = await request(app)
      .delete(`/heroes/${createdHeroId}`);

    expect([200, 204]).toContain(response.status);
  });
});