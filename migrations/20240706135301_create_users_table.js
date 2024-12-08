/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('users', function(table) {
    table.uuid('uuid').defaultTo(knex.fn.uuid()).primary()
    table.string('name');
    table.string('password');
    table.string('email').unique().notNullable();
    table.string('google_id');
    table.timestamps(true, true);
})
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('users')
};
