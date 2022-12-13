import { z } from 'zod';
import ValidatorInterface from '../../@shared/validator/validator.interface';
// eslint-disable-next-line import/no-cycle
import Customer from '../entity/customer';

export default class CustomerYupValidator
  implements ValidatorInterface<Customer>
{
  validate(entity: Customer): void {
    try {
      const CustomerZod = z.object({
        name: z.string().min(1, 'Name is required'),
        id: z.string().min(1, 'Id is required'),
      });

      CustomerZod.parse(entity);
    } catch (error) {
      const zodError = error as z.ZodError;
      zodError.errors.forEach((fieldError) => {
        entity.notification.addError({
          context: 'customer',
          message: fieldError.message,
        });
      });
    }
  }
}
