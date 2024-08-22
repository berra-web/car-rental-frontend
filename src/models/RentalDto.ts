export interface RentalDto {
    carId: number;
    customerId: string;
    customerName: string;
    customerPhoneNumber: string;
    rentalStart: string;
    startMileage: number | null;
    price: number | null;
}