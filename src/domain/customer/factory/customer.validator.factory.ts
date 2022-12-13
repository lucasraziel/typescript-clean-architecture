/* eslint-disable import/no-cycle */
import ValidatorInterface from '../../@shared/validator/validator.interface';
import Customer from '../entity/customer';
import CustomerYupValidator from '../validator/customer.zod.validator';

export default class CustomerValidatorFactory {
  static create(): ValidatorInterface<Customer> {
    return new CustomerYupValidator();
  }
}
