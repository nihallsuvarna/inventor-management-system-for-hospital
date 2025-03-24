async function addOrderOutward(req, res) {
  const { item_id, quantity, order_date, issued_by } = req.body;

  // Check
  if (!item_id || !quantity || !order_date || !issued_by) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    // Create order
    const newOrder = {};
  } catch (err) {
    return res
      .status(500)
      .json({ status: 500, message: "Internal Server Error", result: err });
  }
}

module.exports = {
  addOrderOutward
};
