const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

const checkAcceptanceController = require("../../controllers/userRouteController/checkAcceptanceController");

router.post('/check-acceptance', auth, checkAcceptanceController);

module.exports = router;