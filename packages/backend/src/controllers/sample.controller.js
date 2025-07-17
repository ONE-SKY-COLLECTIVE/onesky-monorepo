"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sampleHandler = void 0;
const sample_service_1 = require("../services/sample.service");
const sampleHandler = async (req, res) => {
    const data = await (0, sample_service_1.getSampleData)();
    res.json({ data });
};
exports.sampleHandler = sampleHandler;
