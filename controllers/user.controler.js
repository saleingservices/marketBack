const { user:User, Op } = require('../models')
const UserFuncs = require('../functions/userFuncs')
const {HttpStatusCode,ResponseType,ResponseCode,ResponseMessages}= require('../configs/responseMessage.config')
exports.register = async (_req, _res) => {
    let userRecord = { userIsActive: false }
    try {
        if (!!_req.body.userMobile && !!_req.body.userShopId) {
            userRecord.userMobile = _req.body.userMobile.replace(/[۰-۹]/g, d => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d))
            let isExistUser = await User.findOne({ where: { userMobile: userRecord.userMobile } })
            if (!isExistUser) {
                userRecord.userPassword = await funcs.CreateUUID()
                let user = await UserFuncs.RegisterUser(userRecord)
                _res.status(HttpStatusCode.OK_200).send({
                    resCode: ResponseCode.success,
                    data: [user],
                    messages: [{ text: ResponseMessages.OK_200.success, type: ResponseType.success }]
                })
                return _res.status(200).send({ message: resMessage.OK_200.success })
            } else {
                _res.status(HttpStatusCode.BadRequest400).send({
                    resCode: ResponseCode.error_input,
                    data: [],
                    messages: [{ text: ResponseMessages.BadRequest400.user_is_exist, type: ResponseType.error }]
                })
            }

        } else
        _res.status(HttpStatusCode.BadRequest400).send({
            resCode: ResponseCode.error_input,
            data: [],
            messages: [{ text: ResponseMessages.BadRequest400.error_input, type: ResponseType.error }]
        })

    } catch (error) {
        console.log(error);
        _res.status(HttpStatusCode.InternalServerError_500).send({
            resCode: ResponseCode.internal_error,
            data: [],
            messages: [{ text: ResponseMessages.InternalServerError_500.server_error, type: ResponseType.error }]
        })
    }
}