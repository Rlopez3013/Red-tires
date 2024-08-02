import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Axios from 'axios';
const API_HOST = 'http://localhost:4000';
const Customers_API_URL = `${API_HOST}/api/customers`;
const getAllCustomersList = Axios.get(Customers_API_URL);
const getCustomer = async (id) =>
  await Axios.get(`http://localhost:4000/api/customers/${id}`);

function CustomerEdit() {
  const { id } = useParams();
  const [listCustomers, setListCustomers] = useState([]);
  const [customer, setCustomer] = useState({});
  const params = useParams();
  const navigate = useNavigate();

  const loadCustomers = () => {
    getAllCustomersList.then((res) => {
      setListCustomers(res.data);
    });
  };
  useEffect(() => {
    Axios.get(`${Customers_API_URL}/${id}`).then((res) => {
      console.log('updating customers', res.data);
      setListCustomers(res.data);
    });
    loadCustomers();
  }, []);

  function updateCustomer(event) {
    Axios.put(`${Customers_API_URL}/updateCustomer/${id}`, customer).then(
      (res) => setListCustomers(res.data),
      navigate('/api/customers'),
      loadCustomers(),
      console.log('this is customer updated', customer)
    );
  }

  return <div>customerEdit</div>;
}

export default CustomerEdit;
