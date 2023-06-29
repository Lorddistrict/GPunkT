const {SlashCommandBuilder} = require('discord.js');
const {Configuration, OpenAIApi} = require("openai");
const {client} = require('../../client.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('tips')
        .setDescription('Ask ChatGPT to give a PHP tips'),
    async execute(interaction) {
        const gptModel = 'gpt-3.5-turbo';
        const configuration = new Configuration({
            apiKey: process.env.API_KEY,
        });
        const openai = new OpenAIApi(configuration);

        const conversationLog = [{
            role: 'system',
            content: "Tu n'as que 2000 caractères pour ta réponse. Tu ne dois pas inclure dans tes réponses du " +
                "texte inutile, ou autre commentaires sans rapports avec la réponse. Tu es un expert en PHP de " +
                "plus de 20 ans d'expérience et tu dois me donner une astuce en php."
        }];

        await interaction.reply("Tu veux un tips en PHP ? Donne-moi un instant que je t'écrive ça :D");

        const result = await openai.createChatCompletion({
            model: gptModel,
            messages: conversationLog,
        });

        const finalMessage = result.data.choices[0].message.content;

        await client.channels.cache.get(process.env.CHANNEL_ID).send(finalMessage);
    },
};
