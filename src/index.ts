import dotEnv from "dotenv";
import express, { Application, NextFunction, Request, Response } from "express";
import path from "path";
import { connectDB } from "./configs/databaseConnection";
import { RESPONSE_MESSAGE } from "./constant/responseMessage";
import { HTTP_STATUS } from "./constant/statusCode";
import routes from "./routes";
import { ExpressError } from "./types/expressError";
import { sendResponse } from "./utils/response";
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
import { createServer } from "http";
dotEnv.config();
const app: Application = express();
const httpServer = createServer(app);
const { Server } = require("socket.io");

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "..", "src", "public")));
const port = process.env.PORT || 8000;

app.use(
  (err: ExpressError, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
      return sendResponse(
        res,
        HTTP_STATUS.UNPROCESSABLE_ENTITY,
        "Invalid JSON provided"
      );
    }
    next();
  }
);

app.use("/api", routes);
app.get("/", (req: Request, res: Response) => {
  return sendResponse(res, HTTP_STATUS.OK, RESPONSE_MESSAGE.BASE_ROUTE);
});

app.use((req: Request, res: Response, next: NextFunction) => {
  return sendResponse(res, HTTP_STATUS.BAD_GATEWAY, RESPONSE_MESSAGE.NOT_FOUND);
});

connectDB(() => {
  httpServer.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
  });
});

const io = new Server(httpServer, {
  cors: {
    origin: true,
  },
});

io.on("connection", (socket: any) => {
  console.log("New connection");

  socket.on("setup", (userData: any) => {
    socket.join(userData.email);
    socket.emit("connected");
  });

  socket.on("join chat", (room: any) => {
    socket.join(room);
    console.log("User Joined Room: ", room);
  });

  socket.on("new message", (newMessageReceived: any) => {
    let chat = newMessageReceived.chat;

    if (!chat.users) return console.log("chat.users not defined");

    chat.users.forEach((user: any) => {
      if (user.email == newMessageReceived.sender.email) return;
      socket.in(user.email).emit("message received", newMessageReceived);
    });
  });
});
