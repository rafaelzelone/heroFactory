import { Request, Response } from 'express';
import { HeroService } from '../services/hero.service';

/**
 * Controller handling HTTP requests for Hero-related operations.
 * Acts as an intermediary between the HTTP layer and the HeroService.
 */
export const HeroController = {
    /**
     * Handles GET requests to retrieve a paginated list of heroes.
     */
    async list(req: Request, res: Response) {
        try {
            const { page = 1, search = '' } = req.query;
            const result = await HeroService.list(Number(page), String(search));
            return res.json(result);
        } catch (error) {
            return res.status(500).json({ error: "Error retrieving heroes list" });
        }
    },

    /**
     * Handles POST requests to create a new hero.
     */
    async create(req: Request, res: Response) {
        try {
            const hero = await HeroService.create(req.body);
            return res.status(201).json(hero);
        } catch (error) {
            console.log(error)
            return res.status(400).json({ error: "Error creating hero" });
        }
    },

    /**
     * Handles PUT requests to update an existing hero.
     */
    async update(req: Request, res: Response) {
        try {
            const { id } = req.params;

            if (!id || typeof id !== 'string') {
                return res.status(400).json({ error: "Hero ID is missing or invalid" });
            }
            
            const hero = await HeroService.update(id, req.body);
            return res.json(hero);

        } catch (error: any) {
            // Specific business logic error handling
            if (error.message === "HERO_NOT_FOUND") {
                return res.status(404).json({ error: "Hero not found" });
            }

            if (error.message === "HERO_INACTIVE") {
                return res.status(403).json({ error: "Cannot update an inactive hero" });
            }

            return res.status(400).json({ error: "Error updating hero" });
        }
    },

    /**
     * Handles PATCH requests to toggle the active/inactive status.
     */
    async toggle(req: Request, res: Response) {
        try {
            const { id } = req.params;
            if (!id || typeof id !== 'string') {
                return res.status(400).json({ error: "Hero ID is missing or invalid" });
            }
            const hero = await HeroService.toggleStatus(id);
            return res.json(hero);
        } catch (error) {
            return res.status(404).json({ error: "Hero not found" });
        }
    },

    /**
     * Handles DELETE requests to remove a hero record.
     */
    async delete(req: Request, res: Response) {
        try {
            const { id } = req.params;
            if (!id || typeof id !== 'string') {
                return res.status(400).json({ error: "Hero ID is missing or invalid" });
            }
            await HeroService.delete(id);
            return res.status(204).send();
        } catch (error) {
            return res.status(400).json({ error: "Error deleting hero" });
        }
    }
};