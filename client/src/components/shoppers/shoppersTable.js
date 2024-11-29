import { useContext, useState, useEffect } from 'react';
import { ShoppersContext } from '../context/shoppersContext';
import Axios from 'axios';
import { useParams } from 'react-router-dom';
import shopperStyle from './shopper.module.css';

import { API_HOST } from '../context/config';
const SHOPPERS_API_URL = `${API_HOST}/api/shoppers/customer`;
const WHEELS_API_URL = `${API_HOST}/api/wheels`;
const getAllShopperList = Axios.get(`${API_HOST}/api/shoppers`);

const ShopperTable = () => {
  const { listShoppers, setListShoppers, getShopper } =
    useContext(ShoppersContext);
  const { customerId } = useParams();
  const [shopper, setShopper] = useState([]); // I put it as an object did not show the detail in the browse, just use array.
  const [selectedCustomer, setSelectedCustomer] = useState('');

  const loadShopper = async () => {
    try {
      const response = await getAllShopperList;
      setListShoppers(response.data);
    } catch (error) {
      console.error('Error fectching shopper', error);
    }
  };

  useEffect(() => {
    loadShopper();
  }, []);

  const handleChange = (event) => {
    const customerId = event.target.value;
    setSelectedCustomer(customerId);
    setShopper([]);
    console.log('Selected Customer ID:', customerId);

    if (customerId) {
      Axios.get(`${SHOPPERS_API_URL}`)
        .then((res) => {
          console.log('get shopper Id:', res.data);
          setShopper(res.data);
        })
        .catch((error) => {
          console.error('Error fetching customer data', error);
        });
    } else {
      setShopper([]);
    }
  };
  console.log(' select Customer', listShoppers);
  return (
    <div>
      <select
        // value={listShoppers ? listShoppers.customerId : ''}
        id="customerId"
        placeholder="Choose a Customer"
        className={'btn btn-success btn-lg dropdown-toggle'}
        //value={selectedCustomer}
        onChange={handleChange}
      >
        <option>Select Customer</option>
        {listShoppers.map((customer, c) => (
          <option key={c} value={customer.customerId}>
            {`${customer.first_name} ${customer.last_name}`}
          </option>
        ))}
      </select>
      {shopper && (
        <div>
          <h2 className={shopperStyle.shopper_title}> Purchases:</h2>
          <ul className="list-group">
            {shopper?.map((item, c) => (
              <li
                className="list-group-item list-group-item-action list-group-item-primary"
                key={item.customerId}
                //value={item.customerId}
              >
                {item.tire_name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
export default ShopperTable;
