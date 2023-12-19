"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const tokenValidator_1 = require("../../middlewares/tokenValidator");
const message_1 = __importDefault(require("../../controllers/message"));
const router = express_1.default.Router();
router
    .get("/:chatId", [tokenValidator_1.tokenAuthorization], message_1.default.getAllMessage)
    .post("/new", [tokenValidator_1.tokenAuthorization], message_1.default.sendMessage);
exports.default = router;
