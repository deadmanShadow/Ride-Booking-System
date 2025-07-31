"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RiderRoutes = void 0;
const express_1 = __importDefault(require("express"));
const checkAuth_1 = require("../../middlewares/checkAuth");
const validateRequest_1 = require("../../middlewares/validateRequest");
const user_interface_1 = require("../user/user.interface");
const rider_controller_1 = require("./rider.controller");
const rider_validation_1 = require("./rider.validation");
const router = express_1.default.Router();
router.post("/create", (0, checkAuth_1.checkAuth)(user_interface_1.Role.ADMIN, user_interface_1.Role.SUPER_ADMIN), (0, validateRequest_1.validateRequest)(rider_validation_1.createRiderZodSchema), rider_controller_1.RiderController.createRider);
router.post("/request-ride", (0, checkAuth_1.checkAuth)(user_interface_1.Role.ADMIN, user_interface_1.Role.SUPER_ADMIN, user_interface_1.Role.RIDER), (0, validateRequest_1.validateRequest)(rider_validation_1.requestRiderZodSchema), rider_controller_1.RiderController.requestRide);
router.patch("/cancel-ride/:riderSlug", (0, checkAuth_1.checkAuth)(user_interface_1.Role.ADMIN, user_interface_1.Role.SUPER_ADMIN, user_interface_1.Role.RIDER), rider_controller_1.RiderController.cancelRide);
router.get("/ride-history/:riderSlug", (0, checkAuth_1.checkAuth)(user_interface_1.Role.ADMIN, user_interface_1.Role.SUPER_ADMIN, user_interface_1.Role.RIDER), rider_controller_1.RiderController.viewRideHistory);
exports.RiderRoutes = router;
