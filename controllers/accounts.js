
const Account = require("../models/accounts");

const cuentasGet = async (req, res) => {
    const accounts = await Account.find({ status: true });
    const total = await Account.countDocuments({ status: true });
    res.json({
        accounts, total
    });
}

const cuentasPost = async (req, res) => {
    const { name, pin, age } = req.body;

    const account = new Account({
        name, pin, age
    });

    await account.save(); // se guarda
    res.status(201).json({
        msg: 'Account created',
        account
    })
}
//Actualiza cuenta
const accountsPut = async (req, res) => {
    const { id } = req.params;
    const { ...rest } = req.body; // trae todo post

    const account = await Account.findByIdAndUpdate(id, rest);

    res.status(200).json({
        msg: 'Account edited',
        account
    })
}

module.exports = { cuentasGet, cuentasPost, accountsPut };