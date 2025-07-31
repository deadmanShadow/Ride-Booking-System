import { Types } from "mongoose";

export interface IRiderType {
  name: string;
}

export interface IRider {
  _id: Types.ObjectId;
  name: string;
  email: string;
  riderSlug: string;
  riderDivision: Types.ObjectId;
  riderType: Types.ObjectId;

  rideRequest: {
    pickupLocation: string;
    destinationLocation: string;
    requestedAt: Date;
  };
  rideStatus:
    | "requested"
    | "accepted"
    | "picked_up"
    | "in_transit"
    | "completed"
    | "cancelled";

  cancelledAt?: Date;
  rideHistory: {
    status:
      | "requested"
      | "accepted"
      | "picked_up"
      | "in_transit"
      | "completed"
      | "cancelled";
    timestamp: Date;
  }[];

  available: boolean;
  cancelAllowedBeforeDriverAcceptance: boolean;
}
