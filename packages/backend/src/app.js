"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const sample_route_1 = __importDefault(require("./routes/sample.route"));
const error_middleware_1 = require("./middlewares/error.middleware");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/api', sample_route_1.default);
app.use(error_middleware_1.errorHandler);
exports.default = app;
