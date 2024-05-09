import MakersTable from './makersTable';
import MakerForm from './MakerForm';
import { Container } from 'react-bootstrap';


const Maker = () => {
  return (
    <div>
      <div>
        <main>
          <Container >
            <MakersTable />
            <br></br>
            
          </Container>
        </main>
      </div>
    </div>
  );
};

export default Maker;
