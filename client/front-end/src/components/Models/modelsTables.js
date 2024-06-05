import { useContext } from 'react';
import { ModelsContext } from '../../context/modelsContext.js';
import { useNavigate } from 'react-router-dom';
import './models.css';

const ModelsTable = () => {
  const {
    listModels,
    listMakers,
    onDelete,
    onEdit,
    updateModel,
    onSave,
    onCancel,
    inEditMode,
  } = useContext(ModelsContext);
  const navigate = useNavigate();
  return (
    <div>
      <div className="row g-1 ">
        <h1 className="model-title text-center ">Models</h1>
        <table className="table table-lg table-secondary table-hover text-center">
          <thead>
            <tr className="tr table-active">
              <th>Makers</th>
              <th>Models</th>
              <th>Type</th>
              <th>Year</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="model-tbody table-hover">
            {listModels.map((item, mk) => (
              <tr key={(item.id, mk)}>
                <td>
                  {inEditMode.status && inEditMode.rowKey === item.id ? (
                    <select defaultValue={item.id}>
                      <option>Select Makers</option>
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
                    <select defaultValue={item.id}>
                      <option>Select Model</option>
                      {listModels.map((item, md) => (
                        <option key={md} value={item.id}>
                          {item.model_name}
                        </option>
                      ))}
                    </select>
                  ) : (
                    item.model_name
                  )}
                </td>
                <td>
                  {inEditMode.status && inEditMode.rowKey === item.id ? (
                    <select defaultValue={item.id}>
                      <option>Select Type</option>
                      {listModels.map((item, ty) => (
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
                      <option>Select Year</option>
                      {listModels.map((item, yr) => (
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
                  {inEditMode.status && inEditMode.rowKey === item.id ? (
                    <>
                      <button
                        className={'btn-secondary'}
                        onClick={() =>
                          updateModel({
                            id: item.id,
                            newModel: item.model_name,
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
                      onClick={() => navigate(`/models/edit/${item.id}`)}
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
    </div>
  );
};

export default ModelsTable;
