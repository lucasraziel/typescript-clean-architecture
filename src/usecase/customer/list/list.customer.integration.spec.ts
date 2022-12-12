import { Sequelize } from 'sequelize-typescript';
import Customer from '../../../domain/customer/entity/customer';
import Address from '../../../domain/customer/value-object/address';
import CustomerModel from '../../../infrastructure/customer/repository/sequelize/customer.model';
import CustomerRepository from '../../../infrastructure/customer/repository/sequelize/customer.repository';
import ListCustomersUseCase from './list.customer.usecase';

describe('Test list customer use case', () => {
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
    const usecase = new ListCustomersUseCase(customerRepository);

    const customer = new Customer('123', 'John');
    const address = new Address('Street', 123, 'Zip', 'City');
    customer.changeAddress(address);

    await customerRepository.create(customer);

    const customer2 = new Customer('1234', 'Lenon');
    const address2 = new Address('Street', 1233, 'Zip', 'City');
    customer2.changeAddress(address2);

    await customerRepository.create(customer2);

    const input = {};

    const output = {
      customers: [
        {
          id: '123',
          name: 'John',
          address: {
            street: 'Street',
            city: 'City',
            number: 123,
            zip: 'Zip',
          },
        },
        {
          id: '1234',
          name: 'Lenon',
          address: {
            street: 'Street',
            city: 'City',
            number: 1233,
            zip: 'Zip',
          },
        },
      ],
    };

    const result = await usecase.execute(input);

    expect(result).toEqual(output);
  });
});
