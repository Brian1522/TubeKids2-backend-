const bcryptjs = require("bcryptjs");
const { response } = require("express");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userGet = async (req, res) => {
  const user = await User.find({ status: true }); // trae todos los usuarios en true
  const totaluser = await User.countDocuments({ status: true });
  res.json({
    user,
    totaluser,
  });
};

const createUser = async (req, res = response) => {
  // revisar si hay errores
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errores: errors.array() });
  }
  //extraer email y password
  const { email, password} = req.body;
  try {
    // revisar que el usuario registrado sea unico
    let user = await User.findOne({email });

    if (user) {
      return res.status(400).json({ message: "El usuario ya existe" });
    }
    // crea el nuevo usuario
    user = new User(req.body);
    // encripta el password
    const salt = await bcryptjs.genSalt(10);
    user.password = await bcryptjs.hash(password, salt);
    // guardar el nuevo usuario
    await user.save();
    //crear y firmar el jwt
    const payload = {
      user: {
        id: user.id,
      },
    };

    // firmar el jwt
    jwt.sign(
      payload,
      "secret",
      {
        expiresIn: 3600, //1 hora y cierra sesion
      },
      (error, token) => {
        if (error) throw error;
        // mensaje de confirmación
        res.json({ token });
      }
    );
  } catch (error) {
    console.log(error);
    res.status(400).send("Hubo un error");
  }
};

module.exports = { userGet, createUser };
