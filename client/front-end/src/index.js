import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { MakerProvider } from './context/makersContext';
import { ModelProvider } from './context/modelsContext';
import { CarsTiresProvider } from './context/carTiresContext';
import { TiresProvider } from './context/tiresContext';
import { WheelProvider } from './context/wheelContext';
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
                <App />
              </WheelProvider>
            </TiresProvider>
          </CarsTiresProvider>
        </ModelProvider>
      </MakerProvider>
    </BrowserRouter>
  </React.StrictMode>
);
