import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import { MakersContext } from '../../context/makersContext.js';
const API_HOST = 'http://localhost:4000';
const MAKERS_API_URL = `${API_HOST}/api/makers`;
const getAllMakerList = Axios.get(MAKERS_API_URL);
const getMakerRequest = async (id) =>
  await Axios.get(`http://localhost:4000/api/makers/${id}`);

function Edit() {
  const { id } = useParams();
  const [maker, setMaker] = useState({});
  const [listMakers, setListMakers] = useState([]);
  // const {  getMaker } = useContext(MakersContext);`
  const params = useParams();
  const navigate = useNavigate();

  const loadMakers = () => {
    getAllMakerList.then((response) => {
      setMaker(response.data);
    });
  };

  useEffect(() => {
    Axios.get('http://localhost:4000/api/makers/' + id).then((res) => {
      console.log('this is log', res.data);
      setMaker(res.data);
    });
  }, []);

  function updateMaker(event) {
    event.preventDefault();
    Axios.put(`${MAKERS_API_URL}/updateMaker/${id}`, maker).then(
      (res) => setListMakers(res.data),
      navigate('/api/makers'),
      loadMakers(),
      console.log('this is log2', maker)
      //loadMakers()
    );

    // .catch((err) => console.log(err));
  }

  return (
    <div>
      <h1>Edit Maker</h1>
      <form onSubmit={updateMaker}>
        <div>
          <label htmlFor="name">ID:</label>
          <input type="text" name="name" value={maker?.id || ''} />
        </div>
        <div>
          <label htmlFor="name">Maker</label>
          <input
            type="text"
            name="name"
            value={maker?.maker || ''}
            onChange={(e) => setMaker({ ...maker, maker: e.target.value })}
          />
        </div>
        <button className="btn-update">Update</button>
      </form>
    </div>
  );
}
export default Edit;
