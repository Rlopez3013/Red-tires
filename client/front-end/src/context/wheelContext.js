import { createContext, useState, useEffect } from 'react';

import Axios from 'axios';

const API_HOST = 'http://localhost:4000';
const WHEELS_API_URL = `${API_HOST}/api/wheels`;

const getAllWheelsList = Axios.get(WHEELS_API_URL);
export const WheelsContext = createContext({});
const getWheelsRequest = async (id) =>
  await Axios.get(`${WHEELS_API_URL}/${id}`);

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
