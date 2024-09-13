import CarTiresTable from './carTireTables';
import { Container } from 'react-bootstrap';
import carTireStyle from './cars.module.css';
const Car = () => {
  return (
    <div className={carTireStyle.carTireBg}>
      <div>
        <main>
          <Container>
            <CarTiresTable />
          </Container>
        </main>
      </div>
    </div>
  );
};

export default Car;
