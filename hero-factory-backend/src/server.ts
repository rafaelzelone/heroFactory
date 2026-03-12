import express from 'express';
import cors from 'cors';
import { routes } from './routes/hero.route';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

export { app };

const PORT = 3333;

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}`);
  });
}