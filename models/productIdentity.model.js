module.exports = (connection, Sequelize) => {
    const ProductIdentity = connection.define('product_identity', {
        PI_Id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        PI_productId: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        PI_value: {
            type: Sequelize.STRING,
        },
        PI_used: {
            type: Sequelize.INTEGER,
        },
        PI_count: {
            type: Sequelize.INTEGER,
        },
    }, {
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