import express, { Express } from "express";
import http, { Server } from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import router from "./router";

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 8080;
const MONGO_URL = process.env.MONGO_URL;

app.use(cors({
    credentials: true,
}));

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server: Server = http.createServer(app);

server.listen(PORT, (): void => {
    console.log(`Server started on http://locahost:${PORT}/`);
});

mongoose.Promise = Promise;
mongoose.connect(MONGO_URL).then(() => console.log("Connected to MongoDB"));
mongoose.connection.on('error', console.log);

app.use("/", router());