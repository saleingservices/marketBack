module.exports = (connection, Sequelize) => {
    const Category = connection.define('category', {
        categoryId: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        categoryTitle: {
            type: Sequelize.STRING,
            allowNull: false
        },
        categoryUniqueName: {
            type: Sequelize.STRING,
            allowNull: false,
            set(value) {
                this.setDataValue('categoryUniqueName', value.trim().toLowerCase())
            },
        }, 
        categoryParentId: {
            type: Sequelize.INTEGER,
        }, 
        categoryShopId: {
            type: Sequelize.UUID,
            allowNull: false,
        }, 
        categoryIsActive: {
            type: Sequelize.BOOLEAN,
        },
        categoryDSC: {
            type: Sequelize.TEXT,
        },
    }, {
        updatedAt: 'categoryUpdatedAt',
        createdAt: 'categoryCreatedAt',
        indexes: [
            {
                using: 'BTREE',
                fields: ['categoryId']
            },
            {
                unique: true,
                fields: ['categoryUniqueName','categoryShopId']
            },
        ]
    }
    )
    return Category
}