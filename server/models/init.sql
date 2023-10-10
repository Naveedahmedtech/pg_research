-- Sequence for products table
CREATE SEQUENCE IF NOT EXISTS product_sequence START 100000;

CREATE SEQUENCE IF NOT EXISTS supplier_sequence START 100000;

CREATE TABLE IF NOT EXISTS suppliers(
  supplier_id INT NOT NULL DEFAULT nextval('supplier_sequence') PRIMARY KEY,
  name TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS products(
  id INT NOT NULL DEFAULT nextval('product_sequence') PRIMARY KEY,
  name TEXT NOT NULL,
  image TEXT,
  price DECIMAL(10, 2),  
  code TEXT,
  supplier_id INT REFERENCES suppliers(supplier_id),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
