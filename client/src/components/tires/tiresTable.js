import { useContext, useState } from 'react';
import { TiresContext } from '../context/tiresContext';
import { useNavigate } from 'react-router-dom';
import tireStyle from './tires.module.css';

const TiresTable = () => {
  const { listTires, onDelete, onEdit, updateTire, onCancel, inEditMode } =
    useContext(TiresContext);
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage, setItemsPerPage] = useState(3);

  const lastItemIndex = currentPage * itemPerPage;
  const firstItemIndex = lastItemIndex - itemPerPage;
  const thisPageItems = listTires.slice(firstItemIndex, lastItemIndex);

  const pages = [];

  for (let i = 1; i <= Math.ceil(listTires.length / itemPerPage); i++) {
    pages.push(i);
  }

  return (
    <div>
      <h1 className={tireStyle.tire_title}>Tires Inventory</h1>
      <table className={tireStyle.tire_table}>
        <thead>
          <tr className={tireStyle.tire_tr}>
            <th scope="col">Tires</th>
            <th scope="col">Companies</th>
            <th scope="col">Sizes</th>
            <th scope="col">Seasons</th>
            <th scope="col">Imageg</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody className={tireStyle.tire_tbody}>
          {thisPageItems.map((item, pn) => (
            <tr key={(item.id, pn)}>
              <td>
                {inEditMode.status && inEditMode.rowKey === item.id ? (
                  <select defaultValue={item.id}>
                    <option>Select Tire</option>
                    {listTires.map((item, pn) => (
                      <option key={pn} value={item.id}>
                        {item.tire_name}
                      </option>
                    ))}
                  </select>
                ) : (
                  item.tire_name
                )}
              </td>
              <td>
                {inEditMode.status && inEditMode.rowKey === item.id ? (
                  <select defaultValue={item.id}>
                    <option>Select Company</option>
                    {listTires.map((item, C) => (
                      <option key={C} value={item.id}>
                        {item.tire_company}
                      </option>
                    ))}
                  </select>
                ) : (
                  item.tire_company
                )}
              </td>
              <td>
                {inEditMode.status && inEditMode.rowKey === item.id ? (
                  <select defaultValue={item.id}>
                    <option>Select Size</option>
                    {listTires.map((item, zs) => (
                      <option key={zs} value={item.id}>
                        {item.tire_size}
                      </option>
                    ))}
                  </select>
                ) : (
                  item.tire_size
                )}
              </td>
              <td>
                {inEditMode.status && inEditMode.rowKey === item.id ? (
                  <select defaultValue={item.id}>
                    <option>Select Season</option>
                    {listTires.map((item, se) => (
                      <option key={se} value={item.id}>
                        {item.sn_name}
                      </option>
                    ))}
                  </select>
                ) : (
                  item.sn_name
                )}
              </td>
              <td>
                {inEditMode.status && inEditMode.rowKey === item.id ? (
                  <select defaultValue={item.img}>
                    <option>Select img</option>
                    {listTires.map((tire, i) => (
                      <option key={i} value={tire.img}>
                        {tire.img}
                      </option>
                    ))}
                  </select>
                ) : (
                  <img src={`${item.img}`} alt={item.tire_name} width="210px" />
                )}
              </td>

              <td>
                {inEditMode.status && inEditMode.rowKey === item.id ? (
                  <>
                    <button
                      className={'btn-secondary'}
                      onClick={() =>
                        updateTire({
                          id: item.id,
                          newTire: item.tire_name,
                        })
                      }
                    >
                      Save
                    </button>
                    <button
                      style={{ marginLeft: 8 }}
                      onClick={() => onCancel({ id: item.id })}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <button
                    className={'btn btn-outline-primary'}
                    onClick={() => navigate(`/api/tires/edit/${item.id}`)}
                  >
                    Edit
                  </button>
                )}
                <button
                  className={'btn btn-outline-danger'}
                  onClick={(e) => onDelete(item.id, e)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <nav>
        {pages.map((page, index) => {
          return (
            <button
              onClick={() => setCurrentPage(page)}
              key={index}
              className="btn btn-outline-warning"
            >
              {page}
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default TiresTable;
