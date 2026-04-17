const Cart = require("../models/cart.model");
const Order = require("../models/order.model");
const Address = require("../models/address.model");
const ApiError = require("../utils/ApiError")
const ApiResponse = require("../utils/ApiResponse")
const asyncHandler = require("../utils/asyncHandler");
const { getPagination } = require("../utils/pagination")


exports.createOrder = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { addressId, paymentMethod = "cod" } = req.body;

  const address = await Address.findOne({
    _id: addressId,
    user: userId,
  });

  if (!address) {
    throw new ApiError(404, "Address not found")
  }

  const cart = await Cart.findOne({ user: userId }).populate("items.item");

  if (!cart || cart.items.length === 0) {
    throw new ApiError(400, "Cart is empty")
  }

  const orderItems = cart.items.map((i) => ({
    item: i.item._id,
    name: i.item.name,
    price: i.price,
    quantity: i.quantity,
    image: i.item.image?.url,
  }));

  const order = await Order.create({
    user: userId,
    items: orderItems,
    totalItems: cart.totalItems,
    totalPrice: cart.totalPrice,
    paymentMethod,

    shippingAddress: {
      fullName: address.fullName,
      phone: address.phone,
      addressLine: address.addressLine,
      city: address.city,
      state: address.state,
      postalCode: address.postalCode,
      country: address.country,
    },
  })

  cart.items = [];
  cart.totalItems = 0;
  cart.totalPrice = 0;
  await cart.save();

  res.json(new ApiResponse(201, "Order plased Successfully", order))
});

exports.OrdersById = asyncHandler(async (req, res) => {

  const userId = req.user._id
  const orders = await Order.find({ user: userId }).select("-user -__v").populate("items.item", "-user -__v").lean()
  console.log(orders)

  res.json(new ApiResponse(200, "All Orders", orders))
})

exports.allOrders = asyncHandler(async (req, res) => {
  const { page, limit, skip } = getPagination(req)

  const [orders, total] = await Promise.all([
    Order.find()
      .select("totalItems status paymentStatus paymentMethod")
      .populate({
        path: "items.item",
        select: "name price category",
        populate: {
          path: "category",
          select: "name -_id"
        }
      })
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 })
      .lean(),

    Order.countDocuments()
  ])

  res.json(
    new ApiResponse(
      200,
      "All Orders",
      orders,
      {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    )
  )
})