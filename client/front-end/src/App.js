import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MakersPage from './pages/MakersPage';
import ModelsPage from './pages/ModelsPage';
import CarTires from './components/CarTires';
import Makers from './components/Maker';
import Tires from './components/Tires';
import Edit from './components/makerEdit';
import Update from './components/modelEdit';
import Models from './components/Models';
import Home from './pages/Home';
import MakerForm from './pages/MakerForm';
import ModelForm from './pages/ModelForm';
import CarsForm from './pages/CarsForm';
import Navbar from './components/Navbar';
import EditTire from './components/tireEdit';
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
        <Route path="/api/tires/updateTire/:id" element={<EditTire />} />
        <Route path="/api/models/newModel" element={<ModelForm />} />
      </Routes>
    </>
  );
}

export default App;
