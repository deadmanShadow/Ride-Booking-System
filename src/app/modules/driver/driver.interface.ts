export interface IDriver {
  name: string;
  email: string;
  driverSlug: string;

  vehicleInfo: {
    vehicleType: string;
    vehicleNumber: string;
  };
  availabilityStatus: boolean;
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
  earnings: number;
  status: "approved" | "suspended";
}

export interface IApproveOrSuspendDriver {
  driverSlug: string;
  status: "approved" | "suspended";
}
