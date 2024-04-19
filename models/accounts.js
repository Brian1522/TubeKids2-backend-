const { Schema, model } = require("mongoose");

const AccountSchema = Schema({
    name: {
        type: String,
        required: [true, "name is required"],
    },
    pin: {
        type: String,
        required: [true, "PIN is required"],
    },
    img: { type: String },

    age: {
        type: Number,
        required: [true, "Age is required"],
    },

    status: { type: Boolean, default: true, },
});
AccountSchema.methods.toJSON = function () {
    const { __v, _id, ...account } = this.toObject();
    account.uid = _id;
    return account;
}

module.exports = model("Account", AccountSchema);