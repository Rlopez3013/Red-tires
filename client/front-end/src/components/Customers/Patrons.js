import CustomersTable from './customersTable';
import { Container } from 'react-bootstrap';

const Patrons = () => {
  return (
    <div>
      <div>
        <main className="py-3">
          <Container>
            <CustomersTable />
          </Container>
        </main>
      </div>
    </div>
  );
};

export default Patrons;
