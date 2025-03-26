"use strict";
// We are putting some common things in common folder such as zod validation type inference as it will be used by both frontend and backend.
//Here we will do it in traditional way without monorepos/turorepo and will upload our types/variables over npm module
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBlogInput = exports.createBlogInput = exports.signinInput = exports.signupInput = void 0;
const zod_1 = __importDefault(require("zod"));
exports.signupInput = zod_1.default.object({
    email: zod_1.default.string().email(),
    password: zod_1.default.string().min(6),
    name: zod_1.default.string().optional()
});
exports.signinInput = zod_1.default.object({
    email: zod_1.default.string().email(),
    password: zod_1.default.string().min(6),
});
exports.createBlogInput = zod_1.default.object({
    title: zod_1.default.string(),
    content: zod_1.default.string(),
});
exports.updateBlogInput = zod_1.default.object({
    title: zod_1.default.string(),
    content: zod_1.default.string(),
    id: zod_1.default.string()
});
//QUESTION: How to import variables to backend and frontend from here?
//One way: use absolute paths like ../../../common inside index.ts in backend. But this is not the ideal way of doing it.
//But above logic might give error when uploading backend on cloudfare bec cloudfare may not understand anything outside backend folder.
//Ideal way: Conver this common folder into an nmp module and import that NPM module in backend folder.
//See online how to publish an npm module
//The above way is ideal untill you run monorepos.
