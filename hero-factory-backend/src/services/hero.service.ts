import { prisma } from '../lib/prisma';

/**
 * Service responsible for Hero entity business logic and database interactions.
 */
export const HeroService = {
  /**
   * Retrieves a paginated list of heroes based on a search term.
   * Searches against both 'name' and 'nickname' fields.
   * * @param page - The current page number to retrieve.
   * @param search - The string to filter heroes by name or nickname.
   * @returns A pagination object containing the heroes list and metadata.
   */
  async list(page: number, search: string) {
    const limit = 10;
    const currentPage = page || 1;
    const skip = (currentPage - 1) * limit;

    const whereClause = {
      OR: [
        { name: { contains: search } },
        { heroName: { contains: search } }
      ]
    };

    // Executes both the data query and count query in parallel for better performance
    const [heroes, total] = await Promise.all([
      prisma.hero.findMany({
        where: whereClause,
        orderBy: { created_at: 'desc' },
        take: limit,
        skip: skip
      }),
      prisma.hero.count({ where: whereClause })
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
      heroes,
      total,
      pages: totalPages,
      currentPage,
      nextPage: currentPage < totalPages ? currentPage + 1 : null,
      prevPage: currentPage > 1 ? currentPage - 1 : null
    };
  },

  /**
   * Creates a new hero record.
   * * @param data - The hero data (automatically converts dateBirth string to Date object).
   * @returns The created hero object.
   */
  async create(data: any) {
    const birthDate = new Date(data.dateBirth);

    if (isNaN(birthDate.getTime())) {
      throw new Error("Invalid birthDate");
    }

    return await prisma.hero.create({
      data: {
        name: data.name,
        heroName: data.heroName,
        dateBirth: birthDate,
        universe: data.universe,
        mainPower: data.mainPower,
        avatarUrl: data.avatarUrl
      }
    });
  },
  /**
   * Updates an existing hero by ID.
   * Validates if the hero exists and is currently active before updating.
   * * @param id - The unique identifier of the hero.
   * @param data - The fields to be updated.
   * @throws Error "HERO_NOT_FOUND" if ID doesn't exist.
   * @throws Error "HERO_INACTIVE" if the hero is disabled.
   * @returns The updated hero object.
   */
  async update(id: string, data: any) {
    const hero = await prisma.hero.findUnique({ where: { id } });

    if (!hero) throw new Error("HERO_NOT_FOUND");
    if (!hero.active) throw new Error("HERO_INACTIVE");

    return await prisma.hero.update({
      where: { id },
      data: {
        ...data,
        dateBirth: data.dateBirth ? new Date(data.dateBirth) : hero.dateBirth
      }
    });
  },

  /**
   * Inverts the 'active' status of a hero (Enable/Disable).
   * * @param id - The unique identifier of the hero.
   * @throws Error "HERO_NOT_FOUND" if ID doesn't exist.
   * @returns The hero object with the toggled status.
   */
  async toggleStatus(id: string) {
    const hero = await prisma.hero.findUnique({ where: { id } });
    if (!hero) throw new Error("HERO_NOT_FOUND");

    return await prisma.hero.update({
      where: { id },
      data: { active: !hero.active }
    });
  },

  /**
   * Hard deletes a hero record from the database.
   * * @param id - The unique identifier of the hero to delete.
   * @returns The deleted hero record.
   */
  async delete(id: string) {
    return await prisma.hero.delete({ where: { id } });
  }
};