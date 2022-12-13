import { z } from 'zod';
import NotificationError from '../../@shared/notification/notification.error';
import ValidatorInterface from '../../@shared/validator/validator.interface';
// eslint-disable-next-line import/no-cycle
import Product from '../entity/product';

export default class CustomerYupValidator
  implements ValidatorInterface<Product>
{
  validate(entity: Product): void {
    try {
      const ProductZod = z.object({
        name: z.string().min(1, 'Name is required'),
        id: z.string().min(1, 'Id is required'),
        price: z.number().min(0, 'Price must be greater than zero'),
      });

      ProductZod.parse(entity);
    } catch (error) {
      const zodError = error as z.ZodError;
      zodError.errors.forEach((fieldError) => {
        entity.notification.addError({
          context: 'product',
          message: fieldError.message,
        });
      });
      throw new NotificationError(entity.notification.getErrors());
    }
  }
}
