const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const { isEmail } = require('validator');


const userSchema = mongoose.Schema(
    {
    firstname:{ type: String, required: true},
    lastname:{ type: String, required: true},
    email: {type: String, required: true, unique: true, validate: [isEmail], lowercase: true,},
    password: {type: String, required: true},
    is_admin: {type: Boolean, required: true, default: false},
}
);

userSchema.plugin(uniqueValidator);


module.exports = mongoose.model("User", userSchema);