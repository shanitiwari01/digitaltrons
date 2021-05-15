const express = require("express");

const router = express.Router();

const Constants = require("./../config/constants");
const ApiRoutes = Constants.ApiRoutes;

const apiController = require("../controllers/api/apiController");

// api route
router.route("/").get(apiController.home);

// slots route
router.route(ApiRoutes.API_SLOTS).post(apiController.slots);

// update-slot route
router.route(ApiRoutes.API_UPDATE_SLOT).post(apiController.updateSlot);

module.exports = router;
