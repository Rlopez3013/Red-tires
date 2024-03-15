import { useContext } from 'react';
import { CustomerContext } from '../../context/customersContext.js';
import { useNavigate } from 'react-router-dom';

const CustomersTable = () => {
  const {
    listCustomers,
    onDelete,
    onEdit,
    updateCustomer,
    onCancel,
    inEditMode,
  } = useContext(CustomerContext);
  const navigate = useNavigate();

  return (
    <div>
      <h1 className="title">Customer Inventory</h1>
      <table className="table table-sm table-success">
        <thead>
          <tr className="tr">
            <th>Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Street</th>
            <th>City</th>
            <th>State</th>
            <th>Country</th>
            <th>Zip-Code</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className="tb-info">
          { listCustomers.map((item, n) => (
            <tr key={(item.id, n)}>
              <td>
                {inEditMode.status && inEditMode.rowKey === item.id ? (
                  <select defaultValue={item.id}>
                    <option>Select Name</option>
                    {listCustomers.map((item, n) => (
                      <option key={n} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                ) : (
                  item.f_name
                )}
              </td>
              <td>
                {inEditMode.status && inEditMode.rowKey === item.id ? (
                  <select defaultValue={item.id}>
                    <option>Select Last Name</option>
                    {listCustomers.map((item, Ln) => (
                      <option key={Ln} value={item.id}>
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
                    <option>Select Email</option>
                    {listCustomers.map((item, E) => (
                      <option key={E} value={item.id}>
                        {item.email}
                      </option>
                    ))}
                  </select>
                ) : (
                  item.email
                )}
              </td>
              <td>
                {inEditMode.status && inEditMode.rowKey === item.id ? (
                  <select defaultValue={item.id}>
                    <option>Select Street</option>
                    {listCustomers.map((item, St) => (
                      <option key={St} value={item.id}>
                        {item.street}
                      </option>
                    ))}
                  </select>
                ) : (
                  item.street
                )}
              </td>
              <td>
                {inEditMode.status && inEditMode.rowKey === item.id ? (
                  <select defaultValue={item.id}>
                    <option>Select City</option>
                    {listCustomers.map((item, Tw) => (
                      <option key={Tw} value={item.id}>
                        {item.city}
                      </option>
                    ))}
                  </select>
                ) : (
                  item.city
                )}
              </td>
              <td>
                {inEditMode.status && inEditMode.rowKey === item.id ? (
                  <select defaultValue={item.id}>
                    Select State
                    <option>Select State</option>
                    {listCustomers.map((item, pr) => (
                      <option key={pr} value={item.id}>
                        {item.state}
                      </option>
                    ))}
                  </select>
                ) : (
                  item.state
                )}
              </td>
              <td>
                {inEditMode.state && inEditMode.rowKey === item.id ? (
                  <select defaultValue={item.id}>
                    <option>Select Country</option>
                    {listCustomers.map((item, H) => (
                      <option key={H} value={item.id}>
                        {item.country}
                      </option>
                    ))}
                  </select>
                ) : (
                  item.country
                )}
              </td>
              <td>
                {inEditMode.status && inEditMode.rowKey === item.id ? (
                  <select defaultValue={item.id}>
                    <option>Select Zip Code</option>
                    {listCustomers.map((item, Pc) => (
                      <option key={Pc} value={item.id}>
                        {item.zip_code}
                      </option>
                    ))}
                  </select>
                ) : (
                  item.zip_code
                )}
              </td>
              <td>
                {inEditMode.status && inEditMode.rowKey === item.id ? (
                  <>
                    <button
                      className={'btn-secondary'}
                      onClick={() =>
                        updateCustomer({
                          id: item.id,
                          newCustomer: item.customer,
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
                    onClick={() => navigate(`/customers/edit/${item.id}`)}
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
export default CustomersTable;
