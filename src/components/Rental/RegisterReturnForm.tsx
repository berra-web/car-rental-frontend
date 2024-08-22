import React, { useState } from 'react'
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const RegisterReturnForm: React.FC = () => {
  const [bookingNumber, setBookingNumber] = useState<string>('');
  const [endMileage, setEndMileage] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await api.post('/rental/register-return', { bookingNumber, endMileage });

      console.log('Return registered:', response.data);

      const rentalId = response.data.rentalId; // Hämta rentalId från svaret
      if (rentalId) {
        navigate(`/rental/${rentalId}`); // Navigera till RentalDetail med det returnerade rentalId
      } else {
        setError('Failed to get rental details after return.');
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response && err.response.status === 400 && err.response.data.message) {
          setError(err.response.data.message);
        } else {
          setError('Failed to register return');
        }
      } else {
        setError('An unexpected error occurred');
      }
    }
  };

  return (
    <div className="container mt-4">
      <h2>Register Return</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Booking Number</label>
          <input
            type="text"
            className="form-control"
            value={bookingNumber}
            onChange={(e) => setBookingNumber(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>End Mileage</label>
          <input
            type="number"
            className="form-control"
            value={endMileage}
            onChange={(e) => setEndMileage(Number(e.target.value))}
            required
            min={0}
          />
        </div>
        {error && <div className="alert alert-danger mt-2">{error}</div>}
        <button type="submit" className="btn btn-primary mt-2">Register Return</button>
      </form>
    </div>
  );
};

export default RegisterReturnForm