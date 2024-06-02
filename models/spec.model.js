module.exports = (connection, Sequelize) => {
    const Spec = connection.define('spec', {
        specId: {
            type: Sequelize.STRING,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false,
            set(value) {
                this.setDataValue('specId', value.trim().toLowerCase())
            },
            unique: {
				args: true,
				msg: 'این  نام قبلا استفاده شده است'
			}
        },        
        specTilte: {
            type: Sequelize.STRING,
            allowNull: false,
            set(value) {
                this.setDataValue('specTilte', value.trim().toLowerCase())
            },
            unique: {
				args: true,
				msg: 'این  عنوان قبلا استفاده شده است'
			}
        },   
    }, {
        updatedAt: 'specUpdatedAt',
        createdAt: 'specCreatedAt',
        indexes: [
            {
                using: 'BTREE',
                fields: ['specId']
            },
        ]
    }
    )
    return Spec
}