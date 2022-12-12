import Product from '../../../domain/product/entity/product';
import CreateProductUseCase from './list.product.usecase';

const product = new Product('1', 'Product 1', 10);
const product2 = new Product('2', 'Product 2', 100);

const MockRepository = () => ({
  find: jest.fn(),
  findAll: jest.fn().mockReturnValue(Promise.resolve([product, product2])),
  create: jest.fn(),
  update: jest.fn(),
});

describe('Test Create Product Use Case', () => {
  it('should create a product of type A', async () => {
    const productRepository = MockRepository();
    const usecase = new CreateProductUseCase(productRepository);

    const input = {};

    const productDto1 = {
      id: '1',
      name: 'Product 1',
      price: 10,
    };

    const productDto2 = {
      id: '2',
      name: 'Product 2',
      price: 100,
    };

    const output = {
      products: [productDto1, productDto2],
    };

    const result = await usecase.execute(input);

    expect(result).toEqual(output);
  });
});
