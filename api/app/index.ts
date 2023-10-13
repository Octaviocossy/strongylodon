import express from 'express';
import { config } from 'dotenv';
import cors from 'cors';

import { Router } from './routes';
import { boomErrorHandler, errorHandler, zodErrorHandler } from './middlewares';

const app = express();

config();
app.use(express.json());
app.use(cors({ credentials: true, origin: process.env.CLIENT_URL }));

const port = process.env.PORT || 3030;

Router(app);

app.use(boomErrorHandler);
app.use(zodErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`[🧪]: Server is running at port: ${port}`);
});
