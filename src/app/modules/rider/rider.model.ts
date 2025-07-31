/* eslint-disable @typescript-eslint/no-explicit-any */
import { model, Schema } from "mongoose";
import { IRider, IRiderType } from "./rider.interface";

const riderTypeSchema = new Schema<IRiderType>(
  {
    name: { type: String, unique: true },
  },
  {
    timestamps: true,
  }
);

export const RiderType = model<IRiderType>("RiderType", riderTypeSchema);

const riderSchema = new Schema<IRider>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    riderDivision: {
      type: Schema.Types.ObjectId,
      ref: "Division",
      required: false,
    },

    riderType: {
      type: Schema.Types.ObjectId,
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
  },
  {
    timestamps: true,
  }
);

riderSchema.pre("save", async function (next) {
  try {
    if (this.isModified("name") && this.name) {
      const baseSlug = this.name.toLowerCase().split(" ").join("-");
      let riderSlug = `${baseSlug}`;

      let counter = 0;
      while (await Rider.exists({ riderSlug })) {
        riderSlug = `${baseSlug}-${counter++}`;
      }

      this.riderSlug = riderSlug;
    } else {
      this.riderSlug = `default-riderSlug-${Date.now()}-${this._id}`;
    }

    next();
  } catch (error: any) {
    next(error);
  }
});

export const Rider = model<IRider>("Rider", riderSchema);
