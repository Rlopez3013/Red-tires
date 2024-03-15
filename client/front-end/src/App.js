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
import EditCustomer from './components/Customers/customerEdit'
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/MakersPage" element={<MakersPage />} />
        <Route path="/api/models_tires/carsTires" element={<CarTires />} />
        <Route path="/api/makers" element={<Makers />} />
        <Route path="/api/tires" element={<Tires />} />
        <Route path="/api/makers/newMaker" element={<MakerForm />} />
        <Route path="/api/models_tires/newCarTires" element={<CarsForm />} />
        <Route path="/api/maker/edit/:id" element={<Edit />} />
        <Route path="/ModelsPage" element={<ModelsPage />} />
        <Route path="/api/models" element={<Models />} />
        <Route path="/api/models/edit/:id" element={<Update />} />
        <Route path="/api/tires/edit/:id" element={<EditTire />} />
        <Route path="/api/models/newModel" element={<ModelForm />} />
        <Route path="/api/Customers/registration" element={<Registration />} />
        <Route path="/Customers/patrons" element={<Patrons />} />
        { <Route path='/Customers/edit/:id' element={<EditCustomer />} /> }
      </Routes>
    </>
  );
}

export default App;
