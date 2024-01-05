const multer = require('multer');
const imagesPath = process.env.IMAGE_STORAGE_PATH;

const getFileExtension = (file) => {
    return file.split('.')[1];
}

// Setup storage for upload files
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, imagesPath);
    },

    filename: function (req, file, cb) {
        cb(null, file.fieldname + '_' + Date.now() + '.' + getFileExtension(file.originalname));
    }
});

// Create multer instance
const upload = multer({ storage: storage });

module.exports = upload