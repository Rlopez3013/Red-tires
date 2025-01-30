import { useState, useEffect } from 'react';
import Axios from 'axios';
import { useParams } from 'react-router-dom';
import shopperStyle from './shopper.module.css';
import { API_HOST } from '../context/config';
import { loadStripe } from '@stripe/stripe-js';
//import PaymentProcedure from '../../cart/PaymentProcedure';

const CLIENTE_API_URL = `${API_HOST}/api/shoppers/clientes`;
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);

const ClientesTable = () => {
  const [listClientes, setListClientes] = useState([]);
  const [cliente, setCliente] = useState([]);
  const [selectedCliente, setSelectedCliente] = useState('');
  const [showPayment, setShowPayment] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const itemName = 'tire';
  const itemPrice = 300;

  const { customerId } = useParams();

  // Load all clients
  const loadCliente = async () => {
    try {
      const response = await Axios.get(CLIENTE_API_URL);
      console.log('API Response:', response.data);
      setListClientes(response.data);
    } catch (error) {
      console.error('Error fetching clientes:', error);
    }
  };

  // Handle cliente selection
  const handleChange = (event) => {
    const customerId = event.target.value;
    setSelectedCliente(customerId);
    setCliente([]);
    console.log('Selected Customer ID:', customerId);

    if (customerId) {
      Axios.get(`${CLIENTE_API_URL}/${customerId}`)
        .then((res) => {
          console.log('Fetched shopper data:', res.data);
          setCliente(res.data);
          // setCliente(res.data.items || []);
        })
        .catch((error) => {
          console.error('Error fetching customer data', error);
        });
    } else {
      setCliente([]);
    }
  };

  useEffect(() => {
    loadCliente();
  }, []);

  const calculateTotals = () => {
    var totalQty = 0;
    var totalPrice = 0;

    cliente.forEach((item) => {
      //sum up total quantity
      totalQty += item.Qty || 0;

      const price = parseFloat(item.price);
      if (!isNaN(price)) {
        totalPrice += price * (item.Qty || 0);
      }
    });
    return { totalQty, totalPrice };
  };
  const { totalQty, totalPrice } = calculateTotals();

  const handleCheckout = () => {
    setShowPayment(true);
  };

  const checkout = async () => {
    try {
      // Perform the POST request
      const response = await Axios.post(
        'http://localhost:4000/create-checkout-session',
        {
          items: [
            {
              quantity: quantity,
              price: itemPrice,
              name: itemName,
            },
          ],
        }
      )
        .then((res) => {
          console.log('result from checkout session ', res.data);
          window.location = res.data.url;
          //if (res.ok) return res.json();
          //return res.json().then((json) => Promise.reject(json));
        })
        .catch((e) => {
          console.log(e.error);
        });
      console.log('response from axios', response.data);
      // Load Stripe to redirect to checkout
      const stripe = await stripePromise;
      // await stripe.redirectToCheckout({ sessionId: id });
    } catch (error) {
      console.error('Checkout failed:', error);
    }
  };

  return (
    <div className={shopperStyle.container}>
      <div className={shopperStyle.selectContainer}>
        <label htmlFor="customerId" className={shopperStyle.selectLabel}>
          Choose Cliente
        </label>
        <select
          id="customerId"
          className={shopperStyle.selectInput}
          onChange={handleChange}
          value={selectedCliente}
        >
          <option value="">Select Cliente</option>
          {listClientes?.map((cliente) => (
            <option key={cliente.customerId} value={cliente.customerId}>
              {`${cliente.first_name} ${cliente.last_name}`}
            </option>
          ))}
        </select>
      </div>

      {cliente?.length > 0 && !showPayment && (
        <div className={shopperStyle.clienteDetails}>
          <h2>Purchase Details</h2>
          <div className="row">
            {cliente.map((item, td) => (
              <div className="col-12 col-md-4" key={td}>
                <div className="card mb-4 shadow-sm">
                  {item.img && (
                    <img
                      src={item.img}
                      alt={`Tire image for ${item.tire_name}`}
                      className="card-img-top"
                    />
                  )}
                  <div className="card-body">
                    <h5 className="card-title">{item.tire_name}</h5>
                    <p className="card-text">
                      <strong>Car:</strong> {item.model_name}
                    </p>
                    <p className="card-text">
                      <strong>Quantity:</strong> {item.Qty}
                    </p>
                    <p className="card-text">
                      <strong>Price:</strong> $
                      {parseFloat(item.price).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className={shopperStyle.totalPrice}>
            {/* Display total quantity and total price */}
            <p>
              <strong>Total Quantity:</strong> {totalQty}
            </p>
            <p>
              <strong>Total Price:</strong> ${totalPrice.toFixed(2)}
            </p>
          </div>

          {/* <a
            href={`http://localhost:3000/shoppers/customeraddress/${
              selectedCliente || customerId
            }`}
          > */}
          <button onClick={checkout} className={shopperStyle.actionButton}>
            Go to Checkout
          </button>
          {/* </a> */}
        </div>
      )}
      {/* {showPayment && (
        <div>
          <div>Extra</div>
          <PaymentProcedure totalPrice={totalPrice} />
        </div>
      )} */}
    </div>
  );
};

export default ClientesTable;
