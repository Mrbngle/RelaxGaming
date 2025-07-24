
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import leaderboardRoutes from './routes/leaderboard';

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(bodyParser.json());

app.use('/', leaderboardRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default app;
