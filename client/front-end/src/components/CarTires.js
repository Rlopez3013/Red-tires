import CarTiresTable from './CarTiresTable';
import { Container } from 'react-bootstrap';

const Car = () => {
  return (
    <div>
      <div>
        <main className="py-3">
          <Container>
            <CarTiresTable />
          </Container>
        </main>
      </div>
    </div>
  );
};

export default Car;
