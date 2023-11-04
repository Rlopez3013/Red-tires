import { useState, useContext, useEffect } from 'react';
import { ModelsContext } from '../context/modelsContext.js';
import Axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function ModelForm() {
  const [model, setModel] = useState('');
  const [maker, setMaker] = useState('');
  const [listMaker, setListMakers] = useState([]);
  const { listModels, setListModels, getModel } = useContext(ModelsContext);
  const params = useParams();
  const navigate = useNavigate();

  const API_HOST = 'http://localhost:4000';
  const MAKERS_API_URL = `${API_HOST}/api/makers`;
  const MODELS_API_URL = `${API_HOST}/api/models`;

  useEffect(() => {
    Axios.get(`${MODELS_API_URL}`).then((res) => {
      setListModels(res.data);
    });
  }, []);

  useEffect(() => {
    Axios.get(`${MAKERS_API_URL}`).then((response) =>
      setListMakers(response.data)
    );
    // .then((error) => console.log(error));
  }, []);

  useEffect(() => {
    const loadModels = async () => {
      if (params.id) {
        const model = await getModel(params.id);
        console.log(model);
        setModel({
          model: model.model,
        });
      }
    };
  });

  const addModel = (e) => {
    e.preventDefault();
    Axios.post('http://localhost:4000/api/models', {
      model: model.model,
      type: model.type,
      year: model.year,
      Makers_id: maker,
    }).then((response) => {
      let item = response.data;
      setListModels((de) => [...de, item]);
      navigate('/api/models');
      console.log(response.data);
    });
  };

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setModel((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(model);
  };

  return (
    <div>
      <h2>Add a New Model</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="maker">Maker</label>
        <select
          name="maker"
          id="maker"
          placeholder="Choose a Maker"
          className="dropdown"
          onChange={(e) => setMaker(e.target.value)}
        >
          <option>Select Maker</option>
          {listMaker.map((maker) => (
            <option key={maker.id} value={maker.id}>
              {maker.maker}
            </option>
          ))}
        </select>

        <label htmlFor="Model">
          Model
          <input
            className={'btn-submit'}
            type="text"
            name="model"
            value={model.model || ''}
            onChange={handleChange}
          />
        </label>
        <label>
          Type
          <input
            type="text"
            name="type"
            value={model.type || ''}
            onChange={handleChange}
          />
        </label>
        <label>
          Year
          <input
            type="number"
            name="year"
            value={model.year || ''}
            onChange={handleChange}
          />
        </label>
        <input type="submit" onClick={addModel} />
      </form>
    </div>
  );
}

export default ModelForm;
