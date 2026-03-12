import request from 'supertest';
import { app } from '../server'; 
import { describe, it, expect, beforeAll } from '@jest/globals';
import { prisma } from '../lib/prisma';

describe('Hero API - Integration Tests', () => {
  let createdHeroId: string; 

  beforeAll(async () => {
    await prisma.hero.deleteMany();
  });

  it('should create a new hero', async () => {
    const response = await request(app)
      .post('/heroes')
      .send({
        name: 'Batman',
        power: 'Intelligence',
        active: true
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    createdHeroId = response.body.id;
  });

  it('should list all heroes', async () => {
    const response = await request(app).get('/heroes');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should update an existing hero', async () => {
    const response = await request(app)
      .put(`/heroes/${createdHeroId}`)
      .send({
        name: 'Batman Updated',
        power: 'Tech',
        active: true
      });

    expect(response.status).toBe(200);
    expect(response.body.name).toBe('Batman Updated');
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