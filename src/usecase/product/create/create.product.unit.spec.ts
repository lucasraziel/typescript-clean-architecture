import Product from '../../../domain/product/entity/product';
import CreateProductUseCase from './create.product.usecase';

const product = new Product('1', 'Product 1', 10);
const MockRepository = () => ({
  find: jest.fn().mockReturnValue(Promise.resolve(product)),
  findAll: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
});

describe('Test Create Product Use Case', () => {
  it('should create a product of type A', async () => {
    const productRepository = MockRepository();
    const usecase = new CreateProductUseCase(productRepository);

    const input = {
      name: 'Product 1',
      price: 10,
      type: 'a',
    };

    const output = {
      id: expect.any(String),
      name: 'Product 1',
      price: 10,
    };

    const result = await usecase.execute(input);

    expect(result).toEqual(output);
  });

  it('should create a product of type B', async () => {
    const productRepository = MockRepository();
    const usecase = new CreateProductUseCase(productRepository);

    const input = {
      name: 'Product 1',
      price: 10,
      type: 'b',
    };

    const output = {
      id: expect.any(String),
      name: 'Product 1',
      price: 20,
    };

    const result = await usecase.execute(input);

    expect(result).toEqual(output);
  });

  it('should not create a product with an inexistent type', async () => {
    const productRepository = MockRepository();
    const usecase = new CreateProductUseCase(productRepository);

    const input = {
      name: 'Product 1',
      price: 10,
      type: 'c',
    };

    expect(() => usecase.execute(input)).rejects.toThrow(
      'Product type not supported'
    );
  });

  it('should not create a product with an empty name', async () => {
    const productRepository = MockRepository();
    const usecase = new CreateProductUseCase(productRepository);

    const input = {
      name: '',
      price: 10,
      type: 'a',
    };

    expect(() => usecase.execute(input)).rejects.toThrow('Name is required');
  });

  it('should not create a product with negative Price', async () => {
    const productRepository = MockRepository();
    const usecase = new CreateProductUseCase(productRepository);

    const input = {
      name: 'produto 1',
      price: -10,
      type: 'a',
    };

    expect(() => usecase.execute(input)).rejects.toThrow(
      'Price must be greater than zero'
    );
  });
});
