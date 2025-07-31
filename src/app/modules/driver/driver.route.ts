import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { validateRequest } from "../../middlewares/validateRequest";
import { Role } from "../user/user.interface";
import { DriverController } from "./driver.controller";
import {
  acceptRideRequestSchema,
  approveOrSuspendDriverSchema,
  createDriverSchema,
  setAvailabilityStatusSchema,
  updateDriverSchema,
  updateRideStatusSchema,
} from "./driver.validation";

const router = Router();

router.post(
  "/create",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  validateRequest(createDriverSchema),
  DriverController.createDriver
);
router.get("/", DriverController.getAllDrivers);
router.get("/:driverSlug", DriverController.getSingleDriver);
router.patch(
  "/:id",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  validateRequest(updateDriverSchema),
  DriverController.updateDriver
);
router.delete(
  "/:id",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  DriverController.deleteDriver
);

router.post(
  "/:riderSlug/accept-ride",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN, Role.DRIVER),
  validateRequest(acceptRideRequestSchema),
  DriverController.acceptRideRequest
);

router.patch(
  "/ride-status/:driverSlug",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN, Role.DRIVER),
  validateRequest(updateRideStatusSchema),
  DriverController.updateRideStatus
);

router.get(
  "/:driverSlug/earnings",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN, Role.DRIVER),
  DriverController.viewEarningsHistory
);

router.patch(
  "/:riderSlug/cancel-ride",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN, Role.DRIVER),
  DriverController.cancelRide
);

router.patch(
  "/approve-suspend/:driverSlug",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  validateRequest(approveOrSuspendDriverSchema),
  DriverController.approveOrSuspendDriver
);

router.patch(
  "/:driverSlug/set-availability",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN, Role.DRIVER),
  validateRequest(setAvailabilityStatusSchema),
  DriverController.setAvailabilityStatus
);

export const DriverRoutes = router;
