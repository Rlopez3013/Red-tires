import { useState, useContext, useEffect } from 'react';
import { MakersContext } from '../context/makersContext.js';
import Axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { API_HOST } from '../context/config.js';
import makerStyle from './maker.module.css';
const headers = {
  headers: { 'ngrok-skip-browser-warning': '1' },
};
function MakerForm() {
  const [maker, setMaker] = useState('');
  const [fabricant, setFabricant] = useState({
    maker: '',
  });
  const { listMakers, setListMakers, getMaker } = useContext(MakersContext);
  const params = useParams();
  const navigate = useNavigate();
  // const API_HOST = 'https://c428-108-198-117-66.ngrok-free.app ';
  const MAKERS_API_URL = `${API_HOST}/api/makers`;

  useEffect(() => {
    const loadMakers = async () => {
      if (params.id) {
        const maker = await getMaker(params.id);
        console.log(maker);
        setMaker({
          maker: maker.maker_name,
        });
      }
    };
    loadMakers();
  }, []);

  useEffect(() => {
    Axios.get(`${MAKERS_API_URL}`, {headers}).then((res) => {
      setListMakers(res.data);
    });
  }, []);

  const addMaker = (e) => {
    e.preventDefault();
    Axios.post('${MAKERS_API_URL}', {
      maker_name: maker.maker_name,
    })
      .then((response) => {
        let item = response.data;
        setListMakers((de) => [...de, item]);
        navigate('/makers');
        console.log(response.data);
      })
      .catch((error) => {
        console.error(
          'Error adding maker',
          error.response ? error.response.data : error.message
        );
      });
  };

  const handelChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setMaker((values) => ({ ...values, [name]: value }));
  };

  const hanldeSubmit = (event) => {
    event.preventDefault();
    console.log(maker);
  };

  return (
    <div className={makerStyle.makerFormBck}>
      <h3 className={makerStyle.form}>
        {params.id ? 'Edit Maker' : 'New Maker'}
      </h3>
      <form className={makerStyle.form} onSubmit={hanldeSubmit}>
        <input
          className={'btn-submit'}
          type="text"
          name="maker_name"
          placeholder="Add Maker"
          value={maker.maker_name || ''}
          onChange={handelChange}
        />
        <input
          className={'btn btn-outline-primary'}
          type="submit"
          onClick={addMaker}
        />
      </form>
    </div>
  );
}

export default MakerForm;
