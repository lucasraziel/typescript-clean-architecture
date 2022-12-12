import express, { Express } from 'express';
import { Sequelize } from 'sequelize-typescript';
import { customerRoute } from '../../customer/api/routes/customer.routes';
import CustomerModel from '../../customer/repository/sequelize/customer.model';
import { productRoute } from '../../product/api/route/product.route';
import ProductModel from '../../product/repository/sequelize/product.model';
import logMiddleware from './log/log.middleware';

export const app: Express = express();
app.use(express.json());
app.use(logMiddleware);
app.use('/customer', customerRoute);
app.use('/product', productRoute);

// eslint-disable-next-line import/no-mutable-exports
export let sequelize: Sequelize;

async function setupDb() {
  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: ':memory:',
    logging: false,
  });
  await sequelize.addModels([CustomerModel, ProductModel]);
  await sequelize.sync();
}
setupDb();
