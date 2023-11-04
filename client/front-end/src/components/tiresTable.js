import { useContext } from 'react';
import { TiresContext } from '../context/tiresContext';
import { useNavigate } from 'react-router-dom';

const TiresTable = () => {
  const { listTires, onDelete, onEdit, updateTire, onCancel, inEditMode } =
    useContext(TiresContext);
  const navigate = useNavigate();

  return (
    <div>
      <h1>Tires Inventory</h1>
      <table>
        <thead>
          <tr>
            <th>Tires</th>
            <th>Companies</th>
            <th>Sizes</th>
            <th>Seasons</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {listTires.map((item, pn) => (
            <tr key={(item.id, pn)}>
              <td>
                {inEditMode.status && inEditMode.rowKey === item.id ? (
                  <select defaultValue={item.id}>
                    <option>Select Tire</option>
                    {listTires.map((item, pn) => (
                      <option key={pn} value={item.id}>
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
                  <select defaultValue={item.id}>
                    <option>Select Company</option>
                    {listTires.map((item, C) => (
                      <option key={C} value={item.id}>
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
                    <option>Select Size</option>
                    {listTires.map((item, zs) => (
                      <option key={zs} value={item.id}>
                        {item.size}
                      </option>
                    ))}
                  </select>
                ) : (
                  item.size
                )}
              </td>
              <td>
                {inEditMode.status && inEditMode.rowKey === item.id ? (
                  <select defaultValue={item.id}>
                    <option>Select Season</option>
                    {listTires.map((item, se) => (
                      <option key={se} value={item.id}>
                        {item.season}
                      </option>
                    ))}
                  </select>
                ) : (
                  item.season
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
                          newTire: item.tire,
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
                    onClick={() => navigate(`/api/tires/updateTire/${item.id}`)}
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

export default TiresTable;
