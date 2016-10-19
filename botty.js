//botty.js:

const config = require('./config.js')
const restify = require('restify')
const builder = require('botbuilder')

// Connection to Microsoft Bot Framework
connector = new builder.ChatConnector({
  appId: config.appid,
  appPassword: config.secret,
})
//Setup Restify Server
var server = restify.createServer();
server.listen(process.env.PORT || 3000, function() 
{
    console.log('%s listening to %s', server.name, server.url); 
});

// Create chat bot
var bot = new builder.UniversalBot(connector);
server.post('/api/messages', connector.listen());

// Create bot dialogs
bot.dialog('/', function (session) {
	session.send("Hello World");
});
