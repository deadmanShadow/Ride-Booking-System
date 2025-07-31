import { Driver } from "../driver/driver.model";
import { Rider } from "./rider.model";

const createRider = async (payload: { name: string; email: string }) => {
  const rider = new Rider({
    name: payload.name,
    email: payload.email,
    riderSlug: payload.name.toLowerCase().split(" ").join("-"),
    available: true,
    rideStatus: "requested",
    rideHistory: [],
    cancelAllowedBeforeDriverAcceptance: true,
  });
  await rider.save();

  return rider;
};

const requestRide = async (
  riderSlug: string,
  pickupLocation: string,
  destinationLocation: string
) => {
  const rider = await Rider.findOne({ riderSlug });

  if (!rider) {
    throw new Error("Rider not found.");
  }
  rider.rideRequest = {
    pickupLocation,
    destinationLocation,
    requestedAt: new Date(),
  };
  rider.rideStatus = "requested";
  rider.available = false;
  rider.rideHistory.push({
    status: "requested",
    timestamp: new Date(),
  });

  await rider.save();
  return rider;
};
const acceptRide = async (riderSlug: string, driverSlug: string) => {
  const rider = await Rider.findOne({ riderSlug });
  if (!rider) {
    throw new Error("Rider not found.");
  }

  console.log("Rider before update:", rider);
  const driver = await Driver.findOne({ driverSlug });
  if (!driver) {
    throw new Error("Driver not found.");
  }

  console.log("Driver before update:", driver);

  if (rider.rideStatus === "requested") {
    rider.rideStatus = "accepted";
    rider.rideHistory.push({
      status: "accepted",
      timestamp: new Date(),
    });
    await rider.save();

    console.log("Rider after update:", rider);
  } else {
    console.log(
      "Rider's rideStatus is not 'requested', it is:",
      rider.rideStatus
    );
  }

  driver.rideStatus = "accepted";
  await driver.save();

  return rider;
};

const cancelRide = async (riderSlug: string) => {
  const rider = await Rider.findOne({ riderSlug });
  if (!rider) {
    throw new Error("Rider not found.");
  }
  if (rider.rideStatus !== "requested") {
    throw new Error("Ride cannot be canceled at this stage.");
  }
  rider.rideStatus = "cancelled";
  rider.rideHistory.push({
    status: "cancelled",
    timestamp: new Date(),
  });

  await rider.save();

  return rider;
};

const viewRideHistory = async (riderSlug: string) => {
  const rider = await Rider.findOne({ riderSlug });

  if (!rider) {
    throw new Error("Rider not found.");
  }

  return rider.rideHistory;
};

export const RiderService = {
  createRider,
  acceptRide,
  requestRide,
  cancelRide,
  viewRideHistory,
};
