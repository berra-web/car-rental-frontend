import React, { useState } from 'react'
import { RentalDto } from '../../models/RentalDto';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { formatSwedishDate } from '../Helper/formatSwedishDate';
import { formatPersonId } from '../Helper/formatPersonId';
import axios from 'axios';

const RegisterRentalForm: React.FC = () => {
  const [rental, setRental] = useState<RentalDto>({
    carId: 0,
    customerId: '',
    customerName: '',
    customerPhoneNumber: '',
    rentalStart: formatSwedishDate(new Date().toISOString()),
    startMileage: 0,
    price: null,
  });

  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setRental(prevRental => ({
        ...prevRental,
        [name]: name === 'customerId' ? formatPersonId(value) : value,
    }));
};

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
        const response = await api.post('/rental/register-rental', rental);
  
        console.log('Rental registered:', response.data);
      navigate('/rentals');
    } catch (err) {
        if (axios.isAxiosError(err)) {
            if (err.response && err.response.status === 400 && err.response.data.message) {
                setError(err.response.data.message); 
            } else {
                setError('Failed to register rental.');
            }
        } else {
            setError('An unexpected error occurred.');
        }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Car ID</label>
        <input type="number" value={rental.carId} className="form-control" name="carId" onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label>Personal Number</label>
        <input type="text" value={rental.customerId} maxLength={11} required className="form-control" name="customerId" onChange={handleChange} />
      </div>
      <div className="form-group">
        <label>Customer Name</label>
        <input type="text" value={rental.customerName} className="form-control" name="customerName" onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label>Customer Phone Number</label>
        <input type="text" value={rental.customerPhoneNumber}  maxLength={10} className="form-control" name="customerPhoneNumber" onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label>Rental Start</label>
        <input type="datetime-local" className="form-control" name="rentalStart" onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label>Start Mileage</label>
        <input type="number" className="form-control" name="startMileage" onChange={handleChange} />
      </div>
      <div className="form-group">
        <label>Price</label>
        <input type="number" className="form-control" name="price" onChange={handleChange} />
      </div>
      {error && <div className="alert alert-danger">{error}</div>}
      <button type="submit" className="btn btn-primary">Register Rental</button>
    </form>
  );
}

export default RegisterRentalForm