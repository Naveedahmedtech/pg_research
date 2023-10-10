const express = require("express");
const productRoutes = require("./productRoutes");
const suppliersRoutes = require("./suppliersRoutes");


const router = express.Router();

router.use("/products", productRoutes);
router.use("/suppliers", suppliersRoutes);

module.exports = router;
