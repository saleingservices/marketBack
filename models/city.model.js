module.exports = (connection, Sequelize) => {
    const City = connection.define('city', {
        cityId: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        cityStateId: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        cityName: {
            type: Sequelize.STRING,
            allowNull: false
        }
    }, {
        indexes: [
            {
                using: 'BTREE',
                fields: ['cityStateId']
            },
            {
                using: 'BTREE',
                fields: ['cityId']
            },
            {
                using: 'BTREE',
                fields: ['cityName']
            }
        ]
    }
    )
    return City
}