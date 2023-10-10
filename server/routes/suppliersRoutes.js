const express = require("express");
const router = express.Router();

const {
  getSuppliers,
  addSuppliers,
  combineSP,
} = require("../controllers/Suppliers/supplierController");

router.get("/", getSuppliers);
router.post("/add", addSuppliers);
router.get("/products", combineSP);

module.exports = router;
