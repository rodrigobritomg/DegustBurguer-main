import { Router } from 'express';
import multer from "multer";
import multerConfig from "./config/multer";
import UserContoller from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import ProductController from './app/controllers/ProductController';
import CateryController from './app/controllers/CategoryController';
import authMiddleware from './middlewares/auth';

const routes = new Router()

const upload = multer(multerConfig);

routes.post('/users', UserContoller.store);
routes.post('/session', SessionController.store);

routes.post('/products', upload.single("file"), ProductController.store);
routes.get('/products', authMiddleware, ProductController.index);
routes.post('/categories', CateryController.store);
routes.get('/categories', CateryController.index);

export default routes;