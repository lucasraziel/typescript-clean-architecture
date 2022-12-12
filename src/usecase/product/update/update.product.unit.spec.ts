import Product from '../../../domain/product/entity/product';
import UpdateProductUsecase from './update.product.usecase';

const product = new Product('1', 'Product 1', 10);
const MockRepository = () => ({
  find: jest.fn().mockReturnValue(Promise.resolve(product)),
  findAll: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
});

describe('Update product use case', () => {
  it('should update a product', async () => {
    const productRepository = MockRepository();
    const usecase = new UpdateProductUsecase(productRepository);

    const input = {
      id: '1',
      name: 'Product 1 Updated',
      price: 20,
    };

    const output = await usecase.execute(input);

    expect(output).toEqual(input);
  });

  it('should not update a inexistent', async () => {
    const productRepository = MockRepository();
    const usecase = new UpdateProductUsecase(productRepository);

    productRepository.find.mockRejectedValueOnce(
      new Error('Product not found')
    );

    const input = {
      id: '1',
      name: 'Product 1 Updated',
      price: 20,
    };

    await expect(() => usecase.execute(input)).rejects.toThrowError(
      'Product not found'
    );
  });
});
