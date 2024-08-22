import React, { useEffect, useState } from 'react'
import { Customer } from '../../models/Customer';
import api from '../../services/api';

const CustomerList: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      const response = await api.get<Customer[]>('/customer');
      setCustomers(response.data);
    };

    fetchCustomers();
  }, []);

  return (
    <div className="container">
      <h2>All Customers</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Person ID</th>
            <th>Name</th>
            <th>Phone Number</th>
          </tr>
        </thead>
        <tbody>
          {customers.map(customer => (
            <tr key={customer.id}>
              <td>{customer.id}</td>
              <td>{customer.name}</td>
              <td>{customer.phoneNumber}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CustomerList