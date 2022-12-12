import RepositoryInterface from '../../@shared/repository/repository-interface';
import ProductInterface from '../entity/product.interface';

type ProductRepositoryInterface = RepositoryInterface<ProductInterface>;

export default ProductRepositoryInterface;
