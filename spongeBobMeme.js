var config = require('./config.json');
var api_token = config.api_token;
const prefix = '!sponge';
const Discord = require(`discord.js`);
var isReady = true;
const client = new Discord.Client();



client.once('ready', () => {
    console.log(`Client Loaded`);
});

client.on(`message`, message => {
    if (isReady) {
        if (message.content.startsWith(`${prefix}`)) {
            isReady = false;
            var messageContent = message.content.substring(prefix.length + 1);
            messageContent = messageContent.toLowerCase();
            var newMessage = '';
            for (var i = 0; i < messageContent.length; i++) {
                if (i % 2 === 0) {
                    newMessage = newMessage + messageContent.charAt(i).toUpperCase();
                } else {
                    newMessage = newMessage + messageContent.charAt(i);
                }
            }
            var channel = message.channel.id;
            client.channels.get(channel).send(newMessage);
            isReady = true;




        }
    }



});




client.login(api_token);
