const multer = require('multer');
const imagesPath = process.env.IMAGE_STORAGE_PATH;
const crypto = require('crypto');

const generateUniqueName = async (originalName) => {
    let extension = originalName.split('.')[1]
    let uniqueName = await crypto.randomBytes(20).toString('hex');
    return uniqueName + '.' + extension;
}

const imageMIMEWhitelist = ['image/gif', 'image/jpeg', 'image/png', 'image/webp'];
const imageExtensionWhitelist = ['png', 'jpg', 'jpeg', 'gif', 'webp'];

// Setup storage for upload files
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, imagesPath);
        console.log(file);
    },

    filename: async function (req, file, cb) {
        cb(null, await generateUniqueName(file.originalname));
    }
});

// Create multer instance
const upload = multer({ storage: storage });

module.exports = upload