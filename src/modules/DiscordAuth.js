// src/modules/DiscordAuth.js

// imports
const { Client } = require("discord.js-selfbot-v13");


// main class
class Auth {
    constructor(token) {
        this.token = token;
    }

    CreateNewClient = function() {
        const client = new Client({
            checkUpdate: false
        });
        return client;
    }

    Login = function(client) {
        client.login(this.token);
    }
}


// module export the class
module.exports = Auth;