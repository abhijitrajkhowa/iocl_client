const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, 'client')));
app.use(bodyParser.json());

const port = process.env.PORT||8000;

app.listen(port,()=> console.log(`server is running on port no. ${port}`));