import { model, Schema } from "mongoose";
import { IDriver } from "./driver.interface";

const driverSchema = new Schema<IDriver>(
  {
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
  },
  {
    timestamps: true,
  }
);

driverSchema.pre("save", async function (next) {
  if (this.isModified("name")) {
    const baseSlug = this.name.toLowerCase().split(" ").join("-");
    let driverSlug = `${baseSlug}-driver`;

    let counter = 0;
    while (await Driver.exists({ driverSlug })) {
      driverSlug = `${driverSlug}-${counter++}`;
    }

    this.driverSlug = driverSlug;
  }
  next();
});

driverSchema.pre("findOneAndUpdate", async function (next) {
  const driver = this.getUpdate() as Partial<IDriver>;

  if (driver.name) {
    const baseSlug = driver.name.toLowerCase().split(" ").join("-");
    let driverSlug = `${baseSlug}-driver`;

    let counter = 0;
    while (await Driver.exists({ driverSlug })) {
      driverSlug = `${driverSlug}-${counter++}`;
    }

    driver.driverSlug = driverSlug;
  }

  this.setUpdate(driver);
  next();
});

export const Driver = model<IDriver>("Driver", driverSchema);
