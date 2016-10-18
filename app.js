// Add your requirements
var restify = require('restify');
var builder = require('botbuilder');

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.PORT || 3000, function()
{
   console.log('%s listening to %s', server.name, server.url);
});

// Create chat bot
var connector = new builder.ChatConnector
({ appId: 'b811d577-e934-4a6f-90e0-c150ad237bd0', appPassword: '7qd1oUpeD9k8Gt2YbWAeyWh' });
var bot = new builder.UniversalBot(connector);
server.post('/api/messages', connector.listen());

// Create bot dialogs
bot.dialog('/', function (session) {
    session.send("Hello World");
});
