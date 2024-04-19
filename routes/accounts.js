const { Router } = require('express');


const { cuentasGet, cuentasPost, accountsPut } = require("../controllers/accounts");
const { check } = require('express-validator');
const { isRegisteredaccount, isNotRegisteredaccount } = require("../helpers/db-validator");

const { validateFields } = require("../middawares/validate-fields");

const router = Router();

router.get("/", cuentasGet);
router.post("/", [
    check("name", "Name is required").not().isEmpty().custom(isRegisteredaccount),
    check("pin", "Pin is required").isLength({ min: 6 }),
    check("age", "Age is required").not().isEmpty().isNumeric(),
    validateFields
], cuentasPost);
router.put("/:id", [
    check("id", "Id is invalid").isMongoId().custom(isNotRegisteredaccount),
    validateFields
], accountsPut
);

module.exports = router;