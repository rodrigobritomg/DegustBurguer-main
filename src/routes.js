import { Router } from 'express';
import multer from "multer";
import multerConfig from "./config/multer";
import authMiddleware from './app/middlewares/auth';

import UserContoller from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import ProductController from './app/controllers/ProductController';
import CategoryController from './app/controllers/CategoryController';
import OrderController from './app/controllers/OrderController';

const routes = new Router()

const upload = multer(multerConfig);

routes.post('/users', UserContoller.store);
routes.post('/session', SessionController.store);

routes.use(authMiddleware);

//Configuração da rota Products
routes.post('/products', upload.single("file"), ProductController.store);//upload de um só arquivo no campo 'file'
routes.put('/products/:id', upload.single("file"), ProductController.update);
routes.get('/products', ProductController.index);


//Configuração da rota Categories
routes.post('/categories', CategoryController.store);
routes.put("/categories/:id", upload.single("file"), CategoryController.update);
routes.get('/categories', CategoryController.index);

//Configuração da rota Orders
routes.post('/orders', OrderController.store);
routes.get('/orders', OrderController.index);
routes.put('/orders/:id', OrderController.update);

export default routes;