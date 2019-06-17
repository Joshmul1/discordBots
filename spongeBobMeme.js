var config = require('./config.json');
var api_token = config.api_token;
const Discord = require(`discord.js`);
var isReady = true;
const client = new Discord.Client();


// prefixes
const sponge_prefix = '!sponge';
const region_prefix = '!reg';

client.once('ready', () => {
    console.log(`Client Loaded`);
});

client.on(`message`, message => {
    if (isReady) {
        if (message.content.startsWith(`${sponge_prefix}`)) {
            isReady = false;
            var messageContent = message.content.substring(sponge_prefix.length + 1);
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
        } else if (message.content.startsWith(`${region_prefix}`)) {
            isReady = false;
            var messageContent = message.content.substring(region_prefix.length + 1);
            if (messageContent === 'EUW' || messageContent === 'euw') {
                if (message.guild.region !== 'eu-west') {
                    message.guild.setRegion('eu-west');
                    message.channel.send("Server moved to EUW!");
                } else {
                    message.channel.send("The server is already in EU-West. Try send ``` !reg EUC ``` to move it to EU-Central instead");
                }
            } else if (messageContent === 'EUC' || messageContent === 'euc') {

                if (message.guild.region !== 'eu-central') {
                    message.guild.setRegion('eu-central');
                    message.channel.send("Server moved to EUC!");

                } else {
                    message.channel.send("The server is already in EU-Central. Try send ``` !reg EUW ``` to move it to EU-West instead");
                }
            } else {
                message.channel.send("Sorry but the argument ``` " + messageContent + " ```passed in is not valid. \n" +
                    "The current uses are ``` !reg EUW || !reg EUC ```  for EU-West and EU-Central regions respectively");

            }
            isReady = true;
        }
    }
});

client.login(api_token);
