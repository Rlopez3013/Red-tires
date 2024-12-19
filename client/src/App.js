import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MakersPage from './components/pages/makersPage';
import MakerForm from './components/makers/makerForm';
import ModelsPage from './components/pages/modelsPage';
import CarTires from './components/cars/carsTires';
import Makers from './components/makers/maker';
import Tires from './components/tires/tires';
import Edit from './components/makers/makerEdit';
import Update from './components/models/modelEdit';
import Models from './components/models/model';
import Home from './components/pages/home';
import ModelForm from './components/models/modelForm';
import CarsForm from './components/cars/carsForm';
import CarsEdit from './components/cars/carsTiresEdit';
import Navbar from './components/navigation/navBar';
import EditTire from './components/tires/tireEdit';
import Registration from './components/customers/registration';
import Patrons from './components/customers/patrons';
import CustomerEdit from './components/customers/customerEdit';
import Shoppers from './components/shoppers/shopper';
import Clientes from './components/shoppers/clientesTable';
import CheckOutForm from './components/shoppers/checkOutForm';
import ClienteInfo from './components/shoppers/customerInfo';
import PaymentProcedure from './cart/PaymentProcedure';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/makersPage" element={<MakersPage />} />
        <Route path="/models_tires/carsTires" element={<CarTires />} />
        <Route path="/makers" element={<Makers />} />
        <Route path="/tires" element={<Tires />} />
        <Route path="/makers/newMaker" element={<MakerForm />} />
        <Route path="/models_tires/newCarTires" element={<CarsForm />} />
        <Route path="/maker/edit/:id" element={<Edit />} />
        <Route path="/ModelsPage" element={<ModelsPage />} />
        <Route path="/models" element={<Models />} />
        <Route path="/models/edit/:id" element={<Update />} />
        <Route path="/tires/edit/:id" element={<EditTire />} />
        <Route path="/models/newModel" element={<ModelForm />} />
        <Route path="/Customers/registration" element={<Registration />} />
        <Route path="/Customers/patrons" element={<Patrons />} />
        <Route path="/Customers/edit/:id" element={<CustomerEdit />} />
        {/* <Route path="/shopper/cart" element={<ShoppersForm />}></Route> */}
        {/* <Route path="/Shopping/shopper" element={<Shopper />}></Route> */}
        <Route path="/carTire/edit/model/:id" element={<CarsEdit />}></Route>
        <Route path="/shoppers" element={<Shoppers />} />
        <Route path="/checkoutform" element={<CheckOutForm />}></Route>
        <Route path="/shoppers/clientes" element={<Clientes />}></Route>
        <Route
          path="/shoppers/customer/:customerId"
          element={<shopperDetails />}
        ></Route>
        <Route
          path="/shoppers/customeraddress/:customerId"
          element={<ClienteInfo />}
        />
        <Route
          path="/cart/payment/:customerId"
          element={<PaymentProcedure />}
        />
      </Routes>
    </>
  );
}

export default App;
