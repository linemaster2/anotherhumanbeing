/* 
ermm yes thats the main source
to run in just type in node index in your terminal
code *may* look ugly
*/

// Index.js

// imports
const DiscordAuth = require("./modules/DiscordAuth.js");
const config = require("../config.json");
const caiauth = require("./modules/CharacterAIAuth.js");
const acl = require("./modules/Acl.js");
const chat = require("./modules/Chat.js");

// classes
const DCAuth = new DiscordAuth(config.DiscordToken);
const CharacterAiAuth = new caiauth(config.CharacterAI.Token);
const Chat = new chat();

// variables
let isAuthenticated = false;

// create the clients
const CharacterAiClient = CharacterAiAuth.CreateCharacterAiClient();
const DiscordClient = DCAuth.CreateNewClient();
const Acl = new acl(DiscordClient);

// the main messageCreate event
DiscordClient.on("messageCreate", (message) => {
    if (message.author.id == DiscordClient.user.id) { return };
    if (message.content.toLocaleLowerCase().startsWith("!acl")) {
        if (config.ACL) {
            try {
                message.reply(`${Math.floor(message.channel.activitylevel)}`);
            } catch(error) {
                console.log(`an error while trying to get the chat activity level: ${error}`);
            }
        }
    }
    else if (message.channel.id == config.DiscordChannel) {
        message.channel.sendTyping();
        Chat.sendMessage(message.content, CharacterAiClient)
        .then((mes) => {
            message.reply(`${mes}`);
        })
        .catch((error) => {
            console.log(`${error}`);
        });
    }
});

// dis the message event for the acl
DiscordClient.on("messageCreate", (message) => {
    if (config.ACL) {
        Acl.SaveACL(message.channel);
    }
});

// do stuff when logged in
DiscordClient.on("ready", () => {
    console.log(`logged in as: ${DiscordClient.user.username}`)
    // try to authenticate with c.ai
    if (config.ChatModel == "Character AI") {
        try {
            if (CharacterAiAuth.Authenticate(CharacterAiClient) == true && !isAuthenticated) { // == true cuz without it, it didnt work (i know it looks ugly)
                isAuthenticated = true;
                console.log(`succesfully authenticated with c.ai`);
            } else {
                isAuthenticated = false;
            }
        } catch(error) {
            console.log(`an error while trying to authenticate with character.ai: ${error}`);
        }
    }
});

// login (discord)
DCAuth.Login(DiscordClient);
