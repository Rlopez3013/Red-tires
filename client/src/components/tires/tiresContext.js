// import { createContext, useState, useEffect } from 'react';
// import Axios from 'axios';
// const API_HOST = 'http://localhost:4000';
// const Tires_API_URL = `${API_HOST}/api/tires`;
// const COMPANIES_API_URL = `${API_HOST}/api/companies`;
// const SIZES_API_URL = `${API_HOST}/api/sizes`;
// const SEASONS_API_URL = `${API_HOST}/api/seasons`;
// const getAllTires = Axios.get(Tires_API_URL);
// const getAllCompanies = Axios.get(COMPANIES_API_URL);
// const getAllSeasons = Axios.get(SEASONS_API_URL);
// const getAllSizes = Axios.get(SIZES_API_URL);
// export const TiresContext = createContext({});

// export const TiresProvider = {
//   children,
// };
// const [listTires, setListTires] = useState([]);
// const [listCompanies, setListCompanies] = useState([]);
// const [listSeasons, setListSeasons] = useState([]);
// const [listSizes, setListSizes] = useState([]);
// const [tire, setTire] = useState('');
// const [company, setCompany] = useState('');
// const [season, setSeason] = useState('');
// const [size, setSize] = useState('');

// const loadTires = () => {
//   getAllTires.then((response) => {
//     setListTires(response.data);
//     console.log(response.data);
//   });
// };
// useEffect(() => {
//   loadTires();
// }, []);

// const loadCompanies = () => {
//   getAllCompanies.then((response) => {
//     setListCompanies(response.data);
//     console.log(response.data);
//   });
// };

// const loadSizes = () => {
//   getAllSizes.then((response) => {
//     setListSizes(response.data);
//     console.log(response.data);
//   });
// };
// useEffect(() => {
//   loadSizes();
// }, []);

// const onDelete = async (id) => {
//   try {
//     const response = await Axios.delete(`${Tires_API_URL}/delete/${id}`);
//     setListTires(listTires.filter((tire) => tire.id != id));
//   } catch (error) {
//     console.log(error);
//   }
// };

// const addTire = () => {
//   Axios.post(`${Tires_API_URL}`, { newTire: tire_name });
// };

// const updateTire = (id) => {
//   Axios.put(`${Tires_API_URL}/edit/${id}`, {
//     newTire: tire_name,
//   }).then(() => {
//     setListTires.map((item) => {
//       return item.id === id
//         ? {
//             id: id,
//             tire: item.tire_name,
//           }
//         : item;
//     });
//   });
// };
// const [inEditMode, setInEditMode] = useState({
//   status: true,
//   rowKey: null,
// });

// const onEdit = ({ id, currentTire }) => {
//   setInEditMode({
//     status: true,
//     rowKey: id,
//   });
//   setTire(currentTire);
// };

// const onSave = ({ id, newTire }) => {
//   updateTire({ id, newTire });
// };

// const onCancel = () => {
//   setInEditMode({
//     status: false,
//     rowKey: null,
//   });
// };

// const getTire = async (id) => {
//   try {
//     const response = await getTireRequest(id);
//     return response;
//   } catch (error) {
//     console.log(error);
//   }
// };

// // function tiresContext() {
// //   return <div>tiresContext</div>;
// // }

// return (
//   <TiresContext.Provider
//     value={{
//       listCompanies,
//       listSeasons,
//       tire,
//       getTire,
//       setTire,
//       onCancel,
//       onDelete,
//       onSave,
//       updateTire,
//       inEditMode,
//       setInEditMode,
//       addTire,
//     }}
//   >
//     {children}
//   </TiresContext.Provider>
// );

// export default TiresContext;
