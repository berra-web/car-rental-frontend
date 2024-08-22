import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './styles/App.css';
import CarList from './components/Car/CarList';
import AvailableCars from './components/Car/AvailableCars';
import AddCarForm from './components/Car/AddCarForm';
import CustomerList from './components/Customer/CustomerList';
import AddCustomerForm from './components/Customer/AddCustomerForm';
import CarDetail from './components/Car/CarDetail';
import RentalList from './components/Rental/RentalList';
import RentalDetail from './components/Rental/RentalDetail';
import RegisterRentalForm from './components/Rental/RegisterRentalForm';
import RegisterReturnForm from './components/Rental/RegisterReturnForm';

function App() {
  return (
    <Router>
      <div className="container">
        <h1>Car Rental System</h1>
        <nav>
          <ul className="nav">
            <li className="nav-item">
              <Link className="nav-link" to="/cars">All Cars</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/rentals">All Rentals</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/add-car">Add Car</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/add-customer">Add Customer</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/customers">All Customers</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/available-cars">Available Cars</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/register-rental">Register Rental</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/register-return">Register Return</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/cars" element={<CarList />} />
          <Route path="/car/:id" element={<CarDetail />} />
          <Route path="/rentals" element={<RentalList />} />
          <Route path="/rental/:id" element={<RentalDetail />} />
          <Route path="/add-car" element={<AddCarForm />} />
          <Route path="/add-customer" element={<AddCustomerForm />} />
          <Route path="/customers" element={<CustomerList />} />
          <Route path="/available-cars" element={<AvailableCars />} />
          <Route path="/register-rental" element={<RegisterRentalForm />} />
          <Route path="/register-return" element={<RegisterReturnForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
