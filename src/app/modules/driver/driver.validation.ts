import { z } from "zod";

export const createDriverSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email(),
  vehicleInfo: z.object({
    vehicleType: z.string().min(1, "Vehicle type is required"),
  }),
});

export const updateDriverSchema = z.object({
  name: z.string().min(1).optional(),
  email: z.string().email().optional(),
  driverDivision: z.string().optional(),
  vehicleInfo: z
    .object({
      vehicleType: z.string().min(1).optional(),
      vehicleNumber: z.string().min(1).optional(),
    })
    .optional(),
});

export const acceptRideRequestSchema = z.object({
  driverSlug: z.string().min(1, "Driver slug is required"),
});

export const updateRideStatusSchema = z.object({
  status: z.enum([
    "requested",
    "accepted",
    "picked_up",
    "in_transit",
    "completed",
    "cancelled",
  ]),
});

export const setAvailabilityStatusSchema = z.object({
  available: z.boolean(),
});

export const approveOrSuspendDriverSchema = z.object({
  status: z.enum(["approved", "suspended"]),
});
