import MakersTable from './makersTable';
import MakerForm from '../pages/MakerForm';
import { Container } from 'react-bootstrap';

const Maker = () => {
  return (
    <div>
      <div>
        <main className="py-3">
          <Container>
            <MakersTable />
            <br></br>
            <MakerForm />
          </Container>
        </main>
      </div>
    </div>
  );
};

export default Maker;
