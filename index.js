// Import discord.js
var Discord = require( 'discord.js' );

// import axios
var axios = require( 'axios' );

// Create client instance
const bot = new Discord.Client();

// Set token
const token = 'MjcxMzE5MjEyNDM2MjI2MDQ4.C2EtOQ.NrH92Areg97ZClIHbeIGZ7xOpsk';

// The corporation ID
const corpID = '98437545';

// Industries ID
const indyID = '98453454';

bot.on( 'ready', function( event ) {
    console.log( 'Logged in' );
});

bot.on( 'message', message => {
    // If message is '-created'
    if( message.content === "--help" ) {
        // Send response
        message.reply( 'I could help you but that wouldn\'t be any fun!' )
        .then( msg => console.log( 'Sent a reply to a member' ) )
        .catch( console.error );
    }

    // Show latest EVE kill
    if( message.content === "-last kill gaming" ) {
        const zkillLink = 'https://zkillboard.com/api/kills/corporationID/' + corpID + '/limit/1/';
        axios.get( zkillLink )
        .then( function( response ) {
            const killID = response.data[0].killID;
            message.channel.sendMessage( 'Latest The Realm Gaming kill: ' + 'https://zkillboard.com/kill/' + killID + '/' );
        });
    }

    // Show latest EVE death
    if( message.content === "-last death gaming" ) {
        const zkillLink = 'https://zkillboard.com/api/losses/corporationID/' + corpID + '/limit/1/';
        axios.get( zkillLink )
        .then( function( response ) {
            const killID = response.data[0].killID;
            message.channel.sendMessage( 'Latest The Realm Gaming death: ' + 'https://zkillboard.com/kill/' + killID + '/' );
        });
    }

    // Show latest Industries EVE kill
    if( message.content === "-last kill indy" ) {
        const zkillLink = 'https://zkillboard.com/api/kills/corporationID/' + indyID + '/limit/1/';
        axios.get( zkillLink )
        .then( function( response ) {
            const killID = response.data[0].killID;
            message.channel.sendMessage( 'Latest The Realm Industries kill: ' + 'https://zkillboard.com/kill/' + killID + '/' );
        });
    }

    // Show latest Industries EVE death
    if( message.content === "-last death indy" ) {
        const zkillLink = 'https://zkillboard.com/api/losses/corporationID/' + indyID + '/limit/1/';
        axios.get( zkillLink )
        .then( function( response ) {
            const killID = response.data[0].killID;
            message.channel.sendMessage( 'Latest The Realm Industries death: ' + 'https://zkillboard.com/kill/' + killID + '/' );
        });
    }
});

// log our bot in
bot.login( token );
