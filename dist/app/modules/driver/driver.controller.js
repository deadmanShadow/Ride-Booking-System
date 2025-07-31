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
exports.DriverController = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const sendResponse_1 = require("../../utils/sendResponse");
const driver_service_1 = require("./driver.service");
const driver_validation_1 = require("./driver.validation");
const createDriver = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, vehicleInfo } = req.body;
    const driver = yield driver_service_1.DriverService.createDriver({
        name,
        email,
        vehicleInfo,
    });
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 201,
        success: true,
        message: "Driver created successfully",
        data: driver,
    });
}));
const getAllDrivers = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield driver_service_1.DriverService.getAllDrivers();
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "Drivers retrieved",
        data: result.data,
        meta: result.meta,
    });
}));
const getSingleDriver = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const driverSlug = req.params.driverSlug;
    const result = yield driver_service_1.DriverService.getSingleDriver(driverSlug);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "Driver retrieved",
        data: result.data,
    });
}));
const updateDriver = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield driver_service_1.DriverService.updateDriver(id, req.body);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "Driver updated",
        data: result,
    });
}));
const deleteDriver = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield driver_service_1.DriverService.deleteDriver(req.params.id);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "Driver deleted",
        data: result,
    });
}));
const acceptRideRequest = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { riderSlug } = req.params;
    const { driverSlug } = req.body;
    console.log("Received riderSlug:", riderSlug);
    console.log("Received driverSlug:", driverSlug);
    const result = yield driver_service_1.DriverService.acceptRideRequest(riderSlug, driverSlug);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "Ride accepted successfully",
        data: result,
    });
}));
const updateRideStatus = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { driverSlug } = req.params;
    const { status } = req.body;
    const result = yield driver_service_1.DriverService.updateRideStatus(driverSlug, status);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "Ride status updated",
        data: result,
    });
}));
const viewEarningsHistory = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { driverSlug } = req.params;
    const result = yield driver_service_1.DriverService.viewEarningsHistory(driverSlug);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "Earnings history retrieved",
        data: result,
    });
}));
const cancelRide = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { riderSlug } = req.params;
    const { driverSlug } = req.body;
    const result = yield driver_service_1.DriverService.cancelRide(riderSlug, driverSlug);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "Ride canceled successfully",
        data: result,
    });
}));
const setAvailabilityStatus = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { driverSlug } = req.params;
    const { available } = req.body;
    const result = yield driver_service_1.DriverService.setAvailabilityStatus(driverSlug, available);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "Driver availability status updated",
        data: result,
    });
}));
const approveOrSuspendDriver = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    driver_validation_1.approveOrSuspendDriverSchema.parse(req.body);
    const { driverSlug } = req.params;
    const { status } = req.body;
    const result = yield driver_service_1.DriverService.approveOrSuspendDriver({
        driverSlug,
        status,
    });
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: `Driver ${status} successfully`,
        data: result,
    });
}));
exports.DriverController = {
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
