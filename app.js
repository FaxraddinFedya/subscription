import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import cookieParser from 'cookie-parser';
import PlansRouter from './Routers/Plans.js';
import UsersRouter from './Routers/Users.js';
import SubscriptionRouter from "./Routers/Subscriptions.js";
import connectDB from './mongoose.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename)

const app = express();

connectDB()

// const corsOptions = cors({
//     origin: true,
//     credentials: true
// })
// app.options('*', cors(corsOptions));
// app.use(cors(corsOptions))
app.use(cors({ origin: true, optionsSuccessStatus: 200, credentials: true }));
app.use(cookieParser());
app.use(express.json());
app.use(PlansRouter);
app.use(UsersRouter);
app.use(SubscriptionRouter);

app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const PORT = process.env.PORT || 3000;


app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
});

export default app;