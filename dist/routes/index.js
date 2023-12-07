"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = __importDefault(require("./auth/index"));
const user_1 = __importDefault(require("./user"));
const chat_1 = __importDefault(require("./chat/"));
const router = express_1.default.Router();
router.use("/auth", index_1.default);
router.use("/user", user_1.default);
router.use("/chat", chat_1.default);
exports.default = router;
