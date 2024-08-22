import React, { useEffect, useState } from 'react'
import { Car } from '../../models/Car';
import api from '../../services/api';
import { Link } from 'react-router-dom';

const CarList: React.FC = () => {
    const [cars, setCars] = useState<Car[]>([]);

    useEffect(() => {
        const fetchCars = async () => {
            try {
                const response = await api.get<Car[]>('/car');
                setCars(response.data);
            } catch (error) {
                console.error('Error fetching cars:', error);
            }
        };

        fetchCars();
    }, []);

    return (
        <div className='container'>
            <h2>All Cars</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Car Id</th>
                        <th>Registration Number</th>
                        <th>Category</th>
                        <th>Base Daily Rent</th>
                        <th>Base Km Price</th>
                        <th>Current Mileage</th>
                        <th>Availability</th>
                    </tr>
                </thead>
                <tbody>
                    {cars.map(car => (
                        <tr key={car.id}>
                            <td>
                                <Link to={`/car/${car.id}`}>
                                {car.id}
                                </Link>
                            </td>
                            <td>{car.registrationNumber.toUpperCase()}</td>
                            <td>{car.category}</td>
                            <td>{car.baseDailyRent}</td>
                            <td>{car.baseKmPrice}</td>
                            <td>{car.currentMileage}</td>
                            <td>{car.isAvailable ? 'Available' : 'Rented'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default CarList;