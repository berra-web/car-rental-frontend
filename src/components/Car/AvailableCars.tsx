import React, { useEffect, useState } from 'react'
import api from '../../services/api';
import { Car } from '../../models/Car';

const AvailableCars: React.FC = () => {
    const [cars, setCars] = useState<Car[]>([]);

    useEffect(() => {
        const fetchAvailableCars = async () => {
            const response = await api.get<Car[]>('/car/available');
            setCars(response.data);
        };

        fetchAvailableCars();
    }, []);
    return (
        <div className="container">
            <h2>Available Cars</h2>
            <table className="table">
                <thead>
                    <tr>
                    <th>Car Id</th>
                        <th>Registration Number</th>
                        <th>Category</th>
                        <th>Base Daily Rent</th>
                        <th>Base Km Price</th>
                        <th>Current Mileage</th>
                    </tr>
                </thead>
                <tbody>
                    {cars.map(car => (
                        <tr key={car.id}>
                            <td>{car.id}</td>
                            <td>{car.registrationNumber}</td>
                            <td>{car.category}</td>
                            <td>{car.baseDailyRent}</td>
                            <td>{car.baseKmPrice}</td>
                            <td>{car.currentMileage}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default AvailableCars