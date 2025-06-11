const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); 
const userSchema = new mongoose.Schema({
    email: {
        type: String,required: true, unique: true
    },
    password: {
        type: String, required: true,minlength: 8
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true ,
    // Don't include password in JSON output by default
    toJSON: {
        transform: function(doc, ret) {
          delete ret.password;
          return ret;
        }
    },
});
// Hash password before saving
userSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});
// Method to compare password
userSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
};
// Method to generate JWT token
userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: '1d'
    });
    return token;
};
module.exports = mongoose.model('User', userSchema);