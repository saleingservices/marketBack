module.exports = (connection, Sequelize) => {
    const ProductSpec = connection.define('product_spec', {
        PS_Id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        PS_ProductId: {
            type: Sequelize.INTEGER,
            allowNull: false,           
        },        
        PS_SpecId: {
            type: Sequelize.STRING,
            allowNull: false,           
        },  
        PS_SpecValue: {
            type: Sequelize.STRING,
            allowNull: false,           
        },   
        PS_ExtraPrice: {
            type: Sequelize.STRING,
            defaultValue:'0'          
        },   
    }, {
        updatedAt: 'PS_UpdatedAt',
        createdAt: 'PS_CreatedAt',
        indexes: [
            {
                using: 'BTREE',
                fields: ['PS_specId']
            },
            {
                unique: true,
                fields: ['PS_specId','PS_productId']
            },
        ]
    }
    )
    return ProductSpec
}