import { z } from "zod";

export const createRiderZodSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  riderSlug: z.string().optional(),
});

export const requestRiderZodSchema = z.object({
  riderSlug: z.string(),
  pickupLocation: z.string(),
  destinationLocation: z.string(),
  requestedAt: z.string().optional(),
});

export const updateRiderZodSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  location: z.string().optional(),
  riderType: z.string().optional(),
  riderDivision: z.string().optional(),
  rideStatus: z
    .enum([
      "requested",
      "accepted",
      "picked_up",
      "in_transit",
      "completed",
      "cancelled",
    ])
    .optional(),
  available: z.boolean().optional(),
  cancelAllowedBeforeDriverAcceptance: z.boolean().optional(),
  rideRequest: z
    .object({
      pickupLocation: z.string().optional(),
      destinationLocation: z.string().optional(),
    })
    .optional(),
});

export const createRiderTypeZodSchema = z.object({
  name: z.string(),
});
