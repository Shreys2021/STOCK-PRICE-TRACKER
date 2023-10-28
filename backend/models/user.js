const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    userStocks: [{
        type: Schema.Types.ObjectId,
        ref: 'Stock'
    }],

});

const User = mongoose.model('User', userSchema);

module.exports = User;
