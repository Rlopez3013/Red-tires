import { useState, useContext, useEffect } from 'react';
import { customersContext } from '../context/customersContext';
import Axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function customerForm() {
  const [customer, setCustomer] = useState('');
  const [address, setAddress] = useState('');
  const { listCustomers, setListCustomers, getCustomer } =
    useContext(customersContext);
  const params = useParams();
  const navigate = useNavigate();

  const API_HOST = 'http://localhost:4000';
  const CUSTOMERS_API_URL = `${API_HOST}/api/customers`;
  const ADDRESS_API_URL = `${API_HOST}/api/customers_addressess`;

  useEffect(() => {
    Axios.get(`${CUSTOMERS_API_URL}`).then((res) => {
      setListCustomers(res.data);
    });
  }, []);

  useEffect(() => {
    Axios.get(`${ADDRESS_API_URL}`).then((res) => setlistAddresses(res.data));
  }, []);

  // useEffect(() => {
  //   const loadCustomers = async () => {
  //     if (params.id) {
  //       const customer = await getCustomer(params.id);
  //       console.log(customer);
  //       setCustomer({
  //         customer: customer.customer,
  //       });
  //     }
  //   };
  // });

  useEffect(() => {
    const loadCustomers = async () => {
      if (params.id) {
        const customer = await getCustomer(params.id);
        console.log(customer)
        setCustomer({
          ...customer,
        });
      }
    };
    loadCustomers(); // Call the function here
  }, [params.id]); // Add params.id as a dependency
  

  const addCustomer = (e) => {
    e.preventDefault();
    Axios.post('http://localhost:4000/api/customers', {
      first_name: first_name.first_name,
      last_name: last_name.last_name,
      email: email.email,
      number: number.number,
      street: street.street,
      city: city.city,
      state: state.state,
      country: country.country,
      zip_code: zip_code.zip_code,
    }).then((res) => {
      let newItem = res.data;
      setListCustomers((de) => [...de, newItem]);
      navigate('/Customers/patrons');
      console.log(res.data);
    });
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setCustomer((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(customer);
  };

  return <div>customerForm</div>;
}

export default customerForm;
