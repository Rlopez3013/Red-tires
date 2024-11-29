import ShoppersTable from './shoppersTable';
import { container } from 'react-bootstrap';
import shopperStyle from './shopper.module.css';

const Shopper = () => {
  return (
    <div className={shopperStyle.shopper_bg}>
      <div>
        <main>
          <container-xxl>
            <ShoppersTable />
          </container-xxl>
        </main>
      </div>
    </div>
  );
};

export default Shopper;
