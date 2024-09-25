import ShoppersTable from './shoppersTable';
import { Container } from 'react-bootstrap';

const Shopper = () => {
  return (
    <div>
      <div>
        <main>
          <Container>
            <ShoppersTable />
          </Container>
        </main>
      </div>
    </div>
  );
};

export default Shopper;
