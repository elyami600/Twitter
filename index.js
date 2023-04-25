const express = require('express')
const path = require('path');
const bodyParser = require('body-parser')
const app = express()
const db = require('./seed')
const port = process.env.PORT || 5000

// const buildQueryExecutor = client => query => db.query(query)
// 	.then(({ rows = [] }) => rows)
// 	.catch(err => {
// 		console.log(rows);
// 		console.error(err);
// 		console.error(err.stack);
// 	});

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)


app.use(express.static('build'));
app.use(express.json());


app.get('/api', (req, res) => { 
    res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' }); 
  });

app.post('/tweet/createUser', db.createNewUser)
app.post('/tweet/login', db.login)
app.post('/tweet/validation', db.validation)
app.post('/tweet/createTweet', db.createNewTweet)
app.get('/tweet/tweets', db.getAllTweets)


// app.get('/*', (req, res) => {
// 	res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });


app.listen(port, () => console.log(`I am listening on http://localhost:${port}!`));