import { useContext, useState } from 'react';
import { ShoppersContext } from '../context/shoppersContext';
import { useNavigate } from 'react-router-dom';
import shopperStyle from './shopper.module.css';
const ShopperTable = () => {
  const {
    listShoppers,
    setListShoppers,
    onDelete,
    shopper,
    inEditMode,
    updateShopper,
    onSave,
    onCancel,
  } = useContext(ShoppersContext);
  const navigate = useNavigate();
  console.log('list shoppers', listShoppers);

  return (
    <div className={shopperStyle.shopper_bg}>
      <h1 className={shopperStyle.shopper_title}>Shoppers Table with Tires</h1>
      <table className="table table-sm table-secondary table-hover text-center">
        <thead>
          <tr>
            <th>Name</th>
            <th>Last Name</th>
            <th>Model</th>
            <th>Tire</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {listShoppers.map((item, fn) => (
            <tr key={(item.id, fn)}>
              <td>
                {inEditMode.status && inEditMode.rowKey === item.id ? (
                  <select defaultValue={item.id}>
                    <option>Select Name</option>
                    {listShoppers.map((item, fn) => (
                      <option key={fn} value={item.id}>
                        {item.first_name}
                      </option>
                    ))}
                  </select>
                ) : (
                  item.first_name
                )}
              </td>
              <td>
                {inEditMode.status && inEditMode.rowKey === item.id ? (
                  <select default={item.id}>
                    <option>Select Last Name</option>
                    {listShoppers.map((item, ln) => (
                      <option key={ln} value={item.id}>
                        {item.last_name}
                      </option>
                    ))}
                  </select>
                ) : (
                  item.last_name
                )}
              </td>
              <td>
                {inEditMode.status && inEditMode.rowKey === item.id ? (
                  <select defaultValue={item.id}>
                    <option>select Model</option>
                    {listShoppers.map((item, md) => (
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
                    <option>Select Tire</option>
                    {listShoppers.map((item, t) => (
                      <option key={t} value={item.id}>
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
                        updateShopper({
                          id: item.id,
                          newShopper: item.model_name,
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
                    onClick={() => navigate(`/shoppers/edit/${item.id}`)}
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

export default ShopperTable;
