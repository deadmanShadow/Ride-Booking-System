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
exports.RiderController = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const sendResponse_1 = require("../../utils/sendResponse");
const rider_service_1 = require("./rider.service");
const createRider = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email } = req.body;
    const rider = yield rider_service_1.RiderService.createRider({ name, email });
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 201,
        success: true,
        message: "Rider created successfully",
        data: rider,
    });
}));
const requestRide = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { riderSlug, pickupLocation, destinationLocation } = req.body;
    const result = yield rider_service_1.RiderService.requestRide(riderSlug, pickupLocation, destinationLocation);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 201,
        success: true,
        message: "Ride requested successfully",
        data: result,
    });
}));
const acceptRideRequest = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { riderSlug } = req.params;
    const { driverSlug } = req.body;
    const result = yield rider_service_1.RiderService.acceptRide(riderSlug, driverSlug);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "Ride accepted successfully",
        data: result,
    });
}));
const cancelRide = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { riderSlug } = req.params;
    const result = yield rider_service_1.RiderService.cancelRide(riderSlug);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "Ride canceled successfully",
        data: result,
    });
}));
const viewRideHistory = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { riderSlug } = req.params;
    const result = yield rider_service_1.RiderService.viewRideHistory(riderSlug);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "Ride history retrieved successfully",
        data: result,
    });
}));
exports.RiderController = {
    createRider,
    requestRide,
    acceptRideRequest,
    cancelRide,
    viewRideHistory,
};
