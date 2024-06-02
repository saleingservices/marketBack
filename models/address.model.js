module.exports = (connection, Sequelize) => {
    const Address = connection.define('address', {
        addressId: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        addressCityId: {
            type: Sequelize.INTEGER,
        },
        addressInfo: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        addressZip: {
            type: Sequelize.STRING(15),
        },
        addressUserId: {
            type: Sequelize.UUID,
            allowNull: false
        }
    }, {
        updatedAt: 'addressUpdatedAt',
        createdAt: 'addressCreatedAt',
        indexes: [
            {
                using: 'BTREE',
                fields: ['addressId']
            }
        ]
    }
    )
    return Address
}