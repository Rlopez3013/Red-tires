import MakersTable from './makersTable';
// import MakerForm from './makerForm';
import { Container } from 'react-bootstrap';
import makerStyle from './maker.module.css';
const Maker = () => {
  return (
    <div className={makerStyle.maker_Bg}>
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
