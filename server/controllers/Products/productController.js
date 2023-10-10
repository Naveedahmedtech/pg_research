const { pool } = require("../../config/db");

module.exports.getProducts = async (req, res) => {
  try {
    const client = await pool.connect();
    const { rows: products } = await client.query("SELECT * FROM products");
    client.release();

    return res.status(200).json({ products });
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
};

module.exports.addProducts = async (req, res) => {
  try {
    const { name, code, price, supplier_id } = req.body;
    const files = req.file;
    const { filename } = files;

    const queryText = `
      INSERT INTO products (name, image, code, price, supplier_id)
      VALUES ($1, $2, $3, $4, $5)
    `;

    const values = [name, filename, code, price, supplier_id];

    await pool.query(queryText, values);

    return res.status(200).json({ success: "Product Added Successfully" });
  } catch (error) {
    console.log(error);
    return res.status(404).json({ error: error.message });
  }
};





module.exports.updateProduct =  async (req, res) => {
  try {
    const { name, code, price, supplier_id } = req.body;
    const productId = req.params.id;
    const values = [];
    let updateClause = "";

    if (name) {
      values.push(name);
      updateClause += `name = $${values.length}, `;
    }
    if (code) {
      values.push(code);
      updateClause += `code = $${values.length}, `;
    }
    if (price) {
      values.push(price);
      updateClause += `price = $${values.length}, `;
    }
    if (supplier_id) {
      values.push(supplier_id);
      updateClause += `supplier_id = $${values.length}, `;
    }

    if (req.file) {
      const { filename } = req.file;
      values.push(filename);
      updateClause += `image = $${values.length}, `;
    }

    // Remove trailing comma and space
    updateClause = updateClause.slice(0, -2);

    values.push(productId);
    const queryText = `UPDATE products SET ${updateClause} WHERE id = $${values.length}`;

    await pool.query(queryText, values);

    return res.status(200).json({ success: "Product Updated Successfully" });
  } catch (error) {
    console.log(error);
    return res.status(404).json({ error: error.message });
  }
}



module.exports.deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const queryText = "DELETE FROM products WHERE id = $1";

    await pool.query(queryText, [productId]);

    return res.status(200).json({ success: "Product Deleted Successfully" });
  } catch (error) {
    console.log(error);
    return res.status(404).json({ error: error.message });
  }
}
