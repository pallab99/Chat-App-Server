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
const dotenv_1 = __importDefault(require("dotenv"));
const user_1 = __importDefault(require("../../repository/user"));
dotenv_1.default.config();
const bucketName = process.env.S3_BUCKET_NAME;
class USerServiceClass {
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield user_1.default.findByEmail(email);
        });
    }
    createUserInUser(name, email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield user_1.default.createUser(name, email);
        });
    }
    getAllUser(search, loggedInUser) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = {};
            if (search) {
                query.$or = [
                    { name: { $regex: search, $options: "i" } },
                    { email: { $regex: search, $options: "i" } },
                ];
            }
            return yield user_1.default.getAllUser(query, loggedInUser);
        });
    }
    updateProfilePicture(entity) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield user_1.default.save(entity);
        });
    }
    findById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield user_1.default.findById(userId);
            if (res) {
                return { success: true, data: res };
            }
            return { success: false, data: null };
        });
    }
    updateUser(email, entity) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield user_1.default.updateUser(email, entity);
            if (result) {
                return { success: true, data: result };
            }
            return { success: false, data: null };
        });
    }
    addToMyLearning(courseId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield user_1.default.addToMyLearning(courseId, userId);
            if (result) {
                return { success: true, data: result };
            }
            return { success: false, data: null };
        });
    }
    getMyLearning(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield user_1.default.getMyLearning(userId);
            if (result) {
                return { success: true, data: result };
            }
            return { success: false, data: null };
        });
    }
}
const UserService = new USerServiceClass();
exports.default = UserService;
