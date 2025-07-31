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
exports.Rider = exports.RiderType = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const mongoose_1 = require("mongoose");
const riderTypeSchema = new mongoose_1.Schema({
    name: { type: String, unique: true },
}, {
    timestamps: true,
});
exports.RiderType = (0, mongoose_1.model)("RiderType", riderTypeSchema);
const riderSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    riderDivision: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Division",
        required: false,
    },
    riderType: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "RiderType",
        required: false,
    },
    available: { type: Boolean, default: true },
    riderSlug: { type: String, unique: true },
    rideRequest: {
        pickupLocation: { type: String, required: false },
        destinationLocation: { type: String, required: false },
        requestedAt: { type: Date, default: Date.now },
    },
    rideStatus: {
        type: String,
        enum: [
            "requested",
            "accepted",
            "picked_up",
            "in_transit",
            "completed",
            "cancelled",
        ],
        default: "requested",
    },
    cancelledAt: { type: Date, required: false },
    rideHistory: [
        {
            status: {
                type: String,
                enum: [
                    "requested",
                    "accepted",
                    "picked_up",
                    "in_transit",
                    "completed",
                    "cancelled",
                ],
                required: true,
            },
            timestamp: { type: Date, default: Date.now },
        },
    ],
    cancelAllowedBeforeDriverAcceptance: { type: Boolean, default: true },
}, {
    timestamps: true,
});
riderSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (this.isModified("name") && this.name) {
                const baseSlug = this.name.toLowerCase().split(" ").join("-");
                let riderSlug = `${baseSlug}`;
                let counter = 0;
                while (yield exports.Rider.exists({ riderSlug })) {
                    riderSlug = `${baseSlug}-${counter++}`;
                }
                this.riderSlug = riderSlug;
            }
            else {
                this.riderSlug = `default-riderSlug-${Date.now()}-${this._id}`;
            }
            next();
        }
        catch (error) {
            next(error);
        }
    });
});
exports.Rider = (0, mongoose_1.model)("Rider", riderSchema);
