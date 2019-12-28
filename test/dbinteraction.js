const SQLite = require('better-sqlite3');
const testDB = new SQLite('./test.sqlite');

testDB.pragma("synchronous = 1");
testDB.pragma("journal_mode = wal");

testDB.prepare(`CREATE TABLE IF NOT EXISTS table1 (A TEXT KEY, B TEXT KEY)`).run();

let table1 = testDB.prepare(`INSERT OR REPLACE INTO table1 (A, B) VALUES (@A, @B);`);

var a = 1, b = 2;

var i = table1.run({A:a, B:b});

console.log(i);
