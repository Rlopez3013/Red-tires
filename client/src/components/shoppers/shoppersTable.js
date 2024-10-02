import { useContext, useState, useEffect } from 'react';
import Axios from 'axios';
import { ShoppersContext } from '../context/shoppersContext';
import { CustomerContext } from '../context/customersContext';
import { useNavigate } from 'react-router-dom';
import shopperStyle from './shopper.module.css';
import WheelsContext from '../context/wheelContext';

const TireCard = ({ tireName, company, model }) => {
  const [listCustomers, setListCustomers] = useState([]);

  return (
    <div className="card" style={{ width: '18rem' }}>
      <div className="card-body">
        <h5 className="card-title">{tireName}</h5>
        <h6 className="card-subtitle mb-2 text-muted">{company}</h6>
        <p className="card-text">Model: {model}</p>
      </div>
    </div>
  );
};

const ShopperTable = () => {
  const {
    listShoppers,
    setListShoppers,
    onDelete,
    inEditMode,
    updateShopper,
    onSave,
    onCancel,
  } = useContext(ShoppersContext);
  const navigate = useNavigate();
  const { listCustomers } = useContext(CustomerContext);
  const { listWheels } = useContext(WheelsContext);
  const [selectedCustomer, setSelectedCustomer] = useState();
  const [getShopper, setShopper] = useState([]);
  const [uniqueShopper, setUniqueShopper] = useState([]);

  const API_HOST = 'http://localhost:4000';

  const getShoppers = async (customer_id) => {
    try {
      const response = await Axios.get(
        `${API_HOST}/api/shoppers/customer/${customer_id}`
      );
      setShopper(response.data);
    } catch (error) {
      console.log('Error fetching customer', error);
    }
  };

  useEffect(() => {
    if (selectedCustomer) {
      getShoppers(selectedCustomer);
    }
  }, [selectedCustomer]);

  const filterByShopper = (customer) => {
    console.log('init filter', customer);
    console.log('list tires', listWheels);
    let filterCustomer = listCustomers.filter((wheel) => {
      return wheel.customerId == wheel.first_name;
    });
    setUniqueShopper(filterCustomer);
  };

  return (
    <div className={shopperStyle.shopper_bg}>
      <h1>Shopper table with tires</h1>
      <label>Name:</label>
      <select
        name="fullName"
        id="fullName"
        placeholder="Select Name"
        className="dropdown"
        //onChange={(e) => setSelectedCustomer(parseInt(e.target.value))}
        onChange={(e) => filterByShopper(e.target.value)}
      >
        <option>Select Name</option>
        {listCustomers.map((customer) => (
          <option key={customer.id} value={customer.id}>
            {`${customer.first_name} ${customer.last_name}`}
          </option>
        ))}
      </select>
      <div>
        <h1>Tire info</h1>
        <div className="row">
          {listWheels.map((wheel, wh) => (
            <div className="col-md-4" key={wh} value={wheel.tireId}>
              <TireCard
                tireName={wheel.tire_name}
                company={wheel.tire_company}
                model={wheel.model_name}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShopperTable;
