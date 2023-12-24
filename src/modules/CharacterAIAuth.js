/*
Auth for c.ai
uhh credits to the module
https://github.com/realcoloride/node_characterai
*/


// imports
const CharacterAi = require("node_characterai");
const config = require("../../config.json");

// main class
class CharacterAiAuth {
    constructor(token) {
        this.token = token
    }
    
    CreateCharacterAiClient = function() {
        const client = new CharacterAi();
        return client;
    }

    Authenticate = async function(client) {
        try {
            if (config.ChatModel == "Character AI") {
                if (config.CharacterAI.LoginType == "Token") {
                    client.authenticateWithToken(this.token);
                    return true;
                } else if (config.CharacterAI.LoginType == "Guest") {
                    client.authenticateAsGuest();
                    return true;
                }
            }
        } catch(error) {
            console.log(`something went wrong while trying to authenticate: ${error}`);
            return false;
        }
    }
}

// module export the class like always
module.exports = CharacterAiAuth;   
