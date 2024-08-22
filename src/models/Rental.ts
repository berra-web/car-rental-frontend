import { Car } from "./Car";
import { Customer } from "./Customer";

export interface Rental {
    id: number;
    bookingNumber: string;
    carId: number;
    car: Car;
    customerId: string;
    customer: Customer;
    rentalStart: string;
    rentalEnd: string | null;
    startMileage: number | null;
    endMileage: number | null;
    price: number | null;
    daysRented: number | null;
}