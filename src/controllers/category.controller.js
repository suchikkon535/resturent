const Category = require("../models/categorys.model");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");
const asyncHandler = require("../utils/asyncHandler");

exports.addCategory = asyncHandler(async (req, res) => {
    const { name } = req.body;
    await Category.create({ name });
    res.json(new ApiResponse(201, "Category added successfully"));
});

exports.getCategorys = asyncHandler(async (req, res) => {
    const categorys = await Category.find().select("-__v");
    res.json(new ApiResponse(200, "Categorys fetched successfully", categorys));
});

