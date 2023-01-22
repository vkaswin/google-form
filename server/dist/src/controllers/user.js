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
exports.login = exports.register = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_1 = __importDefault(require("../models/user"));
const utils_1 = require("../utils");
const register = (0, utils_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
        throw new utils_1.CustomError({ message: "Please add all fields", status: 400 });
    let existingUser = yield user_1.default.findOne({ email });
    if (existingUser)
        throw new utils_1.CustomError({ message: "User already exists", status: 400 });
    const salt = yield bcryptjs_1.default.genSalt();
    const hashPassword = yield bcryptjs_1.default.hash(password, salt);
    const user = yield user_1.default.create({
        name,
        email,
        password: hashPassword,
    });
    res.status(200).send({
        token: (0, utils_1.generateJwtToken)({
            _id: user._id,
            name: user.name,
            email: user.email,
        }),
    });
}));
exports.register = register;
const login = (0, utils_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password)
        throw new utils_1.CustomError({ message: "Please add all fields", status: 400 });
    let user = yield user_1.default.findOne({ email });
    if (!user)
        throw new utils_1.CustomError({ message: "User not exist", status: 400 });
    let isPasswordMatched = yield bcryptjs_1.default.compare(password, user.password);
    if (!isPasswordMatched)
        throw new utils_1.CustomError({ message: "Wrong Password", status: 400 });
    res.status(200).send({
        token: (0, utils_1.generateJwtToken)({
            _id: user._id,
            name: user.name,
            email: user.email,
        }),
    });
}));
exports.login = login;
