/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.alterTable('packages', (table) => {
    table.string('links'); // Drop the new column if the migration is rolled back
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  // return table.dropColumn('links');
  return knex.schema.alterTable('packages', (table) => {
    table.dropColumn('links'); // Drop the new column if the migration is rolled back
  });
};
