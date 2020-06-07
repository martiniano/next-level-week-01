import express from 'express';
import multer from 'multer';
import multerConfig from './config/multer';
import { celebrate, Joi } from 'celebrate';

import PointsController from './controllers/PointsController';
const pointsController = new PointsController();

import ItemsController from './controllers/ItemsController';
const itemsController = new ItemsController();

const routes = express.Router();

const upload = multer(multerConfig);

routes.get('/items', itemsController.index);
routes.get('/points', pointsController.index);
routes.get('/points/:id', pointsController.show);

routes.post(
    '/points', 
    upload.single('image'), 
    celebrate({
        body:  Joi.object().keys({
            name: Joi.string().required(),
            email: Joi.string().required().email(),
            whatsapp: Joi.number().required(),
            latitude: Joi.number().invalid(0).required(),
            longitude: Joi.number().invalid(0).required(),
            city: Joi.string().invalid("0").required(),
            uf: Joi.string().invalid("0").required().max(2),
            items: Joi.string().required()
        })
    }, {
        abortEarly: false,
    }),
    pointsController.create);

export default routes;