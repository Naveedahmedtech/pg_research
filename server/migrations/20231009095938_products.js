/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("products", (table) => {
    table.increments("id");
    table.string("name");
    table.string("image");
    table.integer("price");
    table.integer("code");
    table.integer("supplier_id").unsigned();
    table.foreign("supplier_id").references("supplier_id").inTable("suppliers");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("products");
};
