const User = require("../models/user.model");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");
const asyncHandler = require("../utils/asyncHandler");

exports.createUser = asyncHandler(async (req, res) => {
    const { fullname, email, password } = req.body;
    console.log(req.body);
    

    const existingUser = await User.findOne({ email });
    if (existingUser) throw new ApiError(400, "User with this email already exists");

    await User.create({ fullname, email, password });

    res.json(new ApiResponse(201, "User created successfully"));

});

exports.loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
     console.log(req.body);

    const user = await User.findOne({ email });
    if (!user) throw new ApiError(400, "Invalid email or password");

    const isMatch = await user.comparePassword(password);
    if (!isMatch) throw new ApiError(400, "Invalid email or password");

    const token = user.generateJWT();

    res.json(new ApiResponse(200, "Login successful", { token }));
})

exports.getProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id).select("-_id -password");

    res.json(new ApiResponse(200, "User profile fetched successfully", user));
})

exports.updateProfile = asyncHandler(async (req, res) => {
    const { fullname, email, password } = req.body;

    const user = await User.findById(req.user._id);
    if (!user) {
        throw new ApiError(404, "User not found");
    }

    if (email && email !== user.email) {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            throw new ApiError(400, "User with this email already exists");
        }
        user.email = email;
    }

    if (fullname) {
        user.fullname = fullname;
    }

    if (password) {
        user.password = password;
    }

    await user.save();

    const updatedUser = {
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
    };

    res.json(new ApiResponse(200, "User profile updated successfully", updatedUser));
});

exports.logoutUser = asyncHandler(async (req, res) => {
    res.json(new ApiResponse(200, "Logout successful"));
});