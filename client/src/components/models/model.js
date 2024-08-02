import ModelsTable from './modelTable';
import ModelsForm from './modelForm';
import { Container } from 'react-bootstrap';
import modelStyle from './model.module.css';

const Model = () => {
  return (
    <div className={modelStyle.modelBg}>
      <div>
        <main>
          <Container>
            <ModelsTable />
          </Container>
        </main>
      </div>
    </div>
  );
};

export default Model;
