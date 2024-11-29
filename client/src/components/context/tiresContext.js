import { createContext, useState, useEffect } from 'react';
import Axios from 'axios';
import { API_HOST } from './config';
const TIRES_API_URL = `${API_HOST}/api/tires`;

const getAllTiresList = Axios.get(TIRES_API_URL);
export const TiresContext = createContext({});
const getTireRequest = async (id) => await Axios.get(`${TIRES_API_URL}/${id}`);

export const TiresProvider = ({ children }) => {
  const [listTires, setListTires] = useState([]);

  const [tire, setTire] = useState('');

  const loadTires = () => {
    getAllTiresList.then((response) => {
      setListTires(response.data);
      console.log(response.data);
    });
  };
  useEffect(() => {
    loadTires();
  }, []);

  const onDelete = async (id) => {
    try {
      const response = await Axios.delete(`${TIRES_API_URL}/deleteTire/${id}`);
      setListTires(listTires.filter((tire) => tire.id != id));
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  const addTire = () => {
    Axios.post(`${TIRES_API_URL}/newTire`, {
      newTire: tire,
    });
  };
  const updateTire = (id) => {
    Axios.put(`${TIRES_API_URL}/api/tires/edit/${id}`, {
      newTire: tire,
    }).then(() => {
      setListTires.map((item) => {
        return item.id === id
          ? {
              id: id,
              tire: item.tire,
            }
          : item;
      });
    });
  };

  const getTire = async (id) => {
    try {
      const response = await getTireRequest(id);
      return response;
    } catch (error) {
      console.log(error);
    }
  };
  const [inEditMode, setInEditMode] = useState({
    status: true,
    rowKey: null,
  });
  const onEdit = ({ id, currentTire }) => {
    setInEditMode({
      status: true,
      rowKey: id,
    });
    setTire(currentTire);
  };

  const onSave = ({ id, newTire }) => {
    updateTire({ id, newTire });
  };
  const onCancel = () => {
    setInEditMode({
      status: false,
      rowKey: null,
    });
  };
  return (
    <TiresContext.Provider
      value={{
        listTires,
        setListTires,
        tire,
        setTire,
        onCancel,
        onDelete,
        updateTire,
        onEdit,
        onSave,
        addTire,
        inEditMode,
        getTire,
      }}
    >
      {children}
    </TiresContext.Provider>
  );
};

export default TiresContext;
