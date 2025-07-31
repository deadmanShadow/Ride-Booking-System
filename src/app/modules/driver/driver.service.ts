import { Rider } from "../rider/rider.model";
import { IApproveOrSuspendDriver, IDriver } from "./driver.interface";
import { Driver } from "./driver.model";
const createDriver = async (payload: IDriver) => {
  const existingDriver = await Driver.findOne({ email: payload.email });
  if (existingDriver) {
    throw new Error("A driver with this email already exists.");
  }

  const driver = await Driver.create(payload);

  return driver;
};
const getAllDrivers = async () => {
  const drivers = await Driver.find({});
  const totalDrivers = await Driver.countDocuments();
  return {
    data: drivers,
    meta: {
      total: totalDrivers,
    },
  };
};

const getSingleDriver = async (driverSlug: string) => {
  const driver = await Driver.findOne({ driverSlug });
  return {
    data: driver,
  };
};

const updateDriver = async (id: string, payload: Partial<IDriver>) => {
  const existingDriver = await Driver.findById(id);
  if (!existingDriver) {
    throw new Error("Driver not found.");
  }

  const duplicateDriver = await Driver.findOne({
    email: payload.email,
    _id: { $ne: id },
  });

  if (duplicateDriver) {
    throw new Error("A driver with this email already exists.");
  }

  const updatedDriver = await Driver.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return updatedDriver;
};

const deleteDriver = async (id: string) => {
  await Driver.findByIdAndDelete(id);
  return null;
};

const acceptRideRequest = async (riderSlug: string, driverSlug: string) => {
  const rider = await Rider.findOne({ riderSlug: riderSlug.trim() });
  if (!rider) {
    throw new Error("Rider not found.");
  }
  const driver = await Driver.findOne({ driverSlug });
  if (!driver) {
    throw new Error("Driver not found.");
  }

  if (rider.rideStatus === "requested") {
    rider.rideStatus = "accepted";
    rider.rideHistory.push({
      status: "accepted",
      timestamp: new Date(),
    });

    await rider.save();
  } else {
    throw new Error("Rider's rideStatus is not 'requested'.");
  }

  driver.rideStatus = "accepted";
  await driver.save();

  return driver;
};

const updateRideStatus = async (driverSlug: string, status: string) => {
  const validStatuses = [
    "requested",
    "accepted",
    "picked_up",
    "in_transit",
    "completed",
    "cancelled",
  ];

  if (!validStatuses.includes(status)) {
    throw new Error("Invalid ride status");
  }

  const driver = await Driver.findOne({ driverSlug });

  if (!driver) {
    throw new Error("Driver not found.");
  }

  driver.rideStatus = status as
    | "requested"
    | "accepted"
    | "picked_up"
    | "in_transit"
    | "completed"
    | "cancelled";

  await driver.save();

  return driver;
};

const cancelRide = async (riderSlug: string, driverSlug: string) => {
  const rider = await Rider.findOne({ riderSlug: riderSlug.trim() });
  if (!rider) {
    throw new Error("Rider not found.");
  }
  const driver = await Driver.findOne({ driverSlug });
  if (!driver) {
    throw new Error("Driver not found.");
  }
  if (rider.rideStatus !== "requested" && rider.rideStatus !== "accepted") {
    throw new Error("Ride cannot be canceled at this stage.");
  }
  rider.rideStatus = "cancelled";
  rider.rideHistory.push({
    status: "cancelled",
    timestamp: new Date(),
  });
  await rider.save();

  driver.rideStatus = "cancelled";
  await driver.save();

  return { rider, driver };
};

const viewEarningsHistory = async (driverSlug: string) => {
  const driver = await Driver.findOne({ driverSlug });
  if (!driver) {
    throw new Error("Driver not found.");
  }

  return driver.earnings;
};
const approveOrSuspendDriver = async (payload: IApproveOrSuspendDriver) => {
  const { driverSlug, status } = payload;
  const driver = await Driver.findOne({ driverSlug });

  if (!driver) {
    throw new Error("Driver not found.");
  }
  driver.status = status;
  await driver.save();

  return driver;
};
const setAvailabilityStatus = async (
  driverSlug: string,
  available: boolean
) => {
  const driver = await Driver.findOne({ driverSlug });
  if (!driver) {
    throw new Error("Driver not found.");
  }

  driver.availabilityStatus = available;
  await driver.save();

  return driver;
};

export const DriverService = {
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
