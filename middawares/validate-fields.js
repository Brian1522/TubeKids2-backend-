const { validationResult } = require("express-validator");
const express = require("express");
const app = express();

// Parsea el cuerpo de las solicitudes JSON
app.use(express.json());

const validateFields = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors);
  }
  next();
};

module.exports = {
  validateFields,
};