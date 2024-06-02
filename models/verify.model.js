
module.exports = (connection, Sequelize) => {
	const Verify = connection.define('verify', {
		verifyId: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
		},
		verifyUserId: {
			type: Sequelize.UUID,
		},
		verifyCode: {
			type: Sequelize.STRING(20),
		},
		verifyType: {
			type: Sequelize.STRING(20),
		}, 
		verifyEffectOn: { 
			type: Sequelize.STRING(50) 
		}
	},
		{
			updatedAt: 'verifyUpdatedAt',
            createdAt: 'verifyCreatedAt',
			indexes: [
				{
					using: 'BTREE',
					fields: ['verifyId']
				},
				{
					using: 'BTREE',
					fields: ['verifyUserId']
				},
				{
					using: 'BTREE',
					fields: ['verifyType']
				}
			]
		}
	)
	return Verify
}