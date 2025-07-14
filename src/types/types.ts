import { LucideIcon } from "lucide-react";

export type HTTPMethod = "POST" | "PUT" | "DELETE" | "PATCH" | "GET";

export class APIError extends Error {
  status: number;
  data: any;

  constructor(message: string, status: number, data: any) {
    super(message);
    this.status = status;
    this.data = data;
    Object.setPrototypeOf(this, APIError.prototype); // penting untuk instanceof
  }
}

// Define the shape of the state
type BearState = {
  bears: number;
};

// Define the shape of the actions
type BearActions = {
  increasePopulation: () => void;
  removeAllBears: () => void;
  updateBears: (newBears: number) => void;
};

// Combine state and actions
export type BearStore = BearState & BearActions;

type AllowedPrimitive = string | number | boolean | Date | File | Blob | null;
export type AllowedValue = AllowedPrimitive | AllowedPrimitive[];

// Format 2: Array data
export type DataArray<T> = T[];

// Format 3: Single object data
export type DataObject<T> = T;

export type decodedProps = {
  id: number;
  email: string;
  name: string;
  role: string;
  user_data: any;
  iat: number;
  exp: number;
};

// Define types for our navigation items
export type SubItem = {
  title: string;
  url: string;
  roles?: string[]; // Roles that can access this subitem
};

export type NavItem = {
  title: string;
  url: string;
  icon?: LucideIcon;
  isActive?: boolean;
  items?: SubItem[];
  roles?: string[]; // Roles that can access this item
  directLinkRoles?: string[]; // Roles that should access the main URL directly without seeing sub-items
};
