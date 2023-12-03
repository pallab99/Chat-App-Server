"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = __importDefault(require("../../repository/auth"));
const bcrypt_1 = require("../../utils/bcrypt");
class AuthServiceClass {
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield auth_1.default.findByEmail(email);
        });
    }
    samePassword(password, confirmPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            return password === confirmPassword;
        });
    }
    createUserInAuth(email, password, user) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield auth_1.default.createUser(email, password, user._id);
        });
    }
    findById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield auth_1.default.findById(userId);
        });
    }
    hashPassword(password) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, bcrypt_1.hashPasswordUsingBcrypt)(password);
        });
    }
    comparePassword(password, hashedPasswordFromDB) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, bcrypt_1.comparePasswords)(password, hashedPasswordFromDB);
        });
    }
    save(entity) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield auth_1.default.save(entity);
        });
    }
    isEmailVerified(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield auth_1.default.isEmailVerified(userId);
        });
    }
    userDisabled(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield auth_1.default.userDisabled(email);
        });
    }
}
const AuthService = new AuthServiceClass();
exports.default = AuthService;
