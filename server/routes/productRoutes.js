const express = require("express");
const router = express.Router();

const {
  getProducts,
  addProducts,
  updateProduct,
  deleteProduct,
} = require("../controllers/Products/productController");
const upload = require("../middlewares/uploadImage");

router.get("/", getProducts);
router.post("/add", upload.single("image"), addProducts);
router.put("/update/:id", upload.single("image"), updateProduct);
router.delete("/delete/:id", deleteProduct);

module.exports = router;
