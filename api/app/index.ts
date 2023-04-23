import express from 'express';
import { config } from 'dotenv';
import cors from 'cors';

import { Router } from './Routes';
import { boomErrorHandler, errorHandler, zodErrorHandler } from './middlewares';

const app = express();

config();
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 3030;

Router(app);

app.use(boomErrorHandler);
app.use(zodErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`[🧪]: Server is running at port: ${port}`);
});
