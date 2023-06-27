require('dotenv').config();
const { Client, IntentsBitField, Message} = require('discord.js');
const { Configuration, OpenAIApi } = require('openai');
const cron = require('node-cron');

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ]
});

const gptModel = 'gpt-3.5-turbo';

client.on('ready', () => {
    console.log('The bot is online');
});

const configuration = new Configuration({
    apiKey: process.env.API_KEY,
});
const openai = new OpenAIApi(configuration);

client.on('messageCreate', async (message) => {
    if (message.author.bot) return;
    if (message.channel.id !== process.env.CHANNEL_ID) return;
    if (message.content.startsWith('!')) return;

    // State
    let conversationLog = [{
        role: 'system',
        content: 'Tu es un spécialiste',
    }];

    // Add user request
    conversationLog.push({
        role: 'user',
        content: message.content,
    });

    await message.channel.sendTyping();

    const result = await openai.createChatCompletion({
        model: gptModel,
        messages: conversationLog,
    });

    await message.reply(result.data.choices[0].message);
});

cron.schedule('0 */12 * * *', async () => {
    const conversationLog = [{
        role: 'system',
        content: 'Tu es un expert dans tous les domaines en développement.',
    }];

    conversationLog.push({
        role: 'system',
        content: 'Donne-moi une astuce, un tips en PHP 8',
    });

    const result = await openai.createChatCompletion({
        model: gptModel,
        messages: conversationLog,
    });

    const finalMessage = result.data.choices[0].message.content;
    await client.channels.cache.get(process.env.CHANNEL_ID).send(finalMessage);
});

client.login(process.env.TOKEN);
