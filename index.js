const express = require('express')
const JSONParseError = require('@line/bot-sdk').JSONParseError
const SignatureValidationFailed = require('@line/bot-sdk').SignatureValidationFailed
const bodyParser= require('body-parser');
const cors      = require('cors');

const app = express()
app.use(cors())
app.use(bodyParser.json());
// initialize routes
app.use(require('./api'));

app.use((err, req, res, next) => {
  if (err instanceof SignatureValidationFailed) {
    res.status(401).send(err.signature)
    return
  } else if (err instanceof JSONParseError) {
    res.status(400).send(err.raw)
    return
  }
  next(err) // will throw default 500
})

app.listen(5000, function(){
    console.log('now listening port:' + 5000);
});