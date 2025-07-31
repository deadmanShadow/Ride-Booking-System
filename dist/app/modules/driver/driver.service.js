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
exports.DriverService = void 0;
const rider_model_1 = require("../rider/rider.model");
const driver_model_1 = require("./driver.model");
const createDriver = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const existingDriver = yield driver_model_1.Driver.findOne({ email: payload.email });
    if (existingDriver) {
        throw new Error("A driver with this email already exists.");
    }
    const driver = yield driver_model_1.Driver.create(payload);
    return driver;
});
const getAllDrivers = () => __awaiter(void 0, void 0, void 0, function* () {
    const drivers = yield driver_model_1.Driver.find({});
    const totalDrivers = yield driver_model_1.Driver.countDocuments();
    return {
        data: drivers,
        meta: {
            total: totalDrivers,
        },
    };
});
const getSingleDriver = (driverSlug) => __awaiter(void 0, void 0, void 0, function* () {
    const driver = yield driver_model_1.Driver.findOne({ driverSlug });
    return {
        data: driver,
    };
});
const updateDriver = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const existingDriver = yield driver_model_1.Driver.findById(id);
    if (!existingDriver) {
        throw new Error("Driver not found.");
    }
    const duplicateDriver = yield driver_model_1.Driver.findOne({
        email: payload.email,
        _id: { $ne: id },
    });
    if (duplicateDriver) {
        throw new Error("A driver with this email already exists.");
    }
    const updatedDriver = yield driver_model_1.Driver.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    return updatedDriver;
});
const deleteDriver = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield driver_model_1.Driver.findByIdAndDelete(id);
    return null;
});
const acceptRideRequest = (riderSlug, driverSlug) => __awaiter(void 0, void 0, void 0, function* () {
    const rider = yield rider_model_1.Rider.findOne({ riderSlug: riderSlug.trim() });
    if (!rider) {
        throw new Error("Rider not found.");
    }
    const driver = yield driver_model_1.Driver.findOne({ driverSlug });
    if (!driver) {
        throw new Error("Driver not found.");
    }
    if (rider.rideStatus === "requested") {
        rider.rideStatus = "accepted";
        rider.rideHistory.push({
            status: "accepted",
            timestamp: new Date(),
        });
        yield rider.save();
    }
    else {
        throw new Error("Rider's rideStatus is not 'requested'.");
    }
    driver.rideStatus = "accepted";
    yield driver.save();
    return driver;
});
const updateRideStatus = (driverSlug, status) => __awaiter(void 0, void 0, void 0, function* () {
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
    const driver = yield driver_model_1.Driver.findOne({ driverSlug });
    if (!driver) {
        throw new Error("Driver not found.");
    }
    driver.rideStatus = status;
    yield driver.save();
    return driver;
});
const cancelRide = (riderSlug, driverSlug) => __awaiter(void 0, void 0, void 0, function* () {
    const rider = yield rider_model_1.Rider.findOne({ riderSlug: riderSlug.trim() });
    if (!rider) {
        throw new Error("Rider not found.");
    }
    const driver = yield driver_model_1.Driver.findOne({ driverSlug });
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
    yield rider.save();
    driver.rideStatus = "cancelled";
    yield driver.save();
    return { rider, driver };
});
const viewEarningsHistory = (driverSlug) => __awaiter(void 0, void 0, void 0, function* () {
    const driver = yield driver_model_1.Driver.findOne({ driverSlug });
    if (!driver) {
        throw new Error("Driver not found.");
    }
    return driver.earnings;
});
const approveOrSuspendDriver = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { driverSlug, status } = payload;
    const driver = yield driver_model_1.Driver.findOne({ driverSlug });
    if (!driver) {
        throw new Error("Driver not found.");
    }
    driver.status = status;
    yield driver.save();
    return driver;
});
const setAvailabilityStatus = (driverSlug, available) => __awaiter(void 0, void 0, void 0, function* () {
    const driver = yield driver_model_1.Driver.findOne({ driverSlug });
    if (!driver) {
        throw new Error("Driver not found.");
    }
    driver.availabilityStatus = available;
    yield driver.save();
    return driver;
});
exports.DriverService = {
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
