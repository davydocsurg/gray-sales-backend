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
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const helpers_1 = require("../helpers");
const models_1 = require("../models");
class CategoryController {
    constructor() {
        this.createCategory = this.createCategory.bind(this);
        this.fetchCategories = this.fetchCategories.bind(this);
        this.fetchCategory = this.fetchCategory.bind(this);
        this.updateCategory = this.updateCategory.bind(this);
        this.deleteCategory = this.deleteCategory.bind(this);
    }
    fetchCategories(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const categoriesCount = yield models_1.Category.find().countDocuments();
                const categories = yield models_1.Category.find();
                if (!categoriesCount) {
                    return res.json({
                        message: "No categories found",
                    });
                }
                return res.status(200).json({
                    success: true,
                    results: 1,
                    data: {
                        categories,
                    },
                });
            }
            catch (error) {
                return res.json({
                    success: false,
                    errors: {
                        error,
                    },
                });
            }
        });
    }
    fetchCategory(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const catId = req.params.catId;
                const category = yield models_1.Category.findById(catId);
                return res.status(200).json({
                    success: true,
                    results: 1,
                    data: {
                        category,
                    },
                });
            }
            catch (error) {
                return res.json({
                    success: false,
                    errors: {
                        error,
                    },
                });
            }
        });
    }
    createCategory(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let category = yield models_1.Category.create({
                    icon: req.body.icon,
                    label: req.body.label,
                    backgroundColor: req.body.backgroundColor,
                    value: req.body.value,
                });
                return res.status(200).json({
                    success: true,
                    results: 1,
                    data: {
                        category,
                    },
                });
            }
            catch (err) {
                helpers_1.Logging.error(err);
                return res.json({
                    success: false,
                    errors: {
                        err,
                    },
                });
            }
        });
    }
    updateCategory(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const catId = req.params.catId;
            const catIcon = req.body.icon;
            const catbgColor = req.body.backgroundColor;
            const catLabel = req.body.label;
            const catValue = req.body.value;
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                return res.json({
                    errors: errors,
                });
            }
            try {
                const updatedData = {
                    icon: catIcon,
                    backgroundColor: catbgColor,
                    label: catLabel,
                    value: catValue,
                };
                const category = yield models_1.Category.findByIdAndUpdate(catId, updatedData);
                return res.status(200).json({
                    success: true,
                    results: 1,
                    data: {
                        category,
                    },
                });
            }
            catch (error) {
                helpers_1.Logging.error(error);
                return res.json({
                    success: false,
                    errors: {
                        error,
                    },
                });
            }
        });
    }
    deleteCategory(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const catId = req.params.catId;
                const category = yield models_1.Category.findByIdAndDelete(catId);
                return res.status(200).json({
                    success: true,
                    results: 1,
                    data: {
                        category,
                    },
                });
            }
            catch (err) {
                helpers_1.Logging.error(err);
                return res.json({
                    success: false,
                    errors: {
                        err,
                    },
                });
            }
        });
    }
}
exports.default = new CategoryController();
