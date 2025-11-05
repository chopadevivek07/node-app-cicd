const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello from Jenkins & PM2, this is my webhook&deploy on secont EC2');
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
