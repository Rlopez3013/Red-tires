import express from 'express';
import { PORT } from './config.js';
import indexRoutes from './Routes/index.routes.js';
import makersRoutes from './Routes/makers.routes.js';
import companiesRoutes from './Routes/companies.routes.js';
import modelsRoutes from './Routes/models.routes.js';
import models_tiresRoutes from './Routes/models_tires.routes.js';
import seasonsRoutes from './Routes/seasons.routes.js';
import sizesRoutes from './Routes/sizes.routes.js';
import tiresRoutes from './Routes/tires.routes.js';
import wheelsRoutes from './Routes/wheels.routes.js';
import customersRoutes from './Routes/customers.routes.js';
import shoppingRoutes from './Routes/shopping.routes.js';
import shoppersRoutes from './Routes/shoppers.routes.js';
import ordersRoutes from './Routes/orders.routes.js';
import checkoutsRoutes from './Routes/checkout.routes.js';
import customerAddressRoutes from './Routes/customerAddress.routes.js';
import paymentRoutes from "./Routes/payment.routes.js"
import cors from 'cors';
const app = express();


app.use(express.json());
app.use(cors());
app.use(indexRoutes);
app.use(makersRoutes);
app.use(companiesRoutes);
app.use(modelsRoutes);
app.use(wheelsRoutes);
app.use(models_tiresRoutes);
app.use(seasonsRoutes);
app.use(sizesRoutes);
app.use(tiresRoutes);
app.use(customersRoutes);
app.use(shoppingRoutes);
app.use(shoppersRoutes);
app.use(ordersRoutes);
app.use(checkoutsRoutes);
app.use(customerAddressRoutes);
app.use(paymentRoutes);

app.listen(PORT);
console.log(`Server running on port ${PORT}`);
