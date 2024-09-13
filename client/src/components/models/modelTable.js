import { useContext, useState } from 'react';
import { ModelsContext } from '../context/modelsContext.js';
import { useNavigate } from 'react-router-dom';
import modelStyle from './model.module.css';

const ModelsTable = () => {
  const {
    listModels,
    listMakers,
    loadModels,
    onDelete,
    onEdit,
    updateModel,
    onSave,
    onCancel,
    inEditMode,
  } = useContext(ModelsContext);
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage, setItemsPerPage] = useState(5);

  const lastItemIndex = currentPage * itemPerPage;
  const firstItemIndex = lastItemIndex - itemPerPage;
  const thisPageItems = listModels.slice(firstItemIndex, lastItemIndex);

  const pages = [];

  for (let i = 1; i <= Math.ceil(listModels.length / itemPerPage); i++) {
    pages.push(i);
  }

  return (
    <div>
      <div>
        <h1 className={modelStyle.model_title}>Models</h1>
        <table className="table table-lg table-secondary table-hover text-center">
          <thead>
            <tr className="tr table-active">
              <th>Makers</th>
              <th>Models</th>
              <th>Type</th>
              <th>Trim</th>
              <th>Year</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className={modelStyle.model_tbody}>
            {thisPageItems.map((item, mk) => (
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
                      <option>Select Trim</option>
                      {listModels.map((item, tr) => (
                        <option key={tr} value={item.id}>
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
    </div>
  );
};

export default ModelsTable;
