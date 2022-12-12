import { Sequelize } from 'sequelize-typescript';
import ProductModel from '../../../infrastructure/product/repository/sequelize/product.model';
import ProductRepository from '../../../infrastructure/product/repository/sequelize/product.repository';
import CreateProductUseCase from './create.product.usecase';

describe('Test integration find product use case', () => {
  let sequelize: Sequelize;
  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    });
    await sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it('should find a product of type a', async () => {
    const productRepository = new ProductRepository();

    const usecase = new CreateProductUseCase(productRepository);

    const input = {
      type: 'a',
      name: 'Product',
      price: 10,
    };

    const output = {
      id: expect.any(String),
      name: 'Product',
      price: 10,
    };
    const result = await usecase.execute(input);
    expect(result).toEqual(output);
  });

  it('should find a product of type b', async () => {
    const productRepository = new ProductRepository();

    const usecase = new CreateProductUseCase(productRepository);

    const input = {
      type: 'a',
      name: 'Product',
      price: 10,
    };

    const output = {
      id: expect.any(String),
      name: 'Product',
      price: 10,
    };
    const result = await usecase.execute(input);
    expect(result).toEqual(output);
  });
});
