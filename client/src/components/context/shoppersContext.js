import { createContext, useState, useEffect } from 'react';
import Axios from 'axios';
import { API_HOST } from './config';
const SHOPPERS_API_HOST = `${API_HOST}/api/shoppers`;
const CLIENTES_API_HOST = `${API_HOST}/api/shoppers/clientes`;
const getAllShoppers = Axios.get(SHOPPERS_API_HOST);



const getShopper = async (customer_id) =>
  await Axios.get(`${API_HOST}/api/shoppers/${customer_id}`);
export const ShoppersContext = createContext({});

export const ShoppersProvider = ({ children }) => {
  const [listShoppers, setListShoppers] = useState([]);
  const [listClientes, setListClientes] = useState([]);
  const [listCheckouts, setListCheckouts] = useState([]);
  const [cliente, setCliente] = useState('');
  const [shopper, setShopper] = useState('');
  const [clientInfo, setClientInfo] = useState('');

  const loadShoppers = () => {
    getAllShoppers.then((response) => {
      setListShoppers(response.data);
      console.log(response.data);
    });
  };
  useEffect(() => {
    loadShoppers();
  }, []);

  const onDelete = async (id) => {
    try {
      const response = await Axios.delete(
        `${SHOPPERS_API_HOST}/deleteShopper/${id}`
      );
      setListShoppers(listShoppers.filter((shopers) => shopers.id != id));
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const updateShopper = (id) => {
    Axios.put(`${SHOPPERS_API_HOST}/edit/${id}`, {
      newShopper: shopper,
    }).then(() => {
      setListShoppers.map((item) => {
        return item.id === id
          ? {
              id: id,
              shopper: item.shopper,
            }
          : item;
      });
    });
  };

  const [inEditMode, setInEditMode] = useState({
    status: true,
    rowKey: null,
  });

  const onEdit = ({ id, currentShopper }) => {
    setInEditMode({
      status: true,
      rowKey: id,
    });
    setShopper(currentShopper);
  };

  const onSave = ({ id, newShopper }) => {
    updateShopper({ id, newShopper });
  };

  const onCancel = () => {
    setInEditMode({
      status: false,
      rowKey: null,
    });
  };

  return (
    <ShoppersContext.Provider
      value={{
        listShoppers,
        getShopper,
        setListShoppers,
        listClientes,
        setListClientes,
        cliente,
        setCliente,
        clientInfo,
        setClientInfo,
        listCheckouts,
        setListCheckouts,
        onDelete,
        shopper,
        setShopper,
        onCancel,
        updateShopper,
        onEdit,
        onSave,
        inEditMode,
      }}
    >
      {children}
    </ShoppersContext.Provider>
  );
};
export default ShoppersContext;
