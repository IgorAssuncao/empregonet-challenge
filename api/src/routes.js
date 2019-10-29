import { Router } from 'express';

import UserController from './app/controllers/UserController';

const routes = new Router();

routes.get('/', async (request, response) => {
  return response.json({ message: 'Hello, world' });
});

routes.get('/users', UserController.list);
routes.post('/users', UserController.create);

export default routes;
