module.exports = (connection, Sequelize) => {
    const Shop = connection.define('shop', {
        shopId: {
            type: Sequelize.UUID,
            default:Sequelize.UUIDV4,
            primaryKey: true
        },
        shopTitle: {
            type: Sequelize.STRING,
            allowNull: false
        },
        shopIsActive: {
            type: Sequelize.BOOLEAN,
        },
        shopDSC: {
            type: Sequelize.TEXT,
        },
    }, {
        updatedAt: 'shopUpdatedAt',
        createdAt: 'shopCreatedAt',
        indexes: [
            {
                using: 'BTREE',
                fields: ['shopId']
            },
            {
                using: 'BTREE',
                fields: ['shopTitle']
            }
        ]
    }
    )
    return Shop
}