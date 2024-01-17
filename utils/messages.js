module.exports = {
    success: {
        USER_REGISTRED: 'Registered successfully',
        USER_LOGIN: 'Login successfully',
        USER_LOGOUT: 'Logout successfully',
        FORGOT_PASSWORD: 'If provided email is correct, we will send you reset password instructions',
        UPDATE_PASSWORD: 'Password updated successfully',
        RESET_PASSWORD: 'Password has been reset successfully, you can now login with the new password',
        GET_RESOURCE: 'Fetch resource successfully',
        GET_RESOURCES: 'Fetch resources successfully',
        CREATE_RESOURCE: 'Create resource successfully',
        UPDATE_RESOUCRE: 'Update resource successfully',
        DELETE_RESOURCE: 'Delete resource successfully',
    },
    error: {
        RESOURCE_NOT_FOUND: 'Resource not found!',
        DUPLICATE_RESOURCE: 'Duplicate record, resource already exists!',
        NOT_AUTHORIZED: 'Your are not authorized to access this route!',
        FORBIDDEN: 'You don\'t have permissions to access this route!',
        SERVER_ERROR: 'Internal server error',
        INCORRECT_OLD_PASSWORD: 'Old password is incorrect',
        INVALID_CREDENTIALS: 'Invalid credentials',
        INVALID_TOKEN: 'Invalid token',
        REVOKED_TOKEN: 'Revoked token! Please login again or create a new account',
        INVALID_IMAGE: 'The file you provided is not a valid image',
        INVALID_FILE_NAME: 'Invalid characters in file name, please rename it, or upload another file',
        INVALID_FILE_SIZE: 'File size is too large. Max 1MB allowed.'
    }
}