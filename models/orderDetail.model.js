module.exports = (connection, Sequelize) => {
    const OrderDetail = connection.define('order_detail', {
        OD_Id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        OD_orderId: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        OD_productId: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        OD_price: {
            type: Sequelize.STRING,
            allowNull: false
        },
        OD_discount: {
            type: Sequelize.STRING,
        },
        OD_count: {
            type: Sequelize.STRING,
        },
        OD_rowPrice: {
            type: Sequelize.STRING,
        },
        OD_identity: {
            type: Sequelize.STRING,
        },
        OD_DSC: {
            type: Sequelize.TEXT,
        },

    }, {
        indexes: [
            {
                using: 'BTREE',
                fields: ['OD_Id']
            },
        ]
    }
    )
    return OrderDetail
}