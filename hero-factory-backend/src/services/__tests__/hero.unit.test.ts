import { prismaMock } from "../__mocks__/prisma";
import { HeroService } from "../hero.service";

describe('Hero Unit Tests', () => {

  it('should create a hero in the database logic', async () => {
    const heroData = {
      id: '1',
      name: 'Tony Stark',
      heroName: 'Iron Man',           
      mainPower: 'Intelligence',
      universe: 'Marvel',
      dateBirth: new Date('1970-05-29'), 
      avatarUrl: 'https://example.com/ironman.jpg', 
      active: true,
      created_at: new Date(),
      updated_at: new Date(),
    };

    prismaMock.hero.create.mockResolvedValue(heroData);

    const result = await HeroService.create({
      name: 'Tony Stark',
      heroName: 'Iron Man',
      mainPower: 'Intelligence',
      universe: 'Marvel',
      dateBirth: new Date('1970-05-29'),
    });

    expect(result.heroName).toBe('Iron Man');
    expect(result).toHaveProperty('id');
    expect(prismaMock.hero.create).toHaveBeenCalledWith({
      data: expect.objectContaining({
        name: 'Tony Stark',
        heroName: 'Iron Man'
      })
    });
  });
});