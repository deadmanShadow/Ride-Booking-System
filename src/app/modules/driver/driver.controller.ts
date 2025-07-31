import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { IDriver } from "./driver.interface";
import { DriverService } from "./driver.service";
import { approveOrSuspendDriverSchema } from "./driver.validation";

const createDriver = catchAsync(async (req: Request, res: Response) => {
  const { name, email, vehicleInfo } = req.body;

  const driver = await DriverService.createDriver({
    name,
    email,
    vehicleInfo,
  } as IDriver);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Driver created successfully",
    data: driver,
  });
});
const getAllDrivers = catchAsync(async (req: Request, res: Response) => {
  const result = await DriverService.getAllDrivers();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Drivers retrieved",
    data: result.data,
    meta: result.meta,
  });
});

const getSingleDriver = catchAsync(async (req: Request, res: Response) => {
  const driverSlug = req.params.driverSlug;
  const result = await DriverService.getSingleDriver(driverSlug);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Driver retrieved",
    data: result.data,
  });
});

const updateDriver = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await DriverService.updateDriver(id, req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Driver updated",
    data: result,
  });
});

const deleteDriver = catchAsync(async (req: Request, res: Response) => {
  const result = await DriverService.deleteDriver(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Driver deleted",
    data: result,
  });
});

const acceptRideRequest = catchAsync(async (req: Request, res: Response) => {
  const { riderSlug } = req.params;
  const { driverSlug } = req.body;

  console.log("Received riderSlug:", riderSlug);
  console.log("Received driverSlug:", driverSlug);
  const result = await DriverService.acceptRideRequest(riderSlug, driverSlug);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Ride accepted successfully",
    data: result,
  });
});

const updateRideStatus = catchAsync(async (req: Request, res: Response) => {
  const { driverSlug } = req.params;
  const { status } = req.body;

  const result = await DriverService.updateRideStatus(driverSlug, status);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Ride status updated",
    data: result,
  });
});

const viewEarningsHistory = catchAsync(async (req: Request, res: Response) => {
  const { driverSlug } = req.params;
  const result = await DriverService.viewEarningsHistory(driverSlug);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Earnings history retrieved",
    data: result,
  });
});

const cancelRide = catchAsync(async (req: Request, res: Response) => {
  const { riderSlug } = req.params;
  const { driverSlug } = req.body;
  const result = await DriverService.cancelRide(riderSlug, driverSlug);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Ride canceled successfully",
    data: result,
  });
});

const setAvailabilityStatus = catchAsync(
  async (req: Request, res: Response) => {
    const { driverSlug } = req.params;
    const { available } = req.body;

    const result = await DriverService.setAvailabilityStatus(
      driverSlug,
      available
    );

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Driver availability status updated",
      data: result,
    });
  }
);
const approveOrSuspendDriver = catchAsync(
  async (req: Request, res: Response) => {
    approveOrSuspendDriverSchema.parse(req.body);

    const { driverSlug } = req.params;
    const { status } = req.body;
    const result = await DriverService.approveOrSuspendDriver({
      driverSlug,
      status,
    });

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: `Driver ${status} successfully`,
      data: result,
    });
  }
);
export const DriverController = {
  createDriver,
  getAllDrivers,
  getSingleDriver,
  updateDriver,
  deleteDriver,
  acceptRideRequest,
  cancelRide,
  updateRideStatus,
  viewEarningsHistory,
  setAvailabilityStatus,
  approveOrSuspendDriver,
};
