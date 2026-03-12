import { prismaMock } from "../services/__mocks__/prisma";
import { HeroService } from "../services/hero.service";


describe('Hero Unit Tests', () => {
  
  it('should create a hero in the database logic', async () => {
    const heroData = {
      id: 1,
      name: 'Iron Man',
      power: 'Armor',
      active: true
    };

    prismaMock.hero.create.mockResolvedValue(heroData);

    const result = await HeroService.create({
      name: 'Iron Man',
      power: 'Armor'
    });

    expect(result.name).toBe('Iron Man');
    expect(prismaMock.hero.create).toHaveBeenCalledWith({
      data: { name: 'Iron Man', power: 'Armor', active: true }
    });
  });

  it('should throw an error if name is missing', async () => {
    await expect(HeroService.create({ name: '', power: 'Fly' }))
      .rejects
      .toThrow('Name is required');
  });
});