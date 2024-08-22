import React, { useEffect, useState } from 'react'
import { Rental } from '../../models/Rental';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import { formatSwedishDate } from '../Helper/formatSwedishDate';
import { getCarCategoryName } from '../Helper/getCarCategoryName';

const RentalList: React.FC = () => {
  const [rentals, setRentals] = useState<Rental[]>([]);
  const [filteredRentals, setFilteredRentals] = useState<Rental[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRentals = async () => {
      try {
        const response = await api.get<Rental[]>('/rental');
        setRentals(response.data);
        setFilteredRentals(response.data);
      } catch (err) {
        setError('Failed to load rentals.');
      }
    };
    fetchRentals();
  }, []);


  useEffect(() => {
    const filtered = rentals.filter((rental) =>
      rental.bookingNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rental.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rental.car.registrationNumber.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredRentals(filtered);
  }, [searchTerm, rentals]);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className='container'>
      <h2>All Rentals</h2>

      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by Booking Number, Customer Name, or Car Registration"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>Rental ID</th>
            <th>Booking Number</th>
            <th>Car</th>
            <th>Car Id</th>
            <th>Category</th>
            <th>Customer</th>
            <th>Customer Id</th>
            <th>Start Mileage</th>
            <th>End Mileage</th>
            <th>Rental Start</th>
            <th>Rental End</th>
            <th>Days Rented</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {filteredRentals.map(rental => (
            <tr key={rental.id}>
              <td>
                <Link to={`/rental/${rental.id}`}>
                  {rental.id}
                </Link>
              </td>
              <td>{rental.bookingNumber}</td>
              <td>{rental.car.registrationNumber}</td>
              <td>{rental.car.id}</td>
              <td>{getCarCategoryName(rental.car.category)}</td>
              <td>{rental.customer.name}</td>
              <td>{rental.customer.id}</td>
              <td>{rental.startMileage}</td>
              <td>{rental.endMileage}</td>
              <td>{formatSwedishDate(rental.rentalStart)}</td>
              <td>{rental.rentalEnd ? formatSwedishDate(rental.rentalEnd) : 'Ongoing'}</td>
              <td>{rental.daysRented ?? 0}</td>
              <td>{rental.price ? `${rental.price.toFixed(2)} SEK` : 'Not calculated'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};


export default RentalList