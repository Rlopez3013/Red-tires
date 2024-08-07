import MakersTable from './makersTable';
import MakerForm from './MakerForm';
import { Container } from 'react-bootstrap';
import makerStyle from './maker.module.css';

const Maker = () => {
  return (
    <div className={makerStyle.makerBg}>
      <div>
        <div>
          <main>
            <Container>
              <MakersTable />
            </Container>
            <br></br>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Maker;
