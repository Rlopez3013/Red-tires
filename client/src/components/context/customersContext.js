import { createContext, useState, useEffect } from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_HOST } from './config';
const headers = {
  headers: { 'ngrok-skip-browser-warning': '1' },
};
const CUSTOMER_API_URL = `${API_HOST}/api/customers`;
const getAllCustomerList = Axios.get(CUSTOMER_API_URL, {headers});
const getCustomerRequest = async (id) =>
  await Axios.get(`${CUSTOMER_API_URL}/${id}`,{headers});

export const CustomerContext = createContext({});

export const CustomerProvider = ({ children }) => {
  const [listCustomers, setListCustomers] = useState([]);
  const [customer, setCustomer] = useState('');
  const navigate = useNavigate();

  const loadCustomers = () => {
    getAllCustomerList.then((response) => {
      setListCustomers(response.data);
      console.log(response.data);
    });
  };
  
  useEffect(() => {
    loadCustomers();
  }, []);

  const onDelete = async (id) => {
    try {
      const response = await Axios.delete(
        `${CUSTOMER_API_URL}/deleteCustomer/${id}`
      );
      setListCustomers(listCustomers.filter((customer) => customer.id != id));
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const addCustomer = () => {
    Axios.post(`${CUSTOMER_API_URL}`, { newCustomer: customer });
  };

  const updateCustomer = (id) => {
    Axios.put(`${CUSTOMER_API_URL}/api/customer/edit/${id}`, {
      newCustomer: customer,
    }).then(() => {
      setListCustomers.map((item) => {
        return item.id === id
          ? {
              id: id,
              customer: item.customer,
            }
          : item;
      });
    });
  };
  const [inEditMode, setInEditMode] = useState({
    status: true,
    rowKey: null,
  });

  const onEdit = ({ id, currentCustomer }) => {
    setInEditMode({
      status: true,
      rowKey: id,
    });
    setCustomer(currentCustomer);
  };

  const onSave = ({ id, newCustomer }) => {
    updateCustomer({ id, newCustomer });
  };

  const onCancel = () => {
    setInEditMode({
      status: false,
      rowKey: null,
    });
  };

  const getCustomer = async (id) => {
    try {
      const response = await getCustomerRequest(id);
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <CustomerContext.Provider
      value={{
        listCustomers,
        setListCustomers,
        customer,
        setCustomer,
        inEditMode,
        setInEditMode,
        getCustomer,
        onCancel,
        onDelete,
        onEdit,
        onSave,
        updateCustomer,
        addCustomer,
      }}
    >
      {children}
    </CustomerContext.Provider>
  );
};

export default CustomerContext;
