import { createContext, useState, useEffect } from 'react';
import Axios from 'axios';
const API_HOST = 'http://localhost:4000';
const Tires_API_URL = `${API_HOST}/api/tires`;
const COMPANIES_API_URL = `${API_HOST}/api/companies`;
const SIZES_API_URL = `${API_HOST}/api/sizes`;
const SEASONS_API_URL = `${API_HOST}/api/seasons`;
const getAllTires = Axios.get(Tires_API_URL);
const getAllCompanies = Axios.get(COMPANIES_API_URL);
const getAllSeasons = Axios.get(SEASONS_API_URL);
const getAllSizes = Axios.get(SIZES_API_URL);
export const TiresContext = createContext({});

export const TiresProvider = {
  children,
};
const [listTires, setListTires] = useState([]);
const [listCompanies, setListCompanies] = useState([]);
const [listSeasons, setListSeasons] = useState([]);
const [listSizes, setListSizes] = useState([]);
const [tire, setTire] = useState('');
const [company, setCompany] = useState('');
const [season, setSeason] = useState('');
const [size, setSize] = useState('');

const loadTires = () => {
  getAllTires.then((response) => {
    setListTires(response.data);
    console.log(response.data);
  });
};

const loadCompanies = () => {
  getAllCompanies.then((response) => {
    setListCompanies(response.data);
    console.log(response.data);
  });
};

const loadSizes = () => {
  getAllSizes.then((response) => {
    setListSizes(response.data);
    console.log(response.data);
  });
};

function tiresContext() {
  return <div>tiressContext</div>;
}

export default tiresContext;
