import Order from '../../../../domain/checkout/entity/order';
import OrderItem from '../../../../domain/checkout/entity/order_item';
import OrderRepositoryInterface from '../../../../domain/checkout/repository/order-repository.interface';
import OrderItemModel from './order-item.model';
import OrderModel from './order.model';

export default class OrderRepository implements OrderRepositoryInterface {
    async create(entity: Order): Promise<void> {
        await OrderModel.create(
            {
                id: entity.id,
                customer_id: entity.customerId,
                total: entity.total(),
                items: entity.items.map((item) => ({
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    product_id: item.productId,
                    quantity: item.quantity,
                })),
            },
            {
                include: ['items'],
            }
        );
    }

    async update(entity: Order): Promise<void> {
        if (!OrderModel.sequelize) {
            throw new Error('Sequelize not found');
        }
        const transaction = await OrderModel.sequelize.transaction();
        try {
            await OrderModel.update(
                {
                    id: entity.id,
                    customer_id: entity.customerId,
                    total: entity.total(),
                },
                {
                    where: { id: entity.id },
                    transaction,
                }
            );

            const promises = entity.items.map((item) =>
                OrderItemModel.update(
                    {
                        name: item.name,
                        price: item.price,
                        product_id: item.productId,
                        quantity: item.quantity,
                    },
                    {
                        where: { id: item.id },
                        transaction,
                    }
                )
            );
            await Promise.all(promises);
            transaction.commit();
        } catch (error) {
            transaction.rollback();
        }
    }

    async find(id: string): Promise<Order> {
        const orderModel = await OrderModel.findOne({
            where: { id },
            include: ['items'],
        });
        if (!orderModel) {
            throw new Error('Order not found');
        }

        const items = orderModel.items.map(
            (item) =>
                new OrderItem(
                    item.id,
                    item.name,
                    item.price,
                    item.product_id,
                    item.quantity
                )
        );
        return new Order(orderModel.id, orderModel.customer_id, items);
    }

    async findAll(): Promise<Order[]> {
        const orderModels = await OrderModel.findAll({
            include: [{ model: OrderItemModel }],
        });
        return orderModels.map((orderModel) => {
            const items = orderModel.items.map(
                (item) =>
                    new OrderItem(
                        item.id,
                        item.name,
                        item.price,
                        item.product_id,
                        item.quantity
                    )
            );

            return new Order(orderModel.id, orderModel.customer_id, items);
        });
    }
}
