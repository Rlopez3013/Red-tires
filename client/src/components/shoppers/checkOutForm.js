import { useState, useContext, useEffect } from 'react';
import Axios from 'axios';
//import Select from 'react-select';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { ShoppersContext } from '../context/shoppersContext';
import { API_HOST } from '../context/config';
const CHECKOUTS_API_URL = `${API_HOST}/api/checkouts`;
const getAllCheckoutList = Axios.get(CHECKOUTS_API_URL);

function CheckoutForm() {
  const [checkout, setCheckout] = useState('');
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [selectedEnvios, setSelectedEnvios] = useState(null);
  const { listCheckouts, setListCheckouts } = useContext(ShoppersContext);
  const { checkout_id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  
  const options = [
    { value: 'paypal', label: 'Paypal' },
    { value: 'bank_tranfer', label: 'Bank Tranfer' },
    { value: 'credit_card', label: 'Credit Card' },
  ];

  const status = [
    { value: 'pending', label: 'Pending' },
    { value: 'paid', label: 'Paid' },
    { value: 'failed', label: 'Failed' },
  ];

  const envios = [
    { value: 'overnight', label: 'Overnight' },
    { value: 'standard', label: 'Standard' },
    { value: 'express', label: 'Express' },
  ];

  useEffect(() => {
    Axios.get(`${CHECKOUTS_API_URL}`).then((res) => {
      console.log('this is a checkout', res.data);
      setCheckout(res.data);
    });
  }, []);

  function clienteInfo(e) {
    e.preventDefault();
    Axios.post(`${CHECKOUTS_API_URL}`, {
      payment_method: checkout.payment_method,
      payment_status: checkout.payment_status,
      shipping_address: checkout.shipping_address,
      shipping_method: checkout.shipping_method,
      shipping_cost: checkout.shipping_cost,
      order_id: checkout.order_id,
      customer_id: checkout.customer_id,
    })
      .then((response) => {
        let item = response.data;
        console.log('server response', response.data);
        setListCheckouts((prevState) => [...prevState, item]);
        navigate('/checkoutform');
        console.log('checkout postedd', response.data);
      })
      .catch((error) => {
        console.error(
          'Error adding cliente info:',
          error.response ? error.response.data : error.message
        );
      });
  }

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setCheckout((values) => ({ ...values, [name]: value }));
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Checkout Form</h2>
      <form onSubmit={clienteInfo}>
        <div className="mb-3">
          <label className="form-label">Payment Method</label>
          <select
            className="form-select"
            placeholder="Choose Payment Method"
            value={selectedOption}
            onChange={(e) => setSelectedOption(e.target.value)}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Payment Status</label>
          <select
            className="form-select"
            placeholder="Choose Payment Status"
            value={selectedPayment}
            onChange={(e) => setSelectedPayment(e.target.value)}
          >
            {status.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Shipping Method</label>
          <select
            className="form-select"
            placeholder="Choose shipping Method"
            value={selectedEnvios}
            onChange={(e) => setSelectedEnvios(e.target.value)}
          >
            {envios.map((e) => (
              <option key={e.value} value={e.value}>
                {e.label}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Shipping Address</label>
          <input
            type="text"
            className="form-control"
            name="shipping_address"
            placeholder="Enter your address"
            value={checkout.shipping_address || ''}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Shipping Cost</label>
          <input
            type="number"
            className="form-control"
            name="shipping_cost"
            placeholder="Enter shipping fee"
            value={checkout.shipping_cost || ''}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default CheckoutForm;
