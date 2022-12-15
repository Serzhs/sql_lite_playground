import sqlite3 from 'sqlite3'

sqlite3.verbose()
// https://github.com/TryGhost/node-sqlite3/wiki/API
export const openDb = new sqlite3.Database('./src/db/database.db')

// https://discuss.codecademy.com/t/why-use-db-each-instead-db-all-or-db-get-in-node-sqlite/381382
// run - runs SQL without return NB - three args, third one is callback
// get - runs SQL and returns first founded data
// all - runs SQL and returns all matches
// each - runs SQL and returns callback for each match
