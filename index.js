// Import discord.js
var Discord = require('discord.js');

// import axios
var axios = require('axios');

// Create client instance
const bot = new Discord.Client();

// Set token
const token = 'MjcxMzE5MjEyNDM2MjI2MDQ4.C2EtOQ.NrH92Areg97ZClIHbeIGZ7xOpsk';

// Dev token
const devToken = 'MjcxNjc5NDI2NzU0OTA0MDY3.C2J8sQ.vHG_XQQY5OMKx21Q8rCTXIzcIME';

// The corporation ID
const corpID = '98437545';

// Industries ID
const indyID = '98453454';

// The global prefix
const prefix = "-";

// log our bot in
bot.login( token );

// On ready!
bot.on( 'ready', function( event ) {
    console.log( 'Logged in' );
});

bot.on( 'message', message => {

    // If does not start with prefix
    if ( !message.content.startsWith( prefix ) ) return;

    // And if is a bot
    if ( message.author.bot ) return;

    // Show latest EVE kill
    if ( message.content.startsWith( prefix + "last kill gaming") ) {
        const zkillLink = 'https://zkillboard.com/api/kills/corporationID/' + corpID + '/limit/1/';
        axios.get( zkillLink )
            .then(function( response ) {
                const killID = response.data[0].killID;
                message.channel.sendMessage( 'Latest The Realm Gaming kill: ' + 'https://zkillboard.com/kill/' + killID + '/' );
            });
    }

    // Show latest EVE death
    if ( message.content.startsWith( prefix + "last death gaming" ) ) {
        const zkillLink = 'https://zkillboard.com/api/losses/corporationID/' + corpID + '/limit/1/';
        axios.get( zkillLink )
            .then( function(response ) {
                const killID = response.data[0].killID;
                message.channel.sendMessage( 'Latest The Realm Gaming death: ' + 'https://zkillboard.com/kill/' + killID + '/' );
            });
    }

    // Show latest Industries EVE kill
    if ( message.content.startsWith( prefix + "last kill indy" ) ) {
        const zkillLink = 'https://zkillboard.com/api/kills/corporationID/' + indyID + '/limit/1/';
        axios.get( zkillLink )
            .then( function( response ) {
                const killID = response.data[0].killID;
                message.channel.sendMessage( 'Latest The Realm Industries kill: ' + 'https://zkillboard.com/kill/' + killID + '/' );
            });
    }

    // Show latest Industries EVE death
    if ( message.content.startsWith( prefix + "last death indy" ) ) {
        const zkillLink = 'https://zkillboard.com/api/losses/corporationID/' + indyID + '/limit/1/';
        axios.get( zkillLink )
            .then( function( response ) {
                const killID = response.data[0].killID;
                message.channel.sendMessage( 'Latest The Realm Industries death: ' + 'https://zkillboard.com/kill/' + killID + '/' );
            });
    }

    // Show all community useful information
    if ( message.content.startsWith( prefix + "info" ) ) {
        const leadership = 'Leadership: ```Sinistrous - Leader \nRequiem - Leader \nJaster - Head of Recruitment \nKorus - Head of Faciilities \nNapaztrix - Head of Events \nDarkLordCookie - Head of Content \nBurntcustard - Head of PR \nOrb - American Liaison Leader```';
        const general = '\nGeneral: ```Teamspeak Address: ts.the-realm-gaming.co.uk \nTeamspeak IP: 178.62.37.216 \nWebsite: https://the-realm-gaming.co.uk \nContact email: admin@the-realm-gaming.co.uk```';
        message.channel.sendMessage( leadership + general );
    }

    // Show Teamspeak info
    if ( message.content.startsWith( prefix + "ts" ) ) {
        const ts = '\nTeamspeak info: ```Teamspeak Address: ts.the-realm-gaming.co.uk \nTeamspeak IP: 178.62.37.216```';
        message.channel.sendMessage( ts );
    }

    // Show all commands
    if ( message.content.startsWith( prefix + "commands" ) ) {
        const cmdList = 'Commands for Realm Bot:```Markdown\n# General:\n-info\n-ts\n\n# EVE Online Commands:\n-last kill gaming\n-last death gaming\n-last kill indy\n-last death indy```';
        message.channel.sendMessage( cmdList );
    }
});

// Welcoming new users!
const newUsers = [];

bot.on("guildMemberAdd", (member) => {
    const guild = member.guild;
    if ( !newUsers[guild.id] ) {
        newUsers[guild.id] = new Discord.Collection();
    }
    newUsers[guild.id].set( member.user.id, member.user );

    if ( newUsers[guild.id].size > 10 ) {
        var userlist = newUsers[guild.id].map( u => u.mention() ).join( " " );
        guild.channels.get( guild.id ).sendMessage( "Welcome our new users!\n ``` " + userlist + "```" );
        newUsers[guild.id] = new Discord.Collection();
    }

    bot.on( "guildMemberRemove", ( member ) => {
        const guild = member.guild;
        if ( newUsers[guild.id].exists( "id", member.user.id ) ) newUsers.delete( member.user.id );
    });

});
