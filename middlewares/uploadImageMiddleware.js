const multer = require('multer');
const imagesPath = process.env.IMAGE_STORAGE_PATH;
const crypto = require('crypto');
const whitelistedMIME = ['image/gif', 'image/jpeg', 'image/png', 'image/webp'];
const whitelistedExtenions = ['.png', '.jpg', '.jpeg', '.gif', '.webp'];
const blacklistedExtensions = ['.exe', '.bat', '.com', '.php', '.jsp', '.aspx', '.zip', '.rar', '.svg', '.swf'];
const path = require('path');
const messages = require('../utils/messages');

const isImageOriginalNameValid = (fileName) => {
    const fileNameREGEX = /^[a-zA-Z0-9_.-]+$/;
    return fileNameREGEX.test(fileName);
}

const isImageExtensionAndMIMEValid = (file) => {
    let imageExtension = path.extname(file.originalname).toLowerCase();
    let imageMIME = file.mimetype;

    return (whitelistedExtenions.includes(imageExtension)
        && whitelistedMIME.includes(imageMIME)
        && !blacklistedExtensions.includes(imageExtension))
}

const generateUUID = async (fileName) => {
    let extension = fileName.split('.')[1]
    let uniqueName = await crypto.randomUUID();
    return uniqueName + '.' + extension;
}

// Setup storage for upload files
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, imagesPath);
    },

    filename: async function (req, file, cb) {
        cb(null, await generateUUID(file.originalname));
    }
});

// Create multer instance
const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        if (!isImageOriginalNameValid(file.originalname)) {
            cb(new Error(messages.error.INVALID_FILE_NAME))
        }
        if (isImageExtensionAndMIMEValid(file)) {
            cb(null, true)
        } else {
            cb(new Error(messages.error.INVALID_IMAGE))
        }
    },
    limits: {
        fileSize: 1024 * 1024
    },

}).single('file');

module.exports = (req, res, next) => {
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            if (err.code == 'LIMIT_FILE_SIZE') {
                return res.status(400).json({
                    success: false,
                    message: messages.error.INVALID_FILE_SIZE
                });
            }
            return res.status(400).json({
                success: false,
                message: err.message
            })
        } else if (err) {
            return res.status(400).json({
                success: false,
                message: err.message
            })
        }
        next();
    })
}