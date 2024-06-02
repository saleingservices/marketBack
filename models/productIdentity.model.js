module.exports = (connection, Sequelize) => {
    const ProductIdentity = connection.define('product_identity', {
        PI_Id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        PI_ProductId: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        PI_Value: {
            type: Sequelize.STRING,
        },
        PI_Used: {
            type: Sequelize.INTEGER,
        },
        PI_Count: {
            type: Sequelize.INTEGER,
        },
    }, {
        updatedAt: 'PI_UpdatedAt',
        createdAt: 'PI_CreatedAt',
        indexes: [
            {
                using: 'BTREE',
                fields: ['PI_Id']
            }
        ]
    }
    )
    return ProductIdentity
}