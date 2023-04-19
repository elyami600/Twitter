const express = require('express');
const app = express();
const port = process.env.PORT || 5000







app.get('/api', (req, res) => { 
    res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' }); 
  });

app.listen(port, () => console.log(`I am listening on http://localhost:${port}!`));