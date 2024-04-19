const { Router } = require("express");
const { check } = require("express-validator");

const { validateFields } = require("../middawares/validate-fields");
const { verifyAuth } = require("../middawares/validate-auth");
const { login,authenticatedUser } = require("../controllers/auth");

const router = Router();
// Ruta de login
router.post(
  "/login",
  [
    check("email", "Email is not valid").isEmail(), //valida correo
    check("password", "Password can't be empty").not().isEmpty(), //valida password
    validateFields,
  ],
  login
);

router.get( '/session' , 
  verifyAuth , 
  authenticatedUser
);

// Ruta de cierre de sesión
router.post('/logout', verifyAuth, (req, res) => {
  // Simplemente el cliente deja de enviar el token JWT en las solicitudes.
  res.json({ message: 'Cierre de sesión exitoso' });
});


module.exports = router;