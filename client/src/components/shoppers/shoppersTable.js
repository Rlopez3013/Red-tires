import { useContext, useState, useEffect } from 'react';
import { ShoppersContext } from '../context/shoppersContext';
import { CustomerContext } from '../context/customersContext';
import { useNavigate } from 'react-router-dom';
import WheelsContext from '../context/wheelContext';
import Axios from 'axios';
import { useParams } from 'react-router-dom';

const API_HOST = 'http://localhost:4000';
const SHOPPERS_API_URL = `${API_HOST}/api/shoppers`;
const WHEELS_API_URL = `${API_HOST}/api/wheels`;

const ShopperTable = () => {
  const { listShoppers, setListShoppers, getShopper } =
    useContext(ShoppersContext);
  const params = useParams();
  const [shopper, setShopper] = useState('');
  useEffect(() => {
    Axios.get(`${SHOPPERS_API_URL}`)
      .then((res) => {
        console.log('fetched shoppers:', res.data);
        setListShoppers(res.data);
      })
      .catch((error) => {
        console.error('error fetching shoppers', error);
      });
  }, [setListShoppers]);

  useEffect(() => {
    const loadShopper = async () => {
      if (params.customer_id) {
        console.log('init params', params.customer_id);
        const shopper = await getShopper(params.customer_id);
        console.log('params shopper', params.customer_id);
        setShopper({
          shopper: shopper.first_name,
        });
      }
    };
    loadShopper();
  }, []);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setShopper((values) => ({ ...values, [name]: value }));
  };

  // const handleCustomerChange = (e) => {
  //   const customerId = e.target.value;
  //   const foundCustomer = listShoppers.find((c) => c.id === customerId);
  //   setListShoppers(foundCustomer);
  //   // setListShoppers(listShoppers.find((c) => c.id === customerId));
  // };
  console.log(' select Customer', listShoppers);
  return (
    <div>
      <select
        // value={listShoppers ? listShoppers.customerId : ''}
        id="customerId"
        placeholder="Choose a Customer"
        className={'btn btn-success btn-lg dropdown-toggle'}
        onChange={handleChange}
      >
        <option>Select Customer</option>
        {listShoppers.map((customer, c) => (
          <option key={c} value={c.customer_id}>
            {`${customer.first_name} ${customer.last_name}`}
          </option>
        ))}
      </select>
      {listShoppers && (
        <div>
          <h2> Purchases:</h2>
          <ul className="list-group">
            {listShoppers.map((item, tr) => (
              <li
                className="list-group-item list-group-item-primary"
                key={tr}
                value={item.customerId}
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
