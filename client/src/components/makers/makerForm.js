import { useState, useContext, useEffect } from 'react';
import { MakersContext } from '../context/makersContext.js';
import Axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import makerStyle from './maker.module.css';

function MakerForm() {
  const [maker, setMaker] = useState([]);
  const [fabricant, setFabricant] = useState({
    maker: '',
  });
  const { listMakers, setListMakers, getMaker } = useContext(MakersContext);
  const params = useParams();
  const navigate = useNavigate();

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
    Axios.get('http://localhost:4000/api/makers').then((res) => {
      setListMakers(res.data);
    });
  }, []);

  const addMaker = (e) => {
    e.preventDefault();
    Axios.post('http://localhost:4000/api/makers/', {
      maker,
    }).then((response) => {
      let item = response.data;
      setListMakers((de) => [...de, item]);
      navigate('/api/makers');
      console.log(response.data);
    });
  };

  return (
    <div className={makerStyle.makerFormBck}>
      <h3 className={makerStyle.form}>
        {params.id ? 'Edit Maker' : 'New Maker'}
      </h3>
      <form className={makerStyle.form}>
        <input
          className={'btn-submit'}
          placeholder="Add Maker"
          value={maker}
          onChange={(e) => {
            setMaker(e.target.value);
          }}
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
