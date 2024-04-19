const { Schema, model } = require("mongoose");

const UserSchema = Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
    },
    lastname: {
        type: String,
        required: [true, "lastname is required"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
    },

    password: {
        type: String,
        required: [true, "Password is required"],
    },

    pin: {
        type: String,
        required: [true, "Pin is required"],
    },

    country: {
        type: String,
        required: [true, "Country is required"],
    },

    birthday: {
        type: String,
        required: [false],
    },

    role: {
        type: String,
        required: true,
        enum: ["USER_ROLE", "ADMIN_ROLE"],
    },

    status: {
        type: Boolean,
        default: true,
    },
});

UserSchema.methods.toJSON = function () {
    const { __v, password, _id, ...user } = this.toObject();
    user.uid = _id;
    return user;
}

module.exports = model("User", UserSchema);