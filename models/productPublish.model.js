module.exports = (connection, Sequelize) => {
    const ProductPublish = connection.define('product_publish', {
        PP_Id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        PP_productId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            unique: true,
        },
        PP_startTime: {
            type: Sequelize.STRING,
        },
        PP_endTime: {
            type: Sequelize.STRING,
        },
        PP_effect: {
            type: Sequelize.INTEGER,
        },
    }, {
        indexes: [
            {
                using: 'BTREE',
                fields: ['PP_id']
            },
        ]
    }
    )
    return ProductPublish
}