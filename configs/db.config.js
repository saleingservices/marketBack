require('dotenv').config({ path: './config.env' })
module.exports = {
  devMssql: {
    HOST: process.env.DevDataBaseHost,
    PORT:process.env.DevDataBasePort,
    USER:process.env.DevDataBaseUser,
    PASSWORD: process.env.DevDataBaseUserPassword,
    DB: "woomart",
    DOMAIN:process.env.DevDataBaseDomain,
    dialect: "mssql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    dialectOptions: {
      instanceName: process.env.DevDataBaseInstanceName,
    }

  },
  mssql: {
    HOST: process.env.DataBaseHost,
    PORT:process.env.DataBasePort,
    USER:process.env.DataBaseUser,
    PASSWORD: process.env.DataBaseUserPassword,
    DB: "woomart",
    DOMAIN:process.env.DataBaseDomain,
    dialect: "mssql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    dialectOptions: {
      instanceName: process.env.DataBaseInstanceName,
    }

  }
}