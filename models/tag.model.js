module.exports = (connection, Sequelize) => {
    const Tag = connection.define('tag', {
        tagId: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        tagText: {
            type: Sequelize.STRING,
            allowNull: false,
            set(value) {
                this.setDataValue('tagText', value.trim().toLowerCase().replaceAll(' ', '_'))
            },
            unique: {
                args: true,
                msg: 'این  عنوان قبلا استفاده شده است'
            }
        },
        tagIsActive: {
            type: Sequelize.BOOLEAN
        },
        tagUserId: {
            type: Sequelize.UUID,
        }
    }, {
        updatedAt: 'tagUpdatedAt',
        createdAt: 'tagCreatedAt',
        indexes: [
            {
                using: 'BTREE',
                fields: ['tagId']
            },
            {
                using: 'BTREE',
                fields: ['tagText']
            },
        ]
    }
    )
    return Tag
}