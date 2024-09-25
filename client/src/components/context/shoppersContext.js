import { createContext, useState, useEffect } from 'react';
import Axios from 'axios';
const API_HOST = 'http://localhost:4000';
const SHOPPERS_API_HOST = `${API_HOST}/api/shoppers`;
const getAllShoppers = Axios.get(SHOPPERS_API_HOST);
const getShopper = async (id) =>
  await Axios.get(`${API_HOST}/api/shoppers/${id}`);
export const ShoppersContext = createContext({});

export const ShoppersProvider = ({ children }) => {
  const [listShoppers, setListShoppers] = useState([]);
  const [shopper, setShopper] = useState('');

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

  // const shopper = async (id) => {
  //   try {
  //     const response = await getShopper(id);
  //     return response;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

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
        setListShoppers,
        onDelete,
        shopper,
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
