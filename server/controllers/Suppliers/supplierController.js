const { pool } = require("../../config/db");

module.exports.addSuppliers = async (req, res) => {
  try {
    const { name } = req.body;
    const queryText = "INSERT INTO suppliers (name) VALUES ($1)";

    await pool.query(queryText, [name]);

    return res.status(200).json({ success: "Supplier Added Successfully" });
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
}


module.exports.getSuppliers = async (req, res) => {
  try {
    const queryText = "SELECT * FROM suppliers";
    const { rows: suppliers } = await pool.query(queryText);

    return res.status(200).json({ suppliers });
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
}



module.exports.combineSP = async (req, res) => {
  try {
    const queryText = `
      SELECT products.*, suppliers.name AS supplier_name, suppliers.supplier_id 
      FROM products 
      JOIN suppliers ON products.supplier_id = suppliers.supplier_id
    `;

    const { rows: result } = await pool.query(queryText);

    return res.status(200).json({ result });
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
}

