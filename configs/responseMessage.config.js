const HttpStatusCode = {
    OK_200: 200,
    Created_201:201,
    Accepted_202:202,
    BadRequest400: 400,
    Unauthorized_401: 401,
    Forbidden_403: 403,
    NotFound_404: 404,
    InternalServerError_500: 500,
}

const ResponseCode={
    'success':0,
    'error_input':1,
    'duplicate_record':2,
    'not_found':3,
    'internal_error':4
}
const ResponseType={
    'error':'error',
    'success':'success',
    'warning':'warning',
    'info':'info',
    'delete':'delete',
}
const ResponseMessages= {

    OK_200: {
        'success': 'عملیات با موفقیت انجام شد',
    },
    BadRequest400: {
        'user_is_not_active': 'کاربر فعال نمی باشد',
        'user_is_active': 'کاربر فعال می باشد',
        'user_is_not_found': 'کاربری بااین مشخصات یافت نشد',
        'user_is_exist':'کاربر قبلا ثبت نام شده است',
        'not_found': 'موردی با این مشخصات یافت نشد',
        'error_input': 'لطفا مقادیر را کامل کنید' ,
        'duplicate_record': 'رکورد تکراری',
        'select_file': 'یک فایل را انتخاب کنید',
        'otp_send_error': 'ارسال رمز عبور یکبار مصرف با مشکل مواجه شد',
        'otp_generate_error': 'تولید رمز عبور با شکست مواجه شد',
        'verification_code_error': 'خطا در ارسال کد تایید',
        'verification_code_not_match': 'کد تایید تطابق ندارد',
    },
    Unauthorized_401: {
        'no_access_permission': 'دسترسی وجود ندارد',
    },
    NotFound_404: {
        'not_found': 'مقداری وجود ندارد'
    },
    InternalServerError_500: {
        'server_error': 'خطا: خطا در سمت سرور',
    }

}

module.exports = {
    ResponseMessages,
    HttpStatusCode,
    ResponseCode,
    ResponseType
}