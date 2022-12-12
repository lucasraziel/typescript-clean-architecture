import Customer from '../../../domain/customer/entity/customer';
import CustomerRepositoryInterface from '../../../domain/customer/repository/customer-repository.interface';
import {
  InputListCustomerDto,
  OutputListCustomerDto,
} from './list.customer.dto';

class OutputMapper {
  static toOutput(customers: Customer[]): OutputListCustomerDto {
    return {
      customers: customers.map((customer) => ({
        id: customer.id,
        name: customer.name,
        address: {
          street: customer.Address.street,
          number: customer.Address.number,
          zip: customer.Address.zip,
          city: customer.Address.city,
        },
      })),
    };
  }
}

export default class ListCustomerUseCase {
  private customerRepository: CustomerRepositoryInterface;

  constructor(CustomerRepository: CustomerRepositoryInterface) {
    this.customerRepository = CustomerRepository;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async execute(input: InputListCustomerDto): Promise<OutputListCustomerDto> {
    const customers = await this.customerRepository.findAll();
    return OutputMapper.toOutput(customers);
  }
}
