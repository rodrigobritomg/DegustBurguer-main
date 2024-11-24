import { Router } from 'express';
import { password } from './config/database';
import UserContoller from './app/controllers/UserController';

const routes = new Router()

routes.post('/users', UserContoller.store);

export default routes;