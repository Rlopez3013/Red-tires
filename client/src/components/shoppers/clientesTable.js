import { useContext, useState, useEffect } from 'react';
import { ShoppersContext } from '../context/shoppersContext'
import {useParams} from 'react-router-dom'
import shopperStyle from './shopper.module.css';
import Axios from 'axios'

const API_HOST = 'http://localhost:4000';
const CLIENTE_API_URL = `${API_HOST}/api/shoppers/clientes`
const getAllCliente = Axios.get(`${API_HOST}/api/shoppers/clientes`)

const ClientesTable = () => {
  const { listClientes, setListClientes } = useContext(ShoppersContext);
  const {customerId} = useParams();
  const [cliente, setCliente] = useState([]);
  const [selectedCliente, setSelectedCliente] = useState('')

  const loadCliente = async () => {
    try {
      const response = await getAllCliente;
      console.log('API Response:', response.data); // Add this line
      setListClientes(response.data)
    } catch(error) {
      console.error('error fetching cliente', error)
    }
  }

  useEffect(() => {
    loadCliente()
  }, [])


  const handleChange = (event) => {
    const customerId = event.target.value;
    setSelectedCliente(customerId);
    setCliente([]);
    console.log('Selected Customer ID:', customerId);

    if (customerId) {
      Axios.get(`${CLIENTE_API_URL}/${customerId}`)
        .then((res) => {
          console.log('get shopper Id:', res.data);
          setCliente(res.data);
        })
        .catch((error) => {
          console.error('Error fetching customer data', error);
        });
    } else {
      setCliente([]);
    }
  };
  

  console.log(' select Cliente', listClientes);

  return (
   <div>
    <select id="customerId" placeholder="Choose the Cliente" onChange={handleChange}>
  <option>Select Cliente</option>
  {listClientes.map((cliente, cl) => (
    <option key={cl} value={cliente.customerId}>
      {`${cliente.first_name} ${cliente.last_name}`}
    </option>
  ))}
</select>

    {cliente && (
      <div>
        <h2>Purhcase:</h2>
        <ul>
          {cliente?.map((item, cl) => (
            <li className="list-group-item list-group-item-action list-group-item-primary"
            key={item.customerId}>{item.tire_name}</li>
          ))}
        </ul>
      </div>
    )}
   </div>
  );
};

export default ClientesTable;
