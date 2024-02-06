import ModelsTable from './modelsTables';
import ModelsForm from '../../pages/ModelForm';
import { Container } from 'react-bootstrap';

const Model = () => {
  return (
    <div>
      <div>
        <main className="py-3">
          <Container>
            <ModelsTable />
            <br></br>
            <ModelsForm />
          </Container>
        </main>
      </div>
    </div>
  );
};

export default Model;
