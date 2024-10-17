const Wishlist = require("../models/Wishlist");

// Add a product to the wishlist
exports.addToWishlist = async (req, res) => {
    console.log(req.body);
  const { productId } = req.body;
  const userId = req.user; // Assuming user id is obtained from the token (authentication middleware)

  try {
    // Check if the product is already in the user's wishlist
    const existingItem = await Wishlist.findOne({ userId, productId });
    if (existingItem) {
      return res.status(400).json({ message: "Product is already in the wishlist" });
    }

    // Add new item to the wishlist
    const newItem = new Wishlist({ userId, productId });
    const savedItem = await newItem.save();
    res.status(200).json(savedItem);
  } catch (err) {
    res.status(500).json({ message: "Error adding product to wishlist(500)", error: err });
  }
};

// Get all wishlist items for a user
exports.getWishlist = async (req, res) => {
  const userId = req.user;

  try {
    const wishlist = await Wishlist.find({ userId }).populate("productId");
    res.status(200).json(wishlist);
  } catch (err) {
    res.status(500).json({ message: "Error fetching wishlist", error: err });
  }
};

// Remove a product from the wishlist
exports.removeFromWishlist = async (req, res) => {
  const { productId } = req.body;
  const userId = req.user;

  try {
    await Wishlist.findOneAndDelete({ userId, productId });
    res.status(200).json({ message: "Product removed from wishlist" });
  } catch (err) {
    res.status(500).json({ message: "Error removing product from wishlist", error: err });
  }
};
