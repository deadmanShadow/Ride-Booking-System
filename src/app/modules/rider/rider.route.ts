import express from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { validateRequest } from "../../middlewares/validateRequest";
import { Role } from "../user/user.interface";
import { RiderController } from "./rider.controller";
import {
  createRiderZodSchema,
  requestRiderZodSchema,
} from "./rider.validation";

const router = express.Router();

router.post(
  "/create",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  validateRequest(createRiderZodSchema),
  RiderController.createRider
);
router.post(
  "/request-ride",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN, Role.RIDER),
  validateRequest(requestRiderZodSchema),
  RiderController.requestRide
);

router.patch(
  "/cancel-ride/:riderSlug",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN, Role.RIDER),
  RiderController.cancelRide
);

router.get(
  "/ride-history/:riderSlug",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN, Role.RIDER),
  RiderController.viewRideHistory
);

export const RiderRoutes = router;
