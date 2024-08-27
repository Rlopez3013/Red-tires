import { createContext, useState, useEffect } from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
const API_HOST = 'http://localhost:4000';
const SHOPPERS_API_URL = `${API_HOST}/api/shops`;
const getAllShopperList = Axios.get(SHOPPERS_API_URL);
export const ShopperContext = createContext({});

export const ShopperProvider = ({ children }) => {
  const [listShopper, setListShopper] = useState([]);
  const [shopper, setShopper] = useState('');
  const navigate = useNavigate();

  const loadShoppers = () => {
    getAllShopperList.then((response) => {
      setListShopper(response.data);
      console.log(response.data);
    });
  };
  useEffect(() => {
    loadShoppers();
  }, []);

  const [inEditMode, setInEditMode] = useState({
    status: true,
    rowKey: null,
  });

  return (
    <ShopperContext.Provider
      value={{
        listShopper,
        setListShopper,
        shopper,
        setShopper,
        inEditMode,
      }}
    >
      {children}
    </ShopperContext.Provider>
  );
};
export default ShopperContext;
