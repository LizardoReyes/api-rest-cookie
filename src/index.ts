import express, { Express } from "express";
import http, { Server } from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import mongoose from "mongoose";
import router from "./router";

const app: Express = express();

app.use(cors({
    credentials: true,
}));

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server: Server = http.createServer(app);

server.listen(8080, (): void => {
    console.log("Server started on http://locahost:8080/");
});

const MONGO_URL = 'mongodb://localhost:27017/api-rest-cookie';

mongoose.Promise = Promise;
mongoose.connect(MONGO_URL).then(() => console.log("Connected to MongoDB"));
mongoose.connection.on('error', console.log);

app.use("/", router());