"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRiderTypeZodSchema = exports.updateRiderZodSchema = exports.requestRiderZodSchema = exports.createRiderZodSchema = void 0;
const zod_1 = require("zod");
exports.createRiderZodSchema = zod_1.z.object({
    name: zod_1.z.string(),
    email: zod_1.z.string().email(),
    riderSlug: zod_1.z.string().optional(),
});
exports.requestRiderZodSchema = zod_1.z.object({
    riderSlug: zod_1.z.string(),
    pickupLocation: zod_1.z.string(),
    destinationLocation: zod_1.z.string(),
    requestedAt: zod_1.z.string().optional(),
});
exports.updateRiderZodSchema = zod_1.z.object({
    title: zod_1.z.string().optional(),
    description: zod_1.z.string().optional(),
    location: zod_1.z.string().optional(),
    riderType: zod_1.z.string().optional(),
    riderDivision: zod_1.z.string().optional(),
    rideStatus: zod_1.z
        .enum([
        "requested",
        "accepted",
        "picked_up",
        "in_transit",
        "completed",
        "cancelled",
    ])
        .optional(),
    available: zod_1.z.boolean().optional(),
    cancelAllowedBeforeDriverAcceptance: zod_1.z.boolean().optional(),
    rideRequest: zod_1.z
        .object({
        pickupLocation: zod_1.z.string().optional(),
        destinationLocation: zod_1.z.string().optional(),
    })
        .optional(),
});
exports.createRiderTypeZodSchema = zod_1.z.object({
    name: zod_1.z.string(),
});
