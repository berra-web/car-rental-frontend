import React, { useState } from 'react'
import { CarDto } from '../../models/CarDto'
import { CarCategory } from '../../models/CarCategory'
import api from '../../services/api'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

const AddCarForm: React.FC = () => {
  const [car, setCar] = useState<CarDto>({
    registrationNumber: '',
    category: CarCategory.SmallCar,
    baseDailyRent: 0,
    baseKmPrice: 0,
    currentMileage: 0
  });

  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    setCar(prevCar => ({
      ...prevCar,
      [name]: name === 'category' ? parseInt(value) as CarCategory : value
    }));
  };

 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (car.registrationNumber.length > 6) {
      setError('Registration number must be 6 characters or less.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('registrationNumber', car.registrationNumber);
      formData.append('category', car.category.toString());
      formData.append('baseDailyRent', car.baseDailyRent.toString());
      formData.append('baseKmPrice', car.baseKmPrice.toString());
      formData.append('currentMileage', car.currentMileage.toString());

      const response = await api.post('/car', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Response:', response);
      navigate('/cars');
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response && err.response.status === 400 && err.response.data.message) {
          setError(err.response.data.message);
        } else {
          setError('Failed to add car');
        }
      } else {
        setError('An unexpected error occurred');
      }
    }
  };

  return (
    <div className="container mt-4">
      <h2>Add New Car</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Registration Number</label>
          <input
            type="text"
            className="form-control"
            name="registrationNumber"
            maxLength={6}
            value={car.registrationNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Category</label>
          <select
            className="form-control"
            name="category"
            value={car.category}
            onChange={handleChange}
            required
          >
            <option value={CarCategory.SmallCar}>Small Car</option>
            <option value={CarCategory.Kombi}>Kombi</option>
            <option value={CarCategory.Truck}>Truck</option>
          </select>
        </div>
        <div className="form-group">
          <label>Base Daily Rent</label>
          <input
            type="number"
            className="form-control"
            name="baseDailyRent"
            value={car.baseDailyRent}
            onChange={handleChange}
            required
            min={0}
          />
        </div>
        <div className="form-group">
          <label>Base Km Price</label>
          <input
            type="number"
            className="form-control"
            name="baseKmPrice"
            value={car.baseKmPrice}
            onChange={handleChange}
            required
            min={0}
          />
        </div>
        <div className="form-group">
          <label>Current Mileage</label>
          <input
            type="number"
            className="form-control"
            name="currentMileage"
            value={car.currentMileage}
            onChange={handleChange}
            required
            min={0}
          />
        </div>
        {error && <div className="alert alert-danger mt-2">{error}</div>}
        <button type="submit" className="btn btn-primary mt-2">Add Car</button>
      </form>
    </div>
  );
};

export default AddCarForm