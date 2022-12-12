import request from 'supertest';
import { app, sequelize } from '../../../@shared/api/express';

describe('E2E test for product', () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it('should create a product type A', async () => {
    const response = await request(app).post('/product').send({
      name: 'Product 1',
      type: 'a',
      price: 100,
    });
    expect(response.status).toBe(200);
    expect(response.body.name).toBe('Product 1');
    expect(response.body.price).toBe(100);
  });

  it('should create a product type B', async () => {
    const response = await request(app).post('/product').send({
      name: 'Product 1',
      type: 'b',
      price: 100,
    });

    expect(response.status).toBe(200);
    expect(response.body.name).toBe('Product 1');
    expect(response.body.price).toBe(200);
  });

  it('should not create a product when price <0', async () => {
    const response = await request(app).post('/product').send({
      name: 'Product 1',
      price: -100,
      type: 'a',
    });
    expect(response.status).toBe(500);
  });

  it('should not create a product when name is empty', async () => {
    const response = await request(app).post('/product').send({
      name: '',
      price: 100,
      type: 'a',
    });
    expect(response.status).toBe(500);
  });

  it('should not create a product when type is wrong', async () => {
    const response = await request(app).post('/product').send({
      name: 'Product 1',
      price: 100,
      type: 'c',
    });
    expect(response.status).toBe(500);
  });

  it('should list all products', async () => {
    const response = await request(app).post('/product').send({
      name: 'Product 1',
      type: 'a',
      price: 100,
    });
    expect(response.status).toBe(200);

    const response2 = await request(app).post('/product').send({
      name: 'Product 2',
      type: 'b',
      price: 100,
    });
    expect(response2.status).toBe(200);

    const listResponse = await request(app).get('/product').send();

    expect(listResponse.status).toBe(200);
    expect(listResponse.body.products.length).toBe(2);
    const product = listResponse.body.products[0];
    expect(product.name).toBe('Product 1');
    expect(product.price).toBe(100);
    const product2 = listResponse.body.products[1];
    expect(product2.name).toBe('Product 2');
    expect(product2.price).toBe(200);

    const listResponseXML = await request(app)
      .get('/product')
      .set('Accept', 'application/xml')
      .send();

    expect(listResponseXML.status).toBe(200);
    expect(listResponseXML.text).toContain(
      `<?xml version="1.0" encoding="UTF-8"?>`
    );
    expect(listResponseXML.text).toContain(`<products>`);
    expect(listResponseXML.text).toContain(`<product>`);
    expect(listResponseXML.text).toContain(`<name>Product 1</name>`);
    expect(listResponseXML.text).toContain(`<price>100</price>`);
    expect(listResponseXML.text).toContain(`</product>`);
    expect(listResponseXML.text).toContain(`<name>Product 1</name>`);
    expect(listResponseXML.text).toContain(`<price>200</price>`);
    expect(listResponseXML.text).toContain(`</products>`);
  });
});
