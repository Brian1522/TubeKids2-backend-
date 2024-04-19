const { Router } = require("express");
const { check } = require("express-validator");

const { accountsPlaylistGet, accountsplaylistPost} = require("../controllers/accounts-playlist");
const { validateFields } = require("../middawares/validate-fields");


const router = Router();

router.get("/", accountsPlaylistGet);
router.post("/", [
    check("accountId", "AccountId is required").not().isEmpty().isMongoId(), //valida que venga los campos
    check("idPlaylist", "IdPlaylist is required").not().isEmpty().isMongoId(), //valida que venga los campos
    validateFields

], accountsplaylistPost);

module.exports = router;