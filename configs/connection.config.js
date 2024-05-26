const { Sequelize } = require('sequelize').Sequelize
require('dotenv').config({ path: './config.env' })
let Config = require('./db.config.js')
let config=process.env.EnvMode=='APP' ?  Config.mssql : Config.devMssql
let defOption = {
    // logging: false,
    // timezone : '+03:30',
    charset: 'utf8',
    collate: 'utf8_persian_ci',
    host: config.HOST,
    dialect: config.dialect,
    define: {
        timestamps: true,
        freezeTableName: true,
        underscored: false,
    },
    operatorsAliases: false,
    pool: {
        max: config.pool.max,
        min: config.pool.min,
        acquire: config.pool.acquire,
        idle: config.pool.idle,

    },
    dialectOptions: {
        useUTC: true, //for reading from database
        dateStrings: true,
        instanceName: config.dialectOptions.instanceName,
        options: { "requestTimeout": 300000 }
    },
}

const connection = new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD,
    defOption
)
module.exports = connection