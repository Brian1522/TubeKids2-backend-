const jwt = require("jsonwebtoken");

// Función middleware para verificar la autenticación
const verifyAuth = (req, res, next) => {
  // Obtiene el token de autorización del encabezado de la solicitud
  const header = req.header("Authorization") || ""; // Obtiene el encabezado "Authorization" de la solicitud
  const token = header.split(" ")[1]; // Extrae el token de autorización (suponiendo que esté en el formato "Bearer <token>")
  // Si no se proporciona un token, devuelve un error de "Token no proporcionado"
  if (!token) {
    return res.status(403).json({ message: "Token requerido" });
  }
  // Verifica el token utilizando la clave secreta 'secret'
  jwt.verify(token, 'secret', (err, decoded) => {
    // Si hay un error al verificar el token, devuelve un error de "Token inválido"
    if (err) {
      return res.status(401).json({ message: "Token inválido" });
    }
    // Si el token es válido, guarda la información decodificada del usuario en la solicitud
    req.user = decoded;
    // Continúa con el siguiente middleware o controlador en la cadena de middleware
    next();
  });
};

module.exports = {
  verifyAuth,
};
