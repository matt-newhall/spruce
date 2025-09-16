const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

import { initDb } from './db';
import errorHandler from './middleware/errorHandler';
import playersRouter from './routes/players';


const app = express();

app.use(cors());
app.use(express.json());

initDb()

app.get('/', (req, res) => res.send('Server is running!'));

app.use(errorHandler);

app.use("/players", playersRouter);

export default app
