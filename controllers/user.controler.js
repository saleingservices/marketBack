const { user: User, Op } = require('../models')
const UserFuncs = require('../functions/userFuncs')
const funcs = require('../functions/funcs')
const { HttpStatusCode, ResponseType, ResponseCode, ResponseMessages } = require('../configs/responseMessage.config')


// register new user
exports.register = async (_req, _res) => {
    let userRecord = { userIsActive: false }  // default data
    try {
        if (!!_req.body.userMobile && !!_req.body.userShopId) {            
            userRecord.userMobile = funcs.persianNumberFix(_req.body.userMobile)
            let isExistUser = await User.findOne({ where: { userMobile: userRecord.userMobile } })
            if (isExistUser) {
                _res.status(HttpStatusCode.BadRequest400).send({
                    resCode: ResponseCode.duplicate_record,
                    data: [],
                    messages: [{ text: ResponseMessages.user_is_exist, type: ResponseType.error }]
                })
            } else {
                userRecord.userPassword = await funcs.CreateUUID()
                let user = await UserFuncs.RegisterUser(userRecord)
                _res.status(HttpStatusCode.Created_201).send({
                    resCode: ResponseCode.success,
                    data: [user],
                    messages: [{ text: ResponseMessages.created, type: ResponseType.success }]
                })
            }

        } else
            _res.status(HttpStatusCode.BadRequest400).send({
                resCode: ResponseCode.error_input,
                data: [],
                messages: [{ text: ResponseMessages.error_input, type: ResponseType.error }]
            })

    } catch (error) {
        console.log(error);
        //todo funcs.log تابع لاگ دیتابیس رو بنویس 
        _res.status(HttpStatusCode.InternalServerError_500).send({
            resCode: ResponseCode.internal_error,
            data: [],
            messages: [{ text: ResponseMessages.server_error, type: ResponseType.error }]
        })                   
    }
}