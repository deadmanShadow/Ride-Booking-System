import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { RiderService } from "./rider.service";

const createRider = catchAsync(async (req: Request, res: Response) => {
  const { name, email } = req.body;

  const rider = await RiderService.createRider({ name, email });

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Rider created successfully",
    data: rider,
  });
});

const requestRide = catchAsync(async (req: Request, res: Response) => {
  const { riderSlug, pickupLocation, destinationLocation } = req.body;

  const result = await RiderService.requestRide(
    riderSlug,
    pickupLocation,
    destinationLocation
  );

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Ride requested successfully",
    data: result,
  });
});
const acceptRideRequest = catchAsync(async (req: Request, res: Response) => {
  const { riderSlug } = req.params;
  const { driverSlug } = req.body;

  const result = await RiderService.acceptRide(riderSlug, driverSlug);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Ride accepted successfully",
    data: result,
  });
});
const cancelRide = catchAsync(async (req: Request, res: Response) => {
  const { riderSlug } = req.params;

  const result = await RiderService.cancelRide(riderSlug);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Ride canceled successfully",
    data: result,
  });
});

const viewRideHistory = catchAsync(async (req: Request, res: Response) => {
  const { riderSlug } = req.params;
  const result = await RiderService.viewRideHistory(riderSlug);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Ride history retrieved successfully",
    data: result,
  });
});

export const RiderController = {
  createRider,
  requestRide,
  acceptRideRequest,
  cancelRide,
  viewRideHistory,
};
