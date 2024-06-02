module.exports = (connection, Sequelize) => {
    const OrderDetail = connection.define('order_detail', {
        OD_Id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        OD_OrderId: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        OD_ProductId: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        OD_Price: {
            type: Sequelize.STRING,
            allowNull: false
        },
        OD_Discount: {
            type: Sequelize.STRING,
        },
        OD_Count: {
            type: Sequelize.STRING,
        },
        OD_RowPrice: {
            type: Sequelize.STRING,
        },
        OD_Identity: {
            type: Sequelize.STRING,
        },
        OD_DSC: {
            type: Sequelize.TEXT,
        },

    }, {
        updatedAt: 'OD_UpdatedAt',
        createdAt: 'OD_CreatedAt',
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