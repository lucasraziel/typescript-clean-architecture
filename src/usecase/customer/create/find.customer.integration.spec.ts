import { Sequelize } from 'sequelize-typescript';
import CustomerModel from '../../../infrastructure/customer/repository/sequelize/customer.model';
import CustomerRepository from '../../../infrastructure/customer/repository/sequelize/customer.repository';
import CreateCustomerUseCase from './create.customer.usecase';

describe('Test find customer use case', () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([CustomerModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it('should find a customer', async () => {
    const customerRepository = new CustomerRepository();
    const usecase = new CreateCustomerUseCase(customerRepository);

    const customerOutputDTO = await usecase.execute({
      name: 'John',
      address: {
        street: 'Street',
        number: 123,
        zip: 'Zip',
        city: 'City',
      },
    });

    expect(customerOutputDTO.id).not.toBeFalsy();
    expect(customerOutputDTO.name).toBe('John');
    expect(customerOutputDTO.address).toStrictEqual({
      street: 'Street',
      number: 123,
      zip: 'Zip',
      city: 'City',
    });
  });
});
