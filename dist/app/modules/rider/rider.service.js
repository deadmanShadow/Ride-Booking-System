"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RiderService = void 0;
const driver_model_1 = require("../driver/driver.model");
const rider_model_1 = require("./rider.model");
const createRider = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const rider = new rider_model_1.Rider({
        name: payload.name,
        email: payload.email,
        riderSlug: payload.name.toLowerCase().split(" ").join("-"),
        available: true,
        rideStatus: "requested",
        rideHistory: [],
        cancelAllowedBeforeDriverAcceptance: true,
    });
    yield rider.save();
    return rider;
});
const requestRide = (riderSlug, pickupLocation, destinationLocation) => __awaiter(void 0, void 0, void 0, function* () {
    const rider = yield rider_model_1.Rider.findOne({ riderSlug });
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
    yield rider.save();
    return rider;
});
const acceptRide = (riderSlug, driverSlug) => __awaiter(void 0, void 0, void 0, function* () {
    const rider = yield rider_model_1.Rider.findOne({ riderSlug });
    if (!rider) {
        throw new Error("Rider not found.");
    }
    console.log("Rider before update:", rider);
    const driver = yield driver_model_1.Driver.findOne({ driverSlug });
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
        yield rider.save();
        console.log("Rider after update:", rider);
    }
    else {
        console.log("Rider's rideStatus is not 'requested', it is:", rider.rideStatus);
    }
    driver.rideStatus = "accepted";
    yield driver.save();
    return rider;
});
const cancelRide = (riderSlug) => __awaiter(void 0, void 0, void 0, function* () {
    const rider = yield rider_model_1.Rider.findOne({ riderSlug });
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
    yield rider.save();
    return rider;
});
const viewRideHistory = (riderSlug) => __awaiter(void 0, void 0, void 0, function* () {
    const rider = yield rider_model_1.Rider.findOne({ riderSlug });
    if (!rider) {
        throw new Error("Rider not found.");
    }
    return rider.rideHistory;
});
exports.RiderService = {
    createRider,
    acceptRide,
    requestRide,
    cancelRide,
    viewRideHistory,
};
