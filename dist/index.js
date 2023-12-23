"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const databaseConnection_1 = require("./configs/databaseConnection");
const responseMessage_1 = require("./constant/responseMessage");
const statusCode_1 = require("./constant/statusCode");
const routes_1 = __importDefault(require("./routes"));
const response_1 = require("./utils/response");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const http_1 = require("http");
dotenv_1.default.config();
const app = (0, express_1.default)();
const httpServer = (0, http_1.createServer)(app);
const { Server } = require("socket.io");
app.use(cors({ origin: true, credentials: true }));
app.use(express_1.default.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.set("view engine", "ejs");
app.use(express_1.default.static(path_1.default.join(__dirname, "..", "src", "public")));
const port = process.env.PORT || 8000;
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
        return (0, response_1.sendResponse)(res, statusCode_1.HTTP_STATUS.UNPROCESSABLE_ENTITY, "Invalid JSON provided");
    }
    next();
});
app.use("/api", routes_1.default);
app.get("/", (req, res) => {
    return (0, response_1.sendResponse)(res, statusCode_1.HTTP_STATUS.OK, responseMessage_1.RESPONSE_MESSAGE.BASE_ROUTE);
});
app.use((req, res, next) => {
    return (0, response_1.sendResponse)(res, statusCode_1.HTTP_STATUS.BAD_GATEWAY, responseMessage_1.RESPONSE_MESSAGE.NOT_FOUND);
});
(0, databaseConnection_1.connectDB)(() => {
    httpServer.listen(port, () => {
        console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
    });
});
const io = new Server(httpServer, {
    cors: {
        origin: true,
    },
});
io.on("connection", (socket) => {
    console.log("New connection");
    socket.on("setup", (userData) => {
        socket.join(userData.email);
        socket.emit("connected");
    });
    socket.on("join chat", (room) => {
        socket.join(room);
        console.log("User Joined Room: ", room);
    });
    socket.on("new message", (newMessageReceived) => {
        let chat = newMessageReceived.chat;
        if (!chat.users)
            return console.log("chat.users not defined");
        chat.users.forEach((user) => {
            if (user.email == newMessageReceived.sender.email)
                return;
            socket.in(user.email).emit("message received", newMessageReceived);
        });
    });
});
