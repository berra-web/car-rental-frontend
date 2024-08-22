import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { CarDto } from '../../models/CarDto';
import api from '../../services/api';
import { getCarCategoryName } from '../Helper/getCarCategoryName';

const CarDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [car, setCar] = useState<CarDto | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCar = async () => {
            try {
                const response = await api.get(`/car/${id}`);
                setCar(response.data);
            } catch (err) {
                setError('Failed to load car details.');
            }
        };
        fetchCar();
    }, [id]);

    if (error) {
        return <div>{error}</div>;
    }

    if (!car) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>Car Details</h2>
            <p><strong>Registration Number:</strong> {car.registrationNumber}</p>
            <p><strong>Category:</strong> {getCarCategoryName(car.category)}</p>
            <p><strong>Base Daily Rent:</strong> {car.baseDailyRent}</p>
            <p><strong>Base Km Price:</strong> {car.baseKmPrice}</p>
            <p><strong>Current Mileage:</strong> {car.currentMileage}</p>
        </div>
    );
};

export default CarDetail