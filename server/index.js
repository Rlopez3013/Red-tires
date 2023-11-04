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

app.listen(PORT);
console.log(`Server running on port ${PORT}`);
