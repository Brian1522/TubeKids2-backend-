const { Router } = require("express");
const { check } = require("express-validator");

const { userGet, createUser } = require("../controllers/users");
const { isRegisteredEmail} = require("../helpers/db-validator");

const { validateFields } = require("../middawares/validate-fields");

const router = Router();

router.get("/", userGet);
router.post("/", [
    check("email", "Email is not valid").isEmail().custom(isRegisteredEmail),// valida que no este repetido el correo
    check("name", "Name is required").not().isEmpty(),// valida que  no este vacio
    check("password", "Password  must have six character").isLength({ min: 6 }),
    validateFields

], createUser);


module.exports = router;