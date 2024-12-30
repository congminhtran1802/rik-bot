import { Client, GatewayIntentBits } from 'discord.js';
import { REST, Routes } from 'discord.js';
import { config } from 'dotenv';

config();

const CLIENT_ID = process.env.CLIENT_ID;
const GUILD_ID = process.env.GUILD_ID;
const TOKEN = process.env.BOT_TOKEN;

const client = new Client({
    intents: [GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ]
});


const rest = new REST({ version: '10' }).setToken(TOKEN);

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async interaction => {
    // Kiểm tra xem tương tác có phải là lệnh chat input hay không
    if (!interaction.isChatInputCommand()) return;

    // Kiểm tra nếu lệnh là /info
    if (interaction.commandName === 'info') {
        await interaction.reply('Tôi là Rikka bot!');
    }
    // Kiểm tra nếu lệnh là /hello
    else if (interaction.commandName === 'facebook') {
        await interaction.reply('Link facebook của Rikka: https://www.facebook.com/MinhDaiDe1');
    }
});

async function main() {
    const commands = [
        {
            name: 'info',
            description: 'Infomation',
        },
        {
            name: 'facebook',
            description: 'Facebook',
        },
    ];
    try {
        console.log('Started refreshing application (/) commands.');
      
        await rest.put(Routes.applicationGuildCommands(CLIENT_ID,GUILD_ID), { body: commands });
        client.login(TOKEN);
      
        console.log('Successfully reloaded application (/) commands.');
      } catch (error) {
        console.error(error);
      }
}

main();


