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
// verify table
db.verify = require('./verify.model.js')(connection, Sequelize)
//--------------------------------------------

// category relations
db.category.hasMany(db.category, {
    foreignKey: 'parentId',
    as: 'categoryChildrens'
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
    foreignKey: 'PT_TagId',
    as: 'products',
    timestamps: false
})
db.product.belongsToMany(db.tag, {
    through: 'product_tag',
    foreignKey: 'PT_ProductId',
    as: 'tags',
})

// product and spec relation product-tag
db.spec.belongsToMany(db.product, {
    through: 'product_spec',
    foreignKey: 'PS_ProductId',
    as: 'products',
})
db.product.belongsToMany(db.spec, {
    through: 'product_spec',
    foreignKey: 'PS_SpecId',
    as: 'specs',
})

// product and publish relation product-tag
db.productPublish.belongsTo(db.product, {
    foreignKey: 'PP_ProductId',
    as: 'products',
})
db.product.hasMany(db.productPublish, {
    foreignKey: 'PP_ProductId',
    as: 'publish'
})

// product and identity relation product-identity
db.productIdentity.belongsTo(db.product, {
    foreignKey: 'PI_ProductId',
    as: 'products',
})
db.product.hasMany(db.productIdentity, {
    foreignKey: 'PI_ProductId',
    as: 'identities',
})


// order and orderDatail relation 
db.orderDetail.belongsTo(db.order, {
    foreignKey: 'OD_OrderId',
    as: 'order',
})
db.order.hasMany(db.orderDetail, {
    foreignKey: 'OD_OrderId',
    as: 'details'
})

// user and shop relation 
db.user.belongsTo(db.shop, {
    foreignKey: 'userShopId',
    as: 'shop'
})

db.shop.hasMany(db.user, {
    foreignKey: 'userShopId',
    as: 'users'
})


// city and states relation
db.state.hasMany(db.city, {
    foreignKey: 'cityStateId',
    as: 'city',
})
db.city.belongsTo(db.state, {
    foreignKey: 'cityStateId',
    as: 'state',
})


// user and addres relation
db.user.belongsToMany(db.city, {
    through: 'address',
    foreignKey: 'addressUserId',
    as: 'UserAddress',
})

db.city.belongsToMany(db.user, {
    through: 'address',
    foreignKey: 'addressCityId',
    as: 'users',
})

// product and order relation order-detail
db.order.belongsToMany(db.product, {
    through: 'order_detail',
    foreignKey:'OD_OrderId',
    as: 'products',
})
db.product.belongsToMany(db.order, {
    through: 'order_detail',
    foreignKey:'OD_ProductId',
    as: 'orders',
})


// product and orderDatail relation 
db.orderDetail.belongsTo(db.product, {
    foreignKey: 'OD_ProductId',
    as: 'product',
})
db.product.hasMany(db.orderDetail, {
    foreignKey: 'OD_ProductId',
    as: 'orderDetails'
})


// order and user relation 
db.order.belongsTo(db.user, {
    foreignKey: 'orderUserId',
    as: 'user',
})
db.user.hasMany(db.order, {
    foreignKey: 'orderUserId',
    as: 'orders'
})

// order and shop relation 
db.order.belongsTo(db.shop, {
    foreignKey: 'orderShopId',
    as: 'shop',
})
db.shop.hasMany(db.order, {
    foreignKey: 'orderShopId',
    as: 'orders'
})


// product and shop relation 
db.product.belongsTo(db.shop, {
    foreignKey: 'productShopId',
    as: 'shop',
})
db.shop.hasMany(db.product, {
    foreignKey: 'productShopId',
    as: 'products'
})

// category and shop relation 
db.category.belongsTo(db.shop, {
    foreignKey: 'categoryShopId',
    as: 'shop',
})
db.shop.hasMany(db.category, {
    foreignKey: 'categoryShopId',
    as: 'categories'
})


// order and address relation 
db.order.belongsTo(db.address, {
    foreignKey: 'orderAddressId',
    as: 'orderAddress',
})
db.address.hasMany(db.order, {
    foreignKey: 'orderAddressId',
    as: 'orders'
})


module.exports = db