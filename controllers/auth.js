const bcryptjs = require("bcryptjs");
const jwt = require('jsonwebtoken');
const User = require("../models/user");

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Buscar al usuario por su correo electrónico en la base de datos
    const user = await User.findOne({ email });
    // Si no se encuentra el usuario, significa que las credenciales son inválidas
    if (!user) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }
    // Verificar si la contraseña proporcionada coincide con la almacenada en la base de datos
    const validPassword = await bcryptjs.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }
    // Si las credenciales son válidas, crear y devolver un token JWT
    const token = jwt.sign({ id: user._id, email: user.email }, 'secret', {
      expiresIn: "1h",
    });
    // Retorna el token JWT y la información del usuario
    res.json({ token, user: { id: user._id, email: user.email } });
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" });
  }
};
//almacena el usuario en la app a nivel general
const authenticatedUser = async (req, res) => {
  try {
      //excluye el campo password 
     const user = await User.findById(req.user.id).select('-password');
     res.json({user}); 
  } catch (error) {
      console.log(error);
      res.status(500).json({msg: 'Hubo un error'});
  }
}
module.exports = {
  login,
  authenticatedUser
};
