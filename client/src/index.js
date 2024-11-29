import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { MakerProvider } from './components/context/makersContext';
import { ModelProvider } from './components/context/modelsContext';
import { CarsTiresProvider } from './components/context/carTiresContext';
import { TiresProvider } from './components/context/tiresContext';
import { WheelProvider } from './components/context/wheelContext';
import { CustomerProvider } from './components/context/customersContext';
import { ShoppersProvider } from './components/context/shoppersContext';
import 'bootstrap/dist/css/bootstrap.min.css';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <MakerProvider>
        <ModelProvider>
          <CarsTiresProvider>
            <TiresProvider>
              <WheelProvider>
                <CustomerProvider>
                  <ShoppersProvider>
                    <App />
                  </ShoppersProvider>
                </CustomerProvider>
              </WheelProvider>
            </TiresProvider>
          </CarsTiresProvider>
        </ModelProvider>
      </MakerProvider>
    </BrowserRouter>
  </React.StrictMode>
);
