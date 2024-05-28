import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MakersPage from './pages/MakersPage';
import ModelsPage from './pages/ModelsPage';
import CarTires from './components/Cars/CarTires';
import Makers from './components/Makers/Maker';
import Tires from './components/Tires/Tires';
import Edit from './components/Makers/makerEdit';
import Update from './components/Models/modelEdit';
import Models from './components/Models/Models';
import Home from './pages/Home';
import MakerForm from './components/Makers/MakerForm';
import ModelForm from './components/Models/ModelForm';
import CarsForm from './components/Cars/CarsForm';
import Navbar from './components/Navbar';
import EditTire from './components/Tires/tireEdit';
import Registration from './components/Customers/Registration';
import Patrons from './components/Customers/Patrons';
import CustomerEdit from './components/Customers/CustomerEdit';
import Shopper from './Shopping/Shopper';
import ShoppersForm from './Shopping/ShoppersForm';
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/MakersPage" element={<MakersPage />} />
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
        <Route path="/shopper/cart" element={<ShoppersForm />}></Route>
        <Route path="/Shopping/shopper" element={<Shopper />}></Route>
      </Routes>
    </>
  );
}

export default App;
