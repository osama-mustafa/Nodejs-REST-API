const mongoose = require('mongoose');
const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxLength: [50, 'Name should not exceed 100 characters']
    },
    description: {
        type: String,
        required: [true, 'Description is required']
    },
    image: {
        type: String,
        default: 'no_image.jpeg'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('Product', ProductSchema);