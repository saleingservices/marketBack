const bcrypt = require('bcryptjs')
module.exports = (connection, Sequelize) => {
    const User = connection.define('user', {
        userId: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true
        },
        userMobile: {
            type: Sequelize.STRING,
            allowNull: false,
            valIdate: {
                is: /(\+98|0)9\d{9}$/i
            }
        },
        userFirstName: {
            type: Sequelize.STRING,
        },
        userLastName: {
            type: Sequelize.STRING,
        },
        userShopId: {
            type: Sequelize.UUID,
            allowNull: false,
        },
        userToken: {
            type: Sequelize.TEXT,
        },
        userTokenSalt: {
            type: Sequelize.STRING,
        },
        userLastLoginIp: {
            type: Sequelize.STRING,
        },
        userLastLoginTime: {
            type: Sequelize.STRING,
        },
        userPassword: {
            type: Sequelize.TEXT,
            set(value) {
                this.setDataValue('userPassword', bcrypt.hashSync(value))
            }
        },
        userIsActive: {
            type: Sequelize.BOOLEAN,
        },
        userProfile: {
            type: Sequelize.TEXT,
        }
    },
        {
            updatedAt: 'userUpdatedAt',
            createdAt: 'userCreatedAt',
            indexes: [
                {
                    using: 'BTREE',
                    fields: ['userId']
                },
                {
                    using: 'BTREE',
                    fields: ['userMobile']
                },
                {
                    using: 'BTREE',
                    fields: ['userIsActive']
                },
                {
                    unique: true,
                    fields: ['userShopId', 'userMobile']
                },

            ]
        }
    )
    // User.afterCreate(async (record) => {
    //     record.isActive ?
    //         await sms.SendNotifyActiveUser(record.mobile)
    //         :
    //         await sms.SendNotifySaveUser(record.mobile)
    // })

    // User.beforeUpdate(async (record) => {
    //     if (!record._previousDataValues.isActive && record.isActive)
    //         await sms.SendNotifyActiveUser(record.mobile)
    // })


    return User
}