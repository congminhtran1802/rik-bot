import { Client, GatewayIntentBits } from 'discord.js';
import { REST, Routes } from 'discord.js';
import { config } from 'dotenv';

config();

const CLIENT_ID = process.env.CLIENT_ID;
const GUILD_ID = process.env.GUILD_ID;
const TOKEN = process.env.BOT_TOKEN;
const info = '```Tên: Trần Công Minh\nNgày sinh: 18/02/2002\nGiới tính: Nam\nQuê quán: Hà Nội\nSở thích: Nghe nhạc, chơi game, xem phim, đọc truyện, lập trình\nEmail: congminhtran42@gmail.com```'

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
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'info') {
        await interaction.deferReply({ ephemeral: true });
        await interaction.editReply({ content: info });
    }
    
    else if (interaction.commandName === 'facebook') {
        await interaction.deferReply({ ephemeral: true });
        await interaction.editReply({ content: '[Facebook của Rikka](https://www.facebook.com/MinhDaiDe1)' });
    }
    else if (interaction.commandName === 'ping') {
        await interaction.reply('Pong');
    }
});

async function main() {
    const commands = [
        
        {
            name: 'ping',
            description: 'Ping!',
        },
        {
            name: 'info',
            description: 'Infomation of Rikka',
        },
        {
            name: 'facebook',
            description: 'Facebook',
        },
    ];
    try {
        await rest.put(Routes.applicationGuildCommands(CLIENT_ID,GUILD_ID), { body: commands });
        client.login(TOKEN);
      } catch (error) {
        console.error(error);
      }
}

main();


