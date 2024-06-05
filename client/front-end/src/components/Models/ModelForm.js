import { useState, useContext, useEffect } from 'react';
import { ModelsContext } from '../../context/modelsContext.js';
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
          model: model.model_name,
        });
      }
    };
  });

  const addModel = (e) => {
    e.preventDefault();
    Axios.post('http://localhost:4000/api/models', {
      model_name: model.model_name,
      trim: model.trim,
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
    <div className="form-row align-items-center">
      <div className="col-auto">
        <h2 className="modelForm-title">Add A New Model</h2>
        <form className="model-form" onSubmit={handleSubmit}>
          <div className="col-auto">
            <select
              name="maker"
              id="maker"
              placeholder="Choose a Maker"
              className={'btn btn-secondary btn-lg dropdown-toggle'}
              onChange={(e) => setMaker(e.target.value)}
            >
              <option>Select Maker</option>
              {listMaker.map((maker) => (
                <option key={maker.id} value={maker.id}>
                  {maker.maker_name}
                </option>
              ))}
            </select>
          </div>
          <div className="col-auto">
            <input
              className={'sr-only'}
              type="text"
              name="model_name"
              placeholder="Model"
              value={model.model_name || ''}
              onChange={handleChange}
            />
          </div>
          <div className="col-auto">
            <input
              className={'sr-only'}
              type="text"
              name="trim"
              placeholder="Trim"
              value={model.trim || ''}
              onChange={handleChange}
            />
          </div>
          <div className="col-auto">
            <input
              className={'sr-only mb-3'}
              type="number"
              name="year"
              placeholder="Year"
              value={model.year || ''}
              onChange={handleChange}
            />
          </div>
          <input
            className={' btn btn-outline-primary'}
            type="submit"
            onClick={addModel}
          />
        </form>
      </div>
    </div>
  );
}

export default ModelForm;
