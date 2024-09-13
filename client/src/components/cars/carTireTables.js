import { useContext, useState } from 'react';
import { CarsTiresContext } from '../context/carTiresContext';
import { useNavigate } from 'react-router-dom';
import carStyle from './cars.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const CarTireTable = () => {
  const {
    listModelsTires,
    inEditMode,
    onDelete,
    onEdit,
    updateModelTire,
    onCancel,
    onSave,
  } = useContext(CarsTiresContext);
  const navigate = useNavigate();
  console.log('listModelTires', listModelsTires);

  const ITEMS_PER_PAGE = 4;

  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage, setItemsPerPage] = useState(5);

  const lastItemIndex = currentPage * itemPerPage;
  const firstItemIndex = lastItemIndex - itemPerPage;
  const thisPageItems = listModelsTires.slice(firstItemIndex, lastItemIndex);

  const pages = [];

  for (let i = 1; i <= Math.ceil(listModelsTires.length / itemPerPage); i++) {
    pages.push(i);
  }

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <h1 className={carStyle.car_title}>Cars and Tires</h1>
      <table className="table table-lg table-secondary table-hover text-center">
        <thead>
          <tr className={carStyle.car_tr}>
            <th>Year</th>
            <th>Maker</th>
            <th>Model</th>
            <th>Trim</th>
            <th>Tire Brand</th>
            <th>Tire Model</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className={carStyle.car_table}>
          {thisPageItems.map(
            (
              item,
              mk //listModelsTires
            ) => (
              <tr key={(item, mk)}>
                <td>
                  {inEditMode.status && inEditMode.rowKey === item.id ? (
                    <select defaultValue={item.id}>
                      <option>Select Year</option>
                      {listModelsTires.map((item, yr) => (
                        <option key={yr} value={item.id}>
                          {item.year}
                        </option>
                      ))}
                    </select>
                  ) : (
                    item.year
                  )}
                </td>
                <td>
                  {inEditMode.status && inEditMode.rowKey === item.maker ? (
                    <select defaultValue={item.mk}>
                      <option>Select Maker</option>
                      {listModelsTires.map((item, mk) => (
                        <opotion key={mk} value={item.id}>
                          {item.maker_name}
                        </opotion>
                      ))}
                    </select>
                  ) : (
                    item.maker_name
                  )}
                </td>
                <td>
                  {inEditMode.status && inEditMode.rowKey === item.id ? (
                    <select defaultValue={item.id}>
                      <option>Select Model</option>
                      {listModelsTires.map((item, md) => (
                        <option key={md} value={item.id}></option>
                      ))}
                    </select>
                  ) : (
                    item.model_name
                  )}
                </td>
                <td>
                  {inEditMode.status && inEditMode.rowKey === item.id ? (
                    <select defaultValue={item.id}>
                      <option>Select Trim</option>
                      {listModelsTires.map((item, ty) => (
                        <option key={ty} value={item.id}>
                          {item.trim}
                        </option>
                      ))}
                    </select>
                  ) : (
                    item.trim
                  )}
                </td>

                <td>
                  {inEditMode.status && inEditMode.rowKey === item.id ? (
                    <select defaultValue={item.id}>
                      <option>Select Company</option>
                      {listModelsTires.map((item, cp) => (
                        <option key={cp} value={item.id}>
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
                      <option>Select Tire</option>
                      {listModelsTires.map((item, tr) => (
                        <option key={tr} value={item.id}>
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
                    <>
                      <button
                        className={'btn-secondary'}
                        onClick={() =>
                          updateModelTire({
                            id: item.id,
                            newModelTire: item.ModelTire,
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
                      onClick={() => navigate(`/carTire/edit/model/${item.id}`)}
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
            )
          )}
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
export default CarTireTable;
