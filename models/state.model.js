module.exports = (connection, Sequelize) => {
    const State = connection.define('state', {
        stateId: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        stateName: {
            type: Sequelize.STRING,
            allowNull: false
        }
    }, {
        timestamps: false,
        indexes: [
            {
                using: 'BTREE',
                fields: ['stateId']
            },
            {
                using: 'BTREE',
                fields: ['stateName']
            }
        ]
    }
    )
    return State
}