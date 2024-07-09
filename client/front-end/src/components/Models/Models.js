import ModelsTable from './modelsTables';
import ModelsForm from './ModelForm';
import { Container } from 'react-bootstrap';
import modelStyle from './models.module.css';

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
