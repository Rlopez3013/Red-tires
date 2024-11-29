import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import { API_HOST } from '../context/config.js';

const headers = {
  headers: { 'ngrok-skip-browser-warning': '1' },
};

const MAKERS_API_URL = `${API_HOST}/api/makers`;
const getAllMakerList = Axios.get(MAKERS_API_URL, { headers });
const getMakerRequest = async (id) =>
  await Axios.get(`${MAKERS_API_URL}/${id}`, { headers });

function Edit() {
  const { id } = useParams();
  const [maker, setMaker] = useState({});
  const [listMakers, setListMakers] = useState([]);
  const navigate = useNavigate();

  const loadMakers = () => {
    getAllMakerList.then((response) => {
      setMaker(response.data);
    });
  };

  useEffect(() => {
    Axios.get(`${MAKERS_API_URL}/${id}`, { headers }).then((res) => {
      console.log('this is log', res.data);
      setMaker(res.data);
    });
  }, [id]);

  function updateMaker(event) {
    event.preventDefault();
    Axios.put(`${MAKERS_API_URL}/updateMaker/${id}`, maker).then(
      (res) => setListMakers(res.data),
      navigate('/api/makers'),
      loadMakers(),
      console.log('this is log2', maker)
    );
  }

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Edit Maker</h1>
      <form onSubmit={updateMaker}>
        <div className="form-group mb-3">
          <label htmlFor="id">ID:</label>
          <input
            type="text"
            id="id"
            name="id"
            value={maker?.id || ''}
            className="form-control"
            readOnly
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="maker">Maker Name</label>
          <input
            type="text"
            id="maker"
            name="maker"
            value={maker?.maker || ''}
            onChange={(e) => setMaker({ ...maker, maker: e.target.value })}
            className="form-control"
            required
          />
        </div>
        <div className="d-flex justify-content-between">
          <button type="submit" className="btn btn-primary">Update</button>
          <button type="button" className="btn btn-secondary" onClick={() => navigate('/api/makers')}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default Edit;

