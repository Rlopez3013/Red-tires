import { useContext } from 'react';
import { CarsTiresContext } from '../../context/carTiresContext.js';
import { useNavigate } from 'react-router-dom';
import './cars.css';

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
  return (
    <div>
      <h1 className="car-title">Cars and Tires</h1>
      <table className="car-table">
        <thead>
          <tr className="car-tr">
            <th>Year</th>
            <th>Maker</th>
            <th>Model</th>
            <th>Trim</th>
            <th>Tire Brand</th>
            <th>Tire Model</th>
          </tr>
        </thead>
        <tbody>
          {listModelsTires.map((item, mk) => (
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
                    onClick={() => navigate(`/update/${item.id}`)}
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
    </div>
  );
};
export default CarTireTable;
