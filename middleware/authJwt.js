require('dotenv').config({ path: './config.env' })
const jwt = require('jsonwebtoken')
const User = require('../models').user

const verifyToken = (_req, _res, _next) => {
	// ========= use bearer token
	const authHeader = _req.headers['authorization']
	let isBasic = false;
	if (authHeader && authHeader.toLowerCase().includes('bearer')) {
		const bearer = authHeader.split(' ')
		const bearerToken = bearer[1]
		_req.token = bearerToken
	}
	let token = _req.token
	if (!token) {
		return _res.status(401).send({
			message: 'توکن وجود ندارد'
		})
	}
	jwt.verify(token, process.env.SecretKey, async (err, decoded) => {
		if (err) {
			console.log(err);
			return _res.status(402).send({ message: 'دسترسی لازم وجود ندارد' })
		}
		await User.findOne({
			where: {
				userId: decoded.userId.trim(),
				userMobile: decoded.userMobile,
				userShopId: decoded.userShopId,
				userTokenSalt: decoded.userTokenSalt,
				userLastLoginIp: decoded.userLastLoginIp,
				userLastLoginTime: decoded.userLastLoginTime
			}
		})
			.then(_result => {
				if (_result && _result.userIsActive) {
					console.log('!!!!!!!!!!!!!!!!!! Request Path = ', _req.originalUrl);
					_req.userId = decoded.userId
					return _next()
				}
				else
					return _res.status(401).send({ message: 'دسترسی لازم وجود ندارد' })
			}).catch(error => {
				return _res.status(401).send({ message: 'خطا در سمت سرور' })
			})
	})
}


const authJwt = {
	verifyToken,
}
module.exports = authJwt