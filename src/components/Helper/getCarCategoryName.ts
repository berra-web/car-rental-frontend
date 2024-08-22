import { CarCategory } from "../../models/CarCategory";


export const getCarCategoryName = (category: CarCategory): string => {
    switch (category) {
        case CarCategory.SmallCar:
            return 'Småbil';
        case CarCategory.Kombi:
            return 'Kombi';
        case CarCategory.Truck:
            return 'Lastbil';
        default:
            return 'Okänd kategori';
    }
};