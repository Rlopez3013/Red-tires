import CustomersTable from './customersTable';
import { Container } from 'react-bootstrap';
import customerStyle from './Customer.module.css';

const Patrons = () => {
  return (
    <div className={customerStyle.customerBg}>
      <div>
        <main>
          <Container>
            <CustomersTable />
          </Container>
        </main>
      </div>
    </div>
  );
};

export default Patrons;
