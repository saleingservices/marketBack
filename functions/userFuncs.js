const User  = require('../models').user
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config({ path: './config.env' })

async function MakeToken(_req, _result) {
    let tempUser = {};
    let ip = _req.headers['x-forwarded-for'] || _req.socket.remoteAddress
    let time = Math.floor(Date.now() / 1000)
    tempUser.userLastLoginIp = ip
    tempUser.userLastLoginTime = time
    tempUser.userTokenSalt = bcrypt.hashSync(time + '')
    let token = jwt.sign({
        userId: _result.userId,
        userMobile: _result.userMobile,
        userShopId: _result.userShopId,
        userTokenSalt: tempUser.userTokenSalt,
        userLastLoginIp: tempUser.userLastLoginIp,
        userLastLoginTime: tempUser.userLastLoginTime
    }, process.env.SecretKey, {
        expiresIn: 60*60*24 // 24 hours
    });
    tempUser.userToken = token
    let save = await User.update(tempUser, { where: { id: _result.userId } })
    if (!save)
        return null
    return token
}


function checkPassword(_inputPassword,_password){
    let passwordIsValid = bcrypt.compareSync(_inputPassword,_password)
    return passwordIsValid
}

async function RegisterUser(_userData){
    let user = await User.create(_userData)
    return user
}

const userFuncs = {
    MakeToken,
    RegisterUser,
    checkPassword
}
module.exports = userFuncs