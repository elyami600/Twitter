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
const getUsers = (request, response) => {
  console.log(response);
  db.query('SELECT * FROM users ORDER BY id ASC', (error, res) => {
    if (error) {
      throw error
    }
    console.log(res.rows);

    response.status(200).json(results.rows)
  })
}
const createNewUser = (request, response) => {
  const { username, email, password} = request.body
  console.log(request.body);

  db.query(`INSERT INTO users (username, email, password) VALUES ('${username}','${email}','${password}')`, (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`User added with ID: ${results.id}`)
    console.log(results.rowCount)
    console.log(results.oid)
    console.log(results.rows)


  })
}

const  login = (request, response) => {
  const { email, password} = request.body
  console.log(request.body);

  db.query(`SELECT * from users where email = '${email}' and password = '${password}'`, (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results)
    response.status(201).send(`User added with ID: ${results.rows}`)
    console.log(results.rowCount)
    console.log(results.oid)
    console.log(results.rows)


  })
}


  module.exports = {
    getUsers,
    createNewUser,
    login
    
  }