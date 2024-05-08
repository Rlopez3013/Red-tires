import { useContext } from 'react';
import { MakersContext } from '../../context/makersContext.js';
import { useNavigate } from 'react-router-dom';
import './maker.css';

const MakersTable = () => {
  const { listMakers, onDelete, onEdit, updateMaker, onCancel, inEditMode } =
    useContext(MakersContext);
  const navigate = useNavigate();
  return (
    <div>
      <h1 className="title display-5">Maker Inventory</h1>
      <table className="table table-sm table-success">
        <thead>
          <tr className="tr">
            <th>Makers</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className="tb-info">
          {listMakers.map((item, mk) => (
            <tr key={(item.id, mk)}>
              <td>
                {inEditMode.status && inEditMode.rowKey === item.id ? (
                  <select defaultValue={item.id}>
                    <option>Select Maker</option>
                    {listMakers.map((item, mk) => (
                      <option key={mk} value={item.id}>
                        {item.maker}
                      </option>
                    ))}
                  </select>
                ) : (
                  item.maker
                )}
              </td>
              <td>
                {inEditMode.status && inEditMode.rowKey === item.id ? (
                  <>
                    <button
                      className="btn btn-outline-primary"
                      onClick={() =>
                        updateMaker({
                          id: item.id,
                          newMaker: item.maker,
                        })
                      }
                    >
                      Save
                    </button>
                    <button
                      className="btn-cancel"
                      style={{ marginLeft: 8 }}
                      onClick={() => onCancel({ id: item.id })}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <button
                    className={'btn btn-outline-primary'}
                    onClick={() => navigate(`/api/maker/edit/${item.id}`)}
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
export default MakersTable;
