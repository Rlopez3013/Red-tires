import ModelsTable from './modelsTables';
import ModelsForm from './ModelForm';
import { Container } from 'react-bootstrap';

const Model = () => {
  return (
    <div>
      <div>
        <main>
          <Container>
            <ModelsTable />
            <br></br>
            {/* <ModelsForm /> */}
          </Container>
        </main>
      </div>
    </div>
  );
};

export default Model;
