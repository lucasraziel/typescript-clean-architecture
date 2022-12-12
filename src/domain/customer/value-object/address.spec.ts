import Address from './address';

describe('Address unit tests', () => {
  it('should throw error when street is empty', () => {
    expect(() => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const address = new Address('', 123, '13330-250', 'São Paulo');
    }).toThrowError('Street is required');
  });

  it('should throw error when number is less than zero', () => {
    expect(() => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const address = new Address('Street 1', -1, '13330-250', 'São Paulo');
    }).toThrowError('Number is required');
  });

  it('should throw error when zip code is empty', () => {
    expect(() => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const address = new Address('Street 1', 123, '', 'São Paulo');
    }).toThrowError('Zip is required');
  });

  it('should throw error when city is empty', () => {
    expect(() => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const address = new Address('Street 1', 123, '13330-250', '');
    }).toThrowError('City is required');
  });
});
