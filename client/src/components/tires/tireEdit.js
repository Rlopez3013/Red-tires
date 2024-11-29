import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import { API_HOST } from '../context/config';
const TIRES_API_URL = `${API_HOST}/api/tires`;
const COMPANIES_API_URL = `${API_HOST}/api/companies`;
const getAllTireList = Axios.get(TIRES_API_URL);
const getallCompaniesList = Axios.get(COMPANIES_API_URL);
const headers = {
  headers: { 'ngrok-skip-browser-warning': '1' },
};
function EditTire() {
  const { id } = useParams();
  const [listTires, setListTires] = useState([]);
  const [listCompanies, setListCompanies] = useState([]);
  const [tire, setTire] = useState({});
  const [company, setCompany] = useState({});
  const navigate = useNavigate();
  const params = useParams();

  const loadTires = () => {
    getAllTireList.then((response) => {
      console.log('this is data', response.data);
      setListTires(response.data);
    });
  };

  const loadCompanies = () => {
    getallCompaniesList.then((response) => {
      console.log('this is companies', response.data);
      setListCompanies(response.data);
    });
  };

  useEffect(() => {
    Axios.get(`${TIRES_API_URL}/${id}`).then((res) => {
      console.log('this is tire log43', res.data);
      setTire(res.data);
      console.log(res.data);
    });
    loadTires();
    console.log('this is super edit', tire);
    loadCompanies();
    console.log('all the companies', company);
  }, []);

  function updateTire(event) {
    event.preventDefault();
    Axios.put(`${TIRES_API_URL}/updateTire/${id}`, tire).then(
      (res) => setListTires(res.data),
      navigate('/api/tires'),
      loadTires(),
      console.log('this is log tire edit', tire)
    );
  }
  const handleUpdate = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setTire((values) => ({ ...values, [name]: value }));
  };
  return (
    <div>
      <h2>Update Tire !</h2>
      <form onSubmit={updateTire}>
        <label htmlFor="company">Companies</label>
        <select
          name="company"
          id="company"
          className="dropdown"
          value={tire.Companies_id}
          onChange={(e) => setCompany(e.target.value)}
        >
          <option>Select Company</option>
          {listTires.map((company, C) => (
            <option key={C} value={company.id}>
              {company.tire_company}
            </option>
          ))}
        </select>

        <label htmlFor="tire">Tire</label>
        <input
          className={'btn-submit'}
          type="text"
          name="tire"
          value={tire?.id || ''}
          onChange={(e) => setTire({ ...tire, tire_name: e.target.value })}
        />
        <label>
          Size
          <input
            type="text"
            name="size"
            value={tire.size || ''}
            onChange={(e) => setTire({ ...tire, tire_size: e.target.value })}
          />
        </label>
        <label>
          Season
          <input
            type="text"
            name="season"
            value={tire.sn_name || ''}
            onChange={(e) => setTire({ ...tire, sn_name: e.target.value })}
          />
        </label>

        <button className="btn-update">Update</button>
      </form>
    </div>
  );
}
export default EditTire;
