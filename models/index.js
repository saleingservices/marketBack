const connection = require('../configs/connection.config')
const Sequelize = require('sequelize')
const db = {}

db.Sequelize = Sequelize
db.Op = Sequelize.Op
db.connection = connection


// address table
db.address = require('./address.model.js')(connection, Sequelize)
// category table
db.category = require('./category.model.js')(connection, Sequelize)
// city table
db.city = require('./city.model.js')(connection, Sequelize)
// order table
db.order = require('./order.model.js')(connection, Sequelize)
// orderDetail table
db.orderDetail = require('./orderDetail.model.js')(connection, Sequelize)
// product table
db.product = require('./product.model.js')(connection, Sequelize)
// productIdentity table
db.productIdentity = require('./productIdentity.model.js')(connection, Sequelize)
// productPublish table
db.productPublish = require('./productPublish.model.js')(connection, Sequelize)
// productSpec table
db.productSpec = require('./productSpec.model.js')(connection, Sequelize)
// shop table
db.shop = require('./shop.model.js')(connection, Sequelize)
// spec table
db.spec = require('./spec.model.js')(connection, Sequelize)
// state table
db.state = require('./state.model.js')(connection, Sequelize)
// tag table
db.tag = require('./tag.model.js')(connection, Sequelize)
// user table
db.user = require('./user.model.js')(connection, Sequelize)
//--------------------------------------------


// category relations
db.category.hasMany(db.category, {
    foreignKey: 'parentId',
    as: 'categoryChildren'
})
db.category.belongsTo(db.category, {
    foreignKey: 'parentId',
    as: 'categoryParent'
})

// product and category relation product-category
db.category.belongsToMany(db.product, {
    through: 'product_category',
    as: 'products',
    timestamps: false
})
db.product.belongsToMany(db.category, {
    through: 'product_category',
    as: 'categories',
})


// product and tag relation product-tag
db.tag.belongsToMany(db.product, {
    through: 'product_tag',
    foreignKey: 'PT_tagId',
    as: 'products',
    timestamps: false
})
db.product.belongsToMany(db.tag, {
    through: 'product_tag',
    foreignKey: 'PT_productId',
    as: 'tags',
})

// product and spec relation product-tag
db.spec.belongsToMany(db.product, {
    through: 'product_spec',
    foreignKey: 'PS_productId',
    as: 'products',
})
db.product.belongsToMany(db.spec, {
    through: 'product_spec',
    foreignKey: 'PS_specId',
    as: 'specs',
})

// product and publish relation product-tag
db.productPublish.hasOne(db.product, {
    through: 'product_publish',
    foreignKey: 'PP_productId',
    as : 'product',
})
db.product.belongsTo(db.productPublish, {
    through: 'product_publish',
    foreignKey: 'productId',
    as : 'publish'
})

// product and identity relation product-identity
db.productIdentity.hasOne(db.product, {
    through: 'product_identity',
    foreignKey: 'PI_productId',
    as: 'products',
})
db.product.belongsTo(db.productIdentity, {
    through: 'product',
    foreignKey: 'productId',
    as: 'identities',
})


// order and orderDatail relation 
db.orderDetail.hasOne(db.order, {
    through: 'order_detail',
    foreignKey: 'OD_orderId',
    as : 'order',
})
db.order.belongsTo(db.orderDetail, {
    through: 'order_detail',
    foreignKey: 'orderId',
    as : 'details'
})

// user and shop relation 
db.shop.hasOne(db.user, {
    through: 'user',
    foreignKey: 'userId',
    as : 'owner',
})
db.user.belongsTo(db.shop, {
    foreignKey: 'userShopId',
    as : 'shop'
})
db.shop.belongsToMany(db.user, {
    through: 'user',
    foreignKey: 'userShopId',
    as : 'users'
})







module.exports = db