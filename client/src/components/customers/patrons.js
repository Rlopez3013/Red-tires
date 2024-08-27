import CustomersTable from './customerTable';
import { Container } from 'react-bootstrap';
import customerStyle from './customer.module.css';

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
