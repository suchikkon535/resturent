const Item = require("../models/item.model");
const Category = require("../models/categorys.model");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");
const asyncHandler = require("../utils/asyncHandler");

exports.createItem = asyncHandler(async (req, res) => {
    const { name, description, price, category } = req.body;

    const getCategory = await Category.findById(category);
    if (!getCategory) throw new ApiError(400, "Invalid category");


    await Item.create({
        user: req.user._id,
        name,
        description,
        price,
        category: getCategory.name,
        image: {
            url: req.file.path,
            public_id: req.file.filename,
        },
    });

    res.json(new ApiResponse(201, "Item created",));
});

exports.getItems = asyncHandler(async (req, res) => {
    const items = await Item.find();
    res.json(new ApiResponse(200, "Items fetched successfully", items));
});

exports.getItemById = asyncHandler(async (req, res) => {
    const item = await Item.findById(req.params.id);
    if (!item) throw new ApiError(404, "Item not found");
    res.json(new ApiResponse(200, "Item fetched successfully", item));
});

exports.updateItem = asyncHandler(async (req, res) => {
    const { name, description, price, category } = req.body;
    const item = await Item.findById(req.params.id);
    if (!item) throw new ApiError(404, "Item not found");
    if (name) item.name = name;
    if (description) item.description = description;
    if (price !== undefined) item.price = price;
    if (category) item.category = category;
    await item.save();
    res.json(new ApiResponse(200, "Item updated successfully", item));
});

exports.deleteItem = asyncHandler(async (req, res) => {
    const item = await Item.findById(req.params.id);
    if (!item) throw new ApiError(404, "Item not found");
    await item.remove();
    res.json(new ApiResponse(200, "Item deleted successfully"));
});
