import { useContext } from 'react';
import { MakersContext } from '../context/makersContext.js';
import { useNavigate } from 'react-router-dom';
import makerStyle from './maker.module.css';

const MakersTable = () => {
  const { listMakers, onDelete, onEdit, updateMaker, onCancel, inEditMode } =
    useContext(MakersContext);
  const navigate = useNavigate();
  return (
    <div>
      <h1 className={makerStyle.maker_title}>Maker Inventory</h1>
      <table className="table table-sm table-secondary table-hover">
        <thead>
          <tr className={makerStyle.tr}>
            <th>Makers</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className={makerStyle.tbInfo}>
          {listMakers.map((item, mk) => (
            <tr key={(item.id, mk)}>
              <td>
                {inEditMode.status && inEditMode.rowKey === item.id ? (
                  <select defaultValue={item.id}>
                    <option>Select Maker</option>
                    {listMakers.map((item, mk) => (
                      <option key={mk} value={item.id}>
                        {item.maker_name}
                      </option>
                    ))}
                  </select>
                ) : (
                  item.maker_name
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
                          newMaker: item.maker_name,
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
                    onClick={() => navigate(`/maker/edit/${item.id}`)}
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
