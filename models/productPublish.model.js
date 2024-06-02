module.exports = (connection, Sequelize) => {
    const ProductPublish = connection.define('product_publish', {
        PP_Id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        PP_ProductId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            unique: true,
        },
        PP_StartTime: {
            type: Sequelize.STRING,
        },
        PP_EndTime: {
            type: Sequelize.STRING,
        },
        PP_Effect: {
            type: Sequelize.INTEGER,
        },
    }, {
        updatedAt: 'PP_UpdatedAt',
        createdAt: 'PP_CreatedAt',
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