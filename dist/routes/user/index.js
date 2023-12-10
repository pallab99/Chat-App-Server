"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = require("../../controllers/user");
const tokenValidator_1 = require("../../middlewares/tokenValidator");
const validator_1 = require("../../middlewares/validator");
const router = express_1.default.Router();
router
    .get("/all", [tokenValidator_1.tokenAuthorization], user_1.UserController.getAllUser)
    .get("/me", [tokenValidator_1.tokenAuthorization], user_1.UserController.getUserProfile)
    .delete("/delete/:userId", [tokenValidator_1.tokenAuthorization, tokenValidator_1.isAdmin], user_1.UserController.deleteUser)
    .patch("/update", [tokenValidator_1.tokenAuthorization, tokenValidator_1.isStudentOrInstructor, ...validator_1.validator.updateUser], user_1.UserController.updateUser);
exports.default = router;
