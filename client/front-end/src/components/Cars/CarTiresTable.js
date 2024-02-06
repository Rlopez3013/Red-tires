import { useContext } from 'react';
import { CarsTiresContext } from '../../context/carTiresContext.js';
import { useNavigate } from 'react-router-dom';

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

  return (
    <div>
      <h1>Cars and Tires</h1>
      <table>
        <thead>
          <tr>
            <th>Year</th>
            <th>Maker</th>
            <th>Model</th>
            <th>Type</th>
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
                    <option>Select Model</option>
                    {listModelsTires.map((item, mk) => (
                      <opotion key={mk} value={item.maker}>
                        {item.maker}
                      </opotion>
                    ))}
                  </select>
                ) : (
                  item.maker
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
                  item.model
                )}
              </td>
              <td>
                {inEditMode.status && inEditMode.rowKey === item.id ? (
                  <select defaultValue={item.id}>
                    <option>Select Type</option>
                    {listModelsTires.map((item, ty) => (
                      <option key={ty} value={item.id}>
                        {item.type}
                      </option>
                    ))}
                  </select>
                ) : (
                  item.type
                )}
              </td>

              <td>
                {inEditMode.status && inEditMode.rowKey === item.id ? (
                  <select defaultValue={item.id}>
                    <option>Select Company</option>
                    {listModelsTires.map((item, cp) => (
                      <option key={cp} value={item.id}>
                        {item.company}
                      </option>
                    ))}
                  </select>
                ) : (
                  item.company
                )}
              </td>
              <td>
                {inEditMode.status && inEditMode.rowKey === item.id ? (
                  <select defaultValue={item.id}>
                    <option>Select Tire</option>
                    {listModelsTires.map((item, tr) => (
                      <option key={tr} value={item.id}>
                        {item.tire}
                      </option>
                    ))}
                  </select>
                ) : (
                  item.tire
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
                    className={'btn-edit'}
                    onClick={() => navigate(`/update/${item.id}`)}
                  >
                    Edit
                  </button>
                )}
                <button
                  className={'btn-delete'}
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
