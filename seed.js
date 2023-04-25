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

// //Connected Database
db.connect((err) => { 
  if (err) {
  console.log(err);
  } else {
    console.log("Data logging initiated!");}
  });

db.query(`SELECT * FROM users`, (err, res) => {
  if(!err) {
    console.log("SELECT * FROM users");
    console.log(res.rows[0]);
  } else {
    console.log(err.message);
  }

});

db.query(`SELECT * FROM tweettable `, (err, res) => {
  if(!err) {
    console.log("SELECT * FROM tweettable");
    console.log(res.rows[0]);
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
    response.status(201).send(`User added with ID: ${response.rows[0]}`)


  })
}

const  login = (request, response) => {
  const { email, password} = request.body
  console.log(request.body);

  
  db.query(`SELECT * from users where email = '${email}' and password = '${password}'`, (error, results) => {
    if (error) {
      throw error
    }
    response.json({userId: results.id});
    
  })
}
const validation = (req, res) => {
  const { body: { id }} = req
  db.query(`SELECT * from users where id = '${id}' `)
		.then((result) => {

      if(!result.rows.length) {
				return res.json({ message: 'this accout does not exist' });
			}
      res.json({userId: result.rows[0].id});
      console.log({userId: result.rows[0].id })

    })

}
/**
 *  tweet
 */
const createNewTweet = (req, res) => {
  const { body: { tweetText, userId } } = req;
  db.query(`INSERT INTO tweettable (tweet, userId) VALUES ('${tweetText}', '${userId}') returning *`)
  .then(({rows:tweet})=> {
    db.query(`SELECT * from users where id = ${userId}`)
    .then((result) => {

      res.json({ tweet: {...tweet[0], username: result.rows[0].username}});
    })
  })
}

const getAllTweets = (req, res) => {
  db.query(`SELECT * from tweettable`)
  .then((result) => {
    res.json({ tweets: result.rows});
  });
  
}

  module.exports = {
    getUsers,
    createNewUser,
    login,
    validation,
    createNewTweet,
    getAllTweets,
    
  }