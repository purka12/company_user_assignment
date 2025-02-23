require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const companyRoutes = require('./routes/companyRoutes');
const userRoutes = require('./routes/userRoutes');
const searchRoutes = require('./routes/searchRoutes');

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use('/companies', companyRoutes);
app.use('/users', userRoutes);
app.use('/search', searchRoutes);

module.exports = app;
