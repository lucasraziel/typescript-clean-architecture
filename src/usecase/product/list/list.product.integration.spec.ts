import { Sequelize } from 'sequelize-typescript';
import Product from '../../../domain/product/entity/product';
import ProductModel from '../../../infrastructure/product/repository/sequelize/product.model';
import ProductRepository from '../../../infrastructure/product/repository/sequelize/product.repository';
import ListProductUseCase from './list.product.usecase';

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

  it('should find all products', async () => {
    const productRepository = new ProductRepository();

    const product = new Product('123', 'Product', 10);

    const product2 = new Product('1233', 'Product2', 100);

    await productRepository.create(product);

    await productRepository.create(product2);

    const usecase = new ListProductUseCase(productRepository);

    const input = {};
    const productDto1 = {
      id: '123',
      name: 'Product',
      price: 10,
    };

    const productDto2 = {
      id: '1233',
      name: 'Product2',
      price: 100,
    };

    const output = {
      products: [productDto1, productDto2],
    };
    const result = await usecase.execute(input);
    expect(result).toEqual(output);
  });
});
