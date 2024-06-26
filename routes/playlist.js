const { Router } = require("express");
const { check } = require("express-validator");

const { playlistGet, playlistPost, playlistDelete, playlistPut } = require("../controllers/playlist");
const { validateFields } = require("../middawares/validate-fields");
const { verifyAuth } = require("../middawares/validate-auth");
const { isRegisteredVideo, isRegisteredUrl, isRegisteredPlaylist, isNotRegisteredplaylist } = require("../helpers/db-validator");


const router = Router();


router.get("/:userId",[
    check("userId", "UserId is required").not().isEmpty().isMongoId(),
    validateFields,
    verifyAuth
],playlistGet);

router.post("/", [
    check("name", "Name is required").not().isEmpty().custom(isRegisteredVideo), //valida que venga los campos
    check("userId", "Userid is required").not().isEmpty().isMongoId(), //valida que venga los campos
    validateFields,
    verifyAuth
], playlistPost);

router.delete("/:id", [
    check("id", "Id is invalid").isMongoId().custom(isRegisteredPlaylist),
    validateFields,
    verifyAuth
], playlistDelete);

router.put("/:id", [
    check("id", "Id is invalid").isMongoId().custom(isNotRegisteredplaylist),
    validateFields,
    verifyAuth
], playlistPut
);


module.exports = router;