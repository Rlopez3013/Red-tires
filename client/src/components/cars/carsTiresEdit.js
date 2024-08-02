import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Axios from 'axios';
const API_HOST = 'http://localhost:4000';
const MODELSTIRES_API_URL = `${API_HOST}/api/models_tires`;
const getAllModelsTiresList = Axios.get(MODELSTIRES_API_URL);
const getModelTire = async (id) =>
  await Axios.get(`http://localhost:4000/api/models_tires/${id}`);

function CarsTiresEdit() {
  const { id } = useParams();
  const [listModelsTires, setListModelsTires] = useState([]);
  const [modelTire, setModelTire] = useState({});
  const [maker, setMaker] = useState({});
  const params = useParams();
  const navigate = useNavigate();

  const loadModelsTires = () => {
    getAllModelsTiresList.then((res) => {
      setListModelsTires(res.data);
    });
  };

  useEffect(() => {
    Axios.get(`${MODELSTIRES_API_URL}/model/${id}`).then((res) => {
      console.log('this modelTire log', res.data);
      setListModelsTires(res.data);
    });
    loadModelsTires();
  }, []);

  function updateModelTire(event) {
    Axios.put(`${MODELSTIRES_API_URL}/updateModelTire/${id}`, modelTire).then(
      (res) => setListModelsTires(res.data),
      navigate('/api/models_tires'),
      loadModelsTires(),
      console.log('this is modelsTires', modelTire)
    );
  }
  return (
    <div>
      <h1 className="text-success text-center">Cars Tires Edit</h1>
      <form>
        <label htmlFor="maker">Maker</label>
        <select
          name="maker"
          id="maker"
          className="dropdown"
          value={modelTire.model_id}
          onChange={(e) => setMaker(e.target.value)}
        >
          {/* <option>Select Maker</option>
          {listModelsTires.map((model) => (
            <option key={model.id} value={model.id}>
              {model.maker_name}
            </option>
          ))} */}
        </select>
      </form>
    </div>
  );
}

export default CarsTiresEdit;
