import express, {Application} from 'express';
import helmet from 'helmet';
import dotenv from 'dotenv';
import cors from 'cors';
import {notFound, errorHandler} from './middlewares/errorMiddlewares';
import api from './api/index';


dotenv.config();

const app:Application = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

app.use('/api/v1/', api);
app.use(notFound);
app.use(errorHandler);

export default app;