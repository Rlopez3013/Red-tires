import { useContext, useEffect, useState } from 'react';
import Axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { ShopperContext } from '../context/shoppersContext';

import { API_HOST } from '../context/config';
const CUSTOMERINFO_API_URL = `${API_HOST}/api/customeraddress`;
const CLIENTE_API_URL = `${API_HOST}/api/shoppers/clientes`;

const ClienteInfo = () => {
  const [listClientInfo, setListClientInfo] = useState([]);
  const [listClientes, setListClientes] = useState([]);
  const [clientInfo, setClientInfo] = useState([]);
  const [tireInfo, setTireInfo] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0); // Declare totalPrice state
  const [totalQty, setTotalQty] = useState(0); // Declare totalQty state
  const { customerId } = useParams();
  const navigate = useNavigate();

  // useEffect(() => {
  //   Axios.get(`${CUSTOMERINFO_API_URL}/${customerId}`)
  //     .then((res) => {
  //       console.log('this is cliente buying tire info ', res.data);
  //       setClientInfo(res.data);
  //     })
  //     .catch((error) => {
  //       console.log('error getting customer tire info', error);
  //     });
  // }, [customerId]);

  useEffect(() => {
    Axios.get(`${CLIENTE_API_URL}/${customerId}`)
      .then((res) => {
        console.log('this is the tire info', res.data);
        setTireInfo(res.data);

        // Calculate total price and quantity after tire info is fetched
        const total = res.data.reduce(
          (acc, unit) => {
            const price = unit.price;
            const qty = unit.Qty;

            const validPrice = isNaN(price) ? 0 : price;

            // Accumulate total price and quantity
            acc.totalPrice += price * qty; // price * quantity
            acc.totalQty += qty; // sum up quantities

            return acc;
          },
          { totalPrice: 0, totalQty: 0 }
        );

        setTotalPrice(total.totalPrice);
        setTotalQty(total.totalQty);
      })
      .catch((error) => {
        console.log('error getting tire info', error);
      });
  }, [customerId]);

  const handleCheckout = () => {
    navigate(`/cart/payment/${customerId}`);
  };

  return (
    <div className="container mt-4 bg-secondary p-4">
      <h2 className="mb-4">Client Address Information</h2>
      <ul className="list-group">
        {clientInfo.map((item) => (
          <li key={item.customerId} className="list-group-item mb-3">
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <strong>First Name:</strong> {item.first_name}
              </li>
              <li className="list-group-item">
                <strong>Last Name:</strong> {item.last_name}
              </li>
              <li className="list-group-item">
                <strong>Email:</strong> {item.email}
              </li>
              <li className="list-group-item">
                <strong>House Number:</strong> {item.number}
              </li>
              <li className="list-group-item">
                <strong>Street:</strong> {item.street}
              </li>
              <li className="list-group-item">
                <strong>City:</strong> {item.city}
              </li>
              <li className="list-group-item">
                <strong>State:</strong> {item.state}
              </li>
              <li className="list-group-item">
                <strong>Country:</strong> {item.country}
              </li>
              <li className="list-group-item">
                <strong>Zip Code:</strong> {item.zip_code}
              </li>
            </ul>
          </li>
        ))}
      </ul>

      <h2>Tire Information</h2>
      <div className="row">
        {tireInfo.map((unit) => (
          <div key={unit.customerId} className="col-md-4 mb-4">
            <div className="card">
              <div className="card-body">
                <div className="col-12 col-md-4">
                  {unit.img && (
                    <img
                      src={unit.img}
                      alt={`Tire image for ${unit.tire_name}`}
                      className="card-img-top"
                    />
                  )}
                </div>
                <h5 className="card-title">Tire: {unit.tire_name}</h5>
                <p className="card-text">
                  <strong>Model:</strong> {unit.model_name}
                </p>
                <p className="card-text">
                  <strong>Size:</strong> {unit.tire_size}
                </p>
                <p className="card-text">
                  <strong>Season:</strong> {unit.sn_name}
                </p>
                <p className="card-text">
                  <strong>Quantity:</strong> {unit.Qty}
                </p>
                <p className="card-text">
                  <strong>Price:</strong> ${unit.price}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-4">
        <h4>Total Quantity: {totalQty}</h4>
        <h4>Total Price: ${totalPrice.toFixed(2)}</h4>
      </div>

      <div className="text-center mt-4">
        <button className="btn btn-success btn-lg">
          <i className="fas fa-shopping-cart"></i> Checkout
        </button>
      </div>
    </div>
  );
};

export default ClienteInfo;
