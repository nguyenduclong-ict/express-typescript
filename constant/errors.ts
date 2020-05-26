export default {
    // upload
    UPLOAD: {
        FILE_NOT_SUPPORT: {
            message: 'File not support',
            code: 500,
        },
    },
    // auth
    AUTH: {
        USER_NOT_FOUND: {
            message: 'Không tìm thất tài khoản',
            code: 401,
        },
        PASSWORD_WRONG: {
            message: 'Mật khẩu không chính xác',
            code: 401,
        },
        ACCOUNT_BLOCK: {
            message: 'Tài khoản đang bị khóa',
            code: 401,
        },
        LOGIN_REQUIRED: {
            message: 'Bạn cần đăng nhập',
            code: 401,
        },
        LOGIN_FAILURE: {
            message: 'Đăng nhập thất bại',
            code: 401,
        },
        ROLE_CHECK_NOT_PASS: {
            message: 'Bạn không có vai trò truy cập nội dung này',
            code: 403,
        },
        PERMISSION_CHECK_NOT_PASS: {
            message: 'Bạn không có quyền truy cập nội dung này',
            code: 403,
        },
    },
    VALIDATE: {
        message: 'Dữ liệu không đúng định dạng',
        code: 422,
    },
}
