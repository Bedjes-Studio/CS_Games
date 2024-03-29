const express = require("express");
const multer = require("multer");
const router = express.Router();

const loginFilter = require("../middleware/loginFilter");

const userCtrl = require("../controllers/user");

const upload = multer({
    dest: "../temp/image.png",
    // you might also want to set some limits: https://github.com/expressjs/multer#limits
});

router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);
router.post("/review", loginFilter, userCtrl.review);
router.post("/updatePicture", loginFilter, upload.single("picture"), userCtrl.updatePicture);

module.exports = router;
