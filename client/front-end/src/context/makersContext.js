import { createContext, useState, useEffect } from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
//import MakersTable from '../components/makersTable';
const API_HOST = 'http://localhost:4000';
const MAKERS_API_URL = `${API_HOST}/api/makers`;
const getAllMakerList = Axios.get(MAKERS_API_URL); //{}
const getMakerRequest = async (id) =>
  await Axios.get(`http://localhost:4000/api/makers/${id}`);

export const MakersContext = createContext({});

export const MakerProvider = ({ children }) => {
  const [listMakers, setListMakers] = useState([]);
  const [maker, setMaker] = useState('');
  const navigate = useNavigate();

  const loadMakers = () => {
    getAllMakerList.then((response) => {
      setListMakers(response.data);
      console.log(response.data);
    });
  };
  useEffect(() => {
    loadMakers();
  }, []);

  const onDelete = async (id) => {
    try {
      const response = await Axios.delete(`${MAKERS_API_URL}/delete/${id}`);
      setListMakers(listMakers.filter((maker) => maker.id != id));
    } catch (error) {
      console.error(error);
    }
  };

  const addMaker = () => {
    Axios.post(`${MAKERS_API_URL}`, { newName: maker });
  };

  const updateMaker = (id) => {
    Axios.put(`${MAKERS_API_URL}/edit/${id}`, {
      newMaker: maker,
    }).then(() => {
      setListMakers.map((item) => {
        return item.id === id
          ? {
              id: id,
              maker: item.maker,
            }
          : item;
      });
    });
  };
  const [inEditMode, setInEditMode] = useState({
    status: true,
    rowKey: null,
  });

  const onEdit = ({ id, currentMaker }) => {
    setInEditMode({
      status: true,
      rowKey: id,
    });
    setMaker(currentMaker);
  };
  const onSave = ({ id, newMaker }) => {
    updateMaker({ id, newMaker });
  };
  const onCancel = () => {
    setInEditMode({
      status: false,
      rowKey: null,
    });
  };

  const getMaker = async (id) => {
    try {
      const response = await getMakerRequest(id);
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <MakersContext.Provider
      value={{
        listMakers,
        setListMakers,
        maker,
        getMaker,
        setMaker,
        onCancel,
        onDelete,
        onEdit,
        onSave,
        updateMaker,
        inEditMode,
        setInEditMode,
        addMaker,
      }}
    >
      {children}
    </MakersContext.Provider>
  );
};

export default MakersContext;
