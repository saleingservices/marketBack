const axios = require('axios')
//  تابع اصلی ارسال پیامک
async function sendSmsByTemplate(_userMobile, _templateId, _parameters) {
    // فقط اپلیکشن از روی سایت اصلی پیامک ارسال کند
    let isAllowToSendSms =true;// __dirname.includes('back.sale30ty.com') || false
    if (isAllowToSendSms) {
        let url = 'https://api.sms.ir/v1/send/verify'
        let data = {
            'mobile': _userMobile + '',
            'templateId': _templateId,
            'parameters': _parameters
        }
        let option = {
            headers: {
                'X-API-KEY': 'MzPIB7j7paHUkVfMLDuMmlSchtONwDxahvAmpJ99iX7c4GP3gOOSUDJCtJQ3GUUe',
                'ACCEPT': 'application/json',
                'Content-Type': 'application/json',
            }
        }
        let resp = await axios.post(url, data, option)
        if (resp.data.status == 1)
            return true
        return false
    } else return false
}

// ارسال نوتیفای ثبت کاربر 
async function SendNotifySaveUser(_userMobile) {
    let templateId = 100000
    let parameters = [
        {
            'name': 'mobile',
            'value': _userMobile + ''
        }
    ]
    return await sendSmsByTemplate(_userMobile, templateId, parameters)
}
// ارسال وری فای کد 
async function SendVerifySms(_userMobile, _verifyCode) {
    let templateId = 100000
    let parameters = [
        {
            'CODE': _verifyCode + ''
        }
    ]
    return await sendSmsByTemplate(_userMobile, templateId, parameters)
}

const SMSIR = {
    sendSmsByTemplate,
    SendVerifySms,
    SendNotifySaveUser
}

module.exports = SMSIR