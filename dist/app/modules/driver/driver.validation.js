"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.approveOrSuspendDriverSchema = exports.setAvailabilityStatusSchema = exports.updateRideStatusSchema = exports.acceptRideRequestSchema = exports.updateDriverSchema = exports.createDriverSchema = void 0;
const zod_1 = require("zod");
exports.createDriverSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, "Name is required"),
    email: zod_1.z.string().email(),
    vehicleInfo: zod_1.z.object({
        vehicleType: zod_1.z.string().min(1, "Vehicle type is required"),
    }),
});
exports.updateDriverSchema = zod_1.z.object({
    name: zod_1.z.string().min(1).optional(),
    email: zod_1.z.string().email().optional(),
    driverDivision: zod_1.z.string().optional(),
    vehicleInfo: zod_1.z
        .object({
        vehicleType: zod_1.z.string().min(1).optional(),
        vehicleNumber: zod_1.z.string().min(1).optional(),
    })
        .optional(),
});
exports.acceptRideRequestSchema = zod_1.z.object({
    driverSlug: zod_1.z.string().min(1, "Driver slug is required"),
});
exports.updateRideStatusSchema = zod_1.z.object({
    status: zod_1.z.enum([
        "requested",
        "accepted",
        "picked_up",
        "in_transit",
        "completed",
        "cancelled",
    ]),
});
exports.setAvailabilityStatusSchema = zod_1.z.object({
    available: zod_1.z.boolean(),
});
exports.approveOrSuspendDriverSchema = zod_1.z.object({
    status: zod_1.z.enum(["approved", "suspended"]),
});
