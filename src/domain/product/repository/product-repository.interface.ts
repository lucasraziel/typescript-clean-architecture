import RepositoryInterface from '../../@shared/repository/repository-interface';
import Product from '../entity/product';
import ProductInterface from '../entity/product.interface';

type ProductRepositoryInterface = RepositoryInterface<ProductInterface>;

export default ProductRepositoryInterface;
