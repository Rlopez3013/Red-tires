import { useState, useContext, useEffect } from 'react';
import { ModelsContext } from '../context/modelsContext';
import Axios from 'axios';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import modelStyle from './model.module.css';
import { API_HOST } from '../context/config';
const headers = {
  headers: { 'ngrok-skip-browser-warning': '1' },
};

function ModelForm() {
  const [model, setModel] = useState('');
  const [maker, setMaker] = useState(0);
  const [listMaker, setListMakers] = useState([]);
  const [reloadData, setReloadData] = useState(true);
  const [error, setError] = useState(null);
  const {
    listModels,
    setListModels,
    getModel,
    loadModels,
    NavigateButton,
    handleClick,
  } = useContext(ModelsContext);
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  //const API_HOST = 'https://c92e-166-181-83-133.ngrok-free.app';
  const MAKERS_API_URL = `${API_HOST}/api/makers`;
  const MODELS_API_URL = `${API_HOST}/api/models`;
  const { id } = useParams();

  useEffect(() => {
    const fetchModels = async () => {
      try {
        const response = await Axios.get(MODELS_API_URL);
        setListModels(response.data);
      } catch (error) {
        console.error('Error fetching models:', error);
      }
    };

    fetchModels();
  }, [setListModels]);

  useEffect(() => {
    Axios.get(`${MAKERS_API_URL}`, { headers }).then((response) =>
      setListMakers(response.data)
    );
    // .then((error) => console.log(error));
  }, []);

  useEffect(() => {
    const loadModels = async () => {
      /// loadModels
      if (params.id) {
        const model = await getModel(params.id);
        console.log(model);
        setModel({
          model: model.model_name,
        });
      }
    };
    loadModels(); /// loadModels
  }, []);

  const addModel = (e) => {
    e.preventDefault();
    Axios.post('http://localhost:4000/api/models', {
      model_name: model.model_name,
      trim: model.trim,
      type: model.type,
      year: model.year,
      maker_id: maker,
    })
      .then((response) => {
        let item = response.data;
        console.log('server response', response.data);
        setListModels((de) => [...de, item]);
        navigate('/models', { replace: true });
        console.log(response.data);
      })
      .catch((error) => {
        console.error(
          'Error adding model:',
          error.response ? error.response.data : error.message
        );
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
    <div className={modelStyle.modelFormBck}>
      <div className="form-row align-items-center">
        <div className="col-auto">
          <h2 className={modelStyle.model_title}>Add A New Model</h2>
          <form className={modelStyle.model_form} onSubmit={handleSubmit}>
            <div className="col-auto">
              <select
                name="maker"
                id="maker"
                placeholder="Choose a Maker"
                className={'btn btn-success btn-lg dropdown-toggle'}
                onChange={(e) => setMaker(parseInt(e.target.value))}
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
                className={modelStyle.modelInput}
                type="text"
                name="model_name"
                placeholder="Model"
                value={model.model_name || ''}
                onChange={handleChange}
              />
            </div>
            <div className="col-auto">
              <input
                className={modelStyle.modelInput}
                type="text"
                name="type"
                placeholder="Type"
                value={model.type || ''}
                onChange={handleChange}
              />
            </div>
            <div className="col-auto">
              <input
                className={modelStyle.modelInput}
                type="text"
                name="trim"
                placeholder="Trim"
                value={model.trim || ''}
                onChange={handleChange}
              />
            </div>
            <div className="col-auto">
              <input
                className={modelStyle.modelInput}
                type="number"
                name="year"
                placeholder="Year"
                value={model.year || ''}
                onChange={handleChange}
              />
            </div>
            <input
              className={' btn btn-outline-primary btn-lg'}
              type="submit"
              onClick={addModel}
            />
          </form>
        </div>
      </div>
    </div>
  );
}

export default ModelForm;
