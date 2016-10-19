//botty.js:

const config = require('./config.js')
const restify = require('restify')
const builder = require('botbuilder')

// Connection to Microsoft Bot Framework
connector = new builder.ChatConnector({
  appId: config.appid,
  appPassword: config.secret,
})

bot = new builder.UniversalBot(connector)

// Server Init
const server = restify.createServer()
server.listen(process.env.PORT || 80, function() 
{
   console.log('%s listening to %s', server.name, server.url); 
});
server.post('/api/messages', connector.listen())

//bot dialog
bot.dialog('/', [
    function (session) {
        builder.Prompts.text(session, "Hi! I'm a sad, semi-useless bot. How are you feeling?");
    },
    function (session, results) {
        session.userData.name = results.response;
        builder.Prompts.text(session, "So you're feeling " + results.response + "? I want to try to help...but I'll probably screw it up...Can I try to help you?");
    },
    function (session, results) {
        session.userData.coding = results.response;
        builder.Prompts.choice(session, "What should I do?", ["Go Away", "delete self;", "pass you a pointer to someone useful"]);
    },
    function (session, results) {
        session.userData.language = results.response.entity;
        session.send("Got it... So you're feeling " + session.userData.name +
                     ". I offered you help. You said " + session.userData.coding +
                     ". You said I should " + session.userData.language + ". I'll get right on that...");
    }
]);
