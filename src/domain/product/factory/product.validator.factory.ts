/* eslint-disable import/no-cycle */
import ValidatorInterface from '../../@shared/validator/validator.interface';
import Product from '../entity/product';
import ProductZodValidator from '../validator/product.zod.validator';

export default class ProductValidatorFactory {
  static create(): ValidatorInterface<Product> {
    return new ProductZodValidator();
  }
}
