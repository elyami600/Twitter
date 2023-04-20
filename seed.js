const pg = require('pg');

console.log('SEED IS RUNNING');

const createUser = `
	CREATE TABLE IF NOT EXISTS users(
		id serial PRIMARY KEY,
		username text,
		email text unique,
		password text
	);
`;
const createTweet = `
CREATE TABLE IF NOT EXISTS tweettable(
		id serial PRIMARY KEY,
		tweet text,
		userId INTEGER not null
	);
`;

const db = new pg.Client({
  user: 'yamilperez',
  host: 'localhost',
  database: 'users',
  password: 'postgres',
  port: 5432,
});

db.connect();

db.query(`SELECT * FROM users`, (err, res) => {
  if(!err) {
    console.log(res.rows);
  } else {
    console.log(err.message);
  }

});



db.query(createUser)
	.then(({ rows = [] }) => {
		console.log('create ran successfully createUser', rows);
		return rows;
	})
	.catch(err => {
		console.error(err);
		console.error(err.stack);
	});

db.query(createTweet)
	.then(({ rows = [] }) => {
		console.log('create ran successfully createTweet', rows);
		return rows;
	})
	.catch(err => {
		console.error(err);
		console.error(err.stack);
	});