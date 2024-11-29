import { createContext, useState, useEffect } from 'react';

import Axios from 'axios';

import { API_HOST } from './config';
const WHEELS_API_URL = `${API_HOST}/api/wheels`;
const WHEEL_API_URL = `${API_HOST}/api/wheel`;

const getAllWheelsList = Axios.get(WHEELS_API_URL);
export const WheelsContext = createContext({});
const getWheelRequest = async (id) => await Axios.get(`${WHEEL_API_URL}/${id}`);

export const WheelProvider = ({ children }) => {
  const [listWheels, setListWheels] = useState([]);
  const [wheel, setWheel] = useState('');

  const loadWheels = () => {
    getAllWheelsList.then((response) => {
      setListWheels(response.data);
      console.log(response.data);
    });
  };
  useEffect(() => {
    loadWheels();
  }, []);

  // const addShopperTire = async () => {
  //   Axios.post
  // }

  return (
    <WheelsContext.Provider
      value={{
        listWheels,
        setListWheels,
        wheel,
        setWheel,
      }}
    >
      {children}
    </WheelsContext.Provider>
  );
};

export default WheelsContext;
