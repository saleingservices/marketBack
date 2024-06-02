const { user: User, Op, shop: Shop } = require('../models')
const UserFuncs = require('../functions/userFuncs')
const funcs = require('../functions/funcs')
const { HttpStatusCode, ResponseType, ResponseCode, ResponseMessages } = require('../configs/responseMessage.config')
const { verify } = require('jsonwebtoken')


// register new user
exports.register = async (_req, _res) => {
  let userRecord = { userIsActive: false }  // default data
  try {
    if (!!_req.body.userMobile && !!_req.body.userShopId) {
      userRecord.userMobile = funcs.PersianNumberFix(_req.body.userMobile)
      let isExistUser = await User.findOne({ where: { userMobile: userRecord.userMobile } })
      if (isExistUser) {
        funcs.Response400(_res, ResponseCode.duplicate_record, ResponseMessages.user_is_exist)
      } else {
        userRecord.userPassword = await funcs.CreateUUID()
        let user = await UserFuncs.RegisterUser(userRecord)
        funcs.Response201(_res, [user])
      }
    } else
      funcs.Response400(_res, ResponseCode.error_input, ResponseMessages.error_input)
  } catch (error) {
    console.log(error);
    //todo funcs.log تابع لاگ دیتابیس رو بنویس 
    funcs.Response500(_res)
  }
}

exports.login = (_req, _res) => {
  if (_req.body.userMobile && _req.body.userMobile.trim().length > 0 &&
    _req.body.userPassword && _req.body.userPassword.trim().length > 0) {
    User.findOne({
      where: {
        userMobile: _req.body.userMobile
      },
      attributes: {
        exclude: ['userCreatedAt', 'userUpdatedAt', 'userTokenSalt', 'userLastLoginIp', 'userLastLoginTime']
      },
      include: {
        model: Shop,
        as: 'shop'
      }
    })
      .then(async (_result) => {
        if (_result) {
          let result = JSON.parse(JSON.stringify(_result))
          delete result.userPassword
          if (_result.isActive) {
            let useOTP = _req.body.otp && _req.body.otp.toLowerCase() == 'true'
            if (useOTP) {
              let verifyObj = await funcs.GetVerify(_result.id, _req.body.password, 'otpPassword')
              if (verifyObj) {
                let token = await UserFuncs.MakeToken(_req, _result)
                let data = [{ token, userInfo: result }]
                funcs.Response200(_res, data)
              }
              else
                funcs.Response400(_res, ResponseCode.expired, ResponseMessages.otp_expired)
            }
            else {
              let passwordIsValid = bcrypt.compareSync(_req.body.password, _result.password)
              if (passwordIsValid) {
                let token = await UserFuncs.MakeToken(_req, _result)
                let data = [{ token, userInfo: result }]
                funcs.Response200(_res, data)
              }
              else
                funcs.Response400(_res, ResponseCode.notAccess, ResponseMessages.user_password_not_valid)
            }
          } else
            funcs.Response400(_res, ResponseCode.notAccess, ResponseMessages.user_is_not_active)
        }
        else
          funcs.Response400(_res, ResponseCode.notAccess, ResponseMessages.user_password_not_valid)
      })
      .catch(error => {
        funcs.Response500(_res)
      })
  }
  else
    funcs.Response400(_res, ResponseCode.error_input, ResponseMessages.error_input)
}