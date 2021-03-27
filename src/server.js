const dotenv = require('dotenv');
dotenv.config({ path: '.env' });

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const { AppConfig } = require('../config');
const { Router } = require('./router');

const app = express()
  .use(cors())
  .use(bodyParser.json({ limit: '5mb' }))
  .use('/api', Router);

app.get('/', async (req, res) => {
  var msg = `
    API Server Cooperlancia Works <br/>
    Server Time______: ${new Date()}<br/>
    Server Port______: ${AppConfig.Port}<br/>
  `;
  await res.send(msg);
});

app.listen(AppConfig.Port, function() {
  console.log(`SERVER running on port: ${AppConfig.Port}`);
});
