import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import api from '../../services/api';
import { Rental } from '../../models/Rental';
import { formatSwedishDate } from '../Helper/formatSwedishDate';
import { getCarCategoryName } from '../Helper/getCarCategoryName';

const RentalDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [rental, setRental] = useState<Rental | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchRental = async () => {
            try {
                const response = await api.get(`/rental/${id}`);
                setRental(response.data);
            } catch (err) {
                setError('Failed to load rental details.');
            }
        };
        fetchRental();
    }, [id]);

    if (error) {
        return <div>{error}</div>;
    }

    if (!rental) {
        return <div>Loading...</div>;
    }

    return (
        <div className='container'>
            <h2>Rental Details</h2>
            <p><strong>Rental ID:</strong> {rental.id}</p>
            <p><strong>Booking Number:</strong> {rental.bookingNumber}</p>
            <p><strong>Car:</strong> {rental.car?.registrationNumber || 'Unknown Car'}</p>
            <p><strong>Category:</strong> {rental.car ? getCarCategoryName(rental.car.category) : 'Unknown Category'}</p>
            <p><strong>Customer Name:</strong> {rental.customer?.name || 'Unknown Customer'}</p>
            <p><strong>Customer Phone Number:</strong> {rental.customer?.phoneNumber || 'Unknown'}</p>
            <p><strong>Rental Start:</strong> {formatSwedishDate(rental.rentalStart)}</p>
            <p><strong>Rental End:</strong> {rental.rentalEnd ? formatSwedishDate(rental.rentalEnd) : 'Ongoing'}</p>
            <p><strong>Days Rented:</strong>{rental.daysRented ?? 0}</p>
            <p><strong>Start Mileage:</strong> {rental.startMileage}</p>
            <p><strong>End Mileage:</strong> {rental.endMileage || 'N/A'}</p>
            <p><strong>Total Price:</strong> {rental.price ? `${rental.price.toFixed(2)} SEK` : 'Not calculated'}</p>
        </div>
    );
};

export default RentalDetail