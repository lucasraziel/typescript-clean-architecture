import Product from '../../../domain/product/entity/product';
import ProductRepository from '../../../infrastructure/product/repository/sequelize/product.repository';
import { InputListProductDto, OutputListProductDto } from './list.product.dto';

class OutputMapper {
  static toOutput(products: Product[]): OutputListProductDto {
    return {
      products: products.map((product) => ({
        id: product.id,
        name: product.name,
        price: product.price,
      })),
    };
  }
}

export default class ListProductUseCase {
  private productRepository: ProductRepository;

  constructor(productRepository: ProductRepository) {
    this.productRepository = productRepository;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async execute(input: InputListProductDto): Promise<OutputListProductDto> {
    const products = await this.productRepository.findAll();
    return OutputMapper.toOutput(products);
  }
}
