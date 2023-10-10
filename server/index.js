require("dotenv").config();
const express = require("express");
const knex = require("./config/db");
const path = require("path");
const cors = require("cors");
const upload = require("./middlewares/uploadImage");
const Papa = require("papaparse");
const puppeteer = require("puppeteer");
const ejs = require("ejs");
const PDFDocument = require("pdfkit");

const app = express();

app.use(cors());

app.set("view engine", "ejs");

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));

app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/add-products", upload.single("image"), async (req, res) => {
  try {
    const { name, code, price, supplier_id } = req.body;
    const files = req.file;
    const { filename } = files;
    await knex("products").insert({
      name,
      image: filename,
      code,
      price,
      supplier_id,
    });
    return res.status(200).json({ success: "Product Added Successfully" });
  } catch (error) {
    console.log(error);
    return res.status(404).json({ error: error.message });
  }
});


app.put("/update-product/:id", upload.single("image"), async (req, res) => {
  try {
    const { name, code, price, supplier_id } = req.body;
    const productId = req.params.id;
    const updates = {};

    if (name) updates.name = name;
    if (code) updates.code = code;
    if (price) updates.price = price;
    if (supplier_id) updates.supplier_id = supplier_id;

    if (req.file) {
      const { filename } = req.file;
      updates.image = filename;
    }

    await knex("products").where({ id: productId }).update(updates);
    return res.status(200).json({ success: "Product Updated Successfully" });
  } catch (error) {
    console.log(error);
    return res.status(404).json({ error: error.message });
  }
});


app.delete("/delete-product/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    await knex("products").where({ id: productId }).del();
    return res.status(200).json({ success: "Product Deleted Successfully" });
  } catch (error) {
    console.log(error);
    return res.status(404).json({ error: error.message });
  }
});


app.post("/add-suppliers", async (req, res) => {
  try {
    const { name } = req.body;

    await knex("suppliers").insert({
      name,
    });
    return res.status(200).json({ success: "Product Added Successfully" });
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
});

app.get("/products", async (req, res) => {
  try {
    const products = await knex("products").select();
    return res.status(200).json({ products });
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
});

app.get("/suppliers", async (req, res) => {
  try {
    const suppliers = await knex("suppliers").select();
    return res.status(200).json({ suppliers });
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
});

app.get("/supplier-products", async (req, res) => {
  try {
    const combineResult = await knex("products")
      .join("suppliers", "products.supplier_id", "=", "suppliers.supplier_id")
      .select("products. *", "suppliers.name as supplier_name, supplier_id");

    return res.status(200).json({ result: combineResult });
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
});

app.get("/export-csv", async (req, res) => {
  try {
    const data = [
      { name: "John", age: 25, occupation: "Engineer" },
      { name: "Jane", age: 28, occupation: "Doctor" },
    ];

    const csv = Papa.unparse(data);

    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", "attachment; filename=data.csv");

    res.end(csv);
  } catch (error) {
    console.log(error);
    return res.status(404).json({ error: error.message });
  }
});

app.get("/export-pdf", async (req, res) => {
    const doc = new PDFDocument();

    let buffers = [];
    doc.on("data", buffers.push.bind(buffers));
    doc.on("end", () => {
      let pdfData = Buffer.concat(buffers);
      res
        .writeHead(200, {
          "Content-Length": Buffer.byteLength(pdfData),
          "Content-Type": "application/pdf",
          "Content-disposition": "attachment;filename=exported.pdf",
        })
        .end(pdfData);
    });

    doc.text("Hello, this is your exported data!", 100, 100);
    doc.end();
});

app.listen(PORT, () => console.log(`App listening on ${PORT}`));
