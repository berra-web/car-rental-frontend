import React, { useState } from 'react'
import { CustomerDto } from '../../models/CustomerDto';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { formatPersonId } from '../Helper/formatPersonId';

const AddCustomerForm: React.FC = () => {
    const [customer, setCustomer] = useState<CustomerDto>({
        personId: '',
        name: '',
        phoneNumber: ''
    });

    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setCustomer(prevCustomer => ({
            ...prevCustomer,
            [name]: name === 'personId' ? formatPersonId(value) : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (customer.personId.length !== 11) {
            setError('PersonId must be exactly 10 digits long and formatted as XXXXXX-YYYY.');
            return;
        }

        try {
            const response = await api.post('/customer', customer);
            console.log('Response:', response);
            navigate('/customers');
        } catch (err) {
            console.error('Failed to add customer:', err);
            setError('Failed to add customer');
        }
    };

    return (
        <div className="container mt-4">
            <h2>Add New Customer</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Personal Number</label>
                    <input
                        type="text"
                        className="form-control"
                        name="personId"
                        value={customer.personId}
                        onChange={handleChange}
                        maxLength={11}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Namn</label>
                    <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={customer.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Telefonnummer</label>
                    <input
                        type="text"
                        className="form-control"
                        name="phoneNumber"
                        value={customer.phoneNumber}
                        onChange={handleChange}
                        maxLength={10}
                        required
                    />
                </div>
                {error && <div className="alert alert-danger mt-2">{error}</div>}
                <button type="submit" className="btn btn-primary mt-2">Add Customer</button>
            </form>
        </div>
    );
}

export default AddCustomerForm