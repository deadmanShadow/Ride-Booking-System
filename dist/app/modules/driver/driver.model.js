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
exports.Driver = void 0;
const mongoose_1 = require("mongoose");
const driverSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    driverSlug: { type: String, unique: true },
    vehicleInfo: {
        vehicleType: { type: String, required: true },
        vehicleNumber: { type: String, required: false },
    },
    availabilityStatus: { type: Boolean, default: true },
    rideRequest: {
        pickupLocation: { type: String },
        destinationLocation: { type: String },
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
    earnings: { type: Number, default: 0 },
    status: {
        type: String,
        enum: ["approved", "suspended"],
        default: "approved",
    },
}, {
    timestamps: true,
});
driverSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (this.isModified("name")) {
            const baseSlug = this.name.toLowerCase().split(" ").join("-");
            let driverSlug = `${baseSlug}-driver`;
            let counter = 0;
            while (yield exports.Driver.exists({ driverSlug })) {
                driverSlug = `${driverSlug}-${counter++}`;
            }
            this.driverSlug = driverSlug;
        }
        next();
    });
});
driverSchema.pre("findOneAndUpdate", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const driver = this.getUpdate();
        if (driver.name) {
            const baseSlug = driver.name.toLowerCase().split(" ").join("-");
            let driverSlug = `${baseSlug}-driver`;
            let counter = 0;
            while (yield exports.Driver.exists({ driverSlug })) {
                driverSlug = `${driverSlug}-${counter++}`;
            }
            driver.driverSlug = driverSlug;
        }
        this.setUpdate(driver);
        next();
    });
});
exports.Driver = (0, mongoose_1.model)("Driver", driverSchema);
