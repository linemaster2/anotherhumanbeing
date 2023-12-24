// ermm yes main chat module
// this includes cleverbot, c.ai and simsimi
// also with the message queue

const cleverbot = require("cleverbot-free");
const config = require("../../config.json");
const axios = require("axios");

class Chat {
    sendMessage = async function(message, client) {
        if (config.ChatModel === "SimSimi") {
            const headers = {
                "Content-Type": "application/x-www-form-urlencoded",
            };
            const h = {
                text: message,
                lc: "en",
                version: "v1",
                key: "",
            };
            
            const response = await axios.post("https://api.simsimi.vn/v1/simtalk", h, { headers });
            return response.data.message;
        } else if (config.ChatModel === "Cleverbot") {
            const response = await cleverbot(message);
            return response;
        } else if (config.ChatModel == "Character AI") {
            const chat = await client.createOrContinueChat(config.CharacterAI.CharacterID);
            const response = await chat.sendAndAwaitResponse(message, true);
            return response.text;
        }
    }
}

module.exports = Chat;