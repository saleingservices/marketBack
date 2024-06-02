module.exports = (connection, Sequelize) => {
    const Order = connection.define('order', {
        orderId: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        orderUserId: {
            type: Sequelize.UUID,
        },
        orderGuestId: {
            type: Sequelize.UUID,
        },
        orderShopId: {
            type: Sequelize.UUID,
            allowNull: false
        },
        orderDate: {
            type: Sequelize.STRING,
            allowNull: false
        },
        orderFinalPrice: {
            type: Sequelize.STRING,
        },
        orderStatus: {
            type: Sequelize.INTEGER,
        },
        orderAddressId: {
            type: Sequelize.INTEGER,
        },
        orderShippingPrice: {
            type: Sequelize.STRING,
        },
    }, {
        updatedAt: 'orderUpdatedAt',
        createdAt: 'orderCreatedAt',
        indexes: [
            {
                using: 'BTREE',
                fields: ['orderId']
            },
            {
                using: 'BTREE',
                fields: ['orderStatus']
            }
        ]
    }
    )
    return Order
}