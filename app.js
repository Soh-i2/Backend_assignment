import express from "express";
import mongoose from  'mongoose';
import bodyParser from 'body-parser';
import userRoutes from './routes/userRoutes.js';

// Initialize express app
const app = express();

// Middleware
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb+srv://sohinichanda2002:iGWsM0CgzzblqDH7@cluster0.g48smeh.mongodb.net/MoneyLending?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.log('Error connecting to MongoDB:', error);
});

// Routes
app.use('/api', userRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
