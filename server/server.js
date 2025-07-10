dotenv.config();
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors'
import connnectDB from './config/MongoDb.js';

//Router importing
import authRouter from './routers/authRoutes.js'
import userRouter from './routers/userRoute.js'
import instructorRoutes from './routers/instructor.js'
import adminRoutes from './routers/adminRouter.js'
import contactRoutes from './routers/contactRouter.js'

const app = express();
const PORT =process.env.PORT || 8000;
connnectDB();

const allowedOrigins = ['http://localhost:5173','http://localhost:5174'];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));     // ✅ First

app.use(express.json());        // ✅ Then JSON

// Routers
app.use('/auth',authRouter)
app.use('/user',userRouter)
app.use('/instructor',instructorRoutes)
app.use('/contact',contactRoutes)
app.use('/admin', adminRoutes);



app.get('/', (req, res) => {
  res.send('🚀 Backend is running with ES modules...');
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
