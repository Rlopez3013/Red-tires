import TiresTable from './tiresTable';
import { Container } from 'react-bootstrap';
import tireStyle from './tires.module.css';


const Tire = () => {
  return (
    <div className={tireStyle.tireBg}>
      <div>
        <main>
          <Container>
            <TiresTable />
          </Container>
          <br></br>
        </main>
      </div>
    </div>
  );
};

export default Tire;
