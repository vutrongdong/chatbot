const express = require('express')
const middleware = require('@line/bot-sdk').middleware
const JSONParseError = require('@line/bot-sdk').JSONParseError
const SignatureValidationFailed = require('@line/bot-sdk').SignatureValidationFailed
const { Client } = require('@line/bot-sdk')

const app = express()

const config = {
  channelAccessToken: 'YOUR_CHANNEL_ACCESS_TOKEN',
  channelSecret: 'fbc429606f93b307669f3e7137498d59'
}

const client = new Client({
    channelAccessToken: 'RLw6mpW3ES2VHnNcYpgpP5dEySzl8SAtgxiiBJARuC0k+/MiRwC6n7BpSyXpFVWjyqeSrpg+krGw8D2c8vHh7JOKFQmBBd0PmOvcWOQ5PVqXin93UinolKx+6cgXy0U/jozgWoAv3i9izyXkVKkjNwdB04t89/1O/w1cDnyilFU=',
    channelSecret: 'fbc429606f93b307669f3e7137498d59'
});
// app.use(middleware(config))

app.post('/webhook', (req, res) => {
  const event = req.body.events[0];

  switch (event.type) {
    case 'join':
    case 'follow':
      return client.replyMessage(event.replyToken, {
        type: 'text',
        text: 'Hello, Wellcome you!'
      });   
    case 'message':
      switch (event.message.type) {
          case 'text':
            switch (event.message.text) {
              case 'hello':
                return client.replyMessage(event.replyToken, {
                  type: 'text',
                  text: 'Can we help you?'
                });
              case 'I want book ticket':
                return client.replyMessage(event.replyToken, {
                  type: 'text',
                  text: 'Where do you want to book tickets?'
                });
            }
      }
  }
})

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