import { categoryType } from "~/type/categoryType";
import { locationType } from "~/type/locationType";

export type machineType = {
  id: number;
  serialNumber?: string;
  name: string;
  model?: string;
  manufactureDate?: string;
  category?: categoryType;
  location?: locationType;
  categoryName?: string;
  locationName?: string;
};

export type machinePostType = {
  name: string;
  serialNumber: string;
  model: string;
  manufactureDate: string;
  categoryId?: string | number;
  locationId?: string | number;
};
