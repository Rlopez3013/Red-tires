import { createContext, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import { API_HOST } from './config';

const MODELS_API_URL = `${API_HOST}/api/models`;
const MAKERS_API_URL = `${API_HOST}/api/makers`;


const getAllModelList = Axios.get(MODELS_API_URL,);
const getAllMakerList = Axios.get(MAKERS_API_URL,);
export const ModelsContext = createContext({});

export const ModelProvider = ({ children }) => {
  const [listModels, setListModels] = useState([]);
  const [listMakers, setListMakers] = useState([]);
  const [maker, setMaker] = useState('');
  const [model, setModel] = useState('');

  const loadModels = () => {
    getAllModelList.then((response) => {
      setListModels(response.data);
      console.log(response.data);
    });
  };
  useEffect(() => {
    loadModels();
  });

  const loadMakers = () => {
    getAllMakerList.then((response) => {
      setListMakers(response.data);
      console.log(response.data);
    });
  };

  function NavigateButton() {
    const navigate = useNavigate();
    const location = useLocation();

    const handleClick = () => {
      navigate(location.pathname + '/models');
    };
  }

  // const location = useLocation();

  useEffect(() => {
    loadMakers();
  }, []);

  const onDelete = async (id) => {
    try {
      const response = await Axios.delete(
        `${MODELS_API_URL}/deleteModel/${id}`
      );
      setListModels(listModels.filter((model_name) => model_name.id != id));
      window.location.reload();
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  const addModel = () => {
    Axios.post(`${MODELS_API_URL}/newModel`, {
      newModel: model,
    });
  };
  const updateModel = (id) => {
    Axios.put(`${MODELS_API_URL}/api/models/edit/${id}`, {
      newModel: model,
    }).then(() => {
      setListModels.map((item) => {
        return item.id === id
          ? {
              id: id,
              model: item.model,
            }
          : item;
      });
    });
  };
  const [inEditMode, setInEditMode] = useState({
    status: true,
    rowKey: null,
  });
  const onEdit = ({ id, currentModel }) => {
    setInEditMode({
      status: true,
      rowKey: id,
    });
    setModel(currentModel);
  };
  const onSave = ({ id, newModel }) => {
    updateModel({ id, newModel });
  };
  const onCancel = () => {
    setInEditMode({
      status: false,
      rowKey: null,
    });
  };
  return (
    <ModelsContext.Provider
      value={{
        listModels,
        listMakers,
        setListModels,
        setListMakers,
        loadModels,
        model,
        setModel,
        onCancel,
        updateModel,
        onEdit,
        onSave,
        onDelete,
        inEditMode,
        setInEditMode,
        addModel,
      }}
    >
      {children}
    </ModelsContext.Provider>
  );
};

export default ModelsContext;
