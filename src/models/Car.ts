import { CarCategory } from "./CarCategory";

export interface Car {
    id: number;
    registrationNumber: string;
    category: CarCategory;
    baseDailyRent: number;
    baseKmPrice: number;
    currentMileage: number;
    isAvailable: boolean;
}