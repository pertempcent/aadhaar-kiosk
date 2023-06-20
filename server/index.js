import Express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import userRoutes from './routes/user.js';
import usersRoutes from './routes/users.js';
import healthRoutes from './routes/health.js';
import messageRoutes from './routes/message.js';

const app = Express();
dotenv.config();

app.use(bodyParser.json({limit: '30mb', extended: true}));
app.use(bodyParser.urlencoded({limit: '30mb', extended: true}));
app.use(cors());

app.use('/', healthRoutes);
app.use('/user', userRoutes);
app.use('/users', usersRoutes);
app.use('/', messageRoutes);

const PORT = process.env.PORT || 3000;

// DB Connection
mongoose.set("strictQuery", false);
mongoose.connect('mongodb+srv://rocky:jLragjpvZ16rVLdE@cluster0.g4vhq.mongodb.net/?retryWrites=true&w=majority')
  .then(() => console.log('DB Connected'))
  .catch(() => console.log('Error DB'));

app.listen(PORT, () => console.log("Server started"))