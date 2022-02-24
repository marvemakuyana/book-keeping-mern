const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
})
//use normal functions inorder to use this keyword
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)
    next();
});

//Verify password
UserSchema.methods.isPasswordMatch = async function (enterdPassword) {
    return await bcrypt.compare(enterdPassword, this.password);
}

const User = mongoose.model('User', UserSchema);

module.exports = User;