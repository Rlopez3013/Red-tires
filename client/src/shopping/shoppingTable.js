// import { useContext } from 'react';
// import { ShopperContext } from './shoppingContext';
// import { useNavigate } from 'react-router-dom';
// import './shop.css';

// const ShoppersTable = () => {
//   const { listShopper, setListShoppers, shopper, setShopper, inEditMode } =
//     useContext(ShopperContext);
//   const navigate = useNavigate();
//   return (
//     <div>
//       <div className="title-sh">Check out table</div>
//       <table className="table table-sm table-success">
//         <thead>
//           <tr className="tr-sh">
//             <th>Name</th>
//             <th>Last Name</th>
//             <th>Model</th>
//             <th>Tire</th>
//             <th>Quantity</th>
//           </tr>
//         </thead>
//         <tbody className="tb-info-sh">
//           {listShopper.map((item, sh) => (
//             <tr key={(item.id, sh)}>
//               <td>
//                 {inEditMode.status && inEditMode.rowKey === item.id ? (
//                   <select defaultValue={item.id}>
//                     <option>Select Names</option>
//                     {listShopper.map((item, sh) => (
//                       <option key={sh} value={item.id}>
//                         {item.first_name}
//                       </option>
//                     ))}
//                   </select>
//                 ) : (
//                   item.first_name
//                 )}
//               </td>
//               <td>
//                 {inEditMode.status && inEditMode.rowKey === item.id ? (
//                   <select defaultValue={item.id}>
//                     <option>Select Last Name</option>
//                     {listShopper.map((item, ln) => (
//                       <option key={ln} value={item.id}>
//                         {item.last_name}
//                       </option>
//                     ))}
//                   </select>
//                 ) : (
//                   item.last_name
//                 )}
//               </td>
//               <td>
//                 {inEditMode.status && inEditMode.rowKey === item.id ? (
//                   <select defaultValue={item.id}>
//                     <option>Select Model</option>
//                     {listShopper.map((item, m) => (
//                       <option key={m} value={item.id}>
//                         {m.model_name}
//                       </option>
//                     ))}
//                   </select>
//                 ) : (
//                   item.model_name
//                 )}
//               </td>
//               <td>
//                 {inEditMode.status && inEditMode.rowKey === item.id ? (
//                   <select defaultValue={item.id}>
//                     <option>Select Tire</option>
//                     {listShopper.map((item, t) => (
//                       <option key={t} value={item.id}>
//                         {t.tire_name}
//                       </option>
//                     ))}
//                   </select>
//                 ) : (
//                   item.tire_name
//                 )}
//               </td>
//               <td>
//                 {inEditMode.status && inEditMode.rowKey === item.id ? (
//                   <select defaultValue={item.id}>
//                     <option>Quantity</option>
//                     {listShopper.map((item, Q) => (
//                       <option key={Q} value={item.id}>
//                         {Q.Quatity}
//                       </option>
//                     ))}
//                   </select>
//                 ) : (
//                   item.Quantity
//                 )}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };
// export default ShoppersTable;
