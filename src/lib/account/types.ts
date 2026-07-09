export type ShippingAddress = {
  line1: string;
  line2?: string;
  city: string;
  state: string;
  zip: string;
};

export type AccountUser = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: ShippingAddress;
  createdAt: string;
};

export type StoredUserRecord = AccountUser & {
  passwordHash: string;
};

export type AccountTab = "overview" | "profile" | "orders" | "matches" | "addresses";
