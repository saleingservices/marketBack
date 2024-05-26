module.exports = (connection, Sequelize) => {
    const ProductSpec = connection.define('product_spec', {
        PS_Id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        PS_productId: {
            type: Sequelize.INTEGER,
            allowNull: false,           
        },        
        PS_specId: {
            type: Sequelize.STRING,
            allowNull: false,           
        },  
        PS_specValue: {
            type: Sequelize.STRING,
            allowNull: false,           
        },   
        PS_extraPrice: {
            type: Sequelize.STRING,
            defaultValue:'0'          
        },   
    }, {
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