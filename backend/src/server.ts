import { errors } from 'celebrate';
import consola from 'consola';
import express from 'express';
import cors from 'cors';
import 'dotenv/config';

const app = express();

app.use(cors());
app.use(express.json());
app.use(errors());

app.listen(process.env.APP_PORT, () => {
  consola.success({message: `⚡ Server start with successfully on PORT ${process.env.APP_PORT} ⚡`, badge: true});
})