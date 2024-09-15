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
const express_1 = require("express");
const __1 = require("..");
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const category = (0, express_1.Router)();
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads'); // specify the upload directory
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path_1.default.extname(file.originalname)); // unique filename with timestamp
    }
});
const upload = (0, multer_1.default)({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 5 }, // limit image size to 5MB
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path_1.default.extname(file.originalname).toLowerCase());
        if (mimetype && extname) {
            return cb(null, true);
        }
        else {
            cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});
category.post('/', upload.single('Image'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //@ts-ignore
        const userId = req.Id;
        const { Category_name, Sequence } = req.body;
        const imagePath = req.file ? req.file.path : null;
        const sequenceAsInt = parseInt(Sequence, 10);
        try {
            const response = yield __1.prisma.category.create({
                data: {
                    Category_name,
                    Image: imagePath,
                    Sequence: sequenceAsInt,
                    userId
                }
            });
            console.log({ response });
            if (response.Status) {
                res.status(200).json({
                    success: true,
                    message: "success",
                });
            }
            else {
                res.status(409).json({
                    success: false,
                    message: "Category already exists",
                });
            }
        }
        catch (error) {
            res.status(502).json({
                error,
                success: false,
                msg: "Invalid Data",
            });
        }
    }
    catch (error) {
        res.status(500).json({
            success: false,
            msg: "Authentication failed",
        });
    }
}));
exports.default = category;
