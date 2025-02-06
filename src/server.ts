import dotenv from 'dotenv';
import express, { Application, urlencoded } from 'express';
import { createServer } from 'node:http';
import cookieParser from 'cookie-parser';

import { OTPDataAcces, syncMongoDB, userGetDataAcces, userPostDataAcces } from './data access';
import { OTPRoutes, UserRouteGet, UserRoutePost } from './routes';
import { OTPService, userGetService, userPostService } from './services';

dotenv.config();
const app: Application = express();
const server = createServer(app);
const PORT = process.env.PORT || 4000;
const MONGODB_URL = process.env.MONGODB_URL || 'mongodb://127.0.0.1:27017/chatapp'
const router = express.Router()

// Middleware
app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/',router);

// Router User
UserRouteGet(router,new userGetService(new userGetDataAcces))
UserRoutePost(router,new userPostService(new userPostDataAcces,new userGetDataAcces))

// OTP
OTPRoutes(router,new OTPService(new OTPDataAcces))

// Init Server
server.listen(PORT, () => {
    console.log(` server running at http://localhost:${PORT}`);
    syncMongoDB(MONGODB_URL);
})

