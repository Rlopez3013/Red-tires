import { createContext, useState, useEffect } from 'react';
import Axios from 'axios';
const API_HOST = 'http://localhost:4000';
const MODELSTIRES_API_HOST = `${API_HOST}/api/models_tires`;
const MODELS_API_URL = `${API_HOST}/api/models`;
const getAllModelList = Axios.get(MODELS_API_URL);
const getAllModelsTiresList = Axios.get(MODELSTIRES_API_HOST);
const getModelTire = async (id) =>
  await Axios.get(`http://localhost:4000/api/models_tires/${id}`);
export const CarsTiresContext = createContext({});

export const CarsTiresProvider = ({ children }) => {
  const [listModelsTires, setListModelsTires] = useState([]);
  const [listModels, setListModels] = useState([]);
  const [modelTire, setModelTire] = useState('');

  const loadModelsTires = () => {
    getAllModelsTiresList.then((response) => {
      setListModelsTires(response.data);
      console.log(response.data);
    });
  };
  useEffect(() => {
    loadModelsTires();
  }, []);

  const loadModels = () => {
    getAllModelList.then((response) => {
      setListModels(response.data);
      console.log(response.data);
    });
  };
  useEffect(() => {
    loadModels();
  }, []);

  const onDelete = async (id) => {
    try {
      const response = await Axios.delete(
        `${MODELSTIRES_API_HOST}/models_tires/${id}`
      );
      setListModelsTires(
        listModelsTires.filter((models_tires) => models_tires.id != id)
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  const addModelTire = () => {
    Axios.post(`${MODELSTIRES_API_HOST}/newModelTire`, {
      newModel: modelTire,
    });
  };
  const updateModelTire = (id) => {
    Axios.put(`${MODELSTIRES_API_HOST}/updateModelTire/${id}`, {
      newModelTire: modelTire,
    }).then(() => {
      setListModelsTires.map((item) => {
        return item.id === id
          ? {
              id: id,
              modeltire: item.modeltire,
            }
          : item;
      });
    });
  };
  const [inEditMode, setInEditMode] = useState({
    status: true,
    rowKey: null,
  });
  const onEdit = ({ id, currentModelTire }) => {
    setInEditMode({
      status: true,
      rowKey: id,
    });
    setModelTire(currentModelTire);
  };
  const onSave = ({ id, newModelTire }) => {
    updateModelTire({ id, newModelTire });
  };
  const onCancel = () => {
    setInEditMode({
      status: false,
      rowKey: null,
    });
  };

  const getModelTire = async (id) => {
    try {
      const response = await getModelTire(id);
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <CarsTiresContext.Provider
      value={{
        listModelsTires,
        setListModelsTires,
        listModels,
        setListModels,
        setInEditMode,
        onCancel,
        onEdit,
        onSave,
        onDelete,
        inEditMode,
        addModelTire,
        updateModelTire,
        modelTire,
        setModelTire,
        getModelTire,
      }}
    >
      {children}
    </CarsTiresContext.Provider>
  );
};

export default CarsTiresContext;
