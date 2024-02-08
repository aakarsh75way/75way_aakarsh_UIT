import * as dotenv from 'dotenv';
dotenv.config()
import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import { checkDatabaseConnection } from './connection/db';
import authRoutes from './routes/authRoutes'
import appRoutes from './routes/appRoutes'
import documentRoutes from './routes/documentRoutes'
import uploadDocsRoute from './routes/uploadDocsRoute'
import cookieParser from 'cookie-parser';



const app = express();
const port = process.env.PORT || 4000;
// Middleware

app.use(express.json());
app.use(bodyParser.json());



app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

//authRoutes
app.use("/api/auth",authRoutes)
app.use("/api/apps",appRoutes)
app.use("/api/document",documentRoutes)
app.use("/api/upload",uploadDocsRoute)



// Start the server
app.listen(port, async () => {
   await checkDatabaseConnection()
  console.log(`Server is running on port xyz ${port}`);
});
