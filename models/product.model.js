module.exports = (connection, Sequelize) => {
    const Product = connection.define('product', {
        productId: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        productTitle: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        productUniqueName: {
            type: Sequelize.STRING,
            set(value) {
                this.setDataValue('productUniqueName', value.trim().toLowerCase())
            },
            allowNull: false,
        },
        productShopId: {
            type: Sequelize.UUID,
            allowNull: false,
        },
        productDiscount: {
            type: Sequelize.STRING,
        },
        productEntity: {
            type: Sequelize.STRING,
        },       
        productDSC: {
            type: Sequelize.TEXT,
        },
        productIsFile: {
            type: Sequelize.BOOLEAN,
        },
        productIsIdentity: {
            type: Sequelize.BOOLEAN,
        },
        productIsActive: {
            type: Sequelize.BOOLEAN,
        },
    },
        {
            updatedAt: 'productUpdatedAt',
            createdAt: 'productCreatedAt',
            indexes: [
                {
                    using: 'BTREE',
                    fields: ['productId']
                },
                {
                    using: 'BTREE',
                    fields: ['productTitle']
                },
                {
                    using: 'BTREE',
                    fields: ['productUniqueName']
                },
                {
                    using: 'BTREE',
                    fields: ['productIsFile']
                },
                {
                    using: 'BTREE',
                    fields: ['productIsIdentity']
                },
                {
                    using: 'BTREE',
                    fields: ['productIsActive']
                },                
                {
                    unique: true,
                    fields: ['productUniqueName','productShopId']
                },

            ]
        }
    )

    return Product
}