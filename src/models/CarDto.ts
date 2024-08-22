import { CarCategory } from "./CarCategory";

export interface CarDto {
    registrationNumber: string;
    category: CarCategory ;
    baseDailyRent: number;
    baseKmPrice: number;
    currentMileage: number;
}