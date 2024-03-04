"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.update_blog = exports.signin_user = exports.valid_blog = exports.signup_user = void 0;
const zod_1 = __importDefault(require("zod"));
exports.signup_user = zod_1.default.object({
    Email: zod_1.default.string().email(),
    Password: zod_1.default.string().min(6),
    Username: zod_1.default.string().min(4)
});
exports.valid_blog = zod_1.default.object({
    title: zod_1.default.string().min(3),
    content: zod_1.default.string().min(10),
    author: zod_1.default.string(),
    tags: zod_1.default.array(zod_1.default.string()).max(10)
});
exports.signin_user = zod_1.default.object({
    Email: zod_1.default.string().email(),
    Password: zod_1.default.string().min(4)
});
exports.update_blog = zod_1.default.object({
    id: zod_1.default.string(),
    blog_id: zod_1.default.string(),
    title: zod_1.default.string(),
    content: zod_1.default.string()
});
