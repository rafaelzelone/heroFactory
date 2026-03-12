import { Router } from 'express';
import { HeroController } from '../controllers/hero.controller';

const routes = Router();

routes.get('/heroes', HeroController.list);
routes.post('/heroes', HeroController.create);
routes.put('/heroes/:id', HeroController.update);
routes.patch('/heroes/:id/toggle', HeroController.toggle); 
routes.delete('/heroes/:id', HeroController.delete);

export { routes };