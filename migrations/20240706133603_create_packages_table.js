/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('packages', function(table) {
    table.uuid('id').defaultTo(knex.fn.uuid()).primary()
    table.string('name');
    table.string('description');
    table.timestamps();
})
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('packages')
};
